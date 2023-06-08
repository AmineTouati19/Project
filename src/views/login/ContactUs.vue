<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div>
    <div class="contact-section">
    <h1>CONTACT US</h1>
    <br>
    <br>
    <br>
<form class="contact-form" action="cntct.html" method="POST">
<input type="text" class="contact-form-text" placeholder="your username">
<input type="email" class="contact-form-text" placeholder="your email adress">

<textarea class="contact-form-text" placeholder="your message "></textarea>
<input type="button" class="contact-form-btn" value="send" >
</form>
</div>
    <section id="about" class ="footer">
    <h4> ABOUT US </h4>
    <P>“Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello .</P>
        <div class="icons">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
<p> &copy; designed by | MOHAMED AMINE TOUATI</p>
</section>
</div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"    );
* {
    margin: 0;
    padding: 0;
    font-family: "montserrat", sans-serif;
}
.contact-section {
    background: url("../../assets/774373.jpg") ;
    background-position : center;
    background-size: cover;
    padding: 40px 0 ;
}
.contact-section h1 {
    text-align: center;
    color: #ddd;

}
.contact-form {
    max-width: 600px;
    margin: auto;
    padding: 0 10px;
    overflow : hidden;
}
.contact-form-text {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin: 16px 0 ;
    border: 0;
    background :#111;
    padding: 20px 40px;
    outline: none;
    color: #ddd;
    transition: 0.5s;
}
.contact-form-text:focus {
    box-shadow: 0 0 10px  #35345e;
}
textarea.contact-form-text {
    resize: none;
    height: 150px;
}
.contact-form-btn{
    float: right;
    border: 0;
    background: #2980b9;
    color: #fff;
    padding: 12px 50px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.5s;
}
.contact-form-btn:hover {
    background: #053453;

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
}</style>




