document.getElementById("search-btn").addEventListener("click",function searchImage(event){
    event.preventDefault();
    let filter = document.getElementById("myinput").value.toUpperCase();
    let div = document.getElementById("pics");
    let img = div.getElementsByTagName("img");
    let i,a,txtValue;
    for(i=0; i<img.length; i++){
        a = img[i].getElementsByTagName("img")[0];
        txtValue = a.textContent || a.innerText;
        if(img[i].src.indexOf(filter) > -1){
            img[i].style.display = "";
        }
        else{
            img[i].style.display = "none";
        }
    }
console.log(img);
});