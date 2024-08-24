import { WaitingRoom } from "./components/WaitingRoom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";

function App() {
  const[connection, setConnection] = useState(null);


  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5285/chat")
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", (userName, message) => {
     console.log(userName);
     console.log(message);
    });

    try{
      await connection.start();
      await connection.invoke("JoinChat", {userName, chatRoom});
      
      setConnection(connection);
    
    }catch(error){
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" >
          <WaitingRoom joinChat={joinChat}/>
          </div>
  );
}

export default App;
