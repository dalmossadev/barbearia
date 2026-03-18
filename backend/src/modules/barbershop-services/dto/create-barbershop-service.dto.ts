// src/modules/barbershop-services/dto/create-barbershop-service.dto.ts

export interface CreateBarbershopServiceDTO {
  name: string
  description: string
  imageUrl: string
  price: number
  barbershopId: string
}
