# README

# AmanDevShip Portfolio

A modern, responsive portfolio application built with React, TypeScript, and TailwindCSS. Features both a public portfolio showcase and an admin panel for content management.

## 🚀 Features

### Public Portfolio
- **Responsive Design** - Mobile-first approach with smooth animations
- **Modern UI** - Space/neon theme with glass morphism effects
- **Interactive Components** - Filterable projects, smooth scrolling navigation
- **Performance Optimized** - Lazy loading, code splitting, optimized assets

### Admin Panel (Coming Soon)
- **Content Management** - Update portfolio content in real-time
- **Analytics Dashboard** - Track visitor statistics and engagement
- **Media Management** - Upload and manage images and documents
- **Activity Tracking** - Monitor changes and admin actions

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend (Planned)
- **Node.js** - Server runtime
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **JWT** - Authentication
- **AWS S3** - File storage

## 📁 Project Structure

```
amandevship-portfolio-react/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/     # Admin panel components
│   │   │   └── portfolio/ # Public portfolio components
│   │   ├── data/          # Mock data
│   │   ├── types/         # TypeScript definitions
│   │   └── context/       # React contexts
│   ├── public/            # Static assets
│   └── dist/              # Build output
├── server/                # Backend API (to be implemented)
├── docs/                  # Project documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd amandevship-portfolio-react
```

2. **Install dependencies**
```bash
cd client
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm run test
```

## 📖 Documentation

### Comprehensive Documentation
- [📋 API Documentation](./docs/API-Documentation.md) - Complete API specifications
- [🔍 Project Analysis](./docs/Project-Analysis.md) - Detailed project analysis
- [🗄️ Database Schema](./docs/Database-Schema.md) - Database design and relationships
- [👨‍💻 Development Guide](./docs/Development-Guide.md) - Setup and development workflow

### Quick Links

#### API Requirements
- **44 Total Endpoints** required for full functionality
- **Authentication** - Login, social auth, logout
- **Content Management** - CRUD operations for all portfolio sections
- **Analytics** - Visitor tracking and engagement metrics
- **Media Management** - File upload and organization

#### Data Models
- **Personal Information** - Profile details and contact info
- **Work Experience** - Professional history with achievements
- **Skills** - Categorized technical skills
- **Projects** - Portfolio projects with tech stack and URLs
- **Education** - Academic background
- **Media Files** - Images and document management

## 🎨 Design System

### Color Palette
```css
--neon-cyan: #22d3ee      /* Primary accent */
--flame: #fb923c          /* Secondary accent */
--space-dark: #0f172a     /* Dark background */
--space-darker: #020617   /* Darkest background */
--text-primary: #f1f5f9   /* Main text */
--text-secondary: #94a3b8  /* Secondary text */
```

### Typography
- **Headings:** Bold, modern sans-serif
- **Body:** Clean, readable sans-serif
- **Code:** Monospace for technical content

### Components
- **Glass Morphism** - Translucent backgrounds with blur
- **Gradient Accents** - Eye-catching color gradients
- **Smooth Animations** - Micro-interactions and transitions
- **Responsive Grid** - Adaptive layouts for all screen sizes

## 📊 Current Features

### ✅ Implemented
- Responsive portfolio layout
- Interactive project showcase
- Smooth animations and transitions
- Modern UI with custom theme
- TypeScript type safety
- Component-based architecture

### 🚧 In Progress
- Backend API development
- Admin authentication system
- Content management interface
- Analytics dashboard
- Real-time synchronization

### 📋 Planned
- File upload system
- Advanced analytics
- Blog functionality
- Contact form integration
- SEO optimization
- Performance monitoring

## 🔧 Configuration

### Environment Variables
Create `.env` file in client directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=AmanDevShip Portfolio
VITE_ENABLE_ANALYTICS=true
```

### TailwindCSS Configuration
Custom theme defined in `tailwind.config.js`:
- Space/neon color scheme
- Custom glass morphism utilities
- Responsive breakpoints
- Animation utilities

### TypeScript Configuration
Strict TypeScript setup in `tsconfig.json`:
- Strict type checking
- Path aliases for clean imports
- React-specific configurations

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes with proper commits
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow React best practices
- Implement proper error handling
- Write tests for new features
- Maintain consistent code style

### Commit Messages
```
feat: Add new feature
fix: Resolve bug
docs: Update documentation
style: Refactor styling
refactor: Code refactoring
test: Add tests
```

## 📈 Performance

### Optimization Techniques
- **Code Splitting** - Lazy load components
- **Image Optimization** - WebP format, lazy loading
- **Bundle Optimization** - Tree shaking, minification
- **Caching Strategy** - Service worker, browser cache
- **CDN Integration** - Fast asset delivery

### Metrics
- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size:** <500KB (gzipped)
- **Load Time:** <2 seconds on 3G
- **First Contentful Paint:** <1.5 seconds

## 🔒 Security

### Frontend Security
- **Content Security Policy** - Prevent XSS attacks
- **HTTPS Enforcement** - Secure data transmission
- **Input Validation** - Client-side validation
- **Dependency Updates** - Regular security patches

### Backend Security (Planned)
- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Prevent abuse
- **SQL Injection Prevention** - Parameterized queries
- **Data Encryption** - Sensitive data protection

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Environment Setup
- **Development:** Local development with hot reload
- **Staging:** Pre-production testing environment
- **Production:** Optimized, secure deployment

## 📞 Support

### Getting Help
- 📖 Check [documentation](./docs/)
- 🐛 [Report issues](https://github.com/amandevship/portfolio/issues)
- 💬 [Discussions](https://github.com/amandevship/portfolio/discussions)
- 📧 Contact: amandevship@gmail.com

### FAQ

**Q: How do I add a new project?**
A: Currently, projects are managed in `src/data/resume.ts`. In the future, you'll be able to manage them through the admin panel.

**Q: Can I customize the theme?**
A: Yes! The theme is defined in `tailwind.config.js` and can be customized to match your preferences.

**Q: Is this mobile responsive?**
A: Absolutely! The portfolio is built with a mobile-first approach and works seamlessly on all devices.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **TailwindCSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons
- **Vercel** - For hosting and deployment

---

**Built with ❤️ by [Aman Sharma](https://amandevship.netlify.app)**

*Senior Software Engineer | React Native | React.js | Node.js*
