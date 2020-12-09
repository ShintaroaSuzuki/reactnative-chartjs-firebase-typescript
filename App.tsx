import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    SafeAreaView
} from 'react-native';
import { Radar } from './components/Radar';
import firebase from './firebase/clientApp';

export default function App() {
    const [inputData, setInputData] = useState<null[] | number[]>(
        Array(6).fill(null)
    );
    const labels = [
        'HP',
        'こうげき',
        'ぼうぎょ',
        'とくこう',
        'とくぼう',
        'すばやさ'
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Radar Chart</Text>
            {[...Array(6)].map((_, i) => {
                return (
                    <View style={styles.inputUnit} key={`inputUnit_${i}`}>
                        <Text key={`inputLabel_${i}`}>{labels[i]}</Text>
                        <TextInput
                            style={styles.inputArea}
                            onChangeText={(value) => {
                                const newInputData = inputData.slice();
                                newInputData[i] = Number(value);
                                setInputData(newInputData);
                            }}
                            value={inputData[i]?.toString()}
                            key={`inputArea_${i}`}
                        />
                    </View>
                );
            })}
            <View style={styles.button}>
                <Button
                    title="submit"
                    onPress={() => {
                        firebase
                            .firestore()
                            .collection('data')
                            .doc('data')
                            .update({ dataArray: inputData });
                    }}
                />
            </View>
            <Radar />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30
    },
    inputUnit: {
        flexDirection: 'row',
        width: 120,
        height: 30,
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    inputArea: {
        borderBottomWidth: 1,
        width: 40,
        height: 30,
        right: 0,
        position: 'absolute',
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        marginBottom: 10
    }
});
