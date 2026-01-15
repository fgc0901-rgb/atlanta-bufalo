# 🐃 Sistema de Pontuação Atlanta Buffalo

Sistema épico de pontuação para streamers com o poder do Búfalo Atlanta. Uma aplicação web completa para gerenciar pontuações de streamers baseada em atividades de conteúdo, lives, views e ações especiais.

## ✨ Características Principais

- 🎯 **Sistema de Pontuação Inteligente**: Calcula automaticamente pontos baseado em diferentes tipos de conteúdo
- 🔴 **Tracking de Lives**: Monitora horas de transmissão ao vivo
- 👁️ **Análise de Views**: Sistema de pontuação baseado em visualizações
- ⚡ **Ações Especiais**: Raids, indicações e outros bônus
- 📊 **Relatórios Épicos**: Geração automática de mensagens para Discord
- 🏆 **Sistema de Resgates**: Integração completa com tabela de recompensas
- 📈 **Performance Tracking**: Análise semanal e mensal de desempenho
- 💾 **Armazenamento Local**: Dados salvos automaticamente no navegador

## 🚀 Como Usar

### Acesso Online
Acesse diretamente: **[https://seu-usuario.github.io/atlanta-buffalo](https://seu-usuario.github.io/atlanta-buffalo)**

### Instalação Local
1. Faça o download do projeto
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Comece a usar imediatamente!

## 📋 Funcionalidades

### 🛡️ Gerenciamento de Streamers
- Adicionar/remover streamers
- Configurar pontuação anterior
- Múltiplos streamers simultâneos

### 📦 Processamento de Conteúdo
- **Reconhecimento Automático**: Cola logs do Discord/WhatsApp
- **Plataformas Suportadas**: TikTok, Instagram, YouTube, Kwai, Kick, Twitch
- **Tipos de Conteúdo**: Vídeos, Stories, Reels, Shorts, Posts

### 🔥 Sistema de Pontuação

#### Conteúdo (3 pontos cada, limite 1 por dia por plataforma)
- Vídeo TikTok/Kwai/YouTube/Kick
- Stories Instagram/TikTok/YouTube/Twitch
- Reels Instagram
- Shorts YouTube
- Posts Instagram/YouTube

#### Lives (1 ponto por hora, máximo 20)
- Mínimo 1 hora para pontuar
- Qualquer plataforma de streaming

#### Views (pontuação escalonada)
- Menos de 100: 2 pontos
- 100-349: 4 pontos
- 350-499: 6 pontos
- 500-799: 8 pontos
- 800-999: 10 pontos
- 1000-1999: 12 pontos
- 2000-2999: 24 pontos
- 3000+: 36 pontos

#### Ações Especiais
- Raid Twitch: 8 pontos
- Indicação: 5 pontos cada

### 🎁 Sistema de Resgates
Recompensas automáticas baseadas na pontuação total:
- **PIX**: 200 reais (600 pontos)
- **Caixas de Armas**: 20-100 pontos
- **Personagem**: 100-600 pontos
- **Cavalos**: 50-200 pontos
- **Barras de Ouro**: 30-200 pontos
- **Armas**: 40-500 pontos
- **Carroças**: 200-500 pontos
- **Heranças VIP**: 100-500 pontos

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Armazenamento**: LocalStorage com sistema de backup
- **Performance**: Otimizado com GPU acceleration e caching
- **Responsivo**: Design adaptável para desktop e mobile

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🎨 Design

- **Tema**: Dark mode épico com elementos do Búfalo Atlanta
- **Animações**: Partículas flutuantes e efeitos visuais
- **UX**: Interface intuitiva com feedback visual
- **Performance**: 60fps com otimizações avançadas

## 📊 Exemplos de Uso

### Entrada de Dados
```
Lince
: 1 vídeo tik tok
: 1 story Instagram
: 1 reel Instagram
: 1 POST YouTube
: live 1: 4h
: views youtube: 1200
: raid twitch x2
: indicação x3
```

### Saída Gerada
```
# 🐃 RELATÓRIO ÉPICO - STREAMERS ATLANTA 🐃
## ⚔️ STREAMER: Lince
## 📅 PERÍODO: 2026-01-15 (Dia)

### 🔴 BATALHAS AO VIVO
Live 1: 🎬 4h → 4 pontos

### 👁️ PODER DAS VISUALIZAÇÕES
YouTube: 1200 views → 12 pontos

### ⚡ AÇÕES ESPECIAIS
Raid: 16 pontos
Indicação: 15 pontos

### 📦 ARSENAL DE CONTEÚDO
Vídeo TikTok (x1): 3 pontos
Stories Instagram (x1): 3 pontos
Reels Instagram (x1): 3 pontos
Post YouTube (x1): 3 pontos

---
### 📊 RESUMO DO CICLO
🔥 Pontos deste Ciclo: 59 pontos
🏆 Pontos Anteriores: +0 pontos
# 👑 PONTUAÇÃO TOTAL: 59 PONTOS 👑
🎯 Total de Publicações: 4

🎁 PARABÉNS! VOCÊ JÁ PODE RESGATAR:
1. 1 Caixa de Armas Profissional - 50 pontos ✅
2. 1 Caixa de Armas Mediana - 30 pontos ✅

🐃 Powered by Sistema Búfalo Atlanta
```

## 🚀 Deploy no GitHub Pages

### Método 1: Upload via VSCode
1. **Instale o VSCode**: [Download aqui](https://code.visualstudio.com/)
2. **Clone/Download**: Baixe este repositório
3. **Abra no VSCode**: File → Open Folder
4. **Instale Git**: [Download aqui](https://git-scm.com/)
5. **Configure Git**:
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seu@email.com"
   ```
6. **Crie repositório no GitHub**: [github.com/new](https://github.com/new)
7. **Conecte e envie**:
   ```bash
   git init
   git add .
   git commit -m "🐃 Deploy inicial Atlanta Buffalo"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/atlanta-buffalo.git
   git push -u origin main
   ```
8. **Ative GitHub Pages**: Settings → Pages → Source: Deploy from branch → main → Save

### Método 2: Upload Direto GitHub
1. **Crie repositório**: [github.com/new](https://github.com/new)
2. **Nome**: `atlanta-buffalo`
3. **Upload files**: Arraste `index.html` e `README.md`
4. **Commit**: "🐃 Deploy inicial Atlanta Buffalo"
5. **Ative Pages**: Settings → Pages → main branch

### Método 3: GitHub Desktop
1. **Instale GitHub Desktop**: [desktop.github.com](https://desktop.github.com/)
2. **Clone repositório**: File → Clone repository
3. **Copie arquivos**: Para a pasta local
4. **Commit & Push**: Via interface gráfica
5. **Ative Pages**: No site do GitHub

## 🤝 Contribuição

Este é um projeto open source! Contribuições são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- **Issues**: Reporte bugs ou solicite features
- **Discussões**: Compartilhe ideias e sugestões
- **Wiki**: Documentação detalhada (em breve)

## 🏆 Créditos

Desenvolvido com ❤️ para a comunidade de streamers Atlanta.

**Powered by Sistema Búfalo Atlanta** 🐃

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐