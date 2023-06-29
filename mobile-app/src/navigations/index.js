import React from "react";
import { NativeBaseProvider } from 'native-base';
import { AppProvider } from "../contexts/AppProvider";
import { PlatformProvider } from "../contexts/PlatformProvider";
import Routes from "./Route";

const RouteProvider = () => {
    return (
        <NativeBaseProvider>
            <PlatformProvider>
                <AppProvider>
                    <Routes />
                </AppProvider>
            </PlatformProvider>
        </NativeBaseProvider>
    );
}

export default RouteProvider;