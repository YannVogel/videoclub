import {http, HttpResponse} from "msw"

export const handlers = [
  http.get("/api/v1/vhs", () =>
    HttpResponse.json([{ id: 1, title: "Terminator", status: "available" }])
  ),
]
