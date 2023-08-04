const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});



function firstPage(){
    var tl = gsap.timeline();

    tl.from(".nav",{
        y:'10',
        opacity:0,
        duration:1.3,
        delay:.1,
        ease: Power3.easeInOut,
    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration:1.4,
        delay:-1,
        stagger:.2,
    })
    .from(".hero-footer",{
        y:-10,
        opacity:0,
        duration:1.3,
        delay:-1,
        ease: Power3.easeInOut
    })


}

var timeout;

function circleSkew(){

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

    xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);
 


    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(function(){

        document.querySelector(".dotcircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;

    },100) 

    });
}

circleSkew();

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets) {
        document.querySelector(".dotcircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}


circleSkew();
circleMouseFollower();
firstPage();


document.querySelectorAll(".elem").forEach(function (elem) {


    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets){
        
        

        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: Power3,
        })
    });


    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot),
        })
    });
});