import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        branch: true
      }
    });
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newPatient = await prisma.patient.create({
      data: {
        primary_branch_id: data.branch_id,
        name: data.name,
        dateOfBirth: new Date(data.dob),
        gender: data.gender,
        contact_number: data.contact_number,
      }
    });
    return NextResponse.json(newPatient);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add patient' }, { status: 500 });
  }
}
