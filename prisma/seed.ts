import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Branches
  const karen = await prisma.branch.upsert({
    where: { id: 'branch-karen' },
    update: {},
    create: {
      id: 'branch-karen',
      name: 'MedCore Karen',
      location: 'Karen Road, off Langata Road, Nairobi',
      contact_details: '+254 700 100 200',
    },
  });

  const kitisuru = await prisma.branch.upsert({
    where: { id: 'branch-kitisuru' },
    update: {},
    create: {
      id: 'branch-kitisuru',
      name: 'MedCore Kitisuru',
      location: 'Kitisuru Road, Westlands, Nairobi',
      contact_details: '+254 700 100 300',
    },
  });

  const ruaka = await prisma.branch.upsert({
    where: { id: 'branch-ruaka' },
    update: {},
    create: {
      id: 'branch-ruaka',
      name: 'MedCore Ruaka',
      location: 'Limuru Road, Ruaka Town, Kiambu',
      contact_details: '+254 700 100 400',
    },
  });

  console.log('✅ Branches created');

  const hashedPassword = await bcrypt.hash('demo1234', 12);

  // Create Users — one per role
  const users = [
    {
      id: 'user-admin',
      branch_id: karen.id,
      role: 'SUPER_ADMIN',
      name: 'Amina Osei',
      email: 'admin@medcore.co.ke',
    },
    {
      id: 'user-manager-karen',
      branch_id: karen.id,
      role: 'BRANCH_MANAGER',
      name: 'Joseph Kamau',
      email: 'kamau@medcore.co.ke',
    },
    {
      id: 'user-doctor',
      branch_id: kitisuru.id,
      role: 'DOCTOR',
      name: 'Dr. Wanjiku Muthoni',
      email: 'dr.wanjiku@medcore.co.ke',
    },
    {
      id: 'user-nurse',
      branch_id: kitisuru.id,
      role: 'NURSE',
      name: 'Grace Akinyi',
      email: 'akinyi@medcore.co.ke',
    },
    {
      id: 'user-pharmacist',
      branch_id: ruaka.id,
      role: 'PHARMACIST',
      name: 'Brian Ochieng',
      email: 'pharm.ochieng@medcore.co.ke',
    },
    {
      id: 'user-receptionist',
      branch_id: karen.id,
      role: 'RECEPTIONIST',
      name: 'Faith Njeri',
      email: 'njeri@medcore.co.ke',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Users created');

  // Create sample inventory items
  const items = [
    { id: 'item-amoxicillin', name: 'Amoxicillin 500mg', sku: 'MED-AMX-500', generic_name: 'Amoxicillin' },
    { id: 'item-paracetamol', name: 'Paracetamol 500mg', sku: 'MED-PCM-500', generic_name: 'Acetaminophen' },
    { id: 'item-ibuprofen', name: 'Ibuprofen 400mg', sku: 'MED-IBU-400', generic_name: 'Ibuprofen' },
    { id: 'item-metformin', name: 'Metformin 850mg', sku: 'MED-MTF-850', generic_name: 'Metformin HCl' },
    { id: 'item-omeprazole', name: 'Omeprazole 20mg', sku: 'MED-OMP-020', generic_name: 'Omeprazole' },
    { id: 'item-lidocaine', name: 'Lidocaine 2%', sku: 'MED-LDC-002', generic_name: 'Lidocaine' },
  ];

  for (const item of items) {
    await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: {},
      create: item,
    });
  }

  // Create branch stock
  const branchStocks = [
    { branch_id: karen.id, item_id: 'item-amoxicillin', quantity: 500 },
    { branch_id: karen.id, item_id: 'item-paracetamol', quantity: 0 },
    { branch_id: kitisuru.id, item_id: 'item-amoxicillin', quantity: 350 },
    { branch_id: kitisuru.id, item_id: 'item-lidocaine', quantity: 12 },
    { branch_id: ruaka.id, item_id: 'item-amoxicillin', quantity: 2 },
    { branch_id: ruaka.id, item_id: 'item-metformin', quantity: 800 },
    { branch_id: ruaka.id, item_id: 'item-omeprazole', quantity: 200 },
  ];

  for (const stock of branchStocks) {
    await prisma.branchStock.create({ data: stock });
  }

  console.log('✅ Inventory seeded');

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

  console.log('✅ Patients seeded');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
