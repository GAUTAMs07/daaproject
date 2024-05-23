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
    mergeSort(unsorted_array);
});

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
async function mergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    let actualHalf = await mergeSort(left);
    await mergeSort(right);

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < left.length && j < right.length){
        if (left[i] < right[j]) {
            arr[k] = left[i];
            i++;
        } 
        else{
            arr[k] = right[j];
            j++;
        }
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "lightgreen";
        if (k + arr.length < bars.length) {
            bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
            console.log(arr[k] * heightFactor);
            bars[k + arr.length].style.backgroundColor = "yellow";
        }
        await sleep(speedFactor);
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        i++;
        k++;
    }

    while (j < right.length) {
        arr[k] = right[j];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
        j++;
        k++;
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#80a0eb";
    }

    return arr;
}

function mergeSortD(arr, start, end) {
    if (arr.length < 2) {
        return arr;
    }

    let middle = Math.floor((start + end) / 2);
    let left = arr.slice(start, middle);
    let right = arr.slice(middle, end);

    //mergeSort(left);
    mergeSort(right);
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}