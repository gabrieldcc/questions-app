import axios from "axios";

export async function fetchQuestions() {
    try {
        const response = await axios.get('http://localhost:3000/questions');
        //https://questions-api-production.up.railway.app/questions
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios-specific error handling
            console.error('Erro ao buscar questões:');
            console.error('Mensagem:', error.message);
            console.error('Status:', error.response?.status); // Código de status HTTP
            console.error('Dados da resposta:', error.response?.data); // Dados da resposta do erro
            console.error('Cabeçalhos da resposta:', error.response?.headers); // Cabeçalhos da resposta
        } else {
            console.error('Erro desconhecido:', error);
        }
    }
};