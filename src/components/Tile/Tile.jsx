import styles from "./Tile.module.css";
import { useState } from "react";

// Tile component has all props of Tiles parent container
export default function Tile({ props, nodeIndex, isPainting, setIsPainting }) {
  const isValidObstacle =
    props.initStatus === "obstacle" &&
    props.mainStatus === "initialization" &&
    nodeIndex !== props.source &&
    nodeIndex !== props.target;

  const handleOnClick = () => {
    if (
      props.initStatus === "source" &&
      props.mainStatus === "initialization" &&
      nodeIndex !== props.target &&
      !props.obstacles.includes(nodeIndex)
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
      !props.obstacles.includes(nodeIndex)
    ) {
      props.setTarget(nodeIndex);
    }
  };

  // for painting graph obstacles
  const handleOnMouseDown = () => {
    if (props.initStatus === "eraser") {
      props.setIsErasing(true);
      props.setObstacles((prevobstacles) =>
        prevobstacles.filter((i) => i !== nodeIndex)
      );
    } else if (props.initStatus === "obstacle" && isValidObstacle) {
      props.setIsPainting(true);
      props.setObstacles([...props.obstacles, nodeIndex]);
    }
  };
  const handleOnMouseUp = () => {
    props.setIsPainting(false);
    props.setIsErasing(false);
  };

  const handleOnMouseEnter = () => {
    if (isValidObstacle && props.isPainting) {
      props.setObstacles([...props.obstacles, nodeIndex]);
    }
    if (props.isErasing && props.obstacles.includes(nodeIndex)) {
      props.setObstacles((prevObstacles) =>
        prevObstacles.filter((i) => i !== nodeIndex)
      );
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
      } ${props.obstacles.includes(nodeIndex) ? styles.obstacle : ""}`}
      onClick={(e) => {
        handleOnClick();
      }}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleOnMouseUp}
    ></div>
  );
}
