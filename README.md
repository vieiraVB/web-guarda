# Web Guarda

Plataforma web para inclusão digital e conscientização sobre segurança na internet.

## Sobre o projeto

O **Web Guarda** é uma plataforma web educativa desenvolvida como projeto interdisciplinar do curso de Ciência da Computação.

O projeto tem como objetivo contribuir para a conscientização dos usuários sobre segurança digital, apresentando conteúdos educativos e avaliações relacionadas a ameaças presentes no uso cotidiano da internet.

Entre os temas abordados estão:

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

## Objetivo

Desenvolver uma plataforma web educativa que contribua para a inclusão digital e auxilie os usuários na identificação de ameaças virtuais e na adoção de práticas mais seguras durante o uso da internet e de recursos tecnológicos.

## Público-alvo

Alunos e colaboradores do **Instituto Benjamin Constant (IBC)**, considerando usuários com diferentes níveis de conhecimento sobre tecnologia e segurança digital.

## Funcionalidades previstas

As funcionalidades serão definidas e detalhadas durante o levantamento de requisitos do projeto.

Inicialmente, a plataforma deverá contemplar:

* Cadastro de participantes;
* Avaliação inicial;
* Acesso a conteúdos educativos;
* Avaliação final;
* Comparação dos resultados;
* Coleta de feedback;
* Gerenciamento dos conteúdos e avaliações.

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

### Banco de Dados

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

## Estrutura do projeto

```text
web-guarda/
│
├── docs/
│   ├── PEX-54
│   ├── requisitos/
│   └── diagramas/
│
├── frontend/
│
├── backend/
│
├── database/
│
├── .gitignore
└── README.md
```

## Documentação

A documentação do projeto será organizada na pasta `docs/`, incluindo:

* PEX-54;
* Levantamento de Requisitos Funcionais;
* Levantamento de Requisitos Não Funcionais;
* Diagrama de Caso de Uso;
* Diagrama de Classes;
* Documentação relacionada ao Banco de Dados;
* Demais documentos produzidos durante o desenvolvimento.

## Testes automatizados

O projeto utilizará testes automatizados para verificar o funcionamento das funcionalidades desenvolvidas.

Os testes do Back-end serão realizados utilizando **Jest** e **Supertest**, enquanto o Front-end poderá utilizar **Vitest** e **Testing Library**.

Os testes serão executados automaticamente por meio de **GitHub Actions**, permitindo verificar o código a cada alteração submetida ao repositório.

## Integração Contínua

O projeto utilizará **GitHub Actions** para automatizar o processo de integração contínua (CI).

O pipeline deverá realizar etapas como:

1. Instalação das dependências;
2. Execução dos testes automatizados;
3. Verificação do projeto;
4. Identificação de falhas antes da integração das alterações.

## Docker

A aplicação será preparada para execução em containers utilizando **Docker** e **Docker Compose**.

A configuração deverá permitir a execução dos principais componentes da aplicação de forma organizada e reproduzível, incluindo o Back-end e o Banco de Dados.

## Controle de versão

O código-fonte será versionado utilizando **Git** e hospedado no **GitHub**.

As atividades de desenvolvimento serão organizadas por meio do **Trello**, permitindo acompanhar as tarefas, responsáveis e prazos definidos pela equipe.

## Equipe

* Vitor Vieira Barbosa
* Herick Bruno de Souza Leal
* João Guilherme Teles
* Gabriel Gimenez

## Projeto de Extensão

**Disciplina:** Atividades Práticas Interdisciplinares de Extensão IV — APIExt IV

**Período:** 2026/02

**Instituição atendida:** Instituto Benjamin Constant — IBC

**Tema:** Inclusão Digital e Desenvolvimento de Soluções Web para Comunidades Locais
