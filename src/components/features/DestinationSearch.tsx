import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, TrendingUp, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS, PACKAGES } from '@/constants/data';

interface SearchResult {
  id: string;
  name: string;
  type: 'destination' | 'package';
  subtitle: string;
  image: string;
  price: number;
  rating: number;
  badge?: string;
}

const ALL_RESULTS: SearchResult[] = [
  ...DESTINATIONS.map(d => ({
    id: d.id,
    name: d.name,
    type: 'destination' as const,
    subtitle: d.country + ' · ' + d.tags.join(', '),
    image: d.image,
    price: d.price,
    rating: d.rating,
    badge: d.popular ? 'Popular' : undefined,
  })),
  ...PACKAGES.map(p => ({
    id: p.id,
    name: p.title,
    type: 'package' as const,
    subtitle: p.destination + ' · ' + p.duration,
    image: p.image,
    price: p.price,
    rating: p.rating,
    badge: p.trending ? 'Trending' : undefined,
  })),
];

const TRENDING = ['Maldives', 'Bali', 'Switzerland', 'Kashmir', 'Dubai'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DestinationSearch({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const doSearch = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setIsSearching(true);
    setTimeout(() => {
      const filtered = ALL_RESULTS.filter(r =>
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
      setSelectedIndex(-1);
      setIsSearching(false);
    }, 200);
  }, []);

  useEffect(() => { doSearch(query); }, [query, doSearch]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (query) {
        navigate('/packages');
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.type === 'destination' ? '/destinations' : '/packages');
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-[#003135]/20 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-4 px-5 py-4 border-b border-[#AFDDE5]/40">
              <Search className="w-5 h-5 text-[#0FA4AF] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search destinations, packages, experiences..."
                className="flex-1 text-base text-gray-800 bg-transparent focus:outline-none placeholder-gray-400"
              />
              {query && (
                <button onClick={() => setQuery('')} className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">
                ESC
              </button>
            </div>

            <div className="max-h-[520px] overflow-y-auto">
              {/* Searching spinner */}
              {isSearching && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-[#AFDDE5] border-t-[#0FA4AF] rounded-full animate-spin" />
                </div>
              )}

              {/* Results */}
              {!isSearching && results.length > 0 && (
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 mb-1">
                    {results.length} results for "{query}"
                  </div>
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id + result.type}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all ${
                        selectedIndex === index
                          ? 'bg-[#AFDDE5]/30 border border-[#AFDDE5]'
                          : 'hover:bg-[#f0fafb]'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-14 h-14 rounded-xl object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=100&q=80'; }}
                        />
                        {result.badge && (
                          <div className="absolute -top-1.5 -right-1.5 bg-[#964734] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            {result.badge}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">{result.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-[#964734] shrink-0" />
                          {result.subtitle}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-[#964734] fill-[#964734]" />
                          <span className="text-xs font-semibold text-gray-700">{result.rating}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-[#964734]">${result.price.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-400">per person</div>
                        <div className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-1 ${
                          result.type === 'destination'
                            ? 'bg-[#AFDDE5]/50 text-[#024950]'
                            : 'bg-[#964734]/10 text-[#964734]'
                        }`}>
                          {result.type === 'destination' ? 'Destination' : 'Package'}
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 text-gray-300 shrink-0 transition-colors ${selectedIndex === index ? 'text-[#0FA4AF]' : ''}`} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No results */}
              {!isSearching && query && results.length === 0 && (
                <div className="py-12 text-center">
                  <div className="text-5xl mb-3">🌍</div>
                  <div className="font-semibold text-gray-700 mb-1">No results found</div>
                  <div className="text-sm text-gray-400">Try searching for a destination or package type</div>
                </div>
              )}

              {/* Initial state — Trending */}
              {!query && (
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                    <TrendingUp className="w-3.5 h-3.5 text-[#964734]" /> Trending Destinations
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {TRENDING.map((t) => (
                      <button
                        key={t}
                        onClick={() => setQuery(t)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#f0fafb] border border-[#AFDDE5] text-[#024950] text-sm font-medium rounded-full hover:bg-[#AFDDE5]/40 hover:border-[#0FA4AF] transition-all"
                      >
                        <MapPin className="w-3 h-3 text-[#964734]" /> {t}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick Browse</div>
                  <div className="grid grid-cols-3 gap-2">
                    {DESTINATIONS.slice(0, 3).map(d => (
                      <div
                        key={d.id}
                        onClick={() => { navigate('/destinations'); onClose(); }}
                        className="relative rounded-2xl overflow-hidden h-24 cursor-pointer group"
                      >
                        <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=80'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/70 to-transparent" />
                        <div className="absolute bottom-2 left-3 text-white font-bold text-xs">{d.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
