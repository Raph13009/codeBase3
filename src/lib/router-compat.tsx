"use client";

/**
 * The part of React Router 6 this site uses, on top of Next.js navigation, so the components written for the Vite
 * version run unchanged: Link, NavLink, Navigate, useNavigate, useLocation, useParams, useSearchParams.
 *
 * Differences that do not matter here: no route `state`, no relative links. `search` and `hash` are read from the
 * browser after the first render (never during the server render), so a page renders the same HTML on the server
 * and at hydration, then updates.
 */
import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

export type To = string | { pathname?: string; search?: string; hash?: string };
type NavigateOptions = { replace?: boolean; state?: unknown; preventScrollReset?: boolean };

const toHref = (to: To) =>
  typeof to === "string" ? to : `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;

// Next.js changes the address with history.pushState/replaceState: listen to them so search and hash stay current.
const listeners = new Set<() => void>();
declare global {
  interface Window {
    __routerCompatPatched?: boolean;
  }
}
if (typeof window !== "undefined" && !window.__routerCompatPatched) {
  window.__routerCompatPatched = true;
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method].bind(window.history);
    window.history[method] = (...args: Parameters<History["pushState"]>) => {
      original(...args);
      queueMicrotask(() => listeners.forEach((listener) => listener()));
    };
  }
}

function useBrowserLocation() {
  const [state, setState] = useState({ search: "", hash: "" });
  useEffect(() => {
    const read = () => setState({ search: window.location.search, hash: window.location.hash });
    read();
    listeners.add(read);
    window.addEventListener("popstate", read);
    window.addEventListener("hashchange", read);
    return () => {
      listeners.delete(read);
      window.removeEventListener("popstate", read);
      window.removeEventListener("hashchange", read);
    };
  }, []);
  return state;
}

export function useLocation() {
  const pathname = usePathname() ?? "/";
  const { search, hash } = useBrowserLocation();
  return useMemo(
    () => ({ pathname, search, hash, state: null as unknown, key: `${pathname}${search}` }),
    [pathname, search, hash],
  );
}

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        if (to < 0) router.back();
        else router.forward();
        return;
      }
      const href = toHref(to);
      // React Router does not scroll on navigation: the site handles it (useScrollToTop, page transitions)
      if (options?.replace) router.replace(href, { scroll: false });
      else router.push(href, { scroll: false });
    },
    [router],
  );
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  return (useNextParams() ?? {}) as unknown as T;
}

type SetParams = (
  next: URLSearchParams | Record<string, string> | ((prev: URLSearchParams) => URLSearchParams | Record<string, string>),
  options?: NavigateOptions,
) => void;

export function useSearchParams(): [URLSearchParams, SetParams] {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const setParams = useCallback<SetParams>(
    (next, options) => {
      const value = typeof next === "function" ? next(new URLSearchParams(window.location.search)) : next;
      const query = new URLSearchParams(value as Record<string, string>).toString();
      navigate(`${pathname}${query ? `?${query}` : ""}${hash}`, options);
    },
    [navigate, pathname, hash],
  );
  return [params, setParams];
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: To;
  replace?: boolean;
  state?: unknown;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: string;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state: _state, reloadDocument, preventScrollReset: _p, relative: _r, ...rest },
  ref,
) {
  const href = toHref(to);
  if (reloadDocument) return <a ref={ref} href={href} {...rest} />;
  return <NextLink ref={ref} href={href} replace={replace} scroll={false} {...rest} />;
});

type NavState = { isActive: boolean; isPending: boolean; isTransitioning: boolean };
type NavLinkProps = Omit<LinkProps, "className" | "style" | "children"> & {
  end?: boolean;
  caseSensitive?: boolean;
  className?: string | ((state: NavState) => string | undefined);
  style?: CSSProperties | ((state: NavState) => CSSProperties | undefined);
  children?: ReactNode | ((state: NavState) => ReactNode);
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, end, caseSensitive, className, style, children, ...rest },
  ref,
) {
  const pathname = usePathname() ?? "/";
  const target = toHref(to).split(/[?#]/)[0] || "/";
  const norm = (s: string) => (caseSensitive ? s : s.toLowerCase());
  const isActive =
    norm(pathname) === norm(target) || (!end && target !== "/" && norm(pathname).startsWith(`${norm(target)}/`));
  const state: NavState = { isActive, isPending: false, isTransitioning: false };
  return (
    <Link
      ref={ref}
      to={to}
      aria-current={isActive ? "page" : undefined}
      className={typeof className === "function" ? className(state) : [className, isActive ? "active" : ""].filter(Boolean).join(" ") || undefined}
      style={typeof style === "function" ? style(state) : style}
      {...rest}
    >
      {typeof children === "function" ? children(state) : children}
    </Link>
  );
});

export function Navigate({ to, replace }: { to: To; replace?: boolean }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, to, replace]);
  return null;
}
