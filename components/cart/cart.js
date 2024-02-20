import  {GetAllProducts,RefreshCart,addToCart,CreateModal,name,RemoveFromCart,Removewishlist} from "../Start.js"

const ShoppingCart=()=>{
    //Get Product From Cart
    let JsonCart=JSON.parse(localStorage.getItem("productscart"))||[]
    const Cart=document.querySelector("#shopping-cart")
    const Table=Cart.querySelector(".table-content tbody")
    let HmlShopping=``
    JsonCart.forEach(prod => {
        HmlShopping+=`<tr>
        <td class="product-thumbnail  text-left">
            <!-- Single-product start -->
            <div class="single-product">
                <div class="product-img">
                    <a href="single-product.html?${prod.product.id}" title="${prod.product.name}"><img src="${prod.product.imgmain}" alt=""></a>
                </div>
                <div class="product-info">
                    <h4 class="post-title"><a class="text-light-black" href="single-product.html?${prod.product.id}">${name(prod.product.name,25)}</a></h4>
                </div>
            </div>
            <!-- Single-product end -->												
        </td>`
        //Calcul Discount 
        let price=prod.product.price
        if(prod.product.SalesInfo.Discount) {
            price=prod.product.price-((prod.product.SalesInfo.Discount/100)*prod.product.price)
        }


        HmlShopping+=`<td class="product-price">$${price.toFixed(2)}</td>
        <td class="product-quantity" id="${prod.product.id}">
            <div class="cart-plus-minus"><div class="dec qtybutton">-</div>
                <input type="text" value="${prod.Quantity}" name="qtybutton" class="cart-plus-minus-box">
            <div class="inc qtybutton">+</div></div>
        </td>
        <td class="product-subtotal">$${(prod.Quantity*price).toFixed(2)}</td>
        <td class="product-remove">
            <a href="#"><i class="zmdi zmdi-close"></i></a>
        </td>
    </tr>`
        

});
    Table.innerHTML=HmlShopping
    const PlusMinus=document.querySelectorAll("tbody .product-quantity")
    PlusMinus.forEach(PM=>{
        
        const id=parseInt(PM.getAttribute("id"))
        const priceproduct=parseFloat(PM.parentElement.querySelector('.product-price').textContent.replace("$", ""))
        const cartpulsminus=PM.querySelector(".cart-plus-minus")
        const product=JSON.parse(localStorage.getItem("productscart"))?.filter(prod=>{return prod.product.id===id })[0]?.product
        cartpulsminus.querySelector(".dec").addEventListener("click",()=>{
            console.log("minus")
            dec(id,priceproduct,product)
            PaymentDetails()
        })
        cartpulsminus.querySelector(".inc").addEventListener("click",()=>{
            console.log("inc")
            inc(id,priceproduct,product)
            PaymentDetails()
        })
        PM.parentElement.querySelector(".product-remove a").addEventListener("click",()=>{
            RemoveFromCart(id)
            ShoppingCart()
            PaymentDetails()
        })

    })
    PaymentDetails()
}
const PaymentDetails=()=>{
    const payDetails=document.querySelectorAll(".payment-details tbody")   
    let JsonCart=JSON.parse(localStorage.getItem("productscart"))||[]
    let HtmlPay=``
    let Total=0
    JsonCart.forEach(prod=>{
        //Calcul Discount 
        let price=prod.product.price
        if(prod.product.SalesInfo.Discount) {
                    price=prod.product.price-((prod.product.SalesInfo.Discount/100)*prod.product.price)
        }

        HtmlPay+=`<tr>
        <td class="text-left">${prod.product.name} x ${prod.Quantity}</td>
        <td class="text-end">$${(price*prod.Quantity).toFixed(2)}</td>
    </tr>`
    Total+=price*prod.Quantity
    })
    HtmlPay+=`<tr>
    <td class="text-left">Order Total</td>
    <td class="text-end">$${Total.toFixed(2)}</td>
</tr>`
    payDetails.forEach(paydetail=>{
        paydetail.innerHTML=HtmlPay
    })
}

const WishList=()=>{
    let JsonWish=JSON.parse(localStorage.getItem("Wishlist"))||[]
    const Table=document.querySelector("#wishlist tbody")
    let HtmlWish=``
    JsonWish.forEach(product=>{
        HtmlWish+=`<tr id=${product.id}>
        <td class="product-thumbnail  text-left">
            <!-- Single-product start -->
            <div class="single-product">
                <div class="product-img">
                    <a href="single-product.html?${product.id}" title="${product.name}"><img src="${product.imgmain}" alt=""></a>
                </div>
                <div class="product-info">
                    <h4 class="post-title"><a class="text-light-black" href="single-product.html?${product.id}" title="${product.name}">${name(product.name,26)}</a></h4>
                </div>
            </div>
            <!-- Single-product end -->				
        </td>
        `
        //Calcul Discount 
        let price=product.price
        if(product.SalesInfo.Discount) {
                            price=product.price-((product.SalesInfo.Discount/100)*product.price)
            }
        HtmlWish+=`
        <td class="product-price">$${price.toFixed(2)}</td>
        `
        if(product.SalesInfo.Solde_Out) {
            HtmlWish+=`<td class="product-stock">Sold Out</td>`
        }
        else{
            HtmlWish+=`<td class="product-stock">in stock</td>`
        }
        HtmlWish+=`
        <td class="product-add-cart">
            <a class="text-light-black" href="#"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
        </td>
        <td class="product-remove">
            <a href="#"><i class="zmdi zmdi-close"></i></a>
        </td>
    </tr>`
    })
    Table.innerHTML=HtmlWish
    Table.querySelectorAll("tr").forEach(tr=>{
        const Add=tr.querySelector(".product-add-cart")
        Add.addEventListener("click",()=>{
            const id=parseInt(Add.parentElement.getAttribute("id"))
            const product=JSON.parse(localStorage.getItem("Wishlist"))?.filter(product=>{return product.id===id })[0]
            addToCart(product,1,'Cart')
            ShoppingCart()
        })
        const Remove=tr.querySelector(".product-remove")
        Remove.addEventListener("click",()=>{
            const id=parseInt(Remove.parentElement.getAttribute("id"))
            const product=JSON.parse(localStorage.getItem("Wishlist"))?.filter(product=>{return product.id===id })[0]
            Removewishlist(product)
            WishList()
        })

    })

}

ShoppingCart()
WishList()

//Refresh Cart
RefreshCart()



function dec(id,price,pr){
    const cartpulsminus=document.querySelector(`td[id='${id}']`)
    const Totalproduct=cartpulsminus.parentElement.querySelector('.product-subtotal')
    let value=parseInt(cartpulsminus.querySelector("input").value)
    if (value>1){
        value--
    }
    cartpulsminus.querySelector("input").value=value
    Totalproduct.textContent="$"+(value*price).toFixed(2)
    addToCart(pr,value,'Cart')
}

function inc(id,price,pr) {
    const cartpulsminus=document.querySelector(`td[id='${id}']`)
    const Totalproduct=cartpulsminus.parentElement.querySelector('.product-subtotal')
    let value=parseInt(cartpulsminus.querySelector("input").value)
    value++
    cartpulsminus.querySelector("input").value=value
    Totalproduct.textContent="$"+(value*price).toFixed(2)
    addToCart(pr,value,'Cart')
}


