# J4All Backend - Production-Ready Job Platform

A modern, scalable backend for a job application platform built with Node.js, Hono, Prisma, and TypeScript.

## 🚀 Features

### Core Features
- **Job Posting Management** - Create, read, update, delete job postings
- **User Authentication** - JWT-based authentication with role-based access
- **Job Applications** - Apply to jobs with cover letters and resumes
- **Messaging System** - Real-time messaging between employers and applicants
- **Notifications** - Real-time notifications for application updates
- **File Upload** - Secure file upload for resumes and company logos

### Production Features
- **Error Handling** - Comprehensive error handling with proper HTTP status codes
- **Request Validation** - Input validation for all API endpoints
- **Service Layer** - Separation of business logic from controllers
- **Type Safety** - Full TypeScript support with comprehensive type definitions
- **Database Migrations** - Prisma migrations for database schema management
- **Security** - CORS, input sanitization, and authentication middleware

## 🏗️ Architecture

```
src/
├── controllers/          # Route handlers (thin layer)
├── services/            # Business logic layer
├── middleware/          # Custom middleware (auth, validation, error handling)
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── db.ts              # Database connection
└── index.ts           # Application entry point
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd J4All/backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/j4all"
   JWT_SECRET="your-super-secret-jwt-key"
   NODE_ENV="development"
   PORT=3111
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "user_type": "general",
  "phone_number": "+1234567890",
  "date_of_birth": "1990-01-01"
}
```

#### POST `/api/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Job Posting Endpoints

#### GET `/api/getAllJobs`
Get all active job postings with pagination and filtering.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `keyword` - Search keyword
- `location` - Job location filter
- `job_type` - Job type filter
- `work_mode` - Work mode filter
- `min_salary` - Minimum salary
- `max_salary` - Maximum salary

#### POST `/api/createJob`
Create a new job posting (Employer only).

**Request Body:**
```json
{
  "job_title": "Software Engineer",
  "job_description": "We are looking for a talented software engineer...",
  "job_requirements": "Minimum 3 years of experience...",
  "job_location": "Manila",
  "job_type": "Full-time",
  "work_mode": "Hybrid",
  "salary_range_min": 50000,
  "salary_range_max": 80000,
  "expiration_date": "2025-12-31",
  "required_skills": ["React", "Node.js", "TypeScript"]
}
```

### Job Application Endpoints

#### POST `/api/apply`
Apply to a job (Job Seeker only).

**Request Body:**
```json
{
  "job_id": 123,
  "cover_letter": "I am excited to apply for this position...",
  "resume": "base64-encoded-resume-file"
}
```

### Messaging Endpoints

#### POST `/api/messages/conversations`
Create a new conversation.

**Request Body:**
```json
{
  "participant2_id": 456
}
```

#### POST `/api/messages/send`
Send a message in a conversation.

**Request Body:**
```json
{
  "conversation_id": 789,
  "content": "Hello! I'm interested in your job posting."
}
```

## 🔧 Error Handling

The application uses a comprehensive error handling system:

### Error Types
- **Validation Errors** (400) - Invalid input data
- **Authentication Errors** (401) - Invalid or missing authentication
- **Authorization Errors** (403) - Insufficient permissions
- **Not Found Errors** (404) - Resource not found
- **Database Errors** (500) - Database operation failures
- **Internal Server Errors** (500) - Unexpected server errors

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "errors": ["Detailed error messages"],
  "stack": "Error stack trace (development only)"
}
```

## ✅ Validation

All API endpoints use request validation:

### Validation Features
- **Type Checking** - Ensures correct data types
- **Required Fields** - Validates required fields are present
- **Length Validation** - Checks string and array lengths
- **Format Validation** - Validates email, date formats
- **Enum Validation** - Ensures values match allowed options
- **Range Validation** - Validates numeric ranges

### Example Validation Schema
```typescript
const createJobSchema = {
  job_title: { type: 'string', required: true, minLength: 3, maxLength: 100 },
  job_description: { type: 'string', required: true, minLength: 10, maxLength: 2000 },
  salary_range_min: { type: 'number', required: true, min: 0 },
  job_type: { type: 'string', required: true, enum: ['Full-time', 'Part-time', 'Contract'] }
};
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test -- jobService.test.ts
```

### Test Utilities
The application includes comprehensive test utilities:

```typescript
import { testData, performanceTest, dbTest, apiTest } from './utils/testHelpers.js';

// Test data generation
const validJob = testData.validJobPosting();

// Performance testing
await performanceTest.measureTime(async () => {
  // Your function here
}, 'Job Creation');

// Database testing
await dbTest.testConnection();
await dbTest.testCRUD();

// API testing
await apiTest.testEndpoint('http://localhost:3111/api/getAllJobs');
```

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Token refresh mechanism
- Secure password hashing

### Input Validation & Sanitization
- Request validation for all endpoints
- SQL injection prevention (Prisma ORM)
- XSS protection
- File upload validation

### CORS Configuration
```typescript
app.use('/*', cors({
  origin: ['http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
```

## 📊 Performance Optimization

### Database Optimization
- Proper indexing on frequently queried fields
- Connection pooling
- Query optimization with Prisma
- Pagination for large datasets

### API Optimization
- Response caching
- Request rate limiting
- Efficient data serialization
- Lazy loading of related data

## 🚀 Deployment

### Production Build
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
PORT=3111
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3111
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

## 🔄 Changelog

### v2.0.0 - Production Improvements
- ✅ Added comprehensive error handling
- ✅ Implemented request validation
- ✅ Created service layer architecture
- ✅ Added TypeScript type definitions
- ✅ Improved security features
- ✅ Added testing utilities
- ✅ Enhanced documentation

### v1.0.0 - Initial Release
- Basic job posting functionality
- User authentication
- Job applications
- Messaging system

## Recent Updates

### Photo Upload System (Latest)
- Added user profile photo upload functionality
- Supports JPEG, PNG, and WebP formats
- File size validation (max 5MB)
- Automatic file storage in `/uploads/photos/`
- Fallback to user initials with colored backgrounds
- Integrated into employer registration process

**Required Migration:**
```bash
npx prisma migrate dev --name add_user_photo
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification

### User Management
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Photo Management
- `POST /api/photos/upload` - Upload user photo
- `POST /api/photos/update` - Update user photo (base64)
- `DELETE /api/photos/delete` - Delete user photo
- `GET /api/photos/:userId` - Get user photo info

### Job Postings
- `POST /api/jobs` - Create job posting
- `GET /api/jobs` - List job postings
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - List applications
- `PUT /api/applications/:id` - Update application status

### Messaging
- `POST /api/messages/conversations` - Create conversation
- `GET /api/messages/conversations` - List conversations
- `POST /api/messages` - Send message
- `GET /api/messages/:conversationId` - Get conversation messages

### Notifications
- `GET /api/notifications` - List user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

## Database Schema

The application uses Prisma with MySQL. Key models include:

- **User**: Core user information with profile photos
- **Employer**: Employer-specific information and company details
- **JobSeeker**: Job seeker profile and preferences
- **JobListing**: Job postings with requirements and details
- **JobApplication**: Applications with status tracking
- **Message**: Messaging system
- **Notification**: In-app notifications
- **Skill**: Skills and categories

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file with:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/j4all"
   JWT_SECRET="your-secret-key"
   PORT=3111
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## File Structure

```
src/
├── controllers/          # API controllers
│   ├── auth/            # Authentication endpoints
│   ├── users/           # User management
│   ├── jobPosting/      # Job posting management
│   ├── applicant/       # Application handling
│   ├── notifications/   # Notification system
│   └── messages/        # Messaging system
├── services/            # Business logic
├── middleware/          # Custom middleware
├── utils/              # Utility functions
├── shared/             # Shared schemas and types
└── types/              # TypeScript type definitions
```

## Error Handling

The application uses a centralized error handling system:

- **Validation Errors**: Field-level validation with detailed messages
- **Authentication Errors**: Proper HTTP status codes for auth failures
- **Database Errors**: Graceful handling of database constraints
- **File Upload Errors**: Validation and storage error handling

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **File Validation**: File type and size validation
- **CORS Configuration**: Proper CORS setup for frontend integration

## Testing

Run tests with:
```bash
npm test
```

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```env
   NODE_ENV=production
   DATABASE_URL="production-database-url"
   JWT_SECRET="production-secret"
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation

## License

This project is licensed under the MIT License.

```
open http://localhost:3000
```