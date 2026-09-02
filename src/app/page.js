"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const router = useRouter();

  // a. useState para usuario y sala
  const [usuario, setUsuario] = useState("");
  const [sala, setSala] = useState("");

  // b. Función para navegar pasando query params
  const handleEnterChat = () => {
    if (usuario.trim() !== "" && sala.trim() == "monarquia") {
      router.push(`/chat?sala=${sala}&usuario=${usuario}`);
    }
  };

  // c. Condición para validar que ambos campos tengan contenido
  const valido = usuario.trim() !== "" && sala.trim() !== "";



  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
      <h2>Unirse a una Sala</h2>

      {/* a. Inputs para usuario y sala */}
      <div>
        <label>Usuario: </label>
        <input
          type="text"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
          placeholder="Tu nombre..."
        />
      </div>

      <div>
        <label>Sala: </label>
        <input
          type="text"
          value={sala}
          onChange={(event) => setSala(event.target.value)}
          placeholder="Nombre de la sala..."
        />
      </div>

      {/* c. Conditional Rendering: Botón deshabilitado si usuario o sala están vacíos */}
      <button onClick={handleEnterChat} disabled={!valido}>
        Entrar al chat
      </button>

      {/* Mensaje condicional con && si faltan datos */}
      {!valido && (
        <p style={{ color: "red", fontSize: "14px" }}>
          Por favor ingresa un usuario y una sala para continuar.
        </p>
      )}

      <hr />

       <Link href="/Socket">
        Ir a prueba de Socket (Ping / Contador)
      </Link>
    </div>
  );
}