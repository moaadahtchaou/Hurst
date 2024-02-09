import {GetAllProducts,RefreshCart,addToCart} from "../Start.js"
//Refresh Cart
RefreshCart()
//Get prodcts 
GetAllProducts().then((products)=>{
    let Slide =document.querySelector(".ui-slider-range.ui-widget-header.ui-corner-all")

        Slide.ondrop= ()=> {
            // some things
            console.log("Drop");
          }
        Slide.ondragleave= ()=> {
            // some things
            console.log("dragleave");
          }
        Slide.onmouseup= ()=> {
            // some things
            console.log("up");
          }
        Slide.ondragover=()=> {
            // some things
            console.log("dragOver");
          }
        Slide.onload=()=> {
            // some things
            console.log("onload");
          }
        Slide.onfocus=()=> {
            // some things
            console.log("focus");
          }
        Slide.onresize=()=> {
            // some things
            console.log("resize");
          }
        Slide.onclick=()=> {
            // some things
            console.log("click");
          }
        Slide.ondragend=()=> {
            // some things
            console.log("dragend");
          }
        Slide.onchange=()=> {
            // some things
            console.log("chane");
          }




    
})
