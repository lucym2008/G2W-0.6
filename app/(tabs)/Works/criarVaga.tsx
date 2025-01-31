import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/config';
import { Botão, BotãoInicio } from '@/src/COMPONENTS/Botão';
import { Picker } from '@react-native-picker/picker';
import { colors } from '@/src/COMPONENTS/global';
import { TextArea } from '@/src/COMPONENTS/TextArea';
import { useRouter } from 'expo-router';

export default function Create_vaga() {
  const router = useRouter()

  const [descricao, setDescricao] = useState('');
  const [Experiencia, setExperiencia] = useState('');
  const [Competencias, setCompetencias] = useState('');
  const [setor, setSetor] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [name, setName] = useState('');
  const [tipo, setTipo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [salario, setSalario] = useState('');
  const [fone, setFone] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showHello, setShowHello] = useState(false); // Controle para alternar entre as funções

  const [areaCode, setAreaCode] = useState('(11) '); // Código de área fixo

  // Função chamada pelo botão
  async function Create() {
    if (!salario || isNaN(Number(salario))) {
      Alert.alert('Erro', "O campo 'salario' deve ser um número válido.");
      return;
    } if (!fone || isNaN(Number(fone)) || fone.length < 8) {
      Alert.alert('Erro', "O campo 'fone' deve ser um número válido com pelo menos 8 dígitos.");
      return;
    } if (name === '' || empresa === '' || salario === '' || fone === '') {
      Alert.alert('Erro', 'Todos os campos precisam estar preenchidos');
      return;
    }
    try {
      const newJob = {
        name: name,
        salario: salario,
        fone: fone,
        empresa: empresa,
        modalidades: selectedOption,
        Competecias: Competencias,
        Experiencia: Experiencia,
        descricao: descricao,
        localizacao: localizacao,
        tipo: tipo,
        setor: setor,
        uid: "gnxZyjqSPmXCmzqFlv0001JL1T92",
        createdAt: new Date(),
      };
      await addDoc(collection(db, 'Vagas-trabalho'), newJob);
      setName('');
      setEmpresa('');
      setSalario('');
      setFone('');
      setSelectedOption('');
      setCompetencias('');
      setExperiencia('');
      setDescricao('');
      Alert.alert('Concluído!', 'Vaga criada');
      // Após criar, chama a função para exibir "Olá"
      router.replace('/(tabs)/dashboard')
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
    }
  }

  // Função que altera o estado para exibir "Olá"
  function showHelloScreen() {
    setShowHello(true);
  }
  // Renderiza o conteúdo com base no estado
  if (showHello) {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizando...</Text>
      <Text style={styles.subTitle}>Opicionais:</Text>
      <TextInput
        value={Competencias}
        onChangeText={setCompetencias}
        placeholder="Competençias"
        style={styles.textInput}
      />
      <TextInput
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo de vaga"
        style={styles.textInput}
      />
      <Picker
        selectedValue={Experiencia}
        onValueChange={setExperiencia}
        style={styles.picker}
      >
        <Picker.Item label="Experiençia" value="" />
        <Picker.Item label="Não nessesaria" value="Desnessesaria" />
        <Picker.Item label="Estagiário " value="Estagiário" />
        <Picker.Item label="Júnior" value="Júnior" />
        <Picker.Item label="Sênior " value="Sênior" /> 
      </Picker>
      <View style={styles.containerAreaText}>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Escreva aqui sua descrição da vaga"
          placeholderTextColor="#888"
          multiline={true} // Permite várias linhas
          numberOfLines={4} // Sugere um tamanho inicial
          style={styles.textArea}
          textAlignVertical="top" // Alinha o texto ao topo
        />
      </View>
      <View style={styles.buttonArea}>
          <BotãoInicio onPress={Create}>
            <Text style={styles.textButton}>Continuar</Text>
          </BotãoInicio>
      </View>
    </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRIE SUA PROPRIA VAGA</Text>
      <Text style={styles.subTitle}>Obrigatorio:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome da vaga"
        style={styles.textInput}
      />
      <TextInput
        value={empresa}
        onChangeText={setEmpresa}
        placeholder="Empresa"
        style={styles.textInput}
      />
      <TextInput
        value={salario}
        onChangeText={setSalario}
        placeholder="Salário"
        style={styles.textInput}
      />
      <TextInput
        value={localizacao}
        onChangeText={setLocalizacao}
        placeholder="Localização"
        style={styles.textInput}
      />
      <Picker
        selectedValue={selectedOption}
        onValueChange={setSelectedOption}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma modalidade" value="" />
        <Picker.Item label="Integral" value="Integral" />
        <Picker.Item label="Híbrido" value="Hibrido" />
        <Picker.Item label="Home-office" value="Home-office" />
      </Picker>
      <Picker
        selectedValue={setor}
        onValueChange={setSetor}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma modalidade" value="" />
        <Picker.Item label="Tecnologia da Informação" value="TI" /> 
        <Picker.Item label="Saúde" value="Saude" /> 
        <Picker.Item label="Educação" value="Educacao" /> 
        <Picker.Item label="Vendas" value="Vendas" /> 
        <Picker.Item label="Marketing" value="Marketing" /> 
        <Picker.Item label="Engenharia" value="Engenharia" /> 
        <Picker.Item label="Finanças" value="Financas" /> 
        <Picker.Item label="Recursos Humanos" value="RH" /> 
        <Picker.Item label="Logística" value="Logistica" /> 
        <Picker.Item label="Atendimento ao Cliente" value="Atendimento" />
      </Picker>
      <View style={styles.containerFone}>
      <TextInput
        value={areaCode} // Código de área fixo
        editable={false} // Não permite edição
        style={styles.areaCodeInput}
      />
      <TextInput
        value={fone} // Número do telefone que o usuário pode editar
        onChangeText={setFone}
        placeholder="Número de telefone"
        keyboardType="numeric" // Exibe o teclado numérico
        style={styles.phoneInput}
      />
    </View>
      <View style={styles.buttonArea}>
          <Botão onPress={() => showHelloScreen()}>
            <Text style={styles.textButton}>Continuar</Text>
          </Botão>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#242424',
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 20,
    color: colors.amarelo1,
  },
  subTitle: {
    fontSize: 17,
    color: colors.tituloBranco,
    marginBottom: 3
  },
  textInput: {
    height: 50,
    paddingLeft: 30,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 7,
    fontSize: 17,
  },
  picker: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    marginVertical: 10,
    fontSize: 17,
  },
  textButton: {
    color: colors.texto,
    fontSize: 20,
    fontWeight: '400',
  },
  helloContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
  },
  buttonArea: {
    top: 110
  },
  containerAreaText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  textArea: {
    height: 130, // Altura do TextArea
    width: '100%', // Largura total do container
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    marginTop: 5,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },

  containerFone: {
    flexDirection: 'row', // Alinha os inputs horizontalmente
    alignItems: 'center',
  },
  areaCodeInput: {
    height: 50,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    marginRight: 5, // Espaço entre os inputs
    width: 80, // Largura fixa para o código de área
  },
  phoneInput: {
    height: 50,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    flex: 1, // O número do telefone ocupa o restante do espaço
  },
});
