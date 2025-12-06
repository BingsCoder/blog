import { NextRequest, NextResponse } from 'next/server';
import { getTweets, createTweet } from '@/lib/data';

export async function GET() {
  const tweets = getTweets();
  return NextResponse.json(tweets);
}

export async function POST(request: NextRequest) {
  const { content } = await request.json();
  
  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }
  
  const tweet = createTweet(content);
  return NextResponse.json(tweet, { status: 201 });
}
