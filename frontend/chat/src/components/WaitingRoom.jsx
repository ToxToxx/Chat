import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export const WaitingRoom = ({joinChat}) => {
    const [userName, setUserName] = useState();
    const [chatRoom, setChatRoom] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        joinChat(userName, chatRoom);
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                onSubmit = {onSubmit}
                className="max-w-sm w-full bg-white p-8 rounded shadow-lg"
            >
                <Heading size="lg" className="mb-6">Онлайн чат</Heading>
                <div className="mb-4">
                    <Text fontSize={"sm"}>Имя пользователя</Text>
                    <Input
                        onChange={(e) => setUserName(e.target.value)}
                        name="username"
                        placeholder="Введите ваше имя"
                    />
                </div>
                <div className="mb-6">
                    <Text fontSize={"sm"}>Название чата</Text>
                    <Input
                        onChange={(e) => setChatRoom(e.target.value)}
                        name="chatname"
                        placeholder="Введите название чата"
                    />
                </div>
                <Button type="submit" colorScheme="blue" className="w-full">
                    Присоединиться
                </Button>
            </form>
        </div>
    );
};
