/* ============================================================
   1. DADOS DOS AGENTES E APPS
   ============================================================ */
const RELATORIO_OCORRENCIA = {
  nome: "RELATÓRIO DE OCORRÊNCIA Nº 047/2026",
  tipo: "CONFIDENCIAL — NÍVEL 3",
  conteudo: `RELATÓRIO DE OCORRÊNCIA Nº 047/2026

Classificação: CONFIDENCIAL — NÍVEL 3 (OLHOS VERMELHOS)
Agente Responsável: ILEGÍVEL
Assunto: Anomalia de Baixa Intensidade.

1. DESCRIÇÃO DO FENÔMENO
Foi reportado ao departamento de monitoramento ***** um padrão de distorção espaço-temporal associado a um indivíduo do sexo masculino, residente na zona sul. A entidade possui o hábito ******** *** ********* densidade geográfica, enquanto os dados de rastreamento indicam que o mesmo permanece inerte em ******* ***** por períodos superiores a 40 minutos.

2. EVIDÊNCIAS COLETADAS
Foram anexados ao processo videos de conversas onde a entidade promete ******, mas sofre um apagão momentâneo assim que a ***** se aproxima. O nível de sanidade dos presentes cai drasticamente a cada iteração do ciclo.

3. DIRETRIZ DE CONTENÇÃO
Recomenda-se não enviar equipes de resgate. O indivíduo não está agressivo; ele apenas se assusta com extrema facilidade. Caso o alvo diga algo, os agentes devem aguardar no mínimo 3 horas antes de iniciar qualquer protocolo de busca.

4. ANEXO — ARQUIVO CRIPTOGRAFADO
Para acessar o laudo completo da perícia técnica, utilize o terminal de acesso restrito da Ordo:
https://www.gatinhos_cerejas.com`
};

const AGENTES = {
  "vitoria": { nomeExibicao: "RENEE_MOREAU", 
                 identificacao: "9068-OR", 
                 contatos: [{ nome: "Poderoso Chefão", 
                              numero: "482731", 
                              audio: "audio/anuncio_data.mp3" }], 
                 conversas: [{ contato: "Poderoso Chefão", 
                               mensagens: ["Bem-vinda ao sistema.", "Aguarde novas instruções."] }], 
                 arquivos: [RELATORIO_OCORRENCIA], 
                 fotos: ["Imagem/papel_ligacao.jpg"] 
             },
  "kami": { nomeExibicao: "WAGNER_DUARTE", 
            identificacao: "8907-OR", 
            contatos: [{ nome: "Poderoso Chefão", 
                         numero: "482731", 
                         audio: "audio/anuncio_data.mp3" }], 
            conversas: [{ contato: "Poderoso Chefão", 
                          mensagens: ["Agente.", "Precisamos da sua lealdade.", "Aguarde."] }], 
            arquivos: [RELATORIO_OCORRENCIA], 
            fotos: ["Imagem/papel_ligacao.jpg"] 
          },
  "marcy": { nomeExibicao: "RANYRA_MOREAU", 
             identificacao: "0724-OR", 
             contatos: [{ nome: "Poderoso Chefão", 
                          numero: "482731", 
                          audio: "audio/anuncio_data.mp3" }], 
             conversas: [{ contato: "Poderoso Chefão", 
                           mensagens: ["Agente.", "Tudo saindo conforme o plano?", "Aguarde novas ordens."] }], arquivos: [RELATORIO_OCORRENCIA], 
             fotos: ["Imagem/papel_ligacao.jpg"] 
           },
  "nailson": { nomeExibicao: "JARVIS_BARTOLOMEU", 
               identificacao: "0359-OR", 
               contatos: [{ nome: "Poderoso Chefão", 
                            numero: "482731", 
                            audio: "audio/anuncio_data.mp3" }],
               conversas: [{ contato: "Poderoso Chefão", 
                             mensagens: ["Agente.", "A Ordem está observando."] }], 
               arquivos: [RELATORIO_OCORRENCIA], 
               fotos: ["Imagem/papel_ligacao.jpg"] 
             },
  "tassio": { nomeExibicao: "NERO", 
                identificacao: "6854-OR", 
                contatos: [{ nome: "Poderoso Chefão", 
                             numero: "482731", 
                             audio: "audio/anuncio_data.mp3" }], 
                conversas: [{ contato: "Poderoso Chefão", 
                              mensagens: ["Agente.", "Verifique os arquivos."] }], 
                arquivos: [RELATORIO_OCORRENCIA], 
                fotos: ["Imagem/papel_ligacao.jpg"] 
            },
  "Teste": { nomeExibicao: "Futuro nome do personagem", 
             identificacao: "0889-OR", 
             contatos: [{ nome: "Poderoso Chefão", 
                          numero: "9999", 
                          audio: "audio/anuncio_data.mp3" }], 
             conversas: [{ contato: "Poderoso Chefão", 
                           mensagens: ["Agente", "Bem-vinda à Ordem."] }], 
             arquivos: [RELATORIO_OCORRENCIA], fotos: ["Imagem/papel_ligacao.jpg"] }
};

const APPS = { navegador: { nome: "Terminal" }, arquivos: { nome: "Arquivos" }, mensagens: { nome: "Mensagens" }, galeria: { nome: "Galeria" }, telefone: { nome: "Telefone" }, configuracoes: { nome: "Configurações" } };

/* ============================================================
   2. TELA DE INTRO E LOGIN
   ============================================================ */
const introBtn = document.getElementById("introBtn");
const introScreen = document.getElementById("introScreen");
if (introBtn && introScreen) {
  introBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    setTimeout(() => { if (window.innerWidth > 500) input.focus(); }, 800);
  });
}

function normalizar(str) { return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " "); }
function identificarAgente(entrada) {
  const tentativa = normalizar(entrada);
  if (!tentativa) return null;

  // A comparação normalizada evita diferenças entre maiúsculas/minúsculas
  // nos nomes cadastrados (por exemplo, "Teste" e "teste").
  const chaveEncontrada = Object.keys(AGENTES).find(
    chave => normalizar(chave) === tentativa
  );

  if (!chaveEncontrada) return null;
  return { chave: chaveEncontrada, ...AGENTES[chaveEncontrada] };
}

let usuarioAtual = null;
const input = document.getElementById("nameInput");
const btn = document.getElementById("unlockBtn");
const erro = document.getElementById("errorMsg");
const lockScreen = document.getElementById("lockScreen");
const homeScreen = document.getElementById("homeScreen");
const homeName = document.getElementById("homeName");

function mostrarErro(msg) { erro.textContent = msg; erro.classList.add("show"); input.classList.add("shake"); setTimeout(() => input.classList.remove("shake"), 400); }
function limparErro() { erro.classList.remove("show"); }

function tentarDesbloquear() {
  const agente = identificarAgente(input.value);
  limparErro();
  if (!agente) { mostrarErro("Agente não reconhecido."); input.select(); return; }
  usuarioAtual = agente;
  const partes = agente.nomeExibicao.split(" ");
  homeName.innerHTML = partes.length > 1 ? `${partes[0]} <span>${partes.slice(1).join(" ")}</span>` : `<span>${partes[0]}</span>`;
  renderizarGaleria();
  renderizarArquivos();
  renderizarMensagens();
  lockScreen.classList.add("hidden");
  setTimeout(() => homeScreen.classList.add("visible"), 300);
}
if (btn) btn.addEventListener("click", tentarDesbloquear);
if (input) {
  input.addEventListener("keydown", e => { if (e.key === "Enter") tentarDesbloquear(); });
  input.addEventListener("input", limparErro);
}

function atualizarRelogio() {
  const agora = new Date();
  const hh = String(agora.getHours()).padStart(2, "0");
  const mm = String(agora.getMinutes()).padStart(2, "0");
  const clockEl = document.getElementById("clock");
  const statusTimeEl = document.getElementById("statusTime");
  if (clockEl) clockEl.textContent = `${hh}:${mm}`;
  if (statusTimeEl) statusTimeEl.textContent = `${hh}:${mm}`;
  const dias = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
  const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const dateEl = document.getElementById("date");
  if (dateEl) dateEl.textContent = `${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]}`;
}
atualizarRelogio();
setInterval(atualizarRelogio, 1000);

/* ============================================================
   3. NAVEGAÇÃO E APPS
   ============================================================ */
const appScreen = document.getElementById("appScreen");
const appTitle = document.getElementById("appTitle");
const appBackBtn = document.getElementById("appBackBtn");

function abrirApp(chave) {
  const app = APPS[chave];
  if (!app) return;
  appTitle.textContent = app.nome;
  document.querySelectorAll(".app-content").forEach(el => el.classList.remove("active"));

  if (chave === "configuracoes") {
    document.getElementById("deviceOwner").textContent = usuarioAtual ? usuarioAtual.identificacao : "---";
    document.getElementById("configContent").classList.add("active");
  } else if (chave === "navegador") {
    document.getElementById("navegadorContent").classList.add("active");
    iniciarAnalise();
  } else if (chave === "galeria") {
    document.getElementById("galeriaContent").classList.add("active");
  } else if (chave === "arquivos") {
    document.getElementById("arquivosContent").classList.add("active");
    renderizarArquivos();
  } else if (chave === "telefone") {
    document.getElementById("telefoneContent").classList.add("active");
  } else if (chave === "mensagens") {
    document.getElementById("mensagensContent").classList.add("active");
  } else {
    document.getElementById("appBodyName").textContent = app.nome;
    document.getElementById("placeholderContent").classList.add("active");
  }
  appScreen.classList.add("open");
}

function fecharApp() { appScreen.classList.remove("open"); }
document.querySelectorAll(".app-icon").forEach(el => el.addEventListener("click", () => abrirApp(el.dataset.app)));
if (appBackBtn) appBackBtn.addEventListener("click", fecharApp);

const navBack = document.getElementById("navBack");
const navHome = document.getElementById("navHome");
const navRecents = document.getElementById("navRecents");
if (navBack) navBack.addEventListener("click", () => { if (appScreen.classList.contains("open")) fecharApp(); });
if (navHome) navHome.addEventListener("click", () => { if (appScreen.classList.contains("open")) fecharApp(); });
if (navRecents) navRecents.addEventListener("click", () => { alert("Nenhum aplicativo recente."); });

/* ============================================================
   4. GALERIA E TELEFONE
   ============================================================ */
function renderizarGaleria() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";
  if (!usuarioAtual.fotos || usuarioAtual.fotos.length === 0) {
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.4); margin-top:20px;'>Nenhuma foto na galeria.</p>";
    return;
  }
  usuarioAtual.fotos.forEach(foto => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.innerHTML = `<img src="${foto}" alt="Foto">`;
    div.addEventListener("click", () => {
      document.getElementById("photoModalImg").src = foto;
      document.getElementById("photoModal").classList.add("open");
    });
    grid.appendChild(div);
  });
}
const photoModalClose = document.getElementById("photoModalClose");
if (photoModalClose) photoModalClose.addEventListener("click", () => { document.getElementById("photoModal").classList.remove("open"); });

const phoneDisplay = document.getElementById("phoneDisplay");
let numeroDigitado = "";
document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    if (numeroDigitado.length < 12) {
      numeroDigitado += btn.dataset.num;
      if (phoneDisplay) phoneDisplay.textContent = numeroDigitado;
    }
  });
});

// Lógica do botão de apagar
const backspaceBtn = document.getElementById("backspaceBtn");
if (backspaceBtn) {
  backspaceBtn.addEventListener("click", () => {
    if (numeroDigitado.length > 0) {
      numeroDigitado = numeroDigitado.slice(0, -1);
      phoneDisplay.textContent = numeroDigitado || "Digite um número";
    }
  });
}

const callBtn = document.getElementById("callBtn");
let audioChamadaAtual = null;

function finalizarChamada(interromperAudio = true) {
  const modal = document.getElementById("callModal");
  if (audioChamadaAtual) {
    if (interromperAudio) {
      audioChamadaAtual.pause();
      audioChamadaAtual.currentTime = 0;
    }
    audioChamadaAtual.onended = null;
    audioChamadaAtual.onerror = null;
    audioChamadaAtual = null;
  }
  modal.classList.remove("open");
  numeroDigitado = "";
  if (phoneDisplay) phoneDisplay.textContent = "Digite um número";
}

if (callBtn) {
  callBtn.addEventListener("click", async () => {
    if (numeroDigitado === "") return;

    const contato = usuarioAtual.contatos.find(c => c.numero === numeroDigitado);
    const modal = document.getElementById("callModal");
    const status = document.getElementById("callStatus");

    if (contato) {
      if (audioChamadaAtual) finalizarChamada();

      document.getElementById("callName").textContent = contato.nome;
      status.textContent = "Conectando...";
      modal.classList.add("open");

      const audio = new Audio(contato.audio);
      audio.preload = "auto";
      audioChamadaAtual = audio;

      audio.addEventListener("playing", () => {
        if (audioChamadaAtual === audio) status.textContent = "Conectado";
      }, { once: true });

      audio.addEventListener("ended", () => {
        if (audioChamadaAtual === audio) finalizarChamada(false);
      }, { once: true });

      audio.addEventListener("error", () => {
        if (audioChamadaAtual === audio) {
          status.textContent = "Falha ao reproduzir áudio";
          setTimeout(() => finalizarChamada(false), 1800);
        }
      }, { once: true });

      try {
        await audio.play();
        if (audioChamadaAtual === audio && !audio.paused) {
          status.textContent = "Conectado";
        }
      } catch (erroAudio) {
        status.textContent = "Não foi possível iniciar a chamada";
        setTimeout(() => {
          if (audioChamadaAtual === audio) finalizarChamada(false);
        }, 1800);
      }
    } else {
      document.getElementById("callName").textContent = "Desconhecido";
      status.textContent = "Chamando...";
      modal.classList.add("open");
      setTimeout(() => {
        if (!audioChamadaAtual) finalizarChamada(false);
      }, 3000);
    }
  });
}

const endCallBtn = document.getElementById("endCallBtn");
if (endCallBtn) endCallBtn.addEventListener("click", () => finalizarChamada(true));

/* ============================================================
   5. MENSAGENS E CONFIGURAÇÕES
   ============================================================ */
function renderizarArquivos() {
  const lista = document.getElementById("fileList");
  if (!lista) return;
  lista.innerHTML = "";

  if (!usuarioAtual.arquivos || usuarioAtual.arquivos.length === 0) {
    lista.innerHTML = "<p style='text-align:center;color:rgba(255,255,255,0.4);margin-top:20px;'>Nenhum arquivo no dispositivo.</p>";
    return;
  }

  usuarioAtual.arquivos.forEach((arquivo, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "file-item";
    item.innerHTML = `<span class="file-item-icon">▤</span><span class="file-item-copy"><strong></strong><small>DOCUMENTO • ${arquivo.tipo}</small></span><span class="file-item-arrow">›</span>`;
    item.querySelector("strong").textContent = arquivo.nome;
    item.addEventListener("click", () => abrirArquivo(index));
    lista.appendChild(item);
  });
}

function abrirArquivo(index) {
  const arquivo = usuarioAtual.arquivos[index];
  if (!arquivo) return;
  document.getElementById("fileModalTitle").textContent = arquivo.nome;
  document.getElementById("fileModalContent").textContent = arquivo.conteudo;
  document.getElementById("fileModal").classList.add("open");
}

const fileModalClose = document.getElementById("fileModalClose");
if (fileModalClose) fileModalClose.addEventListener("click", () => {
  document.getElementById("fileModal").classList.remove("open");
});

function renderizarMensagens() {
  const lista = document.getElementById("chatList");
  if (!lista) return;
  lista.innerHTML = "";
  if (!usuarioAtual.conversas || usuarioAtual.conversas.length === 0) {
    lista.innerHTML = "<p style='text-align:center; color: rgba(255,255,255,0.4); margin-top:20px;'>Nenhuma mensagem.</p>";
    return;
  }
  usuarioAtual.conversas.forEach((conv, index) => {
    const div = document.createElement("div");
    div.className = "chat-item";
        div.innerHTML = `<div class="chat-avatar">${conv.contato.charAt(0)}</div><div class="chat-info"><span class="chat-name">${conv.contato}</span><span class="chat-preview">${conv.mensagens[conv.mensagens.length - 1]}</span></div>`;
    div.addEventListener("click", () => abrirChat(index));
    lista.appendChild(div);
  });
}
function abrirChat(index) {
  const conv = usuarioAtual.conversas[index];
  document.getElementById("chatWithName").textContent = conv.contato;
  const msgContainer = document.getElementById("chatMessages");
  msgContainer.innerHTML = "";
  conv.mensagens.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = msg;
    msgContainer.appendChild(bubble);
  });
  document.getElementById("chatView").classList.add("open");
}
const chatBackBtn = document.getElementById("chatBackBtn");
if (chatBackBtn) chatBackBtn.addEventListener("click", () => { document.getElementById("chatView").classList.remove("open"); });

const formatBtn = document.getElementById("formatBtn");
if (formatBtn) {
  formatBtn.addEventListener("click", () => {
    if (confirm("Formatar o dispositivo? Todos os dados locais serão apagados.")) {
      usuarioAtual = null; input.value = ""; fecharApp(); homeScreen.classList.remove("visible"); lockScreen.classList.remove("hidden"); limparErro();
    }
  });
}

/* ============================================================
   6. TERMINAL DA ORDO REALITAS
   ============================================================ */
const telasOrdo = ["tela-analise", "tela-ordo", "central-comunicacao", "confirmacao-agente", "dossie-agente"];

// Análise com TODAS as etapas originais
const etapasAnalise = [
    { texto: "Verificando dispositivo...", itens: [ { label: "DISPOSITIVO MÓVEL", status: "ok", valor: "DETECTADO" }, { label: "SISTEMA OPERACIONAL", status: "ok", valor: "SEGURO" }, { label: "GRAMPEAMENTO TELEFÔNICO", status: "ok", valor: "NÃO DETECTADO" } ] },
    { texto: "Analisando rede...", itens: [ { label: "PROTOCOLO DE CRIPTOGRAFIA", status: "ok", valor: "AES-256" }, { label: "VAZAMENTO DE DADOS", status: "ok", valor: "0%" }, { label: "CONEXÃO SEGURA", status: "ok", valor: "ESTABELECIDA" } ] },
    { texto: "Captura biométrica...", itens: [ { label: "ESCANEANDO IDENTIDADE", status: "alerta", valor: "..." }, { label: "RECONHECIMENTO FACIAL", status: "ok", valor: "COMPLETO" }, { label: "REGISTRO ARQUIVADO", status: "ok", valor: "✓" } ], camera: true },
    { texto: "Identidade reconhecida...", itens: [ { label: "AGENTE IDENTIFICADO", status: "ok", valor: "0724-OR" }, { label: "ACESSO AUTORIZADO", status: "ok", valor: "✓" }, { label: "CONECTANDO À ORDO", status: "alerta", valor: "..." } ] }
];

function mostrarTela(idTela) {
    telasOrdo.forEach(function (id) {
        const tela = document.getElementById(id);
        if (tela) { tela.hidden = true; tela.style.display = "none"; }
    });
    const telaAtiva = document.getElementById(idTela);
    if (telaAtiva) { telaAtiva.hidden = false; telaAtiva.style.display = "flex"; }
}

let audioCtx = null;

function tocarSom(tipo) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (tipo === "roleta") {
            osc.type = "square";
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(
                450, audioCtx.currentTime + 0.07
            );

            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001, audioCtx.currentTime + 0.07
            );

            osc.start();
            osc.stop(audioCtx.currentTime + 0.07);

        } else if (tipo === "sucesso") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(
                1200, audioCtx.currentTime + 0.1
            );

            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001, audioCtx.currentTime + 0.3
            );

            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);

        } else if (tipo === "digitando") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(900, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(
                150, audioCtx.currentTime + 0.03
            );

            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001, audioCtx.currentTime + 0.03
            );

            osc.start();
            osc.stop(audioCtx.currentTime + 0.03);

        } else if (tipo === "scanner") {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(200, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(
                1000, audioCtx.currentTime + 0.5
            );

            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001, audioCtx.currentTime + 0.5
            );

            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);

        } else if (tipo === "flash") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(1500, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001, audioCtx.currentTime + 0.2
            );

            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        }

    } catch (e) {
        console.log("Erro no áudio:", e);
    }
}

let analiseRodando = false;
function iniciarAnalise() {
    if (analiseRodando) return; 
    analiseRodando = true;
    mostrarTela("tela-analise");

    const statusEl = document.getElementById("analise-status");
    const barra = document.getElementById("analise-barra");
    const lista = document.getElementById("analise-lista");
    const conteudo = document.querySelector(".analise-conteudo");

    lista.innerHTML = "";
    statusEl.textContent = "Iniciando protocolo...";
    barra.style.width = "0%";
    const miraAntiga = document.querySelector(".mira-camera");
    if (miraAntiga) miraAntiga.remove();

    let etapaAtual = 0;
    function rodarEtapa() {
        if (etapaAtual >= etapasAnalise.length) {
            statusEl.textContent = "CONEXÃO ESTABELECIDA";
            barra.style.width = "100%";
            setTimeout(() => {
                analiseRodando = false;
                mostrarTela("tela-ordo");
                iniciarEfeitoDigitacao();
                criarSelosFundo();
            }, 1400);
            return;
        }

        const etapa = etapasAnalise[etapaAtual];
        statusEl.textContent = etapa.texto;

        if (etapa.camera) {
           const mira = document.createElement("div");
           mira.className = "mira-camera";
           mira.id = "mira-foto";
           conteudo.insertBefore(mira, lista);
        }

        etapa.itens.forEach(function (item, i) {
            setTimeout(function () {
                const li = document.createElement("li");
                li.innerHTML = "<span>" + item.label + "</span><span class='" + item.status + "'>" + item.valor + "</span>";
                lista.appendChild(li);
                if (etapa.camera && i === etapa.itens.length - 1) dispararFlash();
            }, i * 700);
        });

        barra.style.width = ((etapaAtual + 1) / etapasAnalise.length) * 100 + "%";
        etapaAtual++;

        setTimeout(function () {
            const mira = document.querySelector(".mira-camera");
            if (mira) mira.remove();
            rodarEtapa();
        }, etapa.itens.length * 700 + 1000);
    }
    rodarEtapa();
}

function dispararFlash() {
    tocarSom('flash');
    if (navigator.vibrate) navigator.vibrate([80, 40, 120]);
    const flash = document.createElement("div");
    flash.className = "flash-foto";
    document.body.appendChild(flash);
    setTimeout(() => {
        const mira = document.getElementById("mira-foto");
        if (mira) {
            const foto = document.createElement("img");
            foto.src = "Imagem/agente_genérico.png"; 
            foto.style.width = "100%"; 
          foto.style.height = "100%"; 
          foto.style.objectFit = "cover"; 
          foto.style.borderRadius = "8px"; 
          foto.style.opacity = "0"; 
          foto.style.transition = "opacity 0.5s ease"; 
          foto.style.filter = "grayscale(100%) contrast(1.5)";
            mira.appendChild(foto);
            setTimeout(() => { foto.style.opacity = "0.8"; }, 50);
        }
    }, 300);
    setTimeout(() => { flash.remove(); }, 700);
}

function iniciarEfeitoDigitacao() {
    const elemento = document.getElementById("texto-terminal");
    if (!elemento) return;
    elemento.textContent = "";
    const textoCompleto = "Você encontrou um canal de comunicação restrito. O acesso não autorizado, você está sendo monitorado.";
    let index = 0;
    function digitar() {
        if (index < textoCompleto.length) {
            elemento.textContent += textoCompleto.charAt(index);
            index++;
            tocarSom('digitando');
            setTimeout(digitar, 50); 
        }
    }
    setTimeout(digitar, 500);
}

function criarSelosFundo() {
    const fundo = document.getElementById("fundo-selos");
    if (!fundo || fundo.innerHTML !== "") return;
    const imagensSelos = ["Imagem/selo1.png", "Imagem/selo2.png", "Imagem/selo3.png", "Imagem/selo4.png", "Imagem/selo5.png"];
    for (let i = 0; i < 15; i++) {
        const selo = document.createElement("img");
        selo.src = imagensSelos[Math.floor(Math.random() * imagensSelos.length)];
        selo.className = "selo-flutuante";
        selo.style.left = Math.random() * 100 + "%";
        const tamanho = 40 + Math.random() * 60;
        selo.style.width = tamanho + "px"; selo.style.height = tamanho + "px";
        const duracao = 10 + Math.random() * 15; selo.style.animationDuration = duracao + "s";
        const atraso = Math.random() * 15; selo.style.animationDelay = atraso + "s";
        fundo.appendChild(selo);
    }
}

const btnAcessar = document.getElementById("acessar-comunicacao");
if (btnAcessar) {
    btnAcessar.addEventListener("click", () => {
        mostrarTela("central-comunicacao");
        document.getElementById("tela-scanner").hidden = false;
        document.getElementById("form-agente").hidden = true;
        iniciarScannerBiometrico();
    });
}

function iniciarScannerBiometrico() {
    const status = 
      document.getElementById("status-scanner");
    const barra = 
      document.getElementById("progresso-scanner");
      barra.style.width = "0%";
    status.textContent = "Iniciando varredura facial...";

    let progresso = 0;
    const intervalo = setInterval(() => {
        progresso += 2; 
        barra.style.width = progresso + "%";
        if (progresso % 10 === 0) tocarSom('scanner');
        if (progresso >= 100) {
            clearInterval(intervalo);
            tocarSom('sucesso');
            setTimeout(() => {
                document.getElementById("tela-scanner").hidden = true;
                document.getElementById("form-agente").hidden = false;
                iniciarMatrix();
            }, 600);
        }
    }, 40);
}

const btnConsultar = document.getElementById("consultar-agente");
if (btnConsultar) {
    btnConsultar.addEventListener("click", () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        audioCtx.resume();
        const numero = document.getElementById("numero-agente").value.trim().toUpperCase();
        const resultadoAgente = document.getElementById("resultado-agente");
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator(); osc.type = "square"; osc.frequency.value = 800;
            osc.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.1);
        } catch (e) {}

        if (numero === usuarioAtual.identificacao) {
            resultadoAgente.style.color = "#36c310";
            resultadoAgente.textContent = "ACESSO CONCEDIDO. CARREGANDO DOSSIÊ...";
            setTimeout(() => {
                resultadoAgente.textContent = "";
                resultadoAgente.style.color = "#ff4444"; 
                mostrarTela("confirmacao-agente");
                iniciarBuscaAgente();
            }, 1200);
        } else {
            resultadoAgente.style.color = "#ff4444";
            resultadoAgente.textContent = "ERRO 404: AGENTE NÃO LOCALIZADO NO BANCO DE DADOS.";
        }
    });
}

function iniciarBuscaAgente() {
    const telaBusca = document.getElementById("tela-busca-agente");
    const telaResultado = document.getElementById("resultado-busca-agente");
    const numeroAleatorio = document.getElementById("numero-aleatorio");
    const statusBusca = document.getElementById("status-busca");
    const caixaNumero = document.getElementById("caixa-numero-busca");

    telaBusca.hidden = false; telaResultado.hidden = true;
    caixaNumero.classList.remove("encontrado");
    statusBusca.textContent = "Acessando banco de dados...";
    let tempoDecorrido = 0; const tempoTotal = 4000;

    const intervaloNumeros = setInterval(() => {
        const num1 = Math.floor(Math.random() * 9000) + 1000;
        const num2 = Math.floor(Math.random() * 99);
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letra = letras.charAt(Math.floor(Math.random() * letras.length));
        numeroAleatorio.textContent = `${num1}-${letra}${num2}`;
    }, 50);

    const intervaloStatus = setInterval(() => {
        tempoDecorrido += 500;
        if (tempoDecorrido === 1000) statusBusca.textContent = "Lendo arquivos confidenciais...";
        if (tempoDecorrido === 2000) statusBusca.textContent = "Cruzando dados de agentes...";
        if (tempoDecorrido === 3000) statusBusca.textContent = "Registro localizado!";
    }, 500);

    setTimeout(() => {
        clearInterval(intervaloNumeros); clearInterval(intervaloStatus);
        numeroAleatorio.textContent = usuarioAtual.identificacao; statusBusca.textContent = "Registro localizado!";
        tocarSom('roleta');
        caixaNumero.classList.add("encontrado"); tocarSom('sucesso');

        setTimeout(() => {
            telaBusca.hidden = true; telaResultado.hidden = false;
            telaResultado.classList.remove("liberado");

            setTimeout(() => {
                const h1 = telaResultado.querySelector("h1"); const p = telaResultado.querySelector("p");
                h1.innerHTML = "IDENTIFICAÇÃO<br>CONFIRMADA";
                p.textContent = "Agente reconhecido pelo sistema";

                setTimeout(() => {
                    telaResultado.classList.add("liberado"); tocarSom('sucesso');
                    setTimeout(() => {
                        document.getElementById("confirmacao-agente").hidden = true;
                        mostrarTela("dossie-agente");
                        document.getElementById("dossie-numero").textContent = usuarioAtual.identificacao;
                        document.getElementById("dossie-nome").textContent = usuarioAtual.nomeExibicao;
                    }, 1500);
                }, 500);
            }, 1000);
        }, 1500);
    }, tempoTotal);
}

const voltarOrdo = document.getElementById("voltar-ordo");
if (voltarOrdo) {
    voltarOrdo.addEventListener("click", () => {
        mostrarTela("tela-ordo");
        document.getElementById("numero-agente").value = "";
        document.getElementById("resultado-agente").textContent = "";
    });
}
const voltarCentral = document.getElementById("voltar-central");
if (voltarCentral) {
    voltarCentral.addEventListener("click", () => {
        mostrarTela("tela-ordo");
        document.getElementById("numero-agente").value = "";
        document.getElementById("resultado-agente").textContent = "";
    });
}

const btnTentarAcesso = document.getElementById("btn-tentar-acesso");
if (btnTentarAcesso) {
    btnTentarAcesso.addEventListener("click", () => {
        document.getElementById("tela-erro-sistema").hidden = false;
    });
}

const btnForcarAcesso = document.getElementById("btn-forcar-acesso");
if (btnForcarAcesso) {
    btnForcarAcesso.addEventListener("click", () => {
        document.getElementById("tela-erro-sistema").hidden = true;

        // Efeito sonoro e Bug
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            osc.type = "sawtooth"; osc.frequency.setValueAtTime(100, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 1);
            osc.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 1);
        } catch(e) {}

        document.body.classList.add("tela-bugada");
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);

        setTimeout(() => {
            document.body.classList.remove("tela-bugada");

            telasOrdo.forEach((id) => {
                const tela = document.getElementById(id);
                if (tela) { tela.hidden = true; tela.style.display = "none"; }
            });

            fecharApp();

            const aviso = document.createElement("div");
            aviso.id = "aviso-expulsao";
            aviso.innerHTML = "⚠️ ACESSO NEGADO. TENTATIVA DE INVASÃO DETECTADA. VOCÊ FOI EXPULSO. ⚠️";
            document.body.appendChild(aviso);

            setTimeout(() => {
                if (aviso) {
                    aviso.style.transition = "opacity 0.5s"; aviso.style.opacity = "0";
                    setTimeout(() => aviso.remove(), 500);
                }
            }, 5000);
        }, 1500); 
    });
}

function iniciarMatrix() {
    const canvas = document.getElementById("matrix-ordo");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight;
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const tamanhoFonte = 14; const colunas = canvas.width / tamanhoFonte;
    const arrayQueda = [];
    for (let i = 0; i < colunas; i++) arrayQueda[i] = 1;

    if (window.matrixInterval) clearInterval(window.matrixInterval);
    window.matrixInterval = setInterval(() => {
        ctx.fillStyle = "rgba(10, 11, 14, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#c43b3b"; ctx.font = tamanhoFonte + "px monospace";
        for (let i = 0; i < arrayQueda.length; i++) {
            const texto = letras.charAt(Math.floor(Math.random() * letras.length));
            ctx.fillText(texto, i * tamanhoFonte, arrayQueda[i] * tamanhoFonte);
            if (arrayQueda[i] * tamanhoFonte > canvas.height && Math.random() > 0.975) arrayQueda[i] = 0;
            arrayQueda[i]++;
        }
    }, 50);
}