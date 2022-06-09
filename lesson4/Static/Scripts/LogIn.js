
function login()
{
    let name = document.getElementById("inp_name").value
    let password = document.getElementById("inp_password").value
    fetch("/user/" + name + "/" + password)
        .then(res => res.json())
        .then((res) => {
            window.location.href = "Products.html";
            sessionStorage.setItem('user', JSON.stringify(res))
        }).catch(error=>alert("user not found"))
}


{

function login_new_user() {
    document.getElementById("div_new_user").style.display = "block";
}


function update_user(){
    const id=JSON.parse(sessionStorage.getItem('user'))._id
    const user={
        mail : document.getElementById("inp_mail_new").value,
        password : document.getElementById("inp_password_new").value,
        name : document.getElementById("inp_name_new").value,
        address : document.getElementById("inp_address_new").value
        }
        fetch("/user/"+id, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((data) => {
                alert("update  " + data.name)
            })

}

function add_new_user()
{
    const user={
    mail : document.getElementById("inp_mail_new").value,
    password : document.getElementById("inp_password_new").value,
    name : document.getElementById("inp_name_new").value,
    address : document.getElementById("inp_address_new").value
    }
    fetch("/user/", {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {debugger; return res.json()})
        
        .then((data) => {debugger;
            alert("Hi to  " + data.name)
        })
}
}