document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (selector, file) => {
    const container = document.querySelector(selector);
    if (container) {
      fetch(file)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          container.innerHTML = data;
        })
        .catch((error) => {
          console.error(`Error loading ${file}:`, error);
        });
    }
  };

  // Load reusable components
  loadComponent("#navbar", "navbar.html");
  loadComponent("#footer", "footer.html");

  // ====== BLOG PAGE FUNCTIONALITY ======
  if (document.getElementById("blog-container")) {
    const blogData = [
      { img: "./img/blog-post-1.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-2.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-3.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-4.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-5.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-6.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-1.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-2.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-3.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-4.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-5.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-6.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-6.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-5.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-4.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-3.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-2.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-1.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-6.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-5.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-4.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-3.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-2.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-1.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-1.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-2.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-3.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-4.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-5.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-6.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-1.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-2.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-3.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-4.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-5.png", title: "Title", date: "2024.00.00" },
      { img: "./img/blog-post-6.png", title: "Title", date: "2024.00.00" },
    ];

    const itemsPerPage = 12;
    let currentPage = 1;

    const blogContainer = document.getElementById("blog-container");
    const pagination = document.getElementById("pagination");

    function displayBlogs() {
      blogContainer.innerHTML = "";

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = blogData.slice(start, end);

      paginatedItems.forEach((item, index) => {
        const globalIndex = start + index;
        const blogCard = `
          <li class="blog-card" onclick="openBlogDetail(${globalIndex})">
            <img src="${item.img}" alt="ブログ画像">
            <div class="blog-card-content">
              <h3>${item.title}</h3>
              <p>${item.date}</p>
            </div>
          </li>
        `;
        blogContainer.insertAdjacentHTML("beforeend", blogCard);
      });
    }

    function setupPagination() {
      pagination.innerHTML = "";

      const pageCount = Math.ceil(blogData.length / itemsPerPage);

      // Previous Button
      const prevBtn = document.createElement("button");
      prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
          currentPage--;
          displayBlogs();
          setupPagination();
        }
      });
      pagination.appendChild(prevBtn);

      // Numbered Buttons
      for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", function () {
          currentPage = i;
          displayBlogs();
          setupPagination();
        });
        pagination.appendChild(btn);
      }

      // Next Button
      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
      nextBtn.disabled = currentPage === pageCount;
      nextBtn.addEventListener("click", function () {
        if (currentPage < pageCount) {
          currentPage++;
          displayBlogs();
          setupPagination();
        }
      });
      pagination.appendChild(nextBtn);
    }

    // Initialize on blog page
    displayBlogs();
    setupPagination();

    // Make openBlogDetail globally available
    window.openBlogDetail = function (index) {
      localStorage.setItem("blog-detail", JSON.stringify(blogData[index]));
      window.location.href = "blog-details.html";
    };
  }

  // ====== BLOG DETAILS PAGE FUNCTIONALITY ======
  if (document.querySelector(".blog-detail-container")) {
    const blogDetail = JSON.parse(localStorage.getItem("blog-detail"));

    const imgElement = document.getElementById("blog-detail-img");
    const dateElement = document.getElementById("blog-detail-date");

    if (blogDetail && imgElement && dateElement) {
      imgElement.src = blogDetail.img;
      dateElement.textContent = blogDetail.date;
    } else {
      document.querySelector(".blog-detail-container").innerHTML = `
        <p style="text-align:center; margin-top:2rem;">データがありません。</p>
        <div class="blog-detail-btn-wrapper">
          <button class="blog-detail-btn" onclick="window.location.href='blog.html'">一覧に戻る</button>
        </div>
      `;
    }
  }
});
