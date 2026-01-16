// Test the JSON import handling with the new parser

const jsonData = {
  "pontosAnteriores": 29,
  "atividades": [
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "tiktok",
      "tipo": "stories",
      "url": "https://vt.tiktok.com/ZS5T6TCe3/"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "tiktok",
      "tipo": "stories",
      "url": "https://vt.tiktok.com/ZSHormUobKsJU-oW1ys/"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "instagram",
      "tipo": "feed",
      "url": "https://www.instagram.com/p/DThShCGjVPE/?igsh=NW5vOXBpcGM4azQ2"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "instagram",
      "tipo": "reels",
      "url": "https://www.instagram.com/reel/DTdtvXIER8c/?igsh=NnQzdWJhend4eGpn"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "instagram",
      "tipo": "stories",
      "url": "https://www.instagram.com/stories/trovaomt9976/3810408753250779605?utm_source=ig_story_item_share&igsh=cDdteXp0NHU1d2V6"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "youtube",
      "tipo": "video",
      "url": "https://youtu.be/C2xB6AplY9o"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "youtube",
      "tipo": "shorts",
      "url": "https://www.youtube.com/shorts/y7gqDCMtuY0"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "youtube",
      "tipo": "post",
      "url": "https://www.youtube.com/post/Ugkxs2p40U5dxe0PzKdf2et7syH5gwhPzEej"
    }
  ]
};

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

console.log("=".repeat(80));
console.log("TESTE DE CÁLCULO COM JSON IMPORTADO");
console.log("=".repeat(80));
console.log();

// Simular o cálculo
let pontosConteudo = 0;
const gruposConteudo = {};

jsonData.atividades.forEach(a => {
  const plataforma = a.plataforma;
  const tipo = a.tipo;
  const regra = REGRAS_PONTOS[plataforma]?.[tipo];
  
  if (regra) {
    pontosConteudo += regra.pontos;
    const label = `${nomeTipo(plataforma, tipo)} ${nomePlataforma(plataforma)}`;
    if (!gruposConteudo[label]) gruposConteudo[label] = { count: 0, pontos: 0 };
    gruposConteudo[label].count += 1;
    gruposConteudo[label].pontos += regra.pontos;
  }
});

const pontosPeriodo = pontosConteudo;
const total = jsonData.pontosAnteriores + pontosPeriodo;
const conteudosPontuados = jsonData.atividades.length;

console.log("📊 RESULTADO DO CÁLCULO:\n");
Object.keys(gruposConteudo).sort().forEach(k => {
  const it = gruposConteudo[k];
  console.log(`> **${k}** (x${it.count}): ${it.pontos} pontos`);
});

console.log(`\n### 📈 Resumo`);
console.log(`> **Pontos Deste Ciclo:** \`${pontosPeriodo} pontos\``);
console.log(`> **Pontos Anteriores:** \`${jsonData.pontosAnteriores} pontos\``);
console.log(``);
console.log(`# 🪙 Pontuação Total Atual: **${total} pontos**`);
console.log(`🖥️ Total de Publicações no Ciclo: **${conteudosPontuados}**`);

console.log(`\n✅ Esperado: 8 publicações = 24 pontos, Total: 53 pontos`);
console.log("=".repeat(80));
