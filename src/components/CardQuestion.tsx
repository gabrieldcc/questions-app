import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface CardQuestionProps {
  question: string;
  options: string[];
  answer: string;
  explanation: string;  // Campo que trará a explicação
}

const CardQuestion: React.FC<CardQuestionProps> = ({ question, options, answer, explanation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

   // Valor de opacidade animado
   const fadeAnim = useRef(new Animated.Value(0)).current

  const handleAnswerPress = (option: string) => {
    setSelectedAnswer(option);

    // Verifica se a resposta está correta e, se sim, mostra a explicação
    if (option === answer) {
      setShowExplanation(true);
      fadeIn();
    } 
  };

  const handleExplanationPress = () => {
      setShowExplanation(false);
      fadeOut();
  };

    // Função de animação fade-in
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,   // Alvo da opacidade (1 = completamente visível)
        duration: 500, // Duração da animação em milissegundos
        useNativeDriver: true, // Melhor performance com o Native Driver
      }).start();
    };

      // Função de animação fade-out
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Torna invisível
      duration: 800,
      useNativeDriver: true,
    }).start();



  };  

      // Função para alternar entre pergunta e explicação
  const handleCardPress = () => {
    setShowExplanation(!showExplanation);
    if (!showExplanation) {
      fadeIn();
    } else {
      fadeOut();
    }
  };

  return (
    <View style={styles.card}>
      {!showExplanation ? (
        <>
          <Text style={styles.question}>{question}</Text>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerPress(option)}
              style={[
                styles.optionButton,
                selectedAnswer === option && styles.selectedOption
              ]}
            > 
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <TouchableOpacity onPress={handleExplanationPress} activeOpacity={0.8}>
        <Animated.View style={[styles.explanationContainer, { opacity: fadeAnim }]}>
          <Text style={styles.explanationText}>Explicação:</Text>
          <Text style={styles.explanationText}>{explanation}</Text>
        </Animated.View>
        </TouchableOpacity>

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
  selectedOption: {
    backgroundColor: '#c0c0c0',
  },
  optionText: {
    fontSize: 16,
  },
  explanationContainer: {
    marginTop: 10,
  },
  explanationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
});

export default CardQuestion;
