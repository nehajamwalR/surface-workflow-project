import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { eventType, siteId, visitorId, data } = await req.json();

    try {
        await prisma.event.create({
            data: {
                visitorId,
                siteId,
                eventType,
                data,
            },
        });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error saving event:", error);
        return NextResponse.json({ success: false, error: 'Failed to save event' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const siteId = req.nextUrl.searchParams.get("siteId");
        const data = await prisma.event.findMany({
            where: {
                siteId,
            }
        });

        return NextResponse.json({ success: true, data }, { status: 201 })
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
    }
}