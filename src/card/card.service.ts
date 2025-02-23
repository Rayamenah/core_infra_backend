import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CardRequestDto } from './dto/cardRequest.dto';
import { PaginationDto } from './dto/pagination.dto';
import { CardProfileType } from './dto/cardProfile.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll({ page = 1, limit = 10, sort }: PaginationDto) {
    const resultsLimit = Math.min(Math.max(1, Number(limit) || 10), 100);
    const pageNumber = Math.max(1, Number(page) || 1);

    const [sortField, sortOrder] = sort?.split(':') || [];
    const orderBy = sortField ? { [sortField]: sortOrder || 'asc' } : undefined;

    try {
      const results = await this.prisma.cardProfile.findMany({
        skip: (pageNumber - 1) * resultsLimit,
        take: resultsLimit,
        orderBy,
        include: { fees: true },
      });

      return { page: pageNumber, limit: resultsLimit, results };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error retrieving card profiles');
    }
  }

  async findAllCardRequests({ page = 1, limit = 10, sort }: PaginationDto) {
    const resultsLimit = Math.min(Math.max(1, Number(limit) || 10), 100);
    const pageNumber = Math.max(1, Number(page) || 1);

    const [sortField, sortOrder] = sort?.split(':') || [];
    const orderBy = sortField ? { [sortField]: sortOrder || 'asc' } : undefined;

    try {
      const results = await this.prisma.cardRequest.findMany({
        skip: (pageNumber - 1) * resultsLimit,
        take: resultsLimit,
        orderBy,
      });

      return { page: pageNumber, limit: resultsLimit, results };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error retrieving card requests');
    }
  }

  async findOne(id: string) {
    try {
      const card = this.prisma.cardProfile.findUnique({
        where: { id },
      });

      if (!card) {
        throw new NotFoundException('This payroll does not exist');
      }
      return card;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Error fetching payroll');
      }
      throw new InternalServerErrorException('Error retrieving payroll');
    }
  }
  async findOneCardRequest(id: string) {
    try {
      const card = this.prisma.cardRequest.findUnique({
        where: { id },
      });

      if (!card) {
        throw new NotFoundException('This payroll does not exist');
      }
      return card;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Error fetching payroll');
      }
      throw new InternalServerErrorException('Error retrieving payroll');
    }
  }

  async updateCardRequest(
    id: string,
    updateData: Partial<z.infer<typeof CardRequestDto>>,
  ) {
    return this.prisma.cardRequest
      .update({
        where: { id },
        data: updateData,
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException('Card request not found');
          }
          throw new BadRequestException('Error updating card request');
        }
        throw new InternalServerErrorException('Unexpected error');
      });
  }

  async createCardProfile(createProfile: Partial<CardProfileType>) {
    try {
      const { fees, ...card } = createProfile;

      const profile = await this.prisma.cardProfile.findFirst({
        where: { bin_prefix: card.bin_prefix },
      });
      if (profile) throw new BadRequestException('card profile already exists');

      const newCard = await this.prisma.cardProfile.create({
        data: {
          card_name: card.card_name,
          currency: card.currency,
          branch_blacklist: card.branch_blacklist,
          bin_prefix: card.bin_prefix,
          card_scheme: card.card_scheme,
          expiration: card.expiration,
          description: card.description,
        },
      });
      let newFees = [];

      if (fees && fees.length > 0) {
        newFees = [];
        for (const fee of fees) {
          const createdFee = await this.prisma.fees.create({
            data: {
              name: fee.fee_name,
              card_id: newCard.id,
              value: fee.value,
              currency: fee.currency,
              fee_frequency: fee.fee_frequency,
              fee_impact: fee.fee_impact,
              account_paid: fee.account_paid,
              account: fee.account,
            },
          });
          newFees.push(createdFee);
        }
      }
      return {
        cardProfile: {
          ...newCard,
          fees: newFees,
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Card profile not found');
        }
        throw new BadRequestException('Error updating card profile');
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
  // async updateCardProfile(id: string, updateData: Partial<CardProfileType>) {
  //   try {
  //     const { fees, ...card } = updateData;

  //     const profile = await this.prisma.cardProfile.findFirst({
  //       where: { id },
  //     });
  //     if (!profile)
  //       throw new BadRequestException('Card profile does not exist');

  //     const updatedCardProfile = await this.prisma.cardProfile.update({
  //       where: { id },
  //       data: card,
  //     });

  //     const updatedFees = [];

  //     if (fees && fees.length > 0) {
  //       for (const fee of fees) {
  //         // Check if the fee exists before updating
  //         const existingFee = await this.prisma.fees.findFirst({
  //           where: { id: fee.id, card_id: updatedCardProfile.id },
  //         });

  //         if (existingFee) {
  //           const updatedFee = await this.prisma.fees.update({
  //             where: { id: fee.id },
  //             data: {
  //               name: fee.fee_name,
  //               value: fee.value,
  //               currency: fee.currency,
  //               fee_frequency: fee.fee_frequency,
  //               fee_impact: fee.fee_impact,
  //               account_paid: fee.account_paid,
  //               account: fee.account,
  //             },
  //           });
  //           updatedFees.push(updatedFee);
  //         }
  //       }
  //     }

  //     return {
  //       updatedCardProfile: {
  //         ...updatedCardProfile,
  //         fees: updatedFees,
  //       },
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2025') {
  //         throw new NotFoundException('Card profile not found');
  //       }
  //       throw new BadRequestException('Error updating card profile');
  //     }
  //     throw new InternalServerErrorException('Unexpected error');
  //   }
  // }
}
