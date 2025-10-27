import type {Metadata} from "next"
import "@/styles/panda.css"
import React from "react";

export const metadata: Metadata = {
  title: "VidéoClub VHS",
  description: "Catalogue rétro VHS",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
    <body>
    {children}
    </body>
    </html>
  )
}
