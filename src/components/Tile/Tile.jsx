import styles from "./Tile.module.css";
import { useState } from "react";

// Tile component has all props of Tiles parent container
export default function Tile({ props, nodeIndex }) {
  const handleOnClick = () => {
    if (
      props.initStatus === "source" &&
      props.mainStatus === "initialization"
    ) {
      if (nodeIndex !== props.target) {
        props.setSource(nodeIndex);

        const distances = Array(props.graph.length).fill(Infinity);
        const prevNodes = [];
        distances[nodeIndex] = 0;
        prevNodes[nodeIndex] = 0;

        props.setDistances(distances);
        props.setPrevNodes(prevNodes);
      }
    } else if (
      props.initStatus === "target" &&
      props.mainStatus === "initialization"
    ) {
      if (nodeIndex !== props.source) {
        props.setTarget(nodeIndex);
      }
    }
  };
  return (
    <div
      className={`${styles.tileBox} ${
        props.target === nodeIndex ? styles.target : ""
      } ${props.source === nodeIndex ? styles.source : ""} ${
        props.nodePath.includes(nodeIndex) &&
        nodeIndex !== props.source &&
        nodeIndex !== props.target
          ? styles.path
          : ""
      }`}
      onClick={handleOnClick}
    ></div>
  );
}
