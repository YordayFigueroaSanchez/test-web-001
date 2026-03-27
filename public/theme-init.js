// Apply saved theme before first paint to reduce visible theme flicker.
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (error) {
    // Intentionally ignore storage/matchMedia errors in early bootstrap.
  }
})();
