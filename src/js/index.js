import * as dijkstra from "./dijkstra";

/**
 * n       : 6
 * paths   : [[1,2,2],[1,3,5],[1,4,1],[2,3,3],[2,4,2],[3,4,3],[3,5,1],[3,6,5],[4,5,1],[5,6,2]]
 * gates   : 1
 */
const anwser = dijkstra.dijkstraBase(
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
