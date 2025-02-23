import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardservice: DashboardService) { }

    // Get all card profiles with pagination
    @Get()
    getAllCardProfiles() {
        return this.dashboardservice.getInfo();
    }
}
