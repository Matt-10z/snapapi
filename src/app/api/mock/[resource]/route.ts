import { NextRequest, NextResponse } from 'next/server';

// In-memory store (resets on server restart — swap for Redis/DB in prod)
const store: Record<string, Record<string, unknown>[]> = {};

function getStore(resource: string) {
  if (!store[resource]) store[resource] = [];
  return store[resource];
}

export async function GET(
  req: NextRequest,
  { params }: { params: { resource: string; id?: string } }
) {
  const { resource } = params;
  const id = req.nextUrl.pathname.split('/').pop();
  const data = getStore(resource);

  if (id && id !== resource) {
    const item = data.find((d) => String(d.id) === id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  }

  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const { resource } = params;
  const body = await req.json();
  const data = getStore(resource);
  const newItem = { id: Date.now(), ...body };
  data.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const { resource } = params;
  const id = req.nextUrl.pathname.split('/').pop();
  const body = await req.json();
  const data = getStore(resource);
  const idx = data.findIndex((d) => String(d.id) === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  return NextResponse.json(data[idx]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  const { resource } = params;
  const id = req.nextUrl.pathname.split('/').pop();
  const data = getStore(resource);
  const idx = data.findIndex((d) => String(d.id) === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  data.splice(idx, 1);
  return NextResponse.json({ success: true, message: 'Resource deleted' });
}
