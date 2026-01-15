# 🚀 Guia de Instalação - Atlanta Buffalo

Este guia te ajudará a colocar o Sistema Atlanta Buffalo online usando GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub (gratuita)
- Navegador web moderno
- **Opcional**: VSCode + Git para método avançado

## 🎯 Método 1: Upload Direto (Mais Fácil)

### Passo 1: Criar Repositório
1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"New"** (verde) ou acesse [github.com/new](https://github.com/new)
3. **Repository name**: `atlanta-buffalo`
4. **Description**: `Sistema épico de pontuação para streamers`
5. Marque **"Public"**
6. Marque **"Add a README file"**
7. Clique **"Create repository"**

### Passo 2: Upload dos Arquivos
1. No seu novo repositório, clique **"uploading an existing file"**
2. Arraste ou selecione os arquivos:
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `_config.yml`
3. **Commit message**: `🐃 Deploy inicial Atlanta Buffalo`
4. Clique **"Commit changes"**

### Passo 3: Ativar GitHub Pages
1. No repositório, clique na aba **"Settings"**
2. Role para baixo até **"Pages"** (menu lateral esquerdo)
3. **Source**: Selecione **"Deploy from a branch"**
4. **Branch**: Selecione **"main"**
5. **Folder**: Deixe **"/ (root)"**
6. Clique **"Save"**

### Passo 4: Acessar o Site
1. Aguarde 2-5 minutos para o deploy
2. Acesse: `https://SEU-USUARIO.github.io/atlanta-buffalo`
3. **Pronto!** 🎉

---

## 🛠️ Método 2: VSCode + Git (Avançado)

### Passo 1: Instalar Ferramentas
1. **VSCode**: [code.visualstudio.com](https://code.visualstudio.com/)
2. **Git**: [git-scm.com](https://git-scm.com/)
3. **GitHub Desktop** (opcional): [desktop.github.com](https://desktop.github.com/)

### Passo 2: Configurar Git
Abra o terminal/prompt e execute:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Passo 3: Criar Repositório Local
1. Crie uma pasta `atlanta-buffalo`
2. Copie todos os arquivos do projeto para esta pasta
3. Abra a pasta no VSCode
4. Abra o terminal integrado (Ctrl+`)

### Passo 4: Inicializar Git
```bash
git init
git add .
git commit -m "🐃 Deploy inicial Atlanta Buffalo"
```

### Passo 5: Conectar ao GitHub
1. Crie repositório no GitHub (mesmo nome)
2. No terminal:
```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/atlanta-buffalo.git
git push -u origin main
```

### Passo 6: Ativar Pages
Siga o **Passo 3** do Método 1.

---

## 🔧 Método 3: GitHub Desktop (Interface Gráfica)

### Passo 1: Instalar GitHub Desktop
1. Baixe em [desktop.github.com](https://desktop.github.com/)
2. Instale e faça login com sua conta GitHub

### Passo 2: Criar Repositório
1. **File** → **New repository**
2. **Name**: `atlanta-buffalo`
3. **Description**: `Sistema épico de pontuação para streamers`
4. **Local path**: Escolha onde salvar
5. Clique **"Create repository"**

### Passo 3: Adicionar Arquivos
1. Copie todos os arquivos do projeto para a pasta criada
2. No GitHub Desktop, você verá os arquivos na aba **"Changes"**
3. **Summary**: `🐃 Deploy inicial Atlanta Buffalo`
4. Clique **"Commit to main"**

### Passo 4: Publicar
1. Clique **"Publish repository"**
2. Desmarque **"Keep this code private"**
3. Clique **"Publish repository"**

### Passo 5: Ativar Pages
Siga o **Passo 3** do Método 1.

---

## 🎨 Personalização

### Alterar URL
No arquivo `_config.yml`, mude:
```yaml
url: "https://SEU-USUARIO.github.io"
baseurl: "/atlanta-buffalo"
```

### Domínio Personalizado
1. Compre um domínio
2. Em **Settings** → **Pages** → **Custom domain**
3. Digite seu domínio
4. Crie arquivo `CNAME` com seu domínio

---

## 🔍 Verificação

### ✅ Checklist de Deploy
- [ ] Repositório criado no GitHub
- [ ] Arquivos enviados (index.html, README.md, etc.)
- [ ] GitHub Pages ativado
- [ ] Site acessível via URL
- [ ] Funcionalidades testadas

### 🐛 Problemas Comuns

**Site não carrega:**
- Aguarde 5-10 minutos após ativar Pages
- Verifique se o repositório é público
- Confirme se o arquivo `index.html` está na raiz

**404 Error:**
- Verifique a URL: `https://usuario.github.io/atlanta-buffalo`
- Confirme o nome do repositório
- Verifique se Pages está ativado

**Funcionalidades não funcionam:**
- Teste em modo incógnito
- Limpe cache do navegador
- Verifique console do navegador (F12)

---

## 📞 Suporte

### 🆘 Precisa de Ajuda?
1. **Issues**: Abra uma issue no repositório
2. **Discussões**: Use a aba Discussions
3. **Email**: Contate o suporte técnico

### 📚 Recursos Úteis
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [VSCode Git Guide](https://code.visualstudio.com/docs/editor/versioncontrol)

---

## 🎉 Parabéns!

Seu Sistema Atlanta Buffalo está online! 🐃

**Próximos passos:**
1. Teste todas as funcionalidades
2. Compartilhe com sua equipe
3. Personalize conforme necessário
4. Contribua com melhorias

**URL do seu site:** `https://SEU-USUARIO.github.io/atlanta-buffalo`

---

*Powered by Sistema Búfalo Atlanta* 🐃