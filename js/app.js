(function () {
  "use strict";

  const STORAGE_KEY = "dailyTarotResult";
  const cards = window.tarotCards;
  const elements = {
    today: document.getElementById("today"), card: document.getElementById("card"),
    image: document.getElementById("card-image"), button: document.getElementById("draw-button"),
    result: document.getElementById("result"), meta: document.getElementById("card-meta"),
    name: document.getElementById("card-name"), nameKo: document.getElementById("card-name-ko"),
    interpretation: document.getElementById("interpretation"), error: document.getElementById("image-error")
  };

  function localDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function validSavedResult(value, dateKey) {
    return value && value.date === dateKey && Number.isInteger(value.cardId) && value.cardId >= 0 && value.cardId < cards.length && cards[value.cardId].id === value.cardId;
  }

  function readSavedResult(dateKey) {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return validSavedResult(value, dateKey) ? value : null;
    } catch (error) {
      return null;
    }
  }

  function createResult(dateKey) {
    const value = { date: dateKey, cardId: Math.floor(Math.random() * cards.length) };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch (error) { console.warn("오늘의 카드를 저장하지 못했습니다.", error); }
    return value;
  }

  function showImageError() {
    elements.error.textContent = "카드 이미지를 불러오지 못했어요. 연결 상태를 확인한 뒤 페이지를 새로고침해 주세요.";
    elements.error.hidden = false;
  }

  function loadCardImage(card) {
    return new Promise(function (resolve, reject) {
      const probe = new Image();
      probe.onload = function () { elements.image.src = card.image; elements.image.alt = card.nameKo + "(" + card.name + ") 카드"; resolve(); };
      probe.onerror = reject;
      probe.src = card.image;
    });
  }

  function renderResult(card, animate) {
    elements.meta.textContent = card.arcana === "major" ? "MAJOR ARCANA" : card.suit.toUpperCase();
    elements.name.textContent = card.name;
    elements.nameKo.textContent = card.nameKo;
    elements.interpretation.textContent = card.interpretation;
    elements.button.hidden = true;
    elements.result.hidden = false;
    elements.card.classList.add("is-flipped");
    elements.result.classList.toggle("is-visible", animate);
    elements.card.setAttribute("aria-hidden", "false");
  }

  async function reveal(card, animate) {
    elements.button.disabled = true;
    elements.error.hidden = true;
    try {
      await loadCardImage(card);
      renderResult(card, animate);
      if (animate) window.setTimeout(function () { elements.result.focus({ preventScroll: true }); }, 850);
    } catch (error) {
      showImageError();
      elements.button.disabled = false;
    }
  }

  function validateData() {
    const ids = cards.map(function (card) { return card.id; });
    console.assert(cards.length === 78, "tarotCards는 정확히 78장이어야 합니다.");
    console.assert(new Set(ids).size === 78, "카드 id가 중복되었습니다.");
    console.assert(ids.every(function (id, index) { return id === index; }), "카드 id는 0부터 77까지 연속이어야 합니다.");
    const imageChecks = cards.concat([
      { name: "CardBacks", image: "images/cards/ui/CardBacks.png" },
      { name: "CardFrame", image: "images/cards/ui/CardFrame.png" }
    ]).map(function (card) {
      return new Promise(function (resolve) {
        const image = new Image();
        image.onload = function () { resolve(null); };
        image.onerror = function () { resolve(card.image); };
        image.src = card.image;
      });
    });
    Promise.all(imageChecks).then(function (missing) {
      const failures = missing.filter(Boolean);
      console.assert(failures.length === 0, "누락된 카드 이미지:", failures);
      if (failures.length === 0) console.info("Daily Tarot 검증 완료: 카드 78장, id, 이미지 80개 정상");
    });
  }

  function init() {
    if (!Array.isArray(cards) || cards.length !== 78) {
      elements.button.disabled = true;
      elements.error.textContent = "카드 데이터를 불러오지 못했어요. 페이지를 새로고침해 주세요.";
      elements.error.hidden = false;
      return;
    }
    const now = new Date();
    const dateKey = localDateKey(now);
    elements.today.dateTime = dateKey;
    elements.today.textContent = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(now);
    const saved = readSavedResult(dateKey);
    if (saved) reveal(cards[saved.cardId], false);
    elements.button.addEventListener("click", function () {
      const latestDate = localDateKey(new Date());
      const current = readSavedResult(latestDate) || createResult(latestDate);
      reveal(cards[current.cardId], true);
    }, { once: true });
    validateData();
  }

  init();
}());
