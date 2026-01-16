// Test the improved parser with the user's data

function uuid(){
    return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function parseBulkInput(text, dataISO) {
  const linhas = text.split("\n").map(l => l.trim()).filter(Boolean);
  const atividades = [];

  // Função para extrair plataforma de URL
  function getPlatformaFromUrl(url) {
    if (!url) return null;
    const urlLower = url.toLowerCase();
    if (urlLower.includes('tiktok.com') || urlLower.includes('vt.tiktok.com')) return 'tiktok';
    if (urlLower.includes('instagram.com')) return 'instagram';
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) return 'youtube';
    if (urlLower.includes('kwai')) return 'kwai';
    if (urlLower.includes('kick.com')) return 'kick';
    return null;
  }

  // Função para extrair tipo de conteúdo de URL
  function getTipoFromUrl(url) {
    if (!url) return 'video';
    const urlLower = url.toLowerCase();
    if (urlLower.includes('/shorts/') || urlLower.includes('youtube.com/shorts')) return 'shorts';
    if (urlLower.includes('/reel/')) return 'reels';
    if (urlLower.includes('/stories/') || urlLower.includes('/stories')) return 'stories';
    if (urlLower.includes('/post/') || urlLower.includes('youtube.com/post')) return 'post';
    if (urlLower.includes('/p/') && urlLower.includes('instagram')) return 'feed';
    return 'video';
  }

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const l = linha.toLowerCase();

    // Pular cabeçalhos
    if (l.match(/^(tiktok|kwai|instagram|youtube|kick|twitch)\s*\(pontos\)$/)) continue;
    if (l.match(/^[a-zA-Z0-9_]+$/)) continue;
    if (l.match(/^\[\d{2}:\d{2}\]/) || l.match(/^\d{2}:\d{2}/)) continue;

    // Extrair URL
    let url = null;
    let urlMatch = linha.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      url = urlMatch[1];
    } else if (i + 1 < linhas.length) {
      const nextMatch = linhas[i + 1].match(/^(https?:\/\/[^\s]+)/);
      if (nextMatch) {
        url = nextMatch[1];
      }
    }

    // Se é uma URL pura
    if (l.match(/^https?:\/\//)) {
      const platform = getPlatformaFromUrl(linha);
      if (platform) {
        const tipo = getTipoFromUrl(linha);
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: platform, tipo, url: linha
        });
      }
      continue;
    }

    // Processar descrições com bullet points
    let m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)\s+no\s+(tiktok|tik\s*tok)(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "tiktok", tipo: "video", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)\s+no\s+(tiktok|tik\s*tok)(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "tiktok", tipo: "stories", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)\s+no\s+kwai(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "kwai", tipo: "video", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)\s+no\s+kwai(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "kwai", tipo: "stories", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(postagem|post)\s+no\s+feed\s+no\s+instagram(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "instagram", tipo: "feed", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(reels?)(?:\s+no\s+)?instagram(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "instagram", tipo: "reels", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories)(?:\s+no\s+)?instagram(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "instagram", tipo: "stories", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)\s+no\s+youtube(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "youtube", tipo: "video", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(shorts?)(?:\s+no\s+)?youtube(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "youtube", tipo: "shorts", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(story|stories|post)(?:\s+no\s+)?youtube(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "youtube", tipo: "post", url
        });
      }
      continue;
    }

    m = l.match(/^[・•\-\*]\s*(\d+)\s+(v[íi]deo|video)(?:\s+no\s+)?kick(?:\s*:.*)?$/);
    if (m) {
      const qtd = Number(m[1]);
      for (let j = 0; j < qtd; j++) {
        atividades.push({
          id: uuid(), data: dataISO, categoria: "conteudo",
          plataforma: "kick", tipo: "video", url
        });
      }
      continue;
    }
  }

  return atividades;
}

// Test with user's data
const userData = `Tiktok (Pontos)

・1 Vídeo no TikTok: https://vt.tiktok.com/ZS5T6TCe3/
・1 Stories no TikTok: https://vt.tiktok.com/ZSHormUobKsJU-oW1ys/

Kwai (Pontos)

・1 Vídeo no Kwai: https://kwai-video.com/p/Sv2qCMZi
・1 Story no Kwai: https://kwai-video.com/p/vt9ChlQi

Instagram (Pontos)

・1 Postagem no feed no Instagram: https://www.instagram.com/p/DThShCGjVPE/?igsh=NW5vOXBpcGM4azQ2
・1 Reels no Instagram: https://www.instagram.com/reel/DTdtvXIER8c/?igsh=NnQzdWJhend4eGpn
・1 Story no Instagram: https://www.instagram.com/stories/trovaomt9976/3810408753250779605?utm_source=ig_story_item_share&igsh=cDdteXp0NHU1d2V6

Youtube (Pontos)

・1 Vídeo no Youtube: https://youtu.be/C2xB6AplY9o
・1 Shorts no Youtube: https://www.youtube.com/shorts/y7gqDCMtuY0
・1 Story no Youtube: https://www.youtube.com/post/Ugkxs2p40U5dxe0PzKdf2et7syH5gwhPzEej`;

console.log("=".repeat(80));
console.log("TESTE DO PARSER MELHORADO");
console.log("=".repeat(80));
console.log();

const atividades = parseBulkInput(userData, "2026-01-16");

console.log(`✅ RESULTADO: ${atividades.length} atividades reconhecidas\n`);

if (atividades.length > 0) {
    const grupos = {};
    atividades.forEach(a => {
        const label = `${a.plataforma.toUpperCase()} - ${a.tipo.toUpperCase()}`;
        if (!grupos[label]) grupos[label] = [];
        grupos[label].push(a);
    });
    
    console.log("📊 ATIVIDADES RECONHECIDAS:\n");
    let totalPontos = 0;
    Object.keys(grupos).sort().forEach(key => {
        const ativs = grupos[key];
        const pontos = ativs.length * 3;
        totalPontos += pontos;
        console.log(`✓ ${key} (x${ativs.length}): ${pontos} pontos`);
    });
    
    console.log(`\n🎯 TOTAL: ${atividades.length} publicações = ${totalPontos} pontos`);
    console.log(`\n✅ Esperado: 8 publicações = 24 pontos`);
} else {
    console.log("❌ NENHUMA ATIVIDADE RECONHECIDA");
}

console.log("\n" + "=".repeat(80));
