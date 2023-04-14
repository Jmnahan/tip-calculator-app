// getting classes/ids
const bill = document.querySelector("#bill");
const tipBtns = document.querySelectorAll("#tipBtn");
const people = document.querySelector("#people");
const custom = document.querySelector("#custom");
const resetBtn = document.querySelector("#resetBtn");
const errorMsg = document.querySelector(".error-message");
const tipAmount = document.querySelectorAll(".tip-amount")


// event listener
bill.addEventListener('input', () => {
  billAmt = bill.value;
  calculateTip(); 
});
custom.addEventListener('input', customTip);
tipBtns.forEach(btn => {
  btn.addEventListener('click', tipValue);
});
people.addEventListener('input', numOfPeople);
resetBtn.addEventListener('click', reset);

// global variables
let billAmt = 0;
let tipAmt = 0.15; 
let peopleNum = 1;

// getting tips value from buttons
function tipValue(event) {
  tipBtns.forEach(btn => {
    btn.classList.remove("list-btn-active");
      // if the clicked button == btn.innerHTML
      if (event.target.innerHTML == btn.innerHTML) {
        btn.classList.add("list-btn-active");
        tipAmt = (btn.value/100);
      }
    });
  // reset value of custom tip when you click btn-tips
  custom.value = "";
  calculateTip();
}

// custom tip
function customTip() {
  tipAmt = (custom.value/100)
  // remove active state from btn-tips when you start typing
  tipBtns.forEach(btn => {
    btn.classList.remove("list-btn-active");
  });
    if (custom.value !== "") {
      calculateTip();
    }
}

// num of people
function numOfPeople() {
  peopleNum = people.value
  // validation
  if(peopleNum <= 0) {
    errorMsg.style.display = "inline";
    people.style.outlineColor = "#d37157";
    setTimeout(() => {
      errorMsg.style.display = "none";
      people.style.outlineColor = "#26C0AB";
    }, 2000);
  } 
  calculateTip();
}

// calculating tip
function calculateTip() {
  if(peopleNum >= 1) {
    // tip/person
    let tip = billAmt * tipAmt / peopleNum;
    // total/person
    let tipTotal = (billAmt / peopleNum) + tip;
    // changing 
    tipAmount[0].textContent = '$' + tip.toFixed(2); // first tip-amount
    tipAmount[1].textContent = '$' + tipTotal.toFixed(2); // second tip-amount
  }
}

// clean page
function reset() {
  bill.value = 0; 
  custom.value = "";
  people.value = "";
  tipAmount[0].textContent = "$0.00";
  tipAmount[1].textContent = "$0.00";
}
