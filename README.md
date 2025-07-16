# Karl Sorochinski - Personal Website

A modern, dynamic personal website built with Next.js, Chakra UI, and a Node.js backend. This project showcases my professional experience as a Transformational IT Leader with expertise in organizational transformation, system design, and technology leadership.

## 🌟 Features

### Frontend (Next.js + Chakra UI)
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Modern UI**: Built with Chakra UI for consistent design system
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Built-in SEO features with Next.js
- **Performance**: Optimized for fast loading and smooth interactions
- **Markdown Support**: Policy pages render markdown content with proper formatting

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Clean, well-documented API endpoints
- **Microservices Ready**: Designed for easy expansion with additional services
- **Security**: Rate limiting, CORS, helmet, and input validation
- **Database**: MongoDB with Mongoose ODM
- **Contact Form**: Functional contact form with email service integration

## 🚀 Live Demo

- **Website**: [Your live website URL here]
- **GitHub**: [https://github.com/karlsoro](https://github.com/karlsoro)
- **LinkedIn**: [https://www.linkedin.com/in/karl-sorochinski-0893402/](https://www.linkedin.com/in/karl-sorochinski-0893402/)

## 📁 Project Structure

```
personal-website/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── privacy/     # Privacy policy page
│   │   │   ├── cookies/     # Cookies policy page
│   │   │   ├── terms/       # Terms of use page
│   │   │   └── ...
│   │   ├── components/      # React components
│   │   │   ├── layout/      # Layout components (Header, Footer, etc.)
│   │   │   ├── features/    # Feature components (Hero, About, Projects, etc.)
│   │   │   └── shared/      # Shared components
│   │   └── ...
│   └── public/              # Static assets and markdown files
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic services
│   │   └── utils/           # Utility functions
│   ├── PrivacyPolicy.md     # Privacy policy content
│   ├── CookiePolicy.md      # Cookie policy content
│   └── TermsofUse.md        # Terms of use content
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **Chakra UI**: Component library for consistent design
- **TypeScript**: Type-safe JavaScript
- **React Markdown**: Markdown rendering for policy pages
- **React Icons**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **Express Validator**: Input validation
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/personal-website
CORS_ORIGIN=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at [http://localhost:3001](http://localhost:3001)

## 📡 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact (admin)
- `PATCH /api/contact/:id` - Update contact status (admin)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post

## 🎯 Key Features

### Professional Profile
- **Transformational IT Leader** positioning
- **Organizational Transformation** expertise
- **End-to-End System Design** capabilities
- **Data, Analytics and AI** focus
- **Connecting Delivery to Value** approach

### Projects Showcase
- **SOA to Microservices Transformation** case study
- **Weather Consensus App** tutorial series
- **Task Management App** collaboration features
- **Blog Platform** with markdown support

### Contact & Legal
- **Functional contact form** with validation
- **Privacy Policy** with markdown rendering
- **Terms of Use** with markdown rendering
- **Cookies Policy** with markdown rendering
- **Social media integration** (LinkedIn, GitHub, Twitter)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the production version:
```bash
cd frontend
npm run build
```

2. Deploy to your preferred platform

### Backend (Azure/Heroku)
1. Build the backend:
```bash
cd backend
npm run build
```

2. Deploy to your preferred platform

3. Configure environment variables

## 🔧 Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

This is a personal website project, but suggestions and feedback are welcome!

## 📞 Contact

- **Email**: karl@sorochinski.com
- **Phone**: (732) 501-7596
- **Location**: Pike County, PA
- **LinkedIn**: [Karl Sorochinski](https://www.linkedin.com/in/karl-sorochinski-0893402/)
- **GitHub**: [karlsoro](https://github.com/karlsoro)
- **Twitter**: [@KarlSoro1965](https://twitter.com/KarlSoro1965)
