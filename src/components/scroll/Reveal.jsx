'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Reveal -fade + subtle slide as the element enters the viewport.
// Animates only once. Pure transform/opacity (GPU friendly).
//
// <Reveal>...</Reveal>
// <Reveal y={24} delay={0.1}>...</Reveal>
// <Reveal scale>...</Reveal>      // adds 0.95 → 1 scale-in (card feel)
// <Reveal as="section" className="...">
export default function Reveal({
  as = 'div',
  y = 16,
  x = 0,
  scale = false,
  delay = 0,
  duration = 0.55,
  amount = 0.18,
  className = '',
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  const initial = { opacity: 0, y, x };
  const target = { opacity: 1, y: 0, x: 0 };
  if (scale) {
    initial.scale = 0.95;
    target.scale = 1;
  }

  return (
    <Tag
      initial={initial}
      whileInView={target}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// RevealStagger -for grids / lists. Children must be wrapped in <RevealItem>.
export function RevealStagger({ as = 'div', className = '', stagger = 0.06, delayChildren = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', y = 14, scale = false, className = '', children, ...rest }) {
  const Tag = motion[as] || motion.div;
  const hidden = { opacity: 0, y };
  const show = { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } };
  if (scale) {
    hidden.scale = 0.95;
    show.scale = 1;
  }
  return (
    <Tag
      variants={{ hidden, show }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
