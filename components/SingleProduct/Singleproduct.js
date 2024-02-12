import  {GetAllProducts,RefreshCart,addToCart} from "../Start.js"

//Refresh Cart
RefreshCart()

// Add style For Minus Plus button
const file=location.pathname.split("/")
file.pop()
let pathcss="/"+file.join("")+"/components/SingleProduct/styles.css"
var link = document.createElement( "link" );
link.href = pathcss
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link)




//Check Products in Storage
// console.log(JSON.parse(localStorage.getItem("products")))
GetAllProducts().then((products=[])=>{
    //Get Id From Url
    let search= location.search
    let id= parseInt(search.match(/\d+/).join(""));
    //Get the speific Product
    let product = products.filter((product)=> product.id===id)
    product = product[0]
    const HtmlDetails=CreateProductDetails(product)
    document.querySelector(".single-product.clearfix").innerHTML=HtmlDetails
    //Fix some Error "Remove Event Listener From menu"
    let el = document.querySelector(".menu-toggle.menu-toggle-2.hamburger.hamburger--emphatic.d-none.d-md-block")
    console.log(el)
    let elClone = el.cloneNode(true);
    console.log(elClone)

    el.parentNode.replaceChild(elClone, el);

    //apply Slide with files already create by Dev nt me
    let my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src',"js/slick.min.js");
    document.body.appendChild(my_awesome_script)
    my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src',"js/main.min.js");
    document.body.appendChild(my_awesome_script)
    //Edit the plus minus button
    EditPlusMinus(1)

    //Add Event Listener To Cart Button
    let Cart= document.querySelector("a[title='Add To Cart']")
    Cart.addEventListener("click" ,()=>{addToCart(product,+GetValueQuantity())} )


    
})





const CreateProductDetails=(product)=>{
    let HtmlProduc=`<!-- Single-pro-slider Big-photo start -->
                    <div class="single-pro-slider single-big-photo view-lightbox slider-for">
                        <div>
                            <img src="img/single-product/medium/1.jpg" alt="" />
                            <a class="view-full-screen" href="img/single-product/large/1.jpg"  data-lightbox="roadtrip" data-title="My caption">
                                <i class="zmdi zmdi-zoom-in"></i>
                            </a>
                        </div>
                        <div>
                            <img src="img/single-product/medium/2.jpg" alt="" />
                            <a class="view-full-screen" href="img/single-product/large/2.jpg"  data-lightbox="roadtrip" data-title="My caption">
                                <i class="zmdi zmdi-zoom-in"></i>
                            </a>
                        </div>
                        <div>
                            <img src="img/single-product/medium/3.jpg" alt="" />
                            <a class="view-full-screen" href="img/single-product/large/3.jpg"  data-lightbox="roadtrip" data-title="My caption">
                                <i class="zmdi zmdi-zoom-in"></i>
                            </a>
                        </div>
                        <div>
                            <img src="img/single-product/medium/4.jpg" alt="" />
                            <a class="view-full-screen" href="img/single-product/large/4.jpg"  data-lightbox="roadtrip" data-title="My caption">
                                <i class="zmdi zmdi-zoom-in"></i>
                            </a>
                        </div>
                        <div>
                            <img src="img/single-product/medium/5.jpg" alt="" />
                            <a class="view-full-screen" href="img/single-product/large/5.jpg"  data-lightbox="roadtrip" data-title="My caption">
                                <i class="zmdi zmdi-zoom-in"></i>
                            </a>
                        </div>
                    </div>	
                    <!-- Single-pro-slider Big-photo end -->								
                    <div class="product-info">
                        <div class="fix">
                            <h4 class="post-title floatleft">${product.name}</h4>
                            <span class="pro-rating floatright">`
    // Calcul Star Rating
    let Rating=product.rating
    for (let index = 0; index < 5; index++) {
        if (Rating >1) HtmlProduc+=`<a href="#"><i class="zmdi zmdi-star"></i></a>`
        else if (Rating>0.2) HtmlProduc+=`<a href="#"><i class="zmdi zmdi-star-half"></i></a>`
        else HtmlProduc+=`<a href="#"><i class="zmdi zmdi-star-outline"></i></a>`
        Rating--
    }

    HtmlProduc+=`<span>( ${product.countRating} Rating )</span>
                </span>
                </div>
                <div class="fix mb-20">`
    //Calcul Discount 

    if(product.SalesInfo.Discount) {
        let price=product.price
        let pricediscount=price -((product.SalesInfo.Discount/100)*price)
        HtmlProduc+=`<span class="pro-price floatleft">
                        <span class="pro-price">$ ${pricediscount.toFixed(2)}</span>
                        <span class="pro-price discounts">${price}</span>
                    </span>`
    }
    else{
        HtmlProduc+=`<span class="pro-price floatleft">$ ${product.price}</span>`
    }

    HtmlProduc+=`</div>
                <div class="product-description">
                <p>${product.description}</p>
                </div>
                <!-- color start -->								
                <div class="color-filter single-pro-color mb-20 clearfix">
                <ul>
                <li><span class="color-title text-capitalize">color</span></li>`
    //Add colors
    for(let index=0;index<product.colors.length;index++){
        console.log(product.colors[index])
        switch(product.colors[index]){
            case "walnut":
                HtmlProduc+=`<li><a href="#"><span class="color color-1"></span></a></li>`
                break
            case "espresso":
                HtmlProduc+=`<li><a href="#"><span class="color color-2"></span></a></li>`
                break
            case "white":
                HtmlProduc+=`<li><a href="#"><span class="color color-3"></span></a></li>`
                break
            case "black":
                HtmlProduc+=`<li><a href="#"><span class="color color-4"></span></a></li>`
                break
            case "brown":
                HtmlProduc+=`<li><a href="#"><span class="color color-5"></span></a></li>`
                break
            case "gray":
                HtmlProduc+=`<li><a href="#"><span class="color color-6"></span></a></li>`
                break
            case "teal":
                HtmlProduc+=`<li><a href="#"><span class="color color-7"></span></a></li>`
                break
            case "mustard":
                HtmlProduc+=`<li><a href="#"><span class="color color-8"></span></a></li>`
                break
            case "clear":
                HtmlProduc+=`<li><a href="#"><span class="color color-9"></span></a></li>`
                break
            case "chrome":
                HtmlProduc+=`<li><a href="#"><span class="color color-10"></span></a></li>`
                break
            
        }
        }

    HtmlProduc+= `</ul>
                </div>
                <!-- color end -->
                <!-- Tags start -->
                <div class="size-filter single-pro-size mb-35 clearfix">
                <ul>
                <li><span class="color-title text-capitalize">Tags</span></li>`

    //Add Tags
    for(let index=0;index<product.tags.length;index++){
    HtmlProduc+=`<li><a href="#">${product.tags[index]}</a></li>`
    }


    HtmlProduc+=`</ul>
    </div>
    <!-- Tags end -->
    <div class="clearfix">
    <div class="cart-plus-minus-Edit">
    <input type="text" value="02" name="qtybutton" class="cart-plus-minus-box">
    </div>
    <div class="product-action clearfix">
    <a href="wishlist.html" data-bs-toggle="tooltip" data-placement="top" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
    <a href="#" data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View"><i class="zmdi zmdi-zoom-in"></i></a>
    <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Compare"><i class="zmdi zmdi-refresh"></i></a>
    <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Add To Cart"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
    </div>
    </div>
    <!-- Single-pro-slider Small-photo start -->
    <div class="single-pro-slider single-sml-photo slider-nav">
    <div>
    <img src="img/single-product/small/1.jpg" alt="" />
    </div>
    <div>
    <img src="img/single-product/small/2.jpg" alt="" />
    </div>
    <div>
    <img src="img/single-product/small/3.jpg" alt="" />
    </div>
    <div>
    <img src="img/single-product/small/4.jpg" alt="" />
    </div>
    <div>
    <img src="img/single-product/small/5.jpg" alt="" />
    </div>
    </div>
    <!-- Single-pro-slider Small-photo end -->
    </div>
    `
        return HtmlProduc
}
const EditPlusMinus = (Quantity)=>{
    console.log("again")
    const cartpulsminus=document.querySelector(".cart-plus-minus-Edit")
    let HtmlPM=`<div class="decbutton Editbutton">-</div>
    <input type="text" value="${Quantity}" name="Editbutton" class="cart-plus-minus-Edit-box">
    <div class="incbutton Editbutton">+</div>`
    cartpulsminus.innerHTML=HtmlPM
    //Add function for buttons
    cartpulsminus.querySelector(".incbutton").addEventListener("click" ,()=>{plus()})
    cartpulsminus.querySelector(".decbutton").addEventListener("click" ,()=>{minus()})
}
function plus(){
    console.log("P")
    let Quantity=+GetValueQuantity()
    Quantity++
    EditPlusMinus(Quantity)
}
function minus(){
    console.log("M")
    let Quantity=+GetValueQuantity()
    if (Quantity>0) Quantity--
    else{
        Quantity
    }
    EditPlusMinus(Quantity)
}

const GetValueQuantity=()=>{
    return document.querySelector(".cart-plus-minus-Edit-box").value
}