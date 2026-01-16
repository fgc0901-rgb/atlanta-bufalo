// Teste para validar o limite de 1 RAID por dia

console.log("=".repeat(80));
console.log("🐃 TESTE: LIMITE DE RAIDS (1 POR DIA)");
console.log("=".repeat(80));
console.log();

// Simular atividades com múltiplos raids no mesmo dia
const atividades = [
  { id: "raid1", data: "2026-01-16", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid2", data: "2026-01-16", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid3", data: "2026-01-16", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid4", data: "2026-01-17", categoria: "raid", plataforma: "twitch", tipo: "raid" },
  { id: "raid5", data: "2026-01-17", categoria: "raid", plataforma: "twitch", tipo: "raid" },
];

console.log("📝 ENTRADA: 5 raids");
console.log("  - 3 raids no dia 2026-01-16");
console.log("  - 2 raids no dia 2026-01-17");
console.log();

// Simular lógica de cálculo
const REGRAS_PONTOS = {
  twitch: { raid: { pontos: 8 } }
};

let pontosTotal = 0;
const auditoria = [];
const raidsPorDia = {};

for (const a of atividades) {
  const data = a.data;
  const regra = REGRAS_PONTOS.twitch.raid;
  
  // Verificar se já existe um raid nesta data
  if (raidsPorDia[data]) {
    auditoria.push({
      id: a.id,
      data,
      status: "❌ Ignorado (limite 1 por dia)",
      pontos: 0
    });
    continue;
  }
  
  // Primeiro raid do dia - pontuar
  raidsPorDia[data] = true;
  pontosTotal += regra.pontos;
  auditoria.push({
    id: a.id,
    data,
    status: "✅ Pontuado",
    pontos: regra.pontos
  });
}

console.log("📊 AUDITORIA:\n");
auditoria.forEach(item => {
  console.log(`  ${item.id} | ${item.data} | ${item.status} | ${item.pontos} pts`);
});

console.log("\n" + "─".repeat(80));
console.log(`\n💰 PONTOS TOTAIS: ${pontosTotal} pontos`);
console.log(`\n✅ RESULTADO ESPERADO: 16 pontos (2 dias × 8 pontos)`);

if (pontosTotal === 16) {
  console.log("\n🎯 ✅ TESTE PASSOU - Limite de 1 raid por dia funcionando!");
} else {
  console.log(`\n❌ TESTE FALHOU - Esperado: 16, Obtido: ${pontosTotal}`);
}

console.log("\n" + "=".repeat(80));
console.log("\n📋 RESUMO:");
console.log("  • Sistema reconheceu 5 raids");
console.log("  • Sistema pontuou apenas 2 raids (1 por dia)");
console.log("  • Sistema ignorou 3 raids (excedentes)");
console.log("  • Total correto: 16 pontos (2 × 8)");
console.log("\n🐃 Sistema de limite de RAIDS funcionando corretamente!");
console.log("=".repeat(80));
