"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/page"; // Ajusta la ruta según tu proyecto

export default function SocketChat() {
    const { socket, isConnected } = useSocket();
    const [mensajes, setMensajes] = useState([]);
    const [contador, setContador] = useState(0);

    const handleSendPing = () => {
        if (socket) {
            socket.emit("pingAll", { msg: "Hola desde mi compu" });
        }
    };

    function emitirEvento() {
        socket.emit("eventoPersonalizado");
    }

    useEffect(() => {
        if (!socket) return;

        console.log("Web Socket Conectado");

        socket.on("pingAll", (data) => {
            console.log(data);
            setMensajes((prev) => [...prev, data]);
        });

        socket.on("respuestaPersonalizada", (data) => {
            setContador(data.contador);
        });

    }, [socket]);


    return (
        <div >
            <p>{isConnected ? "🟢 Conectado al servidor" : "🔴 Desconectado"}</p>

            {/* b. Botón Enviar ping a todos */}
            <button onClick={handleSendPing} disabled={!isConnected}>
                Enviar ping a todos
            </button>

            {/* d. Renderizar la lista de mensajes recibidos */}
            <ul>
                {mensajes.map((item, index) => (
                    <li key={index}>
                        {typeof item === "object" && item !== null ? item.msg || JSON.stringify(item) : item}
                    </li>
                ))}
            </ul>

            <button onClick={emitirEvento} disabled={!isConnected}>
                Contar +1
            </button>

            {/* e. Mostrar en pantalla: "Contador: X" */}
            <p>Contador: {contador}</p>
        </div>
    );
}