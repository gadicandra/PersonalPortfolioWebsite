/** Runs pre-paint in <head>: stored choice wins, else follow the OS. No flash. */
export const THEME_GATE = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
  return dark;
}

/** External-store adapter for the <html>.dark class (for useSyncExternalStore). */
export function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
export const isDark = () => document.documentElement.classList.contains("dark");
