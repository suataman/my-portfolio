/** Runs before paint (inlined in <head>) so the saved theme never flashes. Dark is the default. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){document.documentElement.classList.add('dark');}})();`;

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

/** Re-apply the saved choice after a root-layout re-render (e.g. language switch). */
export function applyStoredTheme() {
  try {
    document.documentElement.classList.toggle("dark", localStorage.getItem("theme") !== "light");
  } catch {}
}
