import * as Heap from "./heap";

// obj heap
const heapObj = new Heap.ascendingObj();
console.log(heapObj.heap, `len : ${heapObj.size()} `);
[
  { heapValue: 1, obj: "hi" },
  { heapValue: 4, obj: "hi" },
  { heapValue: 3, obj: "hi" },
  { heapValue: 5, obj: "hi" },
  { heapValue: 2, obj: "hi" },
  { heapValue: 6, obj: "hi" },
  { heapValue: 12, obj: "hi" },
  { heapValue: 11, obj: "hi" },
  { heapValue: 8, obj: "hi" },
  { heapValue: 7, obj: "hi" },
  { heapValue: 9, obj: "hi" },
  { heapValue: 10, obj: "hi" },
].forEach((value) => heapObj.insert(value));
/*
[
  { heapValue: 6, obj: "hi" },
  { heapValue: 4, obj: "hi" },
  { heapValue: 5, obj: "hi" },
  { heapValue: 1, obj: "hi" },
  { heapValue: 2, obj: "hi" },
].forEach((value) => heap.insert(value));
*/
console.log(heapObj.heap, `len : ${heapObj.size()} `);
console.log(
  `delete : `,
  heapObj.delete(),
  heapObj.heap,
  `len : ${heapObj.size()} `
);

// array heap
const heapArr = new Heap.ascendingArray();
console.log(heapArr.heap, `len : ${heapArr.size()} `);
[
  [1, "hi"],
  [4, "hi"],
  [3, "hi"],
  [5, "hi"],
  [2, "hi"],
  [6, "hi"],
  [12, "hi"],
  [11, "hi"],
  [8, "hi"],
  [7, "hi"],
  [9, "hi"],
  [10, "hi"],
].forEach((value) => heapArr.insert(value));
/*
[
  [6,"hi"],
  [4,"hi"],
  [5,"hi"],
  [1,"hi"],
  [2,"hi"],
].forEach((value) => heap.insert(value));
*/
console.log(heapArr.heap, `len : ${heapArr.size()} `);
console.log(
  `delete : `,
  heapArr.delete(),
  heapArr.heap,
  `len : ${heapArr.size()} `
);
