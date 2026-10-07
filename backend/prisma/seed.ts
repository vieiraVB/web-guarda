import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { randomUUID } from "node:crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Iniciando seed...");

  // =========================
  // USUÁRIOS
  // =========================

  const participante = await prisma.usuario.upsert({
    where: {
      email: "participante@webguarda.local",
    },
    update: {},
    create: {
      codigoParticipante: randomUUID(),
      nome: "Participante Teste",
      email: "participante@webguarda.local",
      senhaHash: "HASH_DE_TESTE",
      perfil: "PARTICIPANTE",
    },
  });

  const administrador = await prisma.usuario.upsert({
    where: {
      email: "admin@webguarda.local",
    },
    update: {},
    create: {
      codigoParticipante: randomUUID(),
      nome: "Administrador Teste",
      email: "admin@webguarda.local",
      senhaHash: "HASH_DE_TESTE",
      perfil: "ADMIN",
    },
  });

  console.log("✓ Usuários criados");

  // =========================
// CONTEÚDOS
// =========================

const dadosConteudos = [
  {
    titulo: "Senhas seguras",
    tema: "Segurança de contas",
    corpo: "Aprenda a criar senhas fortes, únicas e difíceis de adivinhar.",
    ordem: 1,
  },
  {
    titulo: "Phishing",
    tema: "Golpes digitais",
    corpo:
      "Aprenda a identificar mensagens, links e páginas falsas utilizadas em golpes.",
    ordem: 2,
  },
  {
    titulo: "Privacidade na internet",
    tema: "Privacidade",
    corpo:
      "Conheça cuidados importantes para proteger seus dados pessoais na internet.",
    ordem: 3,
  },
  {
    titulo: "Redes sociais",
    tema: "Uso consciente",
    corpo: "Veja boas práticas para utilizar redes sociais com mais segurança.",
    ordem: 4,
  },
  {
    titulo: "Navegação segura",
    tema: "Internet segura",
    corpo: "Conheça cuidados básicos para navegar na internet com segurança.",
    ordem: 5,
  },
];

const conteudos = [];

for (const dados of dadosConteudos) {
  const conteudo = await prisma.conteudo.upsert({
    where: {
      id: BigInt(dados.ordem),
    },
    update: {
      titulo: dados.titulo,
      tema: dados.tema,
      corpo: dados.corpo,
      ordem: dados.ordem,
      publicado: true,
    },
    create: {
      titulo: dados.titulo,
      tema: dados.tema,
      corpo: dados.corpo,
      ordem: dados.ordem,
      publicado: true,
    },
  });

  conteudos.push(conteudo);
}

console.log("✓ Conteúdos criados");

// =========================
// ETAPAS DOS CONTEÚDOS
// =========================

const etapasPorConteudo = [
  [
    {
      titulo: "O que é uma senha segura?",
      corpo: "Uma senha é uma das principais formas de proteger uma conta na internet. Ela funciona como uma chave: quando você informa a senha correta, o serviço entende que você está autorizado a acessar aquela conta.\r\n\r\nPor isso, uma senha não deve ser escolhida de qualquer maneira. Informações como nome, sobrenome, data de nascimento, nome de familiares, número de telefone ou palavras muito conhecidas podem ser mais fáceis de descobrir, principalmente quando essas informações estão disponíveis publicamente.\r\n\r\nUma senha segura deve ser difícil para outras pessoas descobrirem, mas administrável para você. Também é importante não compartilhar sua senha com amigos, familiares, colegas ou pessoas que entrem em contato dizendo que precisam dela.\r\n\r\nNA PRÁTICA\r\n\r\nAo criar uma senha, evite:\r\n- seu nome ou sobrenome;\r\n- datas importantes;\r\n- nomes de familiares ou animais;\r\n- sequências como 123456;\r\n- palavras muito óbvias;\r\n- informações publicadas nas suas redes sociais.\r\n\r\nPrefira senhas mais longas e que não tenham uma relação evidente com sua vida pessoal.\r\n\r\nTambém é importante lembrar que uma senha forte não protege apenas uma conta. Ela faz parte de um conjunto de cuidados que inclui autenticação em dois fatores, privacidade e atenção aos sites e mensagens que você utiliza.\r\n\r\nATENÇÃO\r\n\r\nUma pessoa mal-intencionada pode tentar descobrir sua senha observando informações que você publica na internet. Quanto mais previsível for a senha, maior pode ser o risco.\r\n\r\nLEMBRE-SE\r\n\r\nSua senha é pessoal. Não compartilhe e evite utilizar informações que outras pessoas possam descobrir facilmente.",
    },
    {
      titulo: "Como criar uma senha forte",
      corpo: "Uma senha forte deve dificultar tentativas de adivinhação. Para isso, é importante considerar principalmente o tamanho da senha e evitar combinações previsíveis.\r\n\r\nUma maneira de criar uma senha mais fácil de lembrar é utilizar uma combinação de palavras que não tenha uma relação óbvia entre si. Dependendo do serviço, também podem ser utilizados números, letras maiúsculas, letras minúsculas e símbolos.\r\n\r\nEntretanto, adicionar apenas um número ou símbolo ao final de uma palavra comum não transforma automaticamente uma senha em uma senha forte.\r\n\r\nPor exemplo, uma senha baseada em uma palavra muito conhecida seguida de 123 continua sendo previsível.\r\n\r\nNA PRÁTICA\r\n\r\nAo criar uma nova senha:\r\n- prefira senhas mais longas;\r\n- evite informações pessoais;\r\n- evite palavras muito comuns;\r\n- não utilize sequências previsíveis;\r\n- não copie senhas encontradas em exemplos da internet;\r\n- crie uma senha diferente para cada serviço importante.\r\n\r\nSe você possui muitas contas, pode ser difícil memorizar tudo. Um gerenciador de senhas pode ajudar a organizar suas senhas sem que você precise decorar todas elas.\r\n\r\nATENÇÃO\r\n\r\nNunca escolha uma senha apenas porque ela é fácil de lembrar. O objetivo é encontrar um equilíbrio entre segurança e praticidade.\r\n\r\nLEMBRE-SE\r\n\r\nUma boa senha é longa, pouco previsível e não depende de informações que outras pessoas conseguem descobrir sobre você.",
    },
    {
      titulo: "Por que não reutilizar senhas?",
      corpo: "Imagine que você utilize a mesma senha no seu e-mail, em uma rede social e em uma loja virtual.\r\n\r\nSe essa senha for descoberta ou exposta em um desses serviços, alguém poderá tentar utilizar a mesma combinação para acessar suas outras contas.\r\n\r\nEsse é um dos principais problemas de reutilizar senhas. Um único incidente pode acabar afetando vários serviços diferentes.\r\n\r\nO e-mail merece atenção especial porque muitas contas utilizam o endereço de e-mail para recuperar senhas. Se uma pessoa conseguir acesso ao seu e-mail, ela pode tentar redefinir senhas de outros serviços.\r\n\r\nNA PRÁTICA\r\n\r\nProcure utilizar senhas diferentes principalmente em:\r\n- e-mail;\r\n- contas bancárias;\r\n- redes sociais;\r\n- lojas virtuais;\r\n- serviços de estudo;\r\n- contas relacionadas ao trabalho.\r\n\r\nSe você descobrir que uma senha foi exposta, altere-a imediatamente nos serviços em que ela era utilizada.\r\n\r\nATENÇÃO\r\n\r\nNunca pense: \"Minha senha é boa, então posso usar a mesma em todos os lugares.\"\r\n\r\nMesmo uma senha forte deixa de ser uma boa proteção quando é reutilizada em vários serviços.\r\n\r\nLEMBRE-SE\r\n\r\nUma senha diferente para cada conta reduz o impacto caso uma delas seja comprometida.",
    },
    {
      titulo: "Autenticação em dois fatores",
      corpo: "A autenticação em dois fatores, conhecida também como 2FA, adiciona uma camada extra de segurança ao processo de login.\r\n\r\nNormalmente, uma conta utiliza a senha como primeira forma de confirmação. Com a autenticação em dois fatores ativada, o serviço solicita uma segunda confirmação.\r\n\r\nEssa segunda etapa pode utilizar diferentes métodos, como um código gerado por um aplicativo ou outro mecanismo oferecido pelo serviço.\r\n\r\nAssim, descobrir somente a senha não é necessariamente suficiente para conseguir acessar a conta.\r\n\r\nNA PRÁTICA\r\n\r\nQuando um serviço oferecer autenticação em dois fatores:\r\n1. procure ativar o recurso;\r\n2. siga as orientações oficiais do serviço;\r\n3. mantenha os métodos de recuperação protegidos;\r\n4. não compartilhe códigos recebidos;\r\n5. desconfie de pessoas que pedirem esses códigos.\r\n\r\nATENÇÃO\r\n\r\nGolpistas podem fingir que são funcionários de uma empresa e pedir um código enviado para o seu celular ou aplicativo.\r\n\r\nEsse código pode ser justamente a segunda barreira que protege sua conta.\r\n\r\nNunca informe códigos de autenticação para alguém que entrar em contato solicitando essa informação.\r\n\r\nLEMBRE-SE\r\n\r\nA autenticação em dois fatores adiciona uma camada extra de proteção e deve ser utilizada sempre que estiver disponível.\r\n\r\n\r\nMÓDULO 02 — PHISHING",
    },
  ],
  [
    {
      titulo: "O que é phishing?",
      corpo: "Phishing é uma técnica utilizada em golpes digitais para tentar enganar uma pessoa e fazer com que ela forneça informações, clique em links, baixe arquivos ou realize alguma ação.\r\n\r\nA mensagem pode fingir ser de uma empresa, banco, loja, instituição, serviço ou até mesmo de uma pessoa conhecida.\r\n\r\nO objetivo normalmente é criar uma situação suficientemente convincente para que a vítima não pare para verificar a informação.\r\n\r\nO golpe pode chegar por e-mail, aplicativos de mensagens, redes sociais, SMS ou outros canais.\r\n\r\nNA PRÁTICA\r\n\r\nUma mensagem pode dizer, por exemplo:\r\n\r\n\"Sua conta será bloqueada hoje. Clique aqui para confirmar seus dados.\"\r\n\r\nA mensagem tenta fazer você agir rapidamente, sem tempo para verificar se a informação é verdadeira.\r\n\r\nATENÇÃO\r\n\r\nAlguns golpes utilizam logotipos, nomes e aparência semelhantes aos serviços reais. Por isso, não confie somente na aparência da mensagem.\r\n\r\nPergunte:\r\n- Eu estava esperando essa mensagem?\r\n- Quem realmente enviou?\r\n- Por que estão pedindo essa informação?\r\n- Existe outra forma de verificar?\r\n\r\nLEMBRE-SE\r\n\r\nPhishing tenta fazer você confiar em uma comunicação falsa. Quando algo parecer estranho ou urgente demais, pare e verifique antes de agir.",
    },
    {
      titulo: "Como os golpes chegam até você",
      corpo: "Os golpes digitais podem chegar por praticamente qualquer canal de comunicação que utilizamos diariamente.\r\n\r\nVocê pode receber uma mensagem por e-mail, aplicativo de mensagens, rede social, SMS ou até mesmo encontrar um anúncio ou página suspeita durante uma pesquisa.\r\n\r\nO golpista pode tentar aproveitar situações comuns. Pode fingir que existe uma entrega pendente, uma cobrança, uma promoção ou um problema com uma conta.\r\n\r\nPor isso, o fato de a mensagem parecer relacionada à sua rotina não significa que ela seja verdadeira.\r\n\r\nNA PRÁTICA\r\n\r\nAo receber uma comunicação inesperada:\r\n- confira o remetente;\r\n- leia a mensagem com calma;\r\n- observe os links;\r\n- não forneça informações imediatamente;\r\n- não tome decisões apenas porque a mensagem diz que existe urgência.\r\n\r\nQuando precisar acessar um serviço, procure o aplicativo ou site oficial diretamente.\r\n\r\nATENÇÃO\r\n\r\nUma mensagem pode utilizar o nome de uma empresa conhecida e ainda assim ser falsa.\r\n\r\nO nome mostrado na conversa não é suficiente para confirmar a identidade de quem enviou.\r\n\r\nLEMBRE-SE\r\n\r\nGolpes podem aparecer em lugares que você utiliza todos os dias. Segurança começa quando você aprende a desconfiar de situações inesperadas.",
    },
    {
      titulo: "Como identificar uma mensagem suspeita",
      corpo: "Existem vários sinais que podem indicar que uma mensagem merece atenção.\r\n\r\nUm deles é a urgência. Mensagens como \"faça agora\", \"última chance\" ou \"sua conta será bloqueada imediatamente\" podem tentar impedir que você tenha tempo para verificar a informação.\r\n\r\nOutro sinal é o pedido de informações sensíveis, como senha, código de autenticação ou dados bancários.\r\n\r\nLinks desconhecidos, endereços estranhos, erros de escrita e ofertas inesperadas também merecem atenção.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de agir, faça algumas perguntas:\r\n\r\nEu conheço quem enviou?\r\n\r\nEu estava esperando essa mensagem?\r\n\r\nO endereço do remetente parece correto?\r\n\r\nEstão pedindo uma informação que não deveriam precisar?\r\n\r\nEstão tentando me pressionar?\r\n\r\nQuanto mais sinais suspeitos aparecerem, maior deve ser sua cautela.\r\n\r\nATENÇÃO\r\n\r\nNem todo golpe terá erros de português ou aparência estranha. Alguns são cuidadosamente preparados para parecer verdadeiros.\r\n\r\nPor isso, a melhor proteção é verificar a informação por um canal independente.\r\n\r\nLEMBRE-SE\r\n\r\nNão procure apenas um sinal de golpe. Observe o conjunto da situação.",
    },
    {
      titulo: "Antes de clicar",
      corpo: "Links são uma ferramenta normal da internet, mas também podem ser utilizados para levar usuários a páginas falsas ou perigosas.\r\n\r\nUma mensagem inesperada pode apresentar um botão dizendo \"Acessar conta\", \"Confirmar pagamento\" ou \"Ver pedido\". O texto pode parecer legítimo, mas o destino do link pode ser diferente.\r\n\r\nPor isso, antes de clicar, pare e pense.\r\n\r\nNA PRÁTICA\r\n\r\nQuando receber um link inesperado:\r\n1. verifique quem enviou;\r\n2. pense se você estava esperando aquela comunicação;\r\n3. observe o endereço apresentado;\r\n4. evite informar dados pessoais imediatamente;\r\n5. quando possível, abra o aplicativo ou site oficial diretamente.\r\n\r\nPor exemplo, se receber uma mensagem dizendo que existe um problema com sua conta, você não precisa necessariamente clicar no link da mensagem. Pode abrir o aplicativo oficial e verificar se existe realmente algum aviso.\r\n\r\nATENÇÃO\r\n\r\nNão clique apenas porque a mensagem está dizendo que você precisa agir rapidamente.\r\n\r\nA pressa é uma das ferramentas utilizadas para diminuir nossa atenção.\r\n\r\nLEMBRE-SE\r\n\r\nQuando tiver dúvida sobre um link, não clique. Procure o serviço por um caminho que você já conhece.\r\n\r\n\r\nMÓDULO 03 — PRIVACIDADE NA INTERNET",
    },
  ],
  [
    {
      titulo: "O que são dados pessoais?",
      corpo: "Dados pessoais são informações relacionadas a uma pessoa.\r\n\r\nNome, telefone, endereço, e-mail, fotografias e outras informações podem fazer parte da nossa vida pessoal e precisam ser tratadas com cuidado.\r\n\r\nNa internet, fornecemos dados constantemente. Fazemos cadastros, criamos contas, compramos produtos, conversamos com outras pessoas e utilizamos diferentes serviços.\r\n\r\nIsso não significa que devemos deixar de utilizar a internet. Significa que precisamos prestar atenção às informações que estamos fornecendo.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de informar um dado pessoal, pergunte:\r\n- Quem está solicitando?\r\n- Por que essa informação é necessária?\r\n- Estou no site ou aplicativo correto?\r\n- Preciso realmente fornecer esse dado?\r\n\r\nEvite compartilhar informações pessoais quando não houver necessidade.\r\n\r\nATENÇÃO\r\n\r\nAlgumas pessoas podem tentar obter informações fazendo perguntas aparentemente simples. Várias informações pequenas, quando reunidas, podem revelar bastante sobre uma pessoa.\r\n\r\nLEMBRE-SE\r\n\r\nPrivacidade começa com uma pergunta simples: \"Eu realmente preciso compartilhar essa informação?\"",
    },
    {
      titulo: "Cuidado ao compartilhar informações",
      corpo: "A internet facilita muito o compartilhamento de informações.\r\n\r\nUma fotografia publicada em uma rede social pode ser vista por muitas pessoas. Uma mensagem enviada para alguém pode ser encaminhada para outras pessoas. Uma informação publicada hoje pode continuar disponível muito tempo depois.\r\n\r\nPor isso, é importante pensar antes de compartilhar.\r\n\r\nEvite publicar informações que revelem detalhes desnecessários sobre sua rotina, localização, endereço ou outras informações pessoais.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de compartilhar alguma coisa, pense:\r\n\r\nQuem poderá ver isso?\r\n\r\nEssa informação revela algo sobre mim ou sobre outra pessoa?\r\n\r\nEu tenho autorização para compartilhar?\r\n\r\nEu me sentiria confortável se essa publicação fosse vista por pessoas que não conheço?\r\n\r\nATENÇÃO\r\n\r\nApagar uma publicação não garante que ela desapareceu completamente. Outra pessoa pode ter salvo, copiado ou capturado aquela informação.\r\n\r\nLEMBRE-SE\r\n\r\nDepois que uma informação é compartilhada, pode ser difícil controlar para onde ela irá. Pense antes de publicar.",
    },
    {
      titulo: "Privacidade nas contas",
      corpo: "Muitos aplicativos e sites oferecem configurações de privacidade.\r\n\r\nEssas configurações podem determinar quem pode visualizar suas publicações, enviar mensagens, encontrar seu perfil ou acessar determinadas informações.\r\n\r\nPorém, as configurações podem mudar e novos recursos podem ser adicionados aos serviços. Por isso, vale a pena revisá-las de tempos em tempos.\r\n\r\nNA PRÁTICA\r\n\r\nAo revisar uma conta, procure verificar:\r\n- quem pode visualizar suas informações;\r\n- quem pode entrar em contato com você;\r\n- quais dados aparecem publicamente;\r\n- quais aplicativos estão conectados;\r\n- quais permissões foram concedidas.\r\n\r\nNão é necessário aceitar todas as permissões solicitadas por um aplicativo. Avalie se elas realmente são necessárias para a função que você deseja utilizar.\r\n\r\nATENÇÃO\r\n\r\nUma conta pode estar compartilhando mais informações do que você imagina simplesmente porque determinadas configurações estão ativadas.\r\n\r\nLEMBRE-SE\r\n\r\nConhecer as configurações de privacidade ajuda você a decidir o que deseja compartilhar e com quem.",
    },
    {
      titulo: "Protegendo suas informações",
      corpo: "A proteção das informações pessoais depende de vários cuidados.\r\n\r\nUtilizar uma senha forte é importante, mas não é suficiente. Também precisamos prestar atenção aos dispositivos, aplicativos, sites e pessoas com quem compartilhamos informações.\r\n\r\nManter programas atualizados também é importante porque atualizações podem corrigir problemas de segurança.\r\n\r\nEm computadores e celulares utilizados por várias pessoas, é necessário ter atenção redobrada.\r\n\r\nNA PRÁTICA\r\n\r\nPara proteger suas informações:\r\n- utilize senhas fortes;\r\n- não compartilhe códigos de autenticação;\r\n- mantenha seus dispositivos atualizados;\r\n- revise permissões dos aplicativos;\r\n- evite deixar contas abertas em computadores compartilhados;\r\n- tenha cuidado com redes e dispositivos que você não conhece.\r\n\r\nATENÇÃO\r\n\r\nNunca forneça uma senha ou código de segurança apenas porque alguém diz ser funcionário de uma empresa.\r\n\r\nEmpresas legítimas possuem canais próprios para atendimento e recuperação de contas.\r\n\r\nLEMBRE-SE\r\n\r\nProteger sua privacidade é um hábito. Pequenos cuidados repetidos diariamente fazem diferença.\r\n\r\n\r\nMÓDULO 04 — REDES SOCIAIS",
    },
  ],
  [
    {
      titulo: "Compartilhamento consciente",
      corpo: "As redes sociais permitem compartilhar acontecimentos, opiniões, fotografias e informações rapidamente.\r\n\r\nEssa facilidade também exige responsabilidade.\r\n\r\nUma publicação pode atingir pessoas diferentes daquelas que você imaginava. Além disso, conteúdos podem ser copiados e compartilhados novamente.\r\n\r\nPor isso, antes de publicar alguma coisa, pense no conteúdo e nas possíveis consequências.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de compartilhar:\r\n- verifique se a informação é verdadeira;\r\n- pense se existe alguma informação pessoal exposta;\r\n- respeite a privacidade de outras pessoas;\r\n- evite divulgar informações desnecessárias;\r\n- considere quem poderá visualizar a publicação.\r\n\r\nTambém é importante não compartilhar notícias apenas porque parecem interessantes. Quando uma informação for importante, procure verificar sua origem.\r\n\r\nATENÇÃO\r\n\r\nInformações falsas podem se espalhar rapidamente. Compartilhar algo sem verificar pode contribuir para que outras pessoas também sejam enganadas.\r\n\r\nLEMBRE-SE\r\n\r\nCompartilhar é uma responsabilidade. Antes de clicar em \"publicar\", pense no conteúdo e nas consequências.",
    },
    {
      titulo: "Configurações de privacidade",
      corpo: "As redes sociais possuem ferramentas para ajudar a controlar a exposição de uma conta.\r\n\r\nDependendo da plataforma, você pode escolher quem visualiza suas publicações, quem pode enviar mensagens e quem pode interagir com seu perfil.\r\n\r\nEssas opções podem ajudar a reduzir a exposição de informações pessoais.\r\n\r\nNA PRÁTICA\r\n\r\nPeriodicamente, revise:\r\n- quem pode visualizar suas publicações;\r\n- quem pode comentar;\r\n- quem pode enviar mensagens;\r\n- quem pode encontrar seu perfil;\r\n- quais informações aparecem na sua página;\r\n- quais aplicativos possuem acesso à sua conta.\r\n\r\nTambém é importante revisar as configurações quando uma plataforma apresentar uma mudança importante.\r\n\r\nATENÇÃO\r\n\r\nNão presuma que uma conta está protegida apenas porque ela possui configurações de privacidade.\r\n\r\nSempre verifique quais opções estão realmente ativadas.\r\n\r\nLEMBRE-SE\r\n\r\nPrivacidade nas redes sociais começa quando você sabe quem pode acessar aquilo que publica.",
    },
    {
      titulo: "Cuidado com desconhecidos",
      corpo: "Na internet, nem sempre sabemos quem está realmente por trás de um perfil.\r\n\r\nUma pessoa pode utilizar um nome ou fotografia que não corresponde à sua identidade real. Isso pode acontecer em redes sociais, aplicativos de mensagens e outras plataformas.\r\n\r\nPor isso, evite confiar rapidamente em pessoas que você acabou de conhecer pela internet.\r\n\r\nNA PRÁTICA\r\n\r\nTenha cuidado quando alguém:\r\n- pede informações pessoais;\r\n- solicita fotografias privadas;\r\n- pede dinheiro;\r\n- envia links;\r\n- tenta descobrir onde você mora;\r\n- quer saber detalhes da sua rotina;\r\n- tenta convencer você a manter uma conversa em segredo.\r\n\r\nSe uma conversa fizer você se sentir desconfortável, você pode interromper o contato, bloquear a pessoa e procurar ajuda.\r\n\r\nATENÇÃO\r\n\r\nVocê não precisa provar nada para uma pessoa desconhecida.\r\n\r\nNão envie informações ou imagens apenas porque alguém está pressionando você.\r\n\r\nLEMBRE-SE\r\n\r\nNa internet, trate pessoas desconhecidas com o mesmo cuidado que teria com alguém que você acabou de conhecer pessoalmente.",
    },
    {
      titulo: "Pensar antes de publicar",
      corpo: "Uma publicação pode parecer divertida ou importante no momento, mas suas consequências podem durar muito mais.\r\n\r\nFotografias, vídeos, comentários e informações pessoais podem ser copiados por outras pessoas.\r\n\r\nPor isso, antes de publicar, faça uma pausa.\r\n\r\nNA PRÁTICA\r\n\r\nPergunte:\r\n\r\nEu gostaria que essa informação fosse vista por pessoas que não conheço?\r\n\r\nEstou expondo outra pessoa sem autorização?\r\n\r\nEssa publicação revela minha localização ou rotina?\r\n\r\nEu me sentiria confortável vendo essa publicação novamente daqui a alguns anos?\r\n\r\nTambém evite publicar informações que possam colocar você ou outras pessoas em uma situação de risco.\r\n\r\nATENÇÃO\r\n\r\nO botão \"excluir\" não garante que ninguém mais tenha acesso ao conteúdo.\r\n\r\nUma pessoa pode ter feito uma captura de tela ou compartilhado a publicação.\r\n\r\nLEMBRE-SE\r\n\r\nA melhor hora para proteger uma informação é antes de publicá-la.\r\n\r\n\r\nMÓDULO 05 — NAVEGAÇÃO SEGURA",
    },
  ],
  [
    {
      titulo: "Verificando sites",
      corpo: "A internet possui milhões de páginas diferentes. Algumas são confiáveis, enquanto outras podem ter sido criadas para enganar usuários.\r\n\r\nAntes de fornecer informações pessoais, é importante verificar se você realmente está no site que pretendia acessar.\r\n\r\nObserve o endereço da página e procure sinais de que ele corresponde ao serviço esperado.\r\n\r\nUm site pode utilizar aparência semelhante à de uma empresa conhecida e ainda assim ser falso.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de preencher um formulário:\r\n- confira o endereço do site;\r\n- procure erros ou alterações estranhas no nome;\r\n- desconfie de links inesperados;\r\n- verifique se você realmente precisava acessar aquela página;\r\n- evite fornecer informações quando houver dúvida.\r\n\r\nQuando possível, utilize o aplicativo oficial ou digite diretamente o endereço conhecido do serviço.\r\n\r\nATENÇÃO\r\n\r\nNão confie somente na aparência da página. Golpistas podem copiar cores, imagens e logotipos de serviços verdadeiros.\r\n\r\nLEMBRE-SE\r\n\r\nAntes de confiar em um site, confirme se você realmente está no endereço correto.",
    },
    {
      titulo: "Conexão segura",
      corpo: "Quando acessamos um site, informações são trocadas entre nosso dispositivo e o servidor responsável pelo serviço.\r\n\r\nUma conexão protegida ajuda a proteger essa comunicação contra determinadas formas de interceptação.\r\n\r\nPor isso, é importante observar se o navegador indica que a conexão está protegida, especialmente quando você pretende informar dados pessoais.\r\n\r\nMas existe uma diferença importante: uma conexão protegida não significa automaticamente que o site é confiável.\r\n\r\nUm site falso também pode utilizar uma conexão protegida.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de informar dados:\r\n- confira o endereço completo do site;\r\n- procure sinais de conexão protegida no navegador;\r\n- desconfie de endereços estranhos;\r\n- evite links desconhecidos;\r\n- confirme se aquele é realmente o serviço que você queria acessar.\r\n\r\nATENÇÃO\r\n\r\nNão pense: \"O site possui conexão segura, então posso confiar nele.\"\r\n\r\nA segurança depende também de confirmar a identidade do serviço.\r\n\r\nLEMBRE-SE\r\n\r\nVerificar a conexão é importante, mas também precisamos verificar se estamos no site correto.",
    },
    {
      titulo: "Downloads e arquivos",
      corpo: "Baixar arquivos faz parte do uso normal da internet. Podemos baixar documentos, imagens, programas e outros conteúdos.\r\n\r\nO problema acontece quando baixamos arquivos de fontes desconhecidas ou abrimos anexos inesperados.\r\n\r\nUm arquivo malicioso pode tentar prejudicar o dispositivo ou permitir ações que você não autorizou.\r\n\r\nPor isso, antes de abrir ou instalar alguma coisa, pense na origem daquele arquivo.\r\n\r\nNA PRÁTICA\r\n\r\nAntes de baixar:\r\n- verifique quem disponibilizou o arquivo;\r\n- prefira sites confiáveis;\r\n- desconfie de anexos inesperados;\r\n- evite instalar programas de fontes desconhecidas;\r\n- mantenha o sistema atualizado;\r\n- não ignore avisos de segurança sem entender o motivo.\r\n\r\nATENÇÃO\r\n\r\nUma mensagem pode tentar convencer você de que precisa instalar um programa imediatamente para corrigir um problema.\r\n\r\nNão faça isso apenas porque alguém está pressionando você.\r\n\r\nProcure confirmar a informação em uma fonte confiável.\r\n\r\nLEMBRE-SE\r\n\r\nSe você não sabe de onde veio um arquivo, não tenha pressa para abri-lo.",
    },
    {
      titulo: "Navegação com segurança",
      corpo: "Navegar com segurança não depende de uma única ferramenta ou atitude.\r\n\r\nÉ o resultado de vários hábitos que, juntos, diminuem os riscos.\r\n\r\nVerificar sites, evitar links suspeitos, proteger senhas, cuidar dos dados pessoais, desconfiar de mensagens inesperadas e manter os dispositivos atualizados são exemplos de práticas que ajudam a utilizar a internet de maneira mais segura.\r\n\r\nTambém é importante entender que ninguém está completamente livre de riscos. O objetivo é aprender a reconhecer situações suspeitas e tomar decisões mais cuidadosas.\r\n\r\nNA PRÁTICA\r\n\r\nAo utilizar a internet:\r\n- pense antes de clicar;\r\n- confira os sites;\r\n- proteja suas contas;\r\n- não compartilhe informações desnecessariamente;\r\n- desconfie de mensagens inesperadas;\r\n- tenha cuidado com downloads;\r\n- mantenha seus dispositivos atualizados;\r\n- peça ajuda quando uma situação parecer suspeita.\r\n\r\nATENÇÃO\r\n\r\nNão tenha vergonha de parar quando alguma coisa parecer estranha.\r\n\r\nNa dúvida, é melhor verificar uma informação antes de continuar do que tentar resolver um problema depois.\r\n\r\nLEMBRE-SE\r\n\r\nSegurança digital não depende de uma única ação. Ela é construída por pequenos cuidados praticados todos os dias.\r\n\r\n\r\n==================================================",
    },
  ],
];

for (let i = 0; i < conteudos.length; i++) {
  const conteudo = conteudos[i];
  const etapas = etapasPorConteudo[i];

  for (let j = 0; j < etapas.length; j++) {
    await prisma.etapaConteudo.upsert({
      where: {
        conteudoId_ordem: {
          conteudoId: conteudo.id,
          ordem: j + 1,
        },
      },
      update: {
        titulo: etapas[j].titulo,
        corpo: etapas[j].corpo,
      },
      create: {
        conteudoId: conteudo.id,
        titulo: etapas[j].titulo,
        corpo: etapas[j].corpo,
        ordem: j + 1,
      },
    });
  }
}

console.log("✓ Etapas dos conteúdos criadas");

  // =========================
  // QUESTIONÁRIOS
  // =========================

  const questionarioInicial = await prisma.questionario.upsert({
    where: {
      grupoComparacao_versao_fase: {
        grupoComparacao: "PILOTO",
        versao: 1,
        fase: "INICIAL",
      },
    },
    update: {},
    create: {
      grupoComparacao: "PILOTO",
      fase: "INICIAL",
      versao: 1,
      titulo: "Avaliação Inicial",
      ativo: true,
    },
  });

  const questionarioFinal = await prisma.questionario.upsert({
    where: {
      grupoComparacao_versao_fase: {
        grupoComparacao: "PILOTO",
        versao: 1,
        fase: "FINAL",
      },
    },
    update: {},
    create: {
      grupoComparacao: "PILOTO",
      fase: "FINAL",
      versao: 1,
      titulo: "Avaliação Final",
      ativo: true,
    },
  });

  console.log("✓ Questionários criados");

  // =========================
  // QUESTÕES
  // =========================

  const questoes = [
    {
      enunciado: "Qual característica representa uma senha mais segura?",
      tema: "Senhas",
    },
    {
      enunciado: "O que é phishing?",
      tema: "Phishing",
    },
    {
      enunciado: "Qual atitude ajuda a proteger dados pessoais?",
      tema: "Privacidade",
    },
    {
      enunciado: "Qual cuidado é recomendado ao usar redes sociais?",
      tema: "Redes sociais",
    },
    {
      enunciado: "Qual prática ajuda em uma navegação mais segura?",
      tema: "Navegação",
    },
    {
      enunciado: "Por que não devemos reutilizar a mesma senha?",
      tema: "Senhas",
    },
    {
      enunciado: "Como identificar um possível link malicioso?",
      tema: "Phishing",
    },
    {
      enunciado:
        "O que deve ser considerado antes de compartilhar uma informação?",
      tema: "Privacidade",
    },
    {
      enunciado:
        "Por que devemos ter cuidado com informações publicadas nas redes?",
      tema: "Redes sociais",
    },
    {
      enunciado: "Qual comportamento reduz riscos ao acessar sites?",
      tema: "Navegação",
    },
  ];

  const questoesCriadas = [];

  for (const dados of questoes) {
    let questao = await prisma.questao.findFirst({
      where: {
        enunciado: dados.enunciado,
      },
    });

    if (!questao) {
      questao = await prisma.questao.create({
        data: dados,
      });
    }

    questoesCriadas.push(questao);
  }

  console.log("✓ Questões criadas");

  // =========================
  // ALTERNATIVAS
  // =========================

  const alternativas = [
    [
      ["Uma senha longa e única", true],
      ["O nome da pessoa", false],
      ["123456", false],
      ["A data de nascimento", false],
    ],
    [
      ["Um tipo de golpe que tenta enganar o usuário", true],
      ["Um antivírus", false],
      ["Um navegador", false],
      ["Um sistema operacional", false],
    ],
    [
      ["Compartilhar todos os dados pessoais", false],
      ["Usar senhas diferentes", true],
      ["Publicar documentos pessoais", false],
      ["Informar senhas para outras pessoas", false],
    ],
    [
      ["Aceitar qualquer solicitação", false],
      ["Compartilhar senhas", false],
      ["Revisar as configurações de privacidade", true],
      ["Publicar informações sensíveis", false],
    ],
    [
      ["Clicar em qualquer link recebido", false],
      ["Verificar o endereço do site", true],
      ["Desativar todas as atualizações", false],
      ["Compartilhar senhas", false],
    ],
    [
      ["Porque uma senha vazada pode comprometer várias contas", true],
      ["Porque senhas iguais são obrigatórias", false],
      ["Porque isso aumenta a velocidade da internet", false],
      ["Porque elimina a necessidade de autenticação", false],
    ],
    [
      ["Verificar cuidadosamente o endereço e a origem", true],
      ["Clicar imediatamente", false],
      ["Enviar a senha solicitada", false],
      ["Desativar o antivírus", false],
    ],
    [
      ["Se a informação realmente precisa ser compartilhada", true],
      ["Se ela contém uma senha", false],
      ["Se ela possui dados bancários", false],
      ["Se qualquer pessoa pediu", false],
    ],
    [
      [
        "Porque as informações podem permanecer disponíveis e ser utilizadas indevidamente",
        true,
      ],
      ["Porque redes sociais não armazenam informações", false],
      ["Porque toda publicação desaparece imediatamente", false],
      ["Porque senhas ficam públicas automaticamente", false],
    ],
    [
      [
        "Verificar se o site utiliza uma conexão segura e se o endereço é confiável",
        true,
      ],
      ["Instalar qualquer programa", false],
      ["Aceitar qualquer alerta", false],
      ["Compartilhar dados pessoais indiscriminadamente", false],
    ],
  ];

  for (let i = 0; i < questoesCriadas.length; i++) {
    const questao = questoesCriadas[i];

    const quantidade = await prisma.alternativa.count({
      where: {
        questaoId: questao.id,
      },
    });

    if (quantidade === 0) {
      await prisma.alternativa.createMany({
        data: alternativas[i].map(([texto, correta]) => ({
          questaoId: questao.id,
          texto: String(texto),
          correta: Boolean(correta),
        })),
      });
    }
  }

  console.log("✓ Alternativas criadas");

  // =========================
  // QUESTIONÁRIO × QUESTÃO
  // =========================

  const questionarios = [questionarioInicial, questionarioFinal];

  for (const questionario of questionarios) {
    for (let i = 0; i < questoesCriadas.length; i++) {
      const questao = questoesCriadas[i];

      await prisma.questionarioQuestao.upsert({
        where: {
          questionarioId_questaoId: {
            questionarioId: questionario.id,
            questaoId: questao.id,
          },
        },
        update: {
          ordem: i + 1,
          peso: 1,
        },
        create: {
          questionarioId: questionario.id,
          questaoId: questao.id,
          ordem: i + 1,
          peso: 1,
        },
      });
    }
  }

  console.log("✓ Questões vinculadas aos questionários");

  console.log("");
  console.log("================================");
  console.log("SEED CONCLUÍDO COM SUCESSO!");
  console.log("================================");
  console.log(`Participante: ${participante.email}`);
  console.log(`Administrador: ${administrador.email}`);
  console.log(`Conteúdos: ${conteudos.length}`);
  console.log(`Questões: ${questoesCriadas.length}`);
  console.log("Questionários: 2");
}

main()
  .catch((error) => {
    console.error("Erro durante o seed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
