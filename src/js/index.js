import * as Heap from "./heap";

const heap = new Heap.descendingObj();
console.log(heap.heap, `len : ${heap.size()} `);
[
  { data: 1, obj: "hi" },
  { data: 4, obj: "hi" },
  { data: 3, obj: "hi" },
  { data: 5, obj: "hi" },
  { data: 2, obj: "hi" },
  { data: 6, obj: "hi" },
  { data: 12, obj: "hi" },
  { data: 11, obj: "hi" },
  { data: 8, obj: "hi" },
  { data: 7, obj: "hi" },
  { data: 9, obj: "hi" },
  { data: 10, obj: "hi" },
].forEach((value) => heap.insert(value));
/*
[
  { data: 6, obj: "hi" },
  { data: 4, obj: "hi" },
  { data: 5, obj: "hi" },
  { data: 1, obj: "hi" },
  { data: 2, obj: "hi" },
].forEach((value) => heap.insert(value));
*/
console.log(heap.heap, `len : ${heap.size()} `);
console.log(`delete : `, heap.delete(), heap.heap, `len : ${heap.size()} `);
