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

    let keywords_arrray = ["vehicle", 'bike', "birds", "brazil-bird", "car", "fruits", "pomegranate", "strawberries",
        "plum-headed-parakeet", "laptop", "acer-laptop", "iphone", "animals", "elephant", "lenovo-laptop", "oppo",
        "samsumg", "micromax", "sparrow", "vivo"];

    // keywords_arrray.split();
    for (let i = 0; i <= keywords_arrray.length; i++) {
        keywords_arrray[i];
    }

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
                if (img.keyword.indexOf(search_keyword) > -1)
                    html += '<div class="col-md-4"><img src="images/' + img.imageName + '" class="img-fluid image" data-keyword="' + img.keyword + '" alt=""></div>';
            } else {
                html += '<div class="col-md-4"><img src="images/' + img.imageName + '" class="img-fluid image" data-keyword="' + img.keyword + '" alt=""></div>';
            }
            setTimeout(function () {
                document.getElementById("ets-filtered-img").innerHTML = html;
            }, 1000);
        }

        if (search_keyword) {
            set_keyword_localstorage(search_keyword);
        }
    }

    autocomplete(inp, get_ls);

    inp.addEventListener("keyup", function (e) {
        let search_keyword = document.getElementById('myinput').value;
        images_html(search_keyword);
    });

    function autocomplete(inp, arr) {

        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);


            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/

                        inp.value = this.getElementsByTagName("input")[0].value;
                        images_html(this.getElementsByTagName("input")[0].value);

                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
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

    function set_keyword_localstorage(search_keyword) {
        let local_storage = !!localStorage.getItem('search_keyword') ? JSON.parse(localStorage.getItem('search_keyword')) : [];
        if (!local_storage.includes(search_keyword)) { //Prevent duplicate values.

            if (search_keyword.length >= 3) { //store maximum 3 letter of data

                if (keywords_arrray.includes(search_keyword)) {
                    local_storage.push(search_keyword);
                }

            }
        }
        localStorage.setItem('search_keyword', JSON.stringify(local_storage));
    }
})();