import styles from "./Body.module.css";
import Tiles from "../Tiles/Tiles";
import createMatrix from "../../utils/createMatrix";

export default function Body() {
  // adjacency matrix
  const side = 5;
  const graphMatrix = createMatrix(side);

  return (
    <div className={styles.bodyContainer}>
      <Tiles matrix={graphMatrix} />
    </div>
  );
}
