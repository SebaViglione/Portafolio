type BrandIconProps = {
  className?: string;
  size?: number;
};

function iconProps(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: `brand-icon ${className ?? ''}`.trim(),
    'aria-hidden': true,
  };
}

export function WhatsAppIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg {...iconProps(size, className)} strokeWidth={1.65}>
      <path d="M5.9 19.1 6.7 16a6.8 6.8 0 1 1 2.7 2.4l-3.5.7Z" />
      <path d="M9.8 8.9c.2-.3.3-.4.6-.4h.4c.2 0 .4.1.5.4l.6 1.3c.1.2 0 .4-.1.6l-.4.5c.6 1.1 1.5 1.9 2.7 2.5l.5-.5c.2-.2.4-.2.6-.1l1.3.6c.3.1.4.3.4.5v.4c0 .3-.2.5-.4.6-.5.2-1 .3-1.6.2-2.4-.4-4.5-2.3-5.2-4.7-.2-.6-.2-1.2-.1-1.8Z" />
    </svg>
  );
}

export function LinkedInIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg {...iconProps(size, className)}>
      <rect x="4" y="4" width="16" height="16" rx="2.6" />
      <path d="M8.1 10.4v5.5" />
      <path d="M11.6 15.9v-3.2c0-1.4.8-2.3 2.1-2.3s2.2.9 2.2 2.5v3" />
      <path d="M8.1 7.9h.01" />
    </svg>
  );
}
