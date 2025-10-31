'use client';

import { css } from '@styled-system/css';
import { hstack } from '@styled-system/patterns';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header
      className={hstack({
        justify: 'center',
        alignItems: 'center',
        p: { base: 4, md: 5 },
        bg: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 0 20px rgba(102,252,241,0.08)',
      })}
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={css({
          fontSize: { base: '3xl', md: '4xl' },
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          display: 'flex',
          gap: 3,
          fontFamily: "'Orbitron', sans-serif",
          textAlign: 'center',
          userSelect: 'none',
        })}
      >
        <span
          className={css({
            color: '#ff2e63',
            textShadow: `
              0 0 4px #ff2e63,
              0 0 10px #ff2e63,
              0 0 20px #ff2e63cc
            `,
            animation: 'flickerPink 2s infinite',
          })}
        >
          Vidéo
        </span>
        <span
          className={css({
            color: '#66fcf1',
            textShadow: `
              0 0 4px #66fcf1,
              0 0 10px #45e6db,
              0 0 20px #45e6dbcc
            `,
            animation: 'flickerCyan 3s infinite',
          })}
        >
          Club
        </span>
        <span
          className={css({
            color: '#f8e71c',
            textShadow: `
              0 0 4px #f8e71c,
              0 0 10px #ffdd33,
              0 0 20px #ffcc00cc
            `,
            animation: 'glitch 1.8s infinite',
          })}
        >
          VHS
        </span>
      </motion.h1>
    </header>
  );
}
