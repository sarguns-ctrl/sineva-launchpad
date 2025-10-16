import { en } from './en';
import { es } from './es';

export const translations = {
  en,
  es
};

export type TranslationKeys = typeof en;
export type Language = keyof typeof translations;
