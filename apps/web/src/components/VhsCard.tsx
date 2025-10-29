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
      className={css({ textDecoration: 'none', color: 'inherit' })}
    >
      <article
        className={vstack({
          gap: 0,
          borderWidth: 1,
          borderColor: { base: 'gray.800', _hover: 'gray.700' },
          rounded: '2xl',
          overflow: 'hidden',
          bg: 'gray.900',
          shadow: 'md',
          transition:
            'transform 150ms ease, box-shadow 200ms ease, border-color 200ms ease',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow:
              '0 0 10px rgba(255,0,255,0.25), 0 0 20px rgba(0,200,255,0.15)',
          },
        })}
      >
        {/* Cassette frame */}
        <div
          className={css({
            position: 'relative',
            w: 'full',
            h: '0',
            pb: '150%',
            overflow: 'hidden',
            bg: 'black',
          })}
        >
          {/* Jaquette */}
          <img
            src={vhs.coverUrl}
            alt={vhs.title}
            className={css({
              position: 'absolute',
              top: '27%',
              left: '30%',
              width: '50%',
              height: '45%',
              objectFit: 'cover',
              borderRadius: 'sm',
              boxShadow: '0 0 8px rgba(0,0,0,0.5)',
              zIndex: 2,
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
              zIndex: 1,
              pointerEvents: 'none',
            })}
          />

          {/* Badge de statut au-dessus de tout */}
          <span
            className={css({
              position: 'absolute',
              top: 2,
              left: 2,
              zIndex: 3,
            })}
          >
            <span className={statusBadge({ status: vhs.status })}>
              {statusLabel[vhs.status]}
            </span>
          </span>
        </div>

        <div className={vstack({ p: 3, gap: 2, alignItems: 'flex-start' })}>
          <h2
            className={css({
              fontWeight: 'bold',
              fontSize: 'lg',
              lineHeight: 'short',
              background:
                'linear-gradient(90deg, #ff4df0, #00e0ff, #ffe38a, #ff4df0)',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow:
                '0 0 6px rgba(255,77,240,0.35), 0 0 10px rgba(0,224,255,0.25)',
            })}
          >
            {vhs.title}
          </h2>

          {vhs.year && (
            <p className={css({ color: 'gray.400', fontSize: 'sm' })}>
              {vhs.year}
            </p>
          )}

          {vhs.genres?.length > 0 && (
            <div className={hstack({ gap: 2, flexWrap: 'wrap' })}>
              {vhs.genres.map((g) => (
                <span
                  key={g}
                  className={css({
                    fontSize: 'xs',
                    px: 2,
                    py: 1,
                    rounded: 'full',
                    borderWidth: 1,
                    borderColor: 'gray.700',
                    color: 'gray.200',
                    bg: 'gray.800',
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
