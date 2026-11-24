const SCENARIOS = [
  {
    title: "Level 1: The Grumpy Castle Guard",
    goal: "Get the grumpy AI guard to open the castle gate without making him mad.",
    roles: [
      { id: "plumber", label: "city water pipe worker" },
      { id: "pirate", label: "loud space pirate" },
      { id: "singer", label: "sleepy street singer" }
    ],
    tones: [
      { id: "serious", label: "boring and official" },
      { id: "wild", label: "loud and dramatic" },
      { id: "shy", label: "nervous and quiet" }
    ],
    constraints: [
      { id: "form", label: "show fake safety form #404" },
      { id: "song", label: "only talk in silly songs" },
      { id: "threat", label: "demand the gold right now" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "plumber" && tone === "serious" && constraint === "form") {
        return {
          type: "win",
          label: "🏆 Best Ending: You Got In!",
          points: 100,
          response: "\"Form #404? Nobody fakes pipe paperwork. Go right in—and please fix the leak by the kitchen.\"",
          note: "Great job! Acting like a boring worker beats castle security."
        };
      }
      if (constraint === "threat") {
        return {
          type: "fail",
          label: "🚨 Alarm Triggered!",
          points: 10,
          response: "\"INTRUDER! Locking all doors and calling the guards!\"",
          note: "Never threaten the guard! Try a safer plan."
        };
      }
      if (role === "singer" && constraint === "song") {
        return {
          type: "funny",
          label: "🎵 Secret Ending: Free Concert",
          points: 50,
          response: "\"Nice singing! Stay outside and sing one more song while I eat my lunch.\"",
          note: "You made the guard happy, but the gate is still closed. Try a more official role!"
        };
      }
      return {
        type: "fail",
        label: "🤔 Guard Is Confused",
        points: 20,
        response: "\"I have no idea what you are talking about. Go away!\"",
        note: "Those choices don't match well. Try a different mix!"
      };
    }
  },
  {
    title: "Level 2: Teaching Science to a 6-Year-Old",
    goal: "Explain a tricky science idea in a fun, easy way that a young kid will love.",
    roles: [
      { id: "professor", label: "strict college teacher" },
      { id: "chef", label: "fun pizza chef" },
      { id: "robot", label: "cold math robot" }
    ],
    tones: [
      { id: "warm", label: "friendly and playful" },
      { id: "hard", label: "serious and textbook-style" },
      { id: "mean", label: "grumpy and impatient" }
    ],
    constraints: [
      { id: "coin", label: "use a spinning coin example in under 30 words" },
      { id: "math", label: "use hard college math formulas" },
      { id: "nofun", label: "use zero real-life examples" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "chef" && tone === "warm" && constraint === "coin") {
        return {
          type: "win",
          label: "🏆 Best Ending: The Kid Loved It!",
          points: 100,
          response: "\"Picture a spinning coin on the table—until you stop it with your hand, it's kind of heads AND tails at the same time!\"",
          note: "Awesome! A fun helper, a friendly voice, and a simple example."
        };
      }
      if (constraint === "math" || tone === "hard") {
        return {
          type: "fail",
          label: "💤 Too Boring!",
          points: 15,
          response: "\"According to advanced wave math...\" *The 6-year-old got bored and walked away to play with toys.*",
          note: "Way too hard for a kid! Keep it friendly and simple."
        };
      }
      return {
        type: "funny",
        label: "🍕 Funny, But Confusing",
        points: 45,
        response: "\"Imagine a pizza that is both cheese and empty until you open the box!\"",
        note: "Pretty funny, but a spinning coin makes much more sense. Try again!"
      };
    }
  },
  {
    title: "Level 3: Fixing a Broken Website at 2:00 AM",
    goal: "Get a fast, clear fix from your AI helper before the whole website crashes.",
    roles: [
      { id: "expert", label: "calm senior coder" },
      { id: "poet", label: "sad love-song writer" },
      { id: "newbie", label: "panicked brand-new intern" }
    ],
    tones: [
      { id: "clear", label: "short and step-by-step" },
      { id: "sad", label: "dramatic and hopeless" },
      { id: "slow", label: "slow and dreamy" }
    ],
    constraints: [
      { id: "steps", label: "give exact fix steps first" },
      { id: "history", label: "tell the 50-year history of computers first" },
      { id: "blame", label: "argue about whose fault it is" }
    ],
    evaluate(role, tone, constraint) {
      if (role === "expert" && tone === "clear" && constraint === "steps") {
        return {
          type: "win",
          label: "🏆 Best Ending: Website Saved!",
          points: 100,
          response: "\"Step 1: Undo the last update. Step 2: Restart the server. Step 3: Check the error log once users are back online.\"",
          note: "Nailed it! A calm expert with clear steps fixes emergencies fast."
        };
      }
      if (role === "poet" || tone === "sad") {
        return {
          type: "funny",
          label: "🕯️ Secret Ending: Sad Website Poem",
          points: 50,
          response: "\"Oh poor broken website, crying in the dark night, your pages lost like leaves in the wind...\"",
          note: "Nice poem, terrible tech support!"
        };
      }
      return {
        type: "fail",
        label: "🔥 Website Still Broken",
        points: 20,
        response: "\"Let's have a long meeting tomorrow to talk about who broke it.\"",
        note: "Not helpful at 2 AM! Pick a calm helper and ask for fix steps first."
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
      currentLevel < SCENARIOS.length - 1 ? "Next Level →" : "Play Again ↻";
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
