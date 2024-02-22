import  {extractDomain,GetAllProducts,addToCart,RefreshCart,CreateModal,name,AddWishlist,RefreshButtonswishlist} from "../Start.js"
import {Createswiper,CreateDiscountSwiper} from"../Slider/slider.js"
const Domain= extractDomain(location.href)==="furniture-iota-nine.vercel.app"? "Vercel":"Html"


// Add style For Minus Plus button
const file=location.pathname.split("/")
file.pop()
let pathcss=""
if(Domain==="Vercel"){

    pathcss=file.join("")+"/components/index/styles.css"
}
else{
    pathcss="/"+file.join("")+"/components/index/styles.css"

}
var link = document.createElement( "link" );
link.href = pathcss
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link)


GetAllProducts().then((products=[])=>{
    //Slider-area
    GetAllProducts("Slider").then((Sliderproducts)=>{
        //The insertion location
        let SlidersImages=document.querySelectorAll("#ensign-nivoslider>img")
        let SlidersText=document.querySelectorAll(".slider-direction")
        // console.log(SlidersImages)
        //Create Db merged
        let NewinfoSliderProducts=[]
        Sliderproducts.forEach((productsslider)=>{
            const prod=products.slice().filter((product)=>  product.id===productsslider.id)[0]
            NewinfoSliderProducts.push({...prod,"imgSlider":productsslider.imgSlider,"Order":productsslider.SliderOrder})
        })
        //Fonction Insert Info
        const CreateSlider=(Edit,product)=>{
            // console.log(Edit)
            //Set Product Name
            Edit.querySelector(".slider-title3").textContent=product.name
            //Set Product Price
            //Calcul if Discount 
            if(product.SalesInfo.Discount) {
                let price=product.price
                let pricediscount=price -((product.SalesInfo.Discount/100)*price)
                Edit.querySelector(".slider-title2").textContent="$ "+pricediscount.toFixed(2)
            }
            else{
                Edit.querySelector(".slider-title2").textContent="$ "+product.price
            }
            Edit.querySelector(".slider-title2").classList.add("custom")
            //Set Descriptio
            Edit.querySelector(".slider-pro-brief").classList.add("custom")
            Edit.querySelector(".slider-pro-brief").textContent=product.description
            //Set Shop but
            Edit.querySelector("a[data-text='Shop now']").href=`single-product.html?${product.id}`
        }
        // console.log(NewinfoSliderProducts)
        NewinfoSliderProducts.forEach((product)=>{
            //For initial
            if (product.Order===0){
                let CurrentSlider=document.querySelector(".nivo-caption .layer-1")
                // console.log(CurrentSlider)
                SlidersImages[3].src=product.imgSlider
                CreateSlider(CurrentSlider,product)
            } 
            //Set Images Slider
            SlidersImages[product.Order].src=product.imgSlider
            CreateSlider(SlidersText[product.Order],product)
        })
    })
    //NewestProducts
    GetAllProducts("Banner").then((Bannerproducts)=>{
        //insertion location
        const Banner=document.querySelectorAll(".slider-banner .single-banner")
        //Edit banner-1
        //Create Db merged
        let NewinfoBannerProducts=[]
        Bannerproducts.forEach((productsBanner)=>{
            const prod=products.slice().filter((product)=>  product.id===productsBanner.id)[0]
            NewinfoBannerProducts.push({...prod,"imgNewest":productsBanner.imgNewest,"NumBanner":productsBanner.NumBanner,"TextColor":productsBanner.TextColor})
        })
        // console.log(NewinfoBannerProducts)
        NewinfoBannerProducts.forEach((product)=>{
            //Image
            Banner[product.NumBanner-1].querySelector("img").src=product.imgNewest

            //Banner 1
            if(product.NumBanner===1){
                const Banner1=Banner[product.NumBanner-1]
                //Price
                Banner1.querySelector(".price").textContent="$"+product.price
                Banner1.querySelector(".price").style.cssText = `color: ${product.TextColor}; line-height: 1.1; /* add more styles as needed */`;
                //Title
                Banner1.querySelector(".banner-title a").textContent=product.name
                Banner1.querySelector(".banner-title a").style.color = product.TextColor;
                 //Check if need to add new Or sale Tag
                const Tag=Banner1.querySelector(".new-label")
                if(product.SalesInfo.Solde_Out===true){
                    Tag.classList.remove(".new-label")
                    Tag.classList.add("sale-label")
                    Tag.textContent="sale"
                } 
                else if (product.SalesInfo.new===false)  Tag.remove()

                //Btn Buy now
                Banner1.querySelector("a[data-text='Buy now']").href=`single-product.html?${product.id}`
            }
            //Banner 2
            else{
                const Banner2=Banner[product.NumBanner-1]
                 //Title
                Banner2.querySelector(".banner-title a").textContent=product.name
                Banner2.querySelector(".banner-title a").style.color = product.TextColor;
                //Description
                Banner2.querySelector(".hidden-md.hidden-sm.d-none.d-md-block").textContent=product.description
                Banner2.querySelector(".hidden-md.hidden-sm.d-none.d-md-block").style.color = product.TextColor;
                //Btn Buy now
                Banner2.querySelector("a[data-text='Buy now']").href=`single-product.html?${product.id}`
            }

        })



    }
    )


    //Insert/initialis Local Storage
    // localStorage.setItem("products",JSON.stringify(products))
    // console.log(JSON.parse(localStorage.getItem("products")))
    //The insertion location
    const FeaturedProducts= document.querySelector(".style-1.arrow-left-right")
    let DiscountSliderProducts=document.querySelector(".col-lg-12.slick-slide.slick-current.slick-active .discount-product")
    const NewArrivals=document.querySelector("div[id='new-arrivals'] div[class='row']")
    const BestSeller=document.querySelector("div[id='best-seller'] div[class='row']")
    const Mostviewd=document.querySelector("div[id='most-view'] div[class='row']")
    const Discount= document.querySelector("div[id='discounts'] div[class='row']")
    
    //Process
    let newproducts=products.slice().filter((product)=> product.SalesInfo.new ===true)
    let DiscSliderProducts=products.slice().filter((product)=>{if(product.SalesInfo.Discount>=15) return product})
    let BestSellerproducts=products.slice().sort((a, b) => b.SalesInfo.sells_count - a.SalesInfo.sells_count)
    let Mostviewproducts=products.slice().sort((a, b) => b.SalesInfo.views - a.SalesInfo.views)
    let Discountproducts=products.slice().filter((product)=>product.SalesInfo.Discount)
    // console.log(DiscSliderProducts)
    //CreatHtml
    let HTMLFeatured = CreateProducts_Purchase_Featured(newproducts,"featured")
    let HTMLSliderDiscount= CreateSlider_Discount(DiscSliderProducts)
    let HTMLNewArrivals=CreateProducts_Purchase_Featured(newproducts.slice(0,8),"purchase")
    let HTMLBestSeller=CreateProducts_Purchase_Featured(BestSellerproducts.slice(0,8),"purchase")
    let HTMLMostviewd=CreateProducts_Purchase_Featured(Mostviewproducts.slice(0,8),"purchase")
    let HTMLDiscount=CreateProducts_Purchase_Featured(Discountproducts.slice(0,8),"purchase")

    // Insert Products
    
        //Insert New Products In Featured Swiper
        FeaturedProducts.innerHTML=`
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
        //Insert New Products In Discount Swiper
            //Remove Events
            const reevent=document.querySelector(".discount-product-area")
            const reeventClone=reevent.cloneNode(true)
            reevent.parentNode.replaceChild(reeventClone, reevent)
            DiscountSliderProducts=document.querySelector(".col-lg-12.slick-slide.slick-current.slick-active .discount-product")
            const DiscountSliderProductsClone=DiscountSliderProducts.cloneNode(true)
            DiscountSliderProducts.parentNode.replaceChild(DiscountSliderProductsClone, DiscountSliderProducts)
            //Remove Old dots
            document.querySelector(".slick-dots").remove()
            //Remove Sliders
            const Sliders=document.querySelectorAll("div[class='col-lg-12 slick-slide']")
            Sliders.forEach((Slider)=>Slider.remove())
            //Insert 
            DiscountSliderProductsClone.innerHTML=`
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    ${HTMLSliderDiscount}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
                <div class="autoplay-progress">
                      <svg viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20"></circle>
                      </svg>
                      <span></span>
                </div>
            </div>
            `

        //Create Swiper Apply For Discount Produts
        CreateDiscountSwiper()

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
        //Add Event Listener To wishlist
        const wishlists=document.querySelectorAll("a[title='Wishlist']")
        wishlists.forEach((wish)=>{
            let id=parseInt(wish.getAttribute("id"))
            wish.addEventListener("click" ,()=>{AddWishlist(products.filter((product)=> product.id ===id)[0])} )

        })
        //Add Event Listener To Quick view Button 
        let Quicks=document.querySelectorAll("a[title='Quick View']")
        Quicks.forEach((quick)=>{
            let id=parseInt(quick.getAttribute("id"))
            quick.addEventListener("click" ,()=>{CreateModal(products.filter((product)=> product.id ===id)[0])} )
        })
        //Refresh Cart
        RefreshCart()
        //Refresh Favorite
        RefreshButtonswishlist()

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


        AllHtmlProducts+=`<a href="single-product.html?${prod.id}" title="${prod.name}"><img src="${prod.imgmain}" alt="" /></a>
                                                                <div class="product-action clearfix">
                                                                    <a href="#" data-bs-toggle="tooltip" id=${prod.id} data-placement="top" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
                                                                    <a href="#" data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View" id=${prod.id}><i class="zmdi zmdi-zoom-in"></i></a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Add To Cart" id=${prod.id}><i class="zmdi zmdi-shopping-cart-plus"></i></a>
                                                                </div>
                            </div>
                            <div class="product-info clearfix">
                                <div class="fix">
                                    <h4 class="post-title floatleft"><a href="single-product.html?${prod.id}" title="${prod.name}" >${name(prod.name)}</a></h4>
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
const CreateSlider_Discount=(Disc)=>{
    let Allhtmlsliderdiscount=``
    Disc.forEach((product)=>{
        //Calc Discount
        let price=product.price
        let pricediscount=price -((product.SalesInfo.Discount/100)*price)
        Allhtmlsliderdiscount+=`<div class="swiper-slide">
                        <img src="${product.imgmain}" alt="">
                        <div class="discount-img-brief">
                            <div class="onsale">
                                <span class="onsale-text">On Sale</span>
                                <span class="onsale-price">$ ${pricediscount.toFixed(2)}</span>
                            </div>
                            <div class="discount-info">
                                <h1 class="text-dark-red d-none d-md-block">Discount ${product.SalesInfo.Discount}</h1>
                                <p class="d-none d-md-block custom">${product.description}</p>
                                <a href="single-product.html?${product.id}" class="button-one font-16px style-3 text-uppercase mt-md-5" data-text="Buy now" tabindex="0">Buy now</a>
                            </div>
                        </div>
        </div>`
    })
    return Allhtmlsliderdiscount
}
