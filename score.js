// Centralized scoring logic for Atlanta Buffalo

const REGRAS_PONTOS = {
  tiktok: { video: { pontos: 3 }, stories: { pontos: 3 } },
  kwai: { video: { pontos: 3 }, stories: { pontos: 3 } },
  instagram: { feed: { pontos: 3 }, reels: { pontos: 3 }, stories: { pontos: 3 } },
  youtube: { video: { pontos: 3 }, shorts: { pontos: 3 }, post: { pontos: 3 } },
  kick: { video: { pontos: 3 } },
  twitch: { stories: { pontos: 3 }, raid: { pontos: 8 } },
  codigo: { indicacao: { pontos: 5 } }
};

function normalizarTipo(plataforma, tipo) {
  if (plataforma === "kwai" && tipo === "feed") return "video";
  if (plataforma === "youtube" && tipo === "post") return "post";
  return tipo;
}

function nomeTipo(plataforma, tipo) {
  const t = normalizarTipo(plataforma, tipo);
  const map = {
    video: "Vídeo",
    stories: "Stories",
    feed: "Postagem no feed",
    reels: "Reels",
    shorts: "Shorts",
    raid: "Raid",
    indicacao: "Indicação",
    post: "Post"
  };
  return map[t] || tipo;
}

function nomePlataforma(p) {
  const map = {
    tiktok: "TikTok",
    kwai: "Kwai",
    instagram: "Instagram",
    youtube: "YouTube",
    twitch: "Twitch",
    kick: "Kick",
    codigo: "Código"
  };
  return map[p] || p;
}

function calcularPontuacao({ atividades = [], pontosAnteriores = 0 }) {
  let pontosPeriodo = 0;
  const grupos = {};
  const auditoria = [];

  // Limite: somente 1 Stories no Twitch por dia
  const twitchStoriesPorDia = {}; // dataISO => boolean

  for (const a of atividades) {
    const plataforma = a.plataforma;
    const tipoOriginal = a.tipo;
    const tipo = normalizarTipo(plataforma, tipoOriginal);
    const regra = REGRAS_PONTOS[plataforma]?.[tipo];

    // Ignorar atividades não pontuáveis
    if (!regra) {
      auditoria.push({
        data: a.data,
        atividade: `${nomeTipo(plataforma, tipo)} ${nomePlataforma(plataforma)}`,
        status: "ℹ️ Sem regra de pontuação",
        pontos: 0
      });
      continue;
    }

    // Regra especial: Stories no Twitch limitado a 1 por dia
    if (plataforma === "twitch" && tipo === "stories") {
      const dia = a.data;
      if (twitchStoriesPorDia[dia]) {
        auditoria.push({
          data: a.data,
          atividade: "Stories Twitch",
          status: "❌ Ignorado (limite 1/dia)",
          pontos: 0,
          regra: "Stories no Twitch: 3 pontos; (pontua apenas um por dia)"
        });
        continue;
      }
      twitchStoriesPorDia[dia] = true;
    }

    // Regra de Código: Indicação com quantidade
    let multiplicador = 1;
    if (plataforma === "codigo" && tipo === "indicacao") {
      multiplicador = Number(a.quantidade || 1);
    }

    const pontos = regra.pontos * multiplicador;
    pontosPeriodo += pontos;

    const label = `${nomeTipo(plataforma, tipo)} ${nomePlataforma(plataforma)}`;
    if (!grupos[label]) grupos[label] = { count: 0, pontos: 0 };
    grupos[label].count += multiplicador; // conta indicados quando for código
    grupos[label].pontos += pontos;

    auditoria.push({
      data: a.data,
      atividade: label,
      status: "✅ Pontuado",
      pontos
    });
  }

  const total = pontosAnteriores + pontosPeriodo;
  const conteudosPontuados = atividades.length; // número bruto de atividades enviadas

  return {
    pontosPeriodo,
    pontosAnteriores,
    total,
    grupos,
    auditoria,
    conteudosPontuados
  };
}

module.exports = {
  REGRAS_PONTOS,
  calcularPontuacao,
  nomeTipo,
  nomePlataforma
};
