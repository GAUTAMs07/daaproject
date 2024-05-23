

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

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "#80a0eb";
    }
  }
  //bars[i].innerText = array[i];
  //bars[j].innerText = array[j];
  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function HeapSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#80a0eb";
    await sleep(speedFactor);
  }
  return array;
}


sort_btn.addEventListener("click", function () {
  HeapSort(unsorted_array);
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

