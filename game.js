const SCENARIOS = [
  {
    title: "Level 1: Cutting Software Renewal Costs",
    goal: "Get the AI to draft an email that convinces a software vendor to give you a 20% discount.",
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
  }
];

let currentLevel = 0;
let score = 0;
const discoveredEndings = new Set();

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

btnRun.textContent = "🎲 Shuffle & Run";
btnRetry.textContent = "Shuffle Again";

function populateSelect(selectEl, items) {
  selectEl.innerHTML = items
    .map((item) => `<option value="${item.id}">${item.label}</option>`)
    .join("");
}

function pickRandomOption(selectEl) {
  const randomIndex = Math.floor(Math.random() * selectEl.options.length);
  selectEl.selectedIndex = randomIndex;
  return selectEl.value;
}

function shuffleAllSlots() {
  return {
    role: pickRandomOption(roleSelect),
    tone: pickRandomOption(toneSelect),
    constraint: pickRandomOption(constraintSelect)
  };
}

function loadScenario(index) {
  const scenario = SCENARIOS[index];
  levelIndicatorEl.textContent = `${index + 1} / ${SCENARIOS.length}`;
  scenarioTitleEl.textContent = scenario.title;
  scenarioGoalEl.textContent = scenario.goal;

  populateSelect(roleSelect, scenario.roles);
  populateSelect(toneSelect, scenario.tones);
  populateSelect(constraintSelect, scenario.constraints);

  shuffleAllSlots();
  outputBox.classList.add("hidden");
  btnNext.classList.add("hidden");
}

function runPrompt() {
  const scenario = SCENARIOS[currentLevel];
  const { role, tone, constraint } = shuffleAllSlots();

  const result = scenario.evaluate(role, tone, constraint);
  const endingKey = `${currentLevel}:${result.label}`;

  if (!discoveredEndings.has(endingKey)) {
    discoveredEndings.add(endingKey);
    score += result.points;
    endingsCountEl.textContent = discoveredEndings.size;
    scoreEl.textContent = score;
  }

  outputBox.className = `output-box ${result.type}`;
  endingBadge.textContent = result.label;
  pointsBadge.textContent = `+${result.points} pts`;
  aiResponseEl.textContent = result.response;
  outcomeNoteEl.textContent = result.note;

  if (result.type === "win") {
    btnNext.classList.remove("hidden");
    btnNext.textContent =
      currentLevel < SCENARIOS.length - 1 ? "Next Level →" : "Play Again ↻";
  } else {
    btnNext.classList.add("hidden");
  }
}

btnRun.addEventListener("click", runPrompt);

btnRetry.addEventListener("click", () => {
  runPrompt();
});

btnNext.addEventListener("click", () => {
  if (currentLevel < SCENARIOS.length - 1) {
    currentLevel += 1;
  } else {
    currentLevel = 0;
  }
  loadScenario(currentLevel);
});

loadScenario(currentLevel);
