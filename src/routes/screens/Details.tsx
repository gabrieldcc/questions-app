import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "..";
import { RouteProp } from "@react-navigation/native";

interface DetailsProps {
    route: RouteProp<RootStackParamList, 'Details'>;  // Usando o tipo RootStackParamList e a tela 'Details'
  }

export default function Details ( {route}: DetailsProps ) {
    return (
        <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>Explicação:</Text>
            <Text style={styles.explanationText}>{route.params.explanation}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

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
        marginTop: 16
    }
})