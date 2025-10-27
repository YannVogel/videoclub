import {Client} from "@/models"

export const mockClients: Client[] = [
  {
    id: "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2",
    firstName: "Marie",
    lastName: "Durand",
    email: "marie.durand@example.com",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
