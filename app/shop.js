const url = "http://localhost/api/product/read.php";

let allProducts = document.querySelector("#products");

let output = "";



function renderProducts(products) {
    products.forEach((product)=>{
        output += `
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

    allProducts.innerHTML = output;
}



/*productClicked.addEventListener("click", (e)=> {
    e.preventDefault();
    const parent = e.target.parentElement;
    console.log(parent);

})*/

function passId(id) {
    /*const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('product_id',id);
    const newUrl = "sproduct.html&${urlSearchParams}";
    window.location.href = newUrl;*/
    var url = new URL("http://127.0.0.1:5500/sproduct.html");
    url.searchParams.append("productId", id);
    window.location.href = url;
}

$.ajax({
    type: "GET",
    url: url,
    success: function (response) {
        renderProducts(response.records);
    }
});

allProducts.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = e.target.parentElement.dataset.id;
    console.log(productId);
    passId(productId);
});