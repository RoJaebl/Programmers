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
export default class Heap {
  constructor() {
    this.heap = [null];
  }

  /**
   * 현재 인덱스에 대한 왼쪽 자식 값을 반환한다.
   * @param {number} parent
   * @returns {T}
   */
  getLeft = (parent) => this.heap[this.leftIndex(parent)];
  /**
   * 현재 인덱스에 대한 오른쪽 자식 값을 반환한다.
   * @param {number} parent
   * @returns {T}
   */
  getRight = (parent) => this.heap[this.rightIndex(parent)];
  /**
   * 현재 인덱스에 대한 부모 값을 반환한다.
   * @param {number} child
   * @returns {T}
   */
  getParent = (child) => this.heap[this.parentIndex(child)];
  /**
   * 현재 인덱스에 대한 자신의 값을 반환한다.
   * @param {number} parent
   * @returns {T}
   */
  getThis = (index) => this.heap[index];
  /**
   * Heap의 첫번째 값을 반환한다.
   * @returns {T}
   */
  getMin = () => this.heap[1];
  /**
   * 현재 인덱스에 대한 왼쪽 자식 인덱스를 반환한다.
   * @param {number} parent
   * @returns {number}
   */
  leftIndex = (parent) => parent * 2;
  /**
   * 현재 인덱스에 대한 오른쪽 자식 인덱스를 반환한다.
   * @param {number} parent
   * @returns {number}
   */
  rightIndex = (parent) => parent * 2 + 1;
  /**
   * 현재 인덱스에 대한 부모 인덱스를 반환한다.
   * @param {number} child
   * @returns {number}
   */
  parentIndex = (child) => (child / 2) >> 0;
  /**
   * Heap에 들어간 데이터 길이를 반환한다.
   * @returns {number}
   */
  size = () => this.heap.length - 1;

  /**
   * 입력한 모드에 따라 현재 인덱스와 스왑
   * @param {number} index
   * @param {string} mode
   */
  swap = (index, mode = "p") => {
    /**
     * 입력된 인덱스와 스왑
     * @param {number} one
     * @param {number} two
     */
    const swap = (one, two) => {
      [this.heap[one], this.heap[two]] = [this.heap[two], this.heap[one]];
    };

    if (mode == "l") swap(index, this.leftIndex(index));
    else if (mode == "r") swap(index, this.rightIndex(index));
    else swap(index, this.parentIndex(index));
  };

  /**
   * Heap 삽입이다.
   * @param {T} data
   */
  insert = (data) => {
    this.heap.push(data);

    for (let child = this.size(); child > 1; ) {
      if (this.getThis(child) > this.getParent(child)) this.swap(child);
      child = this.parentIndex(child);
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
      if (
        this.getLeft(parent) < this.getThis(parent) &&
        this.getThis(parent) > this.getRight(parent)
      )
        break;
      else if (this.getLeft(parent) > this.getRight(parent)) {
        this.swap(parent, "l");
        parent = this.leftIndex(parent);
      } else {
        this.swap(parent, "r");
        parent = this.rightIndex(parent);
      }
    }
    return first;
  };
}
