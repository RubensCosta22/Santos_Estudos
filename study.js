export const studyGuides = {
  'fiscal-especificos': {
    intro: 'Estudo orientado aos 45% da pontuação da prova. A sequência parte dos fundamentos do poder de polícia, passa pelos atos de fiscalização e termina nas situações práticas de campo.',
    modules: [
      {
        id: 'fiscal-base',
        title: '1. Fundamentos da fiscalização e poder de polícia',
        topics: ['Código de Posturas do Município de Santos','Fiscalização municipal','Poder de polícia administrativa','Urbanidade, imparcialidade e fé pública'],
        summary: 'A fiscalização municipal materializa competências administrativas do Município e deve atuar dentro da lei. O poder de polícia permite limitar ou disciplinar direitos, interesses e liberdades em razão do interesse público. O exercício regular exige órgão competente, respeito aos limites legais, processo devido e ausência de abuso ou desvio de poder. Para o fiscal, isso se traduz em atuação objetiva, impessoal, motivada e documentada.',
        keyPoints: [
          'Poder de polícia não é liberdade irrestrita do agente: competência, finalidade pública e legalidade limitam a atuação.',
          'Segurança, higiene, ordem e tranquilidade pública aparecem expressamente entre os interesses protegidos pela noção legal de poder de polícia.',
          'Fé pública não elimina contraditório ou controle: o registro do fiscal precisa ser objetivo, verificável e compatível com a norma aplicada.',
          'Urbanidade e imparcialidade dizem respeito à forma de atendimento; não autorizam tolerar irregularidade nem tratamento desigual.'
        ],
        examFocus: 'A banca pode tentar confundir discricionariedade com arbitrariedade. Mesmo quando a lei deixa margem de escolha, permanecem competência, finalidade, proporcionalidade, motivação e controle.',
        example: 'Em uma vistoria, o fiscal identifica situação irregular. A conduta correta é registrar os fatos observáveis, identificar o enquadramento normativo e adotar apenas a medida prevista para aquela hipótese, preservando o direito de defesa.',
        sourceIds: ['codigo-posturas-santos','ctn-poder-policia','constituicao-federal']
      },
      {
        id: 'fiscal-interesse-coletivo',
        title: '2. Higiene, ordem, sossego e bem-estar coletivo',
        topics: ['Higiene pública','Ordem pública','Sossego público','Bem-estar coletivo'],
        summary: 'Esses temas representam finalidades clássicas da fiscalização de posturas. O ponto central é reconhecer que o uso de propriedades, estabelecimentos e espaços urbanos pode ser condicionado quando produzir efeitos incompatíveis com higiene, ordem, tranquilidade ou proteção da coletividade. A prova tende a cobrar a relação entre interesse individual e disciplina administrativa.',
        keyPoints: [
          'A atuação fiscal deve partir de fato verificável e de previsão normativa, não de preferência pessoal.',
          'Sossego público se relaciona diretamente à disciplina de atividades que produzam perturbação ou ruído.',
          'Higiene e ordem pública são expressamente associadas ao poder de polícia no art. 78 do CTN.',
          'Uma mesma ocorrência pode envolver mais de um interesse protegido, mas o enquadramento deve seguir a norma específica.'
        ],
        examFocus: 'Evite respostas absolutas como “o interesse público sempre permite restringir qualquer direito”. A restrição depende de competência, lei e procedimento regular.',
        example: 'Uma atividade econômica pode ser lícita e ainda assim ficar sujeita a horário, licença e limites de ruído. O objeto da fiscalização é a conformidade da atividade com as regras aplicáveis.',
        sourceIds: ['codigo-posturas-santos','ctn-poder-policia']
      },
      {
        id: 'fiscal-campo',
        title: '3. Vistoria, diligência e orientação',
        topics: ['Vistoria','Diligência','Orientação','Segurança do fiscal em campo'],
        summary: 'Vistoria e diligência são atividades de campo destinadas à verificação de fatos, condições e cumprimento de normas. O resultado precisa ser traduzido em registro técnico e objetivo. A orientação ao munícipe pode prevenir ou facilitar a regularização, mas não substitui as providências obrigatórias quando a lei exigir atuação formal.',
        keyPoints: [
          'Antes da diligência: identificar objeto, competência, endereço, histórico e norma relacionada quando disponíveis.',
          'Durante a vistoria: observar fatos, evitar conclusões sem base e separar o que foi constatado do que foi informado por terceiros.',
          'Depois: registrar data, local, circunstâncias relevantes e providências adotadas.',
          'Segurança operacional exige avaliação de risco e respeito aos protocolos do órgão; o fiscal não deve criar confronto desnecessário.'
        ],
        examFocus: 'Registro objetivo é diferente de opinião. Em uma questão situacional, prefira alternativas que descrevem fatos verificáveis e preservam o procedimento.',
        example: '“Som elevado audível às 23h, proveniente do estabelecimento X, conforme medição/constatação realizada” é um registro mais defensável do que “o local é sempre barulhento e desrespeitoso”.',
        sourceIds: ['codigo-posturas-santos']
      },
      {
        id: 'fiscal-documentos',
        title: '4. Documentos e formalização da ação fiscal',
        topics: ['Intimação','Notificação','Termo de constatação','Auto de infração','Registro objetivo','Enquadramento normativo'],
        summary: 'A formalização transforma a constatação de campo em ato administrativo controlável. O documento deve individualizar a situação, registrar os fatos relevantes, indicar a base normativa quando cabível e permitir que o interessado compreenda a providência exigida ou a imputação realizada. Os nomes dos instrumentos não devem ser tratados como sinônimos: a finalidade e os efeitos de cada um dependem da legislação aplicável.',
        keyPoints: [
          'Fato constatado e fundamento jurídico são etapas distintas: primeiro descreva o que ocorreu; depois faça o enquadramento.',
          'Evite campos vagos, juízos morais e expressões genéricas que não permitam reconstruir a ocorrência.',
          'A identificação do destinatário, local, data e objeto reduz ambiguidades e fortalece a instrução do processo.',
          'Notificação, intimação, termo e auto devem ser estudados na redação do Código de Posturas e dos procedimentos municipais.'
        ],
        examFocus: 'Questões podem trocar “constatação” por “infração”. Nem toda constatação leva automaticamente à mesma sanção; a consequência depende do enquadramento e do procedimento previsto.',
        example: 'Ao encontrar ocupação irregular, o fiscal registra dimensão/localização e demais fatos relevantes; em seguida verifica qual dispositivo municipal incide e qual instrumento deve ser lavrado.',
        sourceIds: ['codigo-posturas-santos','lei-13460']
      },
      {
        id: 'fiscal-processo-sancionador',
        title: '5. Medidas administrativas e processo sancionador',
        topics: ['Apreensão','Interdição','Lacração','Embargo','Medidas administrativas','Instrução do processo administrativo fiscalizatório','Prazos e decisão','Aplicação de sanções','Defesa e recurso'],
        summary: 'Medidas administrativas e sanções não são intercambiáveis. A atuação deve observar a hipótese prevista na norma, competência da autoridade e procedimento correspondente. No processo sancionador, contraditório, ampla defesa, motivação e possibilidade de controle são referências centrais. Prazos e efeitos concretos precisam ser conferidos na legislação municipal específica.',
        keyPoints: [
          'Apreensão, interdição, lacração e embargo têm objetos e efeitos distintos; memorize a finalidade de cada medida a partir da lei seca.',
          'A instrução deve reunir documentos e registros capazes de sustentar a decisão administrativa.',
          'A decisão precisa enfrentar os elementos relevantes do processo e indicar fundamento.',
          'Defesa e recurso não anulam a fiscalização; são garantias do processo administrativo e mecanismos de controle do ato.'
        ],
        examFocus: 'Desconfie de alternativas que autorizem sanção sem previsão legal, sem competência ou sem possibilidade de defesa quando o procedimento a exige.',
        example: 'Após lavratura do instrumento cabível, o processo reúne o registro da diligência e demais documentos; a autoridade competente analisa a defesa e decide de forma motivada.',
        sourceIds: ['codigo-posturas-santos','constituicao-federal']
      },
      {
        id: 'fiscal-estabelecimentos',
        title: '6. Funcionamento de estabelecimentos, licenças e ruídos',
        topics: ['Fiscalização de funcionamento de estabelecimentos','Licenças, alvarás e autorizações','Horários e atividades incômodas','Ruídos'],
        summary: 'O exercício de atividades privadas pode depender de licenciamento, autorização e cumprimento de condições de funcionamento. Para prova, o foco é perceber que possuir um documento autorizativo não afasta o dever de obedecer às demais posturas municipais. Horário, ruído e atividade incômoda devem ser verificados conforme a legislação atualizada e as alterações do Código de Posturas.',
        keyPoints: [
          'Licença ou alvará não é salvo-conduto para descumprir outras exigências municipais.',
          'A fiscalização deve conferir se a atividade real corresponde ao título apresentado e às condicionantes aplicáveis.',
          'Ruído é tema sujeito a alterações normativas; estude pela versão vigente do Código e suas leis modificadoras.',
          'A medida adotada deve corresponder à irregularidade efetivamente constatada.'
        ],
        examFocus: 'A banca pode apresentar estabelecimento regularmente licenciado, mas em desconformidade com horário ou ruído. Regularidade documental e regularidade operacional são verificações diferentes.',
        example: 'Um estabelecimento possui alvará válido, mas descumpre limite ou horário previsto para determinada atividade. O fiscal analisa especificamente essa desconformidade e aplica o procedimento pertinente.',
        sourceIds: ['codigo-posturas-santos','codigo-edificacoes-santos','luos-santos']
      },
      {
        id: 'fiscal-espaco-publico',
        title: '7. Uso de vias, calçadas, praças, praias e comércio ambulante',
        topics: ['Uso regular de bens públicos e espaços urbanos','Ocupação de vias e espaços públicos','Calçadas, praças e praias','Comércio ambulante','Estruturas temporárias'],
        summary: 'O uso de espaço público é condicionado pelo interesse coletivo, circulação, acessibilidade, segurança e autorizações previstas na legislação. Ocupações comerciais ou temporárias não devem ser analisadas apenas pelo interesse do ocupante: o fiscal verifica título autorizativo, limites físicos, condições e compatibilidade com o uso comum do espaço.',
        keyPoints: [
          'Bens e espaços de uso coletivo possuem regras próprias de ocupação e utilização.',
          'Autorização temporária deve ser lida junto com suas condicionantes; extrapolar área, prazo ou finalidade pode gerar irregularidade.',
          'Calçada não é simples extensão privada do imóvel: circulação e acessibilidade são elementos relevantes.',
          'Comércio ambulante deve ser conferido conforme autorização, local, atividade e demais condições estabelecidas pelo Município.'
        ],
        examFocus: 'Em casos práticos, identifique: quem usa, qual espaço, qual autorização, qual condição foi violada e qual norma incide.',
        example: 'Uma estrutura temporária autorizada para evento ocupa área maior que a permitida. O fato relevante não é apenas existir autorização, mas o descumprimento da condicionante espacial.',
        sourceIds: ['codigo-posturas-santos','luos-santos']
      },
      {
        id: 'fiscal-publicidade-eventos',
        title: '8. Publicidade, propaganda e eventos',
        topics: ['Publicidade e propaganda','Eventos: autorização e condicionantes'],
        summary: 'Publicidade, propaganda e eventos interferem no espaço urbano e podem exigir autorização, respeito a local, dimensões, duração, segurança e outras condicionantes. O raciocínio de prova é verificar se há título válido e se a execução permanece dentro dos limites autorizados.',
        keyPoints: [
          'Autorização e cumprimento das condicionantes são verificações cumulativas.',
          'Mudança de local, dimensão, período ou estrutura pode alterar a conformidade da atividade.',
          'A fiscalização deve registrar o elemento concreto que diverge da autorização ou da norma.',
          'Evite presumir que toda publicidade ou evento é proibido; a questão é a conformidade com a disciplina municipal.'
        ],
        examFocus: 'Alternativas absolutas (“sempre permitido” ou “sempre proibido”) tendem a ignorar licenciamento e condicionantes.',
        example: 'Um evento autorizado utiliza estrutura adicional não prevista. O fiscal verifica a autorização e documenta a diferença entre o aprovado e o executado.',
        sourceIds: ['codigo-posturas-santos','luos-santos']
      },
      {
        id: 'fiscal-atendimento',
        title: '9. Atendimento, denúncias, sistemas e zelo documental',
        topics: ['Atendimento ao munícipe','Denúncias','Sistemas informatizados','Controle de prazos','Zelo documental'],
        summary: 'A atividade fiscal não termina no campo. Denúncias precisam ser tratadas como informação a ser verificada, e não como prova automática. Sistemas e documentos mantêm rastreabilidade da ação fiscal, controle de prazos e comunicação entre unidades. No atendimento, devem prevalecer clareza, urbanidade, impessoalidade e proteção adequada das informações.',
        keyPoints: [
          'Denúncia inicia ou orienta a apuração; a constatação deve resultar da atividade fiscal e das provas disponíveis.',
          'Registro tempestivo em sistema reduz perda de prazo e falhas de instrução.',
          'Documentos administrativos devem preservar integridade, rastreabilidade e acesso conforme regras aplicáveis.',
          'Dados pessoais devem ser tratados apenas na medida necessária à finalidade administrativa.'
        ],
        examFocus: 'Cuidado com a ideia de que denúncia anônima ou relato do munícipe, por si só, prova a infração. A atuação deve verificar e registrar os fatos.',
        example: 'Recebida denúncia de ocupação irregular, o fiscal consulta o histórico, realiza a diligência, registra o que encontrou e vincula a providência ao processo correspondente.',
        sourceIds: ['lei-13460','lai','lgpd','codigo-posturas-santos']
      }
    ]
  },
  'operador-especificos': {
    intro: 'Estudo orientado aos 48% da pontuação da prova. Os módulos organizam a prática do atendimento socioassistencial, os registros e a proteção de direitos sem substituir a leitura das normativas do SUAS.',
    modules: [
      {
        id: 'op-servicos',
        title: '1. Serviços socioassistenciais e lógica de proteção',
        topics: ['Serviços socioassistenciais'],
        summary: 'Os serviços socioassistenciais integram o SUAS e são organizados por níveis de proteção. A Tipificação Nacional padroniza nomenclatura, usuários, objetivos, provisões, aquisições e unidades de oferta. Para o operador, o essencial é reconhecer que atendimento não é ação improvisada: cada serviço possui finalidade, público e fluxo próprios.',
        keyPoints: [
          'Proteção Social Básica atua preventivamente no fortalecimento de vínculos e redução de vulnerabilidades.',
          'Proteção Social Especial atende situações de risco pessoal/social e violações de direitos, com média e alta complexidade.',
          'CRAS e CREAS não são sinônimos: são unidades com funções e ofertas distintas.',
          'O encaminhamento correto depende da necessidade identificada e da competência do serviço de destino.'
        ],
        examFocus: 'A banca costuma trocar unidade, serviço e nível de proteção. Memorize a lógica da Tipificação, não apenas siglas.',
        example: 'Uma família que demanda fortalecimento preventivo de vínculos possui fluxo diferente de uma situação com violação de direitos que exija acompanhamento especializado.',
        sourceIds: ['tipificacao-suas','loas','nob-suas-2012']
      },
      {
        id: 'op-acolhida-abordagem',
        title: '2. Acolhida, abordagem social e busca ativa',
        topics: ['Acolhida','Abordagem social','Busca ativa'],
        summary: 'Acolhida é a recepção qualificada da demanda, com escuta e identificação inicial das necessidades. Abordagem social é uma oferta socioassistencial especializada com trabalho continuado de aproximação e identificação de situações de risco em espaços públicos. Busca ativa é estratégia para localizar pessoas e famílias que necessitam de proteção ou acesso a serviços, mas não chegaram espontaneamente à rede.',
        keyPoints: [
          'Acolher não é apenas cadastrar: envolve escuta respeitosa, compreensão da demanda e orientação inicial.',
          'Abordagem social não se confunde com ação coercitiva de retirada de pessoas do espaço público.',
          'Busca ativa procura reduzir barreiras de acesso e alcançar públicos invisibilizados ou afastados dos serviços.',
          'Toda aproximação deve respeitar dignidade, autonomia, segurança e competências institucionais.'
        ],
        examFocus: 'Diferencie estratégia (busca ativa), momento/prática de atendimento (acolhida) e serviço especializado (abordagem social).',
        example: 'Equipe identifica pessoa em situação de rua por abordagem social, realiza acolhida da demanda e articula encaminhamentos possíveis sem transformar o atendimento em mera remoção do local.',
        sourceIds: ['tipificacao-suas','publicacoes-suas']
      },
      {
        id: 'op-acompanhamento',
        title: '3. Orientação, acompanhamento, encaminhamento e visita domiciliar',
        topics: ['Orientação','Acompanhamento','Encaminhamento','Visita domiciliar acompanhada'],
        summary: 'Orientar é fornecer informação adequada e compreensível sobre direitos, serviços e possibilidades. Encaminhar significa articular o acesso a outro serviço ou política, com referência clara; não é apenas entregar um endereço. Acompanhamento pressupõe continuidade, objetivos e registro. A visita domiciliar, quando prevista e necessária, deve ser planejada, respeitosa e vinculada à finalidade do atendimento.',
        keyPoints: [
          'Encaminhamento de qualidade informa o destino e registra a razão; quando necessário, exige articulação com a rede.',
          'Acompanhamento possui continuidade e monitoramento, diferentemente de atendimento pontual.',
          'Visita domiciliar não autoriza invasão ou exposição desnecessária da intimidade familiar.',
          'Orientações devem ser adequadas à idade, deficiência, linguagem e contexto do usuário.'
        ],
        examFocus: 'Questões situacionais frequentemente apresentam “encaminhar e encerrar” como solução automática. Quando há acompanhamento necessário, o simples encaminhamento pode ser insuficiente.',
        example: 'Ao encaminhar usuário para saúde, a equipe registra a necessidade e, conforme o caso, acompanha se o acesso ocorreu e se há repercussões para o plano de atendimento socioassistencial.',
        sourceIds: ['tipificacao-suas','prontuario-suas','publicacoes-suas']
      },
      {
        id: 'op-registros',
        title: '4. Registros, relatórios, Prontuário SUAS, sigilo e dados pessoais',
        topics: ['Registros e relatórios','Prontuário SUAS','Sigilo','Proteção de dados'],
        summary: 'O Prontuário SUAS organiza informações necessárias ao diagnóstico, planejamento e acompanhamento do trabalho social. Registros devem ser pertinentes, objetivos e suficientes para dar continuidade ao atendimento. Sigilo e proteção de dados exigem restringir acesso e compartilhamento à finalidade e às atribuições profissionais/institucionais, evitando exposição desnecessária.',
        keyPoints: [
          'Registrar fato, providência e evolução do acompanhamento é diferente de produzir julgamento moral sobre o usuário.',
          'Prontuário serve à continuidade e qualificação do trabalho; não é um depósito indiscriminado de informações.',
          'O acesso deve observar necessidade funcional, sigilo e regras institucionais de segurança.',
          'Compartilhar em rede não significa compartilhar tudo: o fluxo deve se limitar ao necessário para a proteção e o atendimento.'
        ],
        examFocus: 'Desconfie de alternativas que defendam “sigilo absoluto” ou “compartilhamento irrestrito”. O correto é compatibilizar dever de proteção, finalidade, base legal e necessidade da informação.',
        example: 'Em relatório para outro serviço, a equipe informa os elementos necessários ao encaminhamento e evita reproduzir detalhes íntimos que não têm utilidade para a providência solicitada.',
        sourceIds: ['prontuario-suas','lgpd','loas']
      },
      {
        id: 'op-publicos',
        title: '5. Atendimento por ciclo de vida e deficiência',
        topics: ['Atendimento a crianças','Atendimento a adolescentes','Atendimento a adultos','Atendimento a idosos','Atendimento a pessoas com deficiência'],
        summary: 'O atendimento socioassistencial deve ser centrado em direitos e ajustado às necessidades de cada pessoa. Crianças e adolescentes são sujeitos de direitos sob proteção integral; pessoas com deficiência têm direito à igualdade, acessibilidade e participação; pessoas idosas e adultos devem ser atendidos sem infantilização ou desconsideração da autonomia. O operador precisa adaptar comunicação, acessibilidade e proteção ao contexto concreto.',
        keyPoints: [
          'Criança e adolescente não são objetos da intervenção: sua condição de sujeitos de direitos orienta o atendimento.',
          'Deficiência não equivale automaticamente a incapacidade; barreiras e recursos de acessibilidade precisam ser considerados.',
          'Autonomia e proteção não são opostos: a intervenção deve buscar proteção com o menor grau necessário de substituição da vontade.',
          'Suspeita ou conhecimento de violação de direitos exige seguir os fluxos legais e institucionais correspondentes.'
        ],
        examFocus: 'Evite alternativas paternalistas. A resposta mais adequada tende a combinar proteção, escuta, participação do usuário e articulação da rede.',
        example: 'Ao atender pessoa com deficiência, a equipe adapta a comunicação e garante participação da própria pessoa na definição das providências, em vez de dirigir todo o atendimento apenas ao acompanhante.',
        sourceIds: ['eca','estatuto-pcd','lei-13431','loas']
      },
      {
        id: 'op-mse-pia',
        title: '6. Medidas socioeducativas em meio aberto e PIA',
        topics: ['Medidas socioeducativas em meio aberto','Plano Individual de Atendimento — PIA'],
        summary: 'No âmbito municipal, as medidas em meio aberto incluem programas para Liberdade Assistida (LA) e Prestação de Serviços à Comunidade (PSC). O PIA é instrumento de planejamento e gestão do atendimento do adolescente, construído a partir de análise situacional, metas e ações, com participação do adolescente e articulação necessária com família e rede. Ele não deve ser reduzido a formulário burocrático.',
        keyPoints: [
          'A Lei do SINASE atribui aos Municípios a criação e manutenção de programas para execução das medidas socioeducativas em meio aberto.',
          'O PIA organiza objetivos, atividades e acompanhamento individualizado do adolescente.',
          'Para prestação de serviços à comunidade (PSC) e liberdade assistida (LA), o SINASE determina elaboração do PIA em até 15 dias do ingresso do adolescente no programa de atendimento.',
          'O material técnico do MDS trabalha a construção do PIA em etapas como acolhida, análise situacional, planejamento, monitoramento e avaliação.',
          'Prontuário e outros registros subsidiam o PIA, mas não se confundem com ele.'
        ],
        examFocus: 'A banca pode apresentar PIA como cadastro padronizado feito sem participação do adolescente. Isso contraria sua função de planejamento individualizado.',
        example: 'No acompanhamento de LA, equipe e adolescente definem metas possíveis, articulam educação/saúde quando necessário e monitoram a evolução, registrando o processo sem transformar o plano em mera lista de obrigações.',
        sourceIds: ['sinase','pia-mse','eca','prontuario-suas']
      },
      {
        id: 'op-rede-comunicacao',
        title: '7. Articulação em rede e comunicação',
        topics: ['Articulação em rede','Comunicação'],
        summary: 'A rede de proteção envolve serviços socioassistenciais e outras políticas públicas. Articulação em rede significa construir fluxos, responsabilidades e comunicação para evitar respostas fragmentadas. A comunicação deve ser clara, respeitosa e suficiente para produzir continuidade no atendimento, preservando o sigilo e evitando encaminhamentos genéricos.',
        keyPoints: [
          'Rede não significa transferir responsabilidade: o serviço de origem mantém as atribuições que lhe cabem.',
          'Encaminhamentos devem indicar motivo e informação necessária para que o destino compreenda a demanda.',
          'Reuniões de caso e contatos intersetoriais devem ter finalidade definida e registro pertinente.',
          'Comunicação com usuário deve verificar compreensão, especialmente diante de linguagem técnica ou barreiras.'
        ],
        examFocus: 'Quando a questão trouxer problema complexo, respostas isoladas de um único serviço costumam ser insuficientes; procure articulação sem violar competências e sigilo.',
        example: 'Situação envolvendo proteção social e saúde pode exigir comunicação entre CREAS e serviço de saúde, cada qual mantendo seu campo de atuação e compartilhando apenas o necessário.',
        sourceIds: ['nob-suas-2012','tipificacao-suas','prontuario-suas']
      },
      {
        id: 'op-conflito-crise',
        title: '8. Mediação de conflitos e situações de crise',
        topics: ['Mediação de conflitos','Conduta em situações de crise'],
        summary: 'Em conflitos, a prioridade inicial é reduzir escalada, preservar segurança e manter comunicação respeitosa. O operador social não deve prometer solução que não controla nem assumir atribuições de emergência de outros órgãos. Situações de crise exigem leitura de risco, acionamento do fluxo institucional adequado e registro do ocorrido.',
        keyPoints: [
          'Falar com clareza e sem confronto desnecessário ajuda a reduzir escalada.',
          'Separar pessoas ou interromper atendimento pode ser necessário quando houver risco concreto, conforme protocolo da unidade.',
          'A equipe deve reconhecer limites de competência e acionar saúde, segurança ou outros serviços quando a situação exigir.',
          'Após o evento, registro objetivo e comunicação interna apoiam continuidade, proteção e prevenção.'
        ],
        examFocus: 'Alternativas que estimulam confronto, ameaça, exposição do usuário ou atuação fora da competência tendem a ser inadequadas.',
        example: 'Diante de pessoa muito agitada e ameaça concreta, a equipe preserva distância segura, reduz estímulos e aciona o protocolo e apoio apropriado, em vez de insistir em entrevista normal.',
        sourceIds: ['publicacoes-suas','nob-suas-2012']
      },
      {
        id: 'op-seguranca',
        title: '9. Segurança do trabalhador em atendimentos, visitas e abordagens',
        topics: ['Segurança do trabalhador em atendimentos, visitas e abordagens'],
        summary: 'A proteção do trabalhador e do usuário faz parte da qualidade do atendimento. Atividades externas devem considerar planejamento, comunicação com a equipe, conhecimento do território, finalidade da ação e protocolos locais. Segurança não significa tratar usuários como ameaça; significa reduzir riscos previsíveis e evitar improvisações.',
        keyPoints: [
          'Antes da saída, conheça objetivo, local, equipe responsável e forma de contato institucional.',
          'Evite isolamento desnecessário em contexto identificado como de risco e siga regras de trabalho em dupla quando existentes.',
          'Não exponha documentos, senhas ou dados pessoais durante abordagens e deslocamentos.',
          'Em risco iminente, priorize integridade física e acione o fluxo institucional adequado.'
        ],
        examFocus: 'A resposta correta deve equilibrar vínculo e proteção. Nem negligência do risco nem abordagem agressiva são boas práticas.',
        example: 'Em visita com histórico recente de ameaça, a equipe reavalia condições, organiza apoio conforme protocolo e não insiste em realizar a atividade de modo inseguro apenas para cumprir agenda.',
        sourceIds: ['nob-suas-2012','publicacoes-suas','lgpd']
      }
    ]
  },
  "fiscal-direito": {
    "intro": "Trilha orientada aos 20% da prova destinados a Direito Constitucional, Direito Administrativo, poder de polícia e processo administrativo. A sequência conecta a Constituição à atuação concreta do fiscal e separa fundamentos gerais de regras procedimentais.",
    "modules": [
      {
        "id": "fd-const-municipio",
        "title": "1. Constituição, Administração Pública e competências municipais",
        "topics": [
          "Constituição Federal",
          "Administração Pública e princípios",
          "Competências municipais"
        ],
        "summary": "A Constituição é a base da atuação administrativa. Para a prova, concentre a leitura nos princípios do art. 37 e nas competências municipais do art. 30. O Município pode legislar sobre interesse local, suplementar a legislação federal e estadual quando couber, prestar serviços públicos de interesse local e promover o ordenamento territorial. A Administração não atua por vontade própria: competência, finalidade pública e princípios constitucionais delimitam cada decisão.",
        "keyPoints": [
          "Memorize LIMPE: legalidade, impessoalidade, moralidade, publicidade e eficiência.",
          "No art. 30, diferencie competência para legislar sobre interesse local da competência para suplementar normas federais e estaduais.",
          "Ordenamento territorial e controle do uso, parcelamento e ocupação do solo têm conexão direta com fiscalização municipal.",
          "Legalidade administrativa é mais restritiva que a liberdade do particular: o agente deve agir dentro da competência e da finalidade atribuídas."
        ],
        "examFocus": "Questões costumam misturar competência municipal com competência privativa da União. Procure o interesse local e o adequado ordenamento territorial antes de marcar a alternativa.",
        "example": "Ao fiscalizar ocupação irregular do espaço urbano, o Município atua em matéria conectada ao interesse local e ao ordenamento territorial, mas a medida concreta ainda precisa de base na legislação municipal aplicável.",
        "sourceIds": [
          "constituicao-federal",
          "lei-organica-santos"
        ]
      },
      {
        "id": "fd-organizacao-agentes",
        "title": "2. Organização administrativa, agentes e servidores públicos",
        "topics": [
          "Servidores públicos",
          "Organização administrativa",
          "Agentes públicos"
        ],
        "summary": "Organização administrativa é a forma pela qual o Estado distribui competências entre órgãos e entidades. Administração direta é integrada pelos próprios entes políticos e seus órgãos; a indireta é composta por entidades com personalidade jurídica própria, criadas ou autorizadas por lei conforme o regime aplicável. Agente público é categoria ampla. Servidor público é uma das espécies e, no Município de Santos, o estatuto local deve ser estudado quando o edital cobrar seu regime específico.",
        "keyPoints": [
          "Órgão não possui personalidade jurídica própria; entidade administrativa possui.",
          "Desconcentração distribui competências dentro da mesma pessoa jurídica; descentralização transfere execução/atribuições para outra pessoa.",
          "Agente público é expressão mais ampla que servidor público.",
          "Para Santos, combine os arts. 37 a 41 da Constituição com a Lei municipal 4.623/1984 e a estrutura administrativa da LC 1.253/2024."
        ],
        "examFocus": "A banca pode trocar desconcentração por descentralização ou tratar órgão e entidade como sinônimos. São distinções clássicas de prova.",
        "example": "Uma secretaria municipal é órgão da Administração direta; uma entidade da Administração indireta tem personalidade jurídica própria. O fiscal, como agente público, exerce competência atribuída pelo ordenamento e pelo órgão em que atua.",
        "sourceIds": [
          "constituicao-federal",
          "estatuto-servidores-santos",
          "lc-1253-2024",
          "evg-estruturas-gestao-publica"
        ]
      },
      {
        "id": "fd-servicos-responsabilidade",
        "title": "3. Serviços públicos e responsabilidade civil do Estado",
        "topics": [
          "Serviços públicos",
          "Responsabilidade civil do Estado"
        ],
        "summary": "A Constituição atribui ao Poder Público a prestação de serviços públicos diretamente ou, nos casos previstos, por concessão ou permissão. O art. 37, § 6º estabelece responsabilidade das pessoas jurídicas de direito público e das pessoas jurídicas de direito privado prestadoras de serviços públicos pelos danos causados por seus agentes a terceiros, assegurado direito de regresso contra o responsável nos casos de dolo ou culpa.",
        "keyPoints": [
          "Serviço público não se confunde com qualquer atividade estatal.",
          "O art. 175 admite prestação direta e delegada por concessão ou permissão, nos termos da lei.",
          "Na responsabilidade do art. 37, § 6º, a vítima demanda a pessoa jurídica; o direito de regresso contra o agente depende de dolo ou culpa.",
          "Competência municipal para serviços de interesse local aparece no art. 30, V."
        ],
        "examFocus": "Diferencie responsabilidade da pessoa jurídica perante o terceiro e responsabilidade pessoal do agente na ação regressiva.",
        "example": "Se agente público, nessa qualidade, causa dano a terceiro durante atuação funcional, a análise constitucional começa pela responsabilidade da pessoa jurídica e, em outro plano, pelo eventual regresso contra o agente.",
        "sourceIds": [
          "constituicao-federal"
        ]
      },
      {
        "id": "fd-atos",
        "title": "4. Atos administrativos: elementos, atributos, validade e controle",
        "topics": [
          "Atos administrativos: elementos, atributos, validade e controle"
        ],
        "summary": "O ato administrativo deve ser analisado pela competência do agente, finalidade pública, forma exigida, motivo e objeto. Atributos como presunção de legitimidade/veracidade, imperatividade e autoexecutoriedade aparecem com frequência em provas, mas não se apresentam do mesmo modo em todo e qualquer ato. Validade depende da conformidade com o ordenamento; o controle pode ocorrer pela própria Administração e, quanto à legalidade, pelo Judiciário dentro de suas competências.",
        "keyPoints": [
          "Elementos clássicos: competência, finalidade, forma, motivo e objeto.",
          "Presunção de legitimidade é relativa e admite prova em contrário.",
          "Imperatividade não está presente em todo ato administrativo.",
          "Autoexecutoriedade depende de previsão legal ou situação que autorize execução direta; não significa ausência de controle."
        ],
        "examFocus": "Desconfie de alternativas com palavras absolutas como 'sempre' ao tratar de imperatividade e autoexecutoriedade.",
        "example": "Um auto de infração presume-se legítimo, mas pode ser impugnado. A presunção não elimina defesa, recurso ou controle de legalidade.",
        "sourceIds": [
          "direito-administrativo-educapes",
          "constituicao-federal"
        ]
      },
      {
        "id": "fd-poderes",
        "title": "5. Poderes administrativos e poder de polícia",
        "topics": [
          "Poderes administrativos",
          "Poder de polícia: atributos, limites e sanções"
        ],
        "summary": "Poderes administrativos são instrumentos para cumprimento das competências públicas. No poder de polícia, a Administração condiciona ou restringe direitos, interesses e atividades em razão do interesse público. O art. 78 do CTN oferece conceito legal importante e exige, para o exercício regular, atuação por órgão competente, dentro dos limites da lei e sem abuso ou desvio de poder.",
        "keyPoints": [
          "Poder não é privilégio pessoal do agente; é função vinculada à finalidade pública.",
          "Poder de polícia incide sobre bens, direitos e atividades.",
          "Discricionariedade não equivale a arbitrariedade.",
          "Sanção administrativa exige base normativa, competência e respeito ao processo aplicável."
        ],
        "examFocus": "A banca pode chamar abuso de poder de exercício discricionário. Verifique finalidade, competência, proporcionalidade e base legal.",
        "example": "Fiscal pode exigir adequação prevista no Código de Posturas, mas não criar condição ou penalidade que a legislação não autorizou.",
        "sourceIds": [
          "ctn-poder-policia",
          "direito-administrativo-educapes",
          "codigo-posturas-santos"
        ]
      },
      {
        "id": "fd-garantias-processuais",
        "title": "6. Devido processo legal, contraditório e ampla defesa",
        "topics": [
          "Devido processo legal",
          "Contraditório e ampla defesa"
        ],
        "summary": "A Constituição assegura devido processo legal e, aos litigantes em processo judicial ou administrativo e aos acusados em geral, contraditório e ampla defesa. No processo sancionador, essas garantias exigem ciência adequada, oportunidade de manifestação e consideração efetiva das alegações e provas antes da decisão, conforme o procedimento aplicável.",
        "keyPoints": [
          "Devido processo legal está no art. 5º, LIV; contraditório e ampla defesa, no art. 5º, LV.",
          "Contraditório não é apenas ser informado: inclui possibilidade real de participação e influência no processo.",
          "Ampla defesa abrange meios e recursos admitidos pelo ordenamento.",
          "A existência de fé pública do fiscal não elimina as garantias do administrado."
        ],
        "examFocus": "Se a alternativa disser que a presunção do ato administrativo torna desnecessária a defesa, ela conflita com as garantias constitucionais.",
        "example": "Após autuação que pode resultar em sanção, o interessado deve receber ciência e oportunidade de apresentar defesa no prazo e forma previstos na norma aplicável.",
        "sourceIds": [
          "constituicao-federal",
          "lei-9784-processo-administrativo"
        ]
      },
      {
        "id": "fd-instrucao-comunicacao",
        "title": "7. Autuação, instrução, notificações, intimações e registro",
        "topics": [
          "Autuação e instrução",
          "Notificações e intimações",
          "Registro e comunicação dos atos"
        ],
        "summary": "Autuação abre ou formaliza a tramitação do expediente; instrução reúne elementos necessários à decisão. Comunicação processual precisa permitir ciência do interessado. Registro adequado identifica fatos, documentos, diligências e providências, formando uma sequência verificável. A Lei 9.784/1999 é útil como referência federal de princípios e técnica processual, mas os prazos e formas do processo municipal devem ser conferidos na legislação de Santos.",
        "keyPoints": [
          "Instrução deve buscar elementos relevantes para uma decisão fundamentada.",
          "Intimação deve tornar a finalidade da comunicação compreensível ao destinatário.",
          "Registro deve distinguir fato constatado, informação de terceiro e conclusão jurídica.",
          "Não transporte automaticamente prazos da Lei 9.784 para o Município de Santos."
        ],
        "examFocus": "A armadilha é memorizar prazo federal como se fosse municipal. Use a Lei 9.784 para estrutura e princípios, e a legislação local para regras específicas.",
        "example": "A equipe junta auto, fotos, relatório e demais documentos; comunica o interessado conforme a regra local e registra cada ato para permitir reconstrução do procedimento.",
        "sourceIds": [
          "lei-9784-processo-administrativo",
          "codigo-posturas-santos"
        ]
      },
      {
        "id": "fd-decisao-recursos",
        "title": "8. Decisão, recursos, nulidades e motivação",
        "topics": [
          "Decisões e recursos",
          "Nulidades",
          "Motivação"
        ],
        "summary": "A decisão administrativa precisa ser proferida por autoridade competente e enfrentar os elementos relevantes do processo. Motivação explicita os pressupostos de fato e de direito que sustentam o resultado. Recursos permitem reexame nos limites previstos. Nulidades não devem ser tratadas de modo automático: é preciso identificar vício, consequência jurídica e possibilidade de saneamento/convalidação conforme o regime aplicável.",
        "keyPoints": [
          "Motivação liga fatos, norma e conclusão.",
          "Recurso administrativo existe nos termos e limites da legislação aplicável.",
          "Nem todo defeito formal produz automaticamente a mesma consequência.",
          "Competência e finalidade são pontos sensíveis na análise de validade do ato."
        ],
        "examFocus": "Prefira alternativas que exigem fundamentação e análise concreta do vício; evite respostas que presumem nulidade absoluta para qualquer irregularidade formal.",
        "example": "Decisão que apenas afirma 'mantida a multa' sem enfrentar defesa e fatos relevantes é mais vulnerável do que decisão que explicita os elementos que sustentam o julgamento.",
        "sourceIds": [
          "lei-9784-processo-administrativo",
          "constituicao-federal",
          "direito-administrativo-educapes"
        ]
      },
      {
        "id": "fd-sancionador",
        "title": "9. Processo sancionador, auto de infração, defesa, julgamento e sanções",
        "topics": [
          "Processo sancionador",
          "Auto de infração",
          "Defesa e julgamento",
          "Sanções"
        ],
        "summary": "O processo sancionador transforma a constatação de possível infração em decisão administrativa controlável. O auto de infração deve individualizar adequadamente a ocorrência e o enquadramento. Defesa e julgamento preservam contraditório, ampla defesa e motivação. A sanção final precisa corresponder à hipótese normativa e ser aplicada por autoridade competente, observando limites e procedimento.",
        "keyPoints": [
          "Auto de infração não é sinônimo de decisão final.",
          "A constatação deve ser documentada de modo objetivo e vinculada à norma indicada.",
          "Julgamento deve considerar a defesa e os elementos da instrução.",
          "Sanção sem previsão legal ou aplicada por agente incompetente é incompatível com a legalidade administrativa."
        ],
        "examFocus": "Em casos práticos, separe as fases: fiscalização/constatação → autuação → defesa/instrução → julgamento → recurso, quando cabível → execução da sanção.",
        "example": "O fiscal lavra o auto; o interessado apresenta defesa; a autoridade competente analisa a instrução e decide. O mesmo agente não deve ser presumido como competente para todas as etapas sem base normativa.",
        "sourceIds": [
          "codigo-posturas-santos",
          "constituicao-federal",
          "lei-9784-processo-administrativo"
        ]
      }
    ]
  },
  "fiscal-legislacao": {
    "intro": "Trilha de lei seca para os 20% da prova destinados à legislação municipal aplicada à fiscalização. Aqui a prioridade é saber o objeto de cada norma, identificar onde cada tema aparece e evitar estudar o Código de Posturas sem as alterações posteriores.",
    "modules": [
      {
        "id": "fl-organica",
        "title": "1. Lei Orgânica do Município de Santos",
        "topics": [
          "Lei Orgânica do Município de Santos"
        ],
        "summary": "A Lei Orgânica funciona como a carta básica do Município. Para a preparação, relacione suas regras à autonomia municipal, competências locais, estrutura dos Poderes, Administração Pública e prestação de serviços. Leia em conjunto com os arts. 29 e 30 da Constituição para perceber o que é fundamento constitucional e o que é organização específica de Santos.",
        "keyPoints": [
          "Autonomia municipal não significa soberania.",
          "Competências locais devem ser lidas em harmonia com a Constituição.",
          "A Lei Orgânica é fonte para organização municipal e competências dos órgãos locais.",
          "Use a versão oficial disponibilizada pelo sistema de legislação de Santos."
        ],
        "examFocus": "A banca pode cobrar quem é competente para determinada matéria municipal. Evite responder por analogia sem conferir a Lei Orgânica.",
        "example": "Uma questão sobre organização local deve ser resolvida primeiro pela Constituição e depois pela distribuição específica de competências da Lei Orgânica.",
        "sourceIds": [
          "lei-organica-santos",
          "constituicao-federal"
        ]
      },
      {
        "id": "fl-servidores-estrutura",
        "title": "2. Estatuto dos servidores e organização administrativa",
        "topics": [
          "Lei Municipal nº 4.623/1984",
          "Lei Complementar Municipal nº 1.253/2024"
        ],
        "summary": "A Lei 4.623/1984 disciplina o Estatuto dos Funcionários Públicos Municipais de Santos. A LC 1.253/2024 trata da organização da Administração Pública direta e indireta. Para prova, não misture regime funcional com estrutura administrativa: uma norma organiza vínculos, deveres e regras dos funcionários; a outra organiza órgãos e entidades municipais.",
        "keyPoints": [
          "Identifique deveres, proibições, responsabilidades e regras funcionais no Estatuto.",
          "Na LC 1.253/2024, concentre-se na estrutura da Administração direta e indireta e nas competências organizacionais relevantes.",
          "Servidor/agente é pessoa; órgão/entidade é estrutura administrativa.",
          "Princípios do art. 37 da Constituição atravessam as duas normas."
        ],
        "examFocus": "Questões de correspondência podem trocar matéria estatutária por matéria organizacional. Saiba qual norma consultar.",
        "example": "Uma dúvida sobre dever funcional do servidor aponta para o Estatuto; uma dúvida sobre qual secretaria/entidade integra a estrutura municipal aponta para a LC 1.253/2024.",
        "sourceIds": [
          "estatuto-servidores-santos",
          "lc-1253-2024",
          "constituicao-federal"
        ]
      },
      {
        "id": "fl-posturas",
        "title": "3. Código de Posturas — núcleo da fiscalização",
        "topics": [
          "Lei nº 3.531/1968 — Código de Posturas"
        ],
        "summary": "O Código de Posturas é a norma municipal central para o cargo. Ele disciplina posturas relacionadas à higiene, bem-estar, atividades, espaços urbanos, funcionamento e medidas de fiscalização. Estude a redação oficial e as leis posteriores que alteraram dispositivos específicos; não trate o texto de 1968 como estático.",
        "keyPoints": [
          "Associe cada capítulo/tema às situações práticas de fiscalização.",
          "Marque no estudo artigos que tratam de medidas, infrações, sanções, procedimentos e competências.",
          "Acompanhe alterações posteriores listadas na biblioteca do sistema.",
          "Quando houver conflito entre resumo e lei seca, prevalece a norma vigente."
        ],
        "examFocus": "Como o Código também aparece em Conhecimentos Específicos, ele tem dupla importância: legislação municipal e aplicação prática.",
        "example": "Ao revisar sossego público, consulte o dispositivo atual do Código e as alterações de 2025 já vinculadas no sistema.",
        "sourceIds": [
          "codigo-posturas-santos",
          "lc-1289-2025-posturas",
          "lc-1294-2025-posturas",
          "lc-1304-2025-posturas",
          "lc-1310-2025-posturas"
        ]
      },
      {
        "id": "fl-edificacoes",
        "title": "4. Código de Edificações",
        "topics": [
          "Lei Complementar Municipal nº 1.025/2019 — Código de Edificações"
        ],
        "summary": "O Código de Edificações disciplina regras municipais relativas às edificações e procedimentos correlatos. Para Fiscal de Posturas, o foco deve permanecer no conteúdo que dialoga com fiscalização, licenciamento, conformidade de obras/edificações e medidas previstas na norma, sem expandir o estudo para conteúdos técnicos não exigidos pelo edital.",
        "keyPoints": [
          "Diferencie Código de Edificações de Código de Posturas.",
          "Observe conceitos, procedimentos, licenças e medidas fiscalizatórias que a norma expressamente trouxer.",
          "Use o texto oficial do Município.",
          "Não extrapole para normas técnicas externas se não estiverem no conteúdo programático."
        ],
        "examFocus": "A banca pode apresentar situação de imóvel/obra e testar qual diploma municipal é o ponto de partida.",
        "example": "Irregularidade de funcionamento de atividade e irregularidade construtiva podem exigir diplomas diferentes; identifique primeiro a natureza do fato.",
        "sourceIds": [
          "codigo-edificacoes-santos"
        ]
      },
      {
        "id": "fl-urbanismo",
        "title": "5. Plano Diretor e LUOS",
        "topics": [
          "Lei Complementar Municipal nº 1.181/2022 — Plano Diretor",
          "Lei Complementar Municipal nº 1.187/2022 — LUOS"
        ],
        "summary": "Plano Diretor e LUOS são normas urbanísticas complementares em finalidade, mas não idênticas. O Plano Diretor estabelece diretrizes gerais de desenvolvimento e expansão urbana; a LUOS disciplina concretamente o uso e a ocupação do solo na área insular. Para prova, associe planejamento/diretrizes ao Plano Diretor e parâmetros de uso/ocupação à LUOS, sempre confirmando a redação oficial.",
        "keyPoints": [
          "Plano Diretor: visão estratégica e diretrizes do desenvolvimento urbano.",
          "LUOS: disciplina do uso e ocupação do solo na área insular.",
          "A competência municipal para ordenamento territorial tem base no art. 30, VIII, da Constituição.",
          "Não trate os dois diplomas como sinônimos."
        ],
        "examFocus": "Questões podem inverter a função do Plano Diretor e da LUOS. Memorize o objeto de cada lei antes de aprofundar artigos.",
        "example": "Ao analisar se determinada atividade é compatível com uso do solo, a LUOS tende a ser a fonte específica; o Plano Diretor fornece o quadro geral de planejamento urbano.",
        "sourceIds": [
          "plano-diretor-santos",
          "luos-santos",
          "constituicao-federal"
        ]
      },
      {
        "id": "fl-usuario-info-dados",
        "title": "6. Usuário de serviço público, LAI e LGPD",
        "topics": [
          "Lei Federal nº 13.460/2017",
          "Lei Federal nº 12.527/2011 — LAI",
          "Lei Federal nº 13.709/2018 — LGPD"
        ],
        "summary": "As três leis tratam de relações distintas que se cruzam no atendimento e na gestão documental: direitos do usuário de serviços públicos, transparência/acesso à informação e proteção de dados pessoais. O fiscal deve saber que publicidade e transparência não autorizam exposição indiscriminada de dados pessoais, e que atendimento ao usuário exige respeito, informação adequada e canais institucionais.",
        "keyPoints": [
          "Lei 13.460: participação, proteção e defesa do usuário de serviços públicos.",
          "LAI: publicidade como regra, sigilo como exceção nos termos legais.",
          "LGPD: tratamento de dados deve observar finalidade, necessidade e demais princípios aplicáveis.",
          "Transparência pública e proteção de dados devem ser compatibilizadas, não tratadas como opostos absolutos."
        ],
        "examFocus": "Armadilha frequente: afirmar que toda informação em poder do Estado é pública sem restrição ou, ao contrário, que dados pessoais tornam qualquer documento sigiloso.",
        "example": "Ao responder pedido de informação que contém dados pessoais de terceiros, o órgão deve aplicar simultaneamente regras de acesso à informação e proteção de dados, fornecendo o que for juridicamente acessível sem exposição indevida.",
        "sourceIds": [
          "lei-13460",
          "lai",
          "lgpd"
        ]
      }
    ]
  },
  "operador-politicas": {
    "intro": "Trilha para os 24% da prova destinados à política de assistência social, SUAS, ECA e atendimento socioassistencial. A ordem vai dos fundamentos constitucionais e da LOAS à rede de serviços, instrumentos de atendimento e proteção de públicos específicos.",
    "modules": [
      {
        "id": "op-pol-cf-loas",
        "title": "1. Constituição e LOAS: assistência social como direito",
        "topics": [
          "Constituição Federal e assistência social",
          "Lei nº 8.742/1993 — LOAS",
          "Princípios e diretrizes da LOAS"
        ],
        "summary": "A Constituição integra a assistência social à Seguridade Social e determina que ela seja prestada a quem dela necessitar, independentemente de contribuição. A LOAS organiza essa política como direito do cidadão e dever do Estado. Para prova, conecte os objetivos constitucionais dos arts. 203 e 204 aos princípios e diretrizes legais, especialmente descentralização, participação e proteção social não contributiva.",
        "keyPoints": [
          "Assistência social não exige contribuição prévia do usuário.",
          "Direito socioassistencial não se confunde com favor, caridade ou benefício discricionário.",
          "A Constituição prevê descentralização político-administrativa e participação da população na formulação e controle das ações.",
          "A LOAS detalha objetivos, organização, gestão, benefícios, serviços e competências."
        ],
        "examFocus": "Se a alternativa condicionar acesso à assistência social a contribuição previdenciária, está confundindo assistência com previdência.",
        "example": "Família em vulnerabilidade pode acessar serviços socioassistenciais independentemente de ter contribuído para a seguridade social.",
        "sourceIds": [
          "constituicao-federal",
          "loas",
          "pnas-2004"
        ]
      },
      {
        "id": "op-pol-gestao-suas",
        "title": "2. Organização, gestão, SUAS, PNAS e NOB/SUAS",
        "topics": [
          "Organização e gestão",
          "SUAS",
          "PNAS",
          "NOB/SUAS"
        ],
        "summary": "O SUAS organiza nacionalmente a gestão e a oferta da assistência social. A PNAS estabelece referências político-técnicas e a NOB/SUAS detalha responsabilidades, gestão, planejamento, financiamento e pactuação. A lógica é descentralizada, participativa e articulada entre entes federativos, com responsabilidades próprias e cooperação.",
        "keyPoints": [
          "SUAS é sistema público de organização da assistência social, não um serviço isolado.",
          "PNAS orienta a política; NOB/SUAS operacionaliza aspectos de gestão do sistema.",
          "Municípios executam grande parte dos serviços no território, dentro das responsabilidades pactuadas.",
          "Gestão e oferta de serviço são dimensões relacionadas, mas diferentes."
        ],
        "examFocus": "A banca pode apresentar CRAS ou CREAS como se fossem o próprio SUAS. Eles são unidades dentro da rede organizada pelo sistema.",
        "example": "Planejamento municipal deve articular diagnóstico territorial, serviços existentes, cofinanciamento, pactuação e controle social — não apenas abrir unidades físicas.",
        "sourceIds": [
          "loas",
          "pnas-2004",
          "nob-suas-2012",
          "politica-assistencia-santos"
        ]
      },
      {
        "id": "op-pol-protecao-beneficios",
        "title": "3. Proteção básica e especial, serviços, BPC e benefícios eventuais",
        "topics": [
          "Proteção social básica e especial",
          "Serviços e benefícios",
          "BPC",
          "Benefícios eventuais"
        ],
        "summary": "A proteção social básica atua preventivamente diante de vulnerabilidades e busca fortalecer vínculos; a proteção especial atende situações de risco pessoal/social e violação de direitos, organizada por níveis de complexidade. Serviços socioassistenciais e benefícios não são a mesma coisa. O BPC é benefício assistencial previsto na LOAS; benefícios eventuais respondem a contingências específicas nos termos legais e regulamentares.",
        "keyPoints": [
          "Básica: prevenção de riscos e fortalecimento de vínculos; especial: situações de risco/violação de direitos.",
          "BPC não exige contribuição previdenciária.",
          "Benefício não substitui automaticamente acompanhamento por serviço quando este é necessário.",
          "Tipificação é referência central para identificar os serviços socioassistenciais."
        ],
        "examFocus": "Diferencie benefício monetário de serviço continuado e proteção básica de proteção especial.",
        "example": "Conceder benefício eventual pode responder a uma contingência, mas uma família com violações persistentes pode também demandar acompanhamento socioassistencial adequado.",
        "sourceIds": [
          "loas",
          "pnas-2004",
          "tipificacao-suas",
          "bpc-cartilha"
        ]
      },
      {
        "id": "op-pol-controle-vigilancia",
        "title": "4. Participação, controle social e vigilância socioassistencial",
        "topics": [
          "Participação e controle social",
          "Vigilância socioassistencial"
        ],
        "summary": "Controle social envolve participação da sociedade na formulação, acompanhamento e fiscalização da política, especialmente por conselhos e conferências. Vigilância socioassistencial produz e analisa informações sobre vulnerabilidades, riscos, violações e oferta de serviços para apoiar planejamento, monitoramento e organização territorial. Ela não se reduz a fiscalização de usuários.",
        "keyPoints": [
          "Participação popular é diretriz constitucional da assistência social.",
          "Conselhos integram a estrutura de controle social da política.",
          "Vigilância trabalha com informação territorial e padrões de oferta/necessidade.",
          "Busca ativa e planejamento podem ser orientados por diagnósticos da vigilância."
        ],
        "examFocus": "Não confunda vigilância socioassistencial com vigilância policial ou controle comportamental das famílias.",
        "example": "Ao identificar aumento de desproteções em determinado território, a vigilância subsidia a gestão para ajustar cobertura e estratégias de busca ativa.",
        "sourceIds": [
          "nob-suas-2012",
          "vigilancia-socioassistencial",
          "pnas-2004"
        ]
      },
      {
        "id": "op-pol-tipificacao-unidades",
        "title": "5. Tipificação, CRAS, CREAS, Centro POP e acolhimento",
        "topics": [
          "Tipificação Nacional dos Serviços Socioassistenciais",
          "CRAS",
          "CREAS",
          "Centro POP",
          "Acolhimento"
        ],
        "summary": "A Tipificação organiza os serviços socioassistenciais por nível de proteção e define usuários, objetivos, provisões e unidades de referência. CRAS referencia a proteção social básica; CREAS é unidade de referência da proteção especial; Centro POP é unidade especializada para população em situação de rua. Serviços de acolhimento integram a proteção especial de alta complexidade em modalidades tipificadas.",
        "keyPoints": [
          "CRAS não é sinônimo de PAIF, embora o PAIF seja serviço obrigatório/ofertado no CRAS conforme a Tipificação.",
          "CREAS referencia serviços da proteção especial e oferta PAEFI.",
          "Centro POP é unidade especializada voltada à população em situação de rua.",
          "Acolhimento é serviço; não deve ser tratado como mera hospedagem ou como resposta automática para qualquer vulnerabilidade."
        ],
        "examFocus": "Questões frequentemente trocam unidade e serviço: CRAS/CREAS/Centro POP são unidades; PAIF/PAEFI/SCFV são serviços.",
        "example": "Pessoa em situação de rua pode acessar atendimento especializado no Centro POP, enquanto situação familiar de violação de direitos pode demandar acompanhamento pelo PAEFI no CREAS.",
        "sourceIds": [
          "tipificacao-suas",
          "pnas-2004",
          "caderno-assistencia-social"
        ]
      },
      {
        "id": "op-pol-servicos",
        "title": "6. PAIF, PAEFI e SCFV",
        "topics": [
          "PAIF",
          "PAEFI",
          "SCFV"
        ],
        "summary": "PAIF, PAEFI e SCFV têm finalidades diferentes. PAIF é trabalho social com famílias no âmbito da proteção básica; PAEFI oferece apoio, orientação e acompanhamento especializado a famílias e indivíduos em situação de ameaça ou violação de direitos; SCFV complementa o trabalho social por meio de atividades de convivência e fortalecimento de vínculos organizadas conforme ciclos de vida e contextos.",
        "keyPoints": [
          "PAIF: proteção básica e trabalho social com famílias.",
          "PAEFI: proteção especial de média complexidade diante de ameaça/violação de direitos.",
          "SCFV: serviço complementar voltado à convivência e fortalecimento de vínculos.",
          "Encaminhar para serviço inadequado ao nível de proteção é erro clássico em questões situacionais."
        ],
        "examFocus": "Memorize a correspondência serviço ↔ proteção ↔ unidade de referência.",
        "example": "Vulnerabilidade sem violação de direitos pode ser acompanhada no PAIF; violação já instalada pode exigir PAEFI, sem excluir articulação com outras políticas.",
        "sourceIds": [
          "tipificacao-suas",
          "pnas-2004",
          "caderno-assistencia-social"
        ]
      },
      {
        "id": "op-pol-atendimento",
        "title": "7. Abordagem, busca ativa, acolhida, escuta e encaminhamento",
        "topics": [
          "Abordagem social",
          "Busca ativa",
          "Acolhida",
          "Escuta qualificada",
          "Orientação e encaminhamento"
        ],
        "summary": "Essas ações aparecem no cotidiano dos serviços, mas não são sinônimos. Busca ativa procura identificar e alcançar situações não acessadas espontaneamente; abordagem social realiza contato planejado em territórios e situações específicas; acolhida cria condições iniciais de recepção e compreensão da demanda; escuta qualificada busca compreender a situação com respeito e técnica; orientação e encaminhamento conectam necessidades a direitos e serviços.",
        "keyPoints": [
          "Acolhida não é triagem burocrática nem promessa de concessão imediata.",
          "Escuta qualificada evita julgamento moral e coleta excessiva de informações sem finalidade.",
          "Encaminhamento deve indicar destino e razão, e pode exigir acompanhamento posterior.",
          "Busca ativa é estratégica e territorial; não é invasão de privacidade."
        ],
        "examFocus": "Em situações práticas, a melhor alternativa costuma preservar vínculo, autonomia, clareza, registro e articulação, evitando respostas automáticas ou coercitivas.",
        "example": "Ao encontrar pessoa em situação de rua, a equipe de abordagem se apresenta, explica o serviço, escuta a demanda e propõe encaminhamentos possíveis sem impor atendimento à força.",
        "sourceIds": [
          "tipificacao-suas",
          "prontuario-suas",
          "publicacoes-suas"
        ]
      },
      {
        "id": "op-pol-registros",
        "title": "8. Registro de atendimentos e Prontuário SUAS",
        "topics": [
          "Registro de atendimentos",
          "Prontuário SUAS"
        ],
        "summary": "Registros dão continuidade ao trabalho e sustentam acompanhamento, planejamento e avaliação. O Prontuário SUAS é instrumento técnico para organizar informações pertinentes ao trabalho social, especialmente em CRAS e CREAS. O registro deve ser objetivo, necessário, respeitoso e relacionado à finalidade do atendimento, evitando juízos morais e exposição desnecessária.",
        "keyPoints": [
          "Registre fatos, demandas, providências, encaminhamentos e evolução relevantes.",
          "Prontuário não é relatório para circulação indiscriminada.",
          "Informações sensíveis exigem cuidado de acesso e compartilhamento.",
          "O registro deve permitir continuidade do atendimento sem transformar o usuário em objeto de julgamento."
        ],
        "examFocus": "Alternativas que defendam ausência de registro para 'preservar sigilo' ou registro indiscriminado de detalhes íntimos são inadequadas.",
        "example": "Após atendimento, a equipe registra a demanda, orientações e providências necessárias, sem inserir comentários pessoais sobre caráter ou comportamento do usuário.",
        "sourceIds": [
          "prontuario-suas",
          "lgpd",
          "nob-suas-2012"
        ]
      },
      {
        "id": "op-pol-eca",
        "title": "9. ECA, proteção integral e medidas de proteção",
        "topics": [
          "Lei nº 8.069/1990 — ECA",
          "Proteção integral",
          "Medidas de proteção"
        ],
        "summary": "O ECA adota a doutrina da proteção integral e reconhece crianças e adolescentes como sujeitos de direitos em condição peculiar de desenvolvimento. Medidas de proteção respondem às hipóteses legais de ameaça ou violação de direitos e devem observar necessidade, proporcionalidade, fortalecimento de vínculos e demais princípios previstos no Estatuto.",
        "keyPoints": [
          "Proteção integral rompe com visão meramente tutelar ou punitiva da infância.",
          "Criança e adolescente têm direitos fundamentais e participação compatível com desenvolvimento.",
          "Medida de proteção não se confunde com medida socioeducativa.",
          "Atendimento deve evitar revitimização e exposição desnecessária."
        ],
        "examFocus": "A banca costuma misturar medida de proteção aplicada a criança/adolescente em situação de ameaça com medida socioeducativa aplicada ao adolescente autor de ato infracional.",
        "example": "Criança vítima de negligência demanda proteção e acionamento dos fluxos adequados; não se fala em medida socioeducativa para ela.",
        "sourceIds": [
          "eca",
          "lei-13431"
        ]
      },
      {
        "id": "op-pol-mse-violencia",
        "title": "10. Medidas socioeducativas em meio aberto e comunicação de violações",
        "topics": [
          "Medidas socioeducativas em meio aberto",
          "Comunicação de suspeita ou violação de direitos",
          "Lei nº 13.431/2017",
          "Lei nº 14.811/2024"
        ],
        "summary": "No meio aberto, destaque Liberdade Assistida e Prestação de Serviços à Comunidade, articuladas ao SINASE e ao acompanhamento socioassistencial. Situações de suspeita ou violação de direitos de crianças e adolescentes exigem comunicação pelos fluxos legalmente previstos. A Lei 13.431/2017 estrutura o sistema de garantia de direitos de criança/adolescente vítima ou testemunha de violência e busca prevenir revitimização; a Lei 14.811/2024 acrescenta medidas de proteção e prevenção contra violência.",
        "keyPoints": [
          "PSC e LA são medidas socioeducativas em meio aberto.",
          "Medida socioeducativa não elimina os demais direitos do adolescente.",
          "Diante de suspeita/violação, o operador segue deveres legais e fluxos institucionais; não realiza investigação informal por conta própria.",
          "Escuta no atendimento não deve ser confundida com procedimentos especializados de produção de prova."
        ],
        "examFocus": "Questões podem sugerir repetição desnecessária do relato da vítima. A lógica protetiva busca reduzir revitimização e respeitar atribuições de cada serviço.",
        "example": "Ao receber relato de possível violência, o operador acolhe, registra o necessário e aciona o fluxo competente, evitando interrogatório repetitivo ou exposição do adolescente.",
        "sourceIds": [
          "eca",
          "sinase",
          "lei-13431",
          "lei-14811",
          "pia-mse"
        ]
      },
      {
        "id": "op-pol-pcd-municipal",
        "title": "11. Pessoa com deficiência e Política Municipal de Assistência Social",
        "topics": [
          "Lei nº 13.146/2015 — Estatuto da Pessoa com Deficiência",
          "Lei Municipal nº 4.398/2023 — Política Municipal de Assistência Social"
        ],
        "summary": "A Lei Brasileira de Inclusão orienta o atendimento por direitos, acessibilidade, igualdade e participação da pessoa com deficiência. A Lei Municipal 4.398/2023 traz a organização da política de assistência social de Santos, permitindo relacionar o marco nacional do SUAS às responsabilidades e estrutura locais. Para prova, preserve autonomia e acessibilidade e conheça o objeto da norma municipal.",
        "keyPoints": [
          "Deficiência não implica incapacidade automática.",
          "Acessibilidade e eliminação de barreiras são dimensões essenciais do atendimento.",
          "A pessoa com deficiência deve participar das decisões que lhe dizem respeito.",
          "A lei municipal deve ser lida como marco local da política de assistência social, em consonância com LOAS e SUAS."
        ],
        "examFocus": "Evite alternativas paternalistas que substituem automaticamente a vontade da pessoa com deficiência ou ignoram recursos de acessibilidade.",
        "example": "Em atendimento, a equipe adapta comunicação e garante participação da própria pessoa, acionando apoio apenas na medida necessária.",
        "sourceIds": [
          "estatuto-pcd",
          "politica-assistencia-santos",
          "loas",
          "nob-suas-2012"
        ]
      }
    ]
  },

  "fiscal-portugues": {
    "intro": "Trilha de Língua Portuguesa voltada aos 10% da prova de Fiscal, com interpretação, reescrita, gramática contextual e linguagem institucional.",
    "modules": [
      {
        "id": "port-interpretacao",
        "title": "1. Interpretação, tema, finalidade e inferência",
        "topics": [
          "Leitura, compreensão e interpretação de textos",
          "Tema e finalidade",
          "Informações explícitas e implícitas",
          "Inferência",
          "Sentido de palavras e expressões no contexto"
        ],
        "summary": "Interpretação exige localizar o que o texto afirma, distinguir informação explícita de conclusão inferida e identificar tema e finalidade. O sentido de palavras e expressões deve ser resolvido pelo contexto.",
        "keyPoints": [
          "Tema é o assunto central; finalidade é o objetivo comunicativo.",
          "Explícito está formulado; implícito depende de inferência sustentada.",
          "Inferir não é imaginar: a conclusão precisa ser compatível com o texto.",
          "Palavras podem assumir sentido contextual diferente do sentido isolado."
        ],
        "examFocus": "Evite alternativas que extrapolam o texto, generalizam ou trocam a finalidade por opinião do leitor.",
        "example": "Se o texto diz que uma medida reduziu parcialmente um problema, não se pode concluir que o eliminou.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "port-coesao",
        "title": "2. Coesão, coerência e relações lógico-discursivas",
        "topics": [
          "Coesão e coerência",
          "Relações lógico-discursivas",
          "Conectivos"
        ],
        "summary": "Coesão conecta partes do texto; coerência organiza o sentido global. Conectivos indicam causa, consequência, oposição, condição, conclusão, explicação, finalidade e adição.",
        "keyPoints": [
          "Trocar conectivo pode alterar a relação lógica.",
          "Coesão referencial retoma termos por pronomes ou expressões equivalentes.",
          "Coerência exige progressão de ideias sem contradição.",
          "Interprete o valor do conector no contexto."
        ],
        "examFocus": "A substituição de conectivos só preserva sentido se a relação lógica permanecer a mesma.",
        "example": "'Embora estivesse chovendo, saiu' expressa concessão; 'portanto' não preserva essa relação.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "port-reescrita",
        "title": "3. Reescrita, clareza e linguagem institucional",
        "topics": [
          "Reescrita com manutenção de sentido",
          "Clareza e objetividade",
          "Linguagem administrativa e institucional"
        ],
        "summary": "Reescrever mantendo o sentido exige preservar relações lógicas, referências, tempos verbais e informação essencial. Em linguagem administrativa, clareza, objetividade, impessoalidade e precisão favorecem comunicação verificável.",
        "keyPoints": [
          "Mudança de voz ou ordem pode ser correta se não alterar o sentido.",
          "Evite ambiguidade, excesso de adjetivação e termos vagos.",
          "Clareza não é informalidade; é compreensão inequívoca.",
          "Compare perdas, acréscimos e inversões de relação lógica."
        ],
        "examFocus": "Uma reescrita pode estar gramaticalmente correta e ainda assim alterar o sentido.",
        "example": "'O fiscal notificou após a vistoria' não equivale a 'antes da vistoria, notificou'.",
        "sourceIds": [
          "manual-redacao-presidencia",
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "port-ortografia",
        "title": "4. Ortografia e acentuação",
        "topics": [
          "Ortografia",
          "Acentuação"
        ],
        "summary": "Ortografia trata da grafia oficial; acentuação depende da tonicidade, terminação e regras específicas. Use o VOLP como referência de grafia.",
        "keyPoints": [
          "Classifique a palavra pela tonicidade antes de aplicar a regra.",
          "Acento gráfico e sílaba tônica não são a mesma coisa.",
          "Atenção a hiatos e palavras afetadas pelo Acordo Ortográfico.",
          "Consulte o VOLP em dúvida de grafia."
        ],
        "examFocus": "Procure a regra que justifica o acento ou a grafia de cada alternativa.",
        "example": "Primeiro identifique se a palavra é oxítona, paroxítona ou proparoxítona; depois aplique a regra.",
        "sourceIds": [
          "volp-abl",
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "port-pontuacao",
        "title": "5. Pontuação e organização sintática",
        "topics": [
          "Pontuação"
        ],
        "summary": "Pontuação organiza unidades sintáticas e relações de sentido. Vírgula não deve separar arbitrariamente sujeito e verbo ou verbo e complemento.",
        "keyPoints": [
          "Não use 'pausa para respirar' como regra de vírgula.",
          "Identifique sujeito, verbo e termos deslocados.",
          "Pontuação pode mudar sentido em estruturas explicativas e restritivas.",
          "Dois-pontos e ponto e vírgula também exprimem relações discursivas."
        ],
        "examFocus": "Questões de pontuação exigem análise sintática e semântica simultaneamente.",
        "example": "Uma oração entre vírgulas pode assumir valor explicativo e mudar a interpretação do grupo referido.",
        "sourceIds": [
          "evg-portugues-interpretacao",
          "manual-redacao-presidencia"
        ]
      },
      {
        "id": "port-classes",
        "title": "6. Classes de palavras, pronomes e verbos",
        "topics": [
          "Classes de palavras em contexto",
          "Pronomes",
          "Tempos e modos verbais"
        ],
        "summary": "Classes de palavras devem ser reconhecidas pela função no contexto. Pronomes retomam ou determinam referentes; tempos e modos verbais situam ações e indicam certeza, hipótese ou condição.",
        "keyPoints": [
          "A mesma forma pode exercer funções diferentes conforme o contexto.",
          "Observe o referente dos pronomes para evitar ambiguidade.",
          "Indicativo costuma marcar fato; subjuntivo aparece em hipótese e possibilidade.",
          "Mudanças de tempo verbal podem alterar cronologia e sentido."
        ],
        "examFocus": "A banca tende a cobrar função contextual, não apenas classificação decorada.",
        "example": "Em 'o atendimento que ocorreu ontem', 'que' retoma 'atendimento'.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "port-sintaxe",
        "title": "7. Concordância, regência e crase",
        "topics": [
          "Concordância",
          "Regência",
          "Crase"
        ],
        "summary": "Concordância regula relações de número e pessoa; regência trata das preposições exigidas por verbos e nomes; crase ocorre, em regra, quando a preposição 'a' se combina com artigo ou demonstrativo iniciado por 'a'.",
        "keyPoints": [
          "Localize o núcleo do sujeito antes da concordância verbal.",
          "Regência parte do termo que exige complemento.",
          "Para testar crase, verifique preposição exigida e artigo possível.",
          "Nem toda palavra feminina admite crase."
        ],
        "examFocus": "Crase e regência costumam aparecer juntas; sem preposição exigida, não há fusão.",
        "example": "'Entregou à servidora' admite artigo; 'entregou a ela' não.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "port-colocacao",
        "title": "8. Colocação pronominal e norma-padrão",
        "topics": [
          "Colocação pronominal",
          "Norma-padrão"
        ],
        "summary": "Colocação pronominal trata da posição dos pronomes átonos em relação ao verbo. A norma-padrão considera fatores de atração e a estrutura completa da frase.",
        "keyPoints": [
          "Palavras negativas podem atrair o pronome para antes do verbo.",
          "Não aplique próclise e ênclise sem observar a frase inteira.",
          "Norma-padrão envolve morfossintaxe, ortografia e semântica.",
          "Em texto administrativo, prefira construção clara e sem ambiguidade."
        ],
        "examFocus": "Quando a questão pede norma-padrão, avalie a frase inteira, não só o pronome.",
        "example": "Em 'não se registrou a ocorrência', a palavra negativa favorece a próclise.",
        "sourceIds": [
          "evg-portugues-interpretacao",
          "manual-redacao-presidencia"
        ]
      }
    ]
  }
,

  "operador-portugues": {
    "intro": "Trilha de Língua Portuguesa voltada aos 10% da prova de Operador Social. O núcleo programático é o mesmo de Fiscal, com foco em interpretação, reescrita, norma-padrão e comunicação institucional.",
    "modules": [
      {
        "id": "op-port-interpretacao",
        "title": "1. Interpretação, tema, finalidade e inferência",
        "topics": [
          "Leitura, compreensão e interpretação de textos",
          "Tema e finalidade",
          "Informações explícitas e implícitas",
          "Inferência",
          "Sentido de palavras e expressões no contexto"
        ],
        "summary": "Interpretação exige localizar o que o texto afirma, distinguir informação explícita de conclusão inferida e identificar tema e finalidade. O sentido de palavras e expressões deve ser resolvido pelo contexto.",
        "keyPoints": [
          "Tema é o assunto central; finalidade é o objetivo comunicativo.",
          "Explícito está formulado; implícito depende de inferência sustentada.",
          "Inferir não é imaginar: a conclusão precisa ser compatível com o texto.",
          "Palavras podem assumir sentido contextual diferente do sentido isolado."
        ],
        "examFocus": "Evite alternativas que extrapolam o texto, generalizam ou trocam a finalidade por opinião do leitor.",
        "example": "Se o texto diz que uma medida reduziu parcialmente um problema, não se pode concluir que o eliminou.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "op-port-coesao",
        "title": "2. Coesão, coerência e relações lógico-discursivas",
        "topics": [
          "Coesão e coerência",
          "Relações lógico-discursivas",
          "Conectivos"
        ],
        "summary": "Coesão conecta partes do texto; coerência organiza o sentido global. Conectivos indicam causa, consequência, oposição, condição, conclusão, explicação, finalidade e adição.",
        "keyPoints": [
          "Trocar conectivo pode alterar a relação lógica.",
          "Coesão referencial retoma termos por pronomes ou expressões equivalentes.",
          "Coerência exige progressão de ideias sem contradição.",
          "Interprete o valor do conector no contexto."
        ],
        "examFocus": "A substituição de conectivos só preserva sentido se a relação lógica permanecer a mesma.",
        "example": "'Embora estivesse chovendo, saiu' expressa concessão; 'portanto' não preserva essa relação.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "op-port-reescrita",
        "title": "3. Reescrita, clareza e linguagem institucional",
        "topics": [
          "Reescrita com manutenção de sentido",
          "Clareza e objetividade",
          "Linguagem administrativa e institucional"
        ],
        "summary": "Reescrever mantendo o sentido exige preservar relações lógicas, referências, tempos verbais e informação essencial. Em linguagem administrativa, clareza, objetividade, impessoalidade e precisão favorecem comunicação verificável.",
        "keyPoints": [
          "Mudança de voz ou ordem pode ser correta se não alterar o sentido.",
          "Evite ambiguidade, excesso de adjetivação e termos vagos.",
          "Clareza não é informalidade; é compreensão inequívoca.",
          "Compare perdas, acréscimos e inversões de relação lógica."
        ],
        "examFocus": "Uma reescrita pode estar gramaticalmente correta e ainda assim alterar o sentido.",
        "example": "'O fiscal notificou após a vistoria' não equivale a 'antes da vistoria, notificou'.",
        "sourceIds": [
          "manual-redacao-presidencia",
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "op-port-ortografia",
        "title": "4. Ortografia e acentuação",
        "topics": [
          "Ortografia",
          "Acentuação"
        ],
        "summary": "Ortografia trata da grafia oficial; acentuação depende da tonicidade, terminação e regras específicas. Use o VOLP como referência de grafia.",
        "keyPoints": [
          "Classifique a palavra pela tonicidade antes de aplicar a regra.",
          "Acento gráfico e sílaba tônica não são a mesma coisa.",
          "Atenção a hiatos e palavras afetadas pelo Acordo Ortográfico.",
          "Consulte o VOLP em dúvida de grafia."
        ],
        "examFocus": "Procure a regra que justifica o acento ou a grafia de cada alternativa.",
        "example": "Primeiro identifique se a palavra é oxítona, paroxítona ou proparoxítona; depois aplique a regra.",
        "sourceIds": [
          "volp-abl",
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "op-port-pontuacao",
        "title": "5. Pontuação e organização sintática",
        "topics": [
          "Pontuação"
        ],
        "summary": "Pontuação organiza unidades sintáticas e relações de sentido. Vírgula não deve separar arbitrariamente sujeito e verbo ou verbo e complemento.",
        "keyPoints": [
          "Não use 'pausa para respirar' como regra de vírgula.",
          "Identifique sujeito, verbo e termos deslocados.",
          "Pontuação pode mudar sentido em estruturas explicativas e restritivas.",
          "Dois-pontos e ponto e vírgula também exprimem relações discursivas."
        ],
        "examFocus": "Questões de pontuação exigem análise sintática e semântica simultaneamente.",
        "example": "Uma oração entre vírgulas pode assumir valor explicativo e mudar a interpretação do grupo referido.",
        "sourceIds": [
          "evg-portugues-interpretacao",
          "manual-redacao-presidencia"
        ]
      },
      {
        "id": "op-port-classes",
        "title": "6. Classes de palavras, pronomes e verbos",
        "topics": [
          "Classes de palavras em contexto",
          "Pronomes",
          "Tempos e modos verbais"
        ],
        "summary": "Classes de palavras devem ser reconhecidas pela função no contexto. Pronomes retomam ou determinam referentes; tempos e modos verbais situam ações e indicam certeza, hipótese ou condição.",
        "keyPoints": [
          "A mesma forma pode exercer funções diferentes conforme o contexto.",
          "Observe o referente dos pronomes para evitar ambiguidade.",
          "Indicativo costuma marcar fato; subjuntivo aparece em hipótese e possibilidade.",
          "Mudanças de tempo verbal podem alterar cronologia e sentido."
        ],
        "examFocus": "A banca tende a cobrar função contextual, não apenas classificação decorada.",
        "example": "Em 'o atendimento que ocorreu ontem', 'que' retoma 'atendimento'.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "op-port-sintaxe",
        "title": "7. Concordância, regência e crase",
        "topics": [
          "Concordância",
          "Regência",
          "Crase"
        ],
        "summary": "Concordância regula relações de número e pessoa; regência trata das preposições exigidas por verbos e nomes; crase ocorre, em regra, quando a preposição 'a' se combina com artigo ou demonstrativo iniciado por 'a'.",
        "keyPoints": [
          "Localize o núcleo do sujeito antes da concordância verbal.",
          "Regência parte do termo que exige complemento.",
          "Para testar crase, verifique preposição exigida e artigo possível.",
          "Nem toda palavra feminina admite crase."
        ],
        "examFocus": "Crase e regência costumam aparecer juntas; sem preposição exigida, não há fusão.",
        "example": "'Entregou à servidora' admite artigo; 'entregou a ela' não.",
        "sourceIds": [
          "evg-portugues-interpretacao"
        ]
      },
      {
        "id": "op-port-colocacao",
        "title": "8. Colocação pronominal e norma-padrão",
        "topics": [
          "Colocação pronominal",
          "Norma-padrão"
        ],
        "summary": "Colocação pronominal trata da posição dos pronomes átonos em relação ao verbo. A norma-padrão considera fatores de atração e a estrutura completa da frase.",
        "keyPoints": [
          "Palavras negativas podem atrair o pronome para antes do verbo.",
          "Não aplique próclise e ênclise sem observar a frase inteira.",
          "Norma-padrão envolve morfossintaxe, ortografia e semântica.",
          "Em texto administrativo, prefira construção clara e sem ambiguidade."
        ],
        "examFocus": "Quando a questão pede norma-padrão, avalie a frase inteira, não só o pronome.",
        "example": "Em 'não se registrou a ocorrência', a palavra negativa favorece a próclise.",
        "sourceIds": [
          "evg-portugues-interpretacao",
          "manual-redacao-presidencia"
        ]
      }
    ]
  }
,

  "fiscal-logica": {
    "intro": "Trilha dos 5% da prova de Fiscal: lógica proposicional, cálculos, proporções, medidas, escalas e problemas aplicados.",
    "modules": [
      {
        "id": "fis-log-proposicoes",
        "title": "1. Proposições, conectivos, negação e argumentos",
        "topics": [
          "Proposições",
          "Conectivos e negação",
          "Argumentos"
        ],
        "summary": "Proposição é uma sentença declarativa com valor lógico. Conectivos formam proposições compostas; negar corretamente exige considerar a estrutura inteira. Um argumento é válido quando a conclusão decorre das premissas.",
        "keyPoints": [
          "Diferencie proposição de pergunta ou ordem.",
          "Memorize negação, conjunção, disjunção e condicional.",
          "Use as leis de De Morgan nas negações compostas.",
          "Validade depende da forma lógica, não da plausibilidade do tema."
        ],
        "examFocus": "Treine negações e argumentos simples, pois erros de leitura são frequentes.",
        "example": "Negar 'possui alvará e está aberto' resulta em 'não possui alvará ou não está aberto'.",
        "sourceIds": [
          "logica-educapes"
        ]
      },
      {
        "id": "fis-log-conjuntos",
        "title": "2. Sequências, padrões e conjuntos",
        "topics": [
          "Sequências e padrões",
          "Conjuntos"
        ],
        "summary": "Sequências exigem identificar a regra de formação; conjuntos organizam elementos por pertencimento, união, interseção e diferença.",
        "keyPoints": [
          "Teste diferenças, razões, alternâncias e ciclos.",
          "União reúne elementos; interseção mantém os comuns.",
          "Diagramas ajudam em sobreposições.",
          "Não conclua uma regra por poucos termos sem conferir alternativas."
        ],
        "examFocus": "A banca pode misturar padrão numérico e regra alternada.",
        "example": "Em 2, 5, 8, 11, a diferença constante é 3; o próximo é 14.",
        "sourceIds": [
          "matematica-basica-educapes",
          "logica-educapes"
        ]
      },
      {
        "id": "fis-log-numeros",
        "title": "3. Operações, frações e porcentagem",
        "topics": [
          "Operações com números",
          "Frações",
          "Porcentagem"
        ],
        "summary": "Operações, frações e porcentagem formam a base quantitativa. Converta fração, decimal e percentual quando conveniente e identifique a base do percentual.",
        "keyPoints": [
          "Respeite a ordem das operações.",
          "Simplifique frações antes de comparar ou multiplicar.",
          "x% de N = x/100 × N.",
          "Percentuais sucessivos usam bases sucessivas."
        ],
        "examFocus": "Percentuais sucessivos e mudança de base são armadilhas comuns.",
        "example": "15% de 200 = 30.",
        "sourceIds": [
          "matematica-basica-educapes",
          "encceja-matematica"
        ]
      },
      {
        "id": "fis-log-proporcoes",
        "title": "4. Razão, proporção e regra de três",
        "topics": [
          "Razão e proporção",
          "Regra de três simples e composta"
        ],
        "summary": "Razão compara grandezas; proporção iguala razões. Regra de três organiza relações direta ou inversamente proporcionais; na composta, analise cada grandeza frente à incógnita.",
        "keyPoints": [
          "Determine se a relação é direta ou inversa.",
          "Mantenha unidades compatíveis.",
          "Regra de três não substitui a compreensão da proporcionalidade.",
          "Na composta, trate cada relação separadamente."
        ],
        "examFocus": "O erro típico é assumir proporcionalidade direta sem verificar.",
        "example": "Se 4 fiscais fazem a tarefa em 6 h, 8 fariam em 3 h, com produtividade constante.",
        "sourceIds": [
          "matematica-basica-educapes",
          "mec-matematica-proporcao"
        ]
      },
      {
        "id": "fis-log-medidas",
        "title": "5. Médias, medidas e conversões",
        "topics": [
          "Média simples e ponderada",
          "Medidas e conversões",
          "Comprimento, área, volume, massa e tempo"
        ],
        "summary": "Média simples dá o mesmo peso a todos os valores; média ponderada usa pesos. Conversões exigem cuidado com unidades e com as potências de área e volume.",
        "keyPoints": [
          "Média simples = soma/quantidade.",
          "Média ponderada = soma(valor×peso)/soma dos pesos.",
          "Área e volume não convertem com o mesmo fator linear do comprimento.",
          "Converta unidades antes do cálculo."
        ],
        "examFocus": "A banca pode misturar metros e centímetros, horas e minutos ou pesos diferentes.",
        "example": "2 m = 200 cm, mas 2 m² = 20.000 cm².",
        "sourceIds": [
          "matematica-basica-educapes",
          "encceja-matematica"
        ]
      },
      {
        "id": "fis-log-espaco",
        "title": "6. Ângulos, escalas, croquis, mapas e plantas",
        "topics": [
          "Ângulos",
          "Escala gráfica e numérica",
          "Leitura de croquis, mapas e plantas"
        ],
        "summary": "Escala relaciona medida no desenho e medida real. Croquis, mapas e plantas exigem legenda, orientação espacial e conversão de unidades.",
        "keyPoints": [
          "Escala 1:n: uma unidade no desenho representa n na realidade.",
          "Converta desenho e realidade para a mesma unidade.",
          "Leia legenda e dimensões antes de calcular.",
          "Ângulo reto=90°, meia-volta=180°, volta=360°."
        ],
        "examFocus": "Questões podem pedir dimensão real, área ou distância a partir de planta.",
        "example": "Em escala 1:100, 3 cm correspondem a 3 m.",
        "sourceIds": [
          "encceja-matematica",
          "matematica-basica-educapes"
        ]
      },
      {
        "id": "fis-log-aplicada",
        "title": "7. Dimensões, quantidades, prazos e custos",
        "topics": [
          "Cálculo de dimensões, quantidades, prazos e custos simples"
        ],
        "summary": "Problemas aplicados combinam aritmética, proporção, medidas e interpretação. Liste dados, unidades e incógnita antes de calcular.",
        "keyPoints": [
          "Identifique exatamente o que é pedido.",
          "Verifique a unidade final.",
          "Use estimativa para detectar resultados absurdos.",
          "Releia o enunciado após o cálculo."
        ],
        "examFocus": "A maior dificuldade costuma ser modelar corretamente a situação, não a conta em si.",
        "example": "120 m² divididos igualmente em 6 setores resultam em 20 m² por setor.",
        "sourceIds": [
          "encceja-matematica",
          "matematica-basica-educapes"
        ]
      }
    ]
  }
,

  "operador-matematica": {
    "intro": "Trilha dos 6% da prova de Operador Social: operações, porcentagem, proporções, medidas, gráficos e raciocínio lógico aplicados a problemas cotidianos.",
    "modules": [
      {
        "id": "op-mat-numeros",
        "title": "1. Inteiros, racionais e frações",
        "topics": [
          "Operações com números inteiros e racionais",
          "Frações"
        ],
        "summary": "Números inteiros e racionais aparecem em diferenças, partes e medidas. Frações podem ser comparadas, simplificadas e convertidas em decimal.",
        "keyPoints": [
          "Atenção aos sinais.",
          "Para somar frações, use denominador comum.",
          "Simplifique resultados quando possível.",
          "Converta para decimal quando facilitar."
        ],
        "examFocus": "Erros de sinal e denominador são recorrentes.",
        "example": "3/4 + 1/8 = 7/8.",
        "sourceIds": [
          "matematica-basica-educapes",
          "encceja-matematica"
        ]
      },
      {
        "id": "op-mat-proporcao",
        "title": "2. Porcentagem, razão, proporção e regra de três",
        "topics": [
          "Porcentagem",
          "Razão e proporção",
          "Regra de três simples"
        ],
        "summary": "Esses recursos resolvem comparação e variação proporcional. Identifique a base da porcentagem e se as grandezas são diretas ou inversas.",
        "keyPoints": [
          "10%=0,10; 25%=1/4; 50%=1/2.",
          "Razão compara; proporção iguala razões.",
          "Regra de três simples envolve duas grandezas.",
          "Unidades precisam ser compatíveis."
        ],
        "examFocus": "Identifique o valor-base antes de calcular o percentual.",
        "example": "30 de 120 atendimentos representam 25%.",
        "sourceIds": [
          "matematica-basica-educapes",
          "mec-matematica-proporcao"
        ]
      },
      {
        "id": "op-mat-medidas",
        "title": "3. Média, medidas, perímetro e área",
        "topics": [
          "Média aritmética",
          "Medidas e conversões",
          "Perímetro e área"
        ],
        "summary": "Média resume valores; medidas exigem unidades compatíveis. Perímetro mede contorno; área mede superfície.",
        "keyPoints": [
          "Média=soma/quantidade.",
          "Perímetro e área são grandezas diferentes.",
          "Retângulo: área=b×h; perímetro=2(b+h).",
          "Converta unidades antes de operar."
        ],
        "examFocus": "É comum a prova misturar unidades ou trocar área por perímetro.",
        "example": "Sala 5 m × 4 m: área 20 m² e perímetro 18 m.",
        "sourceIds": [
          "encceja-matematica",
          "matematica-basica-educapes"
        ]
      },
      {
        "id": "op-mat-graficos",
        "title": "4. Tabelas e gráficos",
        "topics": [
          "Tabelas e gráficos"
        ],
        "summary": "Leia título, unidade, legenda, período e escala. A questão pode pedir valor, diferença, percentual, média ou tendência.",
        "keyPoints": [
          "Leia eixo e unidade antes de comparar.",
          "Não confunda valor absoluto e percentual.",
          "Observe se a escala foi truncada.",
          "Confirme a operação pedida."
        ],
        "examFocus": "Muitas questões são resolvidas por leitura cuidadosa, sem fórmula complexa.",
        "example": "80 para 100 é aumento absoluto de 20 e percentual de 25% sobre 80.",
        "sourceIds": [
          "encceja-matematica"
        ]
      },
      {
        "id": "op-mat-problemas",
        "title": "5. Tempo, prazos e quantidades",
        "topics": [
          "Problemas envolvendo tempo, prazos e quantidades"
        ],
        "summary": "Problemas cotidianos combinam operações, conversões e interpretação. Organize a cronologia e a unidade antes de calcular.",
        "keyPoints": [
          "Diferencie duração de horário.",
          "Converta horas e minutos corretamente.",
          "Leia a unidade pedida.",
          "Faça estimativa para validar."
        ],
        "examFocus": "O risco maior é aplicar a operação certa aos dados interpretados de forma errada.",
        "example": "Três atividades de 45 min totalizam 2h15.",
        "sourceIds": [
          "encceja-matematica",
          "matematica-basica-educapes"
        ]
      },
      {
        "id": "op-mat-logica",
        "title": "6. Proposições, conectivos e negação",
        "topics": [
          "Proposições",
          "Conectivos",
          "Negação"
        ],
        "summary": "Lógica proposicional avalia sentenças declarativas e sua composição por 'e', 'ou', 'se... então' e negação.",
        "keyPoints": [
          "Proposição admite valor verdadeiro ou falso.",
          "Negar conjunção transforma em disjunção das negações.",
          "Negar 'todo' costuma gerar 'existe pelo menos um ... que não'.",
          "Não presuma 'ou' exclusivo sem indicação."
        ],
        "examFocus": "Treine a tradução de frases para formas lógicas simples.",
        "example": "Negar 'todos os registros estão completos' é 'pelo menos um não está completo'.",
        "sourceIds": [
          "logica-educapes"
        ]
      },
      {
        "id": "op-mat-padroes",
        "title": "7. Sequências, padrões e organização de informações",
        "topics": [
          "Sequências",
          "Padrões",
          "Organização de informações e resolução de problemas"
        ],
        "summary": "Sequências exigem reconhecer regularidade. Em problemas com várias condições, tabelas, esquemas e listas reduzem erros.",
        "keyPoints": [
          "Procure diferença, multiplicação, alternância e repetição.",
          "Organize restrições antes de testar respostas.",
          "Elimine alternativas incompatíveis.",
          "Use representação visual quando houver muitas relações."
        ],
        "examFocus": "Não faça contas antes de estruturar as informações.",
        "example": "1,4,9,16 são quadrados perfeitos; o próximo é 25.",
        "sourceIds": [
          "logica-educapes",
          "matematica-basica-educapes"
        ]
      }
    ]
  }
,

  "operador-legislacao": {
    "intro": "Trilha dos 12% da prova de Operador Social: organização municipal, servidor, princípios, atendimento, transparência, proteção de dados e Governo Digital.",
    "modules": [
      {
        "id": "op-leg-organizacao",
        "title": "1. Lei Orgânica e organização administrativa",
        "topics": [
          "Lei Orgânica do Município de Santos",
          "Lei Complementar Municipal nº 1.253/2024"
        ],
        "summary": "A Lei Orgânica é o marco institucional do Município; a LC 1.253/2024 organiza a Administração Pública municipal. Estude competências e estrutura pela redação oficial.",
        "keyPoints": [
          "Lei Orgânica é a norma fundamental municipal dentro da Constituição.",
          "Organização administrativa define competências e estrutura.",
          "Órgão e entidade não são sinônimos.",
          "Use a lei seca para nomes e competências específicas."
        ],
        "examFocus": "Questões podem misturar competência do Município, do órgão e do agente.",
        "example": "Servidor deve agir dentro das atribuições definidas pelas normas.",
        "sourceIds": [
          "lei-organica-santos",
          "lc-1253-2024"
        ]
      },
      {
        "id": "op-leg-estatuto",
        "title": "2. Estatuto e conduta do servidor",
        "topics": [
          "Lei Municipal nº 4.623/1984",
          "Princípios e conduta do servidor público"
        ],
        "summary": "O Estatuto municipal disciplina o regime funcional. Destaque deveres, proibições, responsabilidades e conduta compatível com o interesse público.",
        "keyPoints": [
          "Dever funcional decorre da lei e do cargo.",
          "Conduta deve observar urbanidade, zelo e finalidade pública.",
          "Direitos e deveres funcionais não se confundem com regras gerais de atendimento.",
          "Sanções e procedimentos devem ser conferidos na lei vigente."
        ],
        "examFocus": "Priorize a redação do Estatuto em questões de dever funcional.",
        "example": "Informação acessada pelo cargo deve ser usada apenas para finalidade legítima.",
        "sourceIds": [
          "estatuto-servidores-santos"
        ]
      },
      {
        "id": "op-leg-limpe",
        "title": "3. Princípios LIMPE",
        "topics": [
          "Legalidade",
          "Impessoalidade",
          "Moralidade",
          "Publicidade",
          "Eficiência"
        ],
        "summary": "Legalidade, impessoalidade, moralidade, publicidade e eficiência orientam a Administração Pública e precisam ser aplicados em conjunto.",
        "keyPoints": [
          "Legalidade vincula o agente à competência normativa.",
          "Impessoalidade afasta favorecimento.",
          "Moralidade exige probidade e boa administração.",
          "Publicidade promove transparência, ressalvado sigilo legal.",
          "Eficiência busca qualidade sem afastar os demais princípios."
        ],
        "examFocus": "Eficiência não autoriza ignorar procedimento, igualdade ou sigilo.",
        "example": "Atender conhecido fora da ordem sem justificativa viola impessoalidade.",
        "sourceIds": [
          "constituicao-federal",
          "lei-organica-santos"
        ]
      },
      {
        "id": "op-leg-usuario",
        "title": "4. Direitos do usuário e atendimento ao público",
        "topics": [
          "Lei nº 13.460/2017",
          "Atendimento ao público"
        ],
        "summary": "A Lei 13.460/2017 protege o usuário de serviços públicos. Atendimento deve combinar respeito, clareza, acessibilidade e orientação adequada.",
        "keyPoints": [
          "Usuário tem direitos de informação e atendimento adequado.",
          "Ouvidoria e avaliação integram a melhoria do serviço.",
          "Respeito não significa prometer resultado fora das regras.",
          "Encaminhe para o canal correto quando necessário."
        ],
        "examFocus": "Questões situacionais costumam privilegiar tratamento isonômico e orientação clara.",
        "example": "Demanda fora da atribuição deve ser orientada ao canal competente, não simplesmente recusada.",
        "sourceIds": [
          "lei-13460"
        ]
      },
      {
        "id": "op-leg-lai",
        "title": "5. Lei de Acesso à Informação",
        "topics": [
          "Lei nº 12.527/2011"
        ],
        "summary": "A LAI estrutura transparência ativa e passiva e disciplina acesso a informações públicas, com hipóteses legais de restrição.",
        "keyPoints": [
          "Transparência ativa independe de pedido.",
          "Transparência passiva responde a solicitações.",
          "Nem toda informação pode ser divulgada sem restrições.",
          "Dados pessoais exigem compatibilização com proteção legal."
        ],
        "examFocus": "LAI e LGPD devem ser conciliadas, não tratadas como incompatíveis.",
        "example": "Pedido público pode ser atendido com ocultação de dado pessoal desnecessário.",
        "sourceIds": [
          "lai",
          "lgpd"
        ]
      },
      {
        "id": "op-leg-lgpd",
        "title": "6. LGPD, sigilo e zelo documental",
        "topics": [
          "Lei nº 13.709/2018",
          "Sigilo funcional",
          "Zelo pelo patrimônio e documentação"
        ],
        "summary": "A LGPD disciplina tratamento de dados pessoais. Sigilo funcional e zelo documental exigem limitar acesso, uso e compartilhamento ao necessário para o serviço.",
        "keyPoints": [
          "Dado pessoal identifica ou torna identificável pessoa natural.",
          "Dados sensíveis recebem proteção reforçada.",
          "Acesso funcional não autoriza curiosidade ou uso particular.",
          "Zelo documental envolve guarda, integridade e tramitação adequada."
        ],
        "examFocus": "Sigilo não significa ausência de registro; significa registro necessário com acesso controlado.",
        "example": "Documento administrativo não deve circular em grupo informal sem finalidade funcional.",
        "sourceIds": [
          "lgpd",
          "estatuto-servidores-santos"
        ]
      },
      {
        "id": "op-leg-digital",
        "title": "7. Governo Digital",
        "topics": [
          "Lei nº 14.129/2021"
        ],
        "summary": "A Lei 14.129/2021 estabelece princípios e instrumentos para Governo Digital e aumento da eficiência pública, respeitando legalidade, acesso e proteção de dados.",
        "keyPoints": [
          "Digitalização deve simplificar e melhorar o acesso.",
          "Tecnologia continua sujeita à segurança e proteção de dados.",
          "Serviço digital não elimina automaticamente canais acessíveis.",
          "Integração de dados precisa de finalidade legítima."
        ],
        "examFocus": "Tecnologia é instrumento da Administração, não exceção aos seus princípios.",
        "example": "Fluxo digital pode reduzir etapas, mas não dispensa proteção de credenciais.",
        "sourceIds": [
          "governo-digital",
          "lgpd"
        ]
      }
    ]
  }

}
