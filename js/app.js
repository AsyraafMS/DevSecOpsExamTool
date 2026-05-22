/* ─────────────────────────────────────────────────────────────
   DevSecOps Foundation Exam Simulator — app logic
   Three modes: practice, exam, revision
   Persists session history, revision queue, and per-category
   accuracy in localStorage. No network calls.
   ───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  // ───────── Storage keys ─────────
  const LS_HISTORY  = "dsof.history.v1";
  const LS_REVISION = "dsof.revision.v1"; // array of question ids
  const LS_CATSTATS = "dsof.catstats.v1"; // { [category]: { correct, total } }  (legacy)
  const LS_QSTATS   = "dsof.qstats.v1";   // { [id]: { seen, correct } }
  const LS_RESUME   = "dsof.resume.v1";   // serialized in-progress session

  // ───────── DOM helpers ─────────
  const $  = (id) => document.getElementById(id);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // ───────── Element refs ─────────
  const screens = {
    home:         $("screen-home"),
    quiz:         $("screen-quiz"),
    results:      $("screen-results"),
    stats:        $("screen-stats"),
    flashcards:   $("screen-flashcards"),
    flashsummary: $("screen-flashsummary"),
  };

  const els = {
    // nav
    navHome:  $("navHome"),
    navStats: $("navStats"),
    navReset: $("navReset"),
    // home config
    cfgCount:      $("cfgCount"),
    cfgCategory:   $("cfgCategory"),
    cfgDifficulty: $("cfgDifficulty"),
    cfgTimer:      $("cfgTimer"),
    cfgPass:       $("cfgPass"),
    cfgShuffle:    $("cfgShuffle"),
    // quiz
    quizMode:      $("quizMode"),
    quizCategory:  $("quizCategory"),
    qCurrent:      $("qCurrent"),
    qTotal:        $("qTotal"),
    progressFill:  $("progressFill"),
    timerWrap:     $("timerWrap"),
    timerValue:    $("timerValue"),
    qCategory:     $("qCategory"),
    qDifficulty:   $("qDifficulty"),
    qText:         $("qText"),
    choices:       $("choices"),
    feedback:      $("feedback"),
    feedbackVerdict: $("feedbackVerdict"),
    feedbackText:  $("feedbackText"),
    btnFlag:       $("btnFlag"),
    btnPrev:       $("btnPrev"),
    btnSubmit:     $("btnSubmit"),
    btnNext:       $("btnNext"),
    btnFinish:     $("btnFinish"),
    navigatorGrid: $("navigatorGrid"),
    // results
    resultTitle:    $("resultTitle"),
    resultSubtitle: $("resultSubtitle"),
    statScore:      $("statScore"),
    statVerdict:    $("statVerdict"),
    statCorrect:    $("statCorrect"),
    statIncorrect:  $("statIncorrect"),
    statTime:       $("statTime"),
    reviewList:     $("reviewList"),
    btnRetry:       $("btnRetry"),
    btnHome:        $("btnHome"),
    // stats
    sSessions:        $("sSessions"),
    sSessionsSub:     $("sSessionsSub"),
    sBest:            $("sBest"),
    sBestSub:         $("sBestSub"),
    sAvg:             $("sAvg"),
    sAvgSub:          $("sAvgSub"),
    sPassRate:        $("sPassRate"),
    sPassRateSub:     $("sPassRateSub"),
    sCoverage:        $("sCoverage"),
    sCoverageSub:     $("sCoverageSub"),
    sAnswered:        $("sAnswered"),
    sAccuracySub:     $("sAccuracySub"),
    sStudyTime:       $("sStudyTime"),
    sStudyTimeSub:    $("sStudyTimeSub"),
    sRevision:        $("sRevision"),
    statsEmpty:       $("statsEmpty"),
    statsContent:     $("statsContent"),
    trendChart:       $("trendChart"),
    categoryStats:    $("categoryStats"),
    difficultyStats:  $("difficultyStats"),
    modeStats:        $("modeStats"),
    historyBody:      $("historyBody"),
    // modal
    modal:        $("modal"),
    modalTitle:   $("modalTitle"),
    modalBody:    $("modalBody"),
    modalCancel:  $("modalCancel"),
    modalConfirm: $("modalConfirm"),
    // resume banner
    resumeBanner: $("resumeBanner"),
    resumeMeta:   $("resumeMeta"),
    btnResumeYes: $("btnResumeYes"),
    btnResumeNo:  $("btnResumeNo"),
  };

  // ───────── Storage utils ─────────
  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  // ───────── State ─────────
  const session = {
    mode: null,            // "practice" | "exam" | "revision"
    questions: [],         // array of question objects (with shuffled choice order)
    answers: [],           // index of selected choice per question, or null
    flagged: [],           // boolean per question
    revealed: [],          // boolean per question (practice mode reveals on submit)
    current: 0,
    timer: { remaining: 0, intervalId: null, total: 0, startedAt: 0 },
    passMark: 65,
    finished: false,
  };

  // ───────── Init ─────────
  function init() {
    populateCategorySelect();
    bindHomeEvents();
    bindQuizEvents();
    bindResultsEvents();
    bindNavEvents();
    bindModal();
    bindResumeBanner();
    bindKeyboardShortcuts();
    bindAutosave();
    bindFlashEvents();
    bindFlashKeyboard();
    showResumeIfAny();
    showScreen("home");
  }

  function populateCategorySelect() {
    const cats = Array.from(new Set(window.QUESTION_BANK.map((q) => q.category))).sort();
    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      els.cfgCategory.appendChild(opt);
    });
  }

  // ───────── Screen routing ─────────
  function showScreen(name) {
    Object.keys(screens).forEach((k) => screens[k].classList.toggle("active", k === name));
    els.navHome.classList.toggle("active", name === "home");
    els.navStats.classList.toggle("active", name === "stats");
    if (name === "stats") renderStats();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bindNavEvents() {
    els.navHome.addEventListener("click", () => {
      if (session.mode && !session.finished) {
        confirmModal(
          "Leave current session?",
          "Your progress in this attempt will be saved so you can resume from the home screen.",
          () => { stopTimer(); session.mode = null; showResumeIfAny(); showScreen("home"); }
        );
      } else {
        showScreen("home");
      }
    });
    els.navStats.addEventListener("click", () => showScreen("stats"));
    els.navReset.addEventListener("click", () => {
      confirmModal(
        "Reset all progress?",
        "This deletes your local history, revision queue, category stats, and any resumable session. This cannot be undone.",
        () => {
          localStorage.removeItem(LS_HISTORY);
          localStorage.removeItem(LS_REVISION);
          localStorage.removeItem(LS_CATSTATS);
          localStorage.removeItem(LS_QSTATS);
          localStorage.removeItem(LS_RESUME);
          els.resumeBanner.classList.add("hidden");
          renderStats();
          showScreen("home");
        }
      );
    });
  }

  // ───────── Home / start session ─────────
  function bindHomeEvents() {
    $$(".mode-card [data-start]").forEach((btn) => {
      btn.addEventListener("click", () => startSession(btn.getAttribute("data-start")));
    });
    // Empty-state CTA on stats screen
    $$("[data-start-from-empty]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-start-from-empty") || "practice";
        showScreen("home");
        startSession(mode);
      });
    });
    // Mock exam picker
    const btnOpen  = document.getElementById("btnOpenMockPicker");
    const btnClose = document.getElementById("btnCloseMockPicker");
    const picker   = document.getElementById("mockPicker");
    if (btnOpen && picker) {
      btnOpen.addEventListener("click", () => {
        renderMockPicker();
        picker.classList.remove("hidden");
        picker.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    if (btnClose && picker) {
      btnClose.addEventListener("click", () => picker.classList.add("hidden"));
    }
    // Flash card picker
    const btnOpenFlash  = document.getElementById("btnOpenFlashPicker");
    const btnCloseFlash = document.getElementById("btnCloseFlashPicker");
    const flashPicker   = document.getElementById("flashPicker");
    if (btnOpenFlash && flashPicker) {
      btnOpenFlash.addEventListener("click", () => {
        renderFlashPicker();
        flashPicker.classList.remove("hidden");
        flashPicker.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    if (btnCloseFlash && flashPicker) {
      btnCloseFlash.addEventListener("click", () => flashPicker.classList.add("hidden"));
    }

    // Hero CTAs
    const btnHeroStart  = document.getElementById("btnHeroStart");
    const btnHeroStats  = document.getElementById("btnHeroStats");
    const btnHeroScroll = document.getElementById("btnHeroScroll");
    if (btnHeroStart) {
      btnHeroStart.addEventListener("click", () => {
        const target = document.getElementById("modesSection");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    if (btnHeroStats) {
      btnHeroStats.addEventListener("click", () => showScreen("stats"));
    }
    if (btnHeroScroll) {
      btnHeroScroll.addEventListener("click", () => {
        const target = document.getElementById("modesSection");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function renderMockPicker() {
    const grid = document.getElementById("mockGrid");
    if (!grid || !window.MOCK_EXAMS) return;
    grid.innerHTML = "";
    window.MOCK_EXAMS.forEach((exam) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "mock-card";
      card.innerHTML = `
        <div class="mock-card-head">
          <span class="mock-card-num"></span>
          <span class="mock-card-title"></span>
        </div>
        <div class="mock-card-desc"></div>
        <div class="mock-card-meta"></div>
      `;
      card.querySelector(".mock-card-num").textContent = String(exam.id);
      card.querySelector(".mock-card-title").textContent = exam.formTitle || exam.title;
      card.querySelector(".mock-card-desc").textContent = exam.description || "";
      card.querySelector(".mock-card-meta").textContent = `${exam.questions.length} questions`;
      card.addEventListener("click", () => startMockExam(exam.id));
      grid.appendChild(card);
    });
  }

  function startMockExam(examId) {
    const exam = (window.MOCK_EXAMS || []).find((e) => e.id === examId);
    if (!exam) {
      alert(`Mock Exam ${examId} not found.`);
      return;
    }

    const cfg = readConfig();
    // Adapt mock-exam questions to the internal question shape used by the quiz engine.
    // Each mock question has q/choices/answer/explanation; we add synthetic id/category/difficulty.
    const mockQuestions = exam.questions.map((mq, idx) => ({
      id: `mock-${exam.id}-${idx + 1}`,
      category: exam.formTitle || exam.title,
      difficulty: "exam",
      question: mq.q,
      choices: mq.choices.slice(),
      answer: mq.answer,
      explanation: mq.explanation || "",
    }));

    let pool = mockQuestions.slice();
    if (cfg.shuffle) pool = shuffle(pool);
    const picked = pool.map((q) => prepareQuestion(q, cfg.shuffle));

    session.mode = "mock";
    session.mockExamId = exam.id;
    session.questions = picked;
    session.answers = picked.map(() => null);
    session.flagged = picked.map(() => false);
    session.revealed = picked.map(() => false);
    session.current = 0;
    session.passMark = cfg.passMark;
    session.finished = false;

    const minutes = Math.max(1, parseInt(cfg.timer, 10) || 60);
    startTimer(minutes * 60);

    els.quizMode.textContent = `Mock ${exam.id}`;
    els.quizCategory.textContent = exam.formTitle || exam.title;

    els.resumeBanner.classList.add("hidden");
    clearResume();
    saveResumeState();
    renderQuiz();
    showScreen("quiz");
  }

  function startSession(mode) {
    const cfg = readConfig();
    let pool = filterQuestions(cfg.category, cfg.difficulty);

    if (mode === "revision") {
      const queue = loadJSON(LS_REVISION, []);
      pool = window.QUESTION_BANK.filter((q) => queue.includes(q.id));
      if (pool.length === 0) {
        alert("Your revision queue is empty. Take a Practice or Exam attempt first; questions you miss or flag will collect here automatically.");
        return;
      }
    }

    if (pool.length === 0) {
      alert("No questions match the selected filters.");
      return;
    }

    if (cfg.shuffle) shuffle(pool);

    let count;
    if (mode === "revision") {
      count = pool.length;
    } else if (cfg.count === "all") {
      count = pool.length;
    } else {
      count = Math.min(parseInt(cfg.count, 10) || 20, pool.length);
    }

    const picked = pool.slice(0, count).map((q) => prepareQuestion(q, cfg.shuffle));

    session.mode = mode;
    session.questions = picked;
    session.answers = picked.map(() => null);
    session.flagged = picked.map(() => false);
    session.revealed = picked.map(() => false);
    session.current = 0;
    session.passMark = cfg.passMark;
    session.finished = false;

    if (mode === "exam") {
      const minutes = Math.max(1, parseInt(cfg.timer, 10) || 30);
      startTimer(minutes * 60);
    } else {
      stopTimer();
      els.timerWrap.classList.add("hidden");
    }

    els.quizMode.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    els.quizCategory.textContent =
      cfg.category === "all" && mode !== "revision" ? "" :
      mode === "revision" ? `${picked.length} question(s) from your revision queue` :
      `${cfg.category}`;

    els.resumeBanner.classList.add("hidden");
    clearResume();
    saveResumeState();
    renderQuiz();
    showScreen("quiz");
  }

  function readConfig() {
    return {
      count:      els.cfgCount.value,
      category:   els.cfgCategory.value,
      difficulty: els.cfgDifficulty.value,
      timer:      els.cfgTimer.value,
      passMark:   parseInt(els.cfgPass.value, 10) || 65,
      shuffle:    els.cfgShuffle.checked,
    };
  }

  function filterQuestions(category, difficulty) {
    return window.QUESTION_BANK.filter((q) => {
      if (category !== "all" && q.category !== category) return false;
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      return true;
    }).slice();
  }

  function prepareQuestion(q, shouldShuffle) {
    // Build a copy with potentially shuffled choices, while remembering correct.
    const order = q.choices.map((_, i) => i);
    if (shouldShuffle) shuffle(order);
    const newChoices  = order.map((i) => q.choices[i]);
    const newAnswer   = order.indexOf(q.answer);
    return {
      id: q.id,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      choices: newChoices,
      answer: newAnswer,
      explanation: q.explanation,
    };
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ═════════════════════════════════════════════════════════════════════
  // Flash card mode
  // ═════════════════════════════════════════════════════════════════════
  const flash = {
    deckId: null,        // "all" | mock exam id (number)
    deckLabel: "",
    deckSub: "",
    cards: [],           // [{ id, question, choices, answer, explanation, source }]
    current: 0,
    revealed: false,
    ratings: {},         // { [cardId]: "again" | "hard" | "good" }
  };

  function renderFlashPicker() {
    const grid = document.getElementById("flashGrid");
    if (!grid || !window.MOCK_EXAMS) return;
    grid.innerHTML = "";

    // "All mocks" deck card.
    const allTotal = window.MOCK_EXAMS.reduce((a, e) => a + e.questions.length, 0);
    const allCard = document.createElement("button");
    allCard.type = "button";
    allCard.className = "mock-card";
    allCard.innerHTML = `
      <div class="mock-card-head">
        <span class="mock-card-num">★</span>
        <span class="mock-card-title"></span>
      </div>
      <div class="mock-card-desc"></div>
      <div class="mock-card-meta"></div>
    `;
    allCard.querySelector(".mock-card-title").textContent = "All mock exams";
    allCard.querySelector(".mock-card-desc").textContent =
      "Every mock combined into one shuffled deck. Ideal for spaced review across all topics.";
    allCard.querySelector(".mock-card-meta").textContent = `${allTotal} cards`;
    allCard.addEventListener("click", () => startFlashDeck("all"));
    grid.appendChild(allCard);

    // Per-mock deck cards.
    window.MOCK_EXAMS.forEach((exam) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "mock-card";
      card.innerHTML = `
        <div class="mock-card-head">
          <span class="mock-card-num"></span>
          <span class="mock-card-title"></span>
        </div>
        <div class="mock-card-desc"></div>
        <div class="mock-card-meta"></div>
      `;
      card.querySelector(".mock-card-num").textContent = String(exam.id);
      card.querySelector(".mock-card-title").textContent = exam.formTitle || exam.title;
      card.querySelector(".mock-card-desc").textContent = exam.description || "";
      card.querySelector(".mock-card-meta").textContent = `${exam.questions.length} cards`;
      card.addEventListener("click", () => startFlashDeck(exam.id));
      grid.appendChild(card);
    });
  }

  function buildFlashCards(deckId) {
    const exams = window.MOCK_EXAMS || [];
    let label = "";
    let sub = "";
    let cards = [];

    if (deckId === "all") {
      label = "All mocks";
      sub = "All 11 mock exams shuffled together";
      exams.forEach((exam) => {
        exam.questions.forEach((q, i) => {
          cards.push({
            id: `mock-${exam.id}-${i + 1}`,
            source: `Mock ${exam.id}`,
            question: q.q,
            choices: q.choices.slice(),
            answer: q.answer,
            explanation: q.explanation || "",
          });
        });
      });
    } else {
      const exam = exams.find((e) => e.id === deckId);
      if (!exam) return null;
      label = `Mock ${exam.id}`;
      sub = exam.formTitle || exam.title;
      cards = exam.questions.map((q, i) => ({
        id: `mock-${exam.id}-${i + 1}`,
        source: `Mock ${exam.id}`,
        question: q.q,
        choices: q.choices.slice(),
        answer: q.answer,
        explanation: q.explanation || "",
      }));
    }
    return { label, sub, cards };
  }

  function startFlashDeck(deckId) {
    const built = buildFlashCards(deckId);
    if (!built || !built.cards.length) {
      alert("No cards available for that deck.");
      return;
    }
    flash.deckId = deckId;
    flash.deckLabel = built.label;
    flash.deckSub = built.sub;
    flash.cards = shuffle(built.cards.slice());
    flash.current = 0;
    flash.revealed = false;
    flash.ratings = {};

    // Hide pickers if open.
    const fp = document.getElementById("flashPicker");
    if (fp) fp.classList.add("hidden");

    renderFlashCard();
    showScreen("flashcards");
  }

  function startFlashCardsFromList(cards, label, sub) {
    if (!cards || !cards.length) return;
    flash.deckId = "custom";
    flash.deckLabel = label || "Replay";
    flash.deckSub = sub || `${cards.length} cards`;
    flash.cards = shuffle(cards.slice());
    flash.current = 0;
    flash.revealed = false;
    flash.ratings = {};
    renderFlashCard();
    showScreen("flashcards");
  }

  function renderFlashCard() {
    const total = flash.cards.length;
    const i = flash.current;
    if (i >= total) {
      showFlashSummary();
      return;
    }
    const card = flash.cards[i];

    const labelEl    = document.getElementById("flashDeckLabel");
    const subEl      = document.getElementById("flashDeckSub");
    const curEl      = document.getElementById("flashCurrent");
    const totEl      = document.getElementById("flashTotal");
    const fillEl     = document.getElementById("flashProgressFill");
    const scoreLine  = document.getElementById("flashScoreLine");
    const tagEl      = document.getElementById("flashTag");
    const tagBackEl  = document.getElementById("flashTagBack");
    const qEl        = document.getElementById("flashQuestion");
    const qBackEl    = document.getElementById("flashQuestionBack");
    const choicesEl  = document.getElementById("flashChoices");
    const ansEl      = document.getElementById("flashAnswerText");
    const explEl     = document.getElementById("flashExplain");
    const rateEl     = document.getElementById("flashRate");
    const flipEl     = document.getElementById("flashcard");
    const btnReveal  = document.getElementById("btnFlashReveal");

    if (labelEl)   labelEl.textContent = flash.deckLabel;
    if (subEl)     subEl.textContent   = flash.deckSub;
    if (curEl)     curEl.textContent   = String(i + 1);
    if (totEl)     totEl.textContent   = String(total);
    if (fillEl)    fillEl.style.width  = `${((i + 1) / total * 100).toFixed(1)}%`;

    const counts = countFlashRatings();
    if (scoreLine) {
      scoreLine.textContent = `Good ${counts.good} · Hard ${counts.hard} · Again ${counts.again}`;
    }

    if (tagEl)     tagEl.textContent     = card.source || "Flash card";
    if (tagBackEl) tagBackEl.textContent = card.source || "Flash card";
    if (qEl)       qEl.textContent       = card.question;
    if (qBackEl)   qBackEl.textContent   = card.question;

    if (choicesEl) {
      choicesEl.innerHTML = "";
      card.choices.forEach((c, idx) => {
        const li = document.createElement("li");
        li.textContent = `${String.fromCharCode(65 + idx)}. ${c}`;
        choicesEl.appendChild(li);
      });
    }

    if (ansEl) ansEl.textContent  = card.choices[card.answer] || "";
    if (explEl) explEl.textContent = card.explanation || "";

    flash.revealed = false;
    if (flipEl) flipEl.classList.remove("flipped");
    if (rateEl) rateEl.classList.add("hidden");
    if (btnReveal) btnReveal.style.display = "";
  }

  function revealFlashCard() {
    if (flash.revealed) return;
    flash.revealed = true;
    const flipEl = document.getElementById("flashcard");
    const rateEl = document.getElementById("flashRate");
    const btnReveal = document.getElementById("btnFlashReveal");
    if (flipEl) flipEl.classList.add("flipped");
    if (rateEl) rateEl.classList.remove("hidden");
    if (btnReveal) btnReveal.style.display = "none";
  }

  function rateFlashCard(rating) {
    if (!flash.revealed) {
      revealFlashCard();
      return;
    }
    const card = flash.cards[flash.current];
    if (!card) return;
    flash.ratings[card.id] = rating;
    flash.current += 1;
    renderFlashCard();
  }

  function countFlashRatings() {
    const counts = { good: 0, hard: 0, again: 0 };
    Object.values(flash.ratings).forEach((r) => {
      if (counts[r] !== undefined) counts[r] += 1;
    });
    return counts;
  }

  function showFlashSummary() {
    const counts = countFlashRatings();
    const total = flash.cards.length;
    document.getElementById("flashSummarySub").textContent =
      `${flash.deckLabel} · ${flash.deckSub}`;
    document.getElementById("flashStatTotal").textContent = String(total);
    document.getElementById("flashStatGood").textContent  = String(counts.good);
    document.getElementById("flashStatHard").textContent  = String(counts.hard);
    document.getElementById("flashStatAgain").textContent = String(counts.again);
    showScreen("flashsummary");
  }

  function bindFlashEvents() {
    const btnReveal       = document.getElementById("btnFlashReveal");
    const flipEl          = document.getElementById("flashcard");
    const btnPrev         = document.getElementById("btnFlashPrev");
    const btnShuffle      = document.getElementById("btnFlashShuffle");
    const btnEnd          = document.getElementById("btnFlashEnd");
    const btnReplayAll    = document.getElementById("btnFlashReplayAll");
    const btnReplayMissed = document.getElementById("btnFlashReplayMissed");
    const btnHome         = document.getElementById("btnFlashHome");
    const rateEl          = document.getElementById("flashRate");

    if (btnReveal) btnReveal.addEventListener("click", revealFlashCard);

    // Tap anywhere on the card itself to flip (skips rate buttons via separate container).
    if (flipEl) flipEl.addEventListener("click", (e) => {
      // Only flip when clicking the card itself, not the reveal button (which flips already).
      if (e.target.closest(".flashcard-reveal")) return;
      revealFlashCard();
    });

    if (rateEl) {
      rateEl.querySelectorAll("[data-rate]").forEach((btn) => {
        btn.addEventListener("click", () => rateFlashCard(btn.getAttribute("data-rate")));
      });
    }

    if (btnPrev) btnPrev.addEventListener("click", () => {
      if (flash.current > 0) {
        flash.current -= 1;
        const card = flash.cards[flash.current];
        if (card) delete flash.ratings[card.id];
        renderFlashCard();
      }
    });

    if (btnShuffle) btnShuffle.addEventListener("click", () => {
      const remaining = flash.cards.slice(flash.current);
      shuffle(remaining);
      flash.cards = flash.cards.slice(0, flash.current).concat(remaining);
      renderFlashCard();
    });

    if (btnEnd) btnEnd.addEventListener("click", () => {
      confirmModal(
        "End this deck?",
        "You'll see your summary and can replay missed cards.",
        () => showFlashSummary()
      );
    });

    if (btnReplayAll) btnReplayAll.addEventListener("click", () => {
      // Restart with the same deck, freshly shuffled.
      const cards = flash.cards.slice();
      startFlashCardsFromList(cards, flash.deckLabel, flash.deckSub);
    });

    if (btnReplayMissed) btnReplayMissed.addEventListener("click", () => {
      const missed = flash.cards.filter((c) => {
        const r = flash.ratings[c.id];
        return r === "again" || r === "hard";
      });
      if (!missed.length) {
        alert("No missed or hard cards to replay. Nice work.");
        return;
      }
      startFlashCardsFromList(missed, `${flash.deckLabel} (replay)`, `${missed.length} missed cards`);
    });

    if (btnHome) btnHome.addEventListener("click", () => {
      showScreen("home");
    });
  }

  function bindFlashKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (!screens.flashcards.classList.contains("active")) return;
      if (!els.modal.classList.contains("hidden")) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case " ":
        case "Enter":
          if (!flash.revealed) {
            revealFlashCard();
            e.preventDefault();
          }
          break;
        case "1":
          rateFlashCard("again");
          e.preventDefault();
          break;
        case "2":
          rateFlashCard("hard");
          e.preventDefault();
          break;
        case "3":
          rateFlashCard("good");
          e.preventDefault();
          break;
        case "ArrowLeft":
        case "p":
        case "P":
          if (flash.current > 0) {
            flash.current -= 1;
            const card = flash.cards[flash.current];
            if (card) delete flash.ratings[card.id];
            renderFlashCard();
            e.preventDefault();
          }
          break;
      }
    });
  }

  // ═════════════════════════════════════════════════════════════════════

  // ───────── Quiz rendering ─────────
  function bindQuizEvents() {
    els.btnPrev.addEventListener("click", () => goTo(session.current - 1));
    els.btnNext.addEventListener("click", () => goTo(session.current + 1));
    els.btnSubmit.addEventListener("click", onSubmitAnswer);
    els.btnFinish.addEventListener("click", () => {
      const unanswered = session.answers.filter((a) => a === null).length;
      const message = unanswered
        ? `You have ${unanswered} unanswered question(s). Finish anyway?`
        : "Finish this attempt and view your results?";
      confirmModal("Finish session?", message, finishSession);
    });
    els.btnFlag.addEventListener("click", () => {
      session.flagged[session.current] = !session.flagged[session.current];
      updateFlagButton();
      renderNavigator();
      saveResumeState();
    });
  }

  function renderQuiz() {
    const i = session.current;
    const q = session.questions[i];
    const total = session.questions.length;

    els.qCurrent.textContent = i + 1;
    els.qTotal.textContent   = total;
    els.progressFill.style.width = ((i + 1) / total * 100).toFixed(1) + "%";

    els.qCategory.textContent   = q.category;
    els.qDifficulty.textContent = q.difficulty;
    els.qText.textContent       = q.question;

    // Choices
    els.choices.innerHTML = "";
    q.choices.forEach((text, idx) => {
      const li = document.createElement("li");
      li.className = "choice";
      li.dataset.idx = String(idx);
      li.innerHTML = `
        <span class="marker">${String.fromCharCode(65 + idx)}</span>
        <span class="choice-text"></span>
      `;
      li.querySelector(".choice-text").textContent = text;
      li.addEventListener("click", () => onSelectChoice(idx));
      els.choices.appendChild(li);
    });

    applyAnswerState();
    updateControls();
    updateFlagButton();
    renderNavigator();
  }

  function onSelectChoice(idx) {
    const i = session.current;
    if (session.revealed[i]) return; // locked after reveal in practice
    session.answers[i] = idx;
    applyAnswerState();
    updateControls();
    renderNavigator();
    saveResumeState();
  }

  function applyAnswerState() {
    const i = session.current;
    const q = session.questions[i];
    const selected = session.answers[i];
    const revealed = session.revealed[i];

    $$(".choice", els.choices).forEach((node) => {
      const idx = parseInt(node.dataset.idx, 10);
      node.classList.remove("selected", "correct", "incorrect", "locked");

      if (selected === idx) node.classList.add("selected");

      if (revealed) {
        node.classList.add("locked");
        if (idx === q.answer) node.classList.add("correct");
        else if (idx === selected) node.classList.add("incorrect");
      }
    });

    if (revealed) {
      const isCorrect = selected === q.answer;
      els.feedback.classList.remove("hidden", "correct", "incorrect");
      els.feedback.classList.add(isCorrect ? "correct" : "incorrect");
      els.feedbackVerdict.textContent = isCorrect ? "Correct" : "Not quite";
      els.feedbackText.textContent = q.explanation || "";
    } else {
      els.feedback.classList.add("hidden");
    }
  }

  function updateControls() {
    const i = session.current;
    const total = session.questions.length;
    const answered = session.answers[i] !== null;
    const revealed = session.revealed[i];
    const isLast = i === total - 1;

    els.btnPrev.disabled = i === 0;

    // Submit button is only meaningful in practice mode (per-question reveal).
    if (session.mode === "practice") {
      els.btnSubmit.classList.toggle("hidden", revealed);
      els.btnSubmit.disabled = !answered;
    } else {
      els.btnSubmit.classList.add("hidden");
    }

    // Next / Finish
    els.btnNext.classList.toggle("hidden", isLast);
    els.btnFinish.classList.toggle("hidden", !isLast);
    els.btnNext.disabled = false;
  }

  function updateFlagButton() {
    const flagged = session.flagged[session.current];
    els.btnFlag.textContent = flagged ? "Unflag" : "Flag for review";
    els.btnFlag.classList.toggle("ghost", true);
  }

  function onSubmitAnswer() {
    const i = session.current;
    if (session.answers[i] === null) return;
    if (session.mode !== "practice") return;
    session.revealed[i] = true;
    applyAnswerState();
    updateControls();
    renderNavigator();
    saveResumeState();
  }

  function goTo(idx) {
    const total = session.questions.length;
    if (idx < 0 || idx >= total) return;
    session.current = idx;
    renderQuiz();
    saveResumeState();
  }

  function renderNavigator() {
    els.navigatorGrid.innerHTML = "";
    session.questions.forEach((_, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "nav-cell";
      cell.textContent = String(i + 1);
      if (session.answers[i] !== null) cell.classList.add("answered");
      if (session.flagged[i])          cell.classList.add("flagged");
      if (session.current === i)       cell.classList.add("current");
      cell.addEventListener("click", () => goTo(i));
      els.navigatorGrid.appendChild(cell);
    });
  }

  // ───────── Timer ─────────
  function startTimer(seconds) {
    stopTimer();
    session.timer.total = seconds;
    session.timer.remaining = seconds;
    session.timer.startedAt = Date.now();
    els.timerWrap.classList.remove("hidden", "warning", "critical");
    renderTimer();
    session.timer.intervalId = setInterval(() => {
      session.timer.remaining -= 1;
      if (session.timer.remaining <= 0) {
        session.timer.remaining = 0;
        renderTimer();
        stopTimer();
        finishSession(true);
        return;
      }
      renderTimer();
    }, 1000);
  }

  function stopTimer() {
    if (session.timer.intervalId) clearInterval(session.timer.intervalId);
    session.timer.intervalId = null;
  }

  function renderTimer() {
    const s = session.timer.remaining;
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    els.timerValue.textContent = `${mm}:${ss}`;
    els.timerWrap.classList.toggle("warning",  s <= 300 && s > 60);
    els.timerWrap.classList.toggle("critical", s <= 60);
  }

  // ───────── Finish ─────────
  function finishSession(autoFromTimer) {
    if (session.finished) return;
    session.finished = true;
    stopTimer();
    clearResume();

    const total = session.questions.length;
    let correct = 0;
    const items = session.questions.map((q, i) => {
      const sel = session.answers[i];
      const isCorrect = sel === q.answer;
      if (isCorrect) correct++;
      return {
        id: q.id,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        choices: q.choices.slice(),
        correctIdx: q.answer,
        selectedIdx: sel,
        explanation: q.explanation,
        flagged: !!session.flagged[i],
        isCorrect,
        isAnswered: sel !== null,
      };
    });

    const incorrect = total - correct;
    const scorePct  = total === 0 ? 0 : Math.round((correct / total) * 100);
    const passed    = scorePct >= session.passMark;
    const timeUsed  = session.timer.total
      ? session.timer.total - session.timer.remaining
      : Math.max(0, Math.floor((Date.now() - (session.timer.startedAt || Date.now())) / 1000));

    persistAttempt({
      ts: Date.now(),
      mode: session.mode,
      total,
      correct,
      scorePct,
      passed,
      timeUsedSec: timeUsed,
      autoFromTimer: !!autoFromTimer,
      byDifficulty: items.reduce((acc, it) => {
        const d = it.difficulty || "unknown";
        if (!acc[d]) acc[d] = { correct: 0, total: 0 };
        acc[d].total += 1;
        if (it.isCorrect) acc[d].correct += 1;
        return acc;
      }, {}),
    });

    updateRevisionQueue(items);
    updateCategoryStats(items);
    updateQuestionStats(items);
    renderResults(items, { total, correct, incorrect, scorePct, passed, timeUsed, autoFromTimer });
    showScreen("results");
  }

  function persistAttempt(entry) {
    const history = loadJSON(LS_HISTORY, []);
    history.unshift(entry);
    saveJSON(LS_HISTORY, history.slice(0, 50));
  }

  function updateRevisionQueue(items) {
    const queue = new Set(loadJSON(LS_REVISION, []));
    items.forEach((it) => {
      if (it.flagged || (it.isAnswered && !it.isCorrect) || !it.isAnswered) {
        queue.add(it.id);
      } else if (it.isCorrect && !it.flagged) {
        // Mastered in this attempt — remove from revision if present.
        queue.delete(it.id);
      }
    });
    saveJSON(LS_REVISION, Array.from(queue));
  }

  function updateCategoryStats(items) {
    const stats = loadJSON(LS_CATSTATS, {});
    items.forEach((it) => {
      const c = stats[it.category] || { correct: 0, total: 0 };
      c.total += 1;
      if (it.isCorrect) c.correct += 1;
      stats[it.category] = c;
    });
    saveJSON(LS_CATSTATS, stats);
  }

  function updateQuestionStats(items) {
    const stats = loadJSON(LS_QSTATS, {});
    items.forEach((it) => {
      const q = stats[it.id] || { seen: 0, correct: 0 };
      q.seen += 1;
      if (it.isCorrect) q.correct += 1;
      stats[it.id] = q;
    });
    saveJSON(LS_QSTATS, stats);
  }

  // ───────── Results ─────────
  function bindResultsEvents() {
    els.btnHome.addEventListener("click", () => { session.mode = null; showScreen("home"); });
    els.btnRetry.addEventListener("click", () => {
      const mode = session.mode || "practice";
      session.mode = null;
      startSession(mode);
    });

    $$(".review-filter .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".review-filter .chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const f = chip.getAttribute("data-filter");
        $$(".review-item", els.reviewList).forEach((node) => {
          const tags = node.dataset.tags || "";
          if (f === "all") node.style.display = "";
          else node.style.display = tags.includes(f) ? "" : "none";
        });
      });
    });
  }

  function renderResults(items, summary) {
    const { total, correct, incorrect, scorePct, passed, timeUsed, autoFromTimer } = summary;

    els.resultTitle.textContent = passed ? "Nicely done — passed" : "Keep going — not yet at pass mark";
    els.resultSubtitle.textContent = autoFromTimer
      ? "Time expired. Your attempt was auto-submitted."
      : `${session.mode.charAt(0).toUpperCase() + session.mode.slice(1)} session complete.`;

    els.statScore.textContent     = `${scorePct}%`;
    els.statVerdict.textContent   = passed ? `Passed (≥ ${session.passMark}%)` : `Below ${session.passMark}% pass mark`;
    els.statCorrect.textContent   = `${correct} / ${total}`;
    els.statIncorrect.textContent = String(incorrect);
    els.statTime.textContent      = formatDuration(timeUsed);

    const bigCard = els.statScore.closest(".stat-card");
    bigCard.classList.toggle("pass", passed);
    bigCard.classList.toggle("fail", !passed);

    els.reviewList.innerHTML = "";
    items.forEach((it, idx) => {
      const verdict =
        !it.isAnswered ? "skipped" : it.isCorrect ? "correct" : "incorrect";
      const tags = [verdict, it.flagged ? "flagged" : ""].filter(Boolean).join(" ");

      const node = document.createElement("article");
      node.className = `review-item ${verdict}`;
      node.dataset.tags = tags;

      const correctText  = it.choices[it.correctIdx];
      const yourText     = it.isAnswered ? it.choices[it.selectedIdx] : "(no answer)";

      node.innerHTML = `
        <div class="review-meta">
          <span class="tag">${escapeHtml(it.category)}</span>
          <span class="tag tag-soft">${escapeHtml(it.difficulty)}</span>
          ${it.flagged ? '<span class="tag" style="background:var(--warn-soft);color:var(--warn)">flagged</span>' : ""}
          <span class="tag tag-soft">Q${idx + 1}</span>
        </div>
        <div class="review-q"></div>
        <div class="review-answers">
          Your answer: <span class="${it.isCorrect ? "ok" : "bad"}"></span><br/>
          Correct answer: <span class="ok"></span>
        </div>
        <p class="review-explain"></p>
      `;

      node.querySelector(".review-q").textContent = it.question;
      node.querySelectorAll(".review-answers span")[0].textContent = yourText;
      node.querySelectorAll(".review-answers span")[1].textContent = correctText;
      node.querySelector(".review-explain").textContent = it.explanation || "";
      els.reviewList.appendChild(node);
    });

    // Reset filter to All
    $$(".review-filter .chip").forEach((c) => c.classList.toggle("active", c.getAttribute("data-filter") === "all"));
    $$(".review-item", els.reviewList).forEach((n) => (n.style.display = ""));
  }

  // ───────── Stats ─────────
  function renderStats() {
    const history  = loadJSON(LS_HISTORY, []);
    const revision = loadJSON(LS_REVISION, []);
    const catStats = loadJSON(LS_CATSTATS, {});
    const qStats   = loadJSON(LS_QSTATS, {});

    // Empty state — show a friendly placeholder until at least one attempt exists.
    if (!history.length) {
      els.statsEmpty.classList.remove("hidden");
      els.statsContent.classList.add("hidden");
      return;
    }
    els.statsEmpty.classList.add("hidden");
    els.statsContent.classList.remove("hidden");

    // ── Top-level KPIs ──────────────────────────────────────────────────
    const sessions    = history.length;
    const passedCount = history.filter((h) => h.passed).length;
    const passRate    = Math.round((passedCount / sessions) * 100);
    const best        = Math.max(...history.map((h) => h.scorePct));
    const avg         = Math.round(history.reduce((a, h) => a + h.scorePct, 0) / sessions);
    const recentAvg   = avgOf(history.slice(0, Math.min(5, sessions)).map((h) => h.scorePct));
    const trend       = recentAvg - avg;

    const totalAnswered = history.reduce((a, h) => a + (h.total || 0), 0);
    const totalCorrect  = history.reduce((a, h) => a + (h.correct || 0), 0);
    const accuracy      = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    const totalSeconds = history.reduce((a, h) => a + (h.timeUsedSec || 0), 0);
    const avgSeconds   = Math.round(totalSeconds / sessions);

    const seenIds      = Object.keys(qStats).length;
    const totalBank    = (window.QUESTION_BANK || []).length;
    const coveragePct  = totalBank ? Math.round((seenIds / totalBank) * 100) : 0;

    els.sSessions.textContent       = String(sessions);
    els.sSessionsSub.textContent    = sessions === 1 ? "first attempt" : `${sessions} attempts`;

    els.sBest.textContent           = `${best}%`;
    els.sBestSub.textContent        = best >= 65 ? "above typical pass mark" : "keep going";

    els.sAvg.textContent            = `${avg}%`;
    els.sAvgSub.textContent         = trend === 0
      ? "no recent change"
      : `${trend > 0 ? "▲" : "▼"} ${Math.abs(trend)} pt vs all-time (last 5)`;

    els.sPassRate.textContent       = `${passRate}%`;
    els.sPassRateSub.textContent    = `${passedCount}/${sessions} sessions passed`;

    els.sCoverage.textContent       = `${coveragePct}%`;
    els.sCoverageSub.textContent    = `${seenIds}/${totalBank} questions seen`;

    els.sAnswered.textContent       = String(totalAnswered);
    els.sAccuracySub.textContent    = `${accuracy}% lifetime accuracy`;

    els.sStudyTime.textContent      = formatStudyTime(totalSeconds);
    els.sStudyTimeSub.textContent   = `avg ${formatDuration(avgSeconds)} per session`;

    els.sRevision.textContent       = String(revision.length);

    // ── Score trend chart ─────────────────────────────────────────────────
    renderTrendChart(history);

    // ── Category accuracy ────────────────────────────────────────────────
    renderCategoryStats(catStats);

    // ── Difficulty breakdown ─────────────────────────────────────────────
    renderDifficultyStats(history);

    // ── Mode breakdown ───────────────────────────────────────────────────
    renderModeStats(history);

    // ── History table ────────────────────────────────────────────────────
    renderHistoryTable(history);
  }

  function avgOf(arr) {
    if (!arr.length) return 0;
    return Math.round(arr.reduce((a, n) => a + n, 0) / arr.length);
  }

  function formatStudyTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m`;
    return `${sec}s`;
  }

  function renderTrendChart(history) {
    els.trendChart.innerHTML = "";
    if (!history.length) {
      const empty = document.createElement("div");
      empty.className = "trend-empty";
      empty.textContent = "No attempts yet.";
      els.trendChart.appendChild(empty);
      return;
    }
    // Oldest → newest, last 20 attempts.
    const last = history.slice(0, 20).reverse();
    last.forEach((h) => {
      const bar = document.createElement("div");
      bar.className = "trend-bar " + (h.passed ? "pass" : "fail");
      bar.dataset.tip = `${new Date(h.ts).toLocaleDateString()} · ${h.scorePct}% · ${h.mode}`;
      const fill = document.createElement("span");
      fill.style.height = `${Math.max(4, h.scorePct)}%`;
      bar.appendChild(fill);
      els.trendChart.appendChild(bar);
    });
  }

  function renderCategoryStats(catStats) {
    els.categoryStats.innerHTML = "";
    const cats = Object.keys(catStats);
    if (!cats.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No category data yet.";
      els.categoryStats.appendChild(empty);
      return;
    }
    // Sort by accuracy descending; ties broken by total.
    cats.sort((a, b) => {
      const A = catStats[a], B = catStats[b];
      const accA = A.total ? A.correct / A.total : 0;
      const accB = B.total ? B.correct / B.total : 0;
      return accB - accA || B.total - A.total;
    });
    cats.forEach((c) => {
      const s = catStats[c];
      const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
      const row = document.createElement("div");
      row.className = "cat-row";
      row.innerHTML = `
        <div class="cat-row-head">
          <span class="cat-name"></span>
          <span><strong></strong> <span class="muted small">(<span class="cat-correct"></span>/<span class="cat-total"></span>)</span></span>
        </div>
        <div class="cat-row-bar"><span style="width:${pct}%"></span></div>
      `;
      row.querySelector(".cat-name").textContent = c;
      row.querySelector("strong").textContent = `${pct}%`;
      row.querySelector(".cat-correct").textContent = String(s.correct);
      row.querySelector(".cat-total").textContent = String(s.total);
      els.categoryStats.appendChild(row);
    });
  }

  function renderDifficultyStats(history) {
    const totals = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };
    history.forEach((h) => {
      const bd = h.byDifficulty;
      if (!bd) return;
      Object.keys(bd).forEach((d) => {
        if (!totals[d]) totals[d] = { correct: 0, total: 0 };
        totals[d].total   += bd[d].total   || 0;
        totals[d].correct += bd[d].correct || 0;
      });
    });

    els.difficultyStats.innerHTML = "";
    const keys = ["easy", "medium", "hard"].filter((k) => totals[k] && totals[k].total > 0);
    if (!keys.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No difficulty data yet.";
      els.difficultyStats.appendChild(empty);
      return;
    }
    keys.forEach((k) => {
      const s = totals[k];
      const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
      const row = document.createElement("div");
      row.className = "cat-row";
      row.innerHTML = `
        <div class="cat-row-head">
          <span class="cat-name"></span>
          <span><strong></strong> <span class="muted small">(<span class="cat-correct"></span>/<span class="cat-total"></span>)</span></span>
        </div>
        <div class="cat-row-bar"><span style="width:${pct}%"></span></div>
      `;
      row.querySelector(".cat-name").textContent = k.charAt(0).toUpperCase() + k.slice(1);
      row.querySelector("strong").textContent = `${pct}%`;
      row.querySelector(".cat-correct").textContent = String(s.correct);
      row.querySelector(".cat-total").textContent = String(s.total);
      els.difficultyStats.appendChild(row);
    });
  }

  function renderModeStats(history) {
    const modes = ["practice", "exam", "mock", "revision"];
    const grouped = {};
    modes.forEach((m) => (grouped[m] = []));
    history.forEach((h) => {
      if (grouped[h.mode]) grouped[h.mode].push(h);
    });

    els.modeStats.innerHTML = "";
    modes.forEach((m) => {
      const arr = grouped[m];
      const card = document.createElement("div");
      card.className = "mode-stat";
      const count = arr.length;
      const avgScore = count ? Math.round(arr.reduce((a, h) => a + h.scorePct, 0) / count) : null;
      const passed = arr.filter((h) => h.passed).length;
      card.innerHTML = `
        <div class="mode-stat-head">
          <span class="mode-stat-name"></span>
          <span class="mode-stat-count"></span>
        </div>
        <div class="mode-stat-value"></div>
        <div class="mode-stat-sub"></div>
      `;
      card.querySelector(".mode-stat-name").textContent = m;
      card.querySelector(".mode-stat-count").textContent = count === 0 ? "no attempts" : `${count} attempt${count === 1 ? "" : "s"}`;
      card.querySelector(".mode-stat-value").textContent = avgScore === null ? "—" : `${avgScore}%`;
      card.querySelector(".mode-stat-sub").textContent =
        count === 0 ? "average score will appear once you start" :
        (m === "exam" || m === "mock") ? `${passed}/${count} passed` :
        `best ${Math.max(...arr.map((h) => h.scorePct))}%`;
      els.modeStats.appendChild(card);
    });
  }

  function renderHistoryTable(history) {
    if (!history.length) {
      els.historyBody.innerHTML = `<tr><td colspan="6" class="muted">No attempts yet.</td></tr>`;
      return;
    }
    els.historyBody.innerHTML = "";
    history.slice(0, 15).forEach((h) => {
      const tr = document.createElement("tr");
      const when = new Date(h.ts).toLocaleString();
      const scoreCell = `<strong style="color:${h.passed ? "var(--success)" : "var(--danger)"}">${h.scorePct}%</strong>`;
      tr.innerHTML = `
        <td></td>
        <td></td>
        <td>${scoreCell}</td>
        <td></td>
        <td></td>
        <td></td>
      `;
      const cells = tr.children;
      cells[0].textContent = when;
      cells[1].textContent = h.mode.charAt(0).toUpperCase() + h.mode.slice(1);
      cells[3].textContent = String(h.correct);
      cells[4].textContent = String(h.total);
      cells[5].textContent = formatDuration(h.timeUsedSec || 0);
      els.historyBody.appendChild(tr);
    });
  }

  // ───────── Modal ─────────
  let modalConfirmHandler = null;
  function bindModal() {
    els.modalCancel.addEventListener("click", () => closeModal());
    els.modalConfirm.addEventListener("click", () => {
      const fn = modalConfirmHandler;
      closeModal();
      if (typeof fn === "function") fn();
    });
    els.modal.addEventListener("click", (e) => {
      if (e.target === els.modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !els.modal.classList.contains("hidden")) closeModal();
    });
  }
  function confirmModal(title, body, onConfirm) {
    els.modalTitle.textContent = title;
    els.modalBody.textContent  = body;
    modalConfirmHandler = onConfirm;
    els.modal.classList.remove("hidden");
  }
  function closeModal() {
    modalConfirmHandler = null;
    els.modal.classList.add("hidden");
  }

  // ───────── Util ─────────
  function formatDuration(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  }
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ───────── Resume / autosave ─────────
  function saveResumeState() {
    if (!session.mode || session.finished || session.questions.length === 0) return;
    const payload = {
      mode: session.mode,
      questions: session.questions,
      answers: session.answers,
      flagged: session.flagged,
      revealed: session.revealed,
      current: session.current,
      passMark: session.passMark,
      timer: {
        remaining: session.timer.remaining,
        total: session.timer.total,
      },
      savedAt: Date.now(),
    };
    saveJSON(LS_RESUME, payload);
  }

  function clearResume() {
    try { localStorage.removeItem(LS_RESUME); } catch {}
  }

  function showResumeIfAny() {
    const r = loadJSON(LS_RESUME, null);
    if (!r || !r.questions || r.questions.length === 0) return;
    const total = r.questions.length;
    const answered = (r.answers || []).filter((a) => a !== null).length;
    const when = new Date(r.savedAt || Date.now()).toLocaleString();
    els.resumeMeta.textContent = `${r.mode.charAt(0).toUpperCase() + r.mode.slice(1)} mode · ${answered}/${total} answered · saved ${when}`;
    els.resumeBanner.classList.remove("hidden");
  }

  function bindResumeBanner() {
    els.btnResumeYes.addEventListener("click", () => {
      const r = loadJSON(LS_RESUME, null);
      if (!r) { els.resumeBanner.classList.add("hidden"); return; }
      restoreResume(r);
      els.resumeBanner.classList.add("hidden");
    });
    els.btnResumeNo.addEventListener("click", () => {
      clearResume();
      els.resumeBanner.classList.add("hidden");
    });
  }

  // Save in flight progress on tab close and periodically (so timer state persists)
  function bindAutosave() {
    window.addEventListener("beforeunload", () => {
      if (session.mode && !session.finished) saveResumeState();
    });
    window.addEventListener("pagehide", () => {
      if (session.mode && !session.finished) saveResumeState();
    });
    setInterval(() => {
      if (session.mode && !session.finished) saveResumeState();
    }, 5000);
  }

  function restoreResume(r) {
    session.mode = r.mode;
    session.questions = r.questions || [];
    session.answers = r.answers || session.questions.map(() => null);
    session.flagged = r.flagged || session.questions.map(() => false);
    session.revealed = r.revealed || session.questions.map(() => false);
    session.current = Math.min(r.current || 0, Math.max(0, session.questions.length - 1));
    session.passMark = r.passMark || 65;
    session.finished = false;

    if (session.mode === "exam" && r.timer && r.timer.remaining > 0) {
      startTimer(r.timer.remaining);
      session.timer.total = r.timer.total || r.timer.remaining;
    } else {
      stopTimer();
      els.timerWrap.classList.add("hidden");
    }

    els.quizMode.textContent = session.mode.charAt(0).toUpperCase() + session.mode.slice(1);
    els.quizCategory.textContent = "(resumed)";
    renderQuiz();
    showScreen("quiz");
  }

  // ───────── Keyboard shortcuts ─────────
  function bindKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ignore when modal is open or user is typing in an input
      if (!els.modal.classList.contains("hidden")) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (!screens.quiz.classList.contains("active")) return;

      const i = session.current;
      const q = session.questions[i];
      if (!q) return;

      // Number keys 1..9 → select choice
      if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < q.choices.length && !session.revealed[i]) {
          onSelectChoice(idx);
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "n":
        case "N":
          if (i < session.questions.length - 1) { goTo(i + 1); e.preventDefault(); }
          break;
        case "ArrowLeft":
        case "p":
        case "P":
          if (i > 0) { goTo(i - 1); e.preventDefault(); }
          break;
        case "f":
        case "F":
          session.flagged[i] = !session.flagged[i];
          updateFlagButton();
          renderNavigator();
          saveResumeState();
          e.preventDefault();
          break;
        case "Enter":
          if (session.mode === "practice" && !session.revealed[i] && session.answers[i] !== null) {
            onSubmitAnswer();
          } else if (i < session.questions.length - 1) {
            goTo(i + 1);
          }
          e.preventDefault();
          break;
      }
    });
  }

  // ───────── Live background particles ─────────
  function spawnParticles() {
    const root = document.getElementById("bgParticles");
    if (!root) return;

    // Respect user's motion preference.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Skinnier set on small screens to keep things light.
    const small = window.innerWidth < 720;
    const count = small ? 18 : 36;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "particle";
      const size = 2 + Math.random() * 6;        // 2px – 8px
      const left = Math.random() * 100;          // 0 – 100 vw
      const startY = 100 + Math.random() * 30;   // start below the fold
      const duration = 18 + Math.random() * 28;  // 18s – 46s
      const delay = Math.random() * duration;    // stagger
      const opacity = 0.25 + Math.random() * 0.45;

      el.style.width  = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left   = `${left}vw`;
      el.style.top    = `${startY}vh`;
      el.style.opacity = String(opacity);
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay    = `-${delay}s`;
      root.appendChild(el);
    }
  }

  // ───────── Boot ─────────
  document.addEventListener("DOMContentLoaded", () => {
    init();
    spawnParticles();
  });
})();
