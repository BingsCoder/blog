import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/data';

export async function GET() {
  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();
  
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }
  
  const post = createPost(title, content);
  return NextResponse.json(post, { status: 201 });
}
