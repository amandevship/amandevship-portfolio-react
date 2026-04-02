# AmanDevShip Portfolio - API Documentation

## Overview

This document outlines the complete API requirements for the AmanDevShip portfolio application, covering both the admin panel and public portfolio synchronization.

## Project Structure

```
amandevship-portfolio-react/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/     # Admin panel components
│   │   │   └── portfolio/ # Public portfolio components
│   │   ├── data/          # Mock data (resume.ts)
│   │   ├── types/         # TypeScript type definitions
│   │   └── context/       # React context providers
├── server/                # Backend API (to be implemented)
└── docs/                  # Project documentation
```

## API Summary

**Total Required Endpoints: 44**

### Admin Panel APIs: 31 endpoints
- Authentication: 3 endpoints
- Content Management: 21 endpoints  
- Analytics: 4 endpoints
- Activity Tracking: 3 endpoints

### Portfolio Frontend APIs: 13 endpoints
- Public Data: 3 endpoints
- Media Serving: 10 endpoints

---

## Authentication APIs (3 endpoints)

### POST /api/auth/login
**Description:** Authenticate user with email/password
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string", 
    "email": "string",
    "role": "admin|editor|viewer",
    "lastLogin": "datetime"
  },
  "token": "string"
}
```

### POST /api/auth/social/{provider}
**Description:** Social login authentication
**Providers:** google, facebook, apple
**Response:** Same as /api/auth/login

### POST /api/auth/logout
**Description:** User logout and token invalidation
**Response:** 204 No Content

---

## Portfolio Content Management APIs (21 endpoints)

### Personal Information APIs (3 endpoints)

#### GET /api/portfolio/profile
**Response:**
```json
{
  "name": "string",
  "location": "string", 
  "email": "string",
  "phone": "string",
  "website": "string",
  "linkedIn": "string",
  "github": "string",
  "title": "string",
  "totalExperience": "string",
  "professionalSummary": "string"
}
```

#### PUT /api/portfolio/profile
**Request Body:** Same as GET response
**Response:** Updated profile data

#### POST /api/portfolio/profile/image
**Content-Type:** multipart/form-data
**Request:** Profile image file
**Response:** Image URL and metadata

---

### Work Experience APIs (5 endpoints)

#### GET /api/portfolio/experience
**Response:**
```json
[
  {
    "id": "string",
    "role": "string",
    "company": "string", 
    "period": "string",
    "location": "string",
    "achievements": ["string"]
  }
]
```

#### POST /api/portfolio/experience
**Request Body:** Same as individual experience object
**Response:** Created experience with ID

#### PUT /api/portfolio/experience/:id
**Request Body:** Updated experience data
**Response:** Updated experience object

#### DELETE /api/portfolio/experience/:id
**Response:** 204 No Content

#### PATCH /api/portfolio/experience/reorder
**Request Body:**
```json
{
  "order": ["id1", "id2", "id3"]
}
```

---

### Skills Management APIs (4 endpoints)

#### GET /api/portfolio/skills
**Response:**
```json
[
  {
    "id": "string",
    "category": "string",
    "skills": ["string"]
  }
]
```

#### PUT /api/portfolio/skills
**Request Body:** Array of skill categories
**Response:** Updated skills data

#### POST /api/portfolio/skills/category
**Request Body:**
```json
{
  "category": "string",
  "skills": ["string"]
}
```

#### DELETE /api/portfolio/skills/category/:id
**Response:** 204 No Content

---

### Projects Management APIs (5 endpoints)

#### GET /api/portfolio/projects
**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "platform": "string", 
    "techStack": ["string"],
    "appStoreUrls": ["string"],
    "playStoreUrls": ["string"],
    "webAppUrls": ["string"],
    "webAppDisabled": "boolean"
  }
]
```

#### POST /api/portfolio/projects
**Request Body:** Same as individual project object
**Response:** Created project with ID

#### PUT /api/portfolio/projects/:id
**Request Body:** Updated project data
**Response:** Updated project object

#### DELETE /api/portfolio/projects/:id
**Response:** 204 No Content

#### PATCH /api/portfolio/projects/reorder
**Request Body:**
```json
{
  "order": ["id1", "id2", "id3"]
}
```

---

### Education APIs (4 endpoints)

#### GET /api/portfolio/education
**Response:**
```json
[
  {
    "id": "string",
    "degree": "string",
    "institution": "string",
    "year": "string", 
    "percentage": "string"
  }
]
```

#### POST /api/portfolio/education
**Request Body:** Same as individual education object
**Response:** Created education entry with ID

#### PUT /api/portfolio/education/:id
**Request Body:** Updated education data
**Response:** Updated education object

#### DELETE /api/portfolio/education/:id
**Response:** 204 No Content

---

## Admin Dashboard APIs (8 endpoints)

### Analytics APIs (4 endpoints)

#### GET /api/admin/analytics/visits
**Response:**
```json
{
  "totalVisits": 12543,
  "pageViews": 34210,
  "change": "+12.5%"
}
```

#### GET /api/admin/analytics/duration
**Response:**
```json
{
  "averageDuration": "3:24",
  "change": "+18.1%"
}
```

#### GET /api/admin/analytics/bounce
**Response:**
```json
{
  "bounceRate": "32.4%",
  "change": "-5.3%"
}
```

#### GET /api/admin/analytics/trends
**Query Parameters:** period (day, week, month, year)
**Response:**
```json
{
  "period": "string",
  "data": [
    {
      "date": "string",
      "visits": "number",
      "pageViews": "number"
    }
  ]
}
```

---

### Activity Tracking APIs (4 endpoints)

#### GET /api/admin/activity
**Query Parameters:** limit (default: 50), offset
**Response:**
```json
[
  {
    "id": "string",
    "type": "create|update|delete",
    "entity": "string",
    "description": "string",
    "timestamp": "datetime",
    "user": "string"
  }
]
```

#### POST /api/admin/activity/log
**Request Body:**
```json
{
  "type": "create|update|delete",
  "entity": "string", 
  "description": "string"
}
```

#### GET /api/admin/activity/stats
**Response:**
```json
{
  "projects": 8,
  "experience": 4,
  "skills": 24,
  "education": 1
}
```

#### GET /api/admin/activity/export
**Query Parameters:** format (csv, json), dateFrom, dateTo
**Response:** File download

---

## Media Management APIs (6 endpoints)

### POST /api/media/upload
**Content-Type:** multipart/form-data
**Request:** File(s) with metadata
**Response:**
```json
{
  "id": "string",
  "url": "string",
  "filename": "string",
  "size": "number",
  "mimeType": "string",
  "uploadedAt": "datetime"
}
```

### GET /api/media/list
**Query Parameters:** type (image, document), limit, offset
**Response:** Array of media objects

### DELETE /api/media/:id
**Response:** 204 No Content

### PUT /api/media/:id
**Request Body:**
```json
{
  "filename": "string",
  "alt": "string"
}
```

### GET /api/media/stats
**Response:**
```json
{
  "totalFiles": "number",
  "totalSize": "number",
  "storageUsed": "number",
  "byType": {
    "image": "number",
    "document": "number"
  }
}
```

### POST /api/media/bulk-upload
**Content-Type:** multipart/form-data
**Request:** Multiple files
**Response:** Array of uploaded media objects

---

## Public Portfolio APIs (3 endpoints)

### GET /api/public/portfolio
**Response:** Complete portfolio data (all sections)

### GET /api/public/projects
**Query Parameters:** filter (tech stack), limit
**Response:** Public projects list

### GET /api/public/profile
**Response:** Public profile information only

---

## Data Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin?: Date;
}
```

### Resume Data Model
```typescript
interface ResumeData {
  name: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedIn: string;
  github: string;
  title: string;
  totalExperience: string;
  professionalSummary: string;
  workExperience: WorkExperience[];
  skills: SkillGroup[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}
```

---

## Synchronization Architecture

### Real-time Updates
- WebSocket connection for instant portfolio updates
- Admin changes reflected immediately on public site
- Cache invalidation strategies

### Media Synchronization
- CDN integration for fast media delivery
- Image optimization and resizing
- Backup and version control for media assets

### Analytics Integration
- Google Analytics or similar service
- Custom event tracking for admin actions
- Performance monitoring and alerting

### Activity Logging
- Comprehensive audit trail
- Change tracking with rollback capability
- User action analytics

---

## Security Considerations

### Authentication
- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- Social login integration

### Data Validation
- Input sanitization and validation
- File upload security scanning
- Rate limiting on API endpoints

### CORS and Headers
- Proper CORS configuration
- Security headers implementation
- API versioning strategy

---

## Performance Optimization

### Caching Strategy
- Redis for session and data caching
- CDN for static assets
- Database query optimization

### Database Design
- Normalized schema for content management
- Indexing strategy for fast queries
- Backup and replication setup

### API Optimization
- Pagination for large datasets
- Compression for responses
- Lazy loading for media

---

## Implementation Priority

### Phase 1: Core Functionality
1. Authentication system
2. Basic CRUD operations for portfolio content
3. Public portfolio display

### Phase 2: Admin Features
1. Admin dashboard with analytics
2. Activity tracking
3. Media management

### Phase 3: Advanced Features
1. Real-time synchronization
2. Advanced analytics
3. Performance optimizations

---

## Technology Stack Recommendations

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js or Fastify
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Passport.js with JWT
- **File Storage:** AWS S3 or Cloudinary
- **Caching:** Redis
- **Analytics:** Custom tracking + Google Analytics

### Deployment
- **Hosting:** AWS, Vercel, or similar
- **CI/CD:** GitHub Actions
- **Monitoring:** New Relic or DataDog
- **Logging:** Winston or similar

---

## Next Steps

1. Set up backend server structure
2. Implement authentication system
3. Create database schemas
4. Build core CRUD APIs
5. Integrate with frontend
6. Add analytics and monitoring
7. Implement real-time features
8. Optimize and scale

This documentation provides a comprehensive roadmap for implementing the complete API infrastructure for the AmanDevShip portfolio application.
