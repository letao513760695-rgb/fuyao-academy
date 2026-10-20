import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { localRepository } from './services';
import type { AcademyData } from './services';

type Store = AcademyData & {
  update: (recipe: (data: AcademyData) => AcademyData) => boolean;
  toast: (message: string) => void;
  unlocked: string[];
  unlock: (id: string) => void;
};
const Context = createContext<Store | null>(null);
export function AcademyProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AcademyData>(localRepository.load);
  const [notice, setNotice] = useState({ message: '', id: 0 });
  const [unlocked, setUnlocked] = useState<string[]>(() => {
    try {
      const value = JSON.parse(sessionStorage.getItem('fuyao-unlocked') || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  });
  const toast = useCallback((message: string) => {
    const id = Date.now();
    setNotice({ message, id });
    window.setTimeout(() => setNotice((n) => (n.id === id ? { message: '', id } : n)), 4000);
  }, []);
  const update = (recipe: (data: AcademyData) => AcademyData) => {
    const next = recipe(data);
    try {
      localRepository.save(next);
      setData(next);
      return true;
    } catch {
      toast('无法保存：浏览器存储不可用或空间不足，请检查浏览器设置。');
      return false;
    }
  };
  const unlock = (id: string) => {
    const next = [...new Set([...unlocked, id])];
    setUnlocked(next);
    try {
      sessionStorage.setItem('fuyao-unlocked', JSON.stringify(next));
    } catch {
      /* Memory session remains usable. */
    }
  };
  return (
    <Context.Provider value={{ ...data, update, toast, unlocked, unlock }}>
      {children}
      <div className={`toast ${notice.message ? 'show' : ''}`} role="status">
        {notice.message}
      </div>
    </Context.Provider>
  );
}
export function useAcademy() {
  const store = useContext(Context);
  if (!store) throw new Error('AcademyProvider required');
  return store;
}
