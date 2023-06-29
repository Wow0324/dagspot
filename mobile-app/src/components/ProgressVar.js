import { View } from 'react-native';

const ProgressVar = ({ curstep, top }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: top }}>
            {
                [1, 2, 3].map((step, index) => {
                    return (
                        <View key={index}
                            style={{
                                borderRadius: 6,
                                height: 9,
                                backgroundColor: step == curstep ? '#FF3334' : '#FFFFFF',
                                width: step == curstep ? 42 : 21,
                                marginRight: index == 2 ? 0 : 3
                            }}
                        >
                        </View>
                    )
                })
            }
        </View>
    )
}

export default ProgressVar;