function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

if(email && password){

localStorage.setItem("user",email)

window.location="dashboard.html"

}else{

alert("Enter login details")

}

}

function submitReview(){

let rating=document.getElementById("rating").value

if(rating>=4){

window.location="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"

}else{

alert("Please share feedback privately")

}

}
