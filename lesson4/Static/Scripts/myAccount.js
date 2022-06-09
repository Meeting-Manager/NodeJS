window.addEventListener('load', (event) => {

      const name=JSON.parse(sessionStorage.getItem("user")).name;
      const password=JSON.parse(sessionStorage.getItem("user")).password;

    getMyOrders(name,password);
  
    });


    function getMyOrders(name,password){
        fetch('/user/'+name+'/'+password)
        .then(response=>response.json())
        .then(data=>{console.log(data);document.getElementById('orders').innerHTML=JSON.stringify(data)})
    }
  