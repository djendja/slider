class Slider {
    constructor(el) {
        this.ctx = el
    }

    init() {
        this.selectors = {
            ctx: ['.slider'],
            sliderContainer: ['.js-slider-container'],
            sliderWrapper: ['.slider__wrap'],
            img: '.js-img',
            button: ['.slider__button']
        }
        this.stateClasses = {
            disabled: ['slider__button--disabled']
        }

        this.counter = 0;
        this.imageCount = this.ctx.querySelectorAll(this.selectors.img).length;
        this.leftButton = this.ctx.querySelector(this.selectors.button+'.left');
        this.rightButton = this.ctx.querySelector(this.selectors.button+'.right');
        this.width = this.ctx.querySelector(this.selectors.sliderWrapper).offsetWidth;
        this.sliderWrap = this.ctx.querySelector(this.selectors.sliderWrapper);
        this.leftButton.addEventListener("click",this.slideToLeft.bind(this));
        this.rightButton.addEventListener("click", this.slideToRight.bind(this));
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    slideToLeft() {
        this.rightButton.classList.remove(this.stateClasses.disabled);
        if(this.counter === 0) {
            this.leftButton.classList.add(this.stateClasses.disabled);
            return;
        }
        else {
            this.counter--;
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
        }
    }

    slideToRight() {
        this.leftButton.classList.remove(this.stateClasses.disabled);
        if(this.counter === this.imageCount - 1) {
            this.rightButton.classList.add(this.stateClasses.disabled);
            return;
        }
        else {
            this.counter++;
            this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
        }
    }

    handleResize() {
        let currentCounter = this.counter;
        let currentWidth = this.ctx.querySelector(this.selectors.sliderWrapper).offsetWidth;
        this.width = currentWidth;
        this.sliderWrap.style.transform = 'translateX(' + (-this.width * currentCounter) + 'px)';
    }


}

function createSlider() {
    let sliders = document.querySelectorAll("[data-component]");
    sliders.forEach(el => {
        let slider = new Slider(el);
        slider.init();
    }) 
}

createSlider();