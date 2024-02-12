//Mouad

export const GetAllProducts = async () => { 
    console.log("Fetch..")
    const Data = await fetch("./products.json").then((result=>result.json()))
    return Data.products
}
export const GetAllScripts= ()=>{
    const head=document.createElement('script')
    head.setAttribute('src',"js/vendor/modernizr-3.11.2.min.js")
    document.head.appendChild(head)
    const ElementsScript=[]
    const Sources=["js/vendor/jquery-3.6.0.min.js","js/vendor/jquery-migrate-3.3.2.min.js","js/bootstrap.bundle.min.js","js/jquery.meanmenu.js","js/slick.min.js","js/jquery.treeview.js","js/lightbox.min.js","js/jquery-ui.min.js","lib/js/jquery.nivo.slider.js","lib/home.js","js/jquery.nicescroll.min.js","js/countdon.min.js","js/wow.min.js","js/plugins.js","js/main.min.js"]
    Sources.forEach((Source)=>{
        let my_awesome_script = document.createElement('script');
        my_awesome_script.setAttribute('src',Source);
        ElementsScript.push(my_awesome_script)
    })
    return ElementsScript
}



export const addToCart=(info,Quantity)=>{
    //Get Product From Cart
    let Cart=JSON.parse(localStorage.getItem("productscart"))
    //Check if there is A Cart 
    let Oldsproducts=Cart? [...Cart] : []
    //Create a new Cart
    let NewproductsCart=null
    //check if this product is already in cart
    let currentproduct=Oldsproducts.slice().filter((prod)=>{return prod.product.id===info.id})[0]
    
    if (!currentproduct){
        console.log("this is a new")
        //Create Object of new Carts
        let newproduct={"product":info,"Quantity":Quantity}
        //Add new productCart to the Old productCart
        NewproductsCart=Oldsproducts
        NewproductsCart.push(newproduct)
        // console.log(NewproductsCart)
    }
    else{
            //product already in Cart we need to add Quantity
            console.log("this is a old")
            let newproduct={"product":info,"Quantity":currentproduct.Quantity+Quantity}
            //Crate New array without product
            NewproductsCart=Oldsproducts.slice().filter((ProductInfo)=>{ return ProductInfo.product.id!==info.id})
            //Add product with new quantity to Cart
            NewproductsCart.push(newproduct)
            // console.log(NewproductsCart)
    }

    //Set new items in Cart
    localStorage.setItem("productscart",JSON.stringify(NewproductsCart))
    //Refresh Cart Html
    RefreshCart()
}

const RemoveFromCart = (id)=>{
    //Get Product From Cart
    let Cart=JSON.parse(localStorage.getItem("productscart"))||[]
    // console.log(Cart)

    //Remove item
    let news=Cart.filter((ProductInfo)=>ProductInfo.product.id!==id)
    // console.log(news)
    
    //Set new items in Cart
    localStorage.setItem("productscart",JSON.stringify(news))
    
    //Refresh Cart Html
    RefreshCart()
}




export const RefreshCart=()=>{
    //Get cart notification
    let Cartnotif=document.querySelector(".cart-icon span")
    //Get Product From Cart
    let Cart=JSON.parse(localStorage.getItem("productscart"))
    if(Cart?.length){
        Cartnotif.textContent=Cart.length
        AddHtmlCart(Cart)
    } 
        
    else{
        Cartnotif.textContent=0
        // console.log("no products in Cart")
        AddHtmlCart(0)

    }
}


const AddHtmlCart = (ProductsInfo)=>{
    //if there is no products in Cart
        if(!ProductsInfo){
            let miniCart=document.querySelector(".mini-cart-brief.text-left")
            let FullHtml=`<div class="cart-items" xpath="1">
                        <p class="mb-0">You have <span>${ProductsInfo} items</span> in your shopping bag</p>
                    </div>
                    <div class="all-cart-product clearfix">
                    <div class="single-cart clearfix">
                            <p>There are no items in your shopping cart</p>
                        </div>
                        </div>`

        FullHtml+=` <div class="cart-totals">
        <h5 class="mb-0">Total <span class="floatright">$${ProductsInfo}</span></h5>
    </div>
    <div class="cart-bottom  clearfix">
        <a href="cart.html" class="button-one floatleft text-uppercase" data-text="View cart">View cart</a>
        <a href="checkout.html" class="button-one floatright text-uppercase" data-text="Check out">Check out</a>
    </div>`
    miniCart.innerHTML=FullHtml
    return 0
        }
        //calc Price
        let TotalPrice=0

        let miniCart=document.querySelector(".mini-cart-brief.text-left")
        // console.log(ProductsCart)
        let FullHtml=`<div class="cart-items" xpath="1">
                        <p class="mb-0">You have <span>${ProductsInfo.length} items</span> in your shopping bag</p>
                    </div>
                    <div class="all-cart-product clearfix">`
        ProductsInfo.forEach((ProductInfo)=>{
            let price=0
            if(ProductInfo.product.SalesInfo.Discount) {
                price=ProductInfo.product.price
                price=price -((ProductInfo.product.SalesInfo.Discount/100)*price)
            }
            else{
                price=ProductInfo.product.price
            }

            TotalPrice+=price*ProductInfo.Quantity
            // console.log(ProductCart.product)
            FullHtml+=`<div class="single-cart clearfix">
                            <div class="cart-photo">
                                <a href="#"><img src="img/cart/1.jpg" alt=""></a>
                            </div>
                            <div class="cart-info">
                                <h5><a href="single-product.html?${ProductInfo.product.id}" title="${ProductInfo.product.name}">${name(ProductInfo.product.name)}</a></h5>
                                <p class="mb-0">Price : $ ${price.toFixed(2)}</p>
                                <p class="mb-0">Qty : ${ProductInfo.Quantity} </p>
                                <span id=${ProductInfo.product.id} class="cart-delete"><a href="#"><i class="zmdi zmdi-close"></i></a></span>
                            </div>
                        </div>
                        </div>`
        })
        FullHtml+=` <div class="cart-totals">
        <h5 class="mb-0">Total <span class="floatright">$${TotalPrice.toFixed(2)}</span></h5>
    </div>
    <div class="cart-bottom  clearfix">
        <a href="cart.html" class="button-one floatleft text-uppercase" data-text="View cart">View cart</a>
        <a href="checkout.html" class="button-one floatright text-uppercase" data-text="Check out">Check out</a>
    </div>`
        miniCart.innerHTML=FullHtml
        //Add button remove to each product
        let removebutton=miniCart.querySelectorAll(".single-cart span")
        removebutton.forEach((button)=>{
            let id=parseInt(button.getAttribute("id"))
            button.addEventListener("click",()=>{RemoveFromCart(id)})
        })
    }


export const CreateModal=(product)=>{
    console.log(product)
    let modal=document.querySelector(".modal-product")
    let HtmlModal=`
    <div class="modal-product" xpath="1">
									<div class="product-images">
										<div class="main-image images">
											<img alt="#" src="img/product/quickview-photo.jpg">
										</div>
									</div><!-- .product-images -->

									<div class="product-info">
										<h1 title="${product.name}">${product.name}</h1>
										<div class="price-box-3">
											<hr>
											<div class="s-price-box">`
    //Calcul Discount 
    if(product.SalesInfo.Discount) {
        let price=product.price
        let pricediscount=price -((product.SalesInfo.Discount/100)*price)
        HtmlModal+=`<span class="new-price">$${pricediscount.toFixed(2)}</span>
                    <span class="old-price">$${price}</span>`
    }
                                    
    else{
        HtmlModal+=`<span class="new-price">$${product.price}</span>`
        }
    HtmlModal+=`											</div>
    <hr>
</div>
<a href="shop.html" class="see-all">See all features</a>
<div class="quick-add-to-cart">
    <form method="post" class="cart">
        <div class="numbers-row">
            <input type="number" id="french-hens" value="3" min="1">
        </div>
        <button class="single_add_to_cart_button" id="${product.id}">Add to cart</button>
    </form>
</div>
<div class="quick-desc">
    ${product.description}
</div>
<div class="social-sharing">
    <div class="widget widget_socialsharing_widget">
        <h3 class="widget-title-modal">Share this product</h3>
        <ul class="social-icons">
            <li><a target="_blank" title="Google +" href="#" class="gplus social-icon"><i class="zmdi zmdi-google-plus"></i></a></li>
            <li><a target="_blank" title="Twitter" href="#" class="twitter social-icon"><i class="zmdi zmdi-twitter"></i></a></li>
            <li><a target="_blank" title="Facebook" href="#" class="facebook social-icon"><i class="zmdi zmdi-facebook"></i></a></li>
            <li><a target="_blank" title="LinkedIn" href="#" class="linkedin social-icon"><i class="zmdi zmdi-linkedin"></i></a></li>
        </ul>
    </div>
</div>
</div><!-- .product-info -->
</div>`
modal.innerHTML=HtmlModal
//Add Event Listener To Add Cart Button
    const but=modal.querySelector(".single_add_to_cart_button")
    
    but.addEventListener("click" ,(event)=>{
        event.preventDefault()
        const numofproduct=parseInt(modal.querySelector("#french-hens").value)
        addToCart(product,numofproduct)
    } )
}




// Function for Name
export function name(x){
            if (x.length > 20) {
                const lastSpaceIndex = x.substring(0, 22).lastIndexOf(' ')
                return x.substring(0, lastSpaceIndex) + '...';
            }
            else {
                return x
            }
        }