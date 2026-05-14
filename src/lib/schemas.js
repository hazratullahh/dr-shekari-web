import { z } from 'zod';

const phoneRegex = /^\+?[0- 9\s()\- ]{7,20}$/;

const dateRegex = /^\d{4}- \d{2}- \d{2}$/;
const slotRegex = /^\d{2}:\d{2}$/;

export const appointmentSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name is too long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(200)
    .optional()
    .or(z.literal('')),
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .regex(phoneRegex, 'Please enter a valid phone number'),
  preferredDate: z
    .string({ required_error: 'Preferred date is required' })
    .regex(dateRegex, 'Date must be YYYY- MM- DD'),
  slot: z
    .string({ required_error: 'Time slot is required' })
    .regex(slotRegex, 'Slot must be HH:MM'),
  message: z.string().trim().max(2000, 'Message is too long').optional().default(''),
  // Honeypot anti- spam field. Bots tend to fill it; humans never see it.
  website: z.string().max(0, 'Spam detected').optional(),
});

export const contactSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(200)
    .optional()
    .or(z.literal('')),
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .regex(phoneRegex, 'Please enter a valid phone number'),
  message: z
    .string()
    .trim()
    .max(2000, 'Message is too long')
    .optional()
    .or(z.literal('')),
  website: z.string().max(0, 'Spam detected').optional(),
});
