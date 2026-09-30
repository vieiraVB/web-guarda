import { useState } from "react";

import "../styles/pages/avaliacao-inicial.css";
import EvaluationHeader from "../components/EvaluationHeader";

import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "Qual destas situações pode indicar uma tentativa de phishing?",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Uma mensagem solicitando seus dados por meio de um link suspeito.",
      },
      {
        id: "b",
        letter: "B",
        text: "Uma conversa presencial com uma pessoa conhecida.",
      },
      {
        id: "c",
        letter: "C",
        text: "Uma atualização realizada diretamente pelo sistema.",
      },
      {
        id: "d",
        letter: "D",
        text: "Uma mensagem escrita por você mesmo.",
      },
    ],
  },
  {
    id: 2,
    question: "Qual é uma boa prática para criar uma senha mais segura?",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Usar seu nome e sua data de nascimento.",
      },
      {
        id: "b",
        letter: "B",
        text: "Utilizar uma combinação longa e difícil de adivinhar.",
      },
      {
        id: "c",
        letter: "C",
        text: "Usar a mesma senha em todas as contas.",
      },
      {
        id: "d",
        letter: "D",
        text: "Compartilhar a senha com pessoas próximas.",
      },
    ],
  },
  {
    id: 3,
    question:
      "O que você deve fazer ao receber uma mensagem suspeita pedindo seus dados?",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Clicar imediatamente no link enviado.",
      },
      {
        id: "b",
        letter: "B",
        text: "Enviar seus dados para confirmar sua identidade.",
      },
      {
        id: "c",
        letter: "C",
        text: "Verificar a origem da mensagem antes de realizar qualquer ação.",
      },
      {
        id: "d",
        letter: "D",
        text: "Encaminhar a mensagem para todos os seus contatos.",
      },
    ],
  },
  {
    id: 4,
    question: "Por que redes Wi-Fi públicas podem representar riscos?",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Porque toda rede pública é automaticamente falsa.",
      },
      {
        id: "b",
        letter: "B",
        text: "Porque outras pessoas podem tentar interceptar informações em redes inseguras.",
      },
      {
        id: "c",
        letter: "C",
        text: "Porque elas sempre deixam o computador mais lento.",
      },
      {
        id: "d",
        letter: "D",
        text: "Porque não é possível acessar nenhum site por elas.",
      },
    ],
  },
  {
    id: 5,
    question: "Qual atitude ajuda a proteger suas contas online?",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Ativar a autenticação em dois fatores quando disponível.",
      },
      {
        id: "b",
        letter: "B",
        text: "Anotar sua senha em locais públicos.",
      },
      {
        id: "c",
        letter: "C",
        text: "Usar senhas simples para facilitar o acesso.",
      },
      {
        id: "d",
        letter: "D",
        text: "Compartilhar seus códigos de acesso.",
      },
    ],
  },
];

function AvaliacaoInicial() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const navigate = useNavigate();

  const question = questions[currentQuestion];

  const selectedOption = answers[question.id];

  const isLastQuestion = currentQuestion === questions.length - 1;

  const correctAnswers = {
    1: "a",
    2: "b",
    3: "c",
    4: "b",
    5: "a",
  };

  function handleSelect(optionId) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: optionId,
    }));
  }

  function handleNext() {
    if (!selectedOption) {
      return;
    }

    if (!isLastQuestion) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);

      return;
    }

    let correct = 0;

    questions.forEach((question) => {
      if (answers[question.id] === correctAnswers[question.id]) {
        correct += 1;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);

    navigate("/resultado", {
      state: {
        correct,
        total: questions.length,
        percentage,
      },
    });
  }

  function handlePrevious() {
    if (currentQuestion === 0) {
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion - 1);
  }

  return (
    <div className="avaliacao-inicial-page">
      <EvaluationHeader title="Avaliação inicial" />

      <main className="avaliacao-main">
        <div className="container avaliacao-container">
          <section className="avaliacao-header">
            <span className="avaliacao-label">AVALIAÇÃO INICIAL</span>

            <h1>
              Descubra o quanto você já sabe
              <br />
              sobre segurança digital.
            </h1>

            <p>
              Responda às perguntas abaixo com atenção. Não se preocupe com o
              resultado — esta avaliação serve para entender seus conhecimentos
              antes de acessar os conteúdos.
            </p>
          </section>

          <section className="avaliacao-content">
            <ProgressBar
              current={currentQuestion + 1}
              total={questions.length}
            />

            <QuestionCard
              question={question.question}
              options={question.options}
              selectedOption={selectedOption}
              onSelect={handleSelect}
            />

            <div className="avaliacao-actions">
              <button
                type="button"
                className="avaliacao-back"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Voltar
              </button>

              <Button onClick={handleNext} disabled={!selectedOption}>
                {isLastQuestion ? "Finalizar avaliação" : "Próxima questão"}
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AvaliacaoInicial;
