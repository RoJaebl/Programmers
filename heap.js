/**
 * - Heap의 자료구조는 배열이다.
 * - 인덱스 0은 사용하지 않는다.
 * - 새로은 노드가 추가되어도 기존 노드는 인덱스값을 유지한다.
 * - 부모 노드와 자식 노드의 관계는 다음과 같다
 *   - 부모 노드 인덱스를 `p` 자식 노드 인덱스를 `c`라고하면
 *   - 왼쪽 자식 인덱스 = p * 2
 *   - 오른쪽 자식 인덱스 = p * 2 + 1
 *   - p = c / 2
 * @type {Heap<{T}>}
 */
class Heap {
  constructor({ mode = "ascending" }) {
    this.heap = [null];
    this.mode = mode;
  }
  /**
   *
   * @param {object} mode
   * @returns
   */
  setMode = ({ mode }) => (this.mode = mode);

  /**
   *
   * @returns {number}
   */
  size = () => this.heap.length - 1;

  /**
   *
   * @param {number} parent
   * @returns {T}
   */
  getLeft = (parent) => this.heap[parent * 2];

  /**
   *
   * @param {number} parent
   * @returns {T}
   */
  getRight = (parent) => this.heap[parent * 2 + 1];

  /**
   *
   * @param {number} child
   * @returns {T}
   */
  getParent = (child) => this.heap[(child / 2) >> 0];

  /**
   *
   * @returns {T}
   */
  getMin = () => (this.heap[1] != null ? this.heap[1] : null);

  /**
   *
   * @param {number} parent
   * @param {number} child
   */
  swap = (one, two) => {
    [this.heap[one], this.heap[two]] = [this.heap[two], this.heap[one]];
  };

  /**
   *
   * @param {number} parent
   * @returns {number}
   */
  leftIndex = (parent) => parent * 2;

  /**
   *
   * @param {number} parent
   * @returns {number}
   */
  rightIndex = (parent) => parent * 2 + 1;

  /**
   * Heap 삽입이다.
   * @param {T} data
   */
  insert = (data) => {
    this.heap.push(data);

    for (let child = this.size(); child > 1; ) {
      const parent = (child / 2) >> 0;
      if (this.heap[child] > this.heap[parent]) this.swap(parent, child);
      child = parent;
    }
  };

  /**
   *
   * @return {T}
   */
  delete = () => {
    if (this.size() == 0) return 0;

    const [zero, first, ...heap] = this.heap;
    const last = heap.pop();
    this.heap = [zero, last, ...heap];

    for (let parent = 1; parent * 2 < this.size(); ) {
      if (this.getLeft(parent) > this.getRight(parent)) {
        this.swap(parent, this.leftIndex(parent));
        parent = this.leftIndex(parent);
      } else if (this.getLeft(parent) < this.getRight(parent)) {
        this.swap(parent, this.rightIndex(parent));
        parent = this.rightIndex(parent);
      } else break;
    }

    return first;
  };
}

const heap = new Heap({});
//[-1, -4, -3, -5, -2, -6].forEach((value) => heap.insert(value));
[1, 3, 5, 7, 9, 2, 4, 6, 8, 0].forEach((value) => heap.insert(value));
console.log(heap.heap);
console.log(heap.delete(), heap.heap);
