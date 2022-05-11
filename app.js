const express = require('express')
const app = express()
const port = 3000

// 設定樣板引擎
const exphbs = require('express-handlebars')

// 載入餐廳列表的json檔
const RESTAURANT_LIST = require('./restaurant.json')

// 啟用樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 告知 Express 靜態檔案的位置
app.use(express.static('public'))


// 渲染首頁
app.get('/', (req, res) => {
  res.render('index', { restaurant: RESTAURANT_LIST.results })
})

// 渲染分頁
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = RESTAURANT_LIST.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// 渲染搜尋頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = RESTAURANT_LIST.results.filter(restaurant => { return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()) })
  // if (restaurant.length === 0) {
  //   alert('查無此餐廳')
  // }
  res.render('index', { restaurant: restaurant, keyword: keyword })
})


// 監聽啟動網頁
app.listen(port, () => {
  console.log(`the server is running to http://localhost.${port}`)
})