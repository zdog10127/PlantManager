import React from 'react';
import { Alert, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import waterdrop from '../../assets/water.png';
import colors from '../../styles/colors';
import { Button } from '../components/Button';

export function PlantSave(){
    return(
        <View style={styles.container}>
        <View style={styles.plantInfo}>
            <SvgFromUri uri="" height={150} width={150}/>
            <Text style={styles.plantName}>
                Nome da Planta
            </Text>
            <Text style={styles.plantAbout}>
                Sobre a planta
            </Text>
        </View>
        <View style={styles.controller}>
            <View style={styles.tipContainer}>
                <Image source={waterdrop} style={styles.tipImage} />
                <Text style={styles.tipText}>

                </Text>
            </View>
            <Text> style={styles.alertLabel}
                Escolha o melhor horário para ser lembrado:
            </Text>

            <Button title="Cadastrar Planta" onPress={() => {}}/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {

    },
    plantName: {
         
    },
    plantAbout: {

    },
    controller: {

    },
    tipContainer: {

    },
    tipText: {

    },
    tipImage: {

    },
    alertLabel: {

    }
});