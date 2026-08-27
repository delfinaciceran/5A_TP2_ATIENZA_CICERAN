"use client";

import { useState } from "react";
import styles from "./NotaInput.module.css";

export default function NotaInput({ onAgregar }) {
  const [nota, setNota] = useState("");

  const numNota = Number(nota);
  const esInvalida = nota === "" || numNota < 0 || numNota > 10;

  const handleAgregar = () => {
    if (!esInvalida) {
      onAgregar(numNota);
      setNota("");
    }
  };

  return (
    <div className={styles.contenedorInput}>
      <input
        type="number"
        className={styles.input}
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        placeholder="Ingrese nota (0-10)"
      />
      <button
        className={styles.boton}
        onClick={handleAgregar}
        disabled={esInvalida}
      >
        Agregar nota
      </button>

      {esInvalida && (
        <p className={styles.error}>Ingresá una nota entre 0 y 10.</p>
      )}
    </div>
  );
}