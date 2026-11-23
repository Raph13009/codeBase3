/**
 * Replaces react-helmet-async. React 19 moves <title>, <meta> and <link> rendered by any component into the
 * document <head>, on the server as well: the tags the pages already declare in <Helmet> end up in the HTML that
 * Google and AI crawlers receive. <html> and <body> attributes are not supported there: the layouts set them.
 */
import { Children, isValidElement, type ReactNode } from "react";

export function HelmetProvider({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function Helmet({ children }: { children?: ReactNode }) {
  const kept = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && (child.type === "html" || child.type === "body")),
  );
  return <>{kept}</>;
}
