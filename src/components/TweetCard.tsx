'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Tweet } from '@/lib/types';
import Link from 'next/link';

interface TweetCardProps {
  tweet: Tweet;
  onDelete?: () => void;
}

export default function TweetCard({ tweet, onDelete }: TweetCardProps) {
  const { isLoggedIn } = useAuth();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this tweet?')) {
      await fetch(`/api/tweets/${tweet.id}`, { method: 'DELETE' });
      onDelete?.();
    }
  };

  return (
    <article className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
      <p className="text-gray-800 dark:text-gray-200 mb-3">
        {tweet.content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{new Date(tweet.createdAt).toLocaleDateString()}</span>
        {isLoggedIn && (
          <div className="flex gap-2">
            <Link
              href={`/tweets/${tweet.id}/edit`}
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
