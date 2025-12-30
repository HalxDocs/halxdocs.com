export function initTheme() {
  // Always start with dark mode
  // (No localStorage check since it's not reliable in all environments)
  document.documentElement.classList.add("dark");
}