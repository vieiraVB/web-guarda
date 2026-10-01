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
    question: 'Antes de clicar em um link recebido por mensagem, o que é mais seguro fazer?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Abrir rapidamente para nao perder o prazo informado.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Verificar remetente, endereço do link e contexto da mensagem.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Enviar o link para outras pessoas conferirem depois.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Informar seus dados se a mensagem parecer urgente.',
      },
    ],
    correctAnswer: 'b',
  },
  {
    id: 2,
    question: 'Qual comportamento reduz a chance de cair em golpes virtuais?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Desconfiar de promessas muito vantajosas e pedidos de pagamento imediato.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Confiar sempre em mensagens com logotipos conhecidos.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Usar qualquer link enviado por desconhecidos.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Ignorar erros no endereço do site.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 3,
    question: 'Em uma tentativa de engenharia social, qual sinal merece atenção?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Pedido urgente para quebrar uma regra de segurança.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Uso normal de autenticacao em duas etapas.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Uma atualizacao oficial baixada pela loja do sistema.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'A leitura de orientacoes de privacidade.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 4,
    question: 'Qual prática é recomendada para senhas?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Reutilizar a mesma senha em varios servicos.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Criar senhas unicas e fortes para contas importantes.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Compartilhar senhas apenas com pessoas proximas.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Escolher palavras obvias para lembrar com facilidade.',
      },
    ],
    correctAnswer: 'b',
  },
  {
    id: 5,
    question: 'Por que a verificação em duas etapas ajuda na proteção de contas?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Porque adiciona uma segunda confirmacao alem da senha.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Porque substitui a necessidade de senha.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Porque permite compartilhar códigos com segurança.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Porque impede qualquer golpe na internet.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 6,
    question: 'Qual atitude protege melhor sua privacidade?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Publicar documentos pessoais somente em grupos fechados.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Revisar permissoes, limitar exposicao de dados e pensar antes de compartilhar.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Aceitar todos os termos sem ler qualquer informacao.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Usar dados pessoais como resposta de segurança.',
      },
    ],
    correctAnswer: 'b',
  },
  {
    id: 7,
    question: 'Ao acessar uma página de banco ou loja, qual verificação é importante?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Conferir se o endereço e o domínio pertencem ao serviço oficial.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Observar apenas se a pagina possui imagens bonitas.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Digitar dados mesmo se o endereço parecer diferente.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Confiar em qualquer anúncio patrocinado.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 8,
    question: 'Qual opção descreve um cuidado contra malware?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Manter sistema e aplicativos atualizados.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Instalar extensoes desconhecidas para testar recursos.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Desativar alertas de segurança permanentemente.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Abrir arquivos anexos sem verificar a origem.',
      },
    ],
    correctAnswer: 'a',
  },
  {
    id: 9,
    question: 'Em Wi-Fi público, qual escolha é mais segura?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Acessar servicos sensiveis sem nenhum cuidado extra.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Evitar transacoes sensiveis e preferir conexoes confiaveis.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Compartilhar a rede com desconhecidos.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Salvar automaticamente todas as senhas no navegador público.',
      },
    ],
    correctAnswer: 'b',
  },
  {
    id: 10,
    question: 'Ao terminar de usar um computador compartilhado, qual ação é recomendada?',
    options: [
      {
        id: 'a',
        letter: 'A',
        text: 'Encerrar sessoes abertas e nao deixar senhas salvas.',
      },
      {
        id: 'b',
        letter: 'B',
        text: 'Fechar apenas a tampa do notebook.',
      },
      {
        id: 'c',
        letter: 'C',
        text: 'Manter downloads pessoais no computador para usar depois.',
      },
      {
        id: 'd',
        letter: 'D',
        text: 'Deixar o e-mail aberto caso precise voltar.',
      },
    ],
    correctAnswer: 'a',
  },
]

function AvaliacaoFinal() {
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
      phase: 'final',
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    }

    localStorage.setItem(
      'webGuardaResultadoFinal',
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
    <div className="avaliacao-inicial-page avaliacao-final-page">
      <EvaluationHeader title="Avaliação final" />

      <main className="avaliacao-main">
        <div className="container avaliacao-container">
          <section className="avaliacao-header">
            <span className="avaliacao-label">AVALIAÇÃO FINAL</span>

            <h1>
              Revise o que você aprendeu
              <br />
              sobre segurança digital.
            </h1>

            <p>
              Responda às perguntas finais para comparar seus resultados de
              forma simples ao final da trilha.
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

export default AvaliacaoFinal
