'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Vertical parallax wrapper. `speed` is the % of scroll travel applied as a
// translate on Y. Negative values rise faster than the page; positive values
// trail behind. transform-only, no layout shift.
//
// <Parallax speed={-0.15}><img/></Parallax>
export default function Parallax({
  as = 'div',
  speed = -0.1,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Travel range in px -modest by default, tuned for medical UI.
  const travel = 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel]);

  const Tag = motion[as] || motion.div;

  if (reduce) {
    return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      style={{ y, willChange: 'transform' }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
