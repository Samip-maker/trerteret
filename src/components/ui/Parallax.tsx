'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
  className?: string;
};

export const Parallax = ({ children, offset = 50, className = '' }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};

type ParallaxBackgroundProps = {
  children: ReactNode;
  offset?: number;
  className?: string;
};

export const ParallaxBackground = ({ children, offset = 100, className = '' }: ParallaxBackgroundProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/path-to-your-background.jpg)', // Update this path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        initial={{ y: -offset }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
