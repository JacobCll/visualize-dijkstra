import styles from "./Body.module.css";
import Tiles from "../Tiles/Tiles";
import createMatrix from "../../utils/createMatrix";
import { useEffect, useState } from "react";

// adjacency matrix
export default function Body() {
  const [error, setError] = useState("");
  /**
   * 3 main statuses / stages:
   *  1. initialization - selection of source and target node
   *  2. computation
   *  3. completed
   */
  const [mainStatus, setMainStatus] = useState("initialization");

  /**
   * 2 initialization statuses
   *  1. source - selecting of source node
   *  2. target - selecting of target node
   */
  const [initStatus, setInitStatus] = useState("source");

  const [sideLength, setSideLength] = useState(15);

  const [graph, setGraph] = useState(() => createMatrix(sideLength));

  const [distances, setDistances] = useState(
    Array(graph.length).fill(Infinity)
  );
  const [visited, setVisited] = useState([]);
  const [prevNodes, setPrevNodes] = useState([]);

  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);

  const [nodePath, setNodePath] = useState([]);

  const reset = () => {
    setGraph(createMatrix(sideLength));
    setMainStatus("initialization");
    setInitStatus("source");
    setDistances(Array(graph.length).fill(Infinity));
    setVisited([]);
    setPrevNodes([]);
    setSource(null);
    setTarget(null);
    setError("");
    setNodePath([]);
  };

  useEffect(() => {
    // when graph changes, reset everything
    reset();
  }, [sideLength]);

  // return the index with the minimum and unvisited distance value
  const _minDistance = (distancesArray, visitedArray) => {
    let minDistance = Infinity;
    let minVertex;

    for (let i = 0; i < graph.length; i++) {
      if (distancesArray[i] < minDistance && !visitedArray.includes(i)) {
        minDistance = distancesArray[i];
        minVertex = i;
      }
    }
    return minVertex;
  };

  const handleOnStart = () => {
    if (source === null || target === null) {
      setError("source node / target node missing");
      return;
    }

    setMainStatus("computation");
    setError("");

    let visitedTemp = [...visited];
    let distancesTemp = [...distances];
    let prevNodesTemp = [...prevNodes];

    for (let i = 0; i < graph.length; i++) {
      let u = _minDistance(distancesTemp, visitedTemp);
      visitedTemp.push(u);

      if (u === target) {
        break;
      }

      for (let j = 0; j < graph.length; j++) {
        if (
          graph[u][j] != 0 &&
          !visitedTemp.includes(j) &&
          graph[u][j] + distancesTemp[u] < distancesTemp[j]
        ) {
          distancesTemp[j] = graph[u][j] + distancesTemp[u];
          prevNodesTemp[j] = u;
        }
      }
    }

    let currentNode = target;
    let pathArray = [currentNode];
    while (distancesTemp[currentNode] != 0) {
      pathArray.unshift(prevNodesTemp[currentNode]);
      currentNode = prevNodesTemp[currentNode];
    }

    setDistances(distancesTemp);
    setVisited(visitedTemp);
    setPrevNodes(prevNodesTemp);
    setNodePath(pathArray);

    setMainStatus("completed");
  };

  return (
    <div className={styles.bodyContainer}>
      <p className={styles.statusText}>status: {mainStatus}</p>
      <div className={styles.controlPanel}>
        <button
          disabled={initStatus === "source"}
          onClick={() => setInitStatus("source")}
        >
          Select source
        </button>
        <button
          disabled={initStatus === "target"}
          onClick={() => setInitStatus("target")}
        >
          Select target
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <Tiles
        props={{
          graph,
          distances,
          setDistances,
          visited,
          setVisited,
          prevNodes,
          setPrevNodes,
          source,
          setSource,
          target,
          setTarget,
          mainStatus,
          initStatus,
          nodePath,
        }}
      />
      <button disabled={mainStatus === "computation"} onClick={handleOnStart}>
        Start
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
