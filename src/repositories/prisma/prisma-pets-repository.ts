import { prisma } from '@/lib/prisma'
import {
  Ambient,
  EnergyLevel,
  IndependencyLevel,
  Prisma,
  Size,
} from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async searchMany(
    city: string,
    page: number,

    age?: number,
    size?: Size,
    energy_level?: EnergyLevel,
    ambient?: Ambient,
    independency_level?: IndependencyLevel,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        Org: { city: { contains: city } },

        age: { equals: age },
        size: { equals: size },
        energy_level: { equals: energy_level },
        ambient: { equals: ambient },
        independency_level: { equals: independency_level },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }
}