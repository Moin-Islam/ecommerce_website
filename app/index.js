const url = "http://localhost/api/product/getProductByTag.php";

let featuredProduct = document.querySelector('#featuredProduct');
let newProduct = document.querySelector("#newProduct");

let outputFeaturedProducts = "";
let outputNewProducts = "";
let productId;

function renderProducts(products) {
    products.forEach((product)=> {
        outputFeaturedProducts += `
        <div class="pro">
                <img src=${product.image} alt="">
                <div class="des" data-id = ${product.id}>
                    <span>${product.name}</span>
                    <h5>${product.description}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>$${product.price}</h4>
                </div>
                <a href="#"><i class="fa-solid fa-bag-shopping cart"></i></a>
        </div>
        `;
    });
    featuredProduct.innerHTML = outputFeaturedProducts;
}

function renderNewProducts(products) {
    products.forEach((product)=>{
        outputNewProducts += `
        <div class="pro">
                <img src=${product.image} alt="">
                <div class="des" data-id = ${product.id}>
                    <span>${product.name}</span>
                    <h5>${product.description}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>$${product.price}</h4>
                </div>
                <a href="#"><i class="fa-solid fa-bag-shopping cart"></i></a>
        </div>
        `;
    });

    newProduct.innerHTML = outputNewProducts;
}

$.ajax({
    type: "POST",
    url: url,
    processData: false,
    contentType: false,
    data: JSON.stringify({
        "tag" : "featured"
    }),
    success: function (response) {
        renderProducts(response.records);
    }
});

$.ajax({
    type: "POST",
    url: url,
    processData: false,
    contentType: false,
    data: JSON.stringify({
        "tag" : "new arrival"
    }),
    success: function (response) {
        renderNewProducts(response.records);
    }
});


function passId(id) {
    var url = new URL("http://127.0.0.1:5500/sproduct.html");
    url.searchParams.append("productId", id);
    window.location.href = url;
}

featuredProduct.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = e.target.parentElement.dataset.id;
    console.log(productId);
    passId(productId);
});

newProduct.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = e.target.parentElement.dataset.id;
    console.log(productId);
    passId(productId);
});

