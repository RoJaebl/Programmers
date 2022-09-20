/**
 * n       : 6
 * paths   : [[1,2,2],[1,3,5],[1,4,1],[2,3,3],[2,4,2],[3,4,3],[3,5,1],[3,6,5],[4,5,1],[5,6,2]]
 * gates   : 1
 * summits : 6
 */
/**
 *
 * @param {Number} n
 * @param {Number[][]} paths
 * @param {Number[]} gate
 * @param {Number[]} summits
 * @returns
 */
function solution(n, paths, gate, summits) {
  const nodeNum = n + 1;
  const nodeMap = new Array(nodeNum).fill(null).map((_) => []);
  for (let i = 0; i < paths.length; i++) {
    const [nodeOne, nodeTwo, weight] = paths[i];
    nodeMap[nodeOne].push([nodeTwo, weight]);
    nodeMap[nodeTwo].push([nodeOne, weight]);
  }

  const table = [];
  const VISIT = 0;
  const WEIGHT = 1;
  for (let i = 0; i < nodeNum; i++) {
    table.push([false, Infinity]);
  }

  const initialTable = (startNode) => {
    table[startNode] = [true, 0];
    for (const [adjacency, weight] of nodeMap[startNode]) {
      table[adjacency][WEIGHT] = weight;
    }
  };
  // table에 가장 낮은 weight를 가진 node를 반환한다.
  const getGrid = () => {
    let [node, minWeight] = [0, Infinity];
    // table을 돌면서 방문이 안되어 있으면서 weight가 가장 낮은
    // node를 설정한다.
    for (let i = 1; i < nodeNum; i++) {
      const [visit, weight] = table[i];
      if (!visit && weight < minWeight) {
        minWeight = weight;
        node = i;
      }
    }
    return node;
  };

  const dijkstra = (startNode) => {
    initialTable(startNode);
    // 시작 노드와 마지막 노드는 탐색할 필요가 없기에 -2를 한것이다.
    for (let i = 0; i < nodeNum - 2; i++) {
      const current = getGrid();
      table[current][VISIT] = true;
      // 타겟 노드와 인접한 노드들과 값을 비교
      for (let j = 0; j < nodeMap[current].length; j++) {
        const [node, weight] = nodeMap[current][j];
        if (
          !table[node][VISIT] &&
          table[current][WEIGHT] + nodeMap[current][j][WEIGHT] <
            table[node][WEIGHT]
        )
          table[node][WEIGHT] =
            table[current][WEIGHT] + nodeMap[current][j][WEIGHT];
      }
      /*
          // 선택된 노드와 인접한 노드들과 값을 비교
          for (const [node, weight] of nodeMap[current]) {
            // 방문하지 않은 노드이면서 tatget 노드와의 weight와
            // target 노드가 시작지점부터 적산된 weight의 합이 현재
            // 시작지점부터 현재 노드까지 적산된 weigth보다 작을경우 갱신
            if (
              !table[node][VISIT] &&
              table[current][WEIGHT] + weight < table[node][WEIGHT]
              )
              table[node][WEIGHT] = table[current][WEIGHT] + weight;
            }
            */
    }
  };
  console.table(table);
  dijkstra(gate);
  return 0;
}
