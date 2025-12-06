import { Post, Tweet } from './types';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const TWEETS_FILE = path.join(DATA_DIR, 'tweets.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Posts
export function getPosts(): Post[] {
  ensureDataDir();
  if (!fs.existsSync(POSTS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(POSTS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function getPost(id: string): Post | undefined {
  const posts = getPosts();
  return posts.find(post => post.id === id);
}

export function createPost(title: string, content: string): Post {
  const posts = getPosts();
  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
}

export function updatePost(id: string, title: string, content: string): Post | null {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  savePosts(posts);
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  if (filteredPosts.length === posts.length) return false;
  savePosts(filteredPosts);
  return true;
}

function savePosts(posts: Post[]) {
  ensureDataDir();
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Tweets
export function getTweets(): Tweet[] {
  ensureDataDir();
  if (!fs.existsSync(TWEETS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(TWEETS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function getTweet(id: string): Tweet | undefined {
  const tweets = getTweets();
  return tweets.find(tweet => tweet.id === id);
}

export function createTweet(content: string): Tweet {
  const tweets = getTweets();
  const newTweet: Tweet = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tweets.unshift(newTweet);
  saveTweets(tweets);
  return newTweet;
}

export function updateTweet(id: string, content: string): Tweet | null {
  const tweets = getTweets();
  const index = tweets.findIndex(tweet => tweet.id === id);
  if (index === -1) return null;
  
  tweets[index] = {
    ...tweets[index],
    content,
    updatedAt: new Date().toISOString(),
  };
  saveTweets(tweets);
  return tweets[index];
}

export function deleteTweet(id: string): boolean {
  const tweets = getTweets();
  const filteredTweets = tweets.filter(tweet => tweet.id !== id);
  if (filteredTweets.length === tweets.length) return false;
  saveTweets(filteredTweets);
  return true;
}

function saveTweets(tweets: Tweet[]) {
  ensureDataDir();
  fs.writeFileSync(TWEETS_FILE, JSON.stringify(tweets, null, 2));
}
