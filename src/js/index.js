import * as Heap from "./heap";

const heap = new Heap.descendingHeap();
console.log(heap.heap, `len : ${heap.size()} `);
[1, 4, 3, 5, 2, 6, 12, 11, 8, 7, 9, 10].forEach((value) => heap.insert(value));
//[6, 4, 5, 1, 2].forEach((value) => heap.insert(value));
console.log(heap.heap, `len : ${heap.size()} `);
console.log(`delete : ${heap.delete()}`, heap.heap, `len : ${heap.size()} `);
