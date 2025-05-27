import axios from "axios";

const api = axios.create({
    baseURL: 'https://toy-collection-ancaya.onrender.com',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 segundos
});

// Interceptor para logs de erro
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Erro na resposta:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('Erro na requisição:', {
                message: error.message,
                request: error.request
            });
        } else {
            console.error('Erro de configuração:', error.message);
        }
        return Promise.reject(error);
    }
);

// Interceptor para requisições
api.interceptors.request.use(
    config => {
        console.log('Enviando requisição para:', config.url);
        console.log('Método:', config.method);
        console.log('Headers:', config.headers);
        if (config.data instanceof FormData) {
            console.log('FormData fields:', Array.from(config.data.entries()));
        }
        return config;
    },
    error => {
        console.error('Erro na configuração da requisição:', error);
        return Promise.reject(error);
    }
);

export default api;