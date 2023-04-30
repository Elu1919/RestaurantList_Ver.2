// require packages used in the project 
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')

// function
function searchRestaurants(keyword) {

  let rawRestaurants = []

  restaurantList.results.forEach((restaurant) => {

    const restaurantData = Object.values(restaurant)

    if (restaurantData.toString().trim().toLocaleLowerCase().includes(keyword)) {
      rawRestaurants.push(restaurant)
    }

  })

  return rawRestaurants

}

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toString().toLocaleLowerCase().trim()
  let restaurants = searchRestaurants(keyword)

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => req.params.restaurant_id == restaurant.id)
  res
  res.render('show', { restaurant: restaurant[0] })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
