const express = require('express')
const app = express()
const port = 3000

// 設定樣板引擎
const exphbs = require('express-handlebars')

// 載入餐廳列表的json檔，使用解構賦值
const { results } = require('./restaurant.json')

// 啟用樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 告知 Express 靜態檔案的位置
app.use(express.static('public'))


// 渲染首頁
app.get('/', (req, res) => {
  res.render('index', { restaurant: results })
})

// 渲染分頁
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

// 渲染搜尋頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  if (!keyword) {
    return res.redirect("/")
  }

  const restaurant = results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
    restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  )

  res.render('index', { restaurant, keyword })
})


// 監聽啟動網頁
app.listen(port, () => {
  console.log(`the server is running to http://localhost.${port}`)
})