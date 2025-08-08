# Agendamento de Salas - Frontend

Este projeto � o frontend da aplica��o de agendamento de salas, desenvolvido em ReactJS. Ele permite aos usu�rios visualizar, cadastrar, editar e excluir reservas de salas em ambientes corporativos, integrando-se � API backend em C#.

## Funcionalidades

- Listagem de reservas existentes
- Cadastro de novas reservas
- Edi��o de reservas
- Exclus�o de reservas
- Valida��o de conflitos de hor�rios
- Op��o de servir caf� e informar quantidade de pessoas

## Tecnologias Utilizadas

- ReactJS
- React Router DOM
- Axios (para integra��o com a API)
- CSS Modules

## Estrutura do Projeto

- `src/components`: Componentes reutiliz�veis (listagem, formul�rios, etc)
- `src/App.js`: Configura��o das rotas da aplica��o
- `src/services`: Servi�os para comunica��o com a API
- `public`: Arquivos est�ticos

## Como Executar

1. Instale as depend�ncias:
    ```bash
    npm install
    ```
2. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
3. Acesse a aplica��o em [http://localhost:3000](http://localhost:3000)

> **Observa��o:** Certifique-se de que o backend est� em execu��o e acess�vel. Configure a URL da API conforme necess�rio nos servi�os do frontend.

## Observa��es

- O frontend consome a API REST desenvolvida em .NET.
- As valida��es de reserva s�o realizadas tanto no frontend quanto no backend.
- Para reservas com caf�, � obrigat�rio informar a quantidade de pessoas.

## Autor

Projeto desenvolvido para avalia��o t�cnica de desenvolvedor FullStack.