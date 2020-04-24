export const mergeSort = (animations = [], array = [], st, dr) => {
    if(array.length <= 1) return array;
    mergeSortHelper(animations, array, st, dr);
}

const mergeSortHelper = (animations, array, st, dr) => {
    if(st === dr) return;

    const mij = Math.floor((st+dr)/2);
    mergeSortHelper(animations, array, st, mij);
    mergeSortHelper(animations, array, mij+1, dr);

    merge(animations, array, st, dr, mij);
}

const merge = (animations = [], array = [], st, dr, mij) => {
    let i = st, j = mij+1;
    const auxiliary = [];

    while(i <= mij && j <= dr){
        animations.push({compare: [i, j]});
        if(array[i] < array[j]){
            auxiliary.push(array[i]);
            i++;
        } else {
            auxiliary.push(array[j]);
            j++;
        }
    }

    while(i <= mij) {
        animations.push({compare: [i, undefined]});
        auxiliary.push(array[i]);
        i++;
    } while(j <= dr) {
        animations.push({compare: [j, undefined]});
        auxiliary.push(array[j]);
        j++;
    }

    let k = 0;
    for(let i = st; i <= dr; i++){
        array[i] = auxiliary[k++];
    }
    animations.push({merge: [st, auxiliary]});
}
