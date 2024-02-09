// Add style For slideBar Index Page
const file=location.pathname.split("/")
file.pop()
let pathcss="/"+file.join("")+"/components/Slider/styles.css"
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