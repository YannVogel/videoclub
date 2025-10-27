"use client"

import {Vhs} from "@/models"
import {css} from "../../styled-system/css"
import {hstack, vstack} from "../../styled-system/patterns"

type Props = {
  vhs: Vhs
}

export default function VhsCard({ vhs }: Props) {
  return (
    <div
      className={vstack({
        borderWidth: 1,
        borderRadius: "xl",
        overflow: "hidden",
        shadow: "md",
        bg: "white",
      })}
    >
      <img
        src={vhs.coverUrl}
        alt={vhs.title}
        width={200}
        height={300}
        className={css({ objectFit: "cover", w: "full", h: "300px" })}
      />
      <div className={vstack({ p: 3, gap: 1 })}>
        <h2 className={css({ fontWeight: "bold", fontSize: "lg" })}>{vhs.title}</h2>
        {vhs.year && <p className={css({ color: "gray.600" })}>{vhs.year}</p>}
        <div className={hstack({ gap: 2, flexWrap: "wrap" })}>
          {vhs.genres.map((g) => (
            <span
              key={g}
              className={css({
                fontSize: "xs",
                px: 2,
                py: 1,
                borderRadius: "md",
                bg: "gray.100",
              })}
            >
              {g}
            </span>
          ))}
        </div>
        <p className={css({ fontSize: "sm", color: "gray.700" })}>
          Statut: <strong>{vhs.status}</strong>
        </p>
      </div>
    </div>
  )
}
