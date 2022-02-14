import React, { Fragment, useState, useEffect } from 'react';
// SafeAreaView: Serve para ajustar no caso do IOS e não fugir da tela  
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         Platform,
         ScrollView, //Recomendado para poucos itens de uma lista
         FlatList, // Listagem que carrega dinamicamente, só os itens que acaba naquele momento da tela 
      
        } from 'react-native'; 
// #Componentes:
import { Button } from './components/Button';
import { SkillCard } from './components/SkillCard';

// Dados da skill
interface SkillData {
  id: string;
  name: string;
}


export function Home(){
  //  estado | o que atualiza o estado | valor inicial
  // Armazenando nova skill
  const [newSkill, setNewSkill] = useState('');
  // Armazenando todas as skills existentes
  const [mySkills, setMySkills] = useState<SkillData[]>([]);

  // Estado que vai atualizar "bom dia/ boa tarde/ boa noite" baseado no hr. do dia
  const [greeting, setGreeting] = useState('');

  function handleAddSkill(){
    // Tipando data
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    // oldState: pegando o estado anterior e adicionando junto com o novo estado (nova skill)
    setMySkills(oldState => [...oldState, data]);
  }

  // Para remover skill
  function handleRemoveSkill(id: string){
    // Recuperando estado ( o que tem armazenado no momento) e percorrendo com o skill
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id //Recuperando somente as skill que forem diferente do informado
    ))
  }

  // { o que vai fazer}, [quando deve atualizar! (vinculando a um estado), caso seja vazio, atualiza só qnd aberto]
  useEffect( () => {

    // Atualizando o estado da frase baseado no horario
    const currentHour = new Date().getHours();
    
    if(currentHour < 12){
      setGreeting('Good morning! ✨');
    }
    else if(currentHour >= 12 && currentHour < 18){
      setGreeting('Good afternoon! ☀️')
    }
    else{
      setGreeting('Good night! 🌙')
    }

  }, [])

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, João</Text>

        <Text style={styles.greetings}>
          {greeting}
        </Text>

        <TextInput
          style={styles.input}
          placeholder='New skill'
          placeholderTextColor='#555'
          onChangeText={setNewSkill}
        />

        <Button title="Add"
                onPress={handleAddSkill}

        />
        
        <Text style={[styles.title, {marginVertical: 50}]}>
          My Skills
        </Text>


        <FlatList 
            data={mySkills}  
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SkillCard 
                  skill={item.name}
                  onPress={ () => handleRemoveSkill(item.id)}
              
              />
            )}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#fff',
    fontSize: 18,
    // Com platform você pode personalizar o tamanho de acordo com o sistema
    padding: Platform.OS == 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#fff',
  }
})
