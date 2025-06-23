// /init/loadConfig.js

export async function loadConfig() {
  const path = document.body.dataset.config || 'config.json';

  try {
    const response = await fetch(path);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(`[Config Load Error] Failed to load ${path}:`, err);
    return {};
  }
}
