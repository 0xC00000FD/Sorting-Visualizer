export const quicksort = (animations, array, st, dr) => {
    if(st < dr){
        let mij = Math.floor((st+dr)/2);
        animations.push({pivot: mij});
        animations.push({swap: [st, mij]});
        swap(array, st, mij);

        let i = st, j = dr, d = 0;
        while(i < j){
            animations.push({compare:[i, j]});
            if(array[i] > array[j]){
                swap(array, i, j);
                animations.push({swap: [i, j]});
                d = 1-d;
            }

            i += d;
            j -= 1-d;
        }

        quicksort(animations, array, st, i-1);
        quicksort(animations, array, i+1, dr);
    }
}

const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}