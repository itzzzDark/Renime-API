/**
 * Supported scrape providers (same WordPress / Torofilm theme UI)
 * Copyright (c) 2025 Dark & Pyro Team
 * ⚠️ Educational use only. Respect copyright laws.
 */

const PROVIDERS = {
  animesalt: {
    id: 'animesalt',
    name: 'AnimeSalt',
    baseUrl: 'https://animesalt.cx',
    aliases: ['animesalt', 'salt', 'as'],
  },
  watchanimeworld: {
    id: 'watchanimeworld',
    name: 'WatchAnimeWorld',
    baseUrl: 'https://watchanimeworld.one',
    aliases: ['watchanimeworld', 'waw', 'animeworld', 'awi'],
  },
};

const DEFAULT_PROVIDER = 'animesalt';

/**
 * Resolve a provider key (or alias) to the full provider config.
 * @param {string} [key]
 * @returns {{ id: string, name: string, baseUrl: string, aliases: string[] }}
 */
function resolveProvider(key) {
  if (!key || typeof key !== 'string') {
    return PROVIDERS[DEFAULT_PROVIDER];
  }

  const normalized = key.trim().toLowerCase();

  // Direct id match
  if (PROVIDERS[normalized]) {
    return PROVIDERS[normalized];
  }

  // Alias match
  for (const provider of Object.values(PROVIDERS)) {
    if (provider.aliases.includes(normalized)) {
      return provider;
    }
  }

  // Unknown → default (callers can still validate if they want strict mode)
  return PROVIDERS[DEFAULT_PROVIDER];
}

/**
 * List of available providers for API consumers.
 */
function listProviders() {
  return Object.values(PROVIDERS).map(({ id, name, baseUrl }) => ({
    id,
    name,
    baseUrl,
  }));
}

module.exports = {
  PROVIDERS,
  DEFAULT_PROVIDER,
  resolveProvider,
  listProviders,
};
