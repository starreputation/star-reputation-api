/* =========================
CUSTOMER DATABASE
========================= */

const customers=[
"1xk4fsh1","351xoqj5","m3bxgivi","ogq4zivx","bve1y3s3",
"kj5za7d9","wq2np704","et2by2rl","3amono96","ayiaiyht",
"3d4lw03x","v614avpu","487t3gbu","cg9h03d9","x54tf2qh",
"1g2fev92","oayoypq0","uwzy5fgs","5ujfw31f","ry4xecw0",
"n4aebfk0","q0jyuqg6","phymdzvq","a8f85cni","bfjv5yeb",
"edobjr6k","i7x9jhq6","v4i9xx79","i4ubkyva","tok90oyf",
"qbu37d5u","g6r3jg50","aw3kih59","oivpl1g4","28v3fe18",
"e1fqupue","ngmgyfin","80195rwe","cnyvuvzp","9rgzhkf5",
"id2z4c81","hx04zsa9","qopnkdp1","vjwpb07d","h4h47e96",
"15xjvzz1","qpsxxrs2","39ksptsl","w2702f2s","3qi6wx2p"
]

/* =========================
AUTO LOGIN SESSION
========================= */

window.onload=function(){

let customer=localStorage.getItem("customer")

if(customer){

document.getElementById("loginPage").style.display="none"
document.getElementById("panel").style.display="block"

document.getElementById("welcome").innerText="Welcome Customer: "+customer

loadProfile()
openTab("dashboard")

}

}

/* =========================
LOGIN SYSTEM
========================= */

function login(){

let user=document.getElementById("user").value.trim()
let pass=document.getElementById("pass").value.trim()

if(customers.includes(user) && pass==="1234567"){

localStorage.setItem("customer",user)

location.reload()

}else{

alert("Invalid Customer ID or Password")

}

}

/* =========================
LOGOUT
========================= */

function logout(){

localStorage.removeItem("customer")
location.reload()

}

/* =========================
TAB SYSTEM
========================= */

function openTab(tab){

document.querySelectorAll(".tab").forEach(t=>t.style.display="none")

document.getElementById(tab).style.display="block"

if(tab==="dashboard") loadReviews()

}

/* =========================
PROFILE LOAD
========================= */

function loadProfile(){

let code=localStorage.getItem("customer")

let feedbackLink=window.location.origin+"/feedback.html?c="+code

document.getElementById("code").value=code
document.getElementById("reviewLink").value=feedbackLink

document.getElementById("feedbackLink").innerText=feedbackLink
document.getElementById("feedbackLink").href=feedbackLink

document.getElementById("qr").src=
"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(feedbackLink)

}

/* =========================
SUBMIT REVIEW
========================= */

function submitReview(){

let url=new URLSearchParams(window.location.search)

let customer=url.get("c")

let reviews=JSON.parse(localStorage.getItem("reviews"))||[]

let r={

customer:customer,
name:document.getElementById("name").value,
contact:document.getElementById("contact").value,
rating:Number(document.getElementById("rating").value),
message:document.getElementById("message").value,
date:new Date().toLocaleDateString()

}

reviews.push(r)

localStorage.setItem("reviews",JSON.stringify(reviews))

if(r.rating>=4){

window.location="https://maps.app.goo.gl/J9M99u2jlDth9inz8"

}else{

alert("Thank you for your feedback")

}

}

/* =========================
LOAD REVIEWS
========================= */

function loadReviews(){

let reviews=JSON.parse(localStorage.getItem("reviews"))||[]

let customer=localStorage.getItem("customer")

let data=reviews.filter(r=>r.customer===customer)

let body=document.getElementById("reviewBody")

body.innerHTML=""

let positive=0
let negative=0

data.forEach((r,i)=>{

let stars=""

for(let s=1;s<=5;s++){

stars+=s<=r.rating?"⭐":"☆"

}

body.innerHTML+=`

<tr>
<td>${i+1}</td>
<td>${r.name}</td>
<td>${r.contact}</td>
<td>${stars}</td>
<td>${r.message}</td>
<td>${r.date}</td>
</tr>

`

if(r.rating>=4) positive++
else negative++

})

document.getElementById("total").innerText=data.length
document.getElementById("positive").innerText=positive
document.getElementById("negative").innerText=negative

}

/* =========================
SEARCH REVIEWS
========================= */

function searchReview(){

let input=document.getElementById("search").value.toLowerCase()

document.querySelectorAll("#reviewBody tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(input)?"":"none"

})

}

/* =========================
DOWNLOAD QR
========================= */

function downloadQR(){

let link=document.createElement("a")

link.href=document.getElementById("qr").src
link.download="customer-qr.png"
link.click()

}
