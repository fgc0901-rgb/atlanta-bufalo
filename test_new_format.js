// Test with the new user format
function uuid(){
    return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function parseBulkInput(text, dataISO) {
    const linhas = text.split("\n").map(l => l.trim()).filter(Boolean);
    const atividades = [];

    for (const linha of linhas) {
        const l = linha.toLowerCase();

        // FORMATO ESTRUTURADO COM BULLET POINTS (・) - VERSÃO MAIS ESPECÍFICA
        
        // TikTok específico
        let m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)\s+no\s+(tiktok|tik\s*tok)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "tiktok", tipo: "video"
            });
          }
          continue;
        }

        m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)\s+no\s+(tiktok|tik\s*tok)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "tiktok", tipo: "stories"
            });
          }
          continue;
        }

        // Kwai específico
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)\s+no\s+(kwai)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "kwai", tipo: "video"
            });
          }
          continue;
        }

        m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)\s+no\s+(kwai)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "kwai", tipo: "stories"
            });
          }
          continue;
        }

        // Instagram específico - Postagem no feed
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(postagem|post)\s+no\s+feed\s+no\s+(instagram)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "instagram", tipo: "feed"
            });
          }
          continue;
        }

        // Instagram específico - Reels
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(reels?)\s+no\s+(instagram)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "instagram", tipo: "reels"
            });
          }
          continue;
        }

        // Instagram específico - Story
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)\s+no\s+(instagram)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "instagram", tipo: "stories"
            });
          }
          continue;
        }

        // YouTube específico - Vídeo
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)\s+no\s+(youtube)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "youtube", tipo: "video"
            });
          }
          continue;
        }

        // YouTube específico - Shorts
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(shorts?)\s+no\s+(youtube)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "youtube", tipo: "shorts"
            });
          }
          continue;
        }

        // YouTube específico - Story (que vira Post)
        m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)\s+no\s+(youtube)(?:\s*:.*)?$/);
        if (m) {
          const qtd = Number(m[1]);
          for (let i = 0; i < qtd; i++) {
            atividades.push({
              id: uuid(), data: dataISO, categoria: "conteudo",
              plataforma: "youtube", tipo: "post"
            });
          }
          continue;
        }
    }

    return atividades;
}

// User's provided data
const userData = `Tiktok (Pontos)

・1 Vídeo no TikTok
・1 Stories no TikTok

Kwai (Pontos)

・1 Vídeo no Kwai
・1 Story no Kwai

Instagram (Pontos)

・1 Postagem no feed no Instagram
・1 Reels no Instagram
・1 Story no Instagram

Youtube (Pontos)

・1 Vídeo no Youtube
・1 Shorts no Youtube
・1 Story no Youtube`;

console.log("=".repeat(70));
console.log("TESTE DO NOVO FORMATO DE DADOS DO USUÁRIO");
console.log("=".repeat(70));
console.log("\n📝 DADOS DE ENTRADA:\n");
console.log(userData);
console.log("\n" + "=".repeat(70) + "\n");

const atividades = parseBulkInput(userData, "2026-01-15");

console.log(`📊 RESULTADO: ${atividades.length} atividades reconhecidas\n`);

if (atividades.length > 0) {
    const grupos = {};
    atividades.forEach(a => {
        const key = `${a.plataforma}-${a.tipo}`;
        if (!grupos[key]) grupos[key] = [];
        grupos[key].push(a);
    });
    
    console.log("✅ ATIVIDADES RECONHECIDAS:\n");
    let totalPontos = 0;
    Object.keys(grupos).sort().forEach(key => {
        const ativs = grupos[key];
        const [plataforma, tipo] = key.split('-');
        const pontos = ativs.length * 3; // 3 pontos cada
        totalPontos += pontos;
        console.log(`✓ ${plataforma.toUpperCase()} - ${tipo.toUpperCase()} (x${ativs.length}): ${pontos} pontos`);
    });
    
    console.log(`\n🎯 TOTAL: ${atividades.length} publicações = ${totalPontos} pontos`);
} else {
    console.log("❌ NENHUMA ATIVIDADE RECONHECIDA");
}

console.log("\n" + "=".repeat(70));
console.log("✅ TESTE CONCLUÍDO!");
