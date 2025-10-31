import type { Metadata } from 'next';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import '@/styles/panda.css';
import { css } from '@styled-system/css';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'VidéoClub VHS',
  description: 'Catalogue rétro VHS',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr">
      <body
        className={css({
          bg: 'linear-gradient(180deg, #0b0c10 0%, #1a1c23 100%)',
          color: '#e0e0e0',
          fontFamily: "'IBM Plex Sans', sans-serif",
          minH: '100vh',
          position: 'relative',
          overflowX: 'hidden',
          _before: {
            // scanlines VHS
            content: '""',
            position: 'fixed',
            inset: 0,
            background:
              'repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 3px)',
            pointerEvents: 'none',
            zIndex: 9999,
          },
          _after: {
            // léger grain / glow global
            content: '""',
            position: 'fixed',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(102,252,241,0.05), rgba(255,46,99,0.05))',
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 9998,
          },
        })}
      >
        <ReactQueryProvider>
          <Header />
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: { base: '15rem 1fr', md: '18rem 1fr' },
              borderTop: '1px solid rgba(255,255,255,0.08)',
            })}
          >
            <Sidebar />
            <main
              className={css({
                maxW: '1200px',
                w: 'full',
                px: 6,
                py: 6,
                mx: 'auto',
                position: 'relative',
                zIndex: 10,
                animation: 'fadeIn 0.6s ease',
              })}
            >
              {children}
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
