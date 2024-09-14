import axios from "axios";

export async function fetchQuestions() {
    try {
        const response = await axios.get('https://questions-api-production.up.railway.app/questions');
        //console.log('Response JSON completo:', JSON.stringify(response.data, null, 2));
        //setQuestions(response.data);
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
            // Erro não específico do Axios
            console.error('Erro desconhecido:', error);
            //console.error('Erro ao buscar questões:', error);
        }
    }
};