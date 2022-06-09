
window.addEventListener('load', (event) => {
  getMyProcucts();
  document.getElementById("itemCount").innerHTML = sessionStorage.getItem("ItemsCount");

});

// ShoppingBag.html
function getMyProcucts() {
  const products = JSON.parse(sessionStorage.getItem("my_products"));
  drawProducts(products);
}

function drawProducts(products) {
  document.getElementById("tbody").innerHTML = "";
  temp = document.getElementById("temp-row");

  products.forEach(p => {
    drawProduct(p, temp);
  });

  calcTotalAmount(products);
}

function drawProduct(product, temp) {
  const clonProducts = temp.content.cloneNode(true);
  clonProducts.querySelector(".image").style.backgroundImage = "url('../animals/" + product["product"].imgName + ".jpg')";
  clonProducts.querySelector(".itemName").innerText = product["product"].name;
  clonProducts.querySelector(".itemNumber").innerText = product["quantity"];
  clonProducts.querySelector(".price").innerText = "₪" + JSON.stringify(parseInt(product["product"].price) * parseInt(product["quantity"]));
  clonProducts.querySelector(".delete").addEventListener("click", () => {

    removeFromCart(product);
  });

  document.getElementById("tbody").appendChild(clonProducts);

}

function removeFromCart(product) {
  let newProducts = [];
  let products = JSON.parse(sessionStorage.getItem("my_products")); //get them back

  newProducts = products.filter(p => p["product"]._id != product["product"]._id);
  sessionStorage.setItem("ItemsCount", JSON.stringify(parseInt(sessionStorage.getItem("ItemsCount")) - parseInt(product["quantity"])));
  sessionStorage.setItem("my_products", JSON.stringify(newProducts)); //store products
  document.getElementById("itemCount").innerHTML = sessionStorage.getItem("ItemsCount");
  drawProducts(newProducts);
}

function calcTotalAmount(products) {
  let sum = 0;
  products.forEach(p => {
    sum += parseInt(p["product"].price) * parseInt(p["quantity"])
  });

  document.getElementById("totalAmount").innerHTML = sum;
}
function myFunction(product) {
  const p = { "id": product["product"]._id, "quantity": product["quantity"] };
  return p;
}



// function placeOrder(){
//   debugger;
//   let order={
//    user:JSON.parse(sessionStorage.getItem('user')),
//    products:JSON.parse(sessionStorage.getItem('shoppingBag')),
//    sum: document.getElementById('totalAmount').innerHTML,
//    date:new Date()
//   }
//   let x = fetch("api/order/",
//   {
//       method: 'POST',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify(order)
//   })
//   .then(response => response.json())
//   .then((data) => {
//       alert("order  " + data._id + " wes  placed successfully !!!!")
//   })
//   .catch(error => alert("catch"));


function placeOrder() {
  let products = JSON.parse(sessionStorage.getItem("my_products"));
  let myProducts = products.map(p => myFunction(p))
  const newOrder = {
    sum: parseInt(document.getElementById("totalAmount").innerHTML),
    date: Date.now(),
    user: JSON.parse(sessionStorage.getItem("user"))._id,
    items: myProducts,

  }



  fetch('/order/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  })
    .then(response => response.json()).then(data => {
      console.log(data);
      alert("order num" + data._id)

    })
    .catch(err => {
      console.log(err)
    })
}