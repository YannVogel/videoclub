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
          <img
            src={vhs.coverUrl}
            alt={vhs.title}
            className={css({
              position: 'absolute',
              inset: 0,
              w: 'full',
              h: 'full',
              objectFit: 'cover',
              filter: 'saturate(1.05) contrast(1.05)',
              transition: 'transform 250ms ease',
            })}
          />
          <span
            aria-hidden
            className={css({
              position: 'absolute',
              inset: 0,
              bgGradient: 'to-b',
              gradientFrom: 'transparent',
              gradientTo: 'rgba(0,0,0,0.55)',
            })}
          />
          <span className={statusBadge({ status: vhs.status })}>
            {statusLabel[vhs.status]}
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
