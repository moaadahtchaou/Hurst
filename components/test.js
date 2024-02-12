let gg=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
gg=gg.filter(num=> num===1)

console.log(gg)
let text="chair,sofa,table"
console.log(text.split(","))

let ob={
    "id": 1,
    "name": "Modern Leather Accent Chair",
    "description": "Add a touch of modern elegance to your space with our Modern Leather Accent Chair. The sleek design and high-quality leather make it a stylish and comfortable addition to any room.",
    "price": 199.99,
    "tags": ["modern", "leather", "chair"],
    "colors": ["black", "white", "brown"],
    "imageUrl": "img/furniture/01.jpg",
    "rating": 4.8,
    "countRating": 12,
    "SalesInfo": {"sells_count": 15, "new": true, "views": 28, "Solde_Out": false, "Discount": 10}
  }

console.log((200<ob.price &&ob.price<999))