// Comprehensive test simulating the user's complete flow

// Mock the scoring system
const REGRAS_PONTOS = {
  tiktok: { video:{pontos:3}, stories:{pontos:3} },
  kwai: { video:{pontos:3}, stories:{pontos:3} },
  instagram: { feed:{pontos:3}, reels:{pontos:3}, stories:{pontos:3} },
  youtube: { video:{pontos:3}, shorts:{pontos:3}, post:{pontos:3} },
  kick: { video:{pontos:3} },
  twitch: { raid:{pontos:8}, stories:{pontos:3} },
  codigo: { indicacao:{pontos:5} }
};

function normalizarTipo(plataforma, tipo){
  if (plataforma === "kwai" && tipo === "feed") return "video";
  if (plataforma === "youtube" && tipo === "post") return "post";
  return tipo;
}

function nomeTipo(plataforma, tipo){
  const t = normalizarTipo(plataforma, tipo);
  const map = {
    video: "Vídeo", stories: "Stories", feed: "Postagem no feed",
    reels: "Reels", shorts: "Shorts", raid: "Raid", indicacao: "Indicação", post: "Post"
  };
  return map[t] || tipo;
}

function nomePlataforma(p){
  const map = { 
    tiktok:"TikTok", kwai:"Kwai", instagram:"Instagram", 
    youtube:"YouTube", twitch:"Twitch", kick:"Kick", codigo:"Código" 
  };
  return map[p] || p;
}

// Simulating the calculation result
const testResult = {
  pontosPeriodo: 30,
  total: 59, // 30 + 29 previous
  conteudosPontuados: 10,
  gruposConteudo: {
    "Stories TikTok": { count: 1, pontos: 3 },
    "Vídeo TikTok": { count: 1, pontos: 3 },
    "Postagem no feed Instagram": { count: 1, pontos: 3 },
    "Reels Instagram": { count: 1, pontos: 3 },
    "Stories Instagram": { count: 1, pontos: 3 },
    "Vídeo YouTube": { count: 1, pontos: 3 },
    "Shorts YouTube": { count: 1, pontos: 3 },
    "Post YouTube": { count: 1, pontos: 3 },
    "Vídeo Kwai": { count: 1, pontos: 3 },
    "Stories Kwai": { count: 1, pontos: 3 }
  },
  livesDetalhe: [],
  viewsDetalhe: [],
  acoesDetalhe: []
};

function gerarMensagemDiscord_NOVO(streamer, r, pontosAnteriores){
  const linhas = [];

  linhas.push(`# <a:trofeu1:1432593868439949343> **Relatório de Pontuação Streamers Atlanta** <a:trofeu1:1432593868439949343> 🐃`);
  linhas.push(`### 📦 Pontos por Conteúdo e Ação`);
  
  // Agrupar conteúdo
  const conteudoDetalhado = {};
  for (const [label, item] of Object.entries(r.gruposConteudo)) {
    if (!conteudoDetalhado[label]) {
      conteudoDetalhado[label] = { count: 0, pontos: 0 };
    }
    conteudoDetalhado[label].count += item.count;
    conteudoDetalhado[label].pontos += item.pontos;
  }

  // Exibir conteúdo agrupado
  Object.keys(conteudoDetalhado).sort().forEach((k) => {
    const it = conteudoDetalhado[k];
    linhas.push(`> **${k}** (x${it.count}): ${it.pontos} pontos`);
  });

  // Exibir lives se houver
  if (r.livesDetalhe.length){
    r.livesDetalhe.forEach((l) => {
      const h = (typeof l.horas === "number" && !isNaN(l.horas)) ? l.horas : 0;
      linhas.push(`> **Lives Twitch** (${h}h): ${l.pontos} pontos`);
    });
  }

  // Exibir views se houver
  if (r.viewsDetalhe.length){
    r.viewsDetalhe.forEach((v) => {
      linhas.push(`> **${nomePlataforma(v.plataforma)} Views** (${v.views} views): ${v.pontos} pontos`);
    });
  }

  // Exibir ações especiais se houver
  if (r.acoesDetalhe.length){
    r.acoesDetalhe.forEach((a) => {
      linhas.push(`> **${a.acao}**: ${a.pontos} pontos`);
    });
  }

  linhas.push(`### 📈 Resumo`);
  linhas.push(`> **Pontos Deste Ciclo:** \`${r.pontosPeriodo} pontos\``);
  linhas.push(`> **Pontos Anteriores:** \`${pontosAnteriores} pontos\``);
  linhas.push(``);
  linhas.push(`# 🪙 Pontuação Total Atual: **${r.total} pontos**`);
  linhas.push(`🖥️ Total de Publicações no Ciclo: **${r.conteudosPontuados}**`);
  linhas.push(``);

  linhas.push(`---`);
  // Rewards omitted for this test
  linhas.push(`*🐃 Powered by Sistema Búfalo Atlanta*`);

  return linhas.join("\n");
}

console.log("=".repeat(70));
console.log("TESTE DO NOVO FORMATO DE MENSAGEM");
console.log("=".repeat(70));
console.log();

const mensagem = gerarMensagemDiscord_NOVO("Rafael", testResult, 29);
console.log(mensagem);

console.log();
console.log("=".repeat(70));
console.log("✅ TESTE CONCLUÍDO");
console.log("=".repeat(70));
