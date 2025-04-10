// components/ThemeRegistry.tsx
"use client";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/app/emotion-cache";
const emotionCache = createEmotionCache();

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
