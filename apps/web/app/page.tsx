"use client";

import { useState } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100wh",
      }}
    >
      <div>
        <input
          style={{
            padding: 10,
          }}
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          type="text"
          placeholder="RoomId"
        ></input>
        <button
          style={{ padding: 10 }}
          onClick={() => {
            router.push("/room/${roomId}");
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
