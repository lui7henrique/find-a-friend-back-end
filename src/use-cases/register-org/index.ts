import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { RegisterOrgFields } from '@/http/controllers/orgs/register'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-errors'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest extends RegisterOrgFields {}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsible_name,
    address,
    email,
    password,
    postalCode,
    whatsapp_number,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      responsible_name,
      address,
      email,
      postalCode,
      whatsapp_number,
      password_hash: passwordHash,
    })

    return {
      org,
    }
  }
}