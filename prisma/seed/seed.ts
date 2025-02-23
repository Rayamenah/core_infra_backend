import {
    AccountPaid,
    BranchBlackList,
    CardScheme,
    CardStatus,
    CardType,
    Currency,
    FeeFrequency,
    FeeImpact,
    PrismaClient,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Insert 5 CardProfiles
    const cardProfilesData = [
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_name: 'Standard Debit',
            bin_prefix: '123456',
            card_scheme: CardScheme.VISA,
            expiration: new Date('2027-12-31'),
            description: 'A standard debit card for everyday transactions.',
            currency: Currency.NGN,
            branch_blacklist: BranchBlackList.HEAD_OFFICE,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_name: 'Platinum Credit',
            bin_prefix: '234567',
            card_scheme: CardScheme.MASTERCARD,
            expiration: new Date('2028-06-30'),
            description: 'Exclusive platinum credit card with rewards.',
            currency: Currency.USD,
            branch_blacklist: BranchBlackList.ABUJA_OFFICE,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_name: 'Gold Debit',
            bin_prefix: '345678',
            card_scheme: CardScheme.VISA,
            expiration: new Date('2026-09-15'),
            description: 'Premium debit card with additional benefits.',
            currency: Currency.EUR,
            branch_blacklist: BranchBlackList.LAGOS_OFFICE,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_name: 'Silver Debit',
            bin_prefix: '456789',
            card_scheme: CardScheme.MASTERCARD,
            expiration: new Date('2029-02-20'),
            description: 'A cost-effective card with essential features.',
            currency: Currency.NGN,
            branch_blacklist: BranchBlackList.ABUJA_OFFICE,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_name: 'Elite Credit',
            bin_prefix: '567890',
            card_scheme: CardScheme.VISA,
            expiration: new Date('2027-07-10'),
            description: 'Exclusive elite credit card for VIPs.',
            currency: Currency.USD,
            branch_blacklist: BranchBlackList.HEAD_OFFICE,
        },
    ];

    await prisma.cardProfile.createMany({ data: cardProfilesData });
    console.log('✅ Card Profiles seeded!');

    const feesData = [
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_id: cardProfilesData[0].id,
            name: 'Monthly Maintenance',
            value: 500,
            currency: Currency.NGN,
            fee_frequency: FeeFrequency.MONTHLY,
            fee_impact: FeeImpact.ISSUANCE,
            account_paid: AccountPaid.NONE,
            account: 123456789,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_id: cardProfilesData[1].id,
            name: 'One-time Setup Fee',
            value: 1000,
            currency: Currency.USD,
            fee_frequency: FeeFrequency.ONE_OFF,
            fee_impact: FeeImpact.FEE_REISSUE,
            account_paid: AccountPaid.BRANCH_CODE_SUFFIX,
            account: 987654321,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_id: cardProfilesData[2].id,
            name: 'Annual Service Fee',
            value: 750,
            currency: Currency.EUR,
            fee_frequency: FeeFrequency.MONTHLY,
            fee_impact: FeeImpact.ISSUANCE,
            account_paid: AccountPaid.BRANCH_CODE_PREFIX,
            account: 555666777,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_id: cardProfilesData[3].id,
            name: 'Transaction Fee',
            value: 250,
            currency: Currency.NGN,
            fee_frequency: FeeFrequency.ONE_OFF,
            fee_impact: FeeImpact.FEE_REISSUE,
            account_paid: AccountPaid.NONE,
            account: 999888777,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            card_id: cardProfilesData[4].id,
            name: 'Overdraft Charge',
            value: 1500,
            currency: Currency.USD,
            fee_frequency: FeeFrequency.MONTHLY,
            fee_impact: FeeImpact.ISSUANCE,
            account_paid: AccountPaid.BRANCH_CODE_SUFFIX,
            account: 444555666,
        },
    ];

    await prisma.fees.createMany({ data: feesData });

    console.log('✅ Fees seeded!');

    const cardRequestsData = [
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            branch_name: 'Lagos Branch',
            initiator: 'John Doe',
            card_type: CardType.CLASSIC_DEBIT,
            card_charges: 2000,
            quantity: 100,
            batch: 'Batch-001',
            status: CardStatus.PENDING,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            branch_name: 'Abuja Branch',
            initiator: 'Jane Doe',
            card_type: CardType.CLASSIC_CREDIT,
            card_charges: 3000,
            quantity: 150,
            batch: 'Batch-002',
            status: CardStatus.IN_PROGRESS,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            branch_name: 'Port Harcourt Branch',
            initiator: 'Alex Smith',
            card_type: CardType.CLASSIC_DEBIT,
            card_charges: 1500,
            quantity: 200,
            batch: 'Batch-003',
            status: CardStatus.READY,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            branch_name: 'Enugu Branch',
            initiator: 'Sarah Johnson',
            card_type: CardType.CLASSIC_CREDIT,
            card_charges: 2500,
            quantity: 180,
            batch: 'Batch-004',
            status: CardStatus.ACKNOWLEDGED,
        },
        {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            branch_name: 'Kano Branch',
            initiator: 'Michael Adams',
            card_type: CardType.CLASSIC_DEBIT,
            card_charges: 1800,
            quantity: 120,
            batch: 'Batch-005',
            status: CardStatus.PENDING,
        },
    ];

    await prisma.cardRequest.createMany({ data: cardRequestsData });

    console.log('✅ Card Requests seeded!');
}
main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
