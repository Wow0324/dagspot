import { TouchableOpacity, Text } from "react-native"

const SkipButton = (props)=>{
    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <Text style={{color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', fontWeight: 500, fontSize: 16, lineHeight: 20}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default SkipButton;