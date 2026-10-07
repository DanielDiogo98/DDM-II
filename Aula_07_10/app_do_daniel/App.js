import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  View,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>
          Conheça a história da LOUD!
        </Text>

          
          <Text style={styles.subtext}>
            CEO
          </Text>
          

        <Text style={styles.text}>
          Bruno é CEO e cofundador da Loud. Empresário e famoso pela criação de conteúdo, ele sempre sonhou em ser dono de uma equipe de esportes eletrônicos, enxergando um potencial de mercado gigantesco no ramo. Seu canal pessoal já conta com mais de 13,5 milhões de inscritos.

        {'\n\n'}
          
        <Text style={styles.subtext}>
            Origem da Loud
        </Text>
        {'\n\n'}

          Em 2021, PlayHard contou a um podcast um pouco do processo de criação da Loud. Idealizada em 2019, Bruno tinha o sonho de ser dono da própria organização de Esports. Foi quando, um ano antes, ele criou um time de Fortnite chamado Frontline, em conjunto com o youtuber Flakes, um dos maiores nomes do Fortnite no Brasil.
          

          A ideia da equipe era reunir diversos influenciadores com uma jogabilidade acima da média e criar conteúdo enquanto competiam. Devido à inexperiência dos dois e o foco em seus canais pessoais, o projeto acabou falhando, mas deu início à ideologia que a Loud carrega até hoje. Bruno seguiu com esse sonho, mas ainda sem saber por onde começar.

          Voltando à 2019, Bruno Playhard viajou para Los Angeles, a fim de participar da E3, maior feira de games do mundo . Foi ali que ele conheceu Jean Ortega, profissional com grande experiência na parte de processos e organização. Jean havia sido contratado pela Super Evil Megacorp, desenvolvedora de jogos que tem em Vainglory seu maior sucesso.

          Bruno e Jean se tornaram amigos e logo se reuniram para discutir ideias de negócio. Na visão de Playhard, o cenário competitivo mobile sempre foi negligenciado e preterido pelos fãs. Segundo ele, não existia uma equipe focada no mobile, mercado com imenso potencial lucrativo.

          Jean abraçou a ideia e convidou um outro parceiro para firmarem a sociedade. Essa pessoa foi Matthew Ho, até então colega de trabalho de Ortega na Super Evil Megacorp e com muito conhecimento na parte de negócios e planos estratégicos de forma global.
        </Text>

        <TextInput
          placeholder="Gosta da Loud?"
          style={styles.input}
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Faz o L</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  subtext: {
    fontSize: '200%',
    color: '#1b5f14',
    paddingBottom: '5%',
    paddingTop: '5%',
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 255, 42, 0.2)',
    color: 'rgb(43, 75, 30)'
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    width: '100%',
  },

  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.40);'
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
