document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      let clothingList = document.getElementById("clothing-list");
      let electronicsList = document.getElementById("electronics-list");
      let productFilter = document.getElementById("productFilter");
      let productSearch = document.getElementById("productSearch");

      function renderProducts(filter, search) {
        clothingList.innerHTML = "";
        electronicsList.innerHTML = "";

        products.forEach((product) => {
          if (
            (filter === "all" || product.category === filter) &&
            product.title.toLowerCase().includes(search.toLowerCase())
          ) {
            let productCard = `
                    <div class="col-md-4 card-container">
                      <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                          <h5 class="card-title">${product.title}</h5>
                          <p class="card-text">${product.description}</p>
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#purchaseModal">
                            Mua Ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  `;

            if (
              product.category === "men's clothing" ||
              product.category === "women's clothing"
            ) {
              clothingList.innerHTML += productCard;
            } else if (product.category === "electronics") {
              electronicsList.innerHTML += productCard;
            }
          }
        });
      }

      productFilter.addEventListener("change", function () {
        renderProducts(productFilter.value, productSearch.value);
      });

      productSearch.addEventListener("input", function () {
        renderProducts(productFilter.value, productSearch.value);
      });

      renderProducts("all", "");
    });
});
