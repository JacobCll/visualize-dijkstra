/**
 * add obstacles to adjacency matrix
 * @param {Array} obstacles
 * @param {Number} graphSize
 * @returns {Array}
 */
export default function addObstacles(graphMatrix, obstacles, sideLength) {
  let matrix = graphMatrix;

  for (const nodeIndex of obstacles) {
    const i = Math.floor(nodeIndex / sideLength);
    const j = nodeIndex - i * sideLength;

    // upper
    if (i > 0) {
      const upperNode = nodeIndex - sideLength;
      matrix[upperNode][nodeIndex] = 0;
      matrix[nodeIndex][upperNode] = 0;
    }
    // bottom
    if (i < sideLength - 1) {
      const lowerNode = nodeIndex + sideLength;
      matrix[lowerNode][nodeIndex] = 0;
      matrix[nodeIndex][lowerNode] = 0;
    }
    if (j > 0) {
      // left
      const leftNode = nodeIndex - 1;
      matrix[leftNode][nodeIndex] = 0;
      matrix[nodeIndex][leftNode] = 0;
    }
    // right
    if (j < sideLength - 1) {
      const rightNode = nodeIndex + 1;
      matrix[rightNode][nodeIndex] = 0;
      matrix[nodeIndex][rightNode] = 0;
    }
  }
  return matrix;
}
