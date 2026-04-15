import { useState, useEffect } from 'react';
import type { Package } from '@/types';

type Listener = (packages: Package[]) => void;
const listeners = new Set<Listener>();
let globalCompare: Package[] = [];

function notify(packages: Package[]) {
  globalCompare = packages;
  listeners.forEach(l => l(packages));
}

export function useCompare() {
  const [compareList, setCompareList] = useState<Package[]>(globalCompare);

  useEffect(() => {
    const listener: Listener = (pkgs) => setCompareList([...pkgs]);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const addToCompare = (pkg: Package) => {
    if (globalCompare.length >= 3) return false;
    if (!globalCompare.find(p => p.id === pkg.id)) {
      notify([...globalCompare, pkg]);
    }
    return true;
  };

  const removeFromCompare = (id: string) => {
    notify(globalCompare.filter(p => p.id !== id));
  };

  const toggleCompare = (pkg: Package): boolean => {
    if (globalCompare.find(p => p.id === pkg.id)) {
      removeFromCompare(pkg.id);
      return false;
    }
    if (globalCompare.length >= 3) return false;
    notify([...globalCompare, pkg]);
    return true;
  };

  const isInCompare = (id: string) => !!globalCompare.find(p => p.id === id);
  const clearCompare = () => notify([]);

  return { compareList, addToCompare, removeFromCompare, toggleCompare, isInCompare, clearCompare };
}
