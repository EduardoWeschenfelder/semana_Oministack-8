
import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api'; // importa a api

import logo from '../assets/logo.png'; // importa a logo

export default function Login({ navigation }) { //função para login com navigation para alterar entre telas no celular
  // na web era o history no modile é NAVIGATION
  const [email, setEmail] = useState(''); //estado para armazenar email e função para atualizar email (setEmail)
  const [techs, setTechs] = useState(''); ///estado para armazenar techs e função para atualizar techs (setTechs)

  useEffect(() => { // função que será executada uma vez para fazer login
    AsyncStorage.getItem('user').then(user => { // armazena as informações no dispositivo
      if (user) {
        navigation.navigate('List');
      }
    })
  }, []);

  async function handleSubmit() {  //função para fazer login/ acessar através do email
    const response = await api.post('/sessions', {
      email
    })

    const { _id } = response.data; //recebe todos os dados da sessão acima

    await AsyncStorage.setItem('user', _id); // aguarda salvar o id do usuario e as tecnologias 
    await AsyncStorage.setItem('techs', techs); // aguarda salvar o id do usuario e as tecnologias 

    navigation.navigate('List'); //envia o usuario para a tela List
  }

  return (
    //função para ajustar o teclado nao sobrepor os campos e o botão 
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address" //teclado que traz o @ na primeira tela do teclado
          autoCapitalize="none" // nenhuma letra em maiusculo
          autoCorrect={false} // desebiita o correetor
          value={email} // mantem atualizado
          onChangeText={setEmail} // atualiza o valor quando o texto mudar
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words" // techado  com primeira letra de cada palavra em maiuscula
          autoCorrect={false}
          value={techs} // mantem atualizado
          onChangeText={setTechs} //atualiza o valor quando o texto mudar
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button} // botão que muda a opacidade ao ser clicado 
        //chama função ao ser pressionado 
        >
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ //StyleSheet é uma abstração semelhante ao CSS StyleSheets
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});