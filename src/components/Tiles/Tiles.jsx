import Tile from "../Tile/Tile";
import styles from "./Tiles.module.css";

export default function Tiles({ matrix }) {
  return (
    <div className={styles.tilesContainer}>
      {matrix.map((m) => (
        <Tile />
      ))}
    </div>
  );
}
