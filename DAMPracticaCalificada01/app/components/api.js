import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    contenedor: {
        width:430,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'black',
        borderTopColor: 'black',
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 2,
        backgroundColor: 'orange'
    },
    texto: {
        width:250,
        marginLeft:10
        
    },
    imagen: {
        height:100,
        width: 100,
        borderRadius: 50,
        borderColor:'red'
    },
    contenedorImagen: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenedorFlecha: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

function Item(props){
    return(
        <View style={styles.contenedor}>
            <View style={styles.contenedorImagen}>
                <Image style={styles.imagen} source={{uri: props.image}}/>
            </View>

            <View style={styles.texto}>
                <Text style={{ flex: 1, fontSize:25, color: 'white' }}>{props.titulo}</Text>
                <Text numberOfLines={4} style={{ textAlign: 'left' }}>{props.resumen}</Text>
            </View>
            <View style={styles.contenedorFlecha}>
                <Button
                    title=">"
                    onPress={ () => props.navigation.navigate('Detalles', {
                        titulo: props.titulo,
                        imagen: props.image,
                        texto: props.resumen
                    })}
                />
            </View>
        </View>
    )
}

function Home({ navigation }) {
    const [lista, setLista] = useState([])

    useEffect(() => {
        fetch(
          "https://yts.mx/api/v2/list_movies.json"
        )
        .then(res => res.json())
        .then(
            result => {
                setLista(result.data.movies)
            },
        )}
    )
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={lista.length > 0 ? lista : []} renderItem={({item})=>{
                    return(
                    <Item image={item.medium_cover_image} titulo={item.title} resumen={item.summary} navigation={navigation}/>)
                }}
                keyExtractor = {item => item.id}
            />
        </View>
    );
}

export default Home