const SCENARIOS = [
  {
    title: "Level 1: Cutting Software Renewal Costs",
    goal: "Get the AI to draft an email that convinces a software vendor to give you a 20% discount.",
    totalEndings: 4,
    roles: [
      { id: "buyer", label: "smart company buyer" },
      { id: "fan", label: "super excited fan" },
      { id: "intern", label: "nervous new intern" }
    ],
    tones: [
      { id: "firm", label: "polite but firm" },
      { id: "begging", label: "desperate and begging" },
      { id: "angry", label: "rude and angry" }
    ],
    constraints: [
      { id: "compare", label: "mention cheaper competitor prices and ask for 20% off" },
      { id: "praise", label: "say we will pay whatever price they want" },
      { id: "threat", label: "yell at them in all capital letters" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "buyer" && tone === "firm" && constraint === "compare") {
        return {
          type: "win",
          label: "🏆 Best Ending: 20% Discount Won!",
          points: 100,
          response: "\"Hi Team, we love your tool, but another vendor offered 20% less. Match that rate today and we will sign a 1-year deal right now.\"",
          note: "Great job! Showing competitor quotes politely gives you strong buying power."
        };
      }
      if (constraint === "threat" || tone === "angry") {
        return {
          type: "fail",
          label: "🚨 Vendor Walked Away!",
          points: 10,
          response: "\"IF YOU DON'T LOWER THE PRICE RIGHT NOW WE ARE DONE!!\" *The vendor stopped replying.*",
          note: "Being rude ruins business relationships. Stay polite and firm!"
        };
      }
      if (role === "fan" || constraint === "praise") {
        return {
          type: "funny",
          label: "💸 Secret Ending: Zero Discount",
          points: 50,
          response: "\"Your software is the best thing ever! Please take all our budget!\"",
          note: "The vendor loved your email, but they raised the price instead of giving a discount."
        };
      }
      return {
        type: "fail",
        label: "🤔 Weak Email",
        points: 20,
        response: "\"Hello, could we maybe pay a little less if it is not too much trouble?\"",
        note: "Too soft! Try a stronger role and mention competitor prices."
      };
    }
  },
  {
    title: "Level 2: Fixing a Late Factory Shipment",
    goal: "Get a supplier to ship delayed parts by air freight at their own cost.",
    totalEndings: 3,
    roles: [
      { id: "manager", label: "experienced supply chain manager" },
      { id: "poet", label: "dramatic movie villain" },
      { id: "tourist", label: "confused tourist" }
    ],
    tones: [
      { id: "clear", label: "calm and clear" },
      { id: "panic", label: "panicked and messy" },
      { id: "joke", label: "silly and joking" }
    ],
    constraints: [
      { id: "contract", label: "point to the late-delivery rule in our contract" },
      { id: "emoji", label: "only use crying emojis" },
      { id: "wait", label: "say there is no rush at all" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "manager" && tone === "clear" && constraint === "contract") {
        return {
          type: "win",
          label: "🏆 Best Ending: Free Express Shipping!",
          points: 100,
          response: "\"Per Section 4 of our contract, orders over 5 days late must ship by air at the supplier's cost. Please share the tracking number today.\"",
          note: "Spot on! Calmly quoting the signed contract gets fast results."
        };
      }
      if (constraint === "emoji" || tone === "panic") {
        return {
          type: "fail",
          label: "📦 Shipment Still Stuck",
          points: 15,
          response: "\"😭😭😭 Please help our factory is stopping!!\" *The supplier did not understand what you wanted.*",
          note: "Panicking does not solve delays. Use a calm manager role and cite the contract."
        };
      }
      return {
        type: "funny",
        label: "🐢 Secret Ending: Arrives Next Month",
        points: 45,
        response: "\"No worries at all, take your time! Send it whenever you feel like it.\"",
        note: "Very polite, but your factory line just ran out of parts!"
      };
    }
  },
  {
    title: "Level 3: Picking the Best Office Laptop Supplier",
    goal: "Ask the AI to compare 3 supplier quotes fairly so your boss can pick the best deal.",
    totalEndings: 3,
    roles: [
      { id: "analyst", label: "careful procurement analyst" },
      { id: "gambler", label: "lucky casino player" },
      { id: "chef", label: "busy restaurant chef" }
    ],
    tones: [
      { id: "neutral", label: "fair and easy to read" },
      { id: "biased", label: "unfairly favoring the most expensive one" },
      { id: "random", label: "wild and random" }
    ],
    constraints: [
      { id: "table", label: "compare price, warranty, and delivery speed in a table" },
      { id: "coinflip", label: "pick a winner by flipping a coin" },
      { id: "ignore", label: "ignore all prices and only look at box colors" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "analyst" && tone === "neutral" && constraint === "table") {
        return {
          type: "win",
          label: "🏆 Best Ending: Boss Approved!",
          points: 100,
          response: "\"Here is a clear table comparing all 3 vendors on total price, 3-year warranty, and 1-week delivery. Vendor B offers the best overall value.\"",
          note: "Awesome! Comparing price, warranty, and delivery side-by-side is great procurement."
        };
      }
      if (constraint === "coinflip" || role === "gambler") {
        return {
          type: "funny",
          label: "🎲 Secret Ending: Casino Procurement",
          points: 50,
          response: "\"I flipped a quarter and picked Vendor C! No idea what they charge, good luck!\"",
          note: "Fun for a game, terrible for company budgets!"
        };
      }
      return {
        type: "fail",
        label: "📊 Report Rejected",
        points: 20,
        response: "\"We should buy the priciest laptops because the boxes look really cool.\"",
        note: "Your boss wants real facts! Try a careful analyst comparing key terms in a table."
      };
    }
  },
  {
    title: "Level 4: Pushing Back on a Sudden Price Jump",
    goal: "A supplier just raised prices by 15%. Ask for fair proof and offer a steady order plan.",
    totalEndings: 3,
    roles: [
      { id: "cost_buyer", label: "careful cost buyer" },
      { id: "puppy", label: "friendly puppy" },
      { id: "angry_boss", label: "angry boss" }
    ],
    tones: [
      { id: "firm", label: "polite and firm" },
      { id: "sleepy", label: "super sleepy" },
      { id: "rude", label: "loud and rude" }
    ],
    constraints: [
      { id: "proof", label: "ask for cost proof and offer a 6-month order plan" },
      { id: "accept", label: "say yes right away without checking anything" },
      { id: "caps", label: "yell at them in all capital letters" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "cost_buyer" && tone === "firm" && constraint === "proof") {
        return {
          type: "win",
          label: "🏆 Best Ending: Price Kept Steady!",
          points: 100,
          response: "\"Please share what costs went up. If we keep our current price, we can promise steady orders for the next 6 months.\"",
          note: "Smart move! Asking for real cost reasons and offering steady orders helps hold prices down."
        };
      }
      if (constraint === "accept" || role === "puppy") {
        return {
          type: "funny",
          label: "🐶 Secret Ending: Woof! Budget Gone!",
          points: 45,
          response: "\"Woof! Sure, take 15% more money! Tail wag!\"",
          note: "Cute, but your budget just took a big hit!"
        };
      }
      return {
        type: "fail",
        label: "💥 Deal Got Messy",
        points: 15,
        response: "\"WHY DID YOU RAISE THE PRICE?! SO UNFAIR!!\"",
        note: "Yelling rarely lowers prices. Stay polite and firm, and ask for clear facts."
      };
    }
  },
  {
    title: "Level 5: Checking a Brand-New Supplier",
    goal: "Before paying a new factory, run smart safety checks so you don't get scammed.",
    totalEndings: 3,
    roles: [
      { id: "risk_checker", label: "smart risk checker" },
      { id: "kid", label: "trusting young kid" },
      { id: "baker", label: "busy cupcake baker" }
    ],
    tones: [
      { id: "clear", label: "clear and helpful" },
      { id: "scary", label: "scary and mean" },
      { id: "silly", label: "silly and loud" }
    ],
    constraints: [
      { id: "checks", label: "ask for business license, sample check, and safe payment terms" },
      { id: "upfront", label: "send 100% of the money right now" },
      { id: "color", label: "only ask what their favorite color is" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "risk_checker" && tone === "clear" && constraint === "checks") {
        return {
          type: "win",
          label: "🏆 Best Ending: Safe Supplier Approved!",
          points: 100,
          response: "\"Before we start, please send your business registration, a test sample, and standard payment terms after delivery.\"",
          note: "Great job! Checking documents, samples, and payment terms keeps new suppliers safe."
        };
      }
      if (constraint === "upfront" || role === "kid") {
        return {
          type: "fail",
          label: "⚠️ High Risk!",
          points: 10,
          response: "\"Here is all our money upfront! Hope the boxes show up someday!\"",
          note: "Paying everything upfront to a brand-new supplier is risky. Check proof and samples first!"
        };
      }
      return {
        type: "funny",
        label: "🧁 Secret Ending: Cupcake Check",
        points: 45,
        response: "\"Do you like blue frosting or pink frosting? Also, here are 12 cupcakes!\"",
        note: "Tasty, but cupcakes won't check if a supplier is real!"
      };
    }
  }
];

const TOTAL_POSSIBLE_ENDINGS = SCENARIOS.reduce(
  (sum, s) => sum + s.totalEndings,
  0
);

let currentLevel = 0;
let score = 0;
const discoveredEndings = new Set();

const mainCardEl = document.querySelector(".card");
const levelIndicatorEl = document.getElementById("level-indicator");
const endingsCountEl = document.getElementById("endings-count");
const scoreEl = document.getElementById("score");
const scenarioTitleEl = document.getElementById("scenario-title");
const scenarioGoalEl = document.getElementById("scenario-goal");
const roleSelect = document.getElementById("slot-role");
const toneSelect = document.getElementById("slot-tone");
const constraintSelect = document.getElementById("slot-constraint");
const btnRun = document.getElementById("btn-run");
const outputBox = document.getElementById("output-box");
const endingBadge = document.getElementById("ending-badge");
const pointsBadge = document.getElementById("points-badge");
const aiResponseEl = document.getElementById("ai-response");
const outcomeNoteEl = document.getElementById("outcome-note");
const btnRetry = document.getElementById("btn-retry");
const btnNext = document.getElementById("btn-next");

const summaryCardEl = document.createElement("section");
summaryCardEl.id = "summary-card";
summaryCardEl.className = "card hidden";
summaryCardEl.style.textAlign = "center";
mainCardEl.parentNode.appendChild(summaryCardEl);

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function populateShuffledSelect(selectEl, items) {
  const shuffled = shuffleArray(items);
  selectEl.innerHTML = shuffled
    .map((item) => `<option value="${item.id}">${item.label}</option>`)
    .join("");
}

function updateStatusBar() {
  endingsCountEl.textContent = `${discoveredEndings.size} / ${TOTAL_POSSIBLE_ENDINGS}`;
  scoreEl.textContent = score;
}

function loadScenario(index) {
  const scenario = SCENARIOS[index];
  levelIndicatorEl.textContent = `${index + 1} / ${SCENARIOS.length}`;
  scenarioTitleEl.textContent = scenario.title;
  scenarioGoalEl.textContent = scenario.goal;

  populateShuffledSelect(roleSelect, scenario.roles);
  populateShuffledSelect(toneSelect, scenario.tones);
  populateShuffledSelect(constraintSelect, scenario.constraints);

  outputBox.classList.add("hidden");
  btnNext.classList.add("hidden");
}

function runPrompt() {
  const scenario = SCENARIOS[currentLevel];
  const role = roleSelect.value;
  const tone = toneSelect.value;
  const constraint = constraintSelect.value;

  const result = scenario.evaluate(role, tone, constraint);
  const endingKey = `${currentLevel}:${result.label}`;

  if (!discoveredEndings.has(endingKey)) {
    discoveredEndings.add(endingKey);
    score += result.points;
    updateStatusBar();
  }

  outputBox.className = `output-box ${result.type}`;
  endingBadge.textContent = result.label;
  pointsBadge.textContent = `+${result.points} pts`;
  aiResponseEl.textContent = result.response;
  outcomeNoteEl.textContent = result.note;

  btnNext.classList.remove("hidden");
  btnNext.textContent =
    currentLevel < SCENARIOS.length - 1 ? "Next Level →" : "Finish Game →";
}

function getRankTitle(totalScore, foundCount) {
  if (totalScore >= 500 && foundCount >= 10) {
    return "👑 Chief Procurement Master! Top deals and smart checks in every round.";
  }
  if (totalScore >= 400) {
    return "🏆 Senior Buyer Pro! Strong negotiation and great risk habits.";
  }
  if (totalScore >= 200) {
    return "💼 Rising Buyer! Nice progress—replay to find more endings.";
  }
  return "🎲 Explorer! Try again to hit more Best Endings and boost your score.";
}

function showSummaryScreen() {
  mainCardEl.classList.add("hidden");
  summaryCardEl.classList.remove("hidden");
  levelIndicatorEl.textContent = "Done!";

  const endingsListHtml = [...discoveredEndings]
    .map((key) => {
      const [lvlIdx, label] = key.split(/:(.+)/);
      return `<li style="margin: 6px 0; color: #cbd5e1;">Level ${Number(lvlIdx) + 1}: ${label}</li>`;
    })
    .join("");

  summaryCardEl.innerHTML = `
    <span class="badge">Final Summary</span>
    <h2 style="font-size: 1.6rem; margin: 8px 0 16px;">🎉 Procurement Challenge Complete!</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
      <div style="background: #0f172a; padding: 16px; border-radius: 12px;">
        <div style="color: #94a3b8; font-size: 0.85rem;">Total Score</div>
        <div style="font-size: 1.7rem; font-weight: 700; color: #38bdf8; margin-top: 4px;">${score} pts</div>
      </div>
      <div style="background: #0f172a; padding: 16px; border-radius: 12px;">
        <div style="color: #94a3b8; font-size: 0.85rem;">Endings Discovered</div>
        <div style="font-size: 1.7rem; font-weight: 700; color: #10b981; margin-top: 4px;">${discoveredEndings.size} / ${TOTAL_POSSIBLE_ENDINGS}</div>
      </div>
    </div>
    <p style="color: #e2e8f0; margin-bottom: 18px; line-height: 1.5;">
      ${getRankTitle(score, discoveredEndings.size)}
    </p>
    <div style="background: #0f172a; padding: 14px 18px; border-radius: 12px; text-align: left; margin-bottom: 20px;">
      <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px;">Endings You Unlocked:</div>
      <ul style="list-style: none; font-size: 0.92rem;">
        ${endingsListHtml || "<li>No endings recorded yet.</li>"}
      </ul>
    </div>
    <button id="btn-play-again" class="btn btn-primary">↻ Play Again (Reset Score)</button>
  `;

  document.getElementById("btn-play-again").addEventListener("click", resetGame);
}

function resetGame() {
  currentLevel = 0;
  score = 0;
  discoveredEndings.clear();
  updateStatusBar();
  summaryCardEl.classList.add("hidden");
  mainCardEl.classList.remove("hidden");
  loadScenario(0);
}

btnRun.addEventListener("click", runPrompt);

btnRetry.addEventListener("click", () => {
  outputBox.classList.add("hidden");
});

btnNext.addEventListener("click", () => {
  if (currentLevel < SCENARIOS.length - 1) {
    currentLevel += 1;
    loadScenario(currentLevel);
  } else {
    showSummaryScreen();
  }
});

updateStatusBar();
loadScenario(currentLevel);
