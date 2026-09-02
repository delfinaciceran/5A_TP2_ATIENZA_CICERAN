"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/page";

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

        
            <button onClick={handleSendPing} disabled={!isConnected}>
                Enviar ping a todos
            </button>

            <ul>
                {mensajes.map((mensaje, index) => (
                    <li key={index}>
                        {typeof mensaje === "object" && mensaje !== null ? mensaje.msg || JSON.stringify(mensaje) : mensaje}
                    </li>
                ))}
            </ul>

            <button onClick={emitirEvento} disabled={!isConnected}>
                Contar +1
            </button>

            <p>Contador: {contador}</p>
        </div>
    );
}