<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="with=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" 
integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" 
crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<link rel="stylesheet" href="style.css">
<title>TRAVELWITH ME.</title>
</head>
<body>
    

<section class="header">
    <nav>
            <img src="../../assets/a.png" >
            <div class="nav-links" id="navlinks">
    <i class="fa fa-times" onclick="hidemenu()"></i>
    <ul>
        <li>
            <a href="instructorchallenges" >  
          <router-link :to="{ name: 'InstructorChallenges' }"></router-link>CHALLENGES
    </a>    
        </li>
        
        <li><a href="">PATHS</a></li>
        <li><a href="">UPGRADE</a></li>
        <li><a href="">NEWS</a></li>
        
        
    </ul>
</div>

            <i class="fa fa-bars" onclick="showmenu()"></i>
            </nav>
    <div class="text-box">
        <h1> WELCOME </h1>
        <p>“It is good to have an end to journey toward, but it is the journey that matters in the end.” <br> Aacedimy wish you a good journey</p>
        <a href="company1" class="hero-btn">Start creating your job offers</a>
    </div>
</section>

</body>
</html>
</template>
<style>
* {
    margin:  0;
    padding: 0;
}

html,body {
    overflow-x: hidden;
}
.header {
min-height: 100vh;
width: 100%;
background-image: linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)), url(../../assets/HD-wallpaper-security-concept-digital-art-creative-3d-lock-computer-security-scanning-security.jpg);
background-position: center;
background-size: cover;
position: relative;
}
nav {
    display: flex;
    padding: 0.9%;
    justify-content: space-between;
    align-items: center;
}
nav img {
    width: 150px;
    cursor: pointer;

}

.nav-links {
    flex: 1;
    text-align: right;
    cursor: pointer;
    transition: 0.6s;
}
.nav-links ul li {
    list-style: none;
    display: inline-block;
    padding: 20px 50px;
    position: relative;
}
.nav-links ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 20px;
}
.nav-links ul li::after {
    content: '';
    width: 0%;
    height: 2px;
    background:#2980b9;
    display: block;
    margin: auto;
    transition: 0.5s;
}
.nav-links ul li:hover::after {
    width: 100%;

}
.text-box {
    width: 90%;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    
}
.text-box h1 {
    font-size: 62px;
    cursor: pointer;

}
.text-box p {
    margin: 10px 0 40px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  
}
.hero-btn {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    border: 1px solid #fff;
    padding: 12px 34px;
    font-size: 13px;
    background: transparent;
    position: relative;
    cursor: pointer;
   
}
.hero-btn:hover {
    border: 1px solid #2980b9;
    background: #2980b9;
    color: white;
    transition: 1s;
} 
nav .fa{
    display: none;
}
@media(max-width: 700px){
    .text-box h1 {
        font-size: 20px;
    }
    .nav-links ul li {
        display: block;
    }
   
    .nav-links {
        position: absolute;
        background: rgba(255, 2, 0, 0.377);
        height: 100vh;
        width: 200px;
        top: 0;
        right: -200px;
        text-align: left;
        z-index: 2;
        transition: 1s;
    }
  
    nav .fa {
        display: block;
        color: #fff;
        margin: 10px;
        font-size: 22px;
        cursor: pointer;
    }
    .nav-links ul {
    padding: 20px;
    }
}

.course {
    width: 80%;
    margin: auto;
    text-align: center;
    padding-top:100px;
}
h1 {
    font-size: 36px;
    font-weight: 600;
}
p {
    color: #777;
    font-size: 14px;
    font-weight: 300;
    line-height: 22px;
    padding: 10px;
}
.row {
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
}
.course-col {
    flex-basis: 31%;
    background: #d8d193;
    border-radius: 10px;
    border-bottom: 5%;
    padding: 20px 12px;
    box-sizing: border-box;
    transition: 0.3s;
}
h3 {
    text-align: center;
    font-weight: 600;
    margin: 10px 0 ;
}
.course-col:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 2);
}
@media(max-width : 700px) {
    .row {
        flex-direction: column;
    
    }
    .course-col {
        padding : 2px 3px;
    }
}

.campus {
    width: 80%;
    margin: auto;
    text-align: center;
    padding-top: 50px;
}
.campus-col {
    flex-basis: 32%;
    border-radius: 10px;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
}
.campus-col img {
    width:100% ;
    display: block;
}
.layer {
   
    background: transparent;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left:0;
    transition: 0.5s;
}
.layer:hover {
    background:rgba(226,0,0,0.7) ;
}
.layer h3 {
    width: 100%;
    font-weight: 500;
    color: #fff;
    font-size: 26px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    transition: 0.5s;
}
.layer:hover h3 {
    bottom: 49%;
    opacity: 1;
}

.facilities {
    width: 80%;
    margin: auto;
    text-align: center;
    padding: 10px;
}
.facilities-col {
    flex-basis: 31%;
    border-radius: 10px;
    margin-bottom: 5%;
    text-align: left;
}
.facilities-col img {
    width: 100%;
    border-radius: 10px;
}
.facilities-col p {
    padding: 0;
}
.facilities-col h3 {
    margin-top: 16px;
    margin-bottom: 15px;
    text-align: left;
}
.video {
    width: 80%;
    margin: auto;
    text-align: center;
    padding :50px;
}
.video h1 {
    font-size: 36px;
    font-weight: 600;
}
@media (max-width: 700px) {
    .video-vd {
        
    width: 100%;
         
    }
}


.cta {
    margin:100px auto;
    width: 80%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0,0,0,0.7)), url(../../assets/185289.jpg);
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    text-align: center;
    padding: 100px 0 ;
}
.cta h1 {
    color: #fff;
    margin-bottom: 40px;
    padding: 0;
}
@media (max-width: 700px) {
    .cta h1 {
        font-size: 24px;
    }
}

.footer {
    background-color: #303036;
    color: #d3d3d3;
    width: 100%;
    text-align: center;
    padding: 30px 0 ;

}
.footer h4 {
    margin-bottom: 25px;
    margin-top: 20px;
    font-weight: 600;
}
.icons .fab {
    color: #f44336;
    margin: 0 13px;
    cursor: pointer;
    padding: 18px 0;
}
</style>