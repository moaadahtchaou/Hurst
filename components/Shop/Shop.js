import {GetAllProducts,RefreshCart,addToCart,CreateModal,name,RefreshButtonswishlist,AddWishlist} from "../Start.js"
//Refresh Cart
RefreshCart()
//filter
let filter={"Categories":[],"Price":[],"Color":[]}
// Add style For Minus Plus button
const file=location.pathname.split("/")
file.pop()
let pathcss="/"+file.join("")+"/components/Shop/styles.css"
var link = document.createElement( "link" );
link.href = pathcss
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link)

//Get prodcts 
GetAllProducts().then((products)=>{
    //initial
    Pagination(products,1)

    CreateFilters(products)





})
const CreateFilters=(products)=>{
    // Price Filter
    let Slide =document.querySelector(".ui-slider-range.ui-widget-header.ui-corner-all")
    let ids
    const resizeObserver = new ResizeObserver(entries => {
            clearTimeout(ids)
            ids= setTimeout(() => {
                let Price=document.querySelector("#amount").value
                let PriceSplit = Price
                .split('-')
                .map(str => parseInt(str.replace(/\D/g, ''), 10));
                filter.Price=PriceSplit
                console.log("change pRICE",filter)
                ApplyFilter(products)
        }, 800);
    });
    resizeObserver.observe(Slide);
    //Categories
    let treeview=document.querySelectorAll("#cat-treeview >.treeview .treeview li a")
    treeview.forEach((Tag)=>{
        Tag.onclick=()=>{
            let tag=Tag.classList.contains("Active-Tag")
            let text= Tag.textContent.toLowerCase();
            if (!tag){
                Tag.classList.add("Active-Tag")
                filter.Categories.push(text)
                console.log("Add",filter)
            }
            else{
                Tag.classList.remove("Active-Tag")
                filter.Categories=filter.Categories.filter(tags => tags!==text)
                console.log("remove",filter)
            }
            ApplyFilter(products)
        }
    })
    //Color
    let colorsfilter= document.querySelectorAll(".widget-info.color-filter.clearfix li a")
    colorsfilter.forEach((color)=>{
        color.onclick=()=>{
            let tag=color.classList.contains("Active-Tag")
            let text= color.textContent.toLowerCase().replace(/\d+/g, '');
            if (!tag){
                color.classList.add("Active-Tag")
                filter.Color.push(text)
                console.log("Add",filter)
            }
            else{
                color.classList.remove("Active-Tag")
                filter.Color=filter.Color.filter(tags => tags!==text)
                console.log("remove",filter)
            }
            ApplyFilter(products)
        }
    })
}
const ApplyFilter=(products)=>{
    let Filtredproduct=[]
    for (const [key, value] of Object.entries(filter)) {
        console.log(`Key: ${key}, Value: ${value}`);
        if(key==="Categories"){
            for (let index = 0; index < value?.length; index++) {
                let tag = value[index];
                
                let filtred=products.filter(produc=>produc.tags.indexOf(tag)!==-1)
                Filtredproduct=Filtredproduct.concat(filtred)
            }
        }
        else if(key==="Color"){
            for (let index = 0; index < value?.length; index++) {
                let tag = value[index];
                let filtred
                if(Filtredproduct.length) {
                    console.log("dd")
                    filtred=Filtredproduct.filter(produc=>produc.colors.indexOf(tag)!==-1)
                    Filtredproduct=[]
                }
                else{
                    console.log("aa")
                    filtred=products.filter(produc=>produc.colors.indexOf(tag)!==-1)
                }
                
                Filtredproduct=Filtredproduct.concat(filtred)
            }
        }
        else if(key==="Price"){
                let tag = value;
                let filtred
                if(Filtredproduct.length) {
                    console.log("dd")
                    filtred=Filtredproduct.filter(produc=>(tag[0]<produc.price &&produc.price<tag[1]))
                    Filtredproduct=[]
                }
                else{
                    console.log("aa")
                    filtred=products.filter(produc=>(tag[0]<produc.price &&produc.price<tag[1]))
                }
                
                Filtredproduct=Filtredproduct.concat(filtred)
            }
        
    }
    // Remove duplicate products based on id
    Filtredproduct= Filtredproduct.filter(
        (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );
    console.log(Filtredproduct)
    PaginationCounts(Filtredproduct)
}





//fonction for create numbers of pages and their functions
const PaginationCounts=(PC)=>{
    const pages=document.querySelector(".pagination")

    let htmlpages=`<ul>
    <li><a href="#"><i class="zmdi zmdi-long-arrow-left"></i></a></li>`
    for (let index = 0; index < PC.length/12; index++) {
        htmlpages+= `<li><a class="pagescount page${index+1}" href="#">${index+1}</a></li>`
    }
    htmlpages+=`<li><a href="#"><i class="zmdi zmdi-long-arrow-right"></i></a></li>
</ul>`

pages.innerHTML=htmlpages
const btnPages=pages.querySelectorAll(".pagescount")
btnPages.forEach((btnPage)=>{
    const number = parseInt(btnPage.classList[1].match(/\d+/)[0], 10);
    btnPage.addEventListener("click",()=>{Pagination(PC,number)})
})
Pagination(PC,1)

}

const Pagination = (products,numpage)=>{
    const end=12*numpage
    const start=end-12
    const newproducts=products.slice(start,end)
    Paginationhtml(newproducts)
    //Add Event Listener To Cart Button
    let Carts= document.querySelectorAll("a[title='Add To Cart']")
    Carts.forEach((Cart)=>{
                let id=parseInt(Cart.getAttribute("id"))
                Cart.addEventListener("click" ,()=>{addToCart(newproducts.filter((product)=> product.id ===id)[0],1)} )
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
    //Refresh Favorite
    RefreshButtonswishlist()


}

const Paginationhtml=(products)=>{
        const row=document.querySelector("div[class='col-md-12'] div[class='row']")
        let HtmlProduct=``
        products.forEach((product)=>{
        HtmlProduct+=`<div class="col-xl-3 col-md-4" xpath="1">
                                <div class="single-product" id=${product.id} title="${product.name}">
                                    <div class="product-img">
                                `
         //Check if need to add new Or sale Tag
        if(product.SalesInfo.Solde_Out===true) HtmlProduct+=`<span class="pro-label sale-label">sale</span>`
        else if (product.SalesInfo.new===true) HtmlProduct+=`<span class="pro-label new-label">new</span>`
        //Calcul Discount 

        if(product.SalesInfo.Discount) {
            let price=product.price
            let pricediscount=price -((product.SalesInfo.Discount/100)*price)
            HtmlProduct+=`<span class="pro-price-2">
            <span class="pro-price">$ ${pricediscount.toFixed(2)}</span>
            <span class="pro-price discounts">${price}</span>
            </span>`
        }
        else{
            HtmlProduct+=`<span class="pro-price-2">$ ${product.price}</span>`
        }
        //
        HtmlProduct+=`<a href="single-product.html?${product.id}"><img src="${product.imgmain}" alt=""></a>
        </div>
        <div class="product-info clearfix text-center">
            <div class="fix">
                <h4 class="post-title"><a href="single-product.html?${product.id}" title="${product.name}"  >${name(product.name)}</a></h4>
            </div>
            <div class="fix">
            <span class="pro-rating">`
        // Calcul Star Rating
        let Rating=product.rating
        for (let index = 0; index < 5; index++) {
                if (Rating >1) HtmlProduct+=`<a href="#"><i class="zmdi zmdi-star"></i></a>`
                else if (Rating>0.2) HtmlProduct+=`<a href="#"><i class="zmdi zmdi-star-half"></i></a>`
                else HtmlProduct+=`<a href="#"><i class="zmdi zmdi-star-outline"></i></a>`
                Rating--
        }
        HtmlProduct+=`</span>
        </div>
        <div class="product-action clearfix">
            <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Wishlist" id=${product.id}><i class="zmdi zmdi-favorite-outline"></i></a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#productModal" title="Quick View" id=${product.id}><i class="zmdi zmdi-zoom-in"></i></a>
            <a href="#" data-bs-toggle="tooltip" data-placement="top" id=${product.id} title="Add To Cart"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
        </div>
    </div>
</div>
</div>`
    })
    row.innerHTML= HtmlProduct
}
