/**
 * Validation utilities for API inputs
 * Provides schema validation and data sanitization
 */

import Joi from 'joi';

export const schemas = {
  country: Joi.object({
    code: Joi.string().uppercase().length(2).required(),
    name: Joi.string().required()
  }),

  marketData: Joi.object({
    country: Joi.string().uppercase().length(2).required(),
    forex: Joi.number().positive().required(),
    fuel: Joi.object({
      petrol: Joi.number().positive().required(),
      diesel: Joi.number().positive().required()
    }).required(),
    inflation: Joi.number().min(0).required()
  }),

  intelligence: Joi.object({
    country: Joi.string().uppercase().length(2).required(),
    insight: Joi.string().required(),
    riskLevel: Joi.string().valid('low', 'medium', 'high').required(),
    anomalies: Joi.array().items(Joi.string())
  }),

  credentials: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};

export function validate(data, schema) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    return {
      isValid: false,
      errors: error.details.map(e => ({ field: e.path.join('.'), message: e.message }))
    };
  }
  return { isValid: true, value };
}

export function sanitize(data) {
  if (typeof data === 'string') {
    return data.trim().replace(/[<>\"\']/g, '');
  }
  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = sanitize(data[key]);
      return acc;
    }, Array.isArray(data) ? [] : {});
  }
  return data;
}