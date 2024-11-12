import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';


interface CardQuestionProps {
  question: string;
  options: string[];
  answer: string;
  explanation: string; 
}

type CardQuestionScreenProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;


const CardQuestion: React.FC<CardQuestionProps> = ({ question, options, answer, explanation, }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigation = useNavigation<CardQuestionScreenProp>(); 

  const handleAnswerPress = (option: string) => {
    setSelectedAnswer(option);

    // Verifica se a resposta está correta e, se sim, mostra a explicação
    if (option === answer) {
      setShowExplanation(true)
      navigation.navigate("Details", { explanation } )
    } else {
      setShowExplanation(false)
    }
   
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAnswerPress(option)}
          style={[
            styles.optionButton,
            selectedAnswer === option && (option === answer ? styles.correctOption : styles.incorrectOption),
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selectedAnswer === option && (option === answer || option !== answer) && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#000', 
  },
  selectedOptionText: {
    color: '#fff', 
  },
});

export default CardQuestion;
