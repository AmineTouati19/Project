<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <section class="header">
            <nav>
                <img src="@/assets/a.png" >
                <div class="nav-links" id="navlinks">
                    <i class="fa fa-times" onclick="hidemenu()"></i>
                    <ul>
                        <li><a href="">HOME</a></li> 
                        <li><a href="#about">CHALLENGES</a></li> 
                        <li><a href="#places">PATH</a></li> 
                        <li><a href="#contact">ABOUT</a></li> 
                        
                        <li href="Login" @click="logout()">
                            <router-link :to="{ name: 'Login' }"><span>LOGOUT</span></router-link>
                        </li>
                        
                    </ul>
                </div>
            <i class="fa fa-bars" onclick="showmenu()"></i>
            </nav>
            <div class="icon">
                <img class="im" src="@/assets/li.png" alt="">
                </div>
            <div class="text-box">
                <h4>Experience the ultimate</h4>
                <h1> I am  </h1>
                <h1> <span>COMPANY,</span>  </h1>
            </div>
        </section>
        
    </div>
</template>
<script>
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    export default {
        data() {
        return {
            email: '',
            password: '',
            scrollPosition: 0
            }
        },
        methods: {
            logout() {
                sessionStorage.removeItem('account');
                this.$store.state.account={
                    "id": null,
                    "email": null,
                    "username": null,
                    "role": null,
                    "is_verified": null,
                    "image": null,
                    "skills": null
                };
                this.$router.push('/login');
            },
             handleScroll() {
            this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            },
            goToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            }
        },
        computed: {
            showGoToTop() {
            return this.scrollPosition > 0;
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        created() {
            if(this.$store.state.account.role!='company'){
                if(this.$store.state.account.role){
                    this.$router.push('/'+this.$store.state.account.role+'/home');}
                else{
                    this.$router.push('/login');}
            }
            AOS.init({
                offset: 200,
                duration: 2000,
            });
        },
    }
</script>
<style scoped>
    @import url('https://unpkg.com/aos@next/dist/aos.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
    
    
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
    background-image:  url(@/assets/774373.jpg);
    background-position: center;
    background-size: cover;
    position: relative;
    }
    span {
      color: #5FCBE1;
    }
    nav {
        display: flex;
        padding: 0.9%;
        justify-content: space-between;
        align-items: center;
    }
    nav img {
        margin-top: 1px;
        width: 200px;
        cursor: pointer;
    
    }
    
    .nav-links {
        flex: 1;
        text-align: right;
        font-size: x-small;
        cursor: pointer;
        transition: 0.6s;
        margin-top: -40px;
    }
    .nav-links ul li {
        list-style: none;
        display: inline-block;
        padding: 20px 25px;
        position: relative;
    }
    .nav-links ul li a {
        color: #fff;
        text-decoration: none;
        font-size: 17px;
    }
    .nav-links ul li::after {
        content: '';
        width: 0%;
        height: 2px;
        background:#5FCBE1;
        display: block;
        margin: auto;
        transition: 0.5s;
    }
    .nav-links ul li:hover::after {
        width: 100%;
    
    }
    .icon {
        margin-top: 100px;
        position: relative;
        height: 50px;
        width: 50px;
        top: -100px;
        left: 700px;
        
    }
    .icon .im
    {position:relative;
        top: -20px;
        width: 900px;
        height: 600px;
        transform: translateX(0px);
        animation: float 4s ease-out infinite;
    } 
    @keyframes float {
        0% 
        {
            transform: translateY(0px);
        } 50% 
        {
            transform: translateY(-20px);
        }  100% 
        {
            transform: translateY(0px);
        }
    }
    
    .text-box {
        width: 90%;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        
    }
    .text-box h4
    {
        font-size: 20px;
    } 
    .text-box h1 {
        font-size: 62px;
        cursor: pointer;
    
    }
    .text-box span 
    {
        color: #5FCBE1;
    }
    .text-box p {
        margin: 10px 0 40px;
        font-size: 30px;
        color: #fff;
        cursor: pointer;
      
    }
    .hero-btn {
        display: inline-block;
        text-decoration: none;
        color: #fff;
        border: 1px solid #fff;
        padding: 12px 34px;
        font-size: 16px;
        background: transparent;
        position: relative;
        cursor: pointer;
       
    }
    .hero-btn:hover {
        border: 1px solid #5FCBE1;
        background: #5FCBE1;
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
            background: #5fcbe198;
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
        background: #5FCBE1;
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
        background:#5fcbe19b ;
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
        background-image:
        url(@/assets/774373.jpg);
    
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
    background-color: #2980b9;
    color: #111;
    width: 100%;
    text-align: center;
    padding: 30px 0 ;

}
.footer h4 {
    margin-bottom: 25px;
    margin-top: 20px;
    font-weight: 600;
}
p {
    color: #111;
}
.icons .fab {
    color: black;
    margin: 0 13px;
    cursor: pointer;
    padding: 18px 0;
}
.icons .fab:hover 
{
    color: #5FCBE1;
}
.go-to-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #2980b9;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity ;
  }

  .go-to-top-button:hover {
    background-color: #297fb9af;
  }
</style>
    