import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Press & Media', path: '/about' },
    { label: 'Partner With Us', path: '/vendors' },
  ],
  destinations: [
    { label: 'Maldives', path: '/destinations' },
    { label: 'Switzerland', path: '/destinations' },
    { label: 'Bali', path: '/destinations' },
    { label: 'Dubai', path: '/destinations' },
    { label: 'Kashmir', path: '/destinations' },
    { label: 'Thailand', path: '/destinations' },
  ],
  support: [
    { label: 'Help Center', path: '/help-center' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Support', path: '/contact-support' },
    { label: 'Track My Booking', path: '/traveler-dashboard' },
    { label: 'Cancellation Policy', path: '/help-center' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/privacy-policy' },
    { label: 'Refund Policy', path: '/terms' },
  ],
  portals: [
    { label: 'Traveler Login', path: '/login' },
    { label: 'Vendor Login', path: '/vendor-login' },
    { label: 'Admin Login', path: '/admin-login' },
    { label: 'Register', path: '/register' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#002528] text-gray-300">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#964734] to-[#0FA4AF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white font-display">Get Exclusive Travel Deals</h3>
              <p className="text-white/80 mt-1">Subscribe and save up to 40% on your next adventure</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-colors"
              />
              <button className="px-6 py-3 bg-white text-[#003135] font-semibold rounded-xl hover:bg-[#AFDDE5] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center border border-[#AFDDE5]/30">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                Finger<span className="text-[#0FA4AF]">Trip</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your premium travel companion — crafting unforgettable journeys to the world's most extraordinary destinations since 2019.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#0FA4AF] shrink-0" />
                <span>hello@fingertrip.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#0FA4AF] shrink-0" />
                <span>+1 (800) FINGER-TRIP</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#0FA4AF] shrink-0" />
                <span>350 5th Ave, New York, NY 10118</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Youtube, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-[#003135] rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#0FA4AF] hover:text-white transition-all duration-200 border border-[#024950]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#0FA4AF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-5">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#0FA4AF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#0FA4AF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-[#0FA4AF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#024950] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 FingerTrip. All rights reserved. Built with ❤️ for travelers worldwide.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 bg-[#003135] border border-[#024950] px-3 py-1 rounded-full">🔒 SSL Secured</span>
            <span className="text-xs text-gray-600 bg-[#003135] border border-[#024950] px-3 py-1 rounded-full">✅ IATA Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
