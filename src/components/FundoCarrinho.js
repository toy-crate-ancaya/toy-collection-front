import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import CarrinhoFundo from '../assets/fundoCarrinho.png';

const FundoCarrinho = () => {
  return (
    <Image source={CarrinhoFundo} style={styles.background} resizeMode="cover"/>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: -16,
    zIndex: -1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default FundoCarrinho;
