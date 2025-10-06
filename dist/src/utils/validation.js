// Validation schemas for API requests
// Note: Install zod with: npm install zod
// Then uncomment the zod import and use these schemas
// Job Posting Validation Schema
export const createJobPostingSchema = {
    job_title: { type: 'string', required: true, minLength: 3, maxLength: 100 },
    job_description: { type: 'string', required: true, minLength: 10, maxLength: 2000 },
    job_requirements: { type: 'string', required: true, minLength: 10, maxLength: 1000 },
    job_location: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    job_type: { type: 'string', required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
    work_mode: { type: 'string', required: true, enum: ['On-site', 'Remote', 'Hybrid'] },
    salary_range_min: { type: 'number', required: true, min: 0 },
    salary_range_max: { type: 'number', required: true, min: 0 },
    expiration_date: { type: 'string', required: true, format: 'date' },
    required_skills: { type: 'array', items: { type: 'string' }, minItems: 1 }
};
// User Registration Validation Schema
export const userRegistrationSchema = {
    email: { type: 'string', required: true, format: 'email', maxLength: 255 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 128 },
    first_name: { type: 'string', required: true, minLength: 2, maxLength: 50 },
    last_name: { type: 'string', required: true, minLength: 2, maxLength: 50 },
    user_type: { type: 'string', required: true, enum: ['employer', 'general', 'pwd', 'indigenous'] },
    phone_number: { type: 'string', required: false, maxLength: 20 },
    date_of_birth: { type: 'string', required: false, format: 'date' }
};
// Job Application Validation Schema
export const jobApplicationSchema = {
    job_id: { type: 'number', required: true, min: 1 },
    cover_letter: { type: 'string', required: true, minLength: 10, maxLength: 2000 },
    resume: { type: 'string', required: true }
};
// Message Validation Schema
export const createMessageSchema = {
    conversation_id: { type: 'number', required: true, min: 1 },
    content: { type: 'string', required: true, minLength: 1, maxLength: 1000 }
};
// Conversation Validation Schema
export const createConversationSchema = {
    participant2_id: { type: 'number', required: true, min: 1 }
};
// Validation function (basic implementation)
export const validate = (data, schema) => {
    const errors = [];
    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];
        // Check required fields
        if (rules.required && (value === undefined || value === null || value === '')) {
            errors.push(`${field} is required`);
            continue;
        }
        // Skip validation if field is not required and not provided
        if (!rules.required && (value === undefined || value === null || value === '')) {
            continue;
        }
        // Type validation
        if (rules.type === 'string' && typeof value !== 'string') {
            errors.push(`${field} must be a string`);
        }
        else if (rules.type === 'number' && typeof value !== 'number') {
            errors.push(`${field} must be a number`);
        }
        else if (rules.type === 'array' && !Array.isArray(value)) {
            errors.push(`${field} must be an array`);
        }
        // String validations
        if (rules.type === 'string' && typeof value === 'string') {
            if (rules.minLength && value.length < rules.minLength) {
                errors.push(`${field} must be at least ${rules.minLength} characters long`);
            }
            if (rules.maxLength && value.length > rules.maxLength) {
                errors.push(`${field} must be at most ${rules.maxLength} characters long`);
            }
            if (rules.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors.push(`${field} must be a valid email address`);
            }
            if (rules.enum && !rules.enum.includes(value)) {
                errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
            }
        }
        // Number validations
        if (rules.type === 'number' && typeof value === 'number') {
            if (rules.min !== undefined && value < rules.min) {
                errors.push(`${field} must be at least ${rules.min}`);
            }
            if (rules.max !== undefined && value > rules.max) {
                errors.push(`${field} must be at most ${rules.max}`);
            }
        }
        // Array validations
        if (rules.type === 'array' && Array.isArray(value)) {
            if (rules.minItems && value.length < rules.minItems) {
                errors.push(`${field} must have at least ${rules.minItems} items`);
            }
            if (rules.maxItems && value.length > rules.maxItems) {
                errors.push(`${field} must have at most ${rules.maxItems} items`);
            }
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
// Middleware for validation
export const validateRequest = (schema) => {
    return async (c, next) => {
        try {
            const body = await c.req.json();
            const validation = validate(body, schema);
            if (!validation.isValid) {
                return c.json({
                    success: false,
                    message: 'Validation failed',
                    errors: validation.errors,
                    code: 'VALIDATION_ERROR'
                }, 400);
            }
            c.set('validatedData', body);
            await next();
        }
        catch (error) {
            return c.json({
                success: false,
                message: 'Invalid request body',
                code: 'INVALID_REQUEST'
            }, 400);
        }
    };
};
