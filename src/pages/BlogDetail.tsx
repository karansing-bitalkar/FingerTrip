import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Tag, Share2, Copy, Check, Heart, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const BLOG_POSTS = [
  {
    id: '1',
    title: '10 Hidden Gems in Bali That Most Tourists Miss',
    excerpt: "Beyond the crowds of Kuta and Ubud lies a Bali few travelers discover. We've spent weeks exploring hidden waterfalls, secret temples, and untouched beaches that will leave you speechless.",
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=85',
    category: 'Destinations',
    author: 'Priya Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    authorBio: 'Priya is a travel writer and photographer who has spent over 3 years living across Southeast Asia. She specializes in off-the-beaten-path destinations, sustainable travel, and immersive cultural experiences. Her work has been featured in Condé Nast Traveler, Lonely Planet, and National Geographic Traveler.',
    authorRole: 'Senior Travel Writer & Photographer',
    date: 'April 5, 2026',
    readTime: '8 min read',
    tags: ['Bali', 'Hidden Gems', 'Indonesia', 'Beach', 'Culture'],
    featured: true,
    content: [
      {
        type: 'intro',
        text: "Most travelers who visit Bali follow the same well-trodden path: Kuta Beach, the rice terraces of Tegalalang, the Monkey Forest in Ubud, and a quick sunset at Tanah Lot. And while these places are undeniably beautiful, there's an entirely different Bali waiting for those willing to venture just a little further. I spent six weeks combing the island's forgotten corners, and what I found will change how you travel here forever."
      },
      {
        type: 'section',
        heading: '1. Tukad Cepung Waterfall — The Cathedral of Light',
        text: "Deep in the Bangli Regency, accessible only through a narrow river gorge, Tukad Cepung waterfall is perhaps the most photographically stunning spot on the island. You wade ankle-deep through cool river water, squeeze between cathedral-like rock walls, and emerge into a magical clearing where a thin veil of water cascades from a hole in the ceiling, sending shafts of golden light in every direction when the morning sun hits it just right.\n\nGet there before 10am on a clear day. The light vanishes by mid-morning, and the crowds arrive by 11. There's no direct signpost — ask locals for 'Air Terjun Tukad Cepung' in the village of Tembuku."
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1000&q=80',
        caption: 'The sacred Pura Kehen temple complex, rarely visited by tourists, sits among ancient banyan trees'
      },
      {
        type: 'section',
        heading: '2. Pura Kehen — Bali\'s Most Underrated Temple',
        text: "While millions queue for photos at Uluwatu and Besakih, Pura Kehen sits in quiet dignity in the hills above Bangli town, completely overlooked by the package-tour circuit. Dating back to the 11th century, it's one of Bali's most important state temples — a stepped pyramid crowned by an enormous ancient banyan tree whose writhing roots have been incorporated into the walls.\n\nThe intricate stone carvings here rival anything at Tirta Gangga or Pura Besakih, yet on the Tuesday afternoon I visited, there were exactly three other foreign visitors. The penjor bamboo offerings swayed gently in the mountain breeze, and a group of women in traditional kebayas prepared ceremonial offerings with unhurried grace."
      },
      {
        type: 'section',
        heading: '3. Nusa Penida\'s Secret North Coast',
        text: "Everyone goes to Kelingking Beach and Angel\'s Billabong on Nusa Penida — and yes, they\'re stunning. But the northern coastline, running from Toyapakeh to Crystal Bay via the back roads, is virtually untouched. Rent a scooter (not a driver-guided jeep) and explore the crumbling coastal paths above vertiginous cliffs where manta rays congregate in the clear blue waters below.\n\nAt Crystal Bay, arrive just after dawn when the dive boats haven't yet shown up and you can swim alongside those magnificent mantas in near-silence. The snorkeling is so rich here that visibility can exceed 30 meters on calm days — you can see the reef shimmering 25 meters below from the surface."
      },
      {
        type: 'tip',
        text: "Pro tip: Always carry 100,000–200,000 IDR in small bills when exploring remote areas. Many of these sites charge informal 'donation' fees, and not having change creates awkward situations."
      },
      {
        type: 'section',
        heading: '4. Sidemen Valley — Rice Terrace Perfection Without the Selfie Sticks',
        text: "The Tegalalang rice terraces near Ubud have Instagram filters applied to reality: wooden swings dangling over infinity edges, 'pay to enter' zones, souvenir stalls every 20 meters. Sidemen Valley, roughly 45 minutes east, is what Tegalalang must have looked like 20 years ago. The emerald-green terraces descend in perfect geometric steps to the Unda River, and the only sound is the gurgling irrigation system and distant gamelan music from a village ceremony.\n\nStay at one of the handful of family-run homestays in the valley — usually $15–25 per night — and wake at 5:30am to watch the mist lift from the mountains as farmers begin their morning work. Nothing in Bali has felt more authentically magical to me than that quiet hour."
      },
      {
        type: 'section',
        heading: '5. Jatiluwih\'s Forgotten Trails',
        text: "Jatiluwih is now a UNESCO World Heritage Site, but most visitors arrive by car, take photos from the designated viewpoints, and leave within an hour. What they miss are the 8km of walking trails that wind through the terraces themselves — between the paddy fields, past ancient subak irrigation shrines, through small kampungs where roosters challenge you to a staring contest.\n\nThe full route takes 3–4 hours and ends at the old warung near the western entrance, where an elderly couple serves the best nasi campur I've eaten in Bali, accompanied by kopi tubruk that could wake the dead."
      },
      {
        type: 'section',
        heading: 'Practical Notes for the Independent Explorer',
        text: "Renting your own scooter (approximately 70,000–100,000 IDR per day, roughly $4–6) is non-negotiable for exploring these places. A driver will take you to the popular spots and steer away from 'difficult' roads.\n\nLearn ten phrases in Bahasa Indonesia. Not just 'terima kasih' (thank you) — add 'berapa harga?' (how much?), 'tolong' (please), 'di mana?' (where is?), and 'enak sekali!' (this is delicious!) and watch doors open.\n\nThe best two months are July–August and January–February when the weather gods cooperate most reliably, though 'dry season' in Bali is relative — afternoon showers are always possible.\n\nFinally: resist the urge to share every location on social media. The places in this article remain special precisely because they aren't overrun yet. Be part of the solution."
      }
    ]
  },
  {
    id: '2',
    title: 'The Ultimate Switzerland Rail Pass Guide for 2026',
    excerpt: 'Everything you need to know about navigating Switzerland by train — passes, routes, and insider tips from seasoned Alpine travelers.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1400&q=85',
    category: 'Travel Tips',
    author: 'James Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    authorBio: 'James is a rail travel enthusiast and former Swiss Federal Railways consultant who has ridden every major rail line in Europe. He now writes about sustainable overland travel for publications across the UK and US.',
    authorRole: 'Rail Travel Expert & Writer',
    date: 'April 2, 2026',
    readTime: '12 min read',
    tags: ['Switzerland', 'Rail Travel', 'Europe', 'Alps', 'Budget Travel'],
    featured: false,
    content: [
      {
        type: 'intro',
        text: "Switzerland has one of the finest railway networks in the world — 5,000km of track winding through impossible mountain terrain, connecting glacier towns with medieval cities with near-perfect punctuality. Understanding which rail pass to buy (or whether to skip the pass entirely) can save you hundreds of dollars and unlock journeys that feel genuinely impossible."
      },
      {
        type: 'section',
        heading: 'Swiss Travel Pass vs. Eurail: Which Should You Buy?',
        text: "The Swiss Travel Pass is the gold standard for exploring Switzerland exclusively. For a stay of 8+ days, it's almost always better value than point-to-point tickets. It covers SBB trains, PostBuses, lake steamers, many mountain railways, and even urban trams. The Eurail Global Pass covers Switzerland but doesn't include the scenic panoramic routes (Glacier Express, Bernina Express) without paying supplements — a significant hidden cost if you're planning those."
      },
      {
        type: 'section',
        heading: 'The Unmissable Scenic Routes',
        text: "The Glacier Express between Zermatt and St. Moritz is 8 hours through 91 tunnels and 291 bridges — book the panoramic car in advance. The Bernina Express from Chur to Tirano (Italy) crosses the UNESCO-listed Rhaetian Railway through high Alpine passes. The Golden Pass Line from Montreux to Interlaken passes through some of Switzerland's most photogenic lake scenery. Don't miss the Brienz Rothorn Railway — a century-old steam cog railway that clanks up to a summit view that defies belief."
      },
      {
        type: 'tip',
        text: "Book panoramic train seats at least 2 weeks in advance during summer (July–September). Window seats on the right side going from Zermatt to St. Moritz offer the most dramatic views."
      }
    ]
  },
  {
    id: '3',
    title: 'Kashmir in February: Snow, Silence, and Soul',
    excerpt: "A personal account of spending Valentine's week on a Dal Lake houseboat with Gulmarg's fresh powder snow calling at dawn.",
    image: 'https://images.unsplash.com/photo-1566836610593-62a64888a216?w=1400&q=85',
    category: 'Stories',
    author: 'Aryan Kapoor',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    authorBio: 'Aryan is a travel storyteller from Mumbai who specializes in India\'s mountain destinations. He has trekked over 40 high-altitude routes across the Himalayas and written two books on Indian mountain culture.',
    authorRole: 'Travel Storyteller & Author',
    date: 'March 28, 2026',
    readTime: '6 min read',
    tags: ['Kashmir', 'India', 'Winter Travel', 'Dal Lake', 'Snow'],
    featured: false,
    content: [
      {
        type: 'intro',
        text: "I arrived at Dal Lake on a Tuesday evening in February when the temperature had dropped to minus seven and the water was half-frozen at the edges. The shikaraman who paddled me to my houseboat said nothing — just the rhythmic dip of wooden oars in black water, the distant wail of a Sufi singer carried on the mountain wind, and overhead, a sky so thick with stars it looked painted."
      },
      {
        type: 'section',
        heading: 'The Houseboat Experience',
        text: "My houseboat was called 'New Golden Heaven' — because everything in Kashmir is golden or heavenly or paradise-adjacent in name. It was run by a family who had lived on the lake for four generations. Three meals a day were included: noon chai with lavender honey at 7am, a breakfast of sheermal and eggs, and dinners of rogan josh and haak that restored something deep inside the soul that city life had quietly removed."
      },
      {
        type: 'section',
        heading: 'Gulmarg at Dawn',
        text: "The gondola to Gulmarg's second phase opens at 9am but arrives crowded by 10. Take the first gondola at 9am sharp, click into rented skis at the summit, and for one transcendent hour you can traverse slopes of untouched powder with views of Nanga Parbat filling the entire western horizon. Nothing else. No Instagram, no lift queues. Just snow, silence, and an absurd quantity of beauty."
      }
    ]
  },
  {
    id: '4',
    title: 'Dubai in 5 Days: The Perfect Luxury Itinerary',
    excerpt: 'From sunrise at Burj Khalifa to a private desert safari dinner — the definitive guide to experiencing Dubai at its most luxurious.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85',
    category: 'Guides',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    authorBio: 'Sarah is a luxury travel consultant and food writer based in Singapore. She covers high-end travel across Asia, the Middle East, and Europe, with a particular focus on fine dining experiences and architectural wonders.',
    authorRole: 'Luxury Travel Consultant',
    date: 'March 22, 2026',
    readTime: '10 min read',
    tags: ['Dubai', 'Luxury', 'UAE', 'Desert Safari', 'Fine Dining'],
    featured: false,
    content: [
      {
        type: 'intro',
        text: "Dubai doesn't do things by halves. The tallest building on Earth. The largest mall. The most expensive hotel. The artificially created palm-shaped island. If you're going to experience this city, you might as well lean into the maximalism. Five days, executed correctly, can feel like a complete luxury universe — if you know where to look."
      },
      {
        type: 'section',
        heading: 'Day 1: The Vertical City',
        text: "Book the At the Top, Burj Khalifa SKY at level 148 for sunrise — the 05:45am ticket is half-price and the light is extraordinary. Breakfast at Armani/Amal below, then wander the Dubai Mall (yes, it's a mall, but the Dubai Aquarium alone is worth the visit). Afternoon at the Dubai Frame for a clever meta-commentary on old vs. new Dubai."
      },
      {
        type: 'section',
        heading: 'Day 3: The Desert Safari',
        text: "A private desert safari beats the group version by enormous margin. Ask your hotel concierge for a 'private dune bashing and dinner' experience — expect to pay $300–500 for two but receive a personalized Bedouin camp setup, private camel trekking at sunset, and a dinner of mezze and grilled meats under the actual stars. The Hajar Mountains in the background glow pink and orange as the sun drops. It is genuinely spectacular."
      }
    ]
  },
  {
    id: '5',
    title: 'How Wellness Travel Changed My Life: A Bali Retreat Story',
    excerpt: 'Seven days of yoga, meditation, and Balinese healing ceremonies transformed not just my body but my entire relationship with travel.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1400&q=85',
    category: 'Wellness',
    author: 'Emma Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    authorBio: 'Emma is a wellness travel writer and certified yoga instructor based in London. She has attended over 30 wellness retreats across Asia, Europe, and Central America, and writes about the transformative power of slow, intentional travel.',
    authorRole: 'Wellness Travel Writer & Yoga Instructor',
    date: 'March 15, 2026',
    readTime: '9 min read',
    tags: ['Wellness', 'Bali', 'Yoga', 'Meditation', 'Retreat'],
    featured: false,
    content: [
      {
        type: 'intro',
        text: "I arrived at the Fivelements retreat in Ubud with a broken back — metaphorically. Six months of 60-hour work weeks, a relationship ending, an apartment that felt more like a storage unit than a home. I'd booked the seven-day 'Sakti Healing Journey' program on a Friday night impulse, clicked 'confirm' before I could talk myself out of it, and landed in Bali nine days later feeling like someone had wrung me out and forgotten to shake me dry."
      },
      {
        type: 'section',
        heading: 'The First Three Days: Resistance',
        text: "The program begins with a Melukat water purification ceremony in the river at 6am, which is exactly as cold and overwhelming as it sounds. Then two hours of Balinese yoga — different from the vinyasa I'd practiced in London gyms, slower and more ceremonial, each pose held until your body stops fighting it. I spent the first three days mentally composing emails I couldn't send, cataloguing the work I was missing, and eating nourishing food I barely tasted."
      },
      {
        type: 'section',
        heading: 'Day 4: The Shift',
        text: "The traditional Balinese healer — called a Balian — pressed his thumbs into the points below my shoulder blades and asked, through an interpreter, what I was carrying that wasn't mine. I genuinely don't know what happened next. What I know is that I sat under a frangipanis tree for two hours afterward feeling completely hollowed out and extraordinarily light at the same time. Several people at dinner that night said they experienced similar 'Day 4 moments.' The retreat staff simply call it 'the arrival.'"
      }
    ]
  }
];

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Article Not Found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl">
            Back to Journal
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Article link copied!');
    setTimeout(() => setCopied(false), 2500);
  };
  const handleWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} — Read on FingerTrip Journal: ${window.location.href}`)}`, '_blank');
  const handleTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}&hashtags=FingerTrip,Travel`, '_blank');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-20 relative">
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-6 left-6">
            <Link to="/blogs" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> FingerTrip Journal
            </Link>
          </div>

          {/* Action buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-xl backdrop-blur-sm flex items-center justify-center transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-8 max-w-4xl mx-auto">
            <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">{post.category}</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white font-display leading-tight mb-4 max-w-3xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover border border-white/30" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content + Sidebar ─── */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* ── Article Body ── */}
          <article className="flex-1 max-w-2xl">
            {/* Excerpt */}
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-orange-400 pl-5 mb-8 font-medium italic">
              {post.excerpt}
            </p>

            {/* Content blocks */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              {post.content.map((block, i) => {
                if (block.type === 'intro') return (
                  <motion.p key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-base leading-[1.9]">{block.text}</motion.p>
                );
                if (block.type === 'section') return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-xl font-bold text-gray-900 font-display mb-3">{block.heading}</h2>
                    {block.text?.split('\n\n').map((para, j) => (
                      <p key={j} className="text-base leading-[1.9] mb-3 last:mb-0">{para}</p>
                    ))}
                  </motion.div>
                );
                if (block.type === 'tip') return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
                    <span className="text-2xl shrink-0">💡</span>
                    <div>
                      <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Pro Tip</div>
                      <p className="text-sm text-amber-900 leading-relaxed">{block.text}</p>
                    </div>
                  </motion.div>
                );
                if (block.type === 'image') return (
                  <motion.figure key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="my-8">
                    <img src={block.url} alt={block.caption} className="w-full h-64 object-cover rounded-2xl" />
                    {block.caption && <figcaption className="text-center text-sm text-gray-400 mt-3 italic">{block.caption}</figcaption>}
                  </motion.figure>
                );
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-full font-medium hover:bg-orange-100 cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Social share */}
            <div className="mt-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              <p className="text-sm font-bold text-gray-800 mb-3">Share this article</p>
              <div className="flex gap-3">
                <button onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-orange-200 text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 transition-colors shadow-sm">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button onClick={handleWhatsApp}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#20b858] transition-colors shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button onClick={handleTwitter}
                  className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.844L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter/X
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-6 bg-white rounded-3xl border border-orange-100 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <img src={post.authorAvatar} alt={post.author} className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-100 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-0.5">Written by</div>
                  <h3 className="text-xl font-bold text-gray-900 font-display">{post.author}</h3>
                  <p className="text-sm text-gray-500 font-medium mb-3">{post.authorRole}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{post.authorBio}</p>
                </div>
              </div>
            </motion.div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Article info card */}
              <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                <h4 className="font-bold text-gray-900 font-display text-sm mb-4">Article Info</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Author', value: post.author, icon: <User className="w-4 h-4 text-orange-400" /> },
                    { label: 'Published', value: post.date, icon: <Calendar className="w-4 h-4 text-orange-400" /> },
                    { label: 'Read Time', value: post.readTime, icon: <Clock className="w-4 h-4 text-orange-400" /> },
                    { label: 'Category', value: post.category, icon: <Tag className="w-4 h-4 text-orange-400" /> },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-2.5 bg-orange-50 rounded-xl">
                      {item.icon}
                      <div>
                        <div className="text-[10px] text-gray-400 font-semibold uppercase">{item.label}</div>
                        <div className="text-sm font-medium text-gray-800">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags cloud */}
              <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                <h4 className="font-bold text-gray-900 font-display text-sm mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-full font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share sidebar */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white">
                <Share2 className="w-6 h-6 mb-2 opacity-80" />
                <h4 className="font-bold font-display mb-1">Enjoyed this?</h4>
                <p className="text-white/80 text-sm mb-4">Share with fellow travel lovers</p>
                <button onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-orange-600 text-sm font-bold rounded-xl hover:bg-orange-50 transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── More Articles ─── */}
      <section className="py-12 px-4 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-display">More Articles</h2>
            <Link to="/blogs" className="flex items-center gap-1 text-orange-500 font-semibold text-sm hover:text-orange-700 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rp, i) => (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              >
                <Link to={`/blogs/${rp.id}`}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={rp.image} alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 text-[10px] bg-white/90 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                      {rp.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 font-display group-hover:text-orange-600 transition-colors">{rp.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rp.readTime}</span>
                      <span className="flex items-center gap-1 text-orange-500 font-semibold">Read More <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
