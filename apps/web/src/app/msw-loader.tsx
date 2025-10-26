"use client"

import {useEffect} from "react"

export default function MswLoader() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@/mocks/browser").then(({ worker }) => worker.start())
    }
  }, [])

  return null
}
