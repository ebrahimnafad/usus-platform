import React from "react";
import Link from "next/link";

export interface BackButtonProps {
  href?: string;
  ariaLabel?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  href = "/math",
  ariaLabel = "العودة لاختيار الصف",
  label,
  className = "inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 text-xs font-bold transition shadow-xs backdrop-blur-xs",
}: BackButtonProps): React.ReactElement {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      title={ariaLabel}
    >
      <span aria-hidden="true" className="text-sm font-black leading-none">
        →
      </span>
      {label && <span>{label}</span>}
    </Link>
  );
}

export default BackButton;
