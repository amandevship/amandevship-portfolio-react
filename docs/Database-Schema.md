# Database Schema Documentation

## Overview

This document outlines the complete database schema required for the AmanDevShip portfolio application, covering all entities and relationships needed for the admin panel and public portfolio synchronization.

## Database Design Principles

- **Normalization:** Third Normal Form (3NF) to reduce redundancy
- **Indexing:** Strategic indexes for performance optimization
- **Relationships:** Clear foreign key relationships
- **Audit Trail:** Timestamps and tracking for all changes
- **Soft Deletes:** Preserve data integrity with deletion flags

## Schema Diagram

```
Users (1) ──────── (N) Activities
   │
   │
   ├─ (1) ──────── (N) PortfolioUpdates
   │
   │
   └─ (1) ──────── (N) MediaFiles

PersonalInfo (1) ── (N) WorkExperiences
PersonalInfo (1) ── (N) SkillCategories
PersonalInfo (1) ── (N) Projects
PersonalInfo (1) ── (N) EducationEntries

SkillCategories (1) ── (N) Skills
Projects (1) ── (N) ProjectUrls
```

## Table Definitions

### 1. Users Table

**Purpose:** Authentication and user management

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- NULL for social login users
    avatar_url VARCHAR(500),
    role user_role NOT NULL DEFAULT 'viewer',
    last_login TIMESTAMP WITH TIME ZONE,
    social_provider VARCHAR(50), -- google, facebook, apple
    social_id VARCHAR(255), -- Social platform user ID
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_social ON users(social_provider, social_id);
CREATE INDEX idx_users_role ON users(role);
```

### 2. PersonalInfo Table

**Purpose:** Single record for personal portfolio information

```sql
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(500),
    linkedin VARCHAR(500),
    github VARCHAR(500),
    title VARCHAR(255) NOT NULL,
    total_experience VARCHAR(50) NOT NULL,
    professional_summary TEXT NOT NULL,
    avatar_url VARCHAR(500),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Only one record should exist
CREATE UNIQUE INDEX idx_personal_info_single ON personal_info((1));
```

### 3. WorkExperiences Table

**Purpose:** Professional work experience entries

```sql
CREATE TABLE work_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    achievements TEXT[] NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_work_experiences_order ON work_experiences(display_order);
CREATE INDEX idx_work_experiences_active ON work_experiences(is_active);
```

### 4. SkillCategories Table

**Purpose:** Skill category definitions

```sql
CREATE TABLE skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) UNIQUE NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_skill_categories_order ON skill_categories(display_order);
CREATE INDEX idx_skill_categories_active ON skill_categories(is_active);
```

### 5. Skills Table

**Purpose:** Individual skills within categories

```sql
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    skill VARCHAR(100) NOT NULL,
    proficiency skill_proficiency DEFAULT 'intermediate',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category_id, skill)
);

CREATE TYPE skill_proficiency AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- Indexes
CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_skills_order ON skills(display_order);
CREATE INDEX idx_skills_active ON skills(is_active);
```

### 6. Projects Table

**Purpose:** Portfolio project entries

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    platform VARCHAR(100) NOT NULL,
    tech_stack TEXT[] NOT NULL,
    featured_image_url VARCHAR(500),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_order ON projects(display_order);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_featured ON projects(is_featured);
```

### 7. ProjectUrls Table

**Purpose:** URLs associated with projects (App Store, Play Store, Web)

```sql
CREATE TABLE project_urls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url_type url_type NOT NULL,
    url VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE url_type AS ENUM ('app_store', 'play_store', 'web_app', 'github', 'demo');

-- Indexes
CREATE INDEX idx_project_urls_project ON project_urls(project_id);
CREATE INDEX idx_project_urls_type ON project_urls(url_type);
CREATE INDEX idx_project_urls_active ON project_urls(is_active);
```

### 8. EducationEntries Table

**Purpose:** Educational background entries

```sql
CREATE TABLE education_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    year VARCHAR(20) NOT NULL,
    percentage VARCHAR(10),
    gpa VARCHAR(10),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_education_order ON education_entries(display_order);
CREATE INDEX idx_education_active ON education_entries(is_active);
```

### 9. MediaFiles Table

**Purpose:** File and media management

```sql
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_type file_type NOT NULL,
    alt_text VARCHAR(500),
    description TEXT,
    uploaded_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE file_type AS ENUM ('image', 'document', 'video', 'other');

-- Indexes
CREATE INDEX idx_media_files_type ON media_files(file_type);
CREATE INDEX idx_media_files_public ON media_files(is_public);
CREATE INDEX idx_media_files_uploader ON media_files(uploaded_by);
```

### 10. Activities Table

**Purpose:** Audit trail and activity logging

```sql
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    activity_type activity_type NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    description TEXT NOT NULL,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE activity_type AS ENUM ('create', 'update', 'delete', 'login', 'logout', 'upload');

-- Indexes
CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_entity ON activities(entity_type, entity_id);
CREATE INDEX idx_activities_created ON activities(created_at);
```

### 11. AnalyticsEvents Table

**Purpose:** Portfolio analytics and tracking

```sql
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    page_url VARCHAR(500),
    referrer VARCHAR(500),
    user_agent TEXT,
    ip_address INET,
    country VARCHAR(100),
    city VARCHAR(100),
    session_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_page ON analytics_events(page_url);
```

### 12. PortfolioUpdates Table

**Purpose:** Track portfolio content updates for synchronization

```sql
CREATE TABLE portfolio_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    update_type update_type NOT NULL,
    changes JSONB,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE update_type AS ENUM ('create', 'update', 'delete', 'reorder');

-- Indexes
CREATE INDEX idx_portfolio_updates_entity ON portfolio_updates(entity_type, entity_id);
CREATE INDEX idx_portfolio_updates_created ON portfolio_updates(created_at);
```

## Views and Functions

### 1. Complete Portfolio View

```sql
CREATE VIEW portfolio_complete AS
SELECT 
    pi.name,
    pi.location,
    pi.email,
    pi.phone,
    pi.website,
    pi.linkedin,
    pi.github,
    pi.title,
    pi.total_experience,
    pi.professional_summary,
    pi.avatar_url,
    pi.updated_at as last_updated
FROM personal_info pi;
```

### 2. Analytics Summary View

```sql
CREATE VIEW analytics_summary AS
SELECT 
    COUNT(*) as total_visits,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(DISTINCT ip_address) as unique_visitors,
    AVG(CASE WHEN event_type = 'page_view' THEN 1 END) as avg_page_views
FROM analytics_events 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';
```

### 3. Recent Activity Function

```sql
CREATE OR REPLACE FUNCTION get_recent_activities(limit_count INTEGER DEFAULT 50)
RETURNS TABLE (
    id UUID,
    user_name VARCHAR,
    activity_type TEXT,
    entity_type VARCHAR,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        u.name,
        a.activity_type::TEXT,
        a.entity_type,
        a.description,
        a.created_at
    FROM activities a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
```

## Seed Data

### Default Skill Categories

```sql
INSERT INTO skill_categories (category, display_order) VALUES
('Mobile', 1),
('Frontend', 2),
('Backend', 3),
('Databases', 4),
('Testing', 5),
('Tools & DevOps', 6),
('App Distribution', 7);
```

### Default Admin User (Development)

```sql
INSERT INTO users (name, email, role, password_hash) VALUES
('Aman Sharma', 'admin@amandevship.com', 'admin', '$2b$10$...');
```

## Migration Strategy

### Version 1.0.0 - Initial Schema
- Create all core tables
- Set up basic indexes
- Add seed data

### Version 1.1.0 - Analytics Enhancement
- Add analytics_events table
- Create analytics views
- Add tracking functions

### Version 1.2.0 - Media Management
- Add media_files table
- Implement file storage
- Add CDN integration

### Version 1.3.0 - Performance Optimization
- Add composite indexes
- Optimize queries
- Add partitioning for large tables

## Performance Considerations

### Indexing Strategy
- Primary keys on all tables
- Foreign key indexes
- Frequently queried columns
- Composite indexes for complex queries

### Query Optimization
- Use views for complex joins
- Implement proper pagination
- Cache frequently accessed data
- Optimize JSONB queries

### Scaling Considerations
- Partition large tables by date
- Implement read replicas
- Use connection pooling
- Monitor query performance

## Backup and Recovery

### Backup Strategy
- Daily full backups
- Hourly transaction log backups
- Point-in-time recovery capability
- Cross-region backup replication

### Recovery Procedures
- Automated backup verification
- Disaster recovery plan
- Data restoration testing
- Rollback procedures

## Security Considerations

### Data Protection
- Encrypt sensitive data at rest
- Use parameterized queries
- Implement row-level security
- Regular security audits

### Access Control
- Database user permissions
- Application-level authorization
- Audit trail for all changes
- IP whitelisting for admin access

This schema provides a comprehensive foundation for the portfolio application with proper normalization, indexing, and scalability considerations.
