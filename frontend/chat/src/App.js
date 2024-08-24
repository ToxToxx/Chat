import { WaitingRoom } from "./components/WaitingRoom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";
import { Chat } from "./components/Chat";

function App() {
  const[connection, setConnection] = useState(null);
  const[chatRoom, setChatRoom ] = useState(" ");
  const[messages, setMessages ] = useState([]);

  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5285/chat")
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", (userName, message) => {
     setMessages((messages) => [...messages, {userName, message}])
    });

    try{
      await connection.start();
      await connection.invoke("JoinChat", {userName, chatRoom});
      
      setConnection(connection);
      setChatRoom(chatRoom);
    }catch(error){
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" >
         {connection? (
           <Chat messages = {messages} chatRoom = {chatRoom}/>)
            : ( 
            <WaitingRoom joinChat={joinChat}/>
            )}
          </div>
  );
}

export default App;
