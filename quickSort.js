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

function randomNum(min, max) {
    let val = Math.floor(Math.random() * (max - min + 1)) + min;
    return val;
}

function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        let num = randomNum(minRange, maxRange);
        array[i] = num;
    }
    return array;
}

function renderBars(array) {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");

        let width = bars_container.offsetWidth;

        bar.style.width = (width / numOfBars) + "px";
        bar.style.height = array[i] * heightFactor + "px";
        bar.style.backgroundColor = "#80a0eb";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

sort_btn.addEventListener("click", function () {
    quickSort(unsorted_array, 0, unsorted_array.length - 1);
});

async function swap(items, leftIndex, rightIndex, bars) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
    bars[leftIndex].style.backgroundColor = "#80a0eb";
    //bars[leftIndex].innerText = items[leftIndex];
    bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
    bars[rightIndex].style.backgroundColor = "#80a0eb";
    //bars[rightIndex].innerText = items[rightIndex];
    await sleep(speedFactor);
  }
  async function partition(items, left, right) {
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex]; //middle element
    bars[pivotIndex].style.backgroundColor = "lightgreen";
  
    for (let i = 0; i < bars.length; i++) {
      if (i != pivotIndex) {
        bars[i].style.backgroundColor = "#80a0eb";
      }
    }
  
    (i = left), //left pointer
      (j = right); //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await swap(items, i, j, bars); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
  
  async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if (items.length > 1) {
      index = await partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await quickSort(items, index, right);
      }
    }
  
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#80a0eb";
    }
    return items;
  }

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}