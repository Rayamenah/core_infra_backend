import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) { }

    async getInfo() {
        try {
            const results = await this.prisma.cardRequest.findMany({});
            const personalized = Math.floor(10 + Math.random() * 99);
            const instant = Math.floor(5 + Math.random() * (personalized - 5));

            return {
                total_active_cards: Math.floor(10000 + Math.random() * 90000),
                total_personalized_cards: Math.floor(10000 + Math.random() * 90000),
                total_revenue: 9.3,
                pending_request: Math.floor(10 + Math.random() * 90),
                monthly_issuance: [
                    {
                        month: 'January',
                        personalized,
                        instant: Math.floor(5 + Math.random() * 80),
                    },
                    {
                        month: 'February',
                        personalized,
                        instant: Math.floor(10 + Math.random() * 80),
                    },
                    {
                        month: 'March',
                        personalized,
                        instant,
                    },
                    {
                        month: 'April',
                        personalized,
                        instant,
                    },
                    {
                        month: 'May',
                        personalized,
                        instant,
                    },
                    {
                        month: 'June',
                        personalized,
                        instant,
                    },
                ],
                this_week_income: [
                    { day: 'Monday', amount: Math.floor(10 + Math.random() * 90) },
                    { day: 'Tuesday', amount: Math.floor(10 + Math.random() * 90) },
                    { day: 'Wednesday', amount: Math.floor(10 + Math.random() * 90) },
                    { day: 'Thursday', amount: Math.floor(10 + Math.random() * 90) },
                    { day: 'Friday', amount: Math.floor(10 + Math.random() * 90) },
                    { day: 'Saturday', amount: Math.floor(10 + Math.random() * 90) },
                    { day: 'Sunday', amount: Math.floor(10 + Math.random() * 90) },
                ],
                card_status_distribution: [
                    { status: 'active', amount: Math.floor(100 + Math.random() * 900) },
                    { status: 'expired', amount: Math.floor(100 + Math.random() * 900) },
                    { status: 'inactive', amount: Math.floor(100 + Math.random() * 900) },
                    { status: 'blocked', amount: Math.floor(100 + Math.random() * 900) },
                    { status: 'lost', amount: Math.floor(100 + Math.random() * 900) },
                ],
                recent_card_requests: results,
            };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error retrieving card profiles');
        }
    }
}
