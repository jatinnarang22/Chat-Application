import {Children, createContext} from 'react';

const ChatContext = createContext();

const  ChatProvider = ({children})=>{
    return <ChatContext.Provider>{Children}</ChatContext.Provider>
}
export default ChatProvider;