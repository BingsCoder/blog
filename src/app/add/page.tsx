'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

type ContentType = 'post' | 'tweet' | null;

export default function AddPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [contentType, setContentType] = useState<ContentType>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Please login to add content.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (contentType === 'post') {
        const res = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        if (!res.ok) throw new Error('Failed to create post');
      } else if (contentType === 'tweet') {
        const res = await fetch('/api/tweets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        if (!res.ok) throw new Error('Failed to create tweet');
      }
      router.push('/');
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!contentType) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          What would you like to add?
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => setContentType('post')}
            className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              📝 Blog Post
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Write a detailed article with a title and content
            </p>
          </button>
          <button
            onClick={() => setContentType('tweet')}
            className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🐦 Tweet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Share a quick thought or update (no title needed)
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setContentType(null)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {contentType === 'post' ? 'New Blog Post' : 'New Tweet'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {contentType === 'post' && (
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={contentType === 'post' ? 10 : 4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={contentType === 'post' ? 'Write your post...' : "What's on your mind?"}
            required
            maxLength={contentType === 'tweet' ? 280 : undefined}
          />
          {contentType === 'tweet' && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {content.length}/280 characters
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : `Publish ${contentType === 'post' ? 'Post' : 'Tweet'}`}
        </button>
      </form>
    </div>
  );
}
