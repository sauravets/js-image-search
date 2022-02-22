(function () {  //self-invoking function

    // Create array of object-
    let img_arr = [{ keyword: "fruits,apple", imageName: "apple.webp" },
    { keyword: "vehicle,bike", imageName: "bike.jpeg" },
    { keyword: "birds", imageName: "bird.jpeg" },
    { keyword: "birds,brazil-bird", imageName: "brazil-bird.webp" },
    { keyword: "vehicle,car", imageName: "car.jpg" },
    { keyword: "vehicle,bike", imageName: "imagesbike1.jpeg" },
    { keyword: "fruits,pomegranate", imageName: "pomegranate.jpg" },
    { keyword: "vehicle,car", imageName: "red-car.jpeg" },
    { keyword: "fruits,strawberries", imageName: "strawberries.jpeg" },
    { keyword: "vehicle,car", imageName: "mahindra-xuv500.jpg" },
    { keyword: "vehicle,bike", imageName: "motorcycle.jpg" },
    { keyword: "birds,plum-headed-parakeet", imageName: "plum-headed-parakeet.jpg" },
    { keyword: "laptop,acer-laptop", imageName: "acer-laptop.webp" },
    { keyword: "animals,elephant", imageName: "elephant-1.jpeg" },
    { keyword: "mobiles,iphone", imageName: "iphone-10.webp" },
    { keyword: "mobiles,iphone", imageName: "iphone-12.webp" },
    { keyword: "laptop", imageName: "laptop-1.jpg" },
    { keyword: "mobiles,iphone", imageName: "iphone-13.jpeg" },
    { keyword: "laptop", imageName: "laptop-2.jpg" },
    { keyword: "laptop", imageName: "laptop.jpg" },
    { keyword: "animals,elephant", imageName: "elephant-2.jpeg" },
    { keyword: "laptop,lenovo-laptop", imageName: "lenovo-laptop.jpg" },
    { keyword: "laptop,laptop", imageName: "laptop-apple.webp" },
    { keyword: "animals,elephant", imageName: "elephant.jpg" },
    { keyword: "mobiles,oppo", imageName: "oppo-mobile.jpg" },
    { keyword: "mobiles,iphone", imageName: "iphone-14pro.webp" },
    { keyword: "mobiles,micromax", imageName: "micromax-mobile.png" },
    { keyword: "mobiles,samsumg", imageName: "samsumg-galaxy-j8.jpg" },
    { keyword: "birds,sparrow", imageName: "sparrow_bird.jpg" },
    { keyword: "birds,sparrow", imageName: "sparrow.jpg" },
    { keyword: "mobiles,vivo", imageName: "vivo-mobile.jpeg" },
    { keyword: "birds,sparrow", imageName: "sparrow-1.jpeg" },
    { keyword: "mobiles,vivo", imageName: "vivo-v9.jpg" },
    { keyword: "birds,parrot", imageName: "two-parrots.webp" },
    { keyword: "birds,sparrow", imageName: "sparrow_bird.jpg" },
    { keyword: "mobiles,vivo", imageName: "vivo-y3-4gb-ram-128g.jpg" },
    ];

    images_html();

    let get_ls = JSON.parse(localStorage.getItem('search_keyword'));
    let inp = document.getElementById('myinput');
    let img =img_arr;

    inp.addEventListener("keyup", function (event) {
        event.preventDefault();
        let search_keyword = inp.value.toLowerCase();

        // Store input values in local storage-
        let local_storage = !!localStorage.getItem('search_keyword') ? JSON.parse(localStorage.getItem('search_keyword')) : [];
        // let regex = img_arr;
        // console.log(regex);
        if (!local_storage.includes(search_keyword)) { //Prevent duplicate values.
            if (search_keyword.length >= 3) { //store maximum 3 letter of data
                // if(search_keyword.match(regex))
                // if (img_arr.includes(search_keyword)) {
                    if(img.keyword.includes(search_keyword))
                    local_storage.push(search_keyword);
                // }
            }
        }
        localStorage.setItem('search_keyword', JSON.stringify(local_storage));

        // document.addEventListener('click', prediction)
        document.addEventListener('click',function (){
            console.log(get_ls);
            if(search_keyword){
                return JSON.parse(localStorage.getItem('search_keyword'));
            }
            // else{
            //     return [];
            // }
        });
        // 

        /* display the prediction on input text-*/
        inp.addEventListener("keyup", function prediction() {
            let a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false; }
            a = document.createElement("DIV"); /*create a DIV element that will contain the items (values):*/
            a.setAttribute("class", "prediction-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < get_ls.length; i++) {
                if (get_ls[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");  /*create a DIV element for each matching element:*/
                    b.innerHTML = "<strong>" + get_ls[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += get_ls[i].substr(val.length);
                    a.appendChild(b);
                }
            }
        });
        /*close all prediction lists in the document,
          except the one passed as an argument:*/
        function closeAllLists(elmnt) {
            let x = document.getElementsByClassName("prediction-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != search_keyword) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });

        images_html(search_keyword);
    });

    // Search images using search_keyword-
    function images_html(search_keyword = null) {
        let html = '';
        for (i = 0; i < img_arr.length; i++) {
            let img = img_arr[i];
            if (search_keyword) {
                if (img.keyword.indexOf(search_keyword) > -1) {
                    html += ' <div class="col-md-4">';
                    html += '<img src="images/' + img.imageName + '" class="img-fluid image" data-keyword="' + img.keyword + '" alt="">';
                    html += '</div>';
                }
            } else {
                html += ' <div class="col-md-4">';
                html += '<img src="images/' + img.imageName + '" class="img-fluid image" data-keyword="' + img.keyword + '" alt="">';
                html += '</div>';
            }
            setTimeout(function () {
                document.getElementById("ets-filtered-img").innerHTML = html;
            }, 1000); //Timeout function display images after 1 second
        }
    }
})();

