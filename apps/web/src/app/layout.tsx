import type {Metadata} from "next"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import "@/styles/panda.css"
import {css} from "@styled-system/css"
import ReactQueryProvider from "@/components/providers/ReactQueryProvider"

export const metadata: Metadata = {
  title: "VidéoClub VHS",
  description: "Catalogue rétro VHS",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr">
    <body
      className={css({
        bg: "black",
        color: "gray.100",
        minH: "100vh",
      })}
    >
    <ReactQueryProvider>
      <Header />
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "16rem 1fr", md: "18rem 1fr" },
          gap: 0,
        })}
      >
        <Sidebar />
        <main
          className={css({
            maxW: "1200px",
            w: "full",
            px: 6,
            py: 6,
            mx: "auto",
          })}
        >
          {children}
        </main>
      </div>
    </ReactQueryProvider>
    </body>
    </html>
  )
}

export default RootLayout
