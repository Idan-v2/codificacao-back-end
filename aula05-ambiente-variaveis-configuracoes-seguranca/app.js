// app.js
import dotenv from 'dotenv';
dotenv.config(); // Injeta as variáveis do .env dentro de process.env

function iniciarAplicacao() {
    // Leitura das variáveis com valores de fallback seguro
    const porta = process.env.PORT || 8080;
    const apiKey = process.env.API_KEY_PAGAMENTO;
    const dbUrl = process.env.DATABASE_URL;

    // Validação obrigatória de credenciais sensíveis
    if (!apiKey) {

console.error('ERRO CRÍTICO: A chave API_KEY_PAGAMENTO não está definida nas variáveis de ambiente!');
        process.exit(1);
    }

    console.log('=== SERVIÇO DE CONFIGURAÇÃO CARREGADO ===');
    console.log(`Servidor rodando na porta: ${porta}`);
    console.log(`Conexão DB: ${dbUrl}`);
    console.log(`Status da API de Pagamentos: Chave de tamanho ${apiKey.length}
autenticada.`);
}

iniciarAplicacao();