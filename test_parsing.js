// Teste do sistema de parsing melhorado
function uuid(){
    return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

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

function parseBulkInput(text, dataISO) {
    const linhas = text.split("\n").map(l => l.trim()).filter(Boolean);
    const atividades = [];

    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i];
        const l = linha.toLowerCase();

        // NOVO: Parser para formato com timestamp [HH:MM]Streamer: Tipo Plataforma URL
        // Exemplos:
        // "[21:00]Ragnar Stormborn #2879: Tiktok vídeo https://vt.tiktok.com/ZS5KryGMu/"
        // "[21:01]Ragnar Stormborn #2879: YouTube Shorts https://youtube.com/shorts/ZetIGXbexI4"
        let timestampMatch = linha.match(/^\[(\d{2}):(\d{2})\]\s*[^:]+:\s*(.+)$/);
        if (timestampMatch) {
            const activityText = timestampMatch[3];
            const urlMatch = activityText.match(/(https?:\/\/[^\s]+)/);
            const url = urlMatch ? urlMatch[1] : null;
            const platform = getPlatformaFromUrl(url);
            
            if (platform) {
                // Extrair tipo da descrição da atividade
                let tipo = 'video';
                const actLower = activityText.toLowerCase();
                
                if (actLower.includes('story') || actLower.includes('stories')) {
                    tipo = 'stories';
                } else if (actLower.includes('reel') || actLower.includes('reels')) {
                    tipo = 'reels';
                } else if (actLower.includes('short') || actLower.includes('shorts')) {
                    tipo = 'shorts';
                } else if (actLower.includes('feed')) {
                    tipo = 'feed';
                } else if (actLower.includes('post')) {
                    tipo = 'post';
                }
                
                atividades.push({
                    id: uuid(),
                    data: dataISO,
                    categoria: "conteudo",
                    plataforma: platform,
                    tipo: tipo,
                    url: url,
                    linha_original: linha
                });
                continue;
            }
        }

        // Pular linhas que são apenas timestamps
        if (l.match(/^\[\d{2}:\d{2}\]$/)) continue;
        if (l.match(/^\d{2}:\d{2}$/)) continue;

        // LIVE (ex: "live 1: 4h", "live: 2.5h", "4h live")
        let m = l.match(/(?:live\s*\d*[:\-]?\s*(\d+(?:\.\d+)?)h|(\d+(?:\.\d+)?)h?\s*live)/);
        if (m) {
            const horas = Number(m[1] || m[2]);
            atividades.push({
                id: uuid(),
                data: dataISO,
                categoria: "live",
                plataforma: "twitch",
                tipo: "live",
                horas: horas,
                linha_original: linha
            });
            continue;
        }

        // VIEWS (ex: "views youtube: 1200", "1200 views", "youtube views: 1200")
        m = l.match(/(?:views?\s*(youtube|tiktok|kwai|instagram|kick)?\s*[:\-]?\s*(\d+)|(\d+)\s*views?\s*(youtube|tiktok|kwai|instagram|kick)?|(youtube|tiktok|kwai|instagram|kick)\s*views?\s*[:\-]?\s*(\d+))/);
        if (m) {
            const views = Number(m[2] || m[3] || m[6]);
            const plataforma = (m[1] || m[4] || m[5] || "youtube").toLowerCase();
            atividades.push({
                id: uuid(),
                data: dataISO,
                categoria: "views",
                plataforma: plataforma,
                tipo: "video",
                views: views,
                linha_original: linha
            });
            continue;
        }

        // RAID (ex: "raid twitch x1", "raid x2", "2 raids")
        m = l.match(/(?:raid\s*(twitch)?\s*x?(\d+)?|(\d+)\s*raids?)/);
        if (m) {
            const qtd = Number(m[2] || m[3] || 1);
            for (let i = 0; i < qtd; i++) {
                atividades.push({
                    id: uuid(),
                    data: dataISO,
                    categoria: "raid",
                    plataforma: "twitch",
                    tipo: "raid",
                    linha_original: linha
                });
            }
            continue;
        }

        // INDICAÇÃO (ex: "indicação x3", "3 indicações", "referral x2")
        m = l.match(/(?:indica[cç][aã]o\s*x?(\d+)|(\d+)\s*indica[cç][õo]es?|referrals?\s*x?(\d+)|(\d+)\s*referrals?)/);
        if (m) {
            const qtd = Number(m[1] || m[2] || m[3] || m[4]);
            atividades.push({
                id: uuid(),
                data: dataISO,
                categoria: "codigo",
                plataforma: "codigo",
                tipo: "indicacao",
                quantidade: qtd,
                linha_original: linha
            });
            continue;
        }

        // CONTEÚDO - Padrão expandido para capturar mais variações
        m = l.match(/(?:(\d+)\s*)?(vídeo|video|story|stories|reel|reels|short|shorts|post|feed)\s*(tik\s*tok|tiktok|instagram|youtube|kwai|kick)|(?:(\d+)\s*)?(tik\s*tok|tiktok|instagram|youtube|kwai|kick)\s*(vídeo|video|story|stories|reel|reels|short|shorts|post|feed)/);
        if (m) {
            const qtd = Number(m[1] || m[4] || 1);
            let tipo = m[2] || m[6];
            let plataforma = m[3] || m[5];

            // Normalizar plataforma
            plataforma = plataforma.replace(/\s+/g,"").toLowerCase();
            if (plataforma.includes("tik")) plataforma = "tiktok";

            // Normalizar tipo
            tipo = tipo.replace("vídeo","video").toLowerCase();
            if (tipo === "story") tipo = "stories";
            if (tipo === "reel") tipo = "reels";
            if (tipo === "short") tipo = "shorts";
            if (tipo === "post" || tipo === "feed") {
                tipo = (plataforma === "instagram" ? "feed" : "post");
            }

            for (let i = 0; i < qtd; i++) {
                atividades.push({
                    id: uuid(),
                    data: dataISO,
                    categoria: "conteudo",
                    plataforma,
                    tipo,
                    linha_original: linha
                });
            }
            continue;
        }

        // PADRÃO ESPECÍFICO: Linhas com apenas nome de usuário (ignorar)
        if (l.match(/^[a-zA-Z0-9_]+$/)) {
            continue;
        }

        // PADRÃO ESPECÍFICO: Linhas com timestamp (ignorar)
        if (l.match(/^\[\d{2}:\d{2}\]/) || l.match(/^\d{2}:\d{2}/)) {
            continue;
        }

        // PADRÃO ESPECÍFICO: URLs (ignorar para pontuação, mas pode ser útil para referência)
        if (l.match(/^https?:\/\//) || l.match(/^www\./) || l.includes('.com') || l.includes('.br')) {
            continue;
        }

        // PADRÃO ESPECÍFICO: Mensagens do Discord/WhatsApp com nome de usuário
        m = l.match(/(?:\[\d{2}:\d{2}\])?\s*[a-zA-Z0-9_]+\s*:\s*(.+)/);
        if (m) {
            // Recursivamente processar o conteúdo após o nome do usuário
            const subAtividades = parseBulkInput(m[1], dataISO);
            atividades.push(...subAtividades);
            continue;
        }
    }

    return atividades;
}

// Dados de teste - novo formato com timestamp e URL
const testData = `]Ragnar Stormborn #2879: Kwai vídeo https://k.kwai.com/p/NEcCfsGg
[20:56]Ragnar Stormborn #2879: Instagram Stories https://www.instagram.com/stories/ragnarstormborn_12/3810952823643683962?utm_source=ig_story_item_share&igsh=Ym44aHkyZG9sYzM5
[20:57]Ragnar Stormborn #2879: Instagram feed https://www.instagram.com/p/DTjOzUMDbms/?igsh=dGM5dngzMGR2MXky
[20:58]Ragnar Stormborn #2879: Instagram reel https://www.instagram.com/reel/DTjODXQDSWs/?igsh=MTQ0dHRqM3FvYWNsOQ==
[20:59]Ragnar Stormborn #2879: Tiktok Stories https://vt.tiktok.com/ZSHoBWPfbWo4Q-Xa0Jc/
[21:00]Ragnar Stormborn #2879: Tiktok vídeo https://vt.tiktok.com/ZS5KryGMu/
[21:01]Ragnar Stormborn #2879: YouTube Shorts https://youtube.com/shorts/ZetIGXbexI4?si=D4ZEOcNY9rAW_xDo
[21:01]Ragnar Stormborn #2879: YouTube video https://youtu.be/LyKxAiC1jJ0?si=msYxlDDeplaJ0MEI`;

console.log("🐃 TESTE DO SISTEMA DE PARSING ATLANTA BUFFALO\n");
console.log("📝 DADOS DE ENTRADA:");
console.log(testData);
console.log("\n" + "=".repeat(60) + "\n");

const atividades = parseBulkInput(testData, "2026-01-15");

console.log(`📊 RESULTADO: ${atividades.length} atividades reconhecidas\n`);

if (atividades.length > 0) {
    const grupos = {};
    atividades.forEach(a => {
        const key = `${a.categoria}-${a.plataforma}-${a.tipo}`;
        if (!grupos[key]) grupos[key] = [];
        grupos[key].push(a);
    });
    
    console.log("✅ ATIVIDADES POR CATEGORIA:\n");
    Object.keys(grupos).forEach(key => {
        const ativs = grupos[key];
        const [categoria, plataforma, tipo] = key.split('-');
        console.log(`${categoria.toUpperCase()}: ${plataforma} - ${tipo} (${ativs.length}x)`);
        
        if (categoria === 'live') {
            ativs.forEach(a => console.log(`   └ ${a.horas}h (linha: "${a.linha_original}")`));
        } else if (categoria === 'views') {
            ativs.forEach(a => console.log(`   └ ${a.views} views (linha: "${a.linha_original}")`));
        } else if (categoria === 'codigo') {
            ativs.forEach(a => console.log(`   └ x${a.quantidade || 1} (linha: "${a.linha_original}")`));
        } else {
            console.log(`   └ Linhas: ${ativs.map(a => `"${a.linha_original}"`).join(', ')}`);
        }
        console.log("");
    });
} else {
    console.log("❌ NENHUMA ATIVIDADE RECONHECIDA");
}

console.log("🔥 TESTE CONCLUÍDO!");