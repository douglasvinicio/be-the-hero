import React, {useEffect, useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import {View , FlatList, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles'
import api from '../../services/api';


export default function Incidents(){

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading ] = useState(false);

    async function loadIncidents(){
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params:{ page }
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    },[]);

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                    <Text style={styles.headerText}>
                      Total de <Text style-={styles.headerTextBold}> {total} casos.</Text>                        
                    </Text>
            </View>

                <Text style={styles.title}>Welcome to our app.</Text>
                <Text style={styles.description}>Choose one of the listed cases to help. Be someone's hero!</Text>



            <FlatList
            data = {incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem = {({ item: incident }) => (
                <View style={styles.incident}>
                    
                <Text style={styles.incidentProperty}> Company </Text>
                <Text style={styles.incidentValue}> {incident.name }</Text>

                <Text style={styles.incidentProperty}> Case Description: </Text>
                <Text style={styles.incidentValue}>{incident.title} </Text>

                <Text style={styles.incidentProperty}> How can you help?  </Text>
                <Text style={styles.incidentValue}> {incident.value} </Text>

                <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incident)}>
                    <Text style={styles.detailsButtonText}>Read more...</Text>
                    <Feather name='arrow-right' size={16} color='#e02041'/>
                </TouchableOpacity>

                </View>        
            )}           
            />  
        </View>


    );
}