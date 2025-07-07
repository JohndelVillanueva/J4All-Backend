// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
  errors?: string[];
}

// User Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'employer' | 'general' | 'pwd' | 'indigenous';
  phone_number?: string;
  photo?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRegistrationRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: 'employer' | 'general' | 'pwd' | 'indigenous';
  phone_number?: string;
  photo?: string;
  date_of_birth?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Job Types
export interface JobListing {
  id: number;
  job_title: string;
  job_description: string;
  job_requirements: string;
  job_location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  work_mode: 'On-site' | 'Remote' | 'Hybrid';
  salary_range_min: number;
  salary_range_max: number;
  expiration_date: string;
  posted_date: string;
  status: 'active' | 'inactive' | 'expired';
  employer_id: number;
  company?: Company;
  required_skills?: Skill[];
  applicants?: number;
  hrFirstName?: string;
  hrLastName?: string;
}

export interface CreateJobRequest {
  job_title: string;
  job_description: string;
  job_requirements: string;
  job_location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  work_mode: 'On-site' | 'Remote' | 'Hybrid';
  salary_range_min: number;
  salary_range_max: number;
  expiration_date: string;
  required_skills: string[];
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  id: number;
}

// Company Types
export interface Company {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  founded_year?: number;
}

// Skill Types
export interface Skill {
  id: number;
  skill_name: string;
  category: string;
  importance_level: number;
  is_required: boolean;
}

// Job Application Types
export interface JobApplication {
  id: number;
  job_id: number;
  seeker_id: number;
  employer_id: number;
  application_date: string;
  cover_letter: string;
  status: 'pending' | 'review' | 'interview' | 'hired' | 'rejected';
  notes?: string;
  resume: string;
  job?: JobListing;
  applicant?: User;
}

export interface CreateApplicationRequest {
  job_id: number;
  cover_letter: string;
  resume: string;
}

// Message Types
export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  sent_at: string;
  is_read: boolean;
  sender?: User;
}

export interface Conversation {
  id: number;
  participant1_id: number;
  participant2_id: number;
  created_at: string;
  updated_at: string;
  messages?: Message[];
  participant1?: User;
  participant2?: User;
}

export interface CreateMessageRequest {
  conversation_id: number;
  content: string;
}

export interface CreateConversationRequest {
  participant2_id: number;
}

// Notification Types
export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: 'application' | 'message' | 'interview' | 'system';
  is_read: boolean;
  created_at: string;
  related_id?: number;
  related_type?: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search and Filter Types
export interface JobSearchParams extends PaginationParams {
  keyword?: string;
  location?: string;
  job_type?: string;
  work_mode?: string;
  min_salary?: number;
  max_salary?: number;
  skills?: string[];
}

// Dashboard Types
export interface DashboardMetrics {
  totalJobs: number;
  totalApplications: number;
  activeJobs: number;
  hiredCandidates: number;
}

export interface DashboardStats {
  metrics: DashboardMetrics;
  recentApplications: JobApplication[];
  recentJobs: JobListing[];
}

// File Upload Types
export interface FileUploadResponse {
  filename: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface PhotoUploadResponse {
  photo_url: string;
  filename: string;
  size: number;
  mimetype: string;
}

// Error Types
export interface AppError {
  message: string;
  statusCode: number;
  code: string;
  isOperational: boolean;
}

// Request Context Types
export interface AuthenticatedRequest {
  user: User;
  userId: number;
  userType: string;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
} 