import * as Heap from "./heap";

// obj heap
const compare = "to";
const heapObj = new Heap.ascendingObj(compare);
console.log(heapObj.heap, `len : ${heapObj.size()} `);

for (let i = 0; i < 12; i++) {
  const obj = {};
  obj[compare] = i + 1;
  obj["obj"] = (Math.random(100) * 100) >> 0;
  heapObj.insert(obj);
}
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
