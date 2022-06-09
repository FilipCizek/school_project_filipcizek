let slideIndex = -1;
showSlides();
datum();

function showSlides() {
  let i;
  let slides = ["img/img_1.jpg", "img/img_2.jpg", "img/img_3.jpg", "img/img_4.jpg"]
  slideIndex++;
  if (slideIndex >= slides.length) {slideIndex = 0}    
  
  document.getElementById("header").style.backgroundImage = "url(" + slides[slideIndex] + ")";
  setTimeout(showSlides, 3000);
}

function openTab(evt, section) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(section).style.display = "block";
  evt.currentTarget.className += " active";
}

function rgb() {
  var min = 0, max = 200;
  let r = Math.random() * (max - min);
  let g = Math.random() * (max - min); 
  let b = Math.random() * (max - min);
  document.getElementById("vypis").style.color = "rgb(" + r + "," + b + "," + g + ")";
}

function vypsat() {
  let name = document.forms["kontakt"]["name"].value;
  let email = document.forms["kontakt"]["email"].value;
  let zprava = document.forms["kontakt"]["zprava"].innerHTML;
  if (name == "" || email == "" || zprava == "") {
    document.getElementById("vypis").innerHTML = "Zadejte chybějící údaje!"
  }
  else {
    document.getElementById("vypis").innerHTML = "Vaše zpráva byla odeslána pod jménem " + name + " a e-mailovou adresou " + email;
  }
    name = email = zprava = null;
}

function datum() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  document.getElementById("datum").innerHTML = dateTime;
  setTimeout(datum, 1000);
}

function mouseOver(id) {
  document.getElementById(id).style.fontSize = "30px";
}

function mouseOut(id) {
  document.getElementById(id).style.fontSize = "20px";
}

function validateEmail() {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let email = document.forms["kontakt"]["email"].value;
  if(!email.match(mailformat)) {
    window.alert("Zadali jste špatnou e-mailovou adresu!");
  }
}