function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  const themeToggleBtn = document.getElementById('themeToggle');
  const isDarkMode = body.classList.contains('dark-theme');
  themeToggleBtn.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
}
let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_cont");
let speed = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 2;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function (e) {
    numOfBars = e.target.value;
    maxRange = e.target.value;
    console.log(numOfBars);
    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    console.log(unsorted_array);
    renderBars(unsorted_array);
});

function randomNum(min,max){
    let val =  Math.floor(Math.random()*(max-min+1))+min;
    return val;
}

function createRandomArray(){
    let array = new Array(numOfBars);
    for(let i=0;i<numOfBars;i++){
        let num = randomNum(minRange,maxRange);
        array[i] = num;
    }
    return array;
}

function renderBars(array){
    for(let i=0;i<numOfBars;i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        
        let width = bars_container.offsetWidth;
        
        bar.style.width = (width/numOfBars)+"px";
        bar.style.height = array[i]*heightFactor+"px";
        bar.style.backgroundColor = "#80a0eb";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function (){
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

    // INSERTION SORT
    async function InsertionSort(array) {
      let bars = document.getElementsByClassName("bar");
      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
          bars[j + 1].style.backgroundColor = "red";
          //bars[j + 1].innerText = array[j + 1];
          await sleep(speedFactor);
    
          for (let k = 0; k < bars.length; k++) {
            if (k != j + 1) {
              bars[k].style.backgroundColor = "#80a0eb";
            }
          }
          j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(speedFactor);
      }
    
      for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#80a0eb";
      }
      return array;
    }
    sort_btn.addEventListener("click", function () {
      InsertionSort(unsorted_array);
    });

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}