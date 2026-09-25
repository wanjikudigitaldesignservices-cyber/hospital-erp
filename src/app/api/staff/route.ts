import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// GET /api/staff - List all staff (filtered by branch for non-admins)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const role = (session.user as any).role;
    const branchId = (session.user as any).branch_id;

    // Only SUPER_ADMIN and BRANCH_MANAGER can view staff
    if (!['SUPER_ADMIN', 'BRANCH_MANAGER'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const where = role === 'SUPER_ADMIN' ? {} : { branch_id: branchId };

    const staff = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        branch_id: true,
        createdAt: true,
        branch: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(staff);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/staff - Add new staff member with auto-generated password
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userRole = (session.user as any).role;
    if (!['SUPER_ADMIN', 'BRANCH_MANAGER'].includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const { name, email, role, branch_id } = data;

    if (!name || !email || !role || !branch_id) {
      return NextResponse.json({ error: 'All fields are required: name, email, role, branch_id' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'A staff member with this email already exists' }, { status: 409 });
    }

    // Auto-generate a secure password
    const generatedPassword = crypto.randomBytes(4).toString('hex') + '!A1';
    const hashedPassword = await bcrypt.hash(generatedPassword, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        branch_id,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        branch: { select: { name: true } },
        createdAt: true,
      },
    });

    // In production, you would send this via email using Resend, SendGrid, etc.
    // For now, return the generated password so the admin can share it securely
    return NextResponse.json({
      success: true,
      message: `Staff member created successfully. Their temporary password is shown below — share it securely. They should change it on first login.`,
      staff: newUser,
      temporaryPassword: generatedPassword,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
