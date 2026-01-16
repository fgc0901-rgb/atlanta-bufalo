// Test the JSON import handling with the centralized scoring (score.js)

const { calcularPontuacao, nomeTipo, nomePlataforma, REGRAS_PONTOS } = require('./score');

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
    },
    // Adicionar Stories no Twitch (2 no mesmo dia para validar limite 1/dia)
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "twitch",
      "tipo": "stories",
      "url": "https://twitch.tv/stories/example1"
    },
    {
      "data": "2026-01-16",
      "categoria": "conteudo",
      "plataforma": "twitch",
      "tipo": "stories",
      "url": "https://twitch.tv/stories/example2"
    },
    // Código de indicação (Allowist/codiguin) com quantidade
    {
      "data": "2026-01-16",
      "categoria": "codigo",
      "plataforma": "codigo",
      "tipo": "indicacao",
      "quantidade": 3
    }
  ]
};

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

// Usar módulo central de pontuação
const resultado = calcularPontuacao({
  atividades: jsonData.atividades,
  pontosAnteriores: jsonData.pontosAnteriores
});

console.log("\n📊 RESULTADO DO CÁLCULO:\n");
Object.keys(resultado.grupos).sort().forEach(k => {
  const it = resultado.grupos[k];
  console.log(`> **${k}** (x${it.count}): ${it.pontos} pontos`);
});

console.log(`\n### 📈 Resumo`);
console.log(`> **Pontos Deste Ciclo:** \`${resultado.pontosPeriodo} pontos\``);
console.log(`> **Pontos Anteriores:** \`${resultado.pontosAnteriores} pontos\``);
console.log(``);
console.log(`# 🪙 Pontuação Total Atual: **${resultado.total} pontos**`);
console.log(`🖥️ Total de Atividades Recebidas: **${resultado.conteudosPontuados}**`);

// Mostrar auditoria, destacando a identificação das regras aplicadas
console.log(`\n🔎 Auditoria (identificação de regras aplicadas):\n`);
resultado.auditoria.forEach(a => {
  const regraInfo = a.regra ? ` | Regra: ${a.regra}` : "";
  console.log(`- ${a.data} | ${a.atividade} | ${a.status} | ${a.pontos} pts${regraInfo}`);
});

console.log("\n" + "=".repeat(80));
