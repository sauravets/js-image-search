document.getElementById("search-btn").addEventListener("click", function (event){
    event.preventDefault();
    let filter,img,i,dataKeyword,txtValue;
    filter = document.getElementById("myinput").value.toUpperCase();
    
    img = document.getElementsByClassName("image");

    let btns=document.querySelectorAll('[data-keyword]');
    console.log(img);
     
    for(i = 0; i < img.length; i++){
        dataKeyword = img[i].dataset.keyword;
        
        // split into keywords
        // match substring in each keyword
        // if substring found in any keyword, this is match

        if(txtValue.indexOf(filter) > -1){
            img[i].style.display = "block";
        }
        else{
            img[i].style.display = "none";
        } 
    }

   /*  let searchKey = filter.toLowerCase();
    result_html(images, searchKey); */
});
 /*  console.log(img[i].getAttribute("keyword")); */