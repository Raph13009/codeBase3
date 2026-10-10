import { bSvgPath } from "@/components/studio/brand";

const CIRCLE = "M50 2a48 48 0 1 1 0 96a48 48 0 1 1 0-96Z";
const MARK_PATH = CIRCLE + bSvgPath(26);

/** BoostAI mark: a disc in currentColor with the B cut out of it. */
export function BMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}
