// Create array of object-
var img_arr = [{ keyword: "fruits,apple", imageName: "apple.webp" },
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

document.addEventListener("keyup", function image_search(event) {
    event.preventDefault();
    let search_keyword = document.getElementById("myinput").value.toLowerCase();

    // Store input values in local storage-
    let local_storage = !!localStorage.getItem('search_keyword') ? JSON.parse(localStorage.getItem('search_keyword')) : [];
    if (!local_storage.includes(search_keyword))//Prevent duplicate values.
        local_storage.push(search_keyword);
    localStorage.setItem('search_keyword', JSON.stringify(local_storage));

    // Show prediction on search bar-
    function prediction() {
        let reg = new RegExp(search_keyword);
        if (search_keyword != '' && search_keyword.length >= 3) {
            return local_storage.filter(function (term) {
                if (term.match(reg)) {
                    return term;
                }
            });
        }
    }
    // document.addEventListener("keydown",function(e){
    //     if(e.keyCode==13){
    //        
    //     }
    // })

    prediction_result();

    function prediction_result() {
        let res = document.getElementById('list');
        res.innerHTML = '';
        let list = '';
        let terms = prediction();
        for (let i = 0; i < terms.length; i++) {
            list += '<li>' + terms[i] + '</li>';
        }
        res.innerHTML = '<ul>' + list + '</ul>';
    }
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
        }, 1000);
    }
}


