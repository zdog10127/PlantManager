import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrmary } from '../components/PlantCardPrimary';
import api from '../services/api';
import { Load } from '../components/Load';

interface EnviromentProps{
    key: string;
    title: string;
}

interface PlantsProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    }
}

export function PlantSelect(){
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    function handleEnrivomentSelected(environment: string){
        setEnviromentSelected(environment);

        if(environment == 'all')
            return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        )

        setFilteredPlants(filtered);
    }

    useEffect(() => {
        async function fecthEnviroment(){
            const {data} = await api.get('plants_environments?_sort=name&_order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fecthEnviroment();
    }, [])

    useEffect(() => {
        async function fecthPlants(){
            const {data} = await api.get('plants?_sort=name&_order=asc');
            setPlants(data);
            setFilteredPlants(data);
            setLoading(false);
        }

        fecthPlants();
    }, [])

    if(loading)
        return <Load />
    return(
        <View style={styles.container}>
           <View style={styles.header}>
                <Header/>
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    voce quer colocar sua planta?
                </Text>
           </View>
           <View>
               <FlatList
               data={enviroments}
               keyExtractor={(item) => String(item.key)}
               renderItem={({item}) => (
                <EnviromentButton title={item.title} active={item.key == enviromentSelected}
                onPress={() => handleEnrivomentSelected(item.key)} />
               )} horizontal showsHorizontalScrollIndicator={false} 
               contentContainerStyle={styles.enviromentList}/>
           </View>
           <View style={styles.plants}>
               <FlatList
                data={filteredPlants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <PlantCardPrmary data={item} />
                )}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
               />
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       flex: 1,
       backgroundColor:colors.background
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    header:{
        paddingHorizontal: 20
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})