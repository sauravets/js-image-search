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

    let get_ls = JSON.parse(localStorage.getItem('search_keyword'));
    let inp = document.getElementById('myinput');
   
    // On page load
    images_html();

    // Search images using search_keyword-
     function images_html(search_keyword = null) {
        let html = '';
        for (i = 0; i < img_arr.length; i++) {
            let img = img_arr[i];
            if (search_keyword) {
                if (img.keyword.indexOf(search_keyword) > -1 && search_keyword.length >= 3)
                    html += '<div class="col-md-4"><img src="images/' + img.imageName + '" class="img-fluid image" data-keyword="' + img.keyword + '" alt=""></div>';
            } else {
                html += '<div class="col-md-4"><img src="images/' + img.imageName + '" class="img-fluid image" data-keyword="' + img.keyword + '" alt=""></div>';
            }
        }
        setTimeout(function () {
            document.getElementById("ets-filtered-img").innerHTML = html;
        }, 1000);
        if (search_keyword && search_keyword.length >= 3) {
            setTimeout(function () {
                set_keyword_localstorage(search_keyword);
            }, 500);
        }
    }

    prediction(inp, get_ls);

    inp.addEventListener("keyup", function (e) {
        let search_keyword = document.getElementById('myinput').value;
        images_html(search_keyword);
    });

    // get local storage data in a variable-
    inp.addEventListener('click', function () {
        get_ls = JSON.parse(localStorage.getItem('search_keyword'));
        prediction(inp, get_ls);
    });

    function prediction(inp, get_ls) {

        /*the prediction function takes two arguments,
        the text field element and an array of possible predictions values:*/
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            let a, b, i, val = this.value;
            /*close any already open lists of predictions values*/
            closeAllLists();
            if (!val) { return false; }
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "prediction-list");
            a.setAttribute("class", "prediction-items");
            /*append the DIV element as a child of the prediction container:*/
            this.parentNode.appendChild(a);

            if (get_ls !== null) {
                for (var key in get_ls) {
                    if (get_ls.hasOwnProperty(key)) {
                        if (key.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                            b = document.createElement("DIV");
                            b.innerHTML = "<strong>" + key.substr(0, val.length) + "</strong>";
                            b.innerHTML += key.substr(val.length);
                            b.innerHTML += "<input type='hidden' value='" + key + "'>";
                            //execute a function when someone clicks on the item value (DIV element):
                            b.addEventListener("click", function (e) {
                                //insert the value for the prediction text field:
                                inp.value = this.getElementsByTagName("input")[0].value;                                
                                images_html(this.getElementsByTagName("input")[0].value);
                                closeAllLists();
                            });
                            a.appendChild(b);
                        }
                    }
                }
            }
        });

        function closeAllLists(elmnt) {
            /*close all prediction lists in the document,
            except the one passed as an argument:*/
            let x = document.getElementsByClassName("prediction-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    // set and get local storage data-
    function set_keyword_localstorage(search_keyword) {
        let local_storage = !!localStorage.getItem('search_keyword') ? JSON.parse(localStorage.getItem('search_keyword')) : {};

        if (search_keyword in local_storage) {
            local_storage[search_keyword] = local_storage[search_keyword] + 1;
        } else {
            local_storage[search_keyword] = 1;
        }
        localStorage.setItem('search_keyword', JSON.stringify(local_storage));
    }
    
    // show top 5 search-keyword beneath search-bar:-
    top_searches();
    function top_searches() {
        let stored_keyword = JSON.parse(localStorage.getItem('search_keyword'));        
        let entries = Object.entries(stored_keyword);
        let sort_keyword = entries.sort((a, b) => b[1] - a[1]);
        span_tag = sort_keyword.slice(0, 5);
        let div = document.getElementById("top_search");
        for (let i = 0; i < span_tag.length; i++) {
            let span = document.createElement("span");
            span.setAttribute("style", "padding:8px; border:1px solid #c6c3c3; margin-top: 10px; border-radius: 19px; cursor: pointer;");
            span.setAttribute("class", "btn btn-outline-primary");
            span.setAttribute("keyword", span_tag[i][0]);
            span.innerHTML = span_tag[i];
            div.appendChild(span);
            span.addEventListener("click", function(e) {   
                images_html(this.getAttribute("keyword"));
            });
        }
    }
})();