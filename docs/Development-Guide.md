# Development Guide

## Quick Start

This guide helps developers understand the project structure, setup process, and development workflow for the AmanDevShip portfolio application.

## Prerequisites

### Required Software
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher (or yarn v1.22.22+)
- **PostgreSQL** v14.0 or higher (for backend development)
- **Redis** v6.0 or higher (for caching)
- **Git** for version control

### Development Tools (Recommended)
- **VS Code** with recommended extensions
- **Postman** or **Insomnia** for API testing
- **pgAdmin** or **DBeaver** for database management
- **Docker** for containerized development

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd amandevship-portfolio-react
```

### 2. Frontend Setup
```bash
cd client
npm install
# or
yarn install
```

### 3. Environment Configuration
Create environment files:

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=AmanDevShip Portfolio
VITE_ENABLE_ANALYTICS=true
```

**Backend (.env)** - When implemented
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/amandevship_portfolio
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173
```

### 4. Database Setup
```bash
# Create database
createdb amandevship_portfolio

# Run migrations (when backend is implemented)
npm run migrate
```

## Development Workflow

### Frontend Development

#### Running the Development Server
```bash
cd client
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:5173`

#### Building for Production
```bash
npm run build
# or
yarn build
```

#### Running Tests
```bash
npm run test
# or
yarn test
```

#### Linting
```bash
npm run lint
# or
yarn lint
```

### Backend Development (When Implemented)

#### Running the Backend Server
```bash
cd server
npm run dev
```

#### Database Migrations
```bash
npm run migrate
npm run migrate:rollback
```

#### Seed Data
```bash
npm run seed
```

## Code Organization

### Frontend Structure

```
client/src/
├── components/
│   ├── admin/              # Admin panel components
│   │   ├── auth/          # Authentication forms
│   │   ├── dashboard/     # Admin dashboard
│   │   └── layout/        # Admin layout components
│   └── portfolio/         # Public portfolio components
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Education.tsx
│       ├── Contact.tsx
│       ├── Navbar.tsx
│       └── Footer.tsx
├── data/
│   └── resume.ts          # Mock portfolio data
├── types/
│   ├── auth.ts            # Authentication types
│   └── resume.ts          # Portfolio data types
├── context/               # React contexts
├── lib/                   # Utility functions
├── test/                  # Test files
└── res/                   # Static resources
```

### Component Patterns

#### Portfolio Components
```typescript
// Example: Projects.tsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = useMemo(() => {
    // Filter logic
  }, [filter]);

  return (
    <section id="projects" className="py-24 bg-space-dark relative">
      {/* Component JSX */}
    </section>
  );
};
```

#### Admin Components
```typescript
// Example: Dashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  // Component logic
  
  return (
    <div className="space-y-6">
      {/* Dashboard content */}
    </div>
  );
};
```

## Styling Guidelines

### TailwindCSS Configuration
The project uses a custom space/neon theme defined in `tailwind.config.js`.

### Color Scheme
```css
/* Primary Colors */
--neon-cyan: #22d3ee;
--flame: #fb923c;
--space-dark: #0f172a;
--space-darker: #020617;
--text-primary: #f1f5f9;
--text-secondary: #94a3b8;
```

### Component Styling Patterns
```typescript
// Glass morphism effect
className="glass glass-hover bg-space-card/50 border border-neon-cyan/20"

// Gradient text
className="bg-gradient-to-r from-neon-cyan to-blue-500 bg-clip-text text-transparent"

// Hover effects
className="hover:border-neon-cyan/40 transition-all duration-300"
```

## State Management

### React Context API
The application uses React Context for state management.

#### Auth Context (When Implemented)
```typescript
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
```

#### Portfolio Context
```typescript
interface PortfolioContextType {
  portfolioData: ResumeData;
  updatePortfolio: (data: Partial<ResumeData>) => Promise<void>;
  isLoading: boolean;
}
```

## API Integration

### API Client Setup
```typescript
// lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

### Example API Usage
```typescript
// Fetching portfolio data
const { data: portfolio, isLoading } = useQuery({
  queryKey: ['portfolio'],
  queryFn: () => apiClient.get<ResumeData>('/public/portfolio'),
});

// Updating portfolio data
const updateProfile = async (profileData: PersonalInfo) => {
  await apiClient.put('/api/portfolio/profile', profileData);
};
```

## Testing Strategy

### Unit Testing
```typescript
// Example: Component.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero Component', () => {
  it('renders hero title', () => {
    render(<Hero />);
    expect(screen.getByText(/Aman Sharma/i)).toBeInTheDocument();
  });
});
```

### Integration Testing
```typescript
// Example: API integration test
import { apiClient } from '../lib/api';

describe('API Integration', () => {
  it('fetches portfolio data', async () => {
    const data = await apiClient.get<ResumeData>('/public/portfolio');
    expect(data.name).toBe('Aman Sharma');
  });
});
```

## Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (example)
vercel --prod

# Deploy to Netlify (example)
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
```env
VITE_API_BASE_URL=https://api.amandevship.com
VITE_APP_NAME=AmanDevShip Portfolio
VITE_ENABLE_ANALYTICS=true
```

## Performance Optimization

### Code Splitting
```typescript
// Lazy loading components
const AdminApp = React.lazy(() => import('./components/admin/AdminApp'));

// Usage with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <AdminApp />
</Suspense>
```

### Image Optimization
```typescript
// Lazy loading images
<img 
  src={imageUrl} 
  loading="lazy"
  alt="Description"
  className="w-full h-auto"
/>
```

### Bundle Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
});
```

## Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

#### 2. Dependency Issues
```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update
```

#### 3. TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update types
npm install --save-dev @types/react @types/react-dom
```

### Debugging Tips

#### 1. Console Logging
```typescript
// Debug component renders
useEffect(() => {
  console.log('Component mounted:', componentName);
}, []);

// Debug API calls
console.log('API Response:', data);
```

#### 2. React DevTools
- Install React DevTools browser extension
- Inspect component state and props
- Profile component performance

#### 3. Network Tab
- Monitor API requests
- Check response times
- Debug failed requests

## Contributing Guidelines

### Code Standards

#### 1. TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` type when possible

#### 2. React
- Use functional components with hooks
- Follow React naming conventions
- Implement proper error boundaries

#### 3. CSS/Tailwind
- Use utility classes over custom CSS
- Follow mobile-first responsive design
- Maintain consistent spacing and colors

### Git Workflow

#### 1. Branch Naming
```bash
feature/add-admin-dashboard
bugfix/fix-login-validation
hotfix/critical-security-patch
```

#### 2. Commit Messages
```bash
feat: Add admin authentication system
fix: Resolve mobile menu toggle issue
docs: Update API documentation
style: Refactor component styling
```

#### 3. Pull Request Process
1. Create feature branch from main
2. Make changes with proper commits
3. Create pull request with description
4. Request code review
5. Address feedback
6. Merge to main branch

## Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [TailwindCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero)

### Learning Resources
- [React Patterns](https://reactpatterns.com/)
- [TailwindCSS Patterns](https://tailwindcomponents.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/)

This development guide provides comprehensive information for developers working on the AmanDevShip portfolio project.
