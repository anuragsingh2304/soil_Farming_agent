# 🌱 Soil Farming Agent

A full-stack web application designed for small-scale farmers and gardening enthusiasts. It helps users identify suitable crops based on different soil types and locate nearby distributors for seeds, compost, fertilizers, and other farming supplies.

---

## 🔗 Live Links

- **Frontend:** [https://farming-beryl.vercel.app](https://farming-beryl.vercel.app)
- **Backend API:** [https://soilfarming.onrender.com](https://soilfarming.onrender.com)

---

## 🎯 Features

### 👨‍🌾 For Users
- View different soil types and their properties
- Discover which crops grow best in specific soils
- Search for distributors based on region, state, or crop
- Secure authentication and personalized dashboard

### 👨‍💼 For Admins
- Add, update, or delete soil records
- Manage distributors’ details
- Admin dashboard to handle all data operations

### 🖥️ Logging 

Implemented the logging using the Winston a popular Node.js logging library.

## 🧱 Tech Stack

| Frontend              | Backend             | Database       | Services Used                        |
|----------------------|---------------------|----------------|--------------------------------------|
| Next.js (TypeScript) | Node.js + Express   | MongoDB Atlas  | Cloudinary (Image Storage)           |
| Tailwind CSS         | JWT Authentication  |                | Vercel (Frontend), Render (Backend)  |

---

## 📁 Project Structure

```plaintext
Farming/
├── app/
│   ├── admin-dashboard/
│   │   ├── distributors/
│   │   ├── soil/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── admin-login/
│   │   └── page.tsx
│   ├── register/
│   │   ├–page.tsx
│   ├── user-dashboard/
│   ├── user-login/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── ui
│   ├── cloudinary-upload.tsx
│   ├── dashboard-sidebar.tsx
│   ├── image-upload.tsx
│   ├.......
├── hooks/
├── lib/
├── next-backend/
│   ├── logs/
│   ├── models/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── distributorRoutes.js
│   │   ├── soilRoutes.js
│   │   ├── testRoutes.js
│   ├── db.js
│   ├── index.js
│   ├── logger.js
│   ├── token.js
│   ├── protect.js
│   ├── package-lock.json
│   └── package.json
├── public/
│   └── images/
├── package.json
├── package-lock.json
├── tailwind.config.ts
└── tsconfig.json
```

## Technologies Used

- **Frontend**:
  - Next.js 14 (React framework)
  - TypeScript
  - Tailwind CSS for styling
  - React Hook Form for form handling

- **Backend**:
  - Express.js
  - Mongo DB Atlas
  - Json web tokens 

- **State Management**:
  - React Context API
  - React Hooks

- **Authentication**:
  - JWT (JSON Web Tokens)
  - HTTP-only cookies for token storage

- **UI Components**:
  - Custom components
  - Responsive design for mobile and desktop



# 🚀 Optimization Techniques

**✅ Code-Level**
- Avoid unnecessary re-renders using `React.memo`
- Used modular structure for controllers and routes
- Removed redundant database calls

**✅ Architecture-Level**
- Stateless APIs
- Decoupled frontend and backend
- API versioning for scalability
- Asynchronous functions for I/O operations

**✅ Database-Level**
- Indexed key fields like user ID and scheme ID
- Avoided nested loops in queries
- Used pagination in listing endpoints

---


## 👨‍💻 Contributors

1. **[Atul Mishra](https://github.com/AtulMishra001) :** 
 contributed by 
 - Developing the RESTful API.
 - Integration of Front-end, Back-end.
 - Deployment of Front-end(on Vercel), Back-end(on rander)

2. **[Anurag Singh](https://github.com/manvesingh) :**
- contributed by creating a responsive and optimized Front-end.

3. **[Praveen Kumar](https://github.com/praveenpal21) :**
- Contributed by writting Documentation and creating test cases for better development.