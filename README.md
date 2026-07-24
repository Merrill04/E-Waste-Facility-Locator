# E-Waste Facility Locator

## 📋 Project Description

An intelligent web application designed to promote responsible e-waste disposal and recycling in India. The platform helps users locate nearby e-waste recycling facilities, get instant AI-powered value predictions for their electronic items, and schedule convenient pickup services. With an integrated educational hub and AI chatbot, users can learn about the environmental impact of e-waste and make informed decisions about recycling their electronics.

---

## 🌐 Demo

**Live Demo:** https://drive.google.com/file/d/1txYQe-9fdneTsKxrTRHFISRlT5DCxqn9/view?usp=sharing

---

## 🚀 Setup Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Python 3.x (for ML model training)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd e-waste-facility-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GEMINI_API_KEY=your_google_gemini_api_key
   MAPBOX_ACCESS_TOKEN=your_mapbox_token
   EMAIL_USER=your_email_address
   EMAIL_PASSWORD=your_email_app_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production
```bash
npm run build
npm start
```

---

## ✨ Key Features

### 🗺️ Interactive Facility Locator
- Real-time map visualization of e-waste recycling centers across India
- Filter facilities by waste type (phones, laptops, batteries, etc.)
- Detailed facility information including contact details and operating hours

### 🤖 AI-Powered Price Prediction
- Machine learning model predicts recycling value for electronic items
- Considers factors like age, condition, brand, and material composition
- Trained Random Forest model with scikit-learn

### 📦 Booking & Pickup Service
- Schedule convenient pickup times for e-waste collection
- Automated email notifications for booking confirmations
- Pre-filled forms with predicted item values

### 📚 Educational Hub
- Interactive image slider showcasing e-waste impact
- Comprehensive Q&A section
- AI chatbot powered by Google Gemini for instant answers
- Latest news and updates on e-waste management

### 🔐 User Authentication
- Secure sign-up and sign-in functionality
- NextAuth.js integration for session management

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Language:** TypeScript, JavaScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons, Font Awesome

### Backend
- **Runtime:** Node.js
- **API Routes:** Next.js API Routes
- **Authentication:** NextAuth.js
- **File Upload:** Multer, Formidable

### Database
- **Primary Database:** MongoDB
- **ODM:** Mongoose

### Machine Learning
- **Model:** Random Forest Regressor (scikit-learn)
- **Frontend ML:** TensorFlow.js
- **Language:** Python 3

### External APIs & Services
- **Maps:** Mapbox GL JS
- **AI Assistant:** Google Gemini API
- **Email:** Nodemailer
- **Geocoding:** Mapbox Geocoder

### Additional Tools
- **Password Hashing:** bcryptjs
- **JWT:** jsonwebtoken
- **HTTP Client:** Axios
- **Cookie Management:** js-cookie

---
