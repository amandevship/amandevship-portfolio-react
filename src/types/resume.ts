export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  platform: string;
  techStack: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa: string;
}

export interface Certification {
  name: string;
}

export interface ResumeData {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: string;
  title: string;
  totalExperience: string;
  professionalSummary: string;
  workExperience: WorkExperience[];
  skills: SkillGroup[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}
