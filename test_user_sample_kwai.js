const assert = require('assert');

function uuid(){
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

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

function getPlatformFromText(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (/(tik\s*tok|tiktok)/.test(t)) return 'tiktok';
  if (/instagram/.test(t)) return 'instagram';
  if (/youtube|youtu\.be/.test(t)) return 'youtube';
  if (/\bkwai\b/.test(t)) return 'kwai';
  if (/\bkick\b/.test(t)) return 'kick';
  return null;
}

function parseBulkInput(text, dataISO) {
  const linhas = text.split("\n").map(l => l.trim()).filter(Boolean);
  const atividades = [];

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const l = linha.toLowerCase();

    if (l.match(/^(tiktok|kwai|instagram|youtube|kick|twitch)\s*\(pontos\)$/)) continue;
    if (l.match(/^[a-zA-Z0-9_]+$/)) continue;
    if (l === 'kwai-nuxt-pwa-pc' || l === 'make everyone shine') continue;

    let timestampMatch = linha.match(/^\[(\d{2}):(\d{2})\]\s*[^:]+:\s*(.+)$/);
    if (timestampMatch) {
      const activityText = timestampMatch[3];
      const urlMatch = activityText.match(/(https?:\/\/[^\s]+)/);
      const url = urlMatch ? urlMatch[1] : null;
      const platform = getPlatformaFromUrl(url) || getPlatformFromText(activityText);
      if (platform) {
        let tipo = 'video';
        const actLower = activityText.toLowerCase();
        if (actLower.includes('story') || actLower.includes('stories')) tipo = 'stories';
        else if (actLower.includes('reel') || actLower.includes('reels')) tipo = 'reels';
        else if (actLower.includes('short') || actLower.includes('shorts')) tipo = 'shorts';
        else if (actLower.includes('feed')) tipo = 'feed';
        else if (actLower.includes('post')) tipo = 'post';
        atividades.push({ id: uuid(), data: dataISO, categoria: 'conteudo', plataforma: platform, tipo, url });
        continue;
      }
    }

    if (l.match(/^\[\d{2}:\d{2}\]$/)) continue;
    if (l.match(/^\d{2}:\d{2}$/)) continue;

    let url = null;
    let urlMatch = linha.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      url = urlMatch[1];
    } else if (i + 1 < linhas.length) {
      const nextMatch = linhas[i + 1].match(/^(https?:\/\/[^\s]+)/);
      if (nextMatch) url = nextMatch[1];
    }

    if (url) {
      let platform = getPlatformaFromUrl(url) || getPlatformFromText(linha);
      if (platform) {
        let tipo = getTipoFromUrl(url);
        if (l.includes('story') || l.includes('stories')) tipo = 'stories';
        else if (l.includes('reel')) tipo = 'reels';
        else if (l.includes('short')) tipo = 'shorts';
        else if (l.includes('feed')) tipo = 'feed';
        else if (l.includes('post')) tipo = 'post';
        atividades.push({ id: uuid(), data: dataISO, categoria: 'conteudo', plataforma: platform, tipo, url });
        continue;
      }
    }

    if (l.match(/^https?:\/\//)) {
      const platform = getPlatformaFromUrl(linha);
      if (platform) {
        const tipo = getTipoFromUrl(linha);
        atividades.push({ id: uuid(), data: dataISO, categoria: 'conteudo', plataforma: platform, tipo, url: linha });
      }
      continue;
    }

    // Mensagens de chat simples
    let m = l.match(/(?:\[\d{2}:\d{2}\]\s*)?[^:]+:\s*(.+)/);
    if (m) {
      const sub = parseBulkInput(m[1], dataISO);
      atividades.push(...sub);
      continue;
    }
  }

  return atividades;
}

const raw = `Ragnar Stormborn #2879: Kwai vídeo https://k.kwai.com/p/NEcCfsGg
kwai-nuxt-pwa-pc
kwai-nuxt-pwa-pc
Make Everyone Shine
[20:56]Ragnar Stormborn #2879:
Imagem
[20:56]Ragnar Stormborn #2879: Instagram Stories https://www.instagram.com/stories/ragnarstormborn_12/3810952823643683962?utm_source=ig_story_item_share&igsh=Ym44aHkyZG9sYzM5
Watch this story by RagnarStormborn_12 on Instagram before it disap...
1 Followers, 3 Following, 19 Posts
Imagem
[20:56]Ragnar Stormborn #2879:
Imagem
[20:57]Ragnar Stormborn #2879: Instagram feed https://www.instagram.com/p/DTjOzUMDbms/?igsh=dGM5dngzMGR2MXky 

Instagram
[20:58]Ragnar Stormborn #2879:
Imagem
[20:58]Ragnar Stormborn #2879: Instagram reel https://www.instagram.com/reel/DTjODXQDSWs/?igsh=MTQ0dHRqM3FvYWNsOQ==

Instagram
[20:58]Ragnar Stormborn #2879:
Imagem
[20:59]Ragnar Stormborn #2879: Tiktok Stories https://vt.tiktok.com/ZSHoBWPfbWo4Q-Xa0Jc/
TikTok
TikTok · Ragnar Stromborn
Vê a publicação de Ragnar Stromborn.
TikTok · Ragnar Stromborn
[21:00]Ragnar Stormborn #2879:
Imagem
[21:00]Ragnar Stormborn #2879: Tiktok vídeo https://vt.tiktok.com/ZS5KryGMu/
TikTok
TikTok · Ragnar Stromborn
#condadoatlantarp #condadoatlanta
TikTok · Ragnar Stromborn
[21:00]Ragnar Stormborn #2879:
Imagem
[21:01]Ragnar Stormborn #2879: YouTube Shorts https://youtube.com/shorts/ZetIGXbexI4?si=D4ZEOcNY9rAW_xDo
YouTube
Ragnar Stormborn
#condadoatlanta #rdr2
Imagem
[21:01]Ragnar Stormborn #2879:
Imagem
[21:01]Ragnar Stormborn #2879: YouTube video https://youtu.be/LyKxAiC1jJ0?si=msYxlDDeplaJ0MEI
YouTube
Ragnar Stormborn
#condadoatlanta #rdr2
Imagem
[21:01]Ragnar Stormborn #2879:
Imagem`;

const atividades = parseBulkInput(raw, '2026-01-16');

const grupos = atividades.reduce((acc, a) => {
  const k = `${a.plataforma}-${a.tipo}`;
  acc[k] = (acc[k] || 0) + 1;
  return acc;
}, {});

const esperado = {
  'kwai-video': 1,
  'instagram-stories': 1,
  'instagram-feed': 1,
  'instagram-reels': 1,
  'tiktok-stories': 1,
  'tiktok-video': 1,
  'youtube-shorts': 1,
  'youtube-video': 1
};

try {
  assert.strictEqual(atividades.length, 8, `Esperado 8 atividades, obtido ${atividades.length}`);
  for (const [k, v] of Object.entries(esperado)) {
    assert.strictEqual(grupos[k] || 0, v, `Esperado ${v} para ${k}, obtido ${grupos[k] || 0}`);
  }
  console.log('✅ Teste dataset do usuário (Kwai incluso) OK');
  console.log('   Quebra por plataforma/tipo:', grupos);
} catch (e) {
  console.error('❌ Falha no teste do dataset do usuário:\n', e.message);
  process.exit(1);
}
