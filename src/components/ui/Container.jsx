// Single source of truth for horizontal containment.
// Every page section, the navbar, and the footer must wrap content in this
// to keep margins and max-widths visually identical across the site.

export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Section wrapper with consistent vertical rhythm.
export function Section({
  as: Tag = 'section',
  className = '',
  innerClassName = '',
  size = 'md',
  background = 'transparent',
  children,
  ...rest
}) {
  const padY = size === 'sm' ? 'py-12 md:py-16' : size === 'lg' ? 'py-20 md:py-28' : 'py-16 md:py-20';
  const bg =
    background === 'light' ? 'bg-[#FDF5EE]' :
    background === 'white' ? 'bg-white' :
    background === 'soft'  ? 'bg-linear-to-b from-white to-[#FDF5EE]' :
    background === 'peach' ? 'bg-[#F6CA97]/15' :
    background === 'coral' ? 'bg-[#E9756D]/10' :
    background === 'gradient' ? 'bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white' :
    '';

  return (
    <Tag className={`relative ${padY} ${bg} ${className}`} {...rest}>
      <Container className={innerClassName}>{children}</Container>
    </Tag>
  );
}

// Section heading with consistent badge + gradient title + subtitle pattern.
// Use `gradient` to render the title in the brand gradient (default true).
export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  gradient = true,
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : align === 'left' ? 'text-start' : 'text-end ms-auto';
  const titleClass = gradient
    ? 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97] inline-block'
    : 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight';
  return (
    <header className={`max-w-2xl ${alignment} mb-10 md:mb-14 ${className}`}>
      {badge && (
        <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E9756D] mb-3">
          {badge}
        </span>
      )}
      <h2 className={titleClass}>{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}
