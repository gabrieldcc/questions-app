import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CardQuestionProps {
  question: string;
  options: string[];
  answer: string;
  explanation: string; // Campo que trará a explicação
}

const CardQuestion: React.FC<CardQuestionProps> = ({ question, options, answer, explanation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerPress = (option: string) => {
    setSelectedAnswer(option);

    // Verifica se a resposta está correta e, se sim, mostra a explicação
    if (option === answer) {
      setShowExplanation(true);
    } else {
      setShowExplanation(false);
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

      {/* Exibe a explicação abaixo das opções se a resposta estiver correta */}
      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>Explicação:</Text>
          <Text style={styles.explanationText}>{explanation}</Text>
        </View>
      )}
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
    backgroundColor: '#4CAF50', // Verde para resposta correta
  },
  incorrectOption: {
    backgroundColor: '#F44336', // Vermelho para resposta incorreta
  },
  optionText: {
    fontSize: 16,
    color: '#000', // Preto para texto em botões cinza
  },
  selectedOptionText: {
    color: '#fff', // Branco para texto em botões de resposta correta ou incorreta
  },
  explanationContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  explanationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
});

export default CardQuestion;
