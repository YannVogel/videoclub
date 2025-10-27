import {Rental} from "@/models"

export const mockRentals: Rental[] = [
  {
    id: "bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1",
    vhsId: "22222222-2222-2222-2222-222222222222", // Jurassic Park
    clientId: "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1", // Jean Dupont
    rentedAt: new Date("2025-10-01T10:00:00Z").toISOString(),
    dueAt: new Date("2025-10-05T10:00:00Z").toISOString(),
    returnedAt: null,
  },
]
