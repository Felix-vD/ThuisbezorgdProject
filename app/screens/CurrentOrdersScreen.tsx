import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet,
    ScrollView,
    Image,
    Modal,
    TextInput,
} from 'react-native';
import global from '../styles/global';

const screenWidth = Dimensions.get('window').width;
const segmentWidth = screenWidth / 2;

export default function CurrentOrdersScreen() {
    const [activeTab, setActiveTab] = useState(0);
    const indicatorPosition = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handleUpcomingPress = () => {
        setActiveTab(0);
        Animated.timing(indicatorPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handlePickedUpPress = () => {
        setActiveTab(1);
        Animated.timing(indicatorPosition, {
            toValue: segmentWidth,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleSubmitOrder = () => {
        console.log('Order submitted:', orderId);
        setModalVisible(false);
    };

    const upcomingOrders = [
        { id: 1, distance: '4.1 km', address: 'Hengelostraat 99', readyAt: '12:21' },
        { id: 2, distance: '3.8 km', address: 'Pluimstraat 39', readyAt: '12:30' },
    ];

    const pickedUpOrders = [
        { id: 1, orderNo: '82734632', address: 'Hengelostraat 99', latestArrival: '12:21', status: 'Active' },
        { id: 2, orderNo: '92734655', address: 'Paudri 21', latestArrival: '12:45', status: 'View' },
    ];

    const renderUpcomingOrders = () =>
        upcomingOrders.map((order) => (
            <View key={order.id} style={styles.card}>
                <Image
                    source={require('../../assets/images/emoji2.png')}
                    style={styles.mapImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardText}>Distance: {order.distance}</Text>
                    <Text style={styles.cardText}>Address: {order.address}</Text>
                    <Text style={styles.cardText}>Ready at: {order.readyAt}</Text>
                </View>
                <TouchableOpacity style={global.loginButton}>
                    <Text style={global.loginButtonText}>PICK</Text>
                </TouchableOpacity>
            </View>
        ));

    const renderPickedUpOrders = () =>
        pickedUpOrders.map((order) => (
            <View key={order.id} style={styles.card}>
                <Image
                    source={require('../../assets/images/emoji3.png')}
                    style={styles.mapImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardText}>Order no: {order.orderNo}</Text>
                    <Text style={styles.cardText}>Address: {order.address}</Text>
                    <Text style={styles.cardText}>Latest arrival: {order.latestArrival}</Text>
                </View>
                <TouchableOpacity style={global.loginButton}>
                    <Text style={global.loginButtonText}>
                        {order.status.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>
        ));

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Sliding Segmented Control */}
            <View style={styles.slidingBarContainer}>
                <View style={styles.slidingBar}>
                    <Animated.View
                        style={[
                            styles.slidingIndicator,
                            { left: indicatorPosition, width: segmentWidth },
                        ]}
                    />
                    <TouchableOpacity
                        style={[styles.segment, { width: segmentWidth }]}
                        onPress={handleUpcomingPress}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                activeTab === 0 && styles.activeSegmentText,
                            ]}
                        >
                            Upcoming Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segment, { width: segmentWidth }]}
                        onPress={handlePickedUpPress}
                    >
                        <Text
                            style={[
                                styles.segmentText,
                                activeTab === 1 && styles.activeSegmentText,
                            ]}
                        >
                            Picked Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Orders List */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {activeTab === 0 ? renderUpcomingOrders() : renderPickedUpOrders()}
            </ScrollView>

            {/* Button at the Bottom to Open Popup */}
            <TouchableOpacity
                style={[global.loginButton, { margin: 20 }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={global.loginButtonText}>Add Order</Text>
            </TouchableOpacity>

            {/* Modal Popup */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Order ID</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Order ID"
                            keyboardType="numeric"
                            value={orderId}
                            onChangeText={(text) => setOrderId(text)}
                        />
                        <TouchableOpacity
                            style={[global.loginButton, { backgroundColor: '#F39200' }]}
                            onPress={handleSubmitOrder}
                        >
                            <Text style={global.loginButtonText}>Submit Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[global.loginButton, { backgroundColor: '#F39200', marginTop: 10 }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={global.loginButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    slidingBarContainer: {
        width: '100%',
    },
    slidingBar: {
        width: '100%',
        height: 50,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        position: 'relative',
    },
    slidingIndicator: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#F39200',
    },
    segment: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F39200',
    },
    activeSegmentText: {
        color: '#fff',
    },
    contentContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    mapImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    cardText: {
        fontSize: 14,
        marginBottom: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F39200',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
