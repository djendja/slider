function Cat() {

};


let kitty = new Cat();
// console.log(kitty.__proto__ === Cat.prototype);
// console.log(kitty.__proto__);
// console.log(Cat.prototype);
// console.log(kitty.__proto__.__proto__ === Object.prototype);
// console.log(Object.prototype.__proto__);

let button = document.querySelector('.js-button');

function Animal() {}
Object.setPrototypeOf(Cat.prototype, Animal.prototype);
console.log(kitty.__proto__); //cat {}
console.log(kitty.__proto__.__proto__); // animal {}
console.log(kitty.__proto__.__proto__.__proto__); //  {}
console.log(kitty.__proto__.__proto__.__proto__.__proto__); //null




// function average() {
//     avg = (grade1 + grade2 + grade3) / 3;
//     let displayText = `Prosecna ocena ${nameSurname} je ${avg}`;
//     console.log(displayText);
//     //return displayText;
// }

console.log("Hello World");

button.addEventListener("click", () => {
    let nameSurname = document.querySelector('.nameSurname').value;
    // let email = document.querySelector('.email').value;
    // let index = document.querySelector('.index').value;
    let grade1 = document.querySelectorAll('.grade1').value;
    let grade2 = document.querySelectorAll('.grade2').value;
    let grade3 = document.querySelectorAll('.grade3').value;
    avg = (grade1 + grade2 + grade3) / 3;
    //let displayText = `Prosecna ocena ${nameSurname} je ${avg}`;
    document.querySelector("value").innerHTML = `Prosecna ocena ${nameSurname} je ${avg}`;
    //console.log(displayText);
});
