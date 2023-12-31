const express = require('express')
const path = require('path')
const app = express()
const port = 5000

// app.set = buat setting varible global, configuratoin, dll
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) // body parser, extended : false -> querystring, extended : true -> menggunakan querystring third party -> qs

app.get('/', home)
app.get('/contact', contact)
app.get('/My-Project', blog)
app.get('/add-My-Project', addBlogView)
app.post('/add-My-Project', addBlog)

app.get('/My-Project-detail/:id', blogDetail)
app.get('/testimonial', testimonial)

function home(req, res) {
    res.render('index')
}

function contact(req, res) {
    res.render('contact')
}

function blog(req, res) {
    const data = [
        {
            title: "Title 1",
            content: "Content 1"
        },
        {
            title: "Title 2",
            content: "Content 2"
        },
        {
            title: "Title 3",
            content: "Content 3"
        }
    ]

    res.render('My-Project', { data })
}

function addBlogView(req, res) {
    res.render('add-My-Project')
}

function addBlog(req, res) {
    const { title, content } = req.body

    alert("Title :", title)
    alert("Content :", content)
    res.redirect('My-Project')
}

function blogDetail(req, res) {
    const { id } = req.params // destructuring

    const title = "Title 1"
    const content = "Content 1"

    const data = {
        id,
        title,
        content
    }

    res.render('My-Project-detail', { data })
}

function testimonial(req, res) {
    res.render('testimonial')
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})