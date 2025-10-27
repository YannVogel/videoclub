"use client"

import {VhsList} from "@/components/api"
import VhsCard from "@/components/VhsCard"
import {css} from "@styled-system/css"

export default function HomePage() {
  return (
    <main className={css({ p: 6 })}>
      <h1 className={css({ fontSize: "3xl", mb: 6, fontWeight: "bold" })}>
        Catalogue VHS
      </h1>

      <VhsList>
        {({ data, isLoading, error, refetch }) => {
          if (isLoading) return <p>Chargement…</p>
          if (error) {
            return (
              <div className={css({ display: "grid", gap: 3 })}>
                <p>Erreur : {(error as Error).message}</p>
                <button
                  onClick={refetch}
                  className={css({
                    alignSelf: "start",
                    px: 3,
                    py: 2,
                    rounded: "md",
                    bg: "gray.800",
                    _hover: { bg: "gray.700" },
                  })}
                >
                  Réessayer
                </button>
              </div>
            )
          }

          return (
            <div
              className={css({
                display: "grid",
                gap: 6,
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              })}
            >
              {data?.map((vhs) => (
                <VhsCard key={vhs.id} vhs={vhs} />
              ))}
            </div>
          )
        }}
      </VhsList>
    </main>
  )
}
