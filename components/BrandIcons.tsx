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

export function GitHubIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg {...iconProps(size, className)} strokeWidth={1.7}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}
