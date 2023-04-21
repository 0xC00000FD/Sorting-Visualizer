export const bubblesort = (animations = [], array) => {
    let sw = false;
    do {
        sw = true;
        for(let i = 0; i < array.length; i++){
            animations.push({compare: i});
            if(array[i] < array[i-1]){
                animations.push({swap: [i, i-1]})
                swap(array, i, i-1);
                sw = false;
            }
        }
    } while(!sw);

    return array;
}

const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}