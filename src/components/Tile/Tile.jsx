import styles from "./Tile.module.css";

// Tile component has all props of Tiles parent container
export default function Tile({ props, nodeIndex }) {
  const isValidObstacle =
    props.initStatus === "obstacle" &&
    props.mainStatus === "initialization" &&
    nodeIndex !== props.source &&
    nodeIndex !== props.target &&
    !props.obstacles.has(nodeIndex);

  const handleOnClick = () => {
    if (
      props.initStatus === "source" &&
      props.mainStatus === "initialization" &&
      nodeIndex !== props.target &&
      !props.obstacles.has(nodeIndex)
    ) {
      const distances = Array(props.graph.length).fill(Infinity);
      const prevNodes = [];
      distances[nodeIndex] = 0;
      prevNodes[nodeIndex] = 0;

      props.setDistances(distances);
      props.setPrevNodes(prevNodes);

      props.setSource(nodeIndex);
    } else if (
      props.initStatus === "target" &&
      props.mainStatus === "initialization" &&
      nodeIndex !== props.source &&
      !props.obstacles.has(nodeIndex)
    ) {
      props.setTarget(nodeIndex);
    }
  };

  // for painting graph obstacles
  const handleOnMouseDown = () => {
    if (props.initStatus === "eraser") {
      props.setIsErasing(true);
      props.setObstacles((prevObstacles) => {
        const newObstacles = new Set(prevObstacles);
        newObstacles.delete(nodeIndex);
        return newObstacles;
      });
    } else if (props.initStatus === "obstacle" && isValidObstacle) {
      props.setIsPainting(true);
      props.setObstacles((prevObstacles) =>
        new Set(prevObstacles).add(nodeIndex)
      );
    }
  };

  const handleOnMouseUp = () => {
    props.setIsPainting(false);
    props.setIsErasing(false);
  };

  const handleOnMouseEnter = () => {
    if (isValidObstacle && props.isPainting) {
      props.setObstacles((prevObstacles) =>
        new Set(prevObstacles).add(nodeIndex)
      );
    } else if (props.isErasing && props.obstacles.has(nodeIndex)) {
      props.setObstacles((prevObstacles) => {
        const newObstacles = new Set(prevObstacles);
        newObstacles.delete(nodeIndex);
        return newObstacles;
      });
    }
  };

  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      className={`${styles.tileBox} ${
        props.target === nodeIndex ? styles.target : ""
      } ${props.source === nodeIndex ? styles.source : ""} ${
        props.nodePath.includes(nodeIndex) &&
        nodeIndex !== props.source &&
        nodeIndex !== props.target
          ? styles.path
          : ""
      } ${props.obstacles.has(nodeIndex) ? styles.obstacle : ""}`}
      onClick={(e) => {
        handleOnClick();
      }}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    ></div>
  );
}
