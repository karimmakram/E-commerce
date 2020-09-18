const form = document.querySelector('form')
const email = document.querySelector('#username')
const password = document.querySelector('#password')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('sss');
    // fetch('/user').then((res)=>{
    //     console.log('true');
    //     res.text().then((data)=>{
    //         console.log(data);
    //     }).catch((E)=>{
    //         console.log(E);
    //     })
        
    // }
    // ).catch((e)=>{
    //     console.log('error');
    // })

    var xhr = new XMLHttpRequest();
    var url = "/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            alert(json.token)
        }
        else
            console.log(xhr.responseText);
            
    };
    // var data = JSON.stringify();
    xhr.send(JSON.stringify({"email":email.value , "password":password.value }));
})