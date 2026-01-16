# 🐃 Sistema de Pontuação Streamers Atlanta

Um sistema completo de rastreamento e pontuação para streamers da comunidade Atlanta Búfalo. Organize suas atividades de conteúdo, calcule pontos automaticamente e resgate prêmios incríveis!

---

## 🎯 O Que Este Sistema Faz?

### ✨ Funcionalidades Principais

1. **📝 Reconhecimento Automático de Conteúdo**
   - Detecta automaticamente posts em TikTok, Instagram, YouTube, Kwai e Kick
   - Identifica diferentes tipos: vídeos, stories, reels, shorts, posts
   - Suporta URLs e texto estruturado

2. **🧮 Cálculo Automático de Pontos**
   - 3 pontos por publicação de conteúdo
   - Pontos especiais para lives, views, raids e indicações
   - Histórico mantido automaticamente

3. **💾 Armazenamento Persistente**
   - Seus dados são salvos automaticamente no navegador
   - Sem necessidade de backend ou servidor
   - Backup automático a cada alteração

4. **📊 Relatórios Detalhados**
   - Gere mensagens formatadas para Discord
   - Veja desempenho por período (semanal, mensal)
   - Acompanhe o histórico completo de atividades

5. **🎁 Sistema de Resgates**
   - Resgate prêmios com seus pontos acumulados
   - Ver disponibilidade em tempo real
   - Acompanhe itens já resgatados

---

## 🚀 Como Usar?

### Passo 1: Abra o Arquivo
1. Abra o arquivo `index.html` no seu navegador
2. O sistema carregará automaticamente
3. Você verá a interface com várias seções

### Passo 2: Adicionar um Streamer
1. Na seção **"Adicionar Streamer"** (topo)
2. Digite o nome do streamer
3. Clique em **"➕ ADICIONAR STREAMER"**

```
Exemplo: "Lince" → ➕ ADICIONAR STREAMER
```

### Passo 3: Processar Atividades

Você tem **3 formas** de adicionar atividades:

#### **Opção 1: Texto Estruturado**

Cole o texto com as atividades no campo "📥 Cole seu texto de pontos aqui":

```
Tiktok (Pontos)

・1 Vídeo no TikTok: https://vt.tiktok.com/ZS5T6TCe3/
・1 Stories no TikTok: https://vt.tiktok.com/ZSHormUobKsJU-oW1ys/

Instagram (Pontos)

・1 Postagem no feed no Instagram: https://www.instagram.com/p/DThShCGjVPE/
・1 Reels no Instagram: https://www.instagram.com/reel/DTdtvXIER8c/
・1 Story no Instagram: https://www.instagram.com/stories/trovaomt9976/3810408753250779605

Youtube (Pontos)

・1 Vídeo no Youtube: https://youtu.be/C2xB6AplY9o
・1 Shorts no Youtube: https://www.youtube.com/shorts/y7gqDCMtuY0
```

Clique em **"⚡ PROCESSAR TEXTO ⚡"**

#### **Opção 2: JSON Estruturado**

Cole dados em formato JSON:

```json
{
  "pontosAnteriores": 29,
  "atividades": [
    {"data":"2026-01-16", "categoria":"conteudo", "plataforma":"tiktok", "tipo":"stories"},
    {"data":"2026-01-16", "categoria":"conteudo", "plataforma":"instagram", "tipo":"feed"},
    {"data":"2026-01-16", "categoria":"conteudo", "plataforma":"youtube", "tipo":"video"}
  ]
}
```

Clique em **"📥 IMPORTAR JSON"**

#### **Opção 3: Adicionar Manualmente**

Use a seção **"📺 Adicionar Manualmente"** para:

- Selecionar plataforma (TikTok, Instagram, YouTube, Kwai, Kick)
- Selecionar tipo de conteúdo (Vídeo, Stories, Reels, Shorts, Post)
- Adicionar URLs (opcional)
- Selecionar quantidade
- Clicar em **"✅ ADICIONAR"**

---

## 📋 Formatos Reconhecidos

### Plataformas Suportadas

| Plataforma | Tipos Suportados | Pontos |
|------------|------------------|--------|
| **TikTok** | Vídeo, Stories | 3 pts cada |
| **Instagram** | Feed, Reels, Stories | 3 pts cada |
| **YouTube** | Vídeo, Shorts, Posts | 3 pts cada |
| **Kwai** | Vídeo, Stories | 3 pts cada |
| **Kick** | Vídeo | 3 pts cada |

### Ações Especiais

| Ação | Pontos | Exemplo |
|------|--------|---------|
| **Live** | Variável por hora | `live 1: 4h` = pontos extras |
| **Views** | Variável | `views youtube: 1200` = pontos |
| **Raids** | 8 pontos | `raid x2` = 16 pontos |
| **Indicações** | 5 pontos | `indicação x3` = 15 pontos |

---

## 📊 Visualizando Dados

### 1. Auditoria de Guerra
Veja todas as atividades reconhecidas em tabela detalhada:
- Data
- Plataforma
- Tipo de conteúdo
- Pontos associados

### 2. Desempenho Individual
Selecione um streamer e período para ver:
- Total de pontos
- Número de publicações
- Desempenho semanal/mensal
- Comparação de períodos

### 3. Resumo Épico & Mensagem de Guerra
Gere um relatório completo:
- **Gerar Mensagem**: Cria relatório formatado
- **Copiar para Discord**: Copia a mensagem formatada
- **Ver em Markdown**: Visualiza como ficará no Discord

---

## 💬 Exemplo Completo

### Entrada:
```
Tiktok (Pontos)
・1 Vídeo no TikTok: https://vt.tiktok.com/ZS5T6TCe3/
・1 Stories no TikTok: https://vt.tiktok.com/ZSHormUobKsJU-oW1ys/

Kwai (Pontos)
・1 Vídeo no Kwai: https://kwai-video.com/p/Sv2qCMZi
・1 Story no Kwai: https://kwai-video.com/p/vt9ChlQi

Instagram (Pontos)
・1 Postagem no feed no Instagram: https://www.instagram.com/p/DThShCGjVPE/
・1 Reels no Instagram: https://www.instagram.com/reel/DTdtvXIER8c/
・1 Story no Instagram: https://www.instagram.com/stories/trovaomt9976/

Youtube (Pontos)
・1 Vídeo no Youtube: https://youtu.be/C2xB6AplY9o
・1 Shorts no Youtube: https://www.youtube.com/shorts/y7gqDCMtuY0
・1 POST YouTube: https://www.youtube.com/post/Ugkxs2p40U5dxe0PzKdf2et7syH5gwhPzEej
```

### Processamento:
- ⚡ Clica em "PROCESSAR TEXTO"
- Sistema reconhece 10 atividades
- Calcula 30 pontos (10 × 3)

### Saída (Mensagem Discord):
```
# <a:trofeu1:1432593868439949343> **Relatório de Pontuação Streamers Atlanta** 🐃

### 📦 Pontos por Conteúdo e Ação
> **Vídeo TikTok** (x1): 3 pontos
> **Stories TikTok** (x1): 3 pontos
> **Vídeo Kwai** (x1): 3 pontos
> **Stories Kwai** (x1): 3 pontos
> **Postagem no feed Instagram** (x1): 3 pontos
> **Reels Instagram** (x1): 3 pontos
> **Stories Instagram** (x1): 3 pontos
> **Vídeo YouTube** (x1): 3 pontos
> **Shorts YouTube** (x1): 3 pontos
> **Post YouTube** (x1): 3 pontos

### 📈 Resumo
> **Pontos Deste Ciclo:** `30 pontos`
> **Pontos Anteriores:** `29 pontos`

# 🪙 Pontuação Total Atual: **59 pontos**
🖥️ Total de Publicações no Ciclo: **10**

🎁 PARABÉNS! VOCÊ JÁ PODE RESGATAR:
1. Caixa de Armas Mediana - 50 pontos ✅
2. Cavalo até 500 dólares - 50 pontos ✅
3. 50 Barras de Ouro - 50 pontos ✅
```

---

## 🎁 Sistema de Resgates

### Como Funciona?

1. **Acumule Pontos**: Adicione atividades e ganhe pontos
2. **Veja Disponibilidade**: O sistema mostra automaticamente resgates disponíveis
3. **Resgate**: Entre em contato com a administração para confirmar

### Tabela de Resgates

| Pontos | Item | Categoria |
|--------|------|-----------|
| 50 pts | Caixa de Armas Mediana | Armas |
| 50 pts | Cavalo até 500 dólares | Montaria |
| 50 pts | 50 Barras de Ouro | Moeda |
| 100 pts | Cavalo até 1000 dólares | Montaria |
| 150 pts | Cavalo até 2000 dólares | Montaria Premium |

*Consulte administração para itens adicionais*

---

## ⚙️ Funcionalidades Avançadas

### 1. Remover Atividades
- Clique no botão **"🗑️"** ao lado de qualquer atividade
- Confirm a remoção

### 2. Limpar Tudo de um Streamer
- Selecione o streamer
- Clique em **"🔥 LIMPAR TUDO"** (cuidado!)

### 3. Visualizar Debug
- Veja todas as atividades reconhecidas em JSON
- Útil para troubleshooting

### 4. Comparar Períodos
- Selecione diferentes períodos para comparar
- Veja evolução semanal/mensal

---

## 💡 Dicas e Truques

### ✅ Melhores Práticas

1. **Use o formato com bullet points (・)** para melhor reconhecimento
   ```
   ✅ ・1 Vídeo no TikTok
   ❌ 1 vídeo tiktok
   ```

2. **Inclua URLs** quando possível
   ```
   ・1 Vídeo no TikTok: https://vt.tiktok.com/ZS5T6TCe3/
   ```

3. **Mantenha nomes consistentes** para streamers
   - Use sempre o mesmo nome (ex: "Lince", não "lince" ou "LINCE")

4. **Processe regularmente** em vez de tudo de uma vez
   - Ajuda a manter histórico organizado

### ⚠️ Troubleshooting

**Sistema não reconhece minhas atividades?**
- Verifique se o formato está correto
- Certifique-se de usar "・" ou "•" para bullet points
- Tente adicionar manualmente

**Meus dados desapareceram?**
- Verifique se não limpou o cache do navegador
- Use JSON import para recuperar backup

**Posso exportar meus dados?**
- Copie o JSON do relatório
- Cole em um arquivo .json para backup

---

## 📞 Suporte

- **Problemas técnicos?** Contate a administração
- **Dúvidas sobre pontos?** Veja a tabela de resgates acima
- **Sugestões?** Comunique com o time

---

## 🔄 Estrutura de Dados

Seus dados são armazenados em localStorage no formato:

```json
{
  "streamers": {
    "nome_streamer": {
      "atividades": [
        {
          "id": "uuid",
          "data": "2026-01-16",
          "categoria": "conteudo",
          "plataforma": "tiktok",
          "tipo": "video",
          "url": "https://vt.tiktok.com/..."
        }
      ]
    }
  }
}
```

---

## 🐃 Sistema Búfalo Atlanta

**Versão**: 8.0+  
**Status**: ✅ Produção  
**Última Atualização**: Janeiro 2026

---

## 📝 Changelog Recente

### v8.0 (Jan 2026)
- ✅ Parser completo com suporte a URLs
- ✅ Adição de suporte para Kwai platform
- ✅ Novo formato de mensagem Discord com trophy emoji
- ✅ Sistema de resgates integrado
- ✅ Interface melhorada com tema Buffalo

---

**Powered by 🐃 Sistema Búfalo Atlanta**
