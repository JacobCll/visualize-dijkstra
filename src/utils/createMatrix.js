/**
 * create graph matrix where each node connects to adjacent nodes
 * @param {Number} side
 * @returns {Array}
 */
export default function createMatrix(sideLength) {
  let matrix = [];

  const size = sideLength * sideLength;

  const createConnection = (node1, node2, val = 1) => {
    matrix[node1][node2] = val;
    matrix[node2][node1] = val;
  };

  // for graph creation
  for (let i = 0; i < size; i++) {
    matrix.push(Array(size).fill(0));
  }

  for (let i = 0; i < sideLength; i++) {
    for (let j = 0; j < sideLength; j++) {
      // calculate current node index
      const nodeIndex = i * sideLength + j;

      // upper, button, left, right
      if (i > 0) createConnection(nodeIndex, nodeIndex - sideLength);
      if (i < sideLength - 1)
        createConnection(nodeIndex, nodeIndex + sideLength);
      if (j > 0) createConnection(nodeIndex, nodeIndex - 1);
      if (j < sideLength - 1) createConnection(nodeIndex, nodeIndex + 1);

      // upper left, right, bottom left, right diagonal
      if (i > 0 && j > 0)
        createConnection(nodeIndex, nodeIndex - sideLength - 1, Math.sqrt(2));
      if (i > 0 && j < sideLength - 1)
        createConnection(nodeIndex, nodeIndex - sideLength + 1, Math.sqrt(2));
      if (i < sideLength - 1 && j > 0)
        createConnection(nodeIndex, nodeIndex + sideLength - 1, Math.sqrt(2));
      if (i < sideLength - 1 && j < sideLength - 1)
        createConnection(nodeIndex, nodeIndex + sideLength + 1, Math.sqrt(2));
    }
  }

  return matrix;
}
