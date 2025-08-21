import { z } from 'zod';
export const listingSchema=z.object({ title:z.string().min(3), description:z.string().optional(), category:z.string().min(2), price:z.number().int().nonnegative(), city:z.string().optional(), images:z.array(z.string().url()).min(0) });
export const registerSchema=z.object({ username:z.string().min(3).max(24), password:z.string().min(6), phone:z.string().optional(), city:z.string().optional() });
export const loginSchema=z.object({ username:z.string(), password:z.string() });
