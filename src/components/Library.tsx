import { useState, useEffect } from 'react';
import { Book, Download, ExternalLink, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: string;
  url: string;
}

const BOOKS: BookItem[] = [
  {
    id: '1',
    title: 'Mindfulness for Beginners',
    author: 'Jon Kabat-Zinn',
    category: 'Mindfulness',
    description: 'A perfect introduction to the practice of mindfulness.',
    cover: 'https://picsum.photos/seed/mindful/300/450',
    url: '#'
  },
  {
    id: '2',
    title: 'The Art of Happiness',
    author: 'Dalai Lama',
    category: 'Self-care',
    description: 'A guide to finding inner peace and lasting joy.',
    cover: 'https://picsum.photos/seed/happy/300/450',
    url: '#'
  },
  {
    id: '3',
    title: 'Starlight Dreams',
    author: 'Elena Vance',
    category: 'Novels & fiction',
    description: 'A soothing journey through a world of imagination.',
    cover: 'https://picsum.photos/seed/novel/300/450',
    url: '#'
  },
  {
    id: '4',
    title: 'Emotional Intelligence',
    author: 'Daniel Goleman',
    category: 'Education',
    description: 'Understanding the power of emotions in our lives.',
    cover: 'https://picsum.photos/seed/edu/300/450',
    url: '#'
  },
  {
    id: '5',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    category: 'Inspiration',
    description: 'A guide to spiritual enlightenment and living in the present.',
    cover: 'https://picsum.photos/seed/inspire/300/450',
    url: '#'
  },
  {
    id: '6',
    title: 'Self-Compassion',
    author: 'Kristin Neff',
    category: 'Self-care',
    description: 'The proven power of being kind to yourself.',
    cover: 'https://picsum.photos/seed/kind/300/450',
    url: '#'
  }
];

const CATEGORIES = ['All', 'Self-care', 'Novels & fiction', 'Mindfulness', 'Education', 'Inspiration'];

export default function Library() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS.filter(book => {
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Book className="w-8 h-8 text-indigo-600" />
            Digital Library
          </h2>
          <p className="opacity-70">Expand your mind and find peace through reading.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white/40 hover:bg-white/60 text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-lg border border-white/40 group hover:shadow-xl transition-all"
            >
              <div className="aspect-[2/3] rounded-2xl overflow-hidden mb-4 relative">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white rounded-full text-indigo-600 hover:scale-110 transition-transform">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                  <button className="p-3 bg-indigo-600 rounded-full text-white hover:scale-110 transition-transform">
                    <Download className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {book.category}
                </span>
                <h3 className="font-bold text-lg leading-tight">{book.title}</h3>
                <p className="text-sm opacity-70 italic">by {book.author}</p>
                <p className="text-xs opacity-60 line-clamp-2 mt-2">{book.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
