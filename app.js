const express = require('express')
const bodyParser = require('body-parser')
const books = [{
        bookName: "Rich Dad Poor Dad",
        bookAuthor: "Robert Minowski",
        bookPages: 200,
        bookPrice: 399,
        bookState: "Available"
    },
    {
        bookName: "Power",
        bookAuthor: "Robert Greene",
        bookPages: 450,
        bookPrice: 699,
        bookState: "Available"
    },
    {
        bookName: "Who Will Cry When You Die",
        bookAuthor: "Robin Sharma",
        bookPages: 300,
        bookPrice: 599,
        bookState: "Available"
    }
]

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.render("home", {
        data: books
    })
})

app.post("/", (req, res) => {
    const inputBookName = req.body.bookName
    const inputBookAuthor = req.body.bookAuthor
    const inputBookPages = req.body.bookPages
    const inputBookPrice = req.body.bookPrice

    books.push({
        bookName: inputBookName,
        bookAuthor: inputBookAuthor,
        bookPages: inputBookPages,
        bookPrice: inputBookPrice,
        bookState: "Available"
    })

    res.render("home", {
        data: books
    })
})

app.post('/issue', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Issued";
        }
    })
    res.render("home", {
        data: books
    })
})

app.post('/return', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Available";
        }
    })
    res.render("home", {
        data: books
    })
})

app.post('/delete', (req, res) => {
    var requestedBookName = req.body.bookName;
    var j = 0;
    books.forEach(book => {
        j = j + 1;
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: books
    })
})

app.listen(100, (req, res) => {
    console.log("App is running on port 100")
})
