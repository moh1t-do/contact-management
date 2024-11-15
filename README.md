## OVERVIEW
Contact Management feature helps users of the system to keep track of important contact information of customers/clients. It lets users add, view, update, and delete contact details all in one place. This makes it easy for users to find and manage information, which is especially helpful in a business setting where keeping track of relationships is key. For example, users can quickly find contact information, update it if anything changes, delete old contacts, or add new contacts. Having all this information in one organized space saves time and keeps everything efficient.

### User Interface

![UI Screenshot](/images/ui.png)

### Database Schema

| Field     | Type     | Attributes                |
|-----------|----------|---------------------------|
| id        | String   | @id @default(cuid())      |
| firstName | String   |                           |
| lastName  | String   |                           |
| email     | String   | @unique                   |
| phone     | String   | @unique                   |
| company   | String   |                           |
| jobTitle  | String   |                           |
| createdAt | DateTime | @default(now())           |
| updatedAt | DateTime | @updatedAt                |


## SETUP INSTRUCTIONS

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (or any other supported database)

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/moh1t-do/contact-management.git
    cd contact-management/server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following environment variables:
    ```env
    SERVER_PORT=8000
    DB_URL=postgresql://username:password@localhost:5432/contactdb
    CLIENT_URL=http://localhost:5173
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Install dependencies:
    ```sh
    npm install
    ```

2. Create a `.env` file in the `client` directory and add the following environment variables:
    ```env
    VITE_SERVER_URL=http://localhost:8000
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## PROJECT DESCRIPTION

### Technical Decisions
- **Backend**: Built with Node.js and Express for handling API requests. Prisma ORM is used for database operations.
- **Frontend**: Built with React and Material-UI for a responsive and modern user interface.
- **Database**: PostgreSQL is used for storing contact information.

## CHALLENGES AND SOLUTIONS

### Reason for choosing PostgreSQL

- Offers strong schema enforcement at database level.
- Ensures data consistency by validating the structure (e.g., email must always be unique, firstName and lastName are required).
- Particularly useful for structured data like contacts where fields are clearly defined.
- Best for data with relationships. For instance, in a full CRM, you might associate contacts with companies or accounts in other tables.