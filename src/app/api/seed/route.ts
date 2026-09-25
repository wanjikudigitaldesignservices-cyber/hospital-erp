import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// POST /api/seed - Seeds the database with initial data
// This should be called once after deployment, then disabled
export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash('demo1234', 12);

    // Create Branches
    const karen = await prisma.branch.upsert({
      where: { id: 'branch-karen' },
      update: {},
      create: { id: 'branch-karen', name: 'MedCore Karen', location: 'Karen Road, off Langata Road, Nairobi', contact_details: '+254 700 100 200' },
    });
    const kitisuru = await prisma.branch.upsert({
      where: { id: 'branch-kitisuru' },
      update: {},
      create: { id: 'branch-kitisuru', name: 'MedCore Kitisuru', location: 'Kitisuru Road, Westlands, Nairobi', contact_details: '+254 700 100 300' },
    });
    const ruaka = await prisma.branch.upsert({
      where: { id: 'branch-ruaka' },
      update: {},
      create: { id: 'branch-ruaka', name: 'MedCore Ruaka', location: 'Limuru Road, Ruaka Town, Kiambu', contact_details: '+254 700 100 400' },
    });

    // Create Users
    const users = [
      { id: 'user-admin', branch_id: karen.id, role: 'SUPER_ADMIN', name: 'Amina Osei', email: 'admin@medcore.co.ke' },
      { id: 'user-manager', branch_id: karen.id, role: 'BRANCH_MANAGER', name: 'Joseph Kamau', email: 'kamau@medcore.co.ke' },
      { id: 'user-doctor', branch_id: kitisuru.id, role: 'DOCTOR', name: 'Dr. Wanjiku Muthoni', email: 'dr.wanjiku@medcore.co.ke' },
      { id: 'user-nurse', branch_id: kitisuru.id, role: 'NURSE', name: 'Grace Akinyi', email: 'akinyi@medcore.co.ke' },
      { id: 'user-pharmacist', branch_id: ruaka.id, role: 'PHARMACIST', name: 'Brian Ochieng', email: 'pharm.ochieng@medcore.co.ke' },
      { id: 'user-receptionist', branch_id: karen.id, role: 'RECEPTIONIST', name: 'Faith Njeri', email: 'njeri@medcore.co.ke' },
    ];

    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { ...user, password: hashedPassword },
      });
    }

    // Create inventory items
    const items = [
      { id: 'item-amoxicillin', name: 'Amoxicillin 500mg', sku: 'MED-AMX-500', generic_name: 'Amoxicillin' },
      { id: 'item-paracetamol', name: 'Paracetamol 500mg', sku: 'MED-PCM-500', generic_name: 'Acetaminophen' },
      { id: 'item-ibuprofen', name: 'Ibuprofen 400mg', sku: 'MED-IBU-400', generic_name: 'Ibuprofen' },
      { id: 'item-metformin', name: 'Metformin 850mg', sku: 'MED-MTF-850', generic_name: 'Metformin HCl' },
      { id: 'item-omeprazole', name: 'Omeprazole 20mg', sku: 'MED-OMP-020', generic_name: 'Omeprazole' },
      { id: 'item-lidocaine', name: 'Lidocaine 2%', sku: 'MED-LDC-002', generic_name: 'Lidocaine' },
    ];

    for (const item of items) {
      await prisma.inventoryItem.upsert({ where: { sku: item.sku }, update: {}, create: item });
    }

    // Create sample patients
    const patients = [
      { primary_branch_id: karen.id, name: 'Mary Wambui', dateOfBirth: new Date('1985-03-14'), gender: 'Female', contact_number: '0722 111 222' },
      { primary_branch_id: karen.id, name: 'Peter Otieno', dateOfBirth: new Date('1990-07-22'), gender: 'Male', contact_number: '0733 222 333' },
      { primary_branch_id: kitisuru.id, name: 'Esther Nyambura', dateOfBirth: new Date('1978-11-05'), gender: 'Female', contact_number: '0711 333 444' },
      { primary_branch_id: ruaka.id, name: 'James Kipchoge', dateOfBirth: new Date('2001-01-30'), gender: 'Male', contact_number: '0700 444 555' },
    ];

    for (const patient of patients) {
      await prisma.patient.create({ data: patient });
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
