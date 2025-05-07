// this route is use to fetch the products details for the heor section.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            image: true,
        },
    });

    if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
}