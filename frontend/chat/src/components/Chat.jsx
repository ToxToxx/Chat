import { CloseButton, Heading} from "@chakra-ui/react";

export const Chat = ({chatRoom, closeChat}) => {
    return <div className="w-1/2 bg-white p-8 rounded shadow-lg">
        <div className="flex flex-row justify-between mb-5">
            <Heading size = "lg">{chatRoom}</Heading>
            <CloseButton onClick={closeChat}/>
        </div>
    </div>
}