import  {extractDomain} from "../Start.js"

// Add style For slideBar Index Page
const Domain= extractDomain(location.href)==="furniture-iota-nine.vercel.app"? "Vercel":"Html"

const file=location.pathname.split("/")
file.pop()
let pathcss=""
if(Domain==="Vercel"){

    pathcss=file.join("")+"/components/Slider/styles.css"
}
else{
    pathcss="/"+file.join("")+"/components/Slider/styles.css"

}
var link = document.createElement( "link" );
link.href = pathcss
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link)

export const Createswiper= () =>{
    const swiper= new Swiper('.swiper', {
        slidesPerView: 1,
        direction:"horizontal",
        navigation: {
          nextEl: '.but-next',
          prevEl: '.but-prev',
        },
        breakpoints: {
            // when window width is >= 760px
            767: {
              slidesPerView: 2,
            },
            992:{
                slidesPerView: 3,
            },
            1200:{
                slidesPerView: 4,
            }
        }
      });
} 
export const CreateDiscountSwiper=()=>{
  // Initialize Swiper
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
      }
    });
}