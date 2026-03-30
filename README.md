# HOMEBUY - Real Estate Platform

A complete full-stack real estate platform with landing page, main application, and backend API built with React, Express.js, and MongoDB.

## 📁 Project Structure

```
real-estate-app/
├── landing/               # Landing page (port 3001)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/       # Images and icons
│   │   ├── components/   # Header, Footer
│   │   ├── pages/        # Home, Contact
│   │   ├── locales/      # Translations (VI/EN/ZH)
│   │   ├── App.js
│   │   ├── i18n.js
│   │   └── index.js
│   └── package.json
├── frontend/             # Main React application (port 3000)
│   ├── public/
│   ├── src/
│   │   ├── assets/       # Images
│   │   ├── components/   # Header, Footer, PropertyCard
│   │   ├── pages/        # Home, About, Contact, Explore, Auth, etc.
│   │   ├── locales/      # Translations (VI/EN/ZH)
│   │   ├── App.js
│   │   ├── i18n.js
│   │   └── index.js
│   └── package.json
├── backend/              # Express.js REST API (port 5000)
│   ├── routes/           # API routes
│   ├── models/           # MongoDB models
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth, validation
│   ├── config/           # Configuration
│   ├── server.js
│   └── package.json
└── README.md
```

## 🌐 Live URLs

During development:
- **Landing Page:** http://localhost:3001
- **Main Application:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 🛠 Technologies

**Frontend Stack:**
- React 18 with React Router v6
- react-i18next (Multilingual: VI/EN/ZH)
- Axios for API calls
- CSS3 with responsive design

**Backend Stack:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- bcryptjs for password hashing

**Color Scheme:**
- Primary Green: `#1ba330`
- Dark Green: `#1b7c38`
- Footer: `#0f4d22`

## ⚡ Quick Start

### Step 1: Setup Landing Page

```bash
cd landing
npm install
npm start
```
Opens on: http://localhost:3001

**Features:**
- Hero section with CTA
- 4 feature highlights
- About section with statistics
- Contact form
- Responsive design
- Link to main application

### Step 2: Setup Main Application

```bash
cd frontend
npm install
npm start
```
Opens on: http://localhost:3000

**Features:**
- Property listing and search
- Advanced filters (area, bedrooms, bathrooms)
- Property upload
- User authentication
- Transaction management
- Explore page with grid view
- "Why Choose Us" section

### Step 3: Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
npm install
npm run dev
```
Runs on: http://localhost:5000

## � Khởi động lại dự án (Restart Project)

Khi bạn tắt máy hoặc tắt server, dữ liệu vẫn được lưu trữ trong MongoDB. Để khởi động lại dự án, bạn cần chạy 3 terminal riêng biệt:

### Terminal 1: Backend Server (Port 5000)

```bash
cd c:\Users\Jang\real-estate-app\backend
npm run dev
```

✅ Khi thấy thông báo này = Backend đã chạy thành công:
```
Server running on port 5000
MongoDB connected
```

### Terminal 2: Frontend Server (Port 3000)

```bash
cd c:\Users\Jang\real-estate-app\frontend
npm start
```

✅ Frontend sẽ tự động mở trình duyệt:
```
On Your Network: http://localhost:3000
```

### Terminal 3: Landing Page Server (Port 3001)

```bash
cd c:\Users\Jang\real-estate-app\landing
npm start
```

✅ Landing page chạy ở:
```
http://localhost:3001
```

### 📋 Bảng tóm tắt khởi động:

| # | Công việc | Port | Lệnh |
|---|----------|------|------|
| 1 | Backend | 5000 | `cd backend && npm run dev` |
| 2 | Frontend | 3000 | `cd frontend && npm start` |
| 3 | Landing | 3001 | `cd landing && npm start` |

### 💡 Mẹo nhanh - Dùng VS Code Tasks

Bạn cũng có thể sử dụng các task đã cấu hình sẵn trong VS Code:

1. Mở Command Palette: `Ctrl + Shift + P`
2. Gõ: `Tasks: Run Task`
3. Chọn một trong các task:
   - `Backend: Start Development Server`
   - `Frontend: Start Development Server`

### 🎯 Sau khi khởi động:

- ✅ Truy cập Frontend: http://localhost:3000
- ✅ Truy cập Landing Page: http://localhost:3001
- ✅ Backend API: http://localhost:5000/api/health
- ✅ **Tất cả dữ liệu bất động sản vẫn còn** (lưu trong MongoDB)
- ✅ Có thể đăng nhập, đăng tải, xem mặt hàng bình thường

## �📝 Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

## ✨ Features Implemented

**Landing Page:**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Multilingual support (VI/EN/ZH)
- ✅ Green color scheme
- ✅ Contact form with validation
- ✅ Feature showcase
- ✅ Direct link to main application

**Main Application:**
- ✅ Property listing with grid view
- ✅ Advanced search and filters
- ✅ Property details page
- ✅ User authentication (login/register)
- ✅ Property upload functionality
- ✅ Transaction management
- ✅ About & Contact pages
- ✅ Explore page with advanced filters
- ✅ "Why Choose Us" section
- ✅ Responsive design
- ✅ Multilingual support

**Backend API:**
- ✅ RESTful endpoints
- ✅ Authentication (JWT)
- ✅ Property management
- ✅ User management
- ✅ Error handling

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get property by ID |
| POST | `/api/properties` | Create property |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |

## 🎨 Design Notes

- Consistent green color scheme across all applications
- Mobile-first responsive design
- Modern card-based UI
- Smooth animations and transitions
- Professional typography

## 🌍 Multilingual Support

All applications support three languages:
- **Vietnamese (VI)** - Default
- **English (EN)**
- **Chinese (ZH)**

Language preference is stored in localStorage.

## 📦 Dependencies

See individual `package.json` files in each folder

## 🚀 Deployment

1. Build landing page: `npm run build` in `/landing`
2. Build main app: `npm run build` in `/frontend`
3. Deploy to hosting (Vercel, Netlify, etc.)
4. Deploy backend to cloud (Heroku, Railway, etc.)
5. Update API URLs in frontend `.env`

## 📖 Documentation

- [Landing Page README](./landing/README.md)
- [Frontend README](./frontend/README.md) (if exists)
- [Backend README](./backend/README.md) (if exists)

## 💡 Future Enhancements

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Virtual property tours
- [ ] Social media sharing
- [ ] Mobile app (React Native)

## 👥 Team

Real Estate Platform Development Team

## 📜 License

ISC

---

**Last Updated:** March 26, 2026
**Status:** ✅ Complete landing page with multilingual support and responsive design
