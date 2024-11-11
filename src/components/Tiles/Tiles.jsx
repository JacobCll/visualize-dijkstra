import Tile from "../Tile/Tile";
import styles from "./Tiles.module.css";
import tileStyles from "../Tile/Tile.module.css";
import { useState, useEffect } from "react";

export default function Tiles({ props }) {
  // setting up the Tiles component
  useEffect(() => {
    console.log("Recalculated container size.");
    const side = Math.sqrt(props.graph.length);

    const tileBoxElement = document.getElementsByClassName(
      tileStyles.tileBox
    )[0];
    const tileBoxWidth = window.getComputedStyle(tileBoxElement).width;

    const tilesContainerElement = document.getElementsByClassName(
      styles.tilesContainer
    )[0];
    const tilesContainerSize = parseFloat(tileBoxWidth) * side;

    tilesContainerElement.style.width = `${tilesContainerSize}px`;
    tilesContainerElement.style.height = `${tilesContainerSize}px`;
  }, [props.graph.length]);

  const [isPainting, setIsPainting] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  return (
    <div
      className={styles.tilesContainer}
      onMouseLeave={() => {
        setIsPainting(false);
        setIsErasing(false);
      }}
    >
      {props.graph.map((m, i) => (
        <Tile
          key={i}
          props={{
            ...props,
            isPainting,
            setIsPainting,
            isErasing,
            setIsErasing,
          }}
          nodeIndex={i}
        />
      ))}
    </div>
  );
}
