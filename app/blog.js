const url ="http://localhost/api/blog/getBlog.php";

let blog = document.querySelector("#blog");

let output = "";

function renderBlog(blogs) {
    blogs.forEach((blog)=>{
        var dateParts = blog.created_at.split(" ");
        var dateFirstParts = dateParts[0].split("-");
        const month =dateFirstParts[1];
        const day = dateFirstParts[2];
        const monthanddate = `${month}-${day}`;
        console.log(monthanddate);

        output += `
        <div class="blog-box">
            <div class="blog-img">
                <img src=${blog.image} alt="">
            </div>
            <div class="blog-details">
                <h4>${blog.title}</h4>
                <p>${blog.content}</p>
                <a href="#">Continue Reading</a>
            </div>
            <h1>${monthanddate}</h1>
        </div>
        `;
    });
    blog.innerHTML = output;
}

$.ajax({
    type: "GET",
    url: url,
    success: function (response) {
        const records = response.records;
        const fixedRecords = fixImageUrls(records);
        renderBlog(fixedRecords);
        console.log(response.records);
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