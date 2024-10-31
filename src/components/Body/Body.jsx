import styles from "./Body.module.css";
import Tiles from "../Tiles/Tiles";
import createMatrix from "../../utils/createMatrix";
import { useEffect, useState } from "react";

// adjacency matrix
export default function Body() {
  const [sideLength, setSideLength] = useState(10);

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

  const [graph, setGraph] = useState(() => createMatrix(sideLength));

  const [distances, setDistances] = useState(
    Array(graph.length).fill(Infinity)
  );
  const [visited, setVisited] = useState(Array(graph.length).fill(false));
  const [prevNodes, setPrevNodes] = useState([]);

  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);
  useEffect(() => {
    console.log(
      "Body component mounted for the first time or graph side changed"
    );
    // when graph changes, reset everything
    setGraph(createMatrix(sideLength));
    setMainStatus("initialization");
    setInitStatus("source");
    setDistances(Array(graph.length).fill(Infinity));
    setVisited(Array(graph.length).fill(false));
    setPrevNodes([]);
    setSource(null);
    setTarget(null);
  }, [sideLength]);

  console.log(source, target);
  return (
    <div className={styles.bodyContainer}>
      <p className={styles.statusText}>Status: {mainStatus}</p>
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
        }}
      />
      <button disabled={mainStatus !== "computation"}>Start</button>
    </div>
  );
}
