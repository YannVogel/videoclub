import {Vhs} from "@/models"

export const mockVhs: Vhs[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Terminator",
    year: 1984,
    genres: ["action", "science-fiction"],
    synopsis: "Un cyborg tueur est envoyé du futur pour éliminer Sarah Connor.",
    coverUrl: "https://placehold.co/200x300?text=Terminator",
    status: "disponible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Jurassic Park",
    year: 1993,
    genres: ["aventure", "science-fiction"],
    synopsis: "Un parc avec des dinosaures clonés devient incontrôlable.",
    coverUrl: "https://placehold.co/200x300?text=Jurassic+Park",
    status: "louee",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "Le Roi Lion",
    year: 1994,
    genres: ["animation", "aventure"],
    synopsis: "L’histoire de Simba, un jeune lion destiné à devenir roi.",
    coverUrl: "https://placehold.co/200x300?text=Le+Roi+Lion",
    status: "disponible",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
