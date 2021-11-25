import {
    data
} from "./data.js";
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
                img: ['slider__img', 'js-slider-img'],
                button: ['slider__button', 'js-slider-button']
            },
            this.stateClasses = {
                disabled: ['slider__button--disabled'],
            },
            this.left = {
                classB: ['left'],
                html: ['&#8617;']

            },
            this.right = {
                classB: ['right'],
                html: ['&#8618;']

            }


        this.ctx = this.createCtx();
        this.counter = 0;
        
        this.createComponent();

    }

    createCtx() {
        let ctx = document.createElement("section");
        ctx.classList.add(this.selectors.ctx);
        document.querySelector(this.parent).append(ctx);
        return ctx;
    }

    createComponent() {
        let container = document.createElement("div");
        container.classList.add(...this.selectors.sliderContainer);
        let wrapper = document.createElement("div");
        wrapper.classList.add(...this.selectors.sliderWrapper);
        data.items.forEach(el => {
            let innerHtml = `<img class="slider__img js-img" src=${el.imgSrc}>`;
            wrapper.innerHTML += innerHtml;
            container.append(wrapper);
        });

        let leftButton = this.createButton(this.left.html, this.left.classB);
        container.append(leftButton);

        let rightButton = this.createButton(this.right.html, this.right.classB);
        container.append(rightButton);

        this.ctx.append(container);
        this.handleButton();
    }

    createButton(direction, classB) {
        let button = document.createElement("button");
        button.classList.add(...this.selectors.button)
        button.classList.add(classB),
            button.innerHTML = direction;
        return button;
    }


    handleButton() {
        let sliderWrap = this.ctx.querySelector('.slider__wrap');
        let imageCount = this.data.items.length;

        let leftButton = this.ctx.querySelector('.left');
        let rightButton = this.ctx.querySelector('.right');

        let counter = 0;
        let width = this.ctx.querySelector('.slider__wrap').offsetWidth;

        // console.log(width);
        sliderWrap.style.transform = 'translateX(' + (-width * counter) + 'px)';



        leftButton.addEventListener("click", () => {
            rightButton.classList.remove(this.stateClasses.disabled);
            console.log("left:" + counter, imageCount);
            if (counter === 0) {
                leftButton.classList.add(this.stateClasses.disabled);
                return;
            } 
            else {
                leftButton.classList.remove(this.stateClasses.disabled);
            }
            counter--;
            sliderWrap.style.transform = 'translateX(' + (-width * counter) + 'px)';
        });
        rightButton.addEventListener("click", () => {
            leftButton.classList.remove(this.stateClasses.disabled);
            console.log("right" + counter, imageCount);
            if (counter === imageCount - 1) {
                rightButton.classList.add(this.stateClasses.disabled)
                return;
            } 
            else {
                rightButton.classList.remove(this.stateClasses.disabled);
            }
            counter++;
            sliderWrap.style.transform = 'translateX(' + (-width * counter) + 'px)';
        });
    }

}

function createSlider() {
    let slider = new Slider(".main", data);
    slider.init();
}

createSlider();
createSlider();

window.addEventListener("resize", () => {
    console.log(window.innerWidth);
})




//     slideToLeft(slider, counter, width) {
//         if(counter == 0 ) return;
//         counter--;
//         slider.style.transform = 'translateX(' + (-width * counter) + 'px)';
//         
//     }

//    slideToRight(slider, counter, width) {
//        if(counter == imageCount -1) return;
//         counter++;
//         slider.style.transform = 'translateX(' + (-width * counter) + 'px)';
//         
//     }