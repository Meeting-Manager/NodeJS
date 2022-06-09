window.addEventListener('load', (event) => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if(urlParams.has('fromShoppingBag')){
    document.getElementById("ItemsCountText").innerHTML=parseInt(sessionStorage.getItem("ItemsCount"));
  }
  else{
    sessionStorage.setItem("ItemsCount",0);
  }

  getAllProducts();
  getallCategories();

  });

function getAllProducts(){

    fetch('/product')
      .then(response => response.json())
      .then(data => drawProducts(data));
    }
    


function getallCategories(){
    fetch('/category')
    .then(response => response.json())
    .then(data => drawCategories(data));

  }

function drawProducts(products){
    document.getElementById("PoductList").innerHTML="";
    temp = document.getElementById("temp-card");    
    products.forEach(p=>drawProduct(p,temp));
}

function drawCategories(categories) {

    temp = document.getElementById("temp-category");  
    categories.forEach(c=>drawCategory(c,temp));

  }
  function getProductsByCategoryId(category) {
    let url = '/product?category='+category
    // categories.forEach(cat =>
    //     url += 'category=' + cat + '&'
    // )
    // url.substring(0, url.length - 1);
    fetch(url)
        .then(res => res.json())
        .then(res => drawProducts(res))
        .catch(err => alert(err))
}

// function getProductsByCategory(id){
//   // fetch('/product?category='+id)
//   //     .then(response => response.json())
//   //     .then(data => drawProducts(data));
//   const allCategories=document.getElementById("CategoryList").children;
//   console.log(allCategories[0])


//   debugger;
// }

function drawCategory(category,temp) {
    const clonCategory = temp.content.cloneNode(true);
    clonCategory.querySelector(".OptionName").innerText =category.name;
    // clonCategory.querySelector("input").addEventListener("change",  ()=> {
    //         getProductsByCategory(category)});
    let cd=clonCategory.querySelector("#category")
    cd.addEventListener("change",  ()=> {
      debugger
      if(cd.checked)
    getProductsByCategoryId(category._id)});
   
    document.getElementById("CategoryList").appendChild(clonCategory);

  }

function drawProduct(product,temp) {
    const clonProducts = temp.content.cloneNode(true);
    clonProducts.querySelector("img").src = "../animals/" + product.imgName+".jpg";
    clonProducts.querySelector("h1").innerText =product.name;
    clonProducts.querySelector(".price").innerText = "₪" +product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("button").addEventListener("click",  ()=> {
        addToCart(product)
    });

    document.getElementById("PoductList").appendChild(clonProducts);
}

function addToCart(product){
  let products=[];
  let boolExist=false;

  if(parseInt(document.getElementById("ItemsCountText").innerHTML)>0){
    products = JSON.parse(sessionStorage.getItem("my_products")); //get them back

    products.forEach(p=>{
      if(p["product"]._id==product._id){
       boolExist=true;
       p["quantity"]+=1;
     }});
  }
  else{
    
  }

  if(!boolExist){
    products.push({"product":product,"quantity":1});
  }
  sessionStorage.setItem("ItemsCount", JSON.stringify(parseInt(sessionStorage.getItem("ItemsCount"))+1));
  document.getElementById("ItemsCountText").innerHTML=parseInt(sessionStorage.getItem("ItemsCount"));
  sessionStorage.setItem("my_products", JSON.stringify(products)); //store products
}
function TrackLinkID(any){

}