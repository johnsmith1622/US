import { useState, useEffect } from 'react';
import { MessageSquare, ShieldAlert, Heart, Info, Send, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface Post {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  category: string;
}

const CATEGORIES = ['General', 'Support', 'Success', 'Vent'];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('dasp-community-posts');
    return saved ? JSON.parse(saved) : [
      { id: '1', content: "Just wanted to say that things do get better. Keep pushing! 💙", timestamp: '2 hours ago', likes: 12, category: 'Success' },
      { id: '2', content: "Feeling a bit overwhelmed today, but I'm trying the box breathing tool. It helps.", timestamp: '5 hours ago', likes: 8, category: 'Support' }
    ];
  });

  const [newPost, setNewPost] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');

  useEffect(() => {
    localStorage.setItem('dasp-community-posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      category: activeCategory
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/40">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Community Space</h2>
        </div>
        <div className="space-y-4">
          <textarea
            placeholder="Share your thoughts anonymously..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full h-32 p-4 bg-white/40 rounded-2xl border-none focus:ring-2 focus:ring-indigo-400 outline-none resize-none shadow-inner"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full transition-all",
                    activeCategory === cat ? "bg-indigo-600 text-white" : "bg-white/50 text-slate-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Post Anonymously
            </button>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-50 rounded-xl flex items-start gap-3 border border-amber-100">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-xs text-amber-800">
            This is a safe space. No toxic behavior, bullying, or harassment is allowed. 
            Posts are anonymous to protect your privacy.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Anonymous</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white/50 rounded-md text-indigo-600">
                  {post.category}
                </span>
              </div>
              <p className="text-slate-700 mb-4">{post.content}</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-slate-500 hover:text-pink-500 transition-colors"
                >
                  <Heart className={cn("w-4 h-4", post.likes > 0 && "fill-pink-500 text-pink-500")} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-slate-500 hover:text-indigo-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold">Reply</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
