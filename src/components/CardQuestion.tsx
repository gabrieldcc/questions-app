
// // import { Box, Text, VStack, Radio, Button } from "native-base"
// // import { useState } from "react";

// // interface Question {
// //   _id?: string;
// //   question: string;
// //   options: string[];
// //   answer: string;
// // }

// // export default function CardQuestion({answer, question, options}: Question) {

// //   const [selectedAnswer, setSelectedAnswer] = useState<string>('');
// //   const [isCorrect, setIsCorrect] = useState<boolean | null>(null); 


// //   function checkAnswer() {
// //     if(selectedAnswer == answer) {
// //       setIsCorrect(true)
// //       console.log('Resposta correta')
// //     } else {
// //       setIsCorrect(false)
// //       console.log('Resposta incorreta')
// //     }
// //   }

// //     // Reset o estado do botão quando uma nova opção é selecionada
// //     function handleOptionChange(value: string) {
// //       setSelectedAnswer(value);
// //       setIsCorrect(null); // Reseta o botão ao estado padrão
// //     }


// //     return (
// //         <Box
// //         p={4}
// //         mb={3}
// //         bg="#f9f9f9"
// //         borderRadius={5}
// //         shadow={2}
// //         w="100%"
// //       >
// //         <Text fontSize="lg" fontWeight="bold">{question}</Text>
// //         <VStack mt={4} space={2}>
// //         <Radio.Group
// //           name="questionOptions"
// //           value={selectedAnswer}
// //           onChange={(handleOptionChange)}
// //         >
// //           {options.map((option, index) => (
// //             <Radio key={index} value={option} my={1}>
// //               {option}
// //             </Radio>
// //           ))}
// //         </Radio.Group>
// //       </VStack>
// //       <Button 
// //       mt={4} 
// //       onPress={checkAnswer}
// //       height={12}
// //       backgroundColor={ isCorrect == null ? 'blue.500' : isCorrect ? "green.500" : "red.500"   }
// //       > {isCorrect == null ? 'Conferir' : isCorrect ? "Correto" : "Incorreto"} </Button>
// //       </Box>
// //     )
// // }

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native';

// interface Question {
//   _id?: string;
//   question: string;
//   options: string[];
//   answer: string;
// }

// export default function CardQuestion({ answer, question, options }: Question) {
//   const [selectedAnswer, setSelectedAnswer] = useState<string>('');
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

//   function checkAnswer() {
//     if (selectedAnswer === answer) {
//       setIsCorrect(true);
//       Alert.alert('Resposta correta');
//     } else {
//       setIsCorrect(false);
//       Alert.alert('Resposta incorreta');
//     }
//   }

//   function handleOptionChange(value: string) {
//     setSelectedAnswer(value);
//     setIsCorrect(null); // Reseta o botão ao estado padrão
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.question}>{question}</Text>
//       <View style={styles.optionsContainer}>
//         {options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.option,
//               { borderColor: selectedAnswer === option ? 'blue' : 'gray' }
//             ]}
//             onPress={() => handleOptionChange(option)}
//           >
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Pressable
//         style={[
//           styles.button,
//           {
//             backgroundColor: isCorrect === null
//               ? 'blue'
//               : isCorrect
//                 ? 'green'
//                 : 'red'
//           }
//         ]}
//         onPress={checkAnswer}
//       >
//         <Text style={styles.buttonText}>
//           {isCorrect === null ? 'Conferir' : isCorrect ? 'Correto' : 'Incorreto'}
//         </Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     marginBottom: 12,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     width: '100%',
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   optionsContainer: {
//     marginTop: 16,
//   },
//   option: {
//     padding: 12,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 8,
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 16,
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

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
