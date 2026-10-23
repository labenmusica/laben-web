(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let language = "es";
  let audioContext = null;
  let isPlaying = false;
  let timerId = null;
  let stepIndex = 0;
  const pattern = Array(16).fill(false);
  [0, 4, 8, 12].forEach(i => pattern[i] = true);
  [2, 6, 10, 14].forEach(i => pattern[i] = true);
  const sequencer = $("#sequencer");
  const playBtn = $("#playBtn");
  const tempo = $("#tempo");
  const tempoValue = $("#tempoValue");
  const panelStatus = $(".panel-status span");

  function ensureAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      alert(language === "es" ? "Este navegador no permite generar audio Web Audio." : "This browser does not support Web Audio.");
      return null;
    }
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function tone(freq = 110, duration = 0.12, type = "sine", volume = 0.16) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  }

  function renderSteps() {
    sequencer.innerHTML = "";
    pattern.forEach((active, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `step${active ? " active" : ""}`;
      button.textContent = String(index + 1).padStart(2, "0");
      button.setAttribute("aria-label", `${language === "es" ? "Paso" : "Step"} ${index + 1}`);
      button.setAttribute("aria-pressed", String(active));
      button.addEventListener("click", () => {
        pattern[index] = !pattern[index];
        button.classList.toggle("active", pattern[index]);
        button.setAttribute("aria-pressed", String(pattern[index]));
        if (pattern[index]) tone(index % 4 === 0 ? 110 : 220, 0.08, "triangle", 0.07);
      });
      sequencer.appendChild(button);
    });
  }

  function updatePlayhead() {
    const steps = $$(".step", sequencer);
    steps.forEach((step, i) => step.classList.toggle("playhead", isPlaying && i === stepIndex));
    if (pattern[stepIndex]) {
      const frequencies = [110, 220, 165, 220, 110, 330, 165, 220, 110, 220, 165, 330, 110, 220, 165, 330];
      tone(frequencies[stepIndex], 0.09, stepIndex % 4 === 0 ? "triangle" : "sine", stepIndex % 4 === 0 ? 0.22 : 0.11);
    }
    stepIndex = (stepIndex + 1) % 16;
  }

  function intervalMs() {
    return (60_000 / Number(tempo.value)) / 4;
  }

  function startSequencer() {
    if (isPlaying) {
      stopSequencer();
      return;
    }
    ensureAudio();
    isPlaying = true;
    playBtn.querySelector(".play-icon").textContent = "Ⅱ";
    playBtn.querySelector("span:last-child").textContent = language === "es" ? "DETENER" : "STOP";
    panelStatus.textContent = language === "es" ? "EN MARCHA" : "RUNNING";
    stepIndex = 0;
    updatePlayhead();
    timerId = window.setInterval(updatePlayhead, intervalMs());
  }

  function stopSequencer() {
    isPlaying = false;
    window.clearInterval(timerId);
    timerId = null;
    playBtn.querySelector(".play-icon").textContent = "▶";
    playBtn.querySelector("span:last-child").textContent = language === "es" ? "INICIAR" : "START";
    panelStatus.textContent = language === "es" ? "LISTO" : "READY";
    $$(".step", sequencer).forEach(step => step.classList.remove("playhead"));
  }

  playBtn.addEventListener("click", startSequencer);
  $("#clearBtn").addEventListener("click", () => {
    pattern.fill(false);
    renderSteps();
  });
  tempo.addEventListener("input", () => {
    tempoValue.value = tempo.value;
    if (isPlaying) {
      window.clearInterval(timerId);
      timerId = window.setInterval(updatePlayhead, intervalMs());
    }
  });

  $$(".pad").forEach(pad => {
    pad.addEventListener("click", () => {
      const freq = Number(pad.dataset.freq);
      tone(freq, 0.32, pad.dataset.label === "SPARK" ? "square" : "sine", 0.2);
      pad.classList.add("hit");
      window.setTimeout(() => pad.classList.remove("hit"), 120);
    });
  });

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;
    $$("[data-es][data-en]").forEach(el => {
      const value = el.dataset[language];
      if (value !== undefined) el.innerHTML = value;
    });
    $("#langToggle").textContent = language === "es" ? "ES / EN" : "EN / ES";
    $("#menuToggle").setAttribute("aria-label", language === "es" ? "Abrir menú" : "Open menu");
    $("#clearBtn").textContent = language === "es" ? "LIMPIAR" : "CLEAR";
    if (isPlaying) {
      playBtn.querySelector("span:last-child").textContent = language === "es" ? "DETENER" : "STOP";
      panelStatus.textContent = language === "es" ? "EN MARCHA" : "RUNNING";
    } else {
      playBtn.querySelector("span:last-child").textContent = language === "es" ? "INICIAR" : "START";
      panelStatus.textContent = language === "es" ? "LISTO" : "READY";
    }
    renderSteps();
  }

  $("#langToggle").addEventListener("click", () => setLanguage(language === "es" ? "en" : "es"));
  const menuToggle = $("#menuToggle");
  const menuPanel = $("#menuPanel");
  menuToggle.addEventListener("click", () => {
    const open = menuPanel.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.querySelector("span").textContent = open ? "－" : "＋";
  });
  $$("#menuPanel a").forEach(link => link.addEventListener("click", () => {
    menuPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector("span").textContent = "＋";
  }));
  $("#year").textContent = new Date().getFullYear();
  renderSteps();
})();