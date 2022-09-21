import * as dijkstra from "./dijkstra";

/**
 * n       : 6
 * paths   : [[1,2,2],[1,3,5],[1,4,1],[2,3,3],[2,4,2],[3,4,3],[3,5,1],[3,6,5],[4,5,1],[5,6,2]]
 * gates   : 1
 */
const $case1 = { to: 2, resource: 1 };
const $case2 = { to: 1, resource: 2 };
console.log(`${$case1.to > $case2.to}`);

const anwser = new dijkstra.dijkstraHeap(
  6,
  [
    [1, 2, 2],
    [1, 3, 5],
    [1, 4, 1],
    [2, 3, 3],
    [2, 4, 2],
    [3, 4, 3],
    [3, 5, 1],
    [3, 6, 5],
    [4, 5, 1],
    [5, 6, 2],
  ],
  1
);

console.table(anwser);
