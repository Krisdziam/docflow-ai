import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconFrame({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      {...props}
    >
      {children}
    </svg>
  );
}

const strokeProps = {
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
};

export function OverviewIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" {...strokeProps} />
    </IconFrame>
  );
}

export function DocumentsIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M7 3h7l4 4v14H7z" {...strokeProps} />
      <path d="M14 3v5h4M10 12h5M10 16h5" {...strokeProps} />
    </IconFrame>
  );
}

export function ReviewIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M9 4h6M9 3v3M15 3v3M6 5h12v16H6z" {...strokeProps} />
      <path d="m9 13 2 2 4-5" {...strokeProps} />
    </IconFrame>
  );
}

export function ArchiveIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M4 7h16v14H4zM3 3h18v4H3zM9 11h6" {...strokeProps} />
    </IconFrame>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="12" cy="12" r="3" {...strokeProps} />
      <path d="M19 12a7 7 0 0 0-.08-1l2-1.5-2-3.5-2.45 1a7 7 0 0 0-1.72-1L14.5 3h-5l-.25 3a7 7 0 0 0-1.72 1L5.08 6l-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.45-1a7 7 0 0 0 1.72 1l.25 3h5l.25-3a7 7 0 0 0 1.72-1l2.45 1 2-3.5-2-1.5c.05-.33.08-.66.08-1Z" {...strokeProps} />
    </IconFrame>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" {...strokeProps} />
    </IconFrame>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M12 16V4M7 9l5-5 5 5M5 15v5h14v-5" {...strokeProps} />
    </IconFrame>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M7 3h7l4 4v14H7zM14 3v5h4" {...strokeProps} />
    </IconFrame>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="m7 7 10 10M17 7 7 17" {...strokeProps} />
    </IconFrame>
  );
}
