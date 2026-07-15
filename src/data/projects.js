// Data projects 
// image 
import ecommerceImg from "../assets/ecommerce store.webp"
import hospitalImg from "../assets/hospital modern.jpg"
import horrorImg from "../assets/horror dark game.jpg"
import educationImg  from "../assets/online learing platform.jpg"
import restaurantImg from "../assets/restaurant food.jpg"
import gymImg  from "../assets/gym.jpg"
import tutorstudentImg from "../assets/tutor student.jpg"
import coffeeshopImg from "../assets/coffe shop.jpg"
import designagenImg from"../assets/design agency.jpg"
import todoListImg  from "../assets/todo list.jpg"
import loginImg from "../assets/login.jpg"
import simplestoreImg  from "../assets/simple store.jpg"

export const projects=[
    // ======= Advanced =====
  
      {
        id:"ecommerce-store ",
        title:"E-commerce Store ",
        level:"advanced",
        description:"A complete online store with full shopping features, build with a profesional, production-ready approach",
        stack:["React" ,"Tailwind Css", "GSAP","Node.js",], 
        image:ecommerceImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
      {
        id:"hospital-website ",
        title:"Hospital WEbsite ",
        level:"advanced",
        description:"A full hospital platform with appointment booking, departments,and doctor profiles",
        stack:["React" ,"Tailwind Css", "GSAP","Node.js",], 
        image:hospitalImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
  {
        id:"horror-game",
        title:"Horror Game ",
        level:"advanced",
        description:"An interactive horror-themed web game built with advanced animations and effects.",
        stack:["React" ,"Tailwind Css", "GSAP","Node.js",], 
        image:horrorImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
      {
        id:"educational-platform",
        title:"Educational Center Platform",
        level:"advanced",
        description:"A complete educational center platform - frontend and backend fully built.",
        stack:["React" ,"Css", "Node.js","Express","MongoDB"], 
        image:educationImg,
        comingSoon:false,
        liveUrl:"https://eduhub-production-aa01.up.railway.app",
        githubUrl:"https://github.com/sayedmadain887-dev/EduHub.git",

    },
    {
         id:"design",
        title:"Design Agency Websit ",
        level:"advanced",
        description:"A design agency website with prortfolio showcase and service pages. .",
        stack:["React" ,"Tailwind Css", "GSAP","Node.js",], 
        image:designagenImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",
    },
//  ====== intermediate ========
  {
        id:"restaurant- website  ",
        title:"Restaurant- Website ",
        level:"intermediate",
        description:"A restaurant website with menu,gallery ,and reservation sections",
        stack:["React" , "Css","Node.js",], 
        image:restaurantImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
     {
        id:"gym-website  ",
        title:"Gym website ",
        level:"intermediate",
        description:"A gym website showcasing classes,trainers,and membership plans.",
        stack:["React" , "Css","Node.js",], 
        image:gymImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
     {
        id:"tutor-platform  ",
        title:"Tutor Platform ",
        level:"intermediate",
        description:"A platform for a tutor to showcase lessons and connect with students.",
        stack:["React" , "Css","Node.js",], 

        image:tutorstudentImg ,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
     {
        id:"coffee-shop  ",
        title:"Coffee Shop  Website ",
        level:"intermediate",
        description:"A coffee shop website with menu and brand-focused design",
        stack:["React" , "Css","Node.js",], 
        image:coffeeshopImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
    //  ===== Basic =====
    
     {
        id:"simple-store ",
        title:"Simple Store",
        level:"basic",
        description:"A simple store front with product",
        stack:["Html" , "Css","javascript",], 
        image:simplestoreImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
     {
        id:"company-login ",
        title:"Company Login page",
        level:"basic",
        description:"A clean login page",
        stack:["Html" , "Css","javascript",], 
        image: loginImg ,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
     {
        id:"todo-list ",
        title:"To-Do List",
        level:"basic",
        description:"A simple store to-do list app to add.",
        stack:["Html" , "Css","javascript",], 
        image: todoListImg,
        comingSoon:true,
        liveUrl:"",
        gitthubUrl:"",

    },
    

    





   

]
// used by the filter sidebar in projects.js
export const LEVELS=[
    
    {key:"all" , label:"All Projects"},
    {key:"basic",label:"Basic"},
    {key:"intermediate",label:"Intermediate"},
    {key:"advanced",label:"Advanced"},
]