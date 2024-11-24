# 🛠️ BOCUM Issue Tracker App

Welcome to the **BOCUM Issue Tracker App**! This project is a full-stack issue tracker application built with **Next.js** and **Prisma** for managing issues seamlessly.

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

---

### 📋 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v20)
- **MySQL** (v8.0 or higher)
- **Prisma CLI** (installed via the project dependencies)

### 📦 Install Dependencies

yarn install

---

### 🗄️ Configure the Database

Create a .env file in the root directory.

DATABASE_URL="mysql://root:your_password@localhost:3306/issue-tracker"

---

### ⚙️ Migrate the Database

To apply database migrations using Prisma, run:

npx prisma migrate dev
npx prisma format

---

### ▶️ Run the Development Server

yarn run dev
