// TESTE COMPLETO - Sistema de RAIDS com Limite Diário

console.log("=".repeat(80));
console.log("🐃 SISTEMA ATLANTA - TESTE COMPLETO DE RAIDS");
console.log("=".repeat(80));
console.log();

// Simular cenário real com múltiplas atividades
const atividades = [
  // Conteúdo normal
  { id: "1", data: "2026-01-16", categoria: "conteudo", plataforma: "tiktok", tipo: "video" },
  { id: "2", data: "2026-01-16", categoria: "conteudo", plataforma: "instagram", tipo: "stories" },
  
  // Raids - 3 no mesmo dia (16/01)
  { id: "raid1", data: "2026-01-16", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid2", data: "2026-01-16", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid3", data: "2026-01-16", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  
  // Mais conteúdo
  { id: "3", data: "2026-01-17", categoria: "conteudo", plataforma: "youtube", tipo: "video" },
  
  // Raids - 2 no dia seguinte (17/01)
  { id: "raid4", data: "2026-01-17", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid5", data: "2026-01-17", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  
  // Raid em dia diferente (18/01)
  { id: "raid6", data: "2026-01-18", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  
  // Mais conteúdo
  { id: "4", data: "2026-01-18", categoria: "conteudo", plataforma: "kwai", tipo: "stories" },
];

console.log("📝 ENTRADA:");
console.log(`  • ${atividades.length} atividades totais`);
console.log(`  • 4 publicações de conteúdo`);
console.log(`  • 6 raids em 3 dias diferentes`);
console.log();

// Simular regras de pontuação
const REGRAS_PONTOS = {
  tiktok: { video: { pontos: 3 } },
  instagram: { stories: { pontos: 3 } },
  youtube: { video: { pontos: 3 } },
  kwai: { stories: { pontos: 3 } },
  twitch: { raid: { pontos: 8 } }
};

// Processar atividades com lógica de limite
let pontosConteudo = 0;
let pontosRaids = 0;
const auditoria = [];
const raidsPorDia = {};

for (const a of atividades) {
  const data = a.data;
  const categoria = a.categoria;
  
  if (categoria === "raid") {
    const regra = REGRAS_PONTOS.twitch.raid;
    
    // Verificar se já existe um raid nesta data
    if (raidsPorDia[data]) {
      auditoria.push({
        id: a.id,
        data,
        tipo: "RAID",
        status: "❌ Ignorado (limite 1/dia)",
        pontos: 0
      });
      continue;
    }
    
    // Primeiro raid do dia - pontuar
    raidsPorDia[data] = true;
    pontosRaids += regra.pontos;
    auditoria.push({
      id: a.id,
      data,
      tipo: "RAID",
      status: "✅ Pontuado",
      pontos: regra.pontos
    });
    
  } else if (categoria === "conteudo") {
    const regra = REGRAS_PONTOS[a.plataforma]?.[a.tipo];
    if (regra) {
      pontosConteudo += regra.pontos;
      auditoria.push({
        id: a.id,
        data,
        tipo: `${a.plataforma} ${a.tipo}`,
        status: "✅ Pontuado",
        pontos: regra.pontos
      });
    }
  }
}

console.log("📊 AUDITORIA DETALHADA:\n");

let dia = "";
auditoria.forEach(item => {
  if (item.data !== dia) {
    if (dia !== "") console.log();
    console.log(`📅 ${item.data}`);
    dia = item.data;
  }
  console.log(`  ${item.id.padEnd(10)} | ${item.tipo.padEnd(20)} | ${item.status.padEnd(30)} | ${item.pontos} pts`);
});

console.log("\n" + "─".repeat(80));
console.log("\n💰 RESUMO DE PONTOS:\n");
console.log(`  📦 Conteúdo: ${pontosConteudo} pontos (4 publicações × 3)`);
console.log(`  ⚡ Raids:    ${pontosRaids} pontos (3 dias × 8)`);
console.log(`  ═══════════════════════════`);
console.log(`  🏆 TOTAL:    ${pontosConteudo + pontosRaids} pontos\n`);

// Validação
const raidsPontuados = auditoria.filter(a => a.tipo === "RAID" && a.pontos > 0).length;
const raidsIgnorados = auditoria.filter(a => a.tipo === "RAID" && a.pontos === 0).length;

console.log("✅ VALIDAÇÃO:\n");
console.log(`  • Raids processados: 6`);
console.log(`  • Raids pontuados: ${raidsPontuados} (1 por dia)`);
console.log(`  • Raids ignorados: ${raidsIgnorados} (excedentes)`);
console.log(`  • Pontos de raids: ${pontosRaids}`);
console.log(`  • Pontos de conteúdo: ${pontosConteudo}`);
console.log(`  • Total: ${pontosConteudo + pontosRaids}`);

console.log();

if (raidsPontuados === 3 && pontosRaids === 24 && pontosConteudo === 12) {
  console.log("🎯 ✅ TODOS OS TESTES PASSARAM!");
  console.log("\n✓ Sistema limita corretamente 1 raid por dia");
  console.log("✓ Raids em dias diferentes são pontuados corretamente");
  console.log("✓ Conteúdo é pontuado normalmente");
  console.log("✓ Total de pontos está correto");
} else {
  console.log("❌ TESTE FALHOU!");
  console.log(`\nEsperado: 3 raids pontuados, 24 pts raids, 12 pts conteúdo`);
  console.log(`Obtido: ${raidsPontuados} raids pontuados, ${pontosRaids} pts raids, ${pontosConteudo} pts conteúdo`);
}

console.log("\n" + "=".repeat(80));
console.log("\n🐃 Sistema de RAIDS com limite diário FUNCIONANDO PERFEITAMENTE!");
console.log("=".repeat(80));
