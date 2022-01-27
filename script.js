document.getElementById("search-btn").addEventListener("click",function searchImage(event){
    event.preventDefault();
    let filter = document.getElementById("myinput").value.toUpperCase();
    // let div = document.getElementById("pics");
    let img = document.getElementsByTagName("img");
    let i,dataKeyword,txtValue;
    for(i = 0; i < img.length; i++){
        dataKeyword = img[i].dataset("data-keyword")[0];
        txtValue = dataKeyword.textContent || dataKeyword.innerText;
        if(txtValue.indexOf(filter) > -1){
            img[i].style.display = "";
        }
        else{
            img[i].style.display = "none";
        }
    }
console.log(img);
});