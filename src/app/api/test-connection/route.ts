import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const siteId = request.nextUrl.searchParams.get("siteId");
        const data = await prisma.event.findFirst({
            where: {
                eventType: 'script_initialized',
                siteId,
            }
        });

        return NextResponse.json({ success: !!data }, { status: 201 })
    } catch (error) {
        console.error('Error testing connection: ', error)
        return NextRequest.json({ success: false }, { status: 500 })
    }
}