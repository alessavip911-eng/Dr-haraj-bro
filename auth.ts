import jwt from 'jsonwebtoken'; import { cookies } from 'next/headers'; import { prisma } from '@/lib/prisma';
const JWT_SECRET=process.env.JWT_SECRET||'dev_secret_change_me';
export function signToken(payload:any,expiresIn='7d'){ return jwt.sign(payload, JWT_SECRET, { expiresIn }); }
export function verifyToken(token:string){ try{ return jwt.verify(token, JWT_SECRET) as any } catch { return null } }
export async function getUserFromCookie(){ const token=cookies().get('token')?.value; if(!token) return null; const data=verifyToken(token); if(!data?.sub) return null; return prisma.user.findUnique({ where:{ id:Number(data.sub) }}); }
