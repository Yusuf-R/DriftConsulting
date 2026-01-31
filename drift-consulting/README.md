# Drift Consulting - Corporate Website & Admin Portal

A modern, full-stack web application built for Drift Consulting - a leading construction and project management firm. This platform includes a professional corporate website and a comprehensive admin management system.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Public Website
- 🏠 **Dynamic Homepage** - Hero section, services overview, featured projects
- 📁 **Portfolio Gallery** - Filterable project showcase with categories
- 📝 **About Page** - Company information, mission, vision, team profiles
- 🛠️ **Services** - Detailed service offerings with descriptions
- 📧 **Contact Form** - Integrated inquiry system with validation
- 🌓 **Dark/Light Theme** - User preference support
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Performance Optimized** - 90+ Lighthouse score
- ♿ **Accessible** - WCAG 2.1 AA compliant

### Admin Dashboard
- 🔐 **Authentication System**
    - Email/Password login
    - Google OAuth 2.0 integration
    - Secure session management
    - Rate limiting protection

- 👥 **User Management**
    - Role-based access control (Super Admin, Admin, Support)
    - Create, read, update, delete users
    - Activity tracking
    - User status management

- 📨 **Contact Management**
    - View and manage inquiries
    - Status tracking (New, Contacted, In Discussion, Converted, Closed)
    - Advanced filtering and search
    - Export functionality
    - Notes and follow-up tracking

- 🛡️ **Security Features**
    - Rate limiting (IP and email-based)
    - CSRF protection
    - XSS prevention
    - SQL injection protection
    - Secure password hashing (bcrypt)

- 📊 **Analytics & Insights**
    - Contact statistics
    - User activity logs
    - Project type distribution
    - Status overview

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16.1.2 (App Router)
- **UI Library:** React 19.0
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **State Management:** TanStack Query (React Query)
- **Data Tables:** TanStack Table

### Backend
- **Runtime:** Node.js 20+
- **API:** Next.js API Routes & Server Actions
- **Authentication:** NextAuth.js v5
- **Database:** MongoDB with Mongoose ODM
- **Rate Limiting:** Upstash Redis
- **Password Hashing:** bcryptjs

### DevOps & Deployment
- **Hosting:** Vercel (recommended)
- **Database:** MongoDB Atlas
- **CDN:** Vercel Edge Network
- **Image Optimization:** Next.js Image + Cloudinary (optional)
- **Version Control:** Git

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- MongoDB Atlas account
- Upstash Redis account
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/drift-consulting.git
   cd drift-consulting
```

2. **Install dependencies**
```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
```bash
   cp .env.example .env.local
```

4. **Run the development server**
```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:
```bash
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/driftconsulting

# NextAuth
AUTH_SECRET=your-secret-key-here-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Drift Consulting

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Generating AUTH_SECRET
```bash
openssl rand -base64 32
```

### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
    - `http://localhost:3000/api/auth/callback/google` (development)
    - `https://yourdomain.com/api/auth/callback/google` (production)

---

## 📁 Project Structure
```
drift-consulting/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin routes group
│   │   └── admin/
│   │       ├── auth/            # Authentication pages
│   │       │   ├── login/
│   │       │   ├── signup/
│   │       │   └── error/
│   │       └── protected/       # Protected admin pages
│   │           ├── dashboard/
│   │           ├── contacts/
│   │           └── users/
│   ├── (public)/                # Public routes group
│   │   ├── about/
│   │   ├── contact/
│   │   ├── projects/
│   │   └── services/
│   ├── api/                     # API routes
│   │   ├── auth/               # Auth endpoints
│   │   ├── contacts/           # Contact management
│   │   └── admin/              # Admin endpoints
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                  # React components
│   ├── Admin/                  # Admin components
│   │   └── DriftDashboard/
│   ├── Public/                 # Public components
│   └── ui/                     # Shared UI components
├── lib/                        # Utility libraries
│   ├── auth/                   # Authentication logic
│   ├── controllers/            # Business logic
│   ├── models/                 # Database models
│   ├── mongoDB/                # Database connection
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   └── validations/            # Zod schemas
├── public/                     # Static assets
│   ├── images/
│   └── fonts/
├── utils/                      # Client-side utilities
│   ├── AdminUtils.ts          # Admin API calls
│   └── AxiosInstance.ts       # Axios configuration
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. **Push to GitHub**
```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
```

2. **Connect to Vercel**
    - Go to [vercel.com](https://vercel.com)
    - Import your GitHub repository
    - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
    - Add all environment variables from `.env.local`
    - Update `NEXTAUTH_URL` to your production domain

4. **Deploy**
    - Click "Deploy"
    - Vercel will build and deploy automatically

### Custom Domain Setup

1. Add domain in Vercel dashboard
2. Update DNS records:
```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
```

3. SSL certificate is automatically provisioned

### Database Configuration

**MongoDB Atlas:**
1. Whitelist Vercel IP ranges:
    - Go to Network Access
    - Add `0.0.0.0/0` (allow from anywhere)
    - Or add specific Vercel IPs

2. Update connection string in Vercel environment variables

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/check-login`
Validate credentials and check rate limits

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Contact Endpoints

#### POST `/api/v1/contact`
Submit contact inquiry

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "projectType": "residential",
  "location": "Lagos, Nigeria",
  "scope": "New construction project",
  "phone": "+234 801 234 5678",
  "budget": "₦50M - ₦75M",
  "timeline": "12-18 months"
}
```

#### GET `/api/contacts`
Get all contacts (authenticated)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)
- `status` - Filter by status
- `projectType` - Filter by project type
- `search` - Search term

### User Management Endpoints

#### GET `/api/admin/users`
Get all users (admin only)

#### POST `/api/admin/users`
Create new user (admin only)

#### GET `/api/admin/users/[id]`
Get single user

#### PATCH `/api/admin/users/[id]`
Update user

#### DELETE `/api/admin/users/[id]`
Delete user

---

## 🔒 Security Features

### Rate Limiting
- **Signup:** 5 attempts per IP per 24 hours
- **Login (Email):** 5 failed attempts per email per 24 hours
- **Login (IP):** 10 failed attempts per IP per hour
- **Contact Form:** 5 submissions per IP per hour

### Password Security
- Minimum 6 characters
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Excluded from API responses

### Authentication
- JWT-based sessions
- 90-day session duration
- HTTP-only cookies
- CSRF protection
- Secure session encryption

### Authorization
- Role-based access control
- Route protection middleware
- API endpoint guards
- Client-side route guards

---

## 🧪 Testing
```bash
# Run tests (if configured)
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

---

## 📦 Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

---

## 🤝 Contributing

This is a private project for Drift Consulting. For authorized contributors:

1. Create a feature branch
```bash
   git checkout -b feature/your-feature-name
```

2. Make your changes and commit
```bash
   git commit -m "Add: your feature description"
```

3. Push to the branch
```bash
   git push origin feature/your-feature-name
```

4. Open a Pull Request

---

## 📄 License

This project is proprietary software owned by Drift Consulting.  
© 2026 Drift Consulting. All rights reserved.

Developed by **Naviroq Technologies (Abdulwasiu Tunde Yusuf)**

---

## 📞 Support

For technical support or inquiries:

**Developer:** Naviroq Technologies  
**Email:** naviroq.tech@gmail.com  
**Website:** [Your Website]

**Client:** Drift Consulting  
**Email:** drift-consulting@gmail.com

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- MongoDB for database solutions
- Upstash for Redis services
- All open-source contributors

---

**Built with ❤️ by Naviroq Technologies (Abdulwasiu Tunde Yusuf)**