import createCache from '@emotion/cache';

export const defaultCache = createCache({ key: 'cha' });

export default function createEmotionCache() {
  return createCache({ key: 'cha' });
}
