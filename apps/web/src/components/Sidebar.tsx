'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '@styled-system/css';
import { vstack } from '@styled-system/patterns';

const navItem = (active: boolean) =>
  css({
    display: 'block',
    px: 3,
    py: 2,
    rounded: 'md',
    fontWeight: active ? 'semibold' : 'medium',
    color: active ? '#66fcf1' : 'gray.300',
    bg: active ? 'rgba(255,255,255,0.05)' : 'transparent',
    transition: 'all 200ms ease',
    textDecoration: 'none',
    cursor: 'pointer',
    borderLeft: active ? '3px solid #ff2e63' : '3px solid transparent',
    _hover: {
      bg: 'rgba(255,255,255,0.06)',
      color: '#66fcf1',
      transform: 'translateX(4px)',
      textShadow: '0 0 8px #66fcf1aa',
    },
    _disabled: { opacity: 0.4, cursor: 'not-allowed' },
  });

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className={vstack({
        alignItems: 'stretch',
        gap: 3,
        w: { base: '64', md: '72' },
        minH: '100vh',
        bg: 'linear-gradient(180deg, #0b0c10 0%, #14171f 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        p: 5,
        position: 'sticky',
        top: 0,
        boxShadow: 'inset -2px 0 10px rgba(102,252,241,0.05)',
        _before: {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background:
            'linear-gradient(to bottom, #ff2e63, #66fcf1, #ff2e63, #66fcf1)',
          opacity: 0.3,
          animation: 'neonFlow 4s linear infinite',
        },
      })}
    >
      <div
        className={css({
          fontSize: 'lg',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          mb: 4,
          color: '#f8e71c',
          textShadow:
            '0 0 6px #f8e71c99, 0 0 12px #ffcc0099, 0 0 20px #ffb70055',
          fontFamily: "'Orbitron', sans-serif",
        })}
      >
        ▶ Menu
      </div>

      <Link href="/" className={navItem(pathname === '/')}>
        🏠 Accueil
      </Link>

      <Link
        href="/catalog"
        className={navItem(pathname.startsWith('/catalog'))}
      >
        📼 Catalogue
      </Link>

      <Link
        href="/customer"
        className={navItem(pathname.startsWith('/customer'))}
      >
        👥 Clients
      </Link>
    </aside>
  );
};

export default Sidebar;
