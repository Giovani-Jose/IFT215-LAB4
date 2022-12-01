/*
=============
Glide Js Carousel
=============
 */
const slider1 = document.querySelector('#glide_1');
const slider2 = document.querySelector('#glide_2');
const slider3 = document.querySelector('#glide_3');
const slider4 = document.getElementById("glide_4");
/*
=============
Hero
=============
 */
if(slider1) {

    new Glide(slider1, {
        type: 'carousel',
        startAt: 0,
        autoplay: 3000,
        haverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: 'linear'
    }).mount();
}

/*
=============
Latest Products
=============
 */

if(slider2) {
    new Glide(slider2, {
        type: 'carousel',
        startAt: 0,
        haverpause: true,
        perView: 4,
        animationDuration: 800,
        animationTimingFunc: "ease-in-out",
        breakpoints: {
            1200: {perView: 3},
            768: {perView: 2},
        },
    }).mount();
}



/*
=============
Related Products
=============
 */



// Testimonial
if(slider3) {
    new Glide(slider3, {
        type: 'carousel',
        startAt: 0,
        haverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "ease-in-out",
    }).mount();
};
// News
if (slider4) {
    new Glide("#glide_4", {
        type: "carousel",
        startAt: 0,
        haverpause: true,
        perView: 3,
        autoplay: 3000,
        animationDuration: 800,
        animationTimingFunc: "ease-in-out",
        breakpoints: {
            998: {
                perView: 2,
            },
            768: {
                perView: 1,
            },
        },
    }).mount();
}