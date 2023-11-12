let angka = 5;
for (let i = 1; i <= angka; i++) {
    console.log(i);
}

let condition = true;
let counter = 1;
while (condition) {
    console.log(counter);
    if (counter === 5) {
        condition = false;
    }
    counter++;
}

let number = 1;
do {
    console.log(number);
    number++;
} while (number <= 5);

let dataBlog = [];

function submitBlog(event) {
    event.preventDefault();

    let inputTitle = document.getElementById("inputTitle").value;
    let inputContent = document.getElementById("inputContent").value;
    let inputImage = document.getElementById("inputImage").files;

    console.log("title", inputTitle);
    console.log("content", inputContent);

    inputImage = URL.createObjectURL(inputImage[0]);
    console.log("image", inputImage);

    const Blog = {
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        postAt: "09 November 2023",
        author: "Ravano Akbar Widodo",
    };

    dataBlog.push(Blog);
    console.log("dataBlog", dataBlog);
    renderBlog();
}

function renderBlog() {
    const container = document.getElementById("contents");
    container.innerHTML = ""; 

    for (const blog of dataBlog) {
        container.innerHTML += `
        <div class="Blog-list-item">
            <div class="Blog-image">
                <img src="${blog.image}" alt="" />
            </div>
            <div class="Blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="My-Project-Detail.html" target="_blank">${blog.title}</a>
                </h1>
                <div class="detail-Blog-content">
                    ${blog.postAt} | ${blog.author}
                </div>
                <p>
                    ${blog.content}
                </p>
            </div>
        </div>`;
    }
}
