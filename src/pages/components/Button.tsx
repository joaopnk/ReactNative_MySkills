import React from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet,
} from 'react-native';

// Passando todas as propriedades que um touchableOpacity tem, mais a minha tipagem
interface ButtonProps extends TouchableOpacityProps{
  title: string;
}

// ...rest = todas as propriedades que vier no button (dentro do buttonProps)
export function Button({ title, ...rest }: ButtonProps){
    return(
        <>
            <TouchableOpacity 
            style={styles.button} 
            activeOpacity={.7}
            {...rest}
            >
            <Text style={styles.buttonText}>{ title }</Text>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: '#A370F7',
      padding: 16,
      borderRadius: 7,
      alignItems: 'center',
      marginTop: 20
    },
    buttonText: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
    },
  })
  