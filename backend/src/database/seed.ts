// src/database/seed.ts

import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()

import { AppDataSource } from './data-source'
import { Barbershop } from '../entities/barbershop.entity'
import { BarbershopService } from '../entities/barbershop-service.entity'

const seed = async (): Promise<void> => {
  await AppDataSource.initialize()
  console.log('✅ Banco conectado')

  const barbershopRepo = AppDataSource.getRepository(Barbershop)
  const serviceRepo = AppDataSource.getRepository(BarbershopService)
  const bookingRepo = AppDataSource.getRepository('bookings') // Usando string para evitar importação circular



 // Limpar com CASCADE para respeitar foreign keys
  const queryRunner = AppDataSource.createQueryRunner()
  await queryRunner.query('TRUNCATE TABLE bookings, barbershop_services, barbershops CASCADE')
  console.log('🗑️  Dados anteriores removidos')

  // ─── Barbearia 1 ──────────────────────────────────
  const barbershop1 = barbershopRepo.create({
    name: 'Barbearia do João',
    address: 'Rua das Flores, 123 - Centro, Salvador - BA',
    phones: '(71) 99999-1111',
    description: 'A melhor barbearia do centro de Salvador. Tradição e qualidade desde 2010.',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70',
  })
  await barbershopRepo.save(barbershop1)

  await serviceRepo.save([
    serviceRepo.create({
      name: 'Corte Masculino',
      description: 'Corte clássico ou moderno, finalizado com produtos premium.',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138daaa4e8b0',
      price: 35.00,
      barbershopId: barbershop1.id,
    }),
    serviceRepo.create({
      name: 'Barba',
      description: 'Barba feita com navalha e toalha quente.',
      imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
      price: 25.00,
      barbershopId: barbershop1.id,
    }),
    serviceRepo.create({
      name: 'Corte + Barba',
      description: 'Combo completo com corte e barba por um preço especial.',
      imageUrl: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8',
      price: 55.00,
      barbershopId: barbershop1.id,
    }),
  ])
  console.log('✅ Barbearia do João criada com 3 serviços')

  // ─── Barbearia 2 ──────────────────────────────────
  const barbershop2 = barbershopRepo.create({
    name: 'Barber Premium',
    address: 'Av. Tancredo Neves, 456 - Caminho das Árvores, Salvador - BA',
    phones: '(71) 99999-2222',
    description: 'Barbearia premium com atendimento VIP. Ambiente exclusivo e sofisticado.',
    imageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
  })
  await barbershopRepo.save(barbershop2)

  await serviceRepo.save([
    serviceRepo.create({
      name: 'Corte Premium',
      description: 'Corte com consultoria de estilo personalizada.',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138daaa4e8b0',
      price: 70.00,
      barbershopId: barbershop2.id,
    }),
    serviceRepo.create({
      name: 'Hidratação Capilar',
      description: 'Tratamento profundo para cabelos ressecados.',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
      price: 50.00,
      barbershopId: barbershop2.id,
    }),
    serviceRepo.create({
      name: 'Sobrancelha',
      description: 'Design de sobrancelha masculina.',
      imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
      price: 20.00,
      barbershopId: barbershop2.id,
    }),
    serviceRepo.create({
      name: 'Pacote VIP',
      description: 'Corte + Barba + Hidratação + Sobrancelha.',
      imageUrl: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8',
      price: 120.00,
      barbershopId: barbershop2.id,
    }),
  ])
  console.log('✅ Barber Premium criada com 4 serviços')

  // ─── Barbearia 3 ──────────────────────────────────
  const barbershop3 = barbershopRepo.create({
    name: 'StreetCut Barbearia',
    address: 'Rua Chile, 789 - Comércio, Salvador - BA',
    phones: '(71) 99999-3333',
    description: 'Estilo urbano e street. Especializados em cortes modernos e degradê.',
    imageUrl: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38',
  })
  await barbershopRepo.save(barbershop3)

  await serviceRepo.save([
    serviceRepo.create({
      name: 'Degradê',
      description: 'Corte degradê do iniciante ao avançado.',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138daaa4e8b0',
      price: 40.00,
      barbershopId: barbershop3.id,
    }),
    serviceRepo.create({
      name: 'Pézinho',
      description: 'Acabamento e alinhamento de pézinho.',
      imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
      price: 15.00,
      barbershopId: barbershop3.id,
    }),
    serviceRepo.create({
      name: 'Corte Infantil',
      description: 'Corte especializado para crianças até 12 anos.',
      imageUrl: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8',
      price: 30.00,
      barbershopId: barbershop3.id,
    }),
  ])
  console.log('✅ StreetCut Barbearia criada com 3 serviços')

  console.log('')
  console.log('🎉 Seed concluído com sucesso!')
  console.log('   3 barbearias | 10 serviços')

  await AppDataSource.destroy()
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Erro no seed:', error)
  process.exit(1)
})