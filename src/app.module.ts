import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardController } from './card/card.controller';
import { CardModule } from './card/card.module';
import { CardService } from './card/card.service';
import { DashboardController } from './modules/dashboard/dashboard.controller';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [CardModule, DashboardModule, PrismaModule],
  controllers: [AppController, CardController, DashboardController],
  providers: [AppService, CardService, DashboardService],
})
export class AppModule { }
