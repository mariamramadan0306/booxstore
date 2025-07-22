"use strict";
let fn;
let sn;
let em;
let pn;
let items = 0;
if (document.title === "Boxtore") {
  fn = document.querySelector(".fname");
  sn = document.querySelector(".sname");
  em = document.querySelector(".email");
  pn = document.querySelector(".phone");

  let msg0 = document.querySelector(".error0");
  let msg1 = document.querySelector(".error1");
  let msg2 = document.querySelector(".error2");
  let msg3 = document.querySelector(".error3");
  let cor = true;

  document.querySelector(".submit").addEventListener("click", function (e) {
    e.preventDefault();
    if (fn.value == "") {
      cor = false;
      msg0.textContent = "*please enter your first name";
      msg0.classList.add("error-css");
      fn.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (fn.style.border = "none"), 3000);
    } else {
      fn.style.border = "solid green 3px";
    }
    if (sn.value == "") {
      cor = false;
      msg1.textContent = "*please enter your second name";
      msg1.classList.add("error-css");
      sn.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (sn.style.border = "none"), 3000);
    } else {
      sn.style.border = "solid green 3px";
    }
    if (em.value == "") {
      cor = false;
      msg2.textContent = "*please enter your email";
      msg2.classList.add("error-css");
      em.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (em.style.border = "none"), 3000);
    } else {
      em.style.border = "solid green 3px";
    }
    if (pn.value == "") {
      cor = false;
      msg3.textContent = "*please enter yourphone number";
      msg3.classList.add("error-css");
      pn.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (pn.style.border = "none"), 3000);
    } else {
      pn.style.border = "solid green 3px";
    }

    setTimeout(() => (msg0.textContent = ""), 3000);
    setTimeout(() => (msg1.textContent = ""), 3000);
    setTimeout(() => (msg2.textContent = ""), 3000);
    setTimeout(() => (msg3.textContent = ""), 3000);
    if (!cor) {
      cor = true;
    } else {
      localStorage.setItem("firstname", fn.value.trim());
      localStorage.setItem("secondname", sn.value.trim());
      localStorage.setItem("email", em.value.trim());
      localStorage.setItem("phone", pn.value.trim());
      window.location.href = "home.html";
    }
  });
}
if (document.title === "Home Page") {
  let name = localStorage.getItem("firstname");
  let name2 = localStorage.getItem("secondname");
  let emaill = localStorage.getItem("email");
  let myphone = localStorage.getItem("phone");
  document.querySelector(".My-Profile").textContent = `${name} ${name2}`;
  const buybtn = document.querySelectorAll(".buy");
  buybtn.forEach((button) => {
    button.addEventListener("click", function () {
      const parent = button.parentElement;
      const image = parent.querySelector("img");
      const imagesource = image ? image.src : null;
      localStorage.setItem("imagesrc", imagesource);
      const pageparent = parent.parentElement;
      let pagetype;
      if (pageparent.className === "Top-trending-books")
        pagetype = "Top trending";
      else if (pageparent.className === "You-may-like")
        pagetype = "You may like";
      else if (pageparent.className === "Other") pagetype = "Other";
      localStorage.setItem("pagetype", pagetype);
      const novname = parent.querySelector(".nov-name").textContent;
      localStorage.setItem("novelname", novname);
      const novrate = parent.querySelector(".nov-rate").textContent;
      localStorage.setItem("novelrate", novrate);
      const novprice = parent.querySelector(".nov-price").textContent;
      localStorage.setItem("novelprice", novprice);
      window.location.href = "novel1.html";
    });
  });
}
if (document.title === "Product details") {
  let novimg = localStorage.getItem("imagesrc");
  let type = localStorage.getItem("pagetype");
  let nameofnov = localStorage.getItem("novelname");
  let rateofnov = localStorage.getItem("novelrate");
  let priceofnov = localStorage.getItem("novelprice");
  document.querySelector(".img1").src = `${novimg}`;
  document.querySelector(".page-type").textContent = `${type}`;
  document.querySelector(".tit").textContent = `${nameofnov}`;
  document.querySelector(".Rating").textContent = `${rateofnov}`;
  document.querySelector(".price").textContent = `${priceofnov}`;
  document.querySelector(".add-to-cart").addEventListener("click", function () {
    const numofbooks = document.querySelector(".num-of-books").value;
    let booknum;
    let books = JSON.parse(localStorage.getItem("bookdata")) || {};
    if (!numofbooks) booknum = 1;
    else booknum = numofbooks;
    const newKey = `item${Object.keys(books).length + 1}`;
    books[newKey] = {
      numoftype: booknum,
      src: novimg,
      name: nameofnov,
      price: priceofnov,
    };
    localStorage.setItem("bookdata", JSON.stringify(books));
  });
}
if (document.title === "Cart") {
  const data = JSON.parse(localStorage.getItem("bookdata")) || {};
  const cart = document.querySelector(".cart-div");

  if (Object.keys(data).length === 0) {
    cart.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    Object.entries(data).forEach(([key, b]) => {
      const card = document.createElement("div");
      card.classList.add("cart-item");
      card.innerHTML = `
        <img src="${b.src}" class="cart-img" />
        <p class="cart-title">${b.name}</p>
        <p class="cart-qty">Quantity: ${b.numoftype}</p>
        <p class="cart-price">Price of one: ${b.price}</p>
        <hr>
      `;
      cart.appendChild(card);
    });
  }
}
if (document.title === "Purchase") {
  let cor = true;
  let msg0 = document.querySelector(".error0");
  let msg1 = document.querySelector(".error1");
  let msg2 = document.querySelector(".error2");
  let msg3 = document.querySelector(".error3");
  let myfirstname = localStorage.getItem("firstname");
  let mysecondname = localStorage.getItem("secondname");
  let myemail = localStorage.getItem("email");
  const mfn = document.querySelector(".fname");
  const msn = document.querySelector(".sname");
  const mem = document.querySelector(".email");
  const phonee = document.querySelector(".phone");
  mfn.value = myfirstname;
  msn.value = mysecondname;
  mem.value = myemail;
  mfn.style.background = "lightgrey";
  msn.style.background = "lightgrey";
  mem.style.background = "lightgrey";
  mfn.addEventListener("input", function () {
    mfn.style.background = "white";
    mfn.style.border = "none";
    if (mfn.value === myfirstname) {
      mfn.style.background = "lightgrey";
    }
  });
  msn.addEventListener("input", function () {
    msn.style.background = "white";
    msn.style.border = "none";
    if (msn.value === mysecondname) msn.style.background = "lightgrey";
  });
  mem.addEventListener("input", function () {
    mem.style.background = "white";
    mem.style.border = "none";
    if (mem.value === myemail) mem.style.background = "lightgrey";
  });
  document.querySelector(".submit").addEventListener("click", function (e) {
    e.preventDefault();
    if (mfn.value == "") {
      cor = false;
      msg0.textContent = "*please enter your first name";
      msg0.classList.add("error-css");
      mfn.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (mfn.style.border = "none"), 3000);
    } else {
      mfn.style.border = "solid green 3px";
    }
    if (msn.value == "") {
      cor = false;
      msg1.textContent = "*please enter your second name";
      msg1.classList.add("error-css");
      msn.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (msn.style.border = "none"), 3000);
    } else {
      msn.style.border = "solid green 3px";
    }
    if (mem.value == "") {
      cor = false;
      msg2.textContent = "*please enter your email";
      msg2.classList.add("error-css");
      mem.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (mem.style.border = "none"), 3000);
    } else {
      mem.style.border = "solid green 3px";
    }
    if (phonee.value == "") {
      cor = false;
      msg3.textContent = "*please enter yourphone number";
      msg3.classList.add("error-css");
      phonee.style.border = "solid rgb(184, 45, 45) 3px";
      setTimeout(() => (phonee.style.border = "none"), 3000);
    } else {
      phonee.style.border = "solid green 3px";
    }

    setTimeout(() => (msg0.textContent = ""), 3000);
    setTimeout(() => (msg1.textContent = ""), 3000);
    setTimeout(() => (msg2.textContent = ""), 3000);
    setTimeout(() => (msg3.textContent = ""), 3000);
    if (!cor) {
      cor = true;
    } else {
      const mes = document.querySelector(".mes-container");
      const message = document.createElement("div");
      message.innerHTML = `<p class="message">Succeded,Thanks ${mfn.value} for buying from out store</p>`;
      mes.appendChild(message);
      setTimeout(() => (message.textContent = ""), 2000);
    }
  });
}
