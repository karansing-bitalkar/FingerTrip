import { useState, useEffect } from 'react';
import type { Package } from '@/types';

const STORAGE_KEY = 'fingertrip_wishlist';

function getStored(): Package[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStored(packages: Package[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}

// Module-level listeners for cross-component sync
type Listener = (packages: Package[]) => void;
const listeners = new Set<Listener>();
let globalWishlist: Package[] = getStored();

function notify(packages: Package[]) {
  globalWishlist = packages;
  saveStored(packages);
  listeners.forEach((l) => l(packages));
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Package[]>(globalWishlist);

  useEffect(() => {
    const listener: Listener = (pkgs) => setWishlist([...pkgs]);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const addToWishlist = (pkg: Package) => {
    if (!globalWishlist.find((p) => p.id === pkg.id)) {
      notify([...globalWishlist, pkg]);
    }
  };

  const removeFromWishlist = (id: string) => {
    notify(globalWishlist.filter((p) => p.id !== id));
  };

  const toggleWishlist = (pkg: Package) => {
    if (globalWishlist.find((p) => p.id === pkg.id)) {
      removeFromWishlist(pkg.id);
    } else {
      addToWishlist(pkg);
    }
  };

  const isWishlisted = (id: string) => !!globalWishlist.find((p) => p.id === id);

  return { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted };
}
