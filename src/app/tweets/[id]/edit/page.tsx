'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Tweet } from '@/lib/types';
import Link from 'next/link';

interface EditTweetPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTweetPage({ params }: EditTweetPageProps) {
  const { id } = use(params);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await fetch(`/api/tweets/${id}`);
        if (!res.ok) throw new Error('Tweet not found');
        const data = await res.json();
        setTweet(data);
        setContent(data.content);
      } catch {
        setError('Tweet not found');
      } finally {
        setLoading(false);
      }
    };
    fetchTweet();
  }, [id]);

  if (!isLoggedIn) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Please login to edit tweets.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/tweets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Failed to update tweet');
      router.push('/');
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error && !tweet) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Tweet
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's on your mind?"
            required
            maxLength={280}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {content.length}/280 characters
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
