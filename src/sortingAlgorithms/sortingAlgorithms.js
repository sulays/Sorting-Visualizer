export const getBubbleSortAnimations = (array) => {
    const animation = [];
    for(let i = 0; i < array.length - 1; i++) {
        let swapped = false;
        for(let j = 0; j < array.length - i - 1; j++) {
            animation.push(["compare1", j]);
            animation.push(["compare2", j]);
            if(array[j] > array[j + 1]) {
                swapped = true;
                animation.push(["swap", j]);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
        if(swapped === false) break;
    }
    return animation;
}

export const getMergeSortAnimations = (array) => {
    let animations = [];
    mergeSort(array, 0, array.length - 1, animations);
    return [animations, array];
}

const merge = (array, l, m, r, animations) => {
    let sortArray = [];
    let i = l, j = m + 1;
    while(i <= m && j <= r) {
        animations.push(["compare1", i, j]);
        animations.push(["compare2", i, j]);
        if(array[i] < array[j]) {
            sortArray.push(array[i++]);
        } else {
            sortArray.push(array[j++]);
        }
    }
    while(i <= m) {
        animations.push(["compare1", i, i]);
        animations.push(["compare2", i, i]);
        sortArray.push(array[i++]);
    }
    while(j <= r) {
        animations.push(["compare1", j, j]);
        animations.push(["compare2", j, j]);
        sortArray.push(array[j++]);
    }
    for(let i = l; i <= r; i++) {
        if(array[i] !== sortArray[i - l]) {
            animations.push(["overwrite", i, sortArray[i - l]]);
        }
        array[i] = sortArray[i - l];
    }

}

const mergeSort = (array, l, r, animations) => {
    if(l === r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(array, l, m, animations);
    mergeSort(array, m + 1, r, animations);
    merge(array, l, m, r, animations);
}

export const getQuickSortAnimations = (array) => {
    let animations = [];
    quickSort(array, 0, array.length - 1, animations);
    return [animations, array];
}

const quickSort = (array, l, r, animations) => {
    let pivot;
    if(l < r) {
        pivot = partitionArray(array, l, r, animations);
        quickSort(array, l, pivot - 1, animations);
        quickSort(array, pivot + 1, r, animations);
    }
}

const partitionArray = (array, l, r, animations) => {
    let i = l;
    animations.push(["compare1", r, r]);
    for(let j = l; j < r; j++) {
        animations.push(["compare1", j, r]);
        animations.push(["compare2", j, r]);
        if(array[j] <= array[r]) {
            animations.push(["swap", j, i]);
            swap(array, j, i);
            i++;
        }
    }
    animations.push(["compare2", r, r]);
    swap(array, i, r);
    animations.push(["swap", i, r]);
    return i;
}

export const getHeapSortAnimations = (array) => {
    let animations = [];
    heapSort(array, animations);
    return [animations, array];
}

const heapSort = (array, animations) => {
    let n = array.length;
    for(let i = n / 2 - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }
    for(let i = n - 1; i > 0; i--) {
        animations.push(["swap", i, 0]);
        swap(array, i, 0);
        heapify(array, i, 0, animations);
    }
}

const heapify = (array, n, i, animations) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    animations.push(["compare1", largest, largest]);
    if(l < n && array[l] > array[largest]) {
        animations.push(["compare1", l, l]);
        largest = l;
    }
    if(r < n && array[r] > array[largest]) {
        animations.push(["compare1", r, r]);
        largest = r;
    }
    if(l < n) animations.push(["compare2", l, l]);
    if(r < n) animations.push(["compare2", r, r]);
    if(largest !== i) {
        animations.push(["swap", largest, i]);
        swap(array, largest, i);
        animations.push(["compare2", i, i]);
        heapify(array, n, largest, animations);
    } else {
        animations.push(["compare2", largest, largest]);
    }
}

function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}