import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api'; // importa a api

function SpotList({ tech, navigation }) { //função para visualizar os spots por tecnologias
  // NAVIGATION faz a navegaçao entre telas 
  const [spots, setSpots] = useState([]);

  useEffect(() => { //executa apos abrir a tela
    async function loadSpots() { // função carrega spots
      const response = await api.get('/spots', { //aguarda a solicitação dos spots
        params: { tech } //faz a seṕaração por tecnologia
      })

      setSpots(response.data); //recebe todos os spots no estado
    }

    loadSpots(); // executa a função de caregar os spots
  }, []); // irá executar uma vez

  function handleNavigate(id) { // função para ir a tela de serva como prarametro id do spot
    navigation.navigate('Book', { id }); // redireciona para a tela de reserva com o id do spot
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

      <FlatList // Uma interface de alto desempenho para renderizar listas simples e básicas
        style={styles.list}
        data={spots} //tranforma os dados em uma matriz
        keyExtractor={spot => spot._id}
        //keyExtractordiz à lista para usar os ids para as chaves de reação em vez da keypropriedade padrão
        horizontal // scroll orizontal
        showsHorizontalScrollIndicator={false} 
        // não mostrar a bara de scroll
        renderItem={({ item }) => ( //Retira um item  data e o renderiza na lista. item a item 
          //preenchendo os dados abaixo para cada spot
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  bold: {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    marginRight: 15,
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default withNavigation(SpotList);