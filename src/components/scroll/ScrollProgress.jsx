'use client';

import { motion, useScroll, useSpring } from 'framer- motion';

// Thin top bar that fills as you scroll. transform- only, GPU accelerated.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 38,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria- hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top- 0 inset- x- 0 z- 100 h- 0.5 bg- linear- to- r from- [#E9756D] to- [#F6CA97] pointer- events- none"
    />
  );
}
