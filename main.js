document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (selector, file) => {
    const container = document.querySelector(selector);
    if (container) {
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          container.innerHTML = data;
        })
        .catch(error => {
          console.error(`Error loading ${file}:`, error);
        });
    }
  };

  // Load reusable components
  loadComponent("#navbar", "navbar.html");
  loadComponent("#footer", "footer.html");
});
