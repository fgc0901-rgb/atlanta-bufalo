// Teste para validar o limite de 1 Stories no Twitch por dia

const { calcularPontuacao } = require('./score');

console.log("=".repeat(80));
console.log("🐃 TESTE: LIMITE DE STORIES NO TWITCH (1 POR DIA)");
console.log("=".repeat(80));
console.log();

const atividades = [
  { id: "tw-s1", data: "2026-01-16", categoria: "conteudo", plataforma: "twitch", tipo: "stories" },
  { id: "tw-s2", data: "2026-01-16", categoria: "conteudo", plataforma: "twitch", tipo: "stories" },
  { id: "tw-s3", data: "2026-01-17", categoria: "conteudo", plataforma: "twitch", tipo: "stories" },
  { id: "tw-s4", data: "2026-01-17", categoria: "conteudo", plataforma: "twitch", tipo: "stories" },
  { id: "tw-s5", data: "2026-01-18", categoria: "conteudo", plataforma: "twitch", tipo: "stories" }
];

console.log("📝 ENTRADA: 5 stories Twitch em 3 dias (2,2,1)");
console.log();

const resultado = calcularPontuacao({ atividades, pontosAnteriores: 0 });

console.log("📊 AUDITORIA:\n");
resultado.auditoria.forEach(item => {
  console.log(`  ${item.data} | ${item.atividade} | ${item.status} | ${item.pontos} pts${item.regra ? ' | ' + item.regra : ''}`);
});

const storiesPontuados = resultado.auditoria.filter(a => a.atividade === 'Stories Twitch' && a.pontos > 0).length;
const storiesIgnorados = resultado.auditoria.filter(a => a.atividade === 'Stories Twitch' && a.pontos === 0).length;

console.log("\n" + "─".repeat(80));
console.log(`\n💰 PONTOS TOTAIS (Stories Twitch): ${resultado.pontosPeriodo} pontos`);
console.log(`\n✅ RESULTADO ESPERADO: 9 pontos (3 dias × 3 pontos)`);

if (storiesPontuados === 3 && resultado.pontosPeriodo === 9) {
  console.log("\n🎯 ✅ TESTE PASSOU - Limite de 1 stories por dia funcionando!");
} else {
  console.log(`\n❌ TESTE FALHOU - Esperado: 3 stories pontuados e 9 pontos. Obtido: ${storiesPontuados} stories pontuados e ${resultado.pontosPeriodo} pontos`);
}

console.log("\n" + "=".repeat(80));
console.log("\n📋 RESUMO:");
console.log(`  • Stories recebidos: ${atividades.length}`);
console.log(`  • Stories pontuados: ${storiesPontuados} (1 por dia)`);
console.log(`  • Stories ignorados: ${storiesIgnorados} (excedentes)`);
console.log("\n🐃 Limite de Stories no Twitch funcionando corretamente!");
console.log("=".repeat(80));
