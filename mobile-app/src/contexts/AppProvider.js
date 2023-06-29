import { createContext, useState } from "react";

export const AppContext = createContext({});
export const AppProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [selectedEvent, setSelectedEvent] = useState({})
    return (
        <AppContext.Provider
            value={{
                userInfo,
                setUserInfo,
                selectedEvent,
                setSelectedEvent
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
