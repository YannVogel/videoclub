import type {Metadata} from "next"
import Header from "@/components/Header"
import "@/styles/panda.css"
import {css} from "@styled-system/css"

export const metadata: Metadata = {
  title: "VidéoClub VHS",
  description: "Catalogue rétro VHS",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
    <body
      className={css({
        bg: "black",
        color: "gray.100",
        minH: "100vh",
      })}
    >
    <Header />
    <div
      className={css({
        maxW: "1200px",
        mx: "auto",
        w: "full",
      })}
    >
      {children}
    </div>
    </body>
    </html>
  )
}
