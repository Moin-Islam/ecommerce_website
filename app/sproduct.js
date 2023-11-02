/*const productId = new URLSearchParams(window.location.href);
console.log(productId);*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("productId");

const url = "http://localhost/api/product/readone.php";
const featuredUrl = "http://localhost/api/product/getProductByTag.php";

const productDetails = document.querySelector("#prodetails");
let featuredProduct = document.querySelector("#featuredProduct");

let productId;
let outputFeaturedProducts = "";
let output = "";
let size = "";
let quantity = 1;


function renderProductDetails(product) {
  output = `
    <div class="single-pro-image">
        <img src=${product.image} width="100%" id="MainImg" alt="">
    </div>
    <div class="single-pro-details">
        <div>
            <h6>${product.tag}</h6>
            <h4>${product.name}</h4>
            <h2>$${product.price}</h2>
            <select id="size">
                <option>Select Size</option>
                <option>XL</option>
                <option>XXL</option>
                <option>Small</option>
                <option>Large</option>
            </select>
            <input type="number" value=1 id="quantityAmount">
            <button class="normal" onclick="cartButton()">Add to Cart</button>
            <h4>Product Details</h4>
            <span>${product.description}</span>
        </div>
    </div>
    <input type="hidden" id="product-id" value="${product.id}">
    <input type="hidden" id="product-name" value="${product.name}">
    <input type="hidden" id="product-price" value="${product.price}">
    <input type="hidden" id="product-size" value="">
    <input type="hidden" id="product-quantity" value="">

    `;
  productDetails.innerHTML = output;
}

$.ajax({
  type: "POST",
  url: url,
  processData: false,
  contentType: false,
  data: JSON.stringify({
    id: id,
  }),
  success: function (response) {
    const fixedRecords = fixSingleImageUrl(response);
    console.log(fixedRecords);
    renderProductDetails(fixedRecords);
  },
});

function fixSingleImageUrl(record) {
  record.image = constructImageUrl(record.image);
  return record
}

function constructImageUrl(imageUrl) {

  const segments = imageUrl.split('/');
  const imageIdSegment = segments[5];
  //imageId = imageIdSegment.substring(2);
  console.log(imageIdSegment);
  const constructedImageUrl = `https://drive.google.com/uc?id=${imageIdSegment}`;
  console.log(constructedImageUrl);
  return constructedImageUrl;
}

function renderProducts(products) {
  products.forEach((product) => {
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

$.ajax({
  type: "POST",
  url: featuredUrl,
  processData: false,
  contentType: false,
  data: JSON.stringify({
    tag: "featured",
  }),
  success: function (response) {
    const records = response.records;
    const fixedRecords = fixImageUrls(records);
    renderProducts(fixedRecords);
  },
});

function fixImageUrls(records) {
  records.forEach((record)=> {
      record.image = constructImageUrl(record.image);
  });
  return records
}

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

productDetails.addEventListener("change", (e) => {
  e.preventDefault();
  if(e.target.tagName == "SELECT"){
    size = document.getElementById("size").value;
  }
})

productDetails.addEventListener("change", (e) => {
  if(e.target.tagName == "INPUT" && e.target.type ==="number") {
    quantity = Number(document.getElementById("quantityAmount").value);
  }
});

function cartButton() {
  const productId = document.getElementById("product-id").value;
  const productName = document.getElementById("product-name").value;
  const productPrice = Number(document.getElementById("product-price").value);

  let cartItems = JSON.parse(localStorage.getItem('cartItems'));

  const expense = productPrice* quantity;

  if(cartItems == null){
    cartItems = [];
  }

  cartItems.push({
    id : productId,
    name: productName,
    price : productPrice,
    size : size,
    quantity : quantity,
    expense : expense
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  console.log(cartItems);

  alert("Product added in the cart");
}
