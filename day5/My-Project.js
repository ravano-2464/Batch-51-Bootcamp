function getFullTime(tanggal) {
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const date = tanggal.getDate()
    const month = tanggal.getMonth()
    const year = tanggal.getFullYear()
    let hours = tanggal.getHours()
    let minutes = tanggal.getMinutes()

    if (hours <= 9) {
        hours = "0" + hours
    }

    if (minutes <= 9) {
        minutes = "0" + minutes
    }

    return `${date} ${monthList[month]} ${year} ${hours}:${minutes}`
}

function getDistanceTime(time) {
    const timeNow = new Date().getTime() 
    const timePosted = time 

    const distance = timeNow - timePosted 
    const distanceSeconds = Math.floor(distance / 1000)
    const distanceMinutes = Math.floor(distance / 1000 / 60)
    const distanceHours = Math.floor(distance / 1000 / 60 / 60)
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24)

    console.log("distanceSeconds", distanceSeconds)
    console.log("distanceMinutes", distanceMinutes)
    console.log("distanceHours", distanceHours)
    console.log("distanceDay", distanceDay)

    if (distanceDay > 0) {
        return `${distanceDay} day ago`
    } else if (distanceHours > 0) {
        return `${distanceHours} hours ago`
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} minutes ago`
    } else {
        return `${distanceSeconds} seconds ago `
    }
}

const dataBlog = []

function submitBlog(event) {
    event.preventDefault()

    let inputTitle = document.getElementById("inputTitle").value
    let inputContent = document.getElementById("inputContent").value
    let inputImage = document.getElementById("inputImage").files

    console.log("title", inputTitle)
    console.log("content", inputContent)

    inputImage = URL.createObjectURL(inputImage[0])
    console.log("image", inputImage)

    const Blog = {
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        postAt: new Date(),
        author: "Ravano Akbar Widodo",
        nodeJs: true,
        reactJs: true,
        nextJs: false,
        typescript: false,
    }

    dataBlog.push(Blog)
    console.log("dataBlog", dataBlog)
    renderBlog()
}

function renderBlog() {
    document.getElementById("contents").innerHTML = ''
    for (let index = 0; index < dataBlog.length; index++) {
        document.getElementById("contents").innerHTML += `
        <div class="Blog-list-item">
            <div class="Blog-image">
                <img src="${dataBlog[index].image}" alt="" />
            </div>
            <div class="Blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="Blog-detail.html" target="_blank">${dataBlog[index].title}</a>
                </h1>
                <div class="detail-Blog-content">
                    ${getFullTime(dataBlog[index].postAt)} | ${dataBlog[index].author}
                </div>
                ${dataBlog[index].nodeJs ? "nodeJs" : ""}
                ${dataBlog[index].reactJs ? "reactJs" : ""}
                ${dataBlog[index].nextJs ? "nextJs" : ""}
                ${dataBlog[index].typescript ? "typescript" : ""}            
                <p>
                   ${dataBlog[index].content}
                </p>
                <p>
                    ${getDistanceTime(dataBlog[index].postAt)}
                </p>
            </div>
        </div>`
    }
}

setInterval(function() {
    renderBlog()
}, 1000)