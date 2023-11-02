const url = "http://localhost/api/product/getProductByTag.php";

let featuredProduct = document.querySelector('#featuredProduct');
let newProduct = document.querySelector("#newProduct");

let outputFeaturedProducts = "";
let outputNewProducts = "";
let productId;
let imageId;

function renderProducts(products) {
    products.forEach((product)=> {
        outputFeaturedProducts += `
        <div class="pro">
                <img src="${product.image}" alt="">
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
                <img src= "${product.image}" alt="">
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

/*function renderImage(imageBig) {

    var image = new Image();
    image.src = 'data:image/jpg;base64,'+ imageBig;
    return image
}*/


$.ajax({
    type: "POST",
    url: url,
    processData: false,
    contentType: false,
    data: JSON.stringify({
        "tag" : "featured"
    }),
    success: function (response) {
        const records = response.records;
        const fixedRecords = fixImageUrls(records);
        console.log(fixedRecords);
        renderProducts(fixedRecords);
    }
});

function fixImageUrls(records) {
    records.forEach((record)=> {
        record.image = constructImageUrl(record.image);
    });
    return records
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

$.ajax({
    type: "POST",
    url: url,
    processData: false,
    contentType: false,
    data: JSON.stringify({
        "tag" : "new arrival"
    }),
    success: function (response) {
        const records = response.records;
        const fixedRecords = fixImageUrls(records);
        renderNewProducts(fixedRecords);
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

