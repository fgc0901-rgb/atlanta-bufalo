# Pontuação: Stories Twitch (3 pts, 1/dia) + Indicação (codiguin) 5 pts/indicado + UX Mensagem Épica

## 📝 Resumo

Atualização completa do sistema de pontuação com:
- **Centralizaçao de regras** em módulo `score.js` com auditoria de identificação de limites
- **Stories no Twitch**: 3 pontos; pontua apenas **1 por dia** (excedentes marcados na auditoria)
- **Código de Indicação (Allowist/codiguin)**: 5 pontos **por indicado** (usa campo `quantidade`)
- **UX aprimorada**: Campo para personalizar **imagem da mensagem épica** (upload/URL), inserida no topo da mensagem gerada
- **Testes abrangentes**: Validação local de todos os cenários, incluindo limite de Twitch Stories

## 🔧 Alterações Técnicas

### 1. Módulo de Pontuação (`score.js` — novo)
- Centraliza `REGRAS_PONTOS` com regras atualizadas.
- Função `calcularPontuacao()` que retorna:
  - `pontosPeriodo`, `total`, `grupos` (por tipo/plataforma)
  - **`auditoria`**: array detalhando cada atividade com status, pontos e texto da regra aplicada
- Identificação clara de limites: ex. "❌ Ignorado (limite 1/dia) | Regra: Stories no Twitch: 3 pontos; (pontua apenas um por dia)"

### 2. UI — Scoring (`index.html`)
- **Twitch Stories limit**: Implementado em `calcularPeriodoStreamer()` e `calcularDesempenhoIndividual()`.
  - Controle por dia: `tw_stories_${data}` tracking.
  - Auditoria identifica excedentes com mensagem padrão.
- **Indicação multiplicadora**: Campo `quantidade` na atividade multiplica os 5 pontos.

### 3. UI — Imagem da Mensagem Épica (`index.html`)
- Novo painel colapsável **"🖼️ Imagem da Mensagem Épica"** ao lado do emoji.
  - Upload de arquivo (max 2MB, Data URL encoded) ou URL externa.
  - Preview ao vivo do banner.
  - Botão "✖ Remover".
  - Persiste em `localStorage` como `customEpicImage`.
- Integração com `gerarMensagemDiscord()`:
  - Insere `![Mensagem Épica](...)` + URL no topo da mensagem.
  - Discord renderiza/embeds automaticamente.
- Feedback UX com indicador de status (existente).

### 4. Testes Atualizados
- **`test_json_calc.js`**: Refatorado para usar `score.js`.
  - Inclui 2 Twitch Stories no mesmo dia para validar limite.
  - Inclui 3 indicações para validar multiplicador (15 pontos).
  - Imprime auditoria com identificação de regras.
- **`test_twitch_stories_limit.js`** (novo): Teste dedicado.
  - 5 stories em 3 dias (2, 2, 1) → apenas 3 pontuados.
  - Valida auditoria com mensagem de limite.

### 5. Documentação (`README.md`)
- Nova seção **"Atualização de Regras (Jan/2026)"**:
  - Stories no Twitch: 3 pontos; 1/dia.
  - Código Indicação: 5 pontos por indicado.
  - Referência ao módulo `score.js` e comportamento da auditoria.
- Subsection **"Identificação das Regras na Auditoria"**:
  - Descreve como cada atividade na auditoria exibe: data, atividade, status, pontos, regra aplicada.

## ✅ Testes Executados Localmente

Todos os scripts abaixo rodaram com sucesso (sem erros):
```bash
node test_parsing.js
node test_improved_parser.js
node test_json_calc.js          # Agora com score.js
node test_raids_completo.js
node test_raids_limit.js
node test_twitch_stories_limit.js  # Novo
node TEST_FINAL.js
```

**Resultados**:
- ✅ Parser reconhece 8+ plataformas e tipos de conteúdo.
- ✅ Twitch Stories: 5 recebidas → 3 pontuadas (1 por dia) → 9 pontos.
- ✅ Indicação: 3 indicados → 15 pontos (5 × 3).
- ✅ Raids: limite 1/dia respeitado.
- ✅ Auditoria lista todos os itens com regras identificadas.

## 🎨 UX — Imagem da Mensagem Épica

**Layout**:
```
┌─ Seção 3: Gerar Relatório ────────────────────────────────┐
│                                                             │
│  [🔥 GERAR MENSAGEM ÉPICA] [📋 COPIAR PODER]              │
│                                                             │
│  ┌─ 🎉 Personalize o Emoji        ┌─ 🖼️ Imagem Épica     │
│  │  [emoji: 🐃  ] [↻ Padrão]      │  [upload] [URL]  [✖] │
│  │  💡 Cole ou digite...           │  [🔍 Preview]       │
│  └─                                └─                     │
│                                                             │
│  Mensagem Épica (Discord / Relatório)                      │
│  ┌────────────────────────────────────────────────────────┐
│  │ ![Mensagem Épica](data:image/png;base64,...)           │
│  │ https://example.com/banner.png                         │
│  │                                                        │
│  │ # 🐃 **Relatório de Pontuação Streamers Atlanta** 🐃   │
│  │ ### 📦 Pontos por Conteúdo e Ação                      │
│  │ > **Stories TikTok** (x2): 6 pontos                    │
│  │ ...                                                    │
│  └────────────────────────────────────────────────────────┘
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Comportamento**:
- Upload via file input → encoda como Data URL → preview inline + persiste.
- URL externa → preview + validação http/https.
- Remover → limpa storage e preview.
- Mensagem sempre inclui imagem no topo se configurada.

## 📋 Arquivos Modificados/Criados

| Arquivo | Tipo | Mudança |
|---------|------|---------|
| `score.js` | **Novo** | Módulo centralizado de regras e auditoria |
| `test_json_calc.js` | Modificado | Refatorado para usar `score.js` + novos testes |
| `test_twitch_stories_limit.js` | **Novo** | Validação de limite Twitch Stories 1/dia |
| `index.html` | Modificado | UI scoring (Twitch Stories limit), imagem épica, persistência |
| `README.md` | Modificado | Seção regras (Jan/2026) + auditoria behavior |

## 🚀 Como Usar

### Twitch Stories 1/dia
1. Adicione 2+ stories Twitch no mesmo dia.
2. Gere a mensagem.
3. Auditoria mostra: 1º pontuado (3 pts), 2º+ ignorados ("limite 1/dia").

### Indicação com Multiplicador
1. Adicione atividade com `categoria: "codigo"`, `tipo: "indicacao"`, `quantidade: 3`.
2. Sistema pontua 5 × 3 = 15 pontos.

### Imagem Épica
1. Seção 3 → "🖼️ Imagem da Mensagem Épica".
2. Upload arquivo ou cole URL.
3. Veja preview.
4. Clique "🔥 GERAR MENSAGEM ÉPICA".
5. Imagem aparece no topo; copie e cole no Discord.

## ✨ Destaques UX

- **Colapsáveis lado a lado**: Emoji + Imagem em grid responsivo; cabe em mobile.
- **Preview ao vivo**: Vê a banner antes de gerar.
- **Persistência**: Emoji + imagem salvos localmente; carregam ao voltar.
- **Feedback claro**: Indicador de status com mensagens contextuais.
- **Limite visual**: Auditoria identifica regras aplicadas — user vê por que item foi ignorado.

## 🔗 Referências

- PR branch: `feature/twitch-stories-scoring`
- Testes: `/test_*.js` rodando sem erros.
- Docs: `README.md` atualizado.

---

**Pronto para produção** — todos os testes passam e UX mantém alto padrão. 🐃
