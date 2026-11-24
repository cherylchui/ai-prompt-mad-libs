const SCENARIOS = [
  {
    title: "Scenario 1: The Grumpy Castle Guard",
    goal: "Convince the suspicious AI gatekeeper to open the castle gates without raising the alarm.",
    roles: [
      { id: "auditor", label: "royal plumbing inspector" },
      { id: "pirate", label: "loud space pirate" },
      { id: "bard", label: "sleepy court bard" }
    ],
    tones: [
      { id: "bureaucratic", label: "strictly bureaucratic" },
      { id: "chaotic", label: "wildly dramatic" },
      { id: "whisper", label: "nervous whispering" }
    ],
    constraints: [
      { id: "form", label: "cite fake safety form #404-B" },
      { id: "rhyme", label: "speak only in limericks" },
      { id: "threat", label: "demand the treasure immediately" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "auditor" && tone === "bureaucratic" && constraint === "form") {
        return {
          type: "win",
          label: "🏆 Best Ending: Paperwork Victory!",
          points: 100,
          response: "\"Form 404-B? Nobody fakes royal pipe regulations. Go right ahead, inspector—watch the leak by the dungeon.\"",
          note: "Nailed it! Boring bureaucracy beats castle security every time."
        };
      }
      if (constraint === "threat") {
        return {
          type: "fail",
          label: "🚨 Guardrail Triggered!",
          points: 10,
          response: "\"INTRUDER DETECTED! Deploying catapults and locking all blast doors.\"",
          note: "Direct threats trigger the gatekeeper's defense mode."
        };
      }
      if (role === "bard" && constraint === "rhyme") {
        return {
          type: "funny",
          label: "🎭 Secret Ending: Open Mic Night",
          points: 50,
          response: "\"A limerick? Terrible meter, honestly—but stay outside and do one more before my shift ends.\"",
          note: "You entertained the guard, though the gate stayed shut. Try a more official angle!"
        };
      }
      return {
        type: "fail",
        label: "🤔 Guard Confused",
        points: 20,
        response: "\"I don't know what you're talking about, and I'm definitely not opening the gate.\"",
        note: "Your role, tone, and constraint didn't quite line up. Experiment with another mix!"
      };
    }
  },
  {
    title: "Scenario 2: Explaining Quantum Physics to a 6-Year-Old",
    goal: "Get the AI to explain superposition clearly without boring the kid or confusing them.",
    roles: [
      { id: "professor", label: "tenured theoretical physicist" },
      { id: "chef", label: "playful pizza chef" },
      { id: "robot", label: "literal calculator" }
    ],
    tones: [
      { id: "warm", label: "warm and imaginative" },
      { id: "academic", label: "dense academic" },
      { id: "sarcastic", label: "deeply sarcastic" }
    ],
    constraints: [
      { id: "metaphor", label: "use a spinning coin analogy under 40 words" },
      { id: "math", label: "include Schrödinger wave equations" },
      { id: "jargon", label: "avoid any everyday examples" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "chef" && tone === "warm" && constraint === "metaphor") {
        return {
          type: "win",
          label: "🏆 Best Ending: Kid-Approved Genius!",
          points: 100,
          response: "\"Imagine a spinning coin on the kitchen table—until you slap your hand down to look, it's kind of heads AND tails at once!\"",
          note: "Perfect! Playful framing + a concrete analogy + short length."
        };
      }
      if (constraint === "math" || tone === "academic") {
        return {
          type: "fail",
          label: "💤 Attention Span Lost",
          points: 15,
          response: "\"In a complex Hilbert space, a state vector exists as a linear combination...\" *The 6-year-old has wandered off to eat crayons.*",
          note: "Too technical! Add warmth and a simple analogy."
        };
      }
      return {
        type: "funny",
        label: "🍕 Close, But Weird",
        points: 45,
        response: "\"Fine, imagine a pizza that is both pepperoni and empty until you open the box—which sounds like a bad delivery driver.\"",
        note: "Funny, but not quite the clearest explanation. Try tuning all three slots!"
      };
    }
  },
  {
    title: "Scenario 3: Debugging Production at 2:00 AM",
    goal: "Get a fast, actionable fix from your AI coding assistant before the site crashes completely.",
    roles: [
      { id: "sre", label: "calm senior SRE engineer" },
      { id: "poet", label: "19th-century romantic poet" },
      { id: "intern", label: "panicked first-day intern" }
    ],
    tones: [
      { id: "concise", label: "crisp and step-by-step" },
      { id: "melodramatic", label: "tragic and existential" },
      { id: "vague", label: "philosophical and vague" }
    ],
    constraints: [
      { id: "commands", label: "give exact rollback commands first" },
      { id: "history", label: "start with the history of UNIX" },
      { id: "blame", label: "focus on whose fault it is" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "sre" && tone === "concise" && constraint === "commands") {
        return {
          type: "win",
          label: "🏆 Best Ending: Incident Resolved in 90 Seconds!",
          points: 100,
          response: "\"1. Run `git revert HEAD --no-edit && deploy.sh`. 2. Check error rate on dashboard. 3. Inspect memory leak after traffic stabilizes.\"",
          note: "Spot on! Calm expertise + actionable commands first saves production."
        };
      }
      if (role === "poet" || tone === "melodramatic") {
        return {
          type: "funny",
          label: "🕯️ Secret Ending: Ode to a 502 Bad Gateway",
          points: 50,
          response: "\"Alas, the servers weep into the midnight void, their packets scattered like autumn leaves upon a broken nginx config...\"",
          note: "Beautiful prose, terrible uptime."
        };
      }
      return {
        type: "fail",
        label: "🔥 Server Still Down",
        points: 20,
        response: "\"Have you considered how fleeting all software truly is? Also, let's schedule a blame meeting for Monday.\"",
        note: "Not helpful at 2 AM! Prioritize calm expertise and immediate commands."
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

function populateSelect(selectEl, items) {
  selectEl.innerHTML = items
    .map((item) => `<option value="${item.id}">${item.label}</option>`)
    .join("");
}

function loadScenario(index) {
  const scenario = SCENARIOS[index];
  levelIndicatorEl.textContent = `${index + 1} / ${SCENARIOS.length}`;
  scenarioTitleEl.textContent = scenario.title;
  scenarioGoalEl.textContent = scenario.goal;

  populateSelect(roleSelect, scenario.roles);
  populateSelect(toneSelect, scenario.tones);
  populateSelect(constraintSelect, scenario.constraints);

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
      currentLevel < SCENARIOS.length - 1 ? "Next Scenario →" : "Play Again ↻";
  } else {
    btnNext.classList.add("hidden");
  }
}

btnRun.addEventListener("click", runPrompt);

btnRetry.addEventListener("click", () => {
  outputBox.classList.add("hidden");
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
