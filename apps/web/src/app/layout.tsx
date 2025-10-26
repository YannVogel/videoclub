import type {Metadata} from "next"
import React, {ReactNode} from "react"
import "@/styles/panda.css"
import ReactQueryProvider from "@/app/providers/react-query"
import MswLoader from "@/app/msw-loader"

export const metadata: Metadata = {
  title: "VidéoClub VHS",
  description: "Projet démo Next.js 16 façon vidéo-club des années 90",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
    <body>
    <ReactQueryProvider>
      {children}
      <MswLoader />
    </ReactQueryProvider>
    </body>
    </html>
  )
}
