let Oldsproducts=[
    {
      "product": {
        "id": 3,
        "name": "Winter Elegance Wool Coat",
        "description": "Step into winter with elegance wearing our Winter Elegance Wool Coat. Crafted with attention to detail, this coat not only keeps you warm but also elevates your winter style. The classic design is timeless.",
        "price": 89.99,
        "sizes": [
          "L"
        ],
        "tags": [
          "men",
          "winter"
        ],
        "SalesInfo": {
          "sells_count": 1,
          "new": true,
          "views": 10,
          "Solde_Out": false,
          "Discount": 20
        },
        "imageUrl": "img/product/03.jpg",
        "rating": 3.8,
        "countRating": 4
      },
      "Quantity": 1
    },
    {
      "product": {
        "id": 2,
        "name": "Sunflower Maxi Dress",
        "description": "Embrace the warmth of summer with our Sunflower Maxi Dress. Featuring a beautiful sunflower pattern, this dress is perfect for women who love the beauty of nature. The flowing design adds an elegant touch.",
        "price": 49.99,
        "sizes": [
          "S"
        ],
        "tags": [
          "women",
          "summer"
        ],
        "SalesInfo": {
          "sells_count": 5,
          "new": true,
          "views": 3,
          "Solde_Out": false
        },
        "imageUrl": "img/product/03.jpg",
        "rating": 1.2,
        "countRating": 9
      },
      "Quantity": 1
    },
    {
      "product": {
        "id": 1,
        "name": "Casual Tee",
        "description": "Stay comfortable and stylish with our Casual Tee. Made from soft cotton, this shirt is perfect for casual outings and everyday wear. The relaxed fit ensures ease of movement.",
        "price": 29.99,
        "sizes": [
          "M"
        ],
        "tags": [
          "men",
          "casual",
          "summer"
        ],
        "SalesInfo": {
          "sells_count": 3,
          "new": true,
          "views": 8,
          "Solde_Out": true,
          "Discount": 10
        },
        "imageUrl": "img/product/03.jpg",
        "rating": 2.5,
        "countRating": 8
      },
      "Quantity": 1
    }
  ]

let NewproductsCart=Oldsproducts.slice().filter((prod)=>{return prod.product.id===7})[0]

console.log(NewproductsCart)