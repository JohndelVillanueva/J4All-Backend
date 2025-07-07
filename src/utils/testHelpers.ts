// Test and debugging utilities

/**
 * Test error handling by simulating different types of errors
 */
export const testErrorHandling = {
  // Test validation error
  validationError: () => {
    throw new Error('Validation failed');
  },

  // Test database error
  databaseError: () => {
    const error = new Error('Database connection failed');
    (error as any).code = 'P2003';
    throw error;
  },

  // Test authentication error
  authError: () => {
    const error = new Error('Invalid token');
    error.name = 'JsonWebTokenError';
    throw error;
  },

  // Test not found error
  notFoundError: () => {
    const error = new Error('Record not found');
    (error as any).code = 'P2025';
    throw error;
  },
};

/**
 * Test data generators for development
 */
export const testData = {
  // Generate a valid job posting request
  validJobPosting: () => ({
    job_title: 'Software Engineer',
    job_description: 'We are looking for a talented software engineer to join our team.',
    job_requirements: 'Minimum 3 years of experience with React and Node.js',
    job_location: 'Manila',
    job_type: 'Full-time',
    work_mode: 'Hybrid',
    salary_range_min: 50000,
    salary_range_max: 80000,
    expiration_date: '2025-12-31',
    required_skills: ['React', 'Node.js', 'TypeScript'],
  }),

  // Generate a valid user registration request
  validUserRegistration: () => ({
    email: 'test@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    user_type: 'general',
    phone_number: '+1234567890',
    date_of_birth: '1990-01-01',
  }),

  // Generate invalid data for testing validation
  invalidJobPosting: () => ({
    job_title: '', // Empty title
    job_description: 'Too short', // Too short description
    job_requirements: '', // Empty requirements
    job_location: '', // Empty location
    job_type: 'Invalid', // Invalid job type
    work_mode: 'Invalid', // Invalid work mode
    salary_range_min: -1000, // Negative salary
    salary_range_max: 1000, // Max less than min
    expiration_date: 'invalid-date', // Invalid date
    required_skills: [], // Empty skills array
  }),
};

/**
 * Performance testing utilities
 */
export const performanceTest = {
  // Measure execution time of a function
  measureTime: async (fn: () => Promise<any>, name: string = 'Function') => {
    const start = performance.now();
    try {
      const result = await fn();
      const end = performance.now();
      console.log(`${name} took ${(end - start).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${name} failed after ${(end - start).toFixed(2)}ms:`, error);
      throw error;
    }
  },

  // Load test a function
  loadTest: async (fn: () => Promise<any>, iterations: number = 100) => {
    const times: number[] = [];
    const errors: Error[] = [];

    console.log(`Starting load test with ${iterations} iterations...`);

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      try {
        await fn();
        const end = performance.now();
        times.push(end - start);
      } catch (error) {
        errors.push(error as Error);
      }
    }

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    console.log(`Load test results:`);
    console.log(`- Successful requests: ${times.length}/${iterations}`);
    console.log(`- Failed requests: ${errors.length}`);
    console.log(`- Average time: ${avgTime.toFixed(2)}ms`);
    console.log(`- Min time: ${minTime.toFixed(2)}ms`);
    console.log(`- Max time: ${maxTime.toFixed(2)}ms`);

    if (errors.length > 0) {
      console.log(`- Error rate: ${((errors.length / iterations) * 100).toFixed(2)}%`);
    }

    return { times, errors, avgTime, minTime, maxTime };
  },
};

/**
 * Database testing utilities
 */
export const dbTest = {
  // Test database connection
  testConnection: async () => {
    try {
      const { prisma } = await import('../db.js');
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }
  },

  // Test basic CRUD operations
  testCRUD: async () => {
    try {
      const { prisma } = await import('../db.js');
      
      // Test read
      const userCount = await prisma.user.count();
      console.log(`✅ Read test passed. Users in database: ${userCount}`);
      
      // Test write (create a test record)
      const testUser = await prisma.user.create({
        data: {
          email: `test-${Date.now()}@example.com`,
          first_name: 'Test',
          last_name: 'User',
          user_type: 'general',
        } as any,
      });
      console.log('✅ Create test passed');
      
      // Test update
      await prisma.user.update({
        where: { id: testUser.id },
        data: { first_name: 'Updated' },
      });
      console.log('✅ Update test passed');
      
      // Test delete
      await prisma.user.delete({
        where: { id: testUser.id },
      });
      console.log('✅ Delete test passed');
      
      return true;
    } catch (error) {
      console.error('❌ CRUD test failed:', error);
      return false;
    }
  },
};

/**
 * API testing utilities
 */
export const apiTest = {
  // Test API endpoint
  testEndpoint: async (url: string, method: string = 'GET', body?: any) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();
      
      console.log(`✅ ${method} ${url} - Status: ${response.status}`);
      console.log('Response:', data);
      
      return { status: response.status, data };
    } catch (error) {
      console.error(`❌ ${method} ${url} failed:`, error);
      throw error;
    }
  },

  // Test authentication
  testAuth: async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3111/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Authentication successful');
        return data.token;
      } else {
        console.log('❌ Authentication failed:', data);
        return null;
      }
    } catch (error) {
      console.error('❌ Authentication test failed:', error);
      return null;
    }
  },
};

/**
 * Validation testing utilities
 */
export const validationTest = {
  // Test validation schemas
  testValidation: (schema: any, testData: any) => {
    try {
      const { validate } = require('./validation.js');
      const result = validate(testData, schema);
      
      if (result.isValid) {
        console.log('✅ Validation passed');
      } else {
        console.log('❌ Validation failed:', result.errors);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Validation test failed:', error);
      return { isValid: false, errors: [(error as Error).message] };
    }
  },
};

// Export all utilities
export default {
  testErrorHandling,
  testData,
  performanceTest,
  dbTest,
  apiTest,
  validationTest,
}; 