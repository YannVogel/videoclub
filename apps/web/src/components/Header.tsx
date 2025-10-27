import {css} from "@styled-system/css"
import {hstack} from "@styled-system/patterns"

export default function Header() {
  return (
    <header
      className={hstack({
        justify: "center",
        p: 4,
        bg: "black",
        borderBottom: "1px solid",
        borderColor: "gray.800",
        position: "sticky",
        top: 0,
        zIndex: 50,
      })}
    >
      <h1
        className={css({
          fontSize: { base: "3xl", md: "4xl" },
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "wide",
          display: "flex",
          gap: 3,
        })}
      >
        <span
          className={css({
            color: "pink.400",
            textShadow: `
              0 0 4px #ff4dff,
              0 0 10px #ff4dff,
              0 0 18px #ff1aff,
              0 0 28px #ff00ff
            `,
          })}
        >
          Vidéo
        </span>
        <span
          className={css({
            color: "cyan.300",
            textShadow: `
              0 0 4px #4dffff,
              0 0 10px #33f5ff,
              0 0 18px #00e5ff,
              0 0 28px #00d1ff
            `,
          })}
        >
          Club
        </span>
        <span
          className={css({
            color: "yellow.300",
            textShadow: `
              0 0 4px #ffe14d,
              0 0 10px #ffd633,
              0 0 18px #ffcc00,
              0 0 28px #ffb700
            `,
          })}
        >
          VHS
        </span>
      </h1>
    </header>
  )
}
