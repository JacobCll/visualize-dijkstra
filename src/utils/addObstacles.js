/**
 * add obstacles to adjacency matrix
 * @param {Array} obstacles
 * @param {Number} graphSize
 * @returns {Array}
 */
export default function addObstacles(graphMatrix, obstacles, sideLength) {
  let matrix = graphMatrix.map((row) => [...row]);

  const removeConnection = (node1, node2) => {
    matrix[node1][node2] = 0;
    matrix[node2][node1] = 0;
  };

  for (const nodeIndex of obstacles) {
    const i = Math.floor(nodeIndex / sideLength);
    const j = nodeIndex - i * sideLength;

    // Adjacent nodes (upper, bottom, left, right)
    if (i > 0) removeConnection(nodeIndex, nodeIndex - sideLength); // upper
    if (i < sideLength - 1) removeConnection(nodeIndex, nodeIndex + sideLength); // bottom
    if (j > 0) removeConnection(nodeIndex, nodeIndex - 1); // left
    if (j < sideLength - 1) removeConnection(nodeIndex, nodeIndex + 1); // right

    // Diagonal nodes
    if (i > 0 && j > 0) removeConnection(nodeIndex, nodeIndex - sideLength - 1); // upper-left
    if (i > 0 && j < sideLength - 1)
      removeConnection(nodeIndex, nodeIndex - sideLength + 1); // upper-right
    if (i < sideLength - 1 && j > 0)
      removeConnection(nodeIndex, nodeIndex + sideLength - 1); // lower-left
    if (i < sideLength - 1 && j < sideLength - 1)
      removeConnection(nodeIndex, nodeIndex + sideLength + 1); // lower-right
  }

  for (const nodeIndex of obstacles) {
    const i = Math.floor(nodeIndex / sideLength);
    const j = nodeIndex - i * sideLength;

    const removeUpperLeftToBottomRight = (upperLeft, bottomRight) => {
      removeConnection(upperLeft, bottomRight);
    };

    const removeUpperRightToBottomLeft = (upperRight, bottomLeft) => {
      removeConnection(upperRight, bottomLeft);
    };

    if (i === 0) {
      if (j === 0 && obstacles.has(nodeIndex + sideLength + 1)) {
        removeUpperRightToBottomLeft(nodeIndex + 1, nodeIndex + sideLength);
      }
      if (j === sideLength - 1 && obstacles.has(nodeIndex + sideLength - 1)) {
        removeUpperLeftToBottomRight(nodeIndex - 1, nodeIndex + sideLength);
      }
      if (j > 0 && j < sideLength - 1) {
        if (obstacles.has(nodeIndex + sideLength - 1)) {
          removeUpperLeftToBottomRight(nodeIndex - 1, nodeIndex + sideLength);
        }
        if (obstacles.has(nodeIndex + sideLength + 1)) {
          removeUpperRightToBottomLeft(nodeIndex + 1, nodeIndex + sideLength);
        }
      }
    }

    if (i > 0 && i < sideLength - 1) {
      if (j === 0) {
        if (obstacles.has(nodeIndex - sideLength + 1)) {
          removeUpperLeftToBottomRight(nodeIndex - sideLength, nodeIndex + 1);
        }
        if (obstacles.has(nodeIndex + sideLength + 1)) {
          removeUpperRightToBottomLeft(nodeIndex + 1, nodeIndex + sideLength);
        }
      }
      if (j === sideLength - 1) {
        if (obstacles.has(nodeIndex - sideLength - 1)) {
          removeUpperRightToBottomLeft(nodeIndex - sideLength, nodeIndex - 1);
        }
        if (obstacles.has(nodeIndex + sideLength - 1)) {
          removeUpperLeftToBottomRight(nodeIndex - 1, nodeIndex + sideLength);
        }
      }
      if (j > 0 && j < sideLength - 1) {
        if (obstacles.has(nodeIndex - sideLength - 1)) {
          removeUpperRightToBottomLeft(nodeIndex - sideLength, nodeIndex - 1);
        }
        if (obstacles.has(nodeIndex + sideLength - 1)) {
          removeUpperLeftToBottomRight(nodeIndex - 1, nodeIndex + sideLength);
        }
        if (obstacles.has(nodeIndex - sideLength + 1)) {
          removeUpperLeftToBottomRight(nodeIndex - sideLength, nodeIndex + 1);
        }
        if (obstacles.has(nodeIndex + sideLength + 1)) {
          removeUpperRightToBottomLeft(nodeIndex + 1, nodeIndex + sideLength);
        }
      }
    }

    if (i === sideLength - 1) {
      if (j === 0 && obstacles.has(nodeIndex - sideLength + 1)) {
        removeUpperLeftToBottomRight(nodeIndex - sideLength, nodeIndex + 1);
      }
      if (j === sideLength - 1 && obstacles.has(nodeIndex - sideLength - 1)) {
        removeUpperRightToBottomLeft(nodeIndex - sideLength, nodeIndex - 1);
      }
      if (j > 0 && j < sideLength - 1) {
        if (obstacles.has(nodeIndex - sideLength - 1)) {
          removeUpperRightToBottomLeft(nodeIndex - sideLength, nodeIndex - 1);
        }
        if (obstacles.has(nodeIndex + sideLength + 1)) {
          removeUpperLeftToBottomRight(nodeIndex - sideLength, nodeIndex + 1);
        }
      }
    }
  }

  return matrix;
}
