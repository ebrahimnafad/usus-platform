import React from "react";

export type StudioIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

function iconBase(
  { size = 16, ...props }: StudioIconProps,
  children: React.ReactNode
): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PaletteIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.4a2.1 2.1 0 0 0 1.3-3.8 2.1 2.1 0 0 1 1.3-3.8H18a3 3 0 0 0 3-3A8.4 8.4 0 0 0 12 3Z" />
      <circle cx="7.5" cy="11" r=".9" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.5" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r=".9" fill="currentColor" stroke="none" />
    </>
  );
}

export function CopyIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
    </>
  );
}

export function LinkIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M10.5 13.5 13.5 10.5" />
      <path d="M8 16.5 6.8 17.7a3.6 3.6 0 0 1-5.1-5.1L4.5 9.8a3.6 3.6 0 0 1 5.1 0" />
      <path d="M16 7.5l1.2-1.2a3.6 3.6 0 0 1 5.1 5.1l-2.8 2.8a3.6 3.6 0 0 1-5.1 0" />
    </>
  );
}

export function RefreshIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M20 11a8 8 0 0 0-14.9-4" />
      <path d="M4 5v5h5" />
      <path d="M4 13a8 8 0 0 0 14.9 4" />
      <path d="M20 19v-5h-5" />
    </>
  );
}

export function CheckIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(props, <path d="m5 12.5 4.5 4.5L19 7.5" />);
}

export function ChevronDownIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(props, <path d="m6 9 6 6 6-6" />);
}

export function SearchIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4" />
    </>
  );
}

export function CloseIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  );
}

export function DownloadIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M5 20h14" />
    </>
  );
}

export function PrinterIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M7 9V4h10v5" />
      <rect x="4" y="9" width="16" height="8" rx="2" />
      <path d="M7 14h10v6H7z" />
    </>
  );
}

export function ShareIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </>
  );
}

export function WorksheetIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 12h6M9 16h6" />
    </>
  );
}

export function AnswerKeyIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="m9 14 2 2 4-4" />
    </>
  );
}

export function NotesIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </>
  );
}

export function ArrowRightIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  );
}

export function ArrowLeftIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  );
}

export function MenuIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  );
}

export function PanelCollapseIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16" />
      <path d="m15 9-3 3 3 3" />
    </>
  );
}

export function PanelExpandIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16" />
      <path d="m13 9 3 3-3 3" />
    </>
  );
}

export function GripIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <path d="M8 9h8M8 15h8" />
    </>
  );
}

export function SearchEmptyIcon(props: StudioIconProps): React.ReactElement {
  return iconBase(
    props,
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4" />
      <path d="M8.5 10.5h4" />
    </>
  );
}
