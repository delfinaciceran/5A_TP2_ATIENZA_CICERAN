"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/hooks/page";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const { socket, isConnected } = useSocket();


  const sala = searchParams.get("sala") || "";
  const usuario = searchParams.get("usuario") || "";

  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);

  useEffect(() => {
    if (!socket || !sala) return;

    socket.emit("joinRoom", { room: sala });

    const handleNuevosMsg = (data) => {
      setConversacion((prev) => [...prev, data]);
    };

    socket.on("newMessage", handleNuevosMsg);

    return () => {
      socket.off("newMessage", handleNuevosMsg);
    };
  }, [socket, sala]);


  const handleSendMsg = (event) => {
    event.preventDefault();
    if (!mensaje.trim() || !socket) return;

    socket.emit("sendMessage", { message: mensaje, room: sala, usuario });
    setMensaje(""); // Limpiar el input tras enviar
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      {/* e. Mostrar el usuario y la sala actuales */}
      <h2>Chat en Vivo</h2>
      <p><strong>Usuario:</strong> {usuario}</p>
      <p><strong>Sala:</strong> {sala}</p>
      <p><strong>Estado:</strong> {isConnected ? "🟢 Conectado" : "🔴 Desconectado"}</p>

      <hr />

      {/* e. Lista de mensajes de la conversación */}
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        {conversacion.length === 0 ? (
          <p style={{ color: "gray" }}>No hay mensajes en esta sala aún.</p>
        ) : (
          conversacion.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "gray" }}>[{item.room}] </span>
              <strong>{item.usuario ? `${item.usuario}: ` : ""}</strong>
              <span>{item.message}</span>
            </div>
          ))
        )}
      </div>

      {/* c. Input y botón Enviar */}
      <form onSubmit={handleSendMsg} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          placeholder="Escribe un mensaje..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" disabled={!isConnected || !mensaje.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
}