import { TouchableOpacity, Text } from "react-native"

const AppButton = (props)=>{
    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <Text style={{color: 'white', textAlign: 'center', fontWeight: 600, fontSize: 20}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton;