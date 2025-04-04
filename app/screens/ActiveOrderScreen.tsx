import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

export default function ActiveOrderScreen() {
    const address = 'Hengelostraat 99';
    const orderNo = '82734632';

    const handleChatPress = () => {
        console.log('Chat button pressed');
    };

    const handleMapsPress = () => {
        console.log('Open in maps pressed');
    };

    const handleStartOrder = () => {
        console.log('Start order pressed');
    };

    const handleFinish = () => {
        console.log('Finish order pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.addressText}>{address}</Text>
                <Text style={styles.orderNoText}>no: {orderNo}</Text>
            </View>

            <View style={styles.middleSection}>
                <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
                    <Image
                        source={require('../assets/images/chatIcon.png')}
                        style={styles.chatIcon}
                    />
                    <Text style={styles.chatButtonText}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mapsButton} onPress={handleMapsPress}>
                    <Image
                        source={require('../assets/images/mapsIcon.png')}
                        style={styles.mapsIcon}
                    />
                    <Text style={styles.mapsButtonText}>Open in maps</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.startOrderButton} onPress={handleStartOrder}>
                    <Text style={styles.startOrderText}>Start order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                    <Text style={styles.finishButtonText}>Finish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-between',
    },
    topSection: {
        alignItems: 'center',
        marginTop: 40,
    },
    addressText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    orderNoText: {
        fontSize: 14,
        color: '#777',
    },
    middleSection: {
        alignItems: 'center',
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        marginBottom: 20,
    },
    chatIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    chatButtonText: {
        fontSize: 16,
        color: '#F39200',
        fontWeight: 'bold',
    },
    mapsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    mapsIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    mapsButtonText: {
        fontSize: 16,
        color: '#F39200',
        fontWeight: 'bold',
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    startOrderButton: {
        flex: 1,
        backgroundColor: '#F39200',
        marginRight: 10,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    startOrderText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    finishButton: {
        flex: 1,
        backgroundColor: '#FF3B30',
        marginLeft: 10,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    finishButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
