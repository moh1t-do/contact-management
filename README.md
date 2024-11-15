## OVERVIEW
Contact Management feature helps users of the system to keep track of important contact information of customers/clients. It lets users add, view, update, and delete contact details all in one place. This makes it easy for users to find and manage information, which is especially helpful in a business setting where keeping track of relationships is key. For example, users can quickly find contact information, update it if anything changes, delete old contacts, or add new contacts. Having all this information in one organized space saves time and keeps everything efficient.

### Live Link
You can access the live application [here](https://contact-management-neon-one.vercel.app).

### User Interface
![UI Screenshot](images/ui.png)

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
    DATABASE_URL=postgresql://username:password@localhost:5432/contactdb
    CLIENT_URL=http://localhost:5173
    ```

4. Generate Prisma artifacts (e.g., Prisma Client):
    ```sh
    npx prisma generate
    ```

5. Apply database migrations:
    ```sh
    npx prisma migrate dev --name init
    ```

6. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the `client` directory:
    ```sh
    cd ../client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `client` directory and add the following environment variables:
    ```env
    VITE_SERVER_URL=http://localhost:8000
    ```

4. Start the frontend development server:
    ```sh
    npm run dev
    ```

### Running the Application
1. Open your browser and navigate to `http://localhost:5173` to access the Contact Management application.

## PROJECT DESCRIPTION

### Technical Decisions
- **Backend**: Built with Node.js and Express for handling API requests. Prisma ORM is used for database operations.
- **Frontend**: Built with React and Material-UI for a responsive and modern user interface.
- **Database**: PostgreSQL is used for storing contact information.

### Application Structure
- **Backend**:
  - `server/src/index.ts`: Entry point of the backend server.
  - `server/src/routes/contact.route.ts`: Defines the API routes for contact operations.
  - `server/src/controllers/contact.controller.ts`: Contains the logic for handling API requests.
- **Frontend**:
  - `client/src/pages/Dashboard.tsx`: Main page displaying the list of contacts with options to add, update, and delete.
  - `client/src/components/Form.tsx`: Form component used for both creating and updating contacts.

## CHALLENGES AND SOLUTIONS

### Challenge 1: Handling Asynchronous Operations
- **Solution**: Used async/await syntax to handle asynchronous operations in the backend. Ensured all promises are properly awaited and errors are caught using try-catch blocks.

### Challenge 2: State Management in React
- **Solution**: Used React's useState and useEffect hooks to manage state and side effects.

### Challenge 3: TypeScript Integration
- **Solution**: Ensured type safety by defining interfaces for data structures and using TypeScript's type assertions.

### Challenge 4: Error Handling
- **Solution**: Implemented centralized error handling in Express using middleware. Ensured all routes and controllers have proper error handling mechanisms.

### Challenge 5: Implementing Pagination
- **Solution**: Implemented pagination by using Material-UI's `TablePagination` component. Managed the current page and rows per page using React's useState hook. Updated the backend API to accept pagination parameters (`page` and `limit`) and return the total number of contacts along with the paginated data. This ensured that the frontend could correctly display the paginated data and navigate between pages.