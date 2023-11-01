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
        renderBlog(response.records);
        console.log(response.records);
    }
});