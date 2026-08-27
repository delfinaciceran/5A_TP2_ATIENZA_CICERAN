"use client";

import styles from "./NotaItem.module.css";

export default function NotaItem({ nota, indice, onEliminar }) {
  const aprobo = nota >= 6;

  return (
    <li className={styles.item}>
      <span>Nota N° {indice + 1}: {nota}</span>
      <span className={aprobo ? styles.aprueba : styles.noAprueba}>
        {aprobo ? "Aprueba" : "X No aprueba"}
      </span>
      <button
        className={styles.boton}
        onClick={() => onEliminar(indice)}
      >
        Eliminar
      </button>
    </li>
  );
}