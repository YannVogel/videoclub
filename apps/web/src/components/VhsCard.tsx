import Link from 'next/link';
import { Vhs } from '@/models';
import { css } from '@styled-system/css';
import { hstack, vstack } from '@styled-system/patterns';
import { statusBadge } from '@/styles/statusBadge';
import { statusLabel } from '@/utils';

type Props = { vhs: Vhs };

const VhsCard = ({ vhs }: Props) => {
  return (
    <Link
      href={`/catalog/${vhs.id}`}
      className={css({
        textDecoration: 'none',
        color: 'inherit',
        _hover: { textDecoration: 'none' },
      })}
    >
      <article
        className={vstack({
          gap: 0,
          rounded: '2xl',
          overflow: 'hidden',
          bg: 'linear-gradient(180deg, #111217 0%, #181b24 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          shadow: '0 0 12px rgba(0,0,0,0.5)',
          transition: 'transform 200ms ease, box-shadow 300ms ease',
          position: 'relative',
          _hover: {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow:
              '0 0 12px #ff2e63aa, 0 0 24px #66fcf188, 0 0 48px rgba(255,255,255,0.1)',
          },
          _before: {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(to bottom, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 2px, transparent 3px)',
            pointerEvents: 'none',
            zIndex: 3,
          },
        })}
      >
        {/* Cassette frame */}
        <div
          className={css({
            position: 'relative',
            w: 'full',
            h: 0,
            pb: '150%',
            overflow: 'hidden',
            bg: '#0b0c10',
          })}
        >
          {/* Jaquette */}
          <img
            src={vhs.coverUrl}
            alt={vhs.title}
            className={css({
              position: 'absolute',
              top: '25%',
              left: '28%',
              width: '52%',
              height: '48%',
              objectFit: 'cover',
              borderRadius: 'xs',
              zIndex: 2,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow:
                '0 0 6px rgba(255,46,99,0.4), 0 0 10px rgba(102,252,241,0.25)',
              _hover: {
                transform: 'translateY(-3%) scale(1.05)',
                boxShadow:
                  '0 0 12px rgba(255,46,99,0.6), 0 0 24px rgba(102,252,241,0.4)',
              },
            })}
          />

          {/* Cassette overlay */}
          <img
            src="/assets/vhs.png"
            alt="Cassette VHS"
            className={css({
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.95,
              filter: 'contrast(1.1)',
              zIndex: 1,
              pointerEvents: 'none',
            })}
          />

          {/* Badge de statut */}
          <span
            className={css({
              position: 'absolute',
              top: 2,
              left: 2,
              zIndex: 4,
            })}
          >
            <span className={statusBadge({ status: vhs.status })}>
              {statusLabel[vhs.status]}
            </span>
          </span>
        </div>

        <div
          className={vstack({
            p: 4,
            gap: 2,
            alignItems: 'flex-start',
            zIndex: 5,
            bg: 'rgba(0,0,0,0.25)',
          })}
        >
          <h2
            className={css({
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 'bold',
              fontSize: 'lg',
              lineHeight: 'short',
              textTransform: 'uppercase',
              background:
                'linear-gradient(90deg, #ff2e63, #66fcf1, #ffe38a, #ff2e63)',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow:
                '0 0 6px rgba(255,46,99,0.45), 0 0 10px rgba(102,252,241,0.35)',
            })}
          >
            {vhs.title}
          </h2>

          {vhs.year && (
            <p
              className={css({
                color: 'gray.400',
                fontSize: 'sm',
                letterSpacing: 'wide',
              })}
            >
              {vhs.year}
            </p>
          )}

          {vhs.genres?.length > 0 && (
            <div
              className={hstack({
                gap: 2,
                flexWrap: 'wrap',
              })}
            >
              {vhs.genres.map((g) => (
                <span
                  key={g}
                  className={css({
                    fontSize: 'xs',
                    px: 2,
                    py: 1,
                    rounded: 'full',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'gray.100',
                    bg: 'rgba(255,255,255,0.05)',
                    textTransform: 'uppercase',
                    letterSpacing: 'wider',
                  })}
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default VhsCard;
