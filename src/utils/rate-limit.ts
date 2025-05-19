interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const MAX_REQUESTS = 5; // Maximum requests per window

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const now = Date.now();
  const key = `rate_limit:${ip}`;
  
  // Get or initialize the rate limit data for this IP
  const rateLimitData = store[key] || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  // Check if the window has expired
  if (now > rateLimitData.resetTime) {
    // Reset the counter for a new window
    rateLimitData.count = 0;
    rateLimitData.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  // Increment the counter
  rateLimitData.count++;
  
  // Update the store
  store[key] = rateLimitData;
  
  // Calculate remaining requests
  const remaining = Math.max(0, MAX_REQUESTS - rateLimitData.count);
  
  return {
    allowed: rateLimitData.count <= MAX_REQUESTS,
    remaining
  };
}

// Cleanup function to remove expired entries (optional)
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, RATE_LIMIT_WINDOW); 