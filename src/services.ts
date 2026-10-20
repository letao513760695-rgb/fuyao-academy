import { initialCategories, initialCourses } from './data';
import type { Course, Category } from './data';

export type AcademyData = {
  courses: Course[];
  categories: Category[];
  favorites: string[];
  progress: Record<string, number>;
};
const STORAGE_KEY = 'fuyao-academy-v1';
export interface AcademyRepository {
  load(): AcademyData;
  save(data: AcademyData): void;
}

// Replace this adapter with an API implementation when storage and authentication are available.
export const localRepository: AcademyRepository = {
  load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (
        data &&
        Array.isArray(data.courses) &&
        Array.isArray(data.categories) &&
        Array.isArray(data.favorites) &&
        data.progress &&
        typeof data.progress === 'object'
      )
        return data;
    } catch {
      /* Use demo data if local storage is unavailable or invalid. */
    }
    return { courses: initialCourses, categories: initialCategories, favorites: [], progress: {} };
  },
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};

async function database() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('fuyao-files', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('浏览器文件存储不可用，请检查隐私设置。'));
  });
}
export async function saveFile(file: File): Promise<string> {
  const db = await database();
  const id = crypto.randomUUID();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite');
    tx.objectStore('files').put(file, id);
    tx.oncomplete = () => {
      db.close();
      resolve(id);
    };
    tx.onerror = () => {
      db.close();
      reject(new Error('资料保存失败，浏览器存储空间可能不足。'));
    };
  });
}
export async function getFile(id: string): Promise<File | undefined> {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readonly');
    const request = tx.objectStore('files').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('无法读取本地资料，请重新上传。'));
    tx.oncomplete = () => db.close();
  });
}
