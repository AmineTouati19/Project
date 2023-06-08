<template>
    <div>
        <nav>
            <img src="../assets/a1.png" >
            <div class="nav-links" id="navlinks">
                <i class="fa fa-times" onclick="hidemenu()"></i>
                <ul style="margin-bottom: 0;">
                <li><router-link :to="{ name: 'AdminHome' }">HOME</router-link></li> 
                <li><a href="#about">CHALLENGES</a></li> 
                <li><a href="#places">PATH</a></li> 
                <li><router-link :to="{ name: 'Schedule' }">SCHEDULE</router-link></li> 
                <li href="Login" @click="logout()">
                <router-link :to="{ name: 'Login' }">LOGOUT</router-link>
                </li>
                                
                </ul>
            </div>
            <i class="fa fa-bars" onclick="showmenu()"></i>
        </nav>
    </div>    
</template>
<script>
export default{
    methods:{
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
    }
}
</script>
<style>
    @import url('https://unpkg.com/aos@next/dist/aos.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
    
    
    * {
        margin:  0;
        padding: 0;
    }
    
    html,body {
        overflow-x: hidden;
    }
    
    nav {
        display: flex;
        padding: 0.9%;
        justify-content: space-between;
        align-items: center;
        background-color: #000f15;
    }
    nav img {
        margin-top: 5px;
        width: 40px;
        cursor: pointer;
    
    }
    
    .nav-links {
        flex: 1;
        text-align: right;
        font-size: x-small;
        cursor: pointer;
        transition: 0.6s;
    }
    .nav-links ul li {
        list-style: none;
        display: inline-block;
        padding: 0 25px;
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
    nav .fa{
        display: none;
    }
    @media(max-width: 700px){
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
        margin-bottom:0 ;
        }
    }
    



</style>