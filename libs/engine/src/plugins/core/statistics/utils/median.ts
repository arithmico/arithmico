export function calculateMedian(xs: number[]): number {
    return select(xs, 0, xs.length - 1, 0);
}

function select(list: number[], left: number, right: number, n: number) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (left === right) {
            return left;
        }
        let pivotIndex = pivot(list, left, right);
        pivotIndex = partitioning(list, left, right, pivotIndex, n);

        if (n === pivotIndex) {
            return n;
        } else if (n < pivotIndex) {
            right = pivotIndex - 1;
        } else {
            left = pivotIndex + 1;
        }
    }
}

function partitioning(list: number[], left: number, right: number, pivotIndex: number, n: number): number {
    const pivotValue = list[pivotIndex];
    [list[pivotIndex], list[right]] = [list[right], list[pivotIndex]]; // Move pivot to end
    let storeIndex = left;
    // Move all elements smaller than the pivot to the left of the pivot
    for (let i = left; i < right - 1; i++) {
        if (list[i] < pivotValue) {
            [list[storeIndex], list[i]] = [list[i], list[storeIndex]];
            storeIndex++;
        }
    }
    // Move all elements equal to the pivot right after the smaller elements
    let storeIndexEq = storeIndex;
    for (let i = storeIndex; i < right - 1; i++) {
        if (list[i] === pivotValue) {
            [list[storeIndexEq], list[i]] = [list[i], list[storeIndexEq]];
            storeIndexEq++;
        }
    }
    // Move pivot to its final place
    [list[right], list[storeIndexEq]] = [list[storeIndexEq], list[right]];
    // Return location of pivot considering the desired location n
    if (n < storeIndex) {
        return storeIndex; // n is in the group of smaller elements
    }
    if (n <= storeIndexEq) {
        return n; // n is in the group equal to pivot
    }
    return storeIndexEq; // n is in the group of larger elements
}

function pivot(list: number[], left: number, right: number): number {
    // for 5 or fewer elements just get median
    if (right - left < 5) {
        return partition5(list, left, right);
    }
    // otherwise move the medians of five-element subgroups to the first n/5 positions
    for (let i = left; i < right; i += 5) {
        // get the median position of the i'th five-element subgroup
        let subRight = i + 4;
        if (subRight > right) {
            subRight = right;
        }
        const median5 = partition5(list, i, subRight);
        [list[median5], list[left + Math.floor((i - left) / 5)]] = [
            list[left + Math.floor((i - left) / 5)],
            list[median5],
        ];
    }
    // compute the median of the n/5 medians-of-five
    const mid = (right - left) / 10 + left + 1;
    return select(list, left, left + Math.floor((right - left) / 5), mid);
}

function partition5(list: number[], left: number, right: number): number {
    let i = left + 1;
    while (i <= right) {
        let j = i;
        while (j > left && list[j - 1] > list[j]) {
            [list[j - 1], list[j]] = [list[j], list[j - 1]];
            j--;
        }
        i++;
    }
    return Math.floor((left + right) / 2);
}

console.log(calculateMedian([3, 13, 7, 5, 21, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29]));
