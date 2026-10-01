import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../styles/pages/avaliacao-inicial.css'

import EvaluationHeader from '../components/EvaluationHeader'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import Button from '../components/Button'

const questions = [
  {
    id: 1,
    question: 'Qual situação pode indicar uma tentativa de phishing?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Uma mensagem que pede dados pessoais por um link suspeito.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Uma atualização feita diretamente pelo aplicativo oficial.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Uma conversa presencial com uma pessoa conhecida.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Um aviso comum dentro de um site que você já acessou.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 2,
    question: 'Qual cuidado ajuda a evitar golpes virtuais?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Confiar em ofertas urgentes recebidas por mensagem.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Verificar a fonte, o endereço do site e sinais de fraude antes de agir.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Compartilhar códigos recebidos por SMS para confirmar compras.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Clicar primeiro e conferir os detalhes depois.',
      },
    ],
    correctAnswer: 'b',
  },
  {
    id: 3,
    question: 'O que caracteriza uma técnica de engenharia social?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'O uso de manipulação ou pressão para obter informações.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'A criação automática de cópias de segurança.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'A instalação de atualizações oficiais do sistema.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'A escolha de uma senha longa e unica.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 4,
    question: 'Qual alternativa representa uma senha mais segura?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: '12345678',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Seu nome seguido do ano de nascimento.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Uma frase longa, única e difícil de adivinhar.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'A mesma senha usada em todas as contas.',
      },
    ],
    correctAnswer: 'c',
  },
  {
    id: 5,
    question: 'Qual atitude fortalece a proteção de contas online?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Ativar verificação em duas etapas quando disponível.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Enviar códigos de acesso para pessoas conhecidas.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Salvar senhas em computadores públicos.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Manter a mesma senha por anos em todas as contas.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 6,
    question: 'Qual dado merece cuidado antes de ser compartilhado online?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Informações pessoais, documentos, endereço e dados financeiros.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'O nome de um personagem ficticio.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Uma notícia publicada em um portal confiável.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Uma dica genérica de segurança.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 7,
    question: 'Qual sinal pode indicar uma página falsa?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Endereço estranho, erros de escrita e pedido incomum de dados.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Uso de conexao segura e dominio oficial conhecido.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Conteudo acessado por favoritos salvos no navegador.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Página visitada a partir do site oficial da instituição.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 8,
    question: 'Como reduzir o risco de malware?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Baixar arquivos de qualquer link recebido em mensagens.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Instalar programas apenas de fontes confiáveis e manter o sistema atualizado.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Desativar todas as atualizações de segurança.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Abrir anexos desconhecidos para conferir do que se trata.',
      },
    ],
    correctAnswer: 'b',
  },
  {
    id: 9,
    question: 'Qual cuidado é recomendado ao usar Wi-Fi público?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Evitar acessar contas sensíveis em redes desconhecidas ou inseguras.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Enviar senhas normalmente porque redes públicas são sempre protegidas.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Desativar a tela de bloqueio do aparelho.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Compartilhar arquivos sem verificar quem esta na rede.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 10,
    question: 'O que fazer ao usar um computador compartilhado?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Salvar senhas no navegador para facilitar o proximo acesso.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Deixar contas abertas para continuar depois.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Sair das contas, evitar salvar senhas e limpar dados quando necessário.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Guardar arquivos pessoais na area de trabalho publica.',
      },
    ],
    correctAnswer: 'c',
  },
]

function AvaliacaoInicial() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const navigate = useNavigate()

  const question = questions[currentQuestion]
  const selectedOption = answers[question.id]
  const isLastQuestion = currentQuestion === questions.length - 1

  function handleSelect(optionId) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: optionId,
    }))
  }

  function handleNext() {
    if (!selectedOption) {
      return
    }

    if (!isLastQuestion) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1)

      return
    }

    const correct = questions.reduce((totalCorrect, current) => {
      return answers[current.id] === current.correctAnswer
        ? totalCorrect + 1
        : totalCorrect
    }, 0)

    const result = {
      phase: 'initial',
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    }

    localStorage.setItem(
      'webGuardaResultadoInicial',
      JSON.stringify(result)
    )

    navigate('/resultado', {
      state: result,
    })
  }

  function handlePrevious() {
    if (currentQuestion === 0) {
      return
    }

    setCurrentQuestion((previousQuestion) => previousQuestion - 1)
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
              Responda às perguntas abaixo com atenção. Esta avaliação serve
              para entender seus conhecimentos antes de acessar os conteúdos.
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
                {isLastQuestion ? 'Finalizar avaliação' : 'Próxima questão'}
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AvaliacaoInicial
