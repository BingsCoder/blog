'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import TweetCard from '@/components/TweetCard';
import { Post, Tweet } from '@/lib/types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [postsRes, tweetsRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/tweets')
      ]);
      const postsData = await postsRes.json();
      const tweetsData = await tweetsRes.json();
      setPosts(postsData);
      setTweets(tweetsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tweets Section */}
      {tweets.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Recent Tweets
          </h2>
          <div className="space-y-3">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} onDelete={fetchData} />
            ))}
          </div>
        </section>
      )}

      {/* Posts Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Blog Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={fetchData} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
