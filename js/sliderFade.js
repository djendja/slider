class Slider {
    constructor(el) {
        this.ctx = el
        this.autoplay = this.ctx.getAttribute('data-autoplay') ? this.ctx.getAttribute('data-autoplay') : false;
        this.infinite = true;
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

        this.leftButton = this.ctx.querySelector(this.selectors.button+'.left');
        this.rightButton = this.ctx.querySelector(this.selectors.button+'.right');
        this.sliderWrap = this.ctx.querySelector(this.selectors.sliderWrapper);
        this.images = this.ctx.querySelectorAll(this.selectors.img);

        this.counter = 0;
        this.leftButton.addEventListener("click",this.slideToLeft.bind(this));
        this.rightButton.addEventListener("click", this.slideToRight.bind(this));
        window.addEventListener("resize", this.handleResize.bind(this));
    }


    

}