# NestJS Backend with Prisma and PostgreSQL

## Overview
This is a NestJS backend that integrates Prisma as an ORM and PostgreSQL as the database. It provides API endpoints to manage cards and retrieve dashboard data.

## Technologies Used
- **NestJS** - A progressive Node.js framework for building efficient and scalable applications.
- **Prisma** - A modern ORM for database management.
- **PostgreSQL** - A relational database system.
- **Docker** (Optional) - For containerizing the application.

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   PORT=5000
   ```
4. Run Prisma migrations:
   ```sh
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Seed database:
   ```sh
   pnpm run seed 
   ```
6. Start the server:
   ```sh
   pnpm run start
   ```

## API Endpoints

### 1. Get All Card Information
- **Endpoint:** `GET /cards`
- **Description:** Retrieves all available card information.
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "name": "Platinum Card",
      "status": "active"
    },
    {
      "id": 2,
      "name": "Gold Card",
      "status": "inactive"
    }
  ]
  ```

### 2. Get Dashboard Information
- **Endpoint:** `GET /dashboard`
- **Description:** Fetches dashboard-related statistics and insights.
- **Response Example:**
  ```json
  {
    "total_active_cards": 54321,
    "total_revenue": 9300000,
    "pending_requests": 25
  }
  ```

### 3. Create a Card Profile
- **Endpoint:** `POST /cards/profile`
- **Description:** Creates a new card profile.
- **Request Body Example:**
  ```json
  {
    "card_name": "Platinum Card",
    "bin_prefix": "123456",
    "card_scheme": "VISA",
    "expiration": "2026-12-31",
    "currency": "USD"
  }
  ```
- **Response Example:**
  ```json
  {
    "id": 3,
    "card_name": "Platinum Card",
    "status": "active"
  }
  ```

### 4. Update Card Request
- **Endpoint:** `PUT /cards/{id}/request`
- **Description:** Updates a card request status.
- **Path Parameters:**
  - `id` (integer) - The card ID to update.
- **Request Body Example:**
  ```json
  {
    "status": "approved"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Card request updated successfully"
  }
  ```

## License
This project is licensed under the MIT License.

