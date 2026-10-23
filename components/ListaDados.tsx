import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

interface Dado{
    id: string;
    title:string;
    body:string;
}

const ListaDados = () => {
    const [dados, setDados] = useState<Dado[]>([])
    const [carregando, setCarregando] = useState<boolean>(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/').then((resposta) => resposta.json()).then((dados) => {
            setDados(dados)
            setCarregando(false)
        })
    })

    if(carregando){
        return <ActivityIndicator size='large'/>
    }

  return (
    <FlatList
        data={dados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
            <View style={styles.coment}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.texto}>{item.body}</Text>
                <Text style={styles.id}>ID. {item.id}</Text>
            </View>
        )}
    />
  )
}

export default ListaDados

const styles = StyleSheet.create({
    coment:{
        backgroundColor: 'white',
        margin: 4,
        gap: 5,
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 1
    },
    titulo:{
        fontSize: 22,
        fontWeight: 600,
        textAlign: 'center'
    },
    texto:{
        fontSize: 16,
        textAlign: 'justify'
    },
    id:{
        fontSize: 12,
        fontStyle: 'italic',
        color: '#8c8c8c',
        textAlign: 'right'
    }
})