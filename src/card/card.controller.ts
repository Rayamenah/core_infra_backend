import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { z } from 'zod';
import { CardService } from './card.service';
import { CardProfileDto } from './dto/cardProfile.dto';
import { CardRequestDto } from './dto/cardRequest.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  // Get all card profiles with pagination
  @Get()
  getAllCardProfiles(@Query() paginationDto: PaginationDto) {
    return this.cardService.findAll(paginationDto);
  }
  @Post('/profile')
  createCardProfile(@Body() data: Partial<z.infer<typeof CardProfileDto>>) {
    return this.cardService.createCardProfile(data);
  }
  // // Update a card profile by ID
  // @Put(':id/profile')
  // updateCardProfile(
  //   @Param('id') id: string,
  //   @Body() data: Partial<CardProfileType>,
  // ) {
  //   return this.cardService.updateCardProfile(id, data);
  // }

  // Get all card requests with pagination
  @Get('/request')
  getAllCardRequests(@Query() paginationDto: PaginationDto) {
    return this.cardService.findAllCardRequests(paginationDto);
  }

  // Get a specific card profile by ID
  @Get(':id/profile')
  getCardProfile(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  // Get a specific card request by ID
  @Get(':id/request')
  getCardRequest(@Param('id') id: string) {
    return this.cardService.findOneCardRequest(id);
  }

  // Update a card request by ID
  @Put(':id/request')
  updateCardRequest(
    @Param('id') id: string,
    @Body() data: Partial<z.infer<typeof CardRequestDto>>,
  ) {
    return this.cardService.updateCardRequest(id, data);
  }
}
