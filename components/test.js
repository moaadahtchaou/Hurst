// let gg=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
// gg=gg.filter(num=> num===1)

// console.log(gg)
// let text="chair,sofa,table"
// console.log(text.split(","))

// let ob={
//     "id": 1,
//     "name": "Modern Leather Accent Chair",
//     "description": "Add a touch of modern elegance to your space with our Modern Leather Accent Chair. The sleek design and high-quality leather make it a stylish and comfortable addition to any room.",
//     "price": 199.99,
//     "tags": ["modern", "leather", "chair"],
//     "colors": ["black", "white", "brown"],
//     "imageUrl": "img/furniture/01.jpg",
//     "rating": 4.8,
//     "countRating": 12,
//     "SalesInfo": {"sells_count": 15, "new": true, "views": 28, "Solde_Out": false, "Discount": 10}
//   }

// console.log((200<ob.price &&ob.price<999))
// const OldWishlist=[{"id":10,"name":"Rustic Wooden Side Table","description":"Complete your rustic decor with our Rustic Wooden Side Table. The distressed wood finish and compact design make it a versatile and charming addition to any room.","price":79.99,"tags":["rustic","wooden","table"],"colors":["espresso"],"imgmain":"img/MainImg/Rustic Wooden Side Table.jpg","imgs":[],"rating":1.1,"countRating":9,"SalesInfo":{"sells_count":14,"new":true,"views":26,"Solde_Out":false}},{"id":2,"name":"Vintage Wooden Dining Table","description":"Bring a touch of vintage charm to your dining area with our Vintage Wooden Dining Table. Crafted from solid wood, this table combines timeless design with durability.","price":399.99,"tags":["vintage","wooden","table"],"colors":["walnut","gray"],"imgmain":"img/MainImg/Vintage-Wooden-Dining-Table.jpg","imgs":["img/MainImg/Vintage-Wooden-Dining-Table-2.jpg","img/MainImg/Vintage-Wooden-Dining-Table-3.jpg"],"rating":3,"countRating":10,"SalesInfo":{"sells_count":20,"new":true,"views":35,"Solde_Out":true,"Discount":8}},{"id":1,"name":"Modern Leather Accent Chair","description":"Add a touch of modern elegance to your space with our Modern Leather Accent Chair. The sleek design and high-quality leather make it a stylish and comfortable addition to any room.","price":199.99,"tags":["modern","leather","chair"],"colors":["black","white","brown"],"imgmain":"img/MainImg/Modern Leather Accent Chair.jpg","rating":3.7,"countRating":12,"SalesInfo":{"sells_count":15,"new":true,"views":28,"Solde_Out":true,"Discount":10}},{"id":13,"name":"Plastic Stackable Patio Chairs","description":"Enjoy outdoor gatherings with our Plastic Stackable Patio Chairs. The stackable design and vibrant colors make them a practical and fun addition to your patio or deck.","price":89.99,"tags":["plastic","chair"],"colors":["gray"],"imgmain":"img/MainImg/Plastic Stackable Patio Chairs.jpg","imgs":["img/MainImg/Plastic Stackable Patio Chairs-2.jpg"],"rating":4.2,"countRating":12,"SalesInfo":{"sells_count":10,"new":true,"views":20,"Solde_Out":true}}]
// let New=OldWishlist.slice().filter(prod=> prod.id!==10)
// console.log("ssssssssssssssssssssasasa",New)
var input= readline().split(" ").map(x => parseInt(x))
var a=parseInt(input[0])
var b=parseInt(input[1])
var output=0 //1
while (!(a>b)) {
    a=a*3 // 36
    b=b*2 // 36
    output++
  }

console.log(output)