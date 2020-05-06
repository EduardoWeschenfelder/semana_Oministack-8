
import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client'; // biblioteca de comunicação
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList'; //impot

import logo from '../assets/logo.png'; // impota a logo

export default function List() { //função para construir lista de spots por techs
  const [techs, setTechs] = useState([]); // estados para armazenar as tecnologias

  useEffect(() => { // ira executar ao abrir a tela
    AsyncStorage.getItem('user').then(user_id => { // AsyncStorage -> armazena as informações no dispositivo
      //socket = conecxão 
      const socket = socketio('http://192.168.100.4:3333', { // endereço ip ra acesssar pelo celular ou emulador
        query: { user_id } // identifica o user conectado
      })

      socket.on('booking_response', booking => { // ouve a resposta enviada  ra serva
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
        // envia ceita ou rejeitada para a reserva 
      })
    })
  }, []);

  useEffect(() => { // ira executar ao abrir a tela
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      // transforma as tecnologias em um array separandoas por virgulas e percorre o vetor removendo os espaços

      setTechs(techsArray); // atualiza as techs
    })
  }, []);

  // organiza os spots atraves do componente SpotList  em uma tela com scroll por cada tech que também é a chave id 
  return (
    //SafeAreaView é a area utilizavel da tela monile 
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10
  },
});