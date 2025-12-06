'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const { isLoggedIn } = useAuth();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
      onDelete?.();
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        {isLoggedIn && (
          <div className="flex gap-2">
            <Link
              href={`/posts/${post.id}/edit`}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 dark:text-red-400"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
