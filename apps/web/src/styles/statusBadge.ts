import {cva} from "@styled-system/css"

export const statusBadge = cva({
  base: {
    position: "absolute",
    top: 3,
    left: 3,
    px: 2,
    py: 1,
    rounded: "md",
    fontSize: "xs",
    fontWeight: "semibold",
    borderWidth: 1,
    borderColor: "black Alpha 0.5", // si vous avez un token 'blackAlpha', sinon retirez cette ligne
  },
  variants: {
    status: {
      available: {
        color: "black",
        bg: "green.500",
        textShadow: "0 0 6px #22c55e, 0 0 12px #16a34a",
        boxShadow: "0 0 6px #22c55e, 0 0 12px #16a34a",
      },
      rented: {
        color: "black",
        bg: "yellow.400",
        textShadow: "0 0 6px #facc15, 0 0 12px #eab308",
        boxShadow: "0 0 6px #facc15, 0 0 12px #eab308",
      },
      overdue: {
        color: "white",
        bg: "red.500",
        textShadow: "0 0 6px #ef4444, 0 0 12px #dc2626",
        boxShadow: "0 0 6px #ef4444, 0 0 12px #dc2626",
      },
      lost: {
        color: "black",
        bg: "pink.500",
        textShadow: "0 0 6px #ec4899, 0 0 12px #db2777",
        boxShadow: "0 0 6px #ec4899, 0 0 12px #db2777",
      },
    },
  },
})
