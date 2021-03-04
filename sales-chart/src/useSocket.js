import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_DATA_EVENT = "newData"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:5000";

const useSocket = (roomId) => {
  const [salesRecords, setRecords] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId },
    });
    
    // Listens for incoming messages
    socketRef.current.on(NEW_DATA_EVENT, (records) => {
      console.log(records);
      if(records){
        setRecords(records);
      }
      
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  
  return { salesRecords, setRecords };
};

export default useSocket;