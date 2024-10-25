/**
 * create graph matrix where each node connects to adjacent nodes
 * @param {Number} side
 * @returns {Array}
 */
export default function createMatrix(side) {
  let matrix = [];
  const size = side * side;

  // for graph creation
  for (let i = 0; i < size; i++) {
    matrix.push(Array(size).fill(0));
  }

  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      // calculate current node index
      const nodeIndex = i * side + j;

      // upper
      if (i > 0) {
        const upperNode = nodeIndex - side;
        matrix[upperNode][nodeIndex] = 1;
        matrix[nodeIndex][upperNode] = 1;
      }
      // bottom
      if (i < side - 1) {
        const lowerNode = nodeIndex + side;
        matrix[lowerNode][nodeIndex] = 1;
        matrix[nodeIndex][lowerNode] = 1;
      }
      // left
      if (j > 0) {
        const leftNode = nodeIndex - 1;
        matrix[leftNode][nodeIndex] = 1;
        matrix[nodeIndex][leftNode] = 1;
      }
      // right
      if (j < side - 1) {
        const rightNode = nodeIndex + 1;
        matrix[rightNode][nodeIndex] = 1;
        matrix[nodeIndex][rightNode] = 1;
      }
    }
  }

  return matrix;
}
