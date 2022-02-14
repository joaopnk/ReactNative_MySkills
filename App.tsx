import React from 'react';
import { 
  StatusBar, //Para manipular a status bar (barra de bateria, hr, etc, do cell..)
} from 'react-native';

import { Home } from './src/pages/Home';

export default function App(){
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>

  )
}