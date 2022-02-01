document.getElementById("search-btn").addEventListener("click", function (event){
    event.preventDefault();
    let filter = document.getElementById("myinput").value.toLowerCase();
    let img = document.getElementsByClassName("image");
    for(let i = 0; i < img.length; i++){ 
        let imgKeyword = img[i].getAttribute('data-keyword');
        img[i].parentNode.style.display = "none";
        if(imgKeyword.indexOf(filter) > -1){
            img[i].parentNode.style.display = "block";
        }
    }
});

 