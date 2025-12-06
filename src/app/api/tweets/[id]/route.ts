import { NextRequest, NextResponse } from 'next/server';
import { getTweet, updateTweet, deleteTweet } from '@/lib/data';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const tweet = getTweet(id);
  
  if (!tweet) {
    return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });
  }
  
  return NextResponse.json(tweet);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const { content } = await request.json();
  
  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }
  
  const tweet = updateTweet(id, content);
  
  if (!tweet) {
    return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });
  }
  
  return NextResponse.json(tweet);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const deleted = deleteTweet(id);
  
  if (!deleted) {
    return NextResponse.json({ error: 'Tweet not found' }, { status: 404 });
  }
  
  return NextResponse.json({ success: true });
}
