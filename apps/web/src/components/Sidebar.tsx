"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {css} from "@styled-system/css"
import {vstack} from "@styled-system/patterns"

const navItem = (active: boolean) =>
  css({
    display: "block",
    px: 3,
    py: 2,
    rounded: "md",
    fontWeight: active ? "semibold" : "medium",
    color: active ? "white" : "gray.300",
    bg: active ? "gray.800" : "transparent",
    transition: "background 150ms ease, color 150ms ease, transform 120ms ease",
    _hover: { bg: "gray.800", color: "white", transform: "translateX(2px)" },
    textDecoration: "none",
    cursor: "pointer",
  })

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside
      className={vstack({
        alignItems: "stretch",
        gap: 3,
        w: { base: "64", md: "72" },
        minH: "100vh",
        bg: "black",
        borderRight: "1px solid",
        borderColor: "gray.800",
        p: 4,
        position: "sticky",
        top: 0,
      })}
    >
      <div
        className={css({
          fontSize: "xl",
          fontWeight: "bold",
          letterSpacing: "wide",
          mb: 2,
          background:
            "linear-gradient(90deg, #ff4df0, #00e0ff, #ffe38a, #ff4df0)",
          backgroundClip: "text",
          color: "transparent",
          textShadow:
            "0 0 6px rgba(255,77,240,0.35), 0 0 10px rgba(0,224,255,0.25)",
        })}
      >
        Menu
      </div>

      <Link href="/" className={navItem(pathname === "/")}>
        🏠 Accueil
      </Link>

      <Link href="/catalog" className={navItem(pathname.startsWith("/catalog"))}>
        📼 Catalogue
      </Link>

      {/* Autres sections (désactivées pour l’instant) */}
      <span className={navItem(false)} aria-disabled="true">
        👥 Clients
      </span>
      <span className={navItem(false)} aria-disabled="true">
        🔁 Locations
      </span>
      <span className={navItem(false)} aria-disabled="true">
        ⚙️ Paramètres
      </span>
    </aside>
  )
}

export default Sidebar
