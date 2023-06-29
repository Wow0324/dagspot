import { createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import KEYS from "../config/keys";
import MyPlatform from "../utils/MyPlatform";

export const PlatformContext = createContext({});
export const PlatformProvider = ({children}) => {
    const [orientation, setOrientation] = useState(MyPlatform.isPortrait() ? KEYS.PORTRAIT : KEYS.LANDSCAPE);
    const [devicetype, setDeviceType] = useState(MyPlatform.isTablet() ? 'tablet' : 'phone');
    const [SCREEN_HEIGHT, setScreenHeight] = useState(Dimensions.get('window').height);
    const [SCREEN_WIDTH, setScreenWidth] = useState(Dimensions.get('window').width);

    Dimensions.addEventListener('change', () => {
        setOrientation(MyPlatform.isPortrait() ? KEYS.PORTRAIT : KEYS.LANDSCAPE);
        setScreenHeight(Dimensions.get('window').height);
        setScreenWidth(Dimensions.get('window').width);
    });

    useEffect(()=>{
       setOrientation(KEYS.PORTRAIT);
       setDeviceType('phone');
    }, []);
    return (
        <PlatformContext.Provider
            value={{
                orientation,
                setOrientation,
                devicetype,
                setDeviceType,
                SCREEN_WIDTH,
                SCREEN_HEIGHT
            }}
        >
            {children}
        </PlatformContext.Provider>
    )
}