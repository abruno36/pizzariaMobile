import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container, { Toast } from 'toastify-react-native';

import { StackPramsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { api } from '../../services/api';

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  const [number, setNumber] = useState('');

  async function openOrder() {

    if (number === '') {
      Toast.error('Informe o número da mesa', "10");
      return;
    };

    try {
      //faser a requisição e abrir a mesa e navegar para a próxima tela
      const response = await api.post('/order', {
        table: Number(number)
      });
      if (response.status === 200 || response.status === 201) {
        Toast.success('Ordem criada com sucesso');
        navigation.navigate('Order', { number: number, order_id: response.data.id });
        setNumber('');
    } 
    }catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Tratar o erro 400 (Bad Request) específico aqui
        Toast.error('Ordem já cadastrada', '10');
      } else {
        console.error('Erro na requisição:', error.message);
      }
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <Container style={{ top: 0, height: 50, width: 300 }} />
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#FFF'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})