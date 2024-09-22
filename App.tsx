import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, ScrollView } from 'react-native';
import { fetchQuestions } from './src/services/questions-service';
import CardQuestion from './src/components/CardQuestion';

interface Question {
  _id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const data = await fetchQuestions();
      //console.log('setting questions', data);
      //console.log(data[0].explanation)
      setQuestions(data);
    } catch (error) {
      console.error('Erro ao carregar as questões:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Simulado AWS</Text>
      </View>
      <FlatList
        data={questions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CardQuestion
            answer={item.answer}
            question={item.question}
            options={item.options}
            explanation={item.explanation}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
