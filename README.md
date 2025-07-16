# Full-Stack Project: Contact-Agenda

This is a complete full-stack project, consisting of a robust back-end API and a modern, reactive front-end UI.

The back-end is built with the **NestJS** framework, using **Prisma** as an ORM to interact with the database. Authentication is handled via **JWT** tokens. The API documentation is automatically generated with **Swagger**.

The front-end was developed with **React** and **TypeScript**, using **Vite** as a build tool for a fast and optimized development experience.

## 🚀 Tech Stack

### **Back-End**
* **Framework:** [NestJS](https://nestjs.com/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [JWT](https://jwt.io/) with [Passport.js](http://www.passportjs.org/)
* **Validation:** `class-validator` & `class-transformer`
* **API Documentation:** [Swagger](https://swagger.io/)

### **Front-End**
* **Library/Framework:** [React](https://reactjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** `styled-components` (inferred from `GlobalStyles`)
* **Routing:** `react-router-dom` (inferred from `RoutesMain`)
* **Notifications:** `react-toastify`

## 📁 Folder Structure

This repository is a monorepo and contains two separate applications:

* `backend/`: Contains all the source code for the NestJS API.
* `frontend/`: Contains all the source code for the React application.

Each folder has its own `package.json`, and its dependencies must be installed separately.

## 🔧 Getting Started

To run the full project, you will need to run the back-end and front-end in separate terminals.

### 1. Setting Up the Back-End (NestJS)

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up the database:**
    * Create a `.env` file in the `backend/` root directory.
    * Inside this file, add the `DATABASE_URL` environment variable with your database connection string (this project is configured for PostgreSQL or MySQL with Prisma):
        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
        ```
4.  **Run the Prisma migrations:** This command will create the tables in your database based on the schema.
    ```bash
    npx prisma migrate dev
    ```
5.  **Start the development server:**
    ```bash
    npm run start:dev
    ```
6.  The back-end server will be running at `http://localhost:3000`.

### 2. Setting Up the Front-End (React)

1.  **Open a new terminal.**
2.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development application:**
    ```bash
    npm run dev
    ```
5.  The front-end application will be available at the address provided by Vite (usually `http://localhost:5173`).

## 📖 API Documentation (Swagger)

The complete API endpoint documentation was generated with Swagger and is available for Browse while the back-end is running.

To access it, open your browser and navigate to: **[http://localhost:3000/api](http://localhost:3000/api)**
