# Web Guarda

Plataforma web para inclusão digital e conscientização sobre segurança na internet.

## Sobre o projeto

O **Web Guarda** é uma plataforma web educativa desenvolvida como projeto interdisciplinar do curso de Ciência da Computação.

O projeto tem como objetivo contribuir para a conscientização dos usuários sobre segurança digital, apresentando conteúdos educativos e avaliações relacionadas a ameaças presentes no uso cotidiano da internet e de recursos tecnológicos.

A plataforma foi pensada para atender principalmente alunos e colaboradores do **Instituto Benjamin Constant (IBC)**, considerando usuários com diferentes níveis de conhecimento sobre tecnologia e segurança digital.

Entre os principais temas abordados estão:

* Phishing;
* Golpes virtuais;
* Engenharia social;
* Senhas seguras;
* Roubo de dados;
* Páginas falsas;
* Malware;
* Proteção de contas;
* Riscos em redes Wi-Fi públicas;
* Privacidade e proteção de dados.

> **Status:** projeto em desenvolvimento.

## Objetivo

Desenvolver uma plataforma web educativa que contribua para a inclusão digital e auxilie os usuários na identificação de ameaças virtuais e na adoção de práticas mais seguras durante o uso da internet e de recursos tecnológicos.

A proposta busca transformar conceitos de segurança digital em conteúdos acessíveis e atividades práticas, permitindo que o usuário avalie seus conhecimentos e acompanhe sua evolução.

## Público-alvo

A plataforma é destinada principalmente a:

* Alunos do Instituto Benjamin Constant;
* Colaboradores do Instituto Benjamin Constant;
* Outros participantes da comunidade atendida pelo projeto de extensão.

O sistema considera usuários com diferentes níveis de familiaridade com tecnologia e segurança digital.

## MVP

A primeira versão funcional da plataforma terá como foco o fluxo educacional principal:

1. Cadastro do participante;
2. Avaliação inicial;
3. Acesso aos conteúdos educativos;
4. Avaliação final;
5. Comparação dos resultados;
6. Registro de feedback.

O gerenciamento de conteúdos e avaliações será realizado por usuários administrativos da plataforma.

Funcionalidades adicionais poderão ser incorporadas posteriormente, conforme a evolução do projeto e o tempo disponível para desenvolvimento.

## Identidade visual

O Web Guarda possui uma identidade visual desenvolvida especificamente para a plataforma, buscando transmitir:

* Segurança;
* Tecnologia;
* Educação;
* Confiabilidade;
* Acessibilidade.

A interface seguirá uma abordagem moderna, limpa e responsiva, priorizando clareza das informações e facilidade de utilização.

## Tecnologias

### Front-end

* React
* Vite
* JavaScript
* CSS

### Back-end

* Node.js
* Express
* Prisma

### Banco de dados

* PostgreSQL

### Testes

* Jest
* Supertest
* Vitest
* Testing Library

### DevOps

* Docker
* Docker Compose
* GitHub Actions

### Ferramentas

* Git
* GitHub
* Trello
* Visual Studio Code

## Arquitetura inicial

O projeto será organizado em uma arquitetura separada entre front-end, back-end e banco de dados.

```text
Usuário
   │
   ▼
Front-end
React + Vite
   │
   │ HTTP/REST
   ▼
Back-end
Node.js + Express
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

Essa separação permite que as diferentes partes do sistema sejam desenvolvidas, testadas e mantidas de forma independente.

## Estrutura do projeto

```text
web-guarda/
│
├── docs/
│   ├── PEX-54
│   ├── requisitos/
│   ├── diagramas/
│   └── banco-de-dados/
│
├── frontend/
│
├── backend/
│
├── database/
│
├── .github/
│   └── workflows/
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

A estrutura poderá ser ajustada durante o desenvolvimento conforme as necessidades técnicas do projeto.

## Documentação

A documentação do projeto será organizada na pasta `docs/`, incluindo:

* PEX-54;
* Visão do Produto;
* Análise de Viabilidade;
* Estudo de Caso;
* Levantamento de Requisitos Funcionais;
* Levantamento de Requisitos Não Funcionais;
* Diagrama de Caso de Uso;
* Diagrama de Classes;
* Modelo Entidade-Relacionamento (MER);
* Modelo do Banco de Dados;
* Demais documentos produzidos durante o desenvolvimento.

## Testes automatizados

O projeto utilizará testes automatizados para verificar o funcionamento das funcionalidades desenvolvidas.

No **back-end**, serão utilizados:

* Jest;
* Supertest.

No **front-end**, serão utilizados:

* Vitest;
* Testing Library.

Os testes serão executados durante o processo de integração contínua para auxiliar na identificação de falhas antes da integração das alterações ao projeto.

## Integração contínua

O projeto utilizará **GitHub Actions** para automatizar o processo de integração contínua (CI).

Inicialmente, o pipeline deverá contemplar etapas como:

1. Instalação das dependências;
2. Verificação do projeto;
3. Execução dos testes automatizados;
4. Identificação de falhas;
5. Validação das alterações antes da integração.

O pipeline será evoluído conforme novas funcionalidades e necessidades forem incorporadas ao projeto.

## Docker

O projeto utilizará **Docker** e **Docker Compose** para facilitar a configuração e padronização do ambiente de desenvolvimento.

A utilização de containers permitirá organizar os principais serviços necessários para execução da aplicação, especialmente:

* Back-end;
* Banco de dados PostgreSQL.

A configuração será evoluída durante o desenvolvimento conforme a arquitetura definitiva do sistema.

## Banco de dados

O banco de dados utilizado pelo projeto será o **PostgreSQL**.

A comunicação entre a aplicação e o banco será realizada por meio do **Prisma ORM**.

A modelagem do banco de dados foi definida a partir do levantamento inicial dos requisitos e dos diagramas produzidos pela equipe, podendo sofrer ajustes durante a implementação.

## Controle de versão

O código-fonte será versionado utilizando **Git** e hospedado no **GitHub**.

O desenvolvimento será realizado utilizando controle de versões para acompanhar as alterações realizadas pela equipe e facilitar a integração entre os diferentes componentes do projeto.

As atividades serão organizadas por meio do **Trello**, permitindo acompanhar tarefas, responsáveis e prazos definidos pela equipe.

## Organização do desenvolvimento

O desenvolvimento será dividido inicialmente entre:

* **Front-end:** desenvolvimento da interface e experiência do usuário;
* **Back-end:** implementação da API e regras de negócio;
* **Banco de dados:** implementação e manutenção da estrutura de persistência;
* **Testes:** criação e manutenção dos testes automatizados;
* **DevOps:** configuração de Docker, CI e demais ferramentas relacionadas ao processo de desenvolvimento.

As responsabilidades poderão ser ajustadas conforme a evolução do projeto.

## Projeto de Extensão

**Disciplina:** Atividades Práticas Interdisciplinares de Extensão IV — APIExt IV

**Período:** 2026/02

**Instituição atendida:** Instituto Benjamin Constant — IBC

**Tema:** Inclusão Digital e Desenvolvimento de Soluções Web para Comunidades Locais

## Equipe

* Vitor Vieira Barbosa
* Herick Bruno de Souza Leal
* João Guilherme Teles
* Gabriel Gimenez

## Status do projeto

O projeto encontra-se em fase de desenvolvimento.

A documentação inicial, levantamento de requisitos, diagramas e modelagem inicial do banco de dados já foram elaborados pela equipe.

As próximas etapas concentram-se na implementação do front-end, desenvolvimento do back-end, integração com o banco de dados, criação dos testes automatizados e configuração do ambiente de CI/CD.
