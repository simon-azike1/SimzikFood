# AfriDish — West African Restaurant Delivery App

A full-stack MERN restaurant web app for AfriDish, a West African home-delivery kitchen serving Rabat and Casablanca, Morocco. Built with React + Vite on the frontend and Node/Express + MongoDB on the backend, with Cloudinary image management and WhatsApp-based ordering.

🔗 **Live Demo:** [simzik-food.vercel.app](https://simzik-food.vercel.app)

---

##  Features

### Customer-Facing
- **Home Page** — Hero section, featured dishes, why us, how to order
- **Menu Page** — Full menu with category filter (All / Main / Stews / Soups / Sides / Drinks)
- **About Page** — Story, values, what we serve, delivery coverage
- **Services Page** — Service offerings + full pricing table
- **Contact Page** — WhatsApp CTA + contact form
- **WhatsApp Ordering** — One-click order via WhatsApp
- **Promo Banner** — Free delivery popup (once per session)
- **Scroll To Top** — Smooth animated button

### Admin Dashboard
-  **JWT-protected login**
-  Add / ✏️ Edit / 🗑️ Delete menu items
-  **Cloudinary image upload** — drag & drop, preview, replace, remove
-  Toggle featured dishes
-  Desktop table + mobile card views

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS v3, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Images | Cloudinary + Multer |
| Icons | Lucide React |
| HTTP | Axios |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
uzy/
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   └── Menu.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── upload.js       ← Cloudinary upload/delete
│   │   └── contact.js
│   ├── middleware/
│   ├── seedMenu.js
│   └── server.js
└── frontend/
    ├── public/
    │   └── logo.png
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── admin/
        │   ├── AdminDashboard.jsx
        │   ├── AdminLogin.jsx
        │   ├── AuthContext.jsx
        │   └── ProtectedRoute.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── PromoBanner.jsx
        │   └── ScrollToTop.jsx
        └── pages/
            ├── Home.jsx
            ├── Menu.jsx
            ├── About.jsx
            ├── Services.jsx
            └── Contact.jsx
```

---

##  Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/your-username/SimzikFood.git
cd SimzikFood
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`, proxies API calls to `http://localhost:5000`.

### 4. Seed the menu (optional)

```bash
cd backend
node seedMenu.js
```

---

##  Deployment

### Frontend → Vercel
1. Connect your GitHub repo to Vercel
2. Set **Root Directory** to `frontend`
3. Set **Output Directory** to `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

### Backend → Render
1. Connect your GitHub repo to Render
2. Set **Root Directory** to `backend`
3. Add all `.env` variables in Render's environment settings
4. Build command: `npm install`
5. Start command: `node server.js`

---

##  Admin Access

Navigate to `/admin` to access the dashboard. Create an admin account via the backend seed script or directly in MongoDB.

---

##  Screenshots

> Coming soon — add screenshots of Home, Menu, and Admin Dashboard here.

---

##  Menu Data

AfriDish serves 11 authentic West African dishes across 3 categories:

| Dish | Category |
|------|----------|
| Jollof Rice | Main |
| Fried Rice | Main |
| Suya | Main |
| Chicken Stew | Stews |
| Okro Soup | Soups |
| Ogbono Soup | Soups |
| Vegetable Soup (Efo Riro) | Soups |
| Pepper Soup | Soups |
| Palava Sauce | Soups |
| Liberian Jollof Rice | Main |
| Pepper Butter Fish | Soups |

---

## 📄 License

This project is private and built for AfriDish restaurant. Not licensed for public redistribution.

---



<img width="1884" height="892" alt="image" src="https://github.com/user-attachments/assets/00db107f-b8fd-4c18-a400-2d952bc85980" />



Developed  for AfriDish — bringing authentic West African flavors to Morocco.


## Built by SimzikTech
