# Agendamento de Salas - Frontend

Este projeto é o frontend da aplicação de agendamento de salas, desenvolvido em ReactJS. Ele permite aos usuários visualizar, cadastrar, editar e excluir reservas de salas em ambientes corporativos, integrando-se à API backend em C#.

## Funcionalidades

- Listagem de reservas existentes
- Cadastro de novas reservas
- Edição de reservas
- Exclusão de reservas
- Validação de conflitos de horários
- Opção de servir café e informar quantidade de pessoas

## Tecnologias Utilizadas

- ReactJS
- React Router DOM
- Axios (para integração com a API)
- CSS Modules

## Estrutura do Projeto

- `src/components`: Componentes reutilizáveis (listagem, formulários, etc)
- `src/App.js`: Configuração das rotas da aplicação
- `src/services`: Serviços para comunicação com a API
- `public`: Arquivos estáticos

## Como Executar

1. Instale as dependências:
    ```bash
    npm install
    ```
2. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
3. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

> **Observação:** Certifique-se de que o backend está em execução e acessível. Configure a URL da API conforme necessário nos serviços do frontend.

## Observações

- O frontend consome a API REST desenvolvida em .NET.
- As validações de reserva são realizadas tanto no frontend quanto no backend.
- Para reservas com café, é obrigatório informar a quantidade de pessoas.

## Autor

Projeto desenvolvido para avaliação técnica de desenvolvedor FullStack.