class Slider {
    constructor(el) {
        this.ctx = el
        this.autoplay = this.ctx.getAttribute('data-autoplay') ? this.ctx.getAttribute('data-autoplay') : false;
        this.infinite = this.ctx.getAttribute('data-infinite') ? this.ctx.getAttribute('data-infinite') : false;
        this.sliding = this.ctx.getAttribute('data-sliding') ? this.ctx.getAttribute('data-sliding') : false;
    }

    init() {
        this.selectors = {
            ctx: ['.slider'],
            sliderContainer: ['.js-slider-container'],
            sliderWrapper: ['.slider__wrap'],
            img: '.js-img',
            button: ['.slider__button'],
            dots: ['.dot']
        }
        this.stateClasses = {
            disabled: ['slider__button--disabled']
        }
        // this.default = {

        // }

        this.leftButton = this.ctx.querySelector(this.selectors.button+'.left');
        this.rightButton = this.ctx.querySelector(this.selectors.button+'.right');
        this.dots = this.ctx.querySelectorAll(this.selectors.dots);
        this.dotsArray = Array.from(this.dots);
        this.sliderWrap = this.ctx.querySelector(this.selectors.sliderWrapper);
        this.images = this.ctx.querySelectorAll(this.selectors.img);
        

        this.counter = 0;
        this.width = this.ctx.querySelector(this.selectors.sliderWrapper).offsetWidth;
        this.imageCount = this.ctx.querySelectorAll(this.selectors.img).length;
        
        this.leftButton.addEventListener("click",this.slideToLeft.bind(this));
        this.rightButton.addEventListener("click", this.slideToRight.bind(this));
        window.addEventListener("resize", this.handleResize.bind(this));
        this.dots.forEach(el => {
            el.addEventListener("click", this.bulletClick.bind(this));
        })
        this.setAutoplay(); 
        this.setInfinite();
    }

    slideToLeft() {
        this.removeActiveBullets();
        this.rightButton.classList.remove(this.stateClasses.disabled);
        if(this.counter === 0) {
            this.leftButton.classList.add(this.stateClasses.disabled);
            return;
        }
        else {
            clearInterval(this.aInterval);
            clearInterval(this.iInterval);
            this.slideToSlide(--this.counter);
        }
    }

    slideToRight() {
        this.removeActiveBullets();
        this.leftButton.classList.remove(this.stateClasses.disabled);
        if(this.counter === this.imageCount - 1) {
            this.rightButton.classList.add(this.stateClasses.disabled);
            return;
        }
        else {
            clearInterval(this.aInterval);
            clearInterval(this.iInterval);
           
            this.slideToSlide(++this.counter);
        }
    }


    slideToSlide(index) {
        this.addActiveBullets(index);
        if(this.sliding == "true") {
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * index) + 'px)';
        }
        else {
            this.fading(index);
        }
    }

    bulletClick(e) {
       this.removeActiveBullets();
        this.clicked = e.target;
        this.clicked.classList.add("active");
        this.index = this.dotsArray.indexOf(this.clicked);
        this.counter = this.index;

        if(this.sliding=="true") {
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
        }
        else {
            this.fading(this.index);
        }
      
    }

    addActiveBullets(index) {
        this.dotsArray.forEach((el,i) => {
            if(index == i) {
                el.classList.add("active");
            }
        })
    }

    removeActiveBullets() {
        this.dotsArray.forEach(el => {
            el.classList.remove("active");
        })
    }

    fading(index) {
        this.images.forEach((el) => {
            el.style.display = "none"
        })
        this.images[index].style.display = "block";
        this.images[index].classList.add("fade");
    }

    setAutoplay() {
        // console.log("setAutoplay");
        if(this.autoplay == "true") {
           this.aInterval = setInterval(this.autoplaySlide.bind(this), 2000);
        }

    }

    setInfinite() {
        if(this.infinite == "true") {
            this.iInterval = setInterval(this.inifiniteSlide.bind(this), 2000);
        }
    }

    inifiniteSlide() {
        this.removeActiveBullets();
        if(this.sliding == "true" ) {
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
            this.counter++;
            this.addActiveBullets(this.counter);
            if(this.counter > this.imageCount-1) {
                this.counter = 0;
                this.addActiveBullets(this.counter);
            }
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';

        }

       else if(this.sliding == "false") {
            this.removeActiveBullets();
            console.log(this.counter);
            this.images.forEach((el) => {
                el.style.display = "none"
            })
            this.counter++;
            if(this.counter > this.imageCount-1) {
                this.counter = 0;
            }
            console.log(this.counter);

            this.images[this.counter].style.display = "block";
            this.addActiveBullets(this.counter);
            this.images[this.counter].classList.add("fade");
        }
    }

    autoplaySlide() {
        // console.log("autoplay");
        this.removeActiveBullets();
        if(this.sliding == "true" && this.counter != this.imageCount - 1) {
            this.counter++;
            this.addActiveBullets(this.counter);
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
        }
        else if(this.sliding == "false" && this.counter != this.imageCount - 1) {
            this.counter++;
            this.addActiveBullets(this.counter);
           this.fading(this.counter);            
        } 
       else {
            clearInterval(this.aInterval);
       }
    }


    handleResize() {
        let currentWidth = this.ctx.querySelector(this.selectors.sliderWrapper).offsetWidth;
        this.width = currentWidth;
        this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
    }


}

function createSlider() {
    let sliders = document.querySelectorAll("[data-component]");
    sliders.forEach(el => {
        let slider = new Slider(el);
        console.log(slider);
        slider.init();
    }) 
}

createSlider();



// setInfinite() {
//     console.log("setInfinite");
//     if(this.infinite == "true") {
//        this.iInterval = setInterval(this.infinitE.bind(this), 2000);
//     }
// }

// infinitE() {
//     console.log("inifnite "+this.counter);
//     console.log(this.imageCount);
//     if(this.slidig == "true" && this.counter != this.imageCount - 1) {
//         this.counter++;
//         if(this.counter > this.imageCount - 1) {
//             this.counter = 1;
//             this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
//         }
//     }
//     else {
//         clearInterval(this.iInterval);
//     }
// }

    // handleInfinite() {
    //    if(this.images[this.counter].id == "lastClone") {
    //        this.sliderWrap.style.transition = "none";
    //        this.counter = this.imageCount - 2;
    //        this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
    //    }
    //    if(this.images[this.counter].id == 'firstClone') {
    //     this.sliderWrap.style.transition = "none";
    //     this.counter = this.imageCount - this.counter;
    //     this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
    //  }
    // }


      // setInfinite() {
    //     console.log("setInfinite");
    //     if(this.infinite) {
    //        this.iInterval = setInterval(this.infinitE.bind(this), 2000);
    //     }
    // }
    
    // infinitE() {
    //     console.log(this.counter);
    //     console.log(this.imageCount);
    //     if(this.counter > this.imageCount - 1) {
    //         this.counter = 1;
    //         this.counter++;
    //         this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
    //     }
    //     else {
    //         clearInterval(this.iInterval);
    //     }
    // }