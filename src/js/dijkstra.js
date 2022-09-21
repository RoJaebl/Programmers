import * as Heap from "./heap.js";

class NodeMap {
  /**
   *
   * @param {numbaer} node
   * @param {number[][]} paths
   */
  constructor(node, paths) {
    this.node = node;
    this.length = node + 1;
    this.map = new Array(this.length).fill(null).map(() => []);
    this.createMap(paths);
  }

  createMap = (paths) => {
    for (let i = 0; i < paths.length; i++) {
      const [nodeOne, nodeTwo, weight] = paths[i];
      this.map[nodeOne].push({ to: nodeTwo, resource: weight });
      this.map[nodeTwo].push({ to: nodeOne, resource: weight });
    }
  };

  getMap = (index) => this.map[index];
  showMap = () => console.table(this.map);
}

/**
 * @param {Number} n
 * @param {Number[][]} paths
 * @param {Number[]} gate
 * @param {Number[]} summits
 * @returns
 */
export function dijkstraBase(n, paths, gate) {
  /** @description 저달받은 paths의 정보를 쉽게 접근하기위해 데이터를 Map으로 가공한다. */
  const nodeNum = n + 1;
  const nodeMap = new Array(nodeNum).fill(null).map((_) => []);
  for (let i = 0; i < paths.length; i++) {
    const [nodeOne, nodeTwo, weight] = paths[i];
    nodeMap[nodeOne].push([nodeTwo, weight]);
    nodeMap[nodeTwo].push([nodeOne, weight]);
  }

  /**
   * @description
   * 다익스트라 알고리즘 정의상 주어진 노드마다 출발지점에서 최소
   * 자원으로 갈 수 있는 테이블을 작성하는 것이기에 가상의 자원
   * 테이블 작성.
   */
  const table = [];
  const VISIT = 0;
  const WEIGHT = 1;
  for (let i = 0; i < nodeNum; i++) {
    table.push([false, Infinity]);
  }

  /**
   * @description
   * 알고리즘 시작하고 처음, 출발지점과 근접한 노드와의 자원을
   * 선형으로 탐색하여 자원테이블 초기화. 이때 출발지점은 방문
   * 지점과 동시에 자기 자신이기에 소모 자원을 0으로 설정한다.
   */
  const initialTable = (startNode) => {
    table[startNode] = [true, 0];
    for (const [adjacency, weight] of nodeMap[startNode]) {
      table[adjacency][WEIGHT] = weight;
    }
  };

  /**
   * @description
   * 그리드 알고리즘으로 자원테이블에서 방문하지 않으면서 가장
   * 자원소모가 적은 node의 번호를 반환한다.
   * @param {number[][]} table
   * - 선형탐색할 자원 테이블 이다.
   * @property {number} node
   * - 자원 테이블에서 자원이 낮은 노드를 저장하는 변수
   * @property {number} minWeight
   * - 자원 테이블에서 자원이 낮은값을 저장하는 변수
   * @property {number} i
   * - 자원 테이블을 선형으로 탐색할 반복 변수
   * @property {number} visit
   * - i가 자원 테이블를 선형하면서 접근한 방문값을 저장하는 변수
   * @property {number} weight
   * - i가 자원 테이블를 선형하면서 접근한 자원값을 저장하는 변수
   * @returns {number} 자원이 가장 낮은 노드번호를 반환한다.
   */
  const getGrid = (table) => {
    let [node, minWeight] = [0, Infinity];
    for (let i = 1; i < nodeNum; i++) {
      const [visit, weight] = table[i];
      if (!visit && weight < minWeight) {
        minWeight = weight;
        node = i;
      }
    }
    return node;
  };

  /**
   * @description
   * - 다익스트라 알고리즘은 시작할 노드 번호를 기준으로 자원테이블을 작성한다.
   * - 자원테이블은 `initialTable`함수를 통해 시작 노드와 인접한 노드와 그외
   *   다른 노드의 방문 및 자원을 기록한다.
   * - 초기화된 자원테이블을 가지고 알고리즘을 시작한다.
   * - 처음 나오는 반복문은 시작 노드와 도착 노드는 탐색을 할 필요가 없기에
   *   `총 노드 - 2`를 설정하여 모든 노드를 방문할 수 있게 반복한다.
   *   - 반복문을 돌때마다 자원테이블이 업데이트가 되는데 이때 업데이트된 자원
   *     테이블에서 방문하지 않았고 자원소모가 적은 노드를 반환한다.
   *   - 반환된 노드를 자원테이블에 `방문처리(table[current][VISIT])`하고
   *     Map에 `매칭된 노드 정보들(currentNode)`을 읽어온다.
   * - 반환된 노드로 접근한 Map의 정보들을 자원 테이블과 비교하여 방문하지
   *   노드에 Map의 자원과 자원테이블의 자원중 가장 낮은 자원을 자원테이블에
   *   업데이트 한다.
   *   - Map과 자원테이블을 비교했을때 `방문한 노드를 비교하지 않는 이유`는
   *     이전 그리드 알고리즘으로 가장 낮은 자원을 기록하면서 자원테이블을
   *     업데이트 했기 때문이다.(initialTable(startNode), getGrid(table))
   * ---
   * ## 자원테이블 업데이트 증명
   * - 방문한 노드는 그리드 탐색으로 이미 최소한의 자원이 등록되어 있다.
   *   그렇기에 현재 방문한 노드는 출발지점에서 최소한으로 갈 수 있는
   *   자원이기에 어느 노드와 연결된 자원이여도 등록된 자원보다 작을 수
   *   없게되어 다른 노드에서 현재 노드까지 올 수 있는 최소 자원을 검증할
   *   필요가 없다.
   * - 최소한의 자원이 등록된 곳이 자원테이블이다.
   * - 방문하지 않는 노드는 그리드 탐색을 하지 않았기에 자원테이블에 등록된
   *   자원이 있어도 최소일 경우가 아닐 수 있기에 `자원테이블의 방문한 노드의
   *   자원(table)`과 `현재 노드와 방문한 노드 사이의 자원(Map)`합과 `현재
   *   자원테이블의 있는 노드의 자원(table)`을 비교하여 더 작은 자원을
   *   `자원테이블의 현재 노드 자원(table)`을 업데이트 한다.
   * @param {number} startNode - 다익스트라 알고리즘을 시작할 노드번호이다.
   */
  const dijkstra = (startNode) => {
    initialTable(startNode);
    for (let i = 0; i < nodeNum - 2; i++) {
      const current = getGrid(table);
      table[current][VISIT] = true;
      const currentNode = nodeMap[current];

      for (let j = 0; j < currentNode.length; j++) {
        const [node] = currentNode[j];
        if (
          !table[node][VISIT] &&
          table[current][WEIGHT] + currentNode[j][WEIGHT] < table[node][WEIGHT]
        )
          table[node][WEIGHT] = table[current][WEIGHT] + currentNode[j][WEIGHT];
      }
      /*
      for (const [node, weight] of currentNode) {
        if (
          !table[node][VISIT] &&
          table[current][WEIGHT] + weight < table[node][WEIGHT]
        )
          table[node][WEIGHT] = table[current][WEIGHT] + weight;
      }
      */
    }
  };
  dijkstra(gate);
  return table;
}

/**
 *
 * @param {number} n
 * @param {number[][]} paths
 * @param {number[]} gate
 * @returns
 */
export function dijkstraHeap(n, paths, gate) {
  const nodeMap = new NodeMap(n, paths);
  nodeMap.showMap();

  const heapTable = new Heap.descendingHeap();
  /**
   *
   * @param {object} data
   */
  const initialHeapTable = ({ ...data }) => {
    heapTable.insert(data);
  };
  initialHeapTable({ to: 1, resource: 2 });
  initialHeapTable({ to: 2, resource: 0 });
  initialHeapTable({ to: 3, resource: 4 });
  initialHeapTable({ to: 4, resource: 4 });
  initialHeapTable({ to: 5, resource: 1 });
  console.log(heapTable.heap);

  const table1 = new Array(nodeMap.length).fill({
    visit: false,
    resource: Infinity,
  });
  console.table(table1);

  const table = [];
  const VISIT = 0;
  const WEIGHT = 1;
  for (let i = 0; i < nodeMap.length; i++) {
    table.push([false, Infinity]);
  }

  /**
   *
   * @param {number[][]} startNode
   */
  const initialTable = (startNode) => {
    table[startNode] = [true, 0];
    for (const [adjacency, weight] of nodeMap.getMap(startNode)) {
      table[adjacency][WEIGHT] = weight;
    }
  };

  /**
   *
   * @returns {number} 자원이 가장 낮은 노드번호를 반환한다.
   */
  const getGrid = (table) => {
    let [node, minWeight] = [0, Infinity];
    for (let i = 1; i < nodeMap.length; i++) {
      const [visit, weight] = table[i];
      if (!visit && weight < minWeight) {
        minWeight = weight;
        node = i;
      }
    }
    return node;
  };

  /**
   *
   * @param {number} startNode - 다익스트라 알고리즘을 시작할 노드번호이다.
   */
  const dijkstra = (startNode) => {
    initialTable(startNode);
    for (let i = 0; i < nodeMap.length - 2; i++) {
      const current = getGrid(table);
      table[current][VISIT] = true;
      const currentNode = nodeMap.getMap(current);

      for (let j = 0; j < currentNode.length; j++) {
        const [node] = currentNode[j];
        if (
          !table[node][VISIT] &&
          table[current][WEIGHT] + currentNode[j][WEIGHT] < table[node][WEIGHT]
        )
          table[node][WEIGHT] = table[current][WEIGHT] + currentNode[j][WEIGHT];
      }
    }
  };
  dijkstra(gate);
  return table;
}
