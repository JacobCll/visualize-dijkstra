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
      } ${props.source === nodeIndex ? styles.source : ""}`}
      onClick={handleOnClick}
    ></div>
  );
}
