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

export const heapSort = (array) => {
    return array;
}

function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}