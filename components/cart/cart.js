import  {GetAllProducts,RefreshCart,addToCart,CreateModal,name,RemoveFromCart} from "../Start.js"

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
                    <h4 class="post-title"><a class="text-light-black" href="single-product.html?${prod.product.id}">${name(prod.product.name,26)}</a></h4>
                </div>
            </div>
            <!-- Single-product end -->												
        </td>
        <td class="product-price">$${prod.product.price}</td>
        <td class="product-quantity" id="${prod.product.id}">
            <div class="cart-plus-minus"><div class="dec qtybutton">-</div>
                <input type="text" value="${prod.Quantity}" name="qtybutton" class="cart-plus-minus-box">
            <div class="inc qtybutton">+</div></div>
        </td>
        <td class="product-subtotal">$${(prod.Quantity*prod.product.price).toFixed(2)}</td>
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
        cartpulsminus.querySelector(".dec").addEventListener("click",()=>{
            console.log("minus")
            dec(id,priceproduct)
        })
        cartpulsminus.querySelector(".inc").addEventListener("click",()=>{
            console.log("inc")
            inc(id,priceproduct)
        })
        PM.parentElement.querySelector(".product-remove a").addEventListener("click",()=>{
            RemoveFromCart(id)
            ShoppingCart()

        })

    })
    
}



ShoppingCart()
//Refresh Cart
RefreshCart()



function dec(id,price){
    const cartpulsminus=document.querySelector(`td[id='${id}']`)
    const Totalproduct=cartpulsminus.parentElement.querySelector('.product-subtotal')
    let value=parseInt(cartpulsminus.querySelector("input").value)
    if (value>=1){
        value--
    }
    cartpulsminus.querySelector("input").value=value
    Totalproduct.textContent=(value*price).toFixed(2)
}

function inc(id,price) {
    const cartpulsminus=document.querySelector(`td[id='${id}']`)
    const Totalproduct=cartpulsminus.parentElement.querySelector('.product-subtotal')
    let value=parseInt(cartpulsminus.querySelector("input").value)
    value++
    cartpulsminus.querySelector("input").value=value
    Totalproduct.textContent=(value*price).toFixed(2)
}


