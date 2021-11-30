import {data} from "./data.js";


class Slider {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    init() {
        this.selectors = {
            ctx: ['slider'],
            sliderContainer: ['slider__container', 'js-slider-container'],
            sliderWrapper: ['slider__wrap', 'js-slider-wrap'],
            img: ['slider__img','js-slider-img'],
            button: ['slider__button', 'js-slider-button']
        }
        this.stateClasses = {
            disabled: ['slider__button--disabled']
        }
        this.left = {
            classB: ['left'],
            html: ['&#8617;']
        }
        this.right = {
            classB: ['right'],
            html: ['&#8618;']
        }
        
        
        this.ctx = this.createCtx();
        this.leftButton = this.createButton(this.left.html, this.left.classB);
        this.rightButton = this.createButton(this.right.html, this.right.classB);
        this.createComponent();
        
        this.width = this.ctx.querySelector('.slider__wrap').offsetWidth;
        // console.log(this.width);
        this.sliderWrap = this.ctx.querySelector('.slider__wrap');
       
        this.counter = 0;
        this.imageCount = this.data.items.length;
       
        this.leftButton.addEventListener("click",this.slideToLeft.bind(this));
        this.rightButton.addEventListener("click", this.slideToRight.bind(this));
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    createCtx() {
        const ctx = document.createElement("section");
        ctx.classList.add(this.selectors.ctx);
        document.querySelector(this.parent).append(ctx);
        return ctx;
    }


    createComponent() {
        const container = document.createElement("div");
        container.classList.add(...this.selectors.sliderContainer);
        const wrapper = document.createElement("div");
        wrapper.classList.add(...this.selectors.sliderWrapper);
        data.items.forEach(el => {
            let innerHtml = `<img class="slider__img js-img" src=${el.imgSrc}>`;
            wrapper.innerHTML += innerHtml;
            container.append(wrapper);
        });

        container.append(this.leftButton);
        container.append(this.rightButton);
        this.ctx.append(container);

    }

    createButton(direction, classB) {
        let button = document.createElement("button");
        button.classList.add(...this.selectors.button)
        button.classList.add(classB),
        button.innerHTML = direction;
        return button;
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
        let currentWidth = this.ctx.querySelector('.slider__wrap').offsetWidth;
        this.width = currentWidth;
        this.sliderWrap.style.transform = 'translateX(' + (-this.width * this.counter) + 'px)';
    }
    
}



function createSlider() {
    let slider = new Slider(".main", data);
    slider.init();
}

createSlider();

