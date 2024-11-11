import { useEffect, useState } from "react";
import styles from "./Body.module.css";
import Tiles from "../Tiles/Tiles";
import createMatrix from "../../utils/createMatrix";
import addObstacles from "../../utils/addObstacles";

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
   * 4 initialization statuses
   *  1. source - selection of source node
   *  2. target - selection of target node
   *  3. obstacle - setting graph obstacles
   *  4. eraser - erasing obstacles from graph
   */
  const [initStatus, setInitStatus] = useState("source");

  const [sideLength, setSideLength] = useState(10);

  const originalGraph = createMatrix(sideLength);
  const [graph, setGraph] = useState(originalGraph);

  const [distances, setDistances] = useState(
    Array(graph.length).fill(Infinity)
  );
  const [visited, setVisited] = useState([]);
  const [prevNodes, setPrevNodes] = useState([]);

  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);
  const [obstacles, setObstacles] = useState([]);

  const [nodePath, setNodePath] = useState([]);

  const reset = () => {
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
    // when graph size changes, reset everything
    setGraph(() => createMatrix(sideLength));
    setObstacles([]);
    reset();
  }, [sideLength]);

  useEffect(() => {
    setGraph(() => addObstacles(originalGraph, obstacles, sideLength));
  }, [obstacles]);

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
      } else if (u == undefined) {
        setError("no path found");
        setMainStatus("initialization");
        return;
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

  console.log(obstacles);
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.topControlPanel}>
        <div className={styles.sizeSelect}>
          <label htmlFor="size-select">Select size:</label>
          <select
            name="sizes"
            id="size-select"
            value={sideLength}
            onChange={(e) => setSideLength(Number(e.target.value))}
          >
            <option value="5">5x5</option>
            <option value="10">10x10</option>
            <option value="15">15x15</option>
            <option value="20">20x20</option>
            <option value="25">25x25</option>
          </select>
        </div>

        <p className={styles.statusText}>Status: {mainStatus}</p>
      </div>

      <div className={styles.controlPanel}>
        <button
          disabled={initStatus === "source" || mainStatus === "completed"}
          onClick={() => setInitStatus("source")}
        >
          Select source
        </button>
        <button
          disabled={initStatus === "target" || mainStatus === "completed"}
          onClick={() => setInitStatus("target")}
        >
          Select target
        </button>
        <button
          disabled={initStatus === "obstacle" || mainStatus === "completed"}
          onClick={() => setInitStatus("obstacle")}
        >
          Set obstacles
        </button>
        {obstacles.length > 0 && (
          <button
            className={styles.eraser}
            disabled={initStatus === "eraser" || mainStatus === "completed"}
            onClick={() => setInitStatus("eraser")}
          >
            Eraser
          </button>
        )}
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
          obstacles,
          setObstacles,
        }}
      />
      <div className={styles.bottomControlPanel}>
        <button
          disabled={mainStatus === "computation" || mainStatus === "completed"}
          onClick={handleOnStart}
        >
          Start
        </button>
        <button onClick={reset}>Reset</button>
        {obstacles.length > 0 && (
          <button
            className={styles.clearAllObstacles}
            onClick={() => {
              setObstacles([]);
            }}
          >
            Clear all obstacles
          </button>
        )}
      </div>
    </div>
  );
}
