const express = require('express')
const cors = require('cors')//CORS Protocol
const mongoose = require('mongoose')//db
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port = 5000
app.use(cors())

//user - blogonheroku
//mongodb+srv://blogonheroku:<password>@cluster0.vsb8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const MONGODB_URI = 'mongodb+srv://blogonheroku:blogonheroku@cluster0.vsb8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//connect to the db
mongoose.connect(MONGODB_URI || 'mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
})

//verify if db is connected
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose is conected!!!')
// })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
 
//read index.ejs file
app.get('/', async(req, res) => {

    const articles = await Article.find().sort({
        createdAt: 'desc'
    })

    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)
app.listen(process.env.PORT || port)