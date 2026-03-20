// src/modules/bookings/dto/create-booking.dto.ts

export interface CreateBookingDTO {
  barbershopId: string
  serviceId: string
  date: Date
}
