"use client"

import VhsCard from "@/components/VhsCard"
import {mockVhs} from "@/mocks"
import {css} from "@styled-system/css"

export default function HomePage() {
  return (
    <main className={css({ p: 6 })}>
      <h1 className={css({ fontSize: "3xl", mb: 6, fontWeight: "bold" })}>
        Catalogue VHS
      </h1>
      <div
        className={css({
          display: "grid",
          gap: 6,
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        })}
      >
        {mockVhs.map((vhs) => (
          <VhsCard key={vhs.id} vhs={vhs} />
        ))}
      </div>
    </main>
  )
}
