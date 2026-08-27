"use client";

import { useState, useEffect } from "react";
import styles from "./Home.module.css";

export default function Home() {
  const [alumno, setAlumno] = useState("");
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  useEffect(() => {
    document.title = "Pio Promedios Inicio";
  }, []);

  useEffect(() => {
    console.log("El alumno cambió:", alumno);
  }, [alumno]);

  return (
    <div className={styles.pagina}>
      <div className={styles.columna}>
        <input
          type="text"
          className={styles.input}
          value={alumno}
          onChange={(e) => setAlumno(e.target.value)}
          placeholder="Ingresá tu nombre"
        />

        {alumno === "" ? (
          <p className={styles.mensaje}>
            Por favor, ingresá tu nombre para continuar.
          </p>
        ) : (
          <div className={styles.bienvenida}>
            <p>¡Hola, {alumno}!</p>
            <p>Accedé a la calculadora en: http://localhost:3000/notas</p>
          </div>
        )}

        <button
          className={styles.boton}
          onClick={() => setMostrarAyuda(!mostrarAyuda)}
        >
          Mostrar/Ocultar ayuda
        </button>

        {mostrarAyuda && (
          <div className={styles.ayuda}>
            <p>Instrucciones de uso:</p>
            <ul>
              <li>Ingresá a la ruta /notas para ver el listado.</li>
              <li>Podés agregar notas entre 0 y 10.</li>
              <li>El promedio se recalcula automáticamente.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}