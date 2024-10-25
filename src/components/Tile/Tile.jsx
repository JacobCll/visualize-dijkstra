import styles from "./Tile.module.css";
import { useState } from "react";

export default function Tile({}) {
  const [isHovered, setIsHovered] = useState(false);
  return <div className={styles.tileBox}></div>;
}
