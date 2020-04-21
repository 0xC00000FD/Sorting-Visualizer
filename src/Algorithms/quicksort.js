export const quicksort = (animations, array, st, dr) => {   //st = left, dr = right, mij = middle 
    if(array.length > 1){
        let index = partition(animations, array, st, dr);

        if (st < index - 1) { 
            quicksort(animations, array, st, index - 1);
        }
        if (index < dr) {
            quicksort(animations, array, index, dr);
        }
    }
    return array;
}
//this algorithm actually works, but I guess the animations are fucked

const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];//generic swap
    array[j] = temp;
}

const partition = (animations, array, st, dr) => {
    var pivot = array[Math.floor((st + dr)/2)],
        i = st, 
        j = dr; 
    while (i <= j) {
        animations.push({compare: [i, j]});
        while (array[i] < pivot) {
            animations.push({compare: [i, j]});
            i++;
        }
        animations.push({compare: [i, j]});
        while (array[j] > pivot) {
            animations.push({compare: [i, j]});
            j--;
        }
        animations.push({compare: [i, j]});
        if (i <= j) {
            animations.push({swap: [i, j]});
            swap(array, i, j); 
            i++;
            j--;
        }
    }
    return i;
}