# Karl Sorochinski Personal Website

A modern, dynamic personal website built with Next.js, Chakra UI, and a microservices backend architecture. This project features a micro-frontend approach allowing for dynamic content updates without page refreshes.

## 🚀 Features

### Frontend (Next.js + Chakra UI)
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Micro-Frontend Architecture**: Dynamic component loading for seamless updates
- **Modern UI**: Built with Chakra UI for consistent design system
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Built-in SEO features with Next.js
- **Performance**: Optimized for fast loading and smooth interactions

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Clean, well-documented API endpoints
- **Microservices Ready**: Designed for easy expansion with additional services
- **Security**: Rate limiting, CORS, helmet, and input validation
- **Database**: MongoDB with Mongoose ODM

## 📁 Project Structure

```
personal-website/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   │   ├── layout/      # Layout components (Header, Footer, etc.)
│   │   │   ├── features/    # Feature components (Hero, About, Projects, etc.)
│   │   │   └── shared/      # Shared components (DynamicComponent, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic services
│   │   └── utils/           # Utility functions
│   └── dist/                # Compiled TypeScript output
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **Chakra UI**: Component library for consistent design
- **TypeScript**: Type-safe JavaScript
- **React Query**: Data fetching and caching
- **Axios**: HTTP client for API calls
- **React Icons**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
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



## 🏗️ Micro-Frontend Architecture

The frontend implements a micro-frontend architecture using dynamic component loading:

```typescript
// Example of dynamic component loading
<DynamicComponent 
  componentName="Hero" 
  props={{ title: "Welcome" }}
/>
```

This allows for:
- **Dynamic Updates**: Components can be updated without full page reloads
- **Modular Development**: Each feature is developed independently
- **Scalability**: Easy to add new features and components
- **Performance**: Only load components when needed

## 🚀 Deployment

### Frontend (GoDaddy)
1. Build the production version:
```bash
cd frontend
npm run build
```

2. Deploy the `out` directory to your GoDaddy web server

### Backend (Azure)
1. Build the backend:
```bash
cd backend
npm run build
```

2. Deploy to Azure App Service or Azure Functions

3. Configure environment variables in Azure

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
- `npm run test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email your.email@example.com or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Blog system with markdown support
- [ ] Admin dashboard for content management
- [ ] Real-time notifications
- [ ] Analytics integration
- [ ] PWA features
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced SEO features
- [ ] Image optimization
- [ ] CDN integration
