import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // In a real scenario, you'd filter by the user's branch_id
    const inventory = await prisma.branchStock.findMany({
      include: {
        item: true,
        branch: true
      }
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newStock = await prisma.branchStock.create({
      data: {
        branch_id: data.branch_id,
        item_id: data.item_id,
        quantity: data.quantity,
        expiry_date: new Date(data.expiry_date),
      }
    });
    return NextResponse.json(newStock);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add stock' }, { status: 500 });
  }
}
