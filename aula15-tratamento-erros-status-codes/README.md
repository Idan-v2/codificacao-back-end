Escrita

# 🚨 Aula 15 — Tratamento de Erros e Status Codes HTTP

Nesta aula, foi desenvolvida uma API de produtos utilizando **NestJS e TypeScript**, com foco no tratamento de erros, na validação de parâmetros e na aplicação dos principais códigos de status HTTP.

O objetivo foi compreender como uma API pode identificar requisições inválidas, localizar recursos e retornar respostas adequadas de acordo com cada situação.

## 🎯 Objetivos da Aula

- Desenvolver um serviço para gerenciar produtos.
- Criar um Controller para disponibilizar os produtos por meio de uma API REST.
- Implementar a busca de produtos pelo ID.
- Validar os parâmetros recebidos pela URL.
- Utilizar `BadRequestException` para tratar requisições inválidas.
- Utilizar `NotFoundException` para tratar produtos não encontrados.
- Implementar logs com o `Logger` do NestJS.
- Compreender e aplicar diferentes códigos de status HTTP.
- Testar os endpoints utilizando o Insomnia.

## 🛠️ Tecnologias e Recursos Utilizados

| Tecnologia | Finalidade |
| --- | --- |
| 🟢 NestJS | Desenvolvimento da API |
| 🔷 TypeScript | Linguagem de programação |
| 📡 HTTP | Comunicação entre cliente e servidor |
| 🧪 Insomnia | Testes das requisições HTTP |
| 📝 Logger | Registro de eventos e ocorrências da aplicação |

## 📁 Estrutura do Projeto

O projeto foi organizado da seguinte forma:

```
aula-15-tratamento-erros-status-codes/
│
├── src/
│   ├── produtos.controller.ts
│   ├── produtos.service.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
│
├── package.json
├── nest-cli.json
└── README.md
```

## 📦 Serviço de Produtos

Foi desenvolvido o `ProdutoService`, responsável por armazenar e disponibilizar os dados dos produtos utilizados na aplicação.

### Produtos cadastrados

```
[
  { id: 1, nome: 'Arroz Namorados', preco: 9.99 },
  { id: 2, nome: 'Preto com dente', preco: 3.99 },
  { id: 3, nome: 'Quero Quero', preco: 4.99 },
  { id: 4, nome: 'Sal Iamã', preco: 2.99 }
]
```

O método `listaProdutos()` foi implementado para retornar a lista completa de produtos cadastrados.

## 🌐 Controller de Produtos

Para disponibilizar os dados por meio de requisições HTTP, foi criado o `ProdutosController`, responsável por definir as rotas da API.

Foram implementados dois endpoints principais:

- `GET /produtos` — retorna a lista de produtos.
- `GET /produtos/:id` — busca um produto específico pelo seu identificador.

**Exemplo de requisição:**

```
GET http://localhost:3000/produtos/1
```

## 🔎 Busca de Produto por ID

Na busca individual, o identificador recebido pela URL é convertido para um número antes de ser utilizado na pesquisa.

```
const id = Number(idproduto);
```

Também foi implementada uma validação para verificar se o ID informado corresponde a um número inteiro válido. Dessa forma, a aplicação consegue identificar entradas incorretas e evitar buscas com parâmetros inválidos.

## ⚠️ Tratamento de Erros: ID Inválido

Quando o usuário informa um ID que não representa um número inteiro válido, a API utiliza a exceção `BadRequestException`, retornando o status HTTP **400 Bad Request**.

**Exemplo de requisição:**

```
GET /produtos/abcde
```

**Resposta da API:**

```
{
  "message": "O ID do produto deve ser um número inteiro.",
  "error": "Bad Request",
  "statusCode": 400
}
```

Além de retornar a resposta de erro, a aplicação registra uma mensagem de aviso no console:

```
Tentativa de buscar com ID abcde não numérico.
```

Esse procedimento facilita a identificação de requisições inválidas durante a execução da aplicação.

## ❌ Tratamento de Produto Não Encontrado

Quando o ID informado é numérico, mas não corresponde a nenhum produto cadastrado, a aplicação utiliza a exceção `NotFoundException`, retornando o status HTTP **404 Not Found**.

**Exemplo de requisição:**

```
GET /produtos/67
```

**Resposta da API:**

```
{
  "message": "Produto com ID 67 não encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

A ocorrência também é registrada por meio do `Logger`:

```
Produto com 67 não localizado
```

Assim, é possível diferenciar uma entrada inválida de uma busca válida que não encontrou o recurso solicitado.

## ✅ Busca Realizada com Sucesso

Quando o ID informado corresponde a um produto existente, a API retorna os dados encontrados com o status HTTP **200 OK**.

**Exemplo de requisição:**

```
GET /produtos/1
```

**Resposta da API:**

```
{
  "id": 1,
  "nome": "Arroz Namorados",
  "preco": 9.99
}
```

Nesse caso, a requisição é processada corretamente e o produto solicitado é retornado ao cliente.

## 📊 Status Codes HTTP Utilizados

Durante a implementação, foram trabalhados três códigos de status HTTP:

| Status Code | Significado | Situação |
| --- | --- | --- |
| `200 OK` | Requisição realizada com sucesso | Produto encontrado |
| `400 Bad Request` | Requisição com parâmetros inválidos | ID não numérico ou inválido |
| `404 Not Found` | Recurso não encontrado | ID válido, mas sem produto correspondente |

Esses códigos permitem que o cliente identifique o resultado da requisição e compreenda o motivo de uma eventual falha.

## 🧪 Testes dos Endpoints com Insomnia

Foram realizados testes no Insomnia para validar o comportamento da API em diferentes cenários.

### 🟢 1. Produto encontrado

```
GET /produtos/1
```

**Resultado esperado:** `200 OK`

A API retorna os dados do produto correspondente ao ID informado.

### 🟡 2. ID inválido

```
GET /produtos/abcde
```

**Resultado esperado:** `400 Bad Request`

A API identifica que o parâmetro não corresponde a um número inteiro válido e retorna uma mensagem de erro.

### 🔴 3. Produto inexistente

```
GET /produtos/67
```

**Resultado esperado:** `404 Not Found`

A API reconhece que o ID é válido numericamente, mas não encontra um produto correspondente na lista cadastrada.

Os testes permitiram verificar se as respostas e os códigos HTTP estavam de acordo com cada situação.

## 📝 Registro de Logs com Logger

O `Logger` do NestJS foi utilizado para registrar eventos importantes durante o processamento das requisições.

Exemplos de mensagens registradas:

```
Tentativa de buscar com ID abcde não numérico.
Produto com 67 não localizado
```

O uso de logs facilita o acompanhamento do comportamento da aplicação pelo terminal, auxiliando na identificação de problemas e na depuração durante o desenvolvimento.

## ▶️ Como Executar o Projeto

Para executar a aplicação localmente, siga os passos abaixo.

**1\. Instale as dependências:**

```
npm install
```

**2\. Inicie o servidor em modo de desenvolvimento:**

```
npm run start:dev
```

**3\. Acesse a API:**

```
http://localhost:3000
```

Com o servidor em execução, os endpoints podem ser testados pelo navegador ou pelo Insomnia.

## 🚀 Conclusão

Nesta aula, foi desenvolvido um endpoint de produtos com tratamento de erros e utilização de diferentes status codes HTTP, aplicando recursos disponibilizados pelo NestJS.

Os principais conceitos trabalhados foram:

- ✅ Criação do `ProdutoService`.
- ✅ Implementação do `ProdutosController`.
- ✅ Listagem e busca de produtos por ID.
- ✅ Conversão e validação de parâmetros recebidos pela URL.
- ✅ Utilização de `BadRequestException`.
- ✅ Utilização de `NotFoundException`.
- ✅ Registro de ocorrências com o `Logger`.
- ✅ Aplicação dos status HTTP `200`, `400` e `404`.
- ✅ Testes de requisições utilizando o Insomnia.

**Principal aprendizado:** o tratamento adequado de erros torna a API mais previsível, organizada e fácil de manter, pois permite retornar respostas claras ao cliente e facilita o diagnóstico de problemas durante o desenvolvimento.