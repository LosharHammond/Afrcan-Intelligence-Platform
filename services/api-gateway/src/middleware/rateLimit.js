/**
 * Rate limiting middleware
 * Prevents abuse by limiting requests per time window
 */

const requestCounts = new Map();

export function rateLimit(windowMs = 900000, maxRequests = 100) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const userRequests = requestCounts.get(ip) || [];

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    recentRequests.push(now);
    requestCounts.set(ip, recentRequests);

    // Cleanup old entries
    if (requestCounts.size > 10000) {
      requestCounts.clear();
    }

    next();
  };
}