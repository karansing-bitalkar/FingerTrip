import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import type { Destination } from '@/types';

interface Props {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({ destination, index = 0 }: Props) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-hover group relative bg-white rounded-2xl overflow-hidden shadow-md border border-[#AFDDE5]/30"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/60 via-transparent to-transparent" />

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-[#964734] border-[#964734] text-white'
              : 'bg-white/20 border-white/40 text-white hover:bg-white/40'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Popular Badge */}
        {destination.popular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#964734] to-[#0FA4AF] text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#AFDDE5]" />
          {destination.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-[#003135] font-display">{destination.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-[#964734] fill-[#964734]" />
            <span className="font-semibold text-gray-800">{destination.rating}</span>
            <span className="text-gray-400">({destination.reviews.toLocaleString()})</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{destination.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {destination.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[#AFDDE5]/30 text-[#024950] border border-[#AFDDE5] px-2.5 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">From</span>
            <div className="text-xl font-bold text-[#964734]">${destination.price.toLocaleString()}</div>
          </div>
          <Link
            to="/packages"
            className="px-5 py-2.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0FA4AF]/25 transition-all"
          >
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
