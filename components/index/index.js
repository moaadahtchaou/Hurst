import  {GetAllProducts,addToCart,RefreshCart} from "../Start.js"
import {Createswiper} from"../Slider/slider.js"

//Refresh Cart
RefreshCart()

GetAllProducts().then((products=[])=>{
    //Insert/initialis Local Storage
    // localStorage.setItem("products",JSON.stringify(products))
    // console.log(JSON.parse(localStorage.getItem("products")))
    //Select where Insert
    const FeaturedProducts= document.querySelector(".style-1.arrow-left-right")
    const NewArrivals=document.querySelector("div[id='new-arrivals'] div[class='row']")
    const BestSeller=document.querySelector("div[id='best-seller'] div[class='row']")
    const Mostviewd=document.querySelector("div[id='most-view'] div[class='row']")
    const Discount= document.querySelector("div[id='discounts'] div[class='row']")
    
    //Process
    let newproducts=products.slice().filter((product)=> product.SalesInfo.new ===true)
    let BestSellerproducts=products.slice().sort((a, b) => b.SalesInfo.sells_count - a.SalesInfo.sells_count)
    let Mostviewproducts=products.slice().sort((a, b) => b.SalesInfo.views - a.SalesInfo.views)
    let Discountproducts=products.slice().filter((product)=>product.SalesInfo.Discount)

    //CreatHtml
    let HTMLFeatured = CreateProducts_Purchase_Featured(newproducts,"featured")
    let HTMLNewArrivals=CreateProducts_Purchase_Featured(newproducts.slice(0,8),"purchase")
    let HTMLBestSeller=CreateProducts_Purchase_Featured(BestSellerproducts.slice(0,8),"purchase")
    let HTMLMostviewd=CreateProducts_Purchase_Featured(Mostviewproducts.slice(0,8),"purchase")
    let HTMLDiscount=CreateProducts_Purchase_Featured(Discountproducts.slice(0,8),"purchase")

    // Insert Products
    
        //Insert New Products In Swiper
        FeaturedProducts.innerHTML=`
            <!-- Swiper -->
            <section>
                <button type="button" class="swiper-button but-prev">p<br>r<br>e<br>v</button>
                <div class="swiper">
                    <div class="swiper-wrapper">
                        ${HTMLFeatured}
                    </div>
                </div>
                <button type="button" class="swiper-button but-next">n<br>e<br>x<br>t</button>
            </section>
            `
        //Create Swiper Apply Swiper For Featured Products
        Createswiper() 
        //Insert New Purchase
        NewArrivals.innerHTML=HTMLNewArrivals
        //Insert Best Seller
        BestSeller.innerHTML=HTMLBestSeller
        //Insert MostView
        Mostviewd.innerHTML=HTMLMostviewd
        //Insert Discouunt
        Discount.innerHTML=HTMLDiscount
        //Add Event Listener To Cart Button
        let Carts= document.querySelectorAll("a[title='Add To Cart']")
        Carts.forEach((Cart)=>{
            let id=parseInt(Cart.getAttribute("id"))
            Cart.addEventListener("click" ,()=>{addToCart(products.filter((product)=> product.id ===id)[0],1)} )
        })

    


})
const CreateProducts_Purchase_Featured= (products=[],FeaOrPur="")=>{
    let AllHtmlProducts=""
    let FeaturedorPurchase=FeaOrPur==="featured"? "swiper-slide" :"col-xl-3 col-lg-4 col-md-6"
    // Create Html of Featured and Purchase products In json
    products.forEach((prod)=>{
        AllHtmlProducts+=`<div class="single-product ${FeaturedorPurchase}" id=${prod.id}>
                            <div class="product-img">`

        //Check if need to add new Or sale Tag
        if(prod.SalesInfo.Solde_Out===true) AllHtmlProducts+=`<span class="pro-label sale-label">sale</span>`
        else if (prod.SalesInfo.new===true) AllHtmlProducts+=`<span class="pro-label new-label">new</span>`


        AllHtmlProducts+=`<a href="single-product.html?${prod.id}"><img src="img/product/1.jpg" alt="" /></a>
                                                                <div class="product-action clearfix">
                                                                    <a href="wishlist.html" data-bs-toggle="tooltip" data-placement="top" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
                                                                    <a href="#" data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i class="zmdi zmdi-zoom-in"></i></a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Compare"><i class="zmdi zmdi-refresh"></i></a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Add To Cart" id=${prod.id}><i class="zmdi zmdi-shopping-cart-plus"></i></a>
                                                                </div>
                            </div>
                            <div class="product-info clearfix">
                                <div class="fix">
                                    <h4 class="post-title floatleft"><a href="single-product.html?${prod.id}">${prod.name}</a></h4>
                                    <p class="floatright hidden-sm d-none d-md-block">Furniture</p>
                                </div>
                                <div class="fix">`
        //Calcul Discount 

        if(prod.SalesInfo.Discount) {
            let price=prod.price
            let pricediscount=price -((prod.SalesInfo.Discount/100)*price)
            AllHtmlProducts+=`<span class="pro-price floatleft">
            <span class="pro-price">$ ${pricediscount.toFixed(2)}</span>
            <span class="pro-price discounts">${price}</span>
            </span>
            <span class="pro-rating floatright">`
        }

        else{
            AllHtmlProducts+=`<span class="pro-price floatleft">$ ${prod.price}</span><span class="pro-rating floatright">`
        }

        // Calcul Star Rating
        let Rating=prod.rating
                        for (let index = 0; index < 5; index++) {
                            if (Rating >1) AllHtmlProducts+=`<a href="#"><i class="zmdi zmdi-star"></i></a>`
                            else if (Rating>0.2) AllHtmlProducts+=`<a href="#"><i class="zmdi zmdi-star-half"></i></a>`
                            else AllHtmlProducts+=`<a href="#"><i class="zmdi zmdi-star-outline"></i></a>`
                            Rating--
                        }

        AllHtmlProducts+=         `</span>
                                </div>
                            </div>
                        </div>`
                    })

    //Retuen Data
    return AllHtmlProducts                      
}

