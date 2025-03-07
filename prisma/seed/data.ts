/* eslint-disable prettier/prettier */
import { CardScheme, Currency, FeeFrequency, FeeImpact, AccountPaid } from '@prisma/client';

const cardRequests = [
    {
        branch_name: 'Main Branch',
        initiator: 'John Doe',
        card_type: 'CLASSIC_DEBIT',
        card_charges: 5000,
        quantity: 100,
        batch: 'BATCH-001',
        status: 'PENDING',
    },
    {
        branch_name: 'West Branch',
        initiator: 'Jane Smith',
        card_type: 'CLASSIC_CREDIT',
        card_charges: 7000,
        quantity: 50,
        batch: 'BATCH-002',
        status: 'IN_PROGRESS',
    },
    {
        branch_name: 'East Branch',
        initiator: 'David Johnson',
        card_type: 'CLASSIC_DEBIT',
        card_charges: 4500,
        quantity: 75,
        batch: 'BATCH-003',
        status: 'READY',
    },
    {
        branch_name: 'North Branch',
        initiator: 'Emily Brown',
        card_type: 'CLASSIC_CREDIT',
        card_charges: 8000,
        quantity: 30,
        batch: 'BATCH-004',
        status: 'ACKNOWLEDGED',
    },
    {
        branch_name: 'South Branch',
        initiator: 'Michael Wilson',
        card_type: 'CLASSIC_DEBIT',
        card_charges: 6000,
        quantity: 120,
        batch: 'BATCH-005',
        status: 'PENDING',
    },
    {
        branch_name: 'Downtown Branch',
        initiator: 'Sarah Lee',
        card_type: 'CLASSIC_CREDIT',
        card_charges: 7500,
        quantity: 90,
        batch: 'BATCH-006',
        status: 'IN_PROGRESS',
    },
    {
        branch_name: 'Central Branch',
        initiator: 'Chris Martinez',
        card_type: 'CLASSIC_DEBIT',
        card_charges: 5200,
        quantity: 110,
        batch: 'BATCH-007',
        status: 'READY',
    },
    {
        branch_name: 'Uptown Branch',
        initiator: 'Laura Garcia',
        card_type: 'CLASSIC_CREDIT',
        card_charges: 9000,
        quantity: 45,
        batch: 'BATCH-008',
        status: 'ACKNOWLEDGED',
    },
    {
        branch_name: 'Lakeside Branch',
        initiator: 'Daniel Harris',
        card_type: 'CLASSIC_DEBIT',
        card_charges: 4800,
        quantity: 85,
        batch: 'BATCH-009',
        status: 'PENDING',
    },
    {
        branch_name: 'Hilltop Branch',
        initiator: 'Sophia White',
        card_type: 'CLASSIC_CREDIT',
        card_charges: 6800,
        quantity: 60,
        batch: 'BATCH-010',
        status: 'IN_PROGRESS',
    },
];

const cardProfiles = [
    {
        fees_id: 'fee-001',
        card_name: 'Standard Debit',
        bin_prefix: '123456',
        card_scheme: CardScheme.VISA, // Use Enum
        expiration: new Date('2027-12-31'),
        description: 'A standard debit card for everyday transactions.',
        currency: Currency.NGN, // Use Enum
        branch_blacklist: ['BranchA', 'BranchB'],
    },
    {
        fees_id: 'fee-002',
        card_name: 'Platinum Credit',
        bin_prefix: '234567',
        card_scheme: CardScheme.MASTERCARD,
        expiration: new Date('2028-06-30'),
        description: 'Exclusive platinum credit card with rewards.',
        currency: Currency.USD,
        branch_blacklist: ['BranchC'],
    },
    {
        fees_id: 'fee-003',
        card_name: 'Gold Debit',
        bin_prefix: '345678',
        card_scheme: CardScheme.VISA,
        expiration: new Date('2026-09-30'),
        description: 'Premium debit card with cashback benefits.',
        currency: Currency.EUR,
        branch_blacklist: [],
    },
    {
        fees_id: 'fee-004',
        card_name: 'Business Credit',
        bin_prefix: '456789',
        card_scheme: CardScheme.MASTERCARD,
        expiration: new Date('2029-01-15'),
        description: 'Corporate credit card for business expenses.',
        currency: Currency.NGN,
        branch_blacklist: ['BranchD'],
    },
    {
        fees_id: 'fee-005',
        card_name: 'Student Debit',
        bin_prefix: '567890',
        card_scheme: CardScheme.VISA,
        expiration: new Date('2025-07-20'),
        description: 'Special debit card for students.',
        currency: Currency.USD,
        branch_blacklist: ['BranchE'],
    },
    {
        fees_id: 'fee-006',
        card_name: 'Silver Credit',
        bin_prefix: '678901',
        card_scheme: CardScheme.MASTERCARD,
        expiration: new Date('2028-11-05'),
        description: 'Silver-tier credit card with exclusive offers.',
        currency: Currency.EUR,
        branch_blacklist: ['BranchF', 'BranchG'],
    },
    {
        fees_id: 'fee-007',
        card_name: 'Elite Debit',
        bin_prefix: '789012',
        card_scheme: CardScheme.VISA,
        expiration: new Date('2027-04-12'),
        description: 'High-limit debit card for premium users.',
        currency: Currency.NGN,
        branch_blacklist: [],
    },
    {
        fees_id: 'fee-008',
        card_name: 'Corporate Debit',
        bin_prefix: '890123',
        card_scheme: CardScheme.MASTERCARD,
        expiration: new Date('2030-02-25'),
        description: 'Debit card for corporate clients with additional features.',
        currency: Currency.USD,
        branch_blacklist: ['BranchH'],
    },
    {
        fees_id: 'fee-009',
        card_name: 'Basic Credit',
        bin_prefix: '901234',
        card_scheme: CardScheme.VISA,
        expiration: new Date('2025-12-15'),
        description: 'Basic credit card for general use.',
        currency: Currency.EUR,
        branch_blacklist: [],
    },
    {
        fees_id: 'fee-010',
        card_name: 'Exclusive Gold Credit',
        bin_prefix: '012345',
        card_scheme: CardScheme.MASTERCARD,
        expiration: new Date('2029-08-10'),
        description: 'Gold-tier exclusive credit card with premium perks.',
        currency: Currency.NGN,
        branch_blacklist: ['BranchI'],
    },
];


const fees = [
    {
        id: 'fee-001',
        card_id: 'card-001',
        name: 'Standard Debit Fee',
        value: 500,
        currency: Currency.NGN, // Use the Enum
        fee_frequency: FeeFrequency.ONE_OFF,
        fee_impact: FeeImpact.ISSUANCE,
        amount_pad: AccountPaid.NONE,
        account: 1001,
    },
    {
        id: 'fee-002',
        card_id: 'card-002',
        name: 'Platinum Credit Fee',
        value: 2000,
        currency: Currency.USD,
        fee_frequency: FeeFrequency.MONTHLY,
        fee_impact: FeeImpact.FEE_REISSUE,
        amount_pad: AccountPaid.BRANCH_CODE_PREFIX,
        account: 1002,
    },
    {
        id: 'fee-003',
        card_id: 'card-003',
        name: 'Gold Debit Fee',
        value: 800,
        currency: Currency.EUR,
        fee_frequency: FeeFrequency.ONE_OFF,
        fee_impact: FeeImpact.ISSUANCE,
        amount_pad: AccountPaid.NONE,
        account: 1003,
    },
    {
        id: 'fee-004',
        card_id: 'card-004',
        name: 'Business Credit Fee',
        value: 2500,
        currency: Currency.NGN,
        fee_frequency: FeeFrequency.MONTHLY,
        fee_impact: FeeImpact.FEE_REISSUE,
        amount_pad: AccountPaid.BRANCH_CODE_SUFFIX,
        account: 1004,
    },
    {
        id: 'fee-005',
        card_id: 'card-005',
        name: 'Student Debit Fee',
        value: 300,
        currency: Currency.USD,
        fee_frequency: FeeFrequency.ONE_OFF,
        fee_impact: FeeImpact.ISSUANCE,
        amount_pad: AccountPaid.NONE,
        account: 1005,
    },
    {
        id: 'fee-006',
        card_id: 'card-006',
        name: 'Silver Credit Fee',
        value: 1200,
        currency: Currency.EUR,
        fee_frequency: FeeFrequency.MONTHLY,
        fee_impact: FeeImpact.FEE_REISSUE,
        amount_pad: AccountPaid.BRANCH_CODE_PREFIX,
        account: 1006,
    },
    {
        id: 'fee-007',
        card_id: 'card-007',
        name: 'Elite Debit Fee',
        value: 1800,
        currency: Currency.NGN,
        fee_frequency: FeeFrequency.ONE_OFF,
        fee_impact: FeeImpact.ISSUANCE,
        amount_pad: AccountPaid.NONE,
        account: 1007,
    },
    {
        id: 'fee-008',
        card_id: 'card-008',
        name: 'Corporate Debit Fee',
        value: 1500,
        currency: Currency.USD,
        fee_frequency: FeeFrequency.MONTHLY,
        fee_impact: FeeImpact.FEE_REISSUE,
        amount_pad: AccountPaid.BRANCH_CODE_SUFFIX,
        account: 1008,
    },
    {
        id: 'fee-009',
        card_id: 'card-009',
        name: 'Basic Credit Fee',
        value: 400,
        currency: Currency.EUR,
        fee_frequency: FeeFrequency.ONE_OFF,
        fee_impact: FeeImpact.ISSUANCE,
        amount_pad: AccountPaid.NONE,
        account: 1009,
    },
    {
        id: 'fee-010',
        card_id: 'card-010',
        name: 'Exclusive Gold Credit Fee',
        value: 3000,
        currency: Currency.NGN,
        fee_frequency: FeeFrequency.MONTHLY,
        fee_impact: FeeImpact.FEE_REISSUE,
        amount_pad: AccountPaid.BRANCH_CODE_PREFIX,
        account: 1010,
    },
];

export default fees;


export { cardProfiles, cardRequests, fees };
