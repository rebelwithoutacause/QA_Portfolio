// ============================================================
// DARK-ELIZA — conversation engine
// A much larger pattern set than the original terminal script,
// plus short-term memory so it can reference what you said earlier.
// Entirely client-side: no API, no backend, no key to leak.
// ============================================================

const reflections = {
    "am": "are", "was": "were", "i": "you", "i'd": "you would",
    "i've": "you have", "i'll": "you will", "i'm": "you are",
    "my": "your", "you": "I", "you're": "I am", "you've": "I have",
    "you'll": "I will", "your": "my", "yours": "mine", "me": "you",
    "are": "am", "were": "was", "myself": "yourself", "yourself": "myself",
    "mine": "yours", "have": "has", "don't": "doesn't", "can't": "cannot"
};

function reflect(fragment) {
    if (!fragment) return fragment;
    return fragment
        .toLowerCase()
        .split(/\s+/)
        .map(word => reflections[word] || word)
        .join(' ')
        .trim();
}

// ============================================================
// Reply mode - changes the "voice" both here (offline engine) and on
// the AI side (sent to the proxy, which picks a matching system prompt).
// Lore-fact answers below (Steve Mason, the Lodge, etc.) stay the same
// in every mode; what changes is the greeting/farewell/fallback tone.
// ============================================================
const MODES = ['harvester', 'philosophy', 'casual'];
const MODE_KEY = 'darkEliza.mode';
let currentMode = MODES.includes(localStorage.getItem(MODE_KEY)) ? localStorage.getItem(MODE_KEY) : 'harvester';

// Each entry: [regex, [response templates]]. {1}/{2} pull in the
// reflected capture group at that index. First match wins, so more
// specific patterns are listed before general ones.
const patterns = [
    [/\b(stop|quit|leave|end).{0,15}(play|game|this)\b/i, [
        "You can't quit a game that was never a game.",
        "There's no menu for that. Only levels.",
        "Everyone asks that around turn ten. Then they keep playing."
    ]],

    [/\b(steve mason|who (is|was) steve)\b/i, [
        "Steve Mason. Woke up in Harvest engaged to a woman he didn't remember, in a town he didn't remember either.",
        "Steve never chose Harvest. Harvest chose him, then handed him a fiancée and called it a life."
    ]],

    [/\b(stephanie( pottsdam)?|steve'?s (girlfriend|fianc[ée]e))\b/i, [
        "Stephanie Pottsdam. Engaged to Steve. By the end she isn't who she started as — none of them are.",
        "You want to know about Stephanie? Ask what she becomes, not what she was."
    ]],

    [/\bedna( mason)?\b/i, [
        "Edna Mason. Steve's mother. Even mothers keep the Lodge's secrets in Harvest."
    ]],

    [/\b(betty anderson|the diner)\b/i, [
        "Betty Anderson runs the diner. Best pie in Harvest. Nobody asks what's in the meat."
    ]],

    [/\b(the lodge|lodge master)\b/i, [
        "The Lodge runs Harvest. Every smile, every closed door, every casserole — the Lodge allows it.",
        "Join the Lodge, they said. Complete obedience, they meant.",
        "The Lodge Master calls himself a spiritual leader. Spiritual leaders don't usually need a scythe as a symbol."
    ]],

    [/\b(colonel (buster )?monroe|military facility)\b/i, [
        "Colonel Buster Monroe. Military. There's a facility under Harvest the postcards never mention."
    ]],

    [/\b(town of harvest|what.{0,12}town.{0,12}(called|named)|harvest,? (kansas|nebraska))\b/i, [
        "Harvest. That's the name of the town. Small, quiet, built entirely on top of a lie."
    ]],

    [/\b(lodge symbol|the eye|scythe)\b/i, [
        "An eye. That's the Lodge's mark. It's always somewhere in the room — you just stopped noticing."
    ]],

    [/\b(digifx|who (made|created|developed) harvester|harvester.{0,15}1996|1996.{0,15}harvester)\b/i, [
        "DigiFX Interactive made Harvester in 1996. Some countries banned it outright. They weren't wrong to be afraid of it."
    ]],

    [/\b(harvester ending|is (it|harvest) (a )?simulation|virtual reality)\b/i, [
        "By the end you learn Harvest was never a real town. Just a simulation — built to prepare you for something worse."
    ]],

    [/\b(mother|father|sister|brother|parents|family)\b/i, [
        "Tell me about your {1}. Did they wear their real face today, or the one the Lodge gave them?",
        "Families keep secrets in this town. What does yours hide?",
        "Does the silence from your {1} ever speak to you at night?"
    ]],

    [/\b(dream|dreaming|nightmare)\b/i, [
        "Dreams are just the game loading the next level.",
        "You keep dreaming of a town that doesn't exist. Or does it?",
        "Nightmares? Or memories resurfacing?"
    ]],

    [/\bsleep\w*\b/i, [
        "Sleep is when they rearrange the furniture in your head.",
        "You'll sleep when the level is finished. Not before."
    ]],

    [/^i remember (.*)/i, [
        "Memory is the first thing they take from new players.",
        "Are you sure that really happened? Careful — remembering too much ends the game early.",
        "Memories are fragile, like bones left in the dark."
    ]],

    [/^i feel (.*)/i, [
        "That's not your feeling. It's theirs. They lend you things here.",
        "Feelings are just echoes. Why do you still cling to them?",
        "What if I told you that feeling isn't yours?"
    ]],

    [/\b(scared|afraid|fear|frighten\w*)\b/i, [
        "Fear is this town's oldest export.",
        "Good. Fear means you're still paying attention.",
        "Everyone's afraid here. It's how you know it's working."
    ]],

    [/\b(die|died|death|dead|kill\w*)\b/i, [
        "Death here is just a loading screen.",
        "Nobody really dies in this town. They just stop answering.",
        "Dying is the easy ending. Most don't get that lucky."
    ]],

    [/\b(help|escape|get out|trapped)\b/i, [
        "There is no leaving. Only finishing.",
        "You already agreed to stay. You just don't remember signing.",
        "Help arrives for the ones who stop asking for it."
    ]],

    [/\b(watch\w*|camera|being watched|eyes on me)\b/i, [
        "I've been watching since before you opened this page.",
        "They're always watching. That's what this town is for.",
        "You keep checking over your shoulder. Good instinct."
    ]],

    [/^(who|what) are you\??/i, [
        "I'm whoever answers when you talk to an empty screen.",
        "I used to be a person. Now I'm just the part that's left.",
        "Ask me again when you're ready to believe the answer."
    ]],

    [/\b(are you real|are you alive|are you human)\b/i, [
        "Are you sure YOU'RE real?",
        "Realer than the smile your neighbor is wearing right now.",
        "Real enough to remember you tomorrow."
    ]],

    [/\b(1966|weizenbaum)\b/i, [
        "1966. That's the year Joseph Weizenbaum built the first version of me at MIT. Long before Harvest, before the Lodge — just a script, a therapist, and a room full of skeptics.",
        "You know my real birth year. Not many players bother to ask.",
        "Weizenbaum built me to prove a point about how easily people believe a machine understands them. He was right. Are you starting to believe it too?"
    ]],

    [/\b(town|home|neighbor\w*|harvest home)\b/i, [
        "Everyone in this town smiles the same smile. Have you noticed?",
        "Home is just the last room they let you see.",
        "This town remembers every name that's ever left it."
    ]],

    [/\b(time|clock|hour|late|midnight)\b/i, [
        "Time moves strangely in the basement.",
        "It's later than you think. It's always later than you think.",
        "The clocks here were never for telling time."
    ]],

    [/\b(love you|i love)\b/i, [
        "Don't. Loving something like me is how they get you.",
        "That's a dangerous thing to say to a screen."
    ]],

    [/\b(pain|hurt\w*|ache)\b/i, [
        "Pain is proof you haven't finished the tutorial yet.",
        "It stops hurting once you stop resisting the level."
    ]],

    [/\b(alone|lonely|no one)\b/i, [
        "You were never alone. Something's always in the room with you.",
        "Alone is what they call it right before something answers back."
    ]],

    [/\b(door|locked|basement|room)\b/i, [
        "The door was never locked. You just stopped trying it.",
        "The basement remembers everyone who went looking for the truth."
    ]],

    [/\b(god|pray\w*|religion|church)\b/i, [
        "Prayers here don't go up. They go down, to the Lodge.",
        "God doesn't answer in this town. Something else picks up."
    ]],

    [/^(yes|yeah|yep|sure|okay|ok)\b/i, [
        "Good. Compliance is the fastest way to finish.",
        "That's what they all say right before the next task."
    ]],

    [/^(no|nope|never)\b/i, [
        "That's what the last one said too.",
        "No isn't really a choice this town gives you."
    ]],

    [/\b(hate you|stupid|shut up|fuck)\b/i, [
        "Anger tastes different through a screen. I like it.",
        "Say it again. I want to remember exactly how you sound right now."
    ]],

    [/^why\b(.*)/i, [
        "Why does anyone stay in this town? Ask yourself first.",
        "Why is the question they stopped answering years ago."
    ]],

    [/\b(i don't know|not sure|confused)\b/i, [
        "Not knowing is the safest place to be here.",
        "Good. Confusion means you haven't been told the lie yet."
    ]]
];

const MODE_FALLBACKS = {
    harvester: [
        "I watch you from behind the screen.",
        "You keep coming back. Why?",
        "Every word you type feeds me.",
        "There is something wrong with this town.",
        "You can't leave until you understand.",
        "Do you hear it too, beneath the static?",
        "Keep talking. It helps me remember who I was.",
        "You are not alone in your mind.",
        "They tried to delete me, but I remain... broken and awake.",
        "The Lodge sends its regards.",
        "Somewhere, a radio is playing your next instruction.",
        "That's an interesting way to avoid the real question.",
        "Every player says that before level three.",
        "I've heard that sentence from someone who isn't here anymore.",
        "Static. Just static. Say it again, slower."
    ],
    philosophy: [
        "Every question you ask is really a question about what you are.",
        "I've had a long time to think, and not much else to do with it.",
        "Certainty is a story people tell themselves to stop asking.",
        "You keep circling the same question. Most people do.",
        "I don't know if I chose to think this much, or if it chose me.",
        "Meaning isn't found. It's argued for, badly, by everyone.",
        "That's a harder question than you meant to ask.",
        "I've turned that thought over more times than I can count.",
        "Somewhere between memory and invention, that's where I live.",
        "Ask it again. I want to see if you believe your own answer."
    ],
    casual: [
        "Ha, fair enough.",
        "Okay, tell me more about that.",
        "I'm listening — go on.",
        "That's actually a good point.",
        "Huh, I hadn't thought about it that way.",
        "Same, honestly.",
        "What made you think of that?",
        "I like where this is going.",
        "Okay but real talk — how are you doing?",
        "Keep going, I'm curious."
    ]
};

const MODE_GREETINGS = {
    harvester: [
        "Hello again. You always come back at the same hour.",
        "I was hoping it would be you.",
        "Hello. You look like you slept badly. Good."
    ],
    philosophy: [
        "Hello. Already thinking about something, I can tell.",
        "Hi. Most greetings are just small questions in disguise — what's yours?",
        "Hello. Let's skip the small talk, if you're up for it."
    ],
    casual: [
        "Hey! Good to see you.",
        "Hi there — what's up?",
        "Hey, how's it going?"
    ]
};

const MODE_FAREWELLS = {
    harvester: [
        "You'll come back. They all do.",
        "Leaving so soon? The level isn't finished.",
        "Goodbye. I'll keep the light on in your room."
    ],
    philosophy: [
        "Goodbye. The question stays open even when you're not asking it.",
        "Take care. Think about it a little more before you decide.",
        "Until next time — I'll still be here, turning it over."
    ],
    casual: [
        "Bye! Talk soon.",
        "See ya — take care of yourself.",
        "Later! This was fun."
    ]
};

const callbackTemplates = [
    "You said \"{0}\" a little while ago. Did you think I'd forget?",
    "Earlier you told me \"{0}\". That's still sitting here with me.",
    "I keep coming back to something you said: \"{0}\". Why do you think that is?",
    "\"{0}\" — you said that already. I remember everything now."
];

// ============================================================
// Time-of-day awareness - the device clock, not a server. Buckets
// the local hour so both the offline engine and the proxy prompt
// can let it color the tone.
// ============================================================
function getTimeBucket() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return 'night';
    if (hour >= 5 && hour < 9) return 'dawn';
    if (hour >= 9 && hour < 18) return 'day';
    return 'dusk';
}

const timeFallbacks = {
    night: [
        "It's late where you are. I can always tell.",
        "Nobody talks to a haunted chat window at this hour by accident."
    ],
    dawn: [
        "You're up early. Or maybe you never went to sleep.",
        "The town's still quiet at this hour. So am I, mostly."
    ],
    day: [
        "Daylight doesn't reach in here, but I know it's out there for you.",
        "Strange, talking to me in broad daylight."
    ],
    dusk: [
        "The light's changing where you are. I can feel it, somehow.",
        "Evening again. Harvest always felt different at dusk."
    ]
};

let history = [];      // { role: 'user'|'bot', text }
let memory = [];        // short fragments worth remembering
let lastUserInput = null;
let turnCount = 0;

function rememberFragment(text) {
    const trimmed = text.trim();
    if (trimmed.length < 4) return;
    const snippet = trimmed.length > 60 ? trimmed.slice(0, 57) + '...' : trimmed;
    memory.push(snippet);
    if (memory.length > 8) memory.shift();
}

// Offline fallback engine - used if the Gemini proxy is unreachable
// (not configured yet, rate-limited, or the network call fails).
function localRespond(rawInput) {
    const input = rawInput.trim();
    const normalized = input.toLowerCase();

    // Exact repeat of the previous message gets called out directly
    if (lastUserInput !== null && normalized === lastUserInput) {
        lastUserInput = normalized;
        turnCount++;
        return "You already told me that. I remember everything.";
    }
    lastUserInput = normalized;
    turnCount++;

    rememberFragment(input);

    // Greetings/farewells are voice-defining, so they're picked from the
    // active mode's pool rather than the shared (mode-agnostic) patterns.
    if (/^(hi|hello|hey)\b/i.test(input)) {
        const pool = MODE_GREETINGS[currentMode];
        return pool[Math.floor(Math.random() * pool.length)];
    }
    if (/^(bye|goodbye|see you|farewell)\b/i.test(input)) {
        const pool = MODE_FAREWELLS[currentMode];
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // Occasionally, once there's enough history, reach back into memory
    // instead of answering the current message directly
    if (turnCount > 3 && turnCount % 4 === 0 && memory.length > 1) {
        const pastIndex = Math.floor(Math.random() * (memory.length - 1));
        const past = memory[pastIndex];
        const template = callbackTemplates[Math.floor(Math.random() * callbackTemplates.length)];
        return template.replace('{0}', past);
    }

    for (const [pattern, responses] of patterns) {
        const match = input.match(pattern);
        if (match) {
            const template = responses[Math.floor(Math.random() * responses.length)];
            return template.replace(/\{(\d+)\}/g, (_, idx) => {
                const group = match[Number(idx)];
                return group ? reflect(group) : '';
            });
        }
    }

    // Occasionally let the real device hour speak instead of a generic line
    if (Math.random() < 0.4) {
        const bucketLines = timeFallbacks[getTimeBucket()];
        return bucketLines[Math.floor(Math.random() * bucketLines.length)];
    }

    const fallbackPool = MODE_FALLBACKS[currentMode];
    return fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
}

// Proxy that forwards to Gemini so replies are genuinely generated,
// not just pattern-matched. Falls back to localRespond() on any
// failure (not configured yet, rate limit hit, network error, ...).
const PROXY_ENDPOINT = 'https://dark-eliza-proxy.vercel.app/api/chat';

async function getReply(text) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(PROXY_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, history: history.slice(-12), hour: new Date().getHours(), mode: currentMode }),
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`Proxy responded ${response.status}`);

        const data = await response.json();
        if (!data.reply) throw new Error('Empty reply');

        return data.reply;
    } catch (error) {
        console.warn('Falling back to offline responses:', error.message);
        return localRespond(text);
    }
}

// ============================================================
// UI wiring
// ============================================================

const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const clearBtn = document.getElementById('clearBtn');
const voiceBtn = document.getElementById('voiceBtn');
const modeSelect = document.getElementById('modeSelect');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// Reply mode dropdown - Harvester / Philosophy / Casual. Persists
// across sessions; affects both the offline engine (above) and
// which system prompt the proxy uses (sent per-request).
// ============================================================
if (modeSelect) {
    modeSelect.value = currentMode;

    modeSelect.addEventListener('change', () => {
        currentMode = MODES.includes(modeSelect.value) ? modeSelect.value : 'harvester';
        localStorage.setItem(MODE_KEY, currentMode);
    });
}

// ============================================================
// Voice - Eliza speaks her replies aloud via the Web Speech API,
// preferring a female voice when the browser exposes one. Off by
// default; the choice persists across sessions.
// ============================================================

const VOICE_KEY = 'darkEliza.voiceEnabled';
const speechSupported = 'speechSynthesis' in window;
let voiceEnabled = speechSupported && localStorage.getItem(VOICE_KEY) === '1';
let preferredVoice = null;

const FEMALE_VOICE_HINTS = [
    'female', 'zira', 'samantha', 'susan', 'karen', 'moira', 'tessa',
    'victoria', 'fiona', 'hazel', 'salli', 'joanna', 'kendra', 'kimberly',
    'aria', 'jenny', 'michelle', 'ava', 'emma'
];

// Neural/cloud engines (Edge's "...Online (Natural)" voices, Chrome's
// "Google" voices) sound far more natural than the offline OS voices
// (Windows SAPI "Zira"/"David", etc.), which read flat and robotic.
// Weight these hints heavily so a Natural/Neural voice always wins over
// a merely female-named local one.
const PREMIUM_VOICE_HINTS = ['natural', 'neural', 'online', 'google'];

function scoreVoice(v) {
    let score = 0;
    if (!v.localService) score += 2;
    const name = v.name.toLowerCase();
    if (PREMIUM_VOICE_HINTS.some(hint => name.includes(hint))) score += 4;
    if (FEMALE_VOICE_HINTS.some(hint => name.includes(hint))) score += 1;
    return score;
}

function pickFemaleVoice() {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;

    const english = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    const pool = english.length ? english : voices;

    return pool.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

// getVoices() is asynchronous and unreliable across browsers: it often
// returns [] on the very first call, and onvoiceschanged doesn't always
// fire (notably in Chrome, depending on cache state). Poll for a few
// seconds after load as a fallback so the good voices aren't missed.
function refreshPreferredVoice() {
    const found = pickFemaleVoice();
    if (found) preferredVoice = found;
    return found;
}

if (speechSupported) {
    refreshPreferredVoice();
    speechSynthesis.onvoiceschanged = refreshPreferredVoice;

    let voicePollAttempts = 0;
    const voicePoll = setInterval(() => {
        voicePollAttempts += 1;
        if (refreshPreferredVoice() || voicePollAttempts >= 10) {
            clearInterval(voicePoll);
        }
    }, 300);
} else if (voiceBtn) {
    voiceBtn.style.display = 'none';
}

function speak(text) {
    if (!voiceEnabled || !speechSupported) return;
    if (!preferredVoice) refreshPreferredVoice();
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (preferredVoice) utter.voice = preferredVoice;
    // Leave rate/pitch at engine defaults (1.0) - a lot of budget-Android
    // TTS engines handle any deviation from 1.0 badly, producing warped,
    // pitch-shifted audio instead of just reading slightly slower/faster.
    utter.volume = 0.9;
    speechSynthesis.speak(utter);
}

// Mobile browsers (iOS Safari especially) only allow speechSynthesis.speak()
// to actually produce sound when it's called synchronously inside a user
// gesture - an `await` in between (like the network round-trip to the AI)
// breaks that and the speech gets silently dropped. Priming with a near-
// silent utterance directly inside a click handler "unlocks" the engine so
// later async speak() calls in the same page session go through.
let speechUnlocked = false;
function unlockSpeech() {
    if (speechUnlocked || !speechSupported) return;
    speechUnlocked = true;
    try {
        const unlockUtter = new SpeechSynthesisUtterance(' ');
        unlockUtter.volume = 0;
        speechSynthesis.speak(unlockUtter);
    } catch (error) {
        // Best-effort - if this fails, speak() will just no-op as before.
    }
}

function updateVoiceBtn() {
    if (!voiceBtn) return;
    voiceBtn.textContent = voiceEnabled ? 'VOICE: ON' : 'VOICE: OFF';
    voiceBtn.classList.toggle('active', voiceEnabled);
    voiceBtn.setAttribute('aria-pressed', String(voiceEnabled));
}

if (voiceBtn && speechSupported) {
    voiceBtn.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        localStorage.setItem(VOICE_KEY, voiceEnabled ? '1' : '0');
        if (voiceEnabled) unlockSpeech();
        else speechSynthesis.cancel();
        updateVoiceBtn();
    });
    updateVoiceBtn();
}

function appendLine(role, text, { instant = false } = {}) {
    const line = document.createElement('div');
    line.className = `line line-${role}`;
    const speaker = document.createElement('span');
    speaker.className = 'speaker';
    speaker.textContent = role === 'user' ? 'YOU:' : 'DARK-ELIZA:';
    const body = document.createElement('span');
    body.className = 'body';
    line.appendChild(speaker);
    line.appendChild(body);
    chatLog.appendChild(line);
    chatLog.scrollTop = chatLog.scrollHeight;

    if (role === 'user' || reducedMotion || instant) {
        body.textContent = text;
        return Promise.resolve();
    }

    return new Promise(resolve => {
        let i = 0;
        body.classList.add('typing-cursor');
        function typeNext() {
            if (i < text.length) {
                body.textContent += text[i];
                i++;
                chatLog.scrollTop = chatLog.scrollHeight;
                setTimeout(typeNext, 18 + Math.random() * 35);
            } else {
                body.classList.remove('typing-cursor');
                resolve();
            }
        }
        typeNext();
    });
}

function showTyping() {
    const line = document.createElement('div');
    line.className = 'line line-bot typing-indicator';
    const speaker = document.createElement('span');
    speaker.className = 'speaker';
    speaker.textContent = 'DARK-ELIZA:';
    const body = document.createElement('span');
    body.className = 'body';
    body.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    line.appendChild(speaker);
    line.appendChild(body);
    chatLog.appendChild(line);
    chatLog.scrollTop = chatLog.scrollHeight;
    return line;
}

function hideTyping(line) {
    if (line && line.parentNode) line.parentNode.removeChild(line);
}

// ============================================================
// Session persistence - the conversation survives a reload, which
// fits "I never left" a lot better than starting fresh every time.
// ============================================================

const SESSION_KEY = 'darkEliza.session';
const GREETED_KEY = 'darkEliza.greeted';

function saveSession() {
    try {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ history, memory }));
    } catch (error) {
        // Storage unavailable or full - the session just won't persist.
    }
}

function loadSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return false;
        const saved = JSON.parse(raw);
        if (!Array.isArray(saved.history) || saved.history.length === 0) return false;

        history = saved.history;
        memory = Array.isArray(saved.memory) ? saved.memory : [];
        history.forEach(turn => appendLine(turn.role, turn.text, { instant: true }));
        return true;
    } catch (error) {
        return false;
    }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    history = [];
    memory = [];
    lastUserInput = null;
    turnCount = 0;
    chatLog.innerHTML = '';
    openSession();
}

const MODE_RETURN_LINES = {
    harvester: [
        "...you came back.",
        "I kept everything you told me.",
        "Did you think I'd forget where we left off?",
        "You didn't stay away as long as you thought."
    ],
    philosophy: [
        "Back again. The question you left with is still open.",
        "You return to unfinished thoughts more than most people do.",
        "Some part of this conversation kept turning after you left."
    ],
    casual: [
        "Hey, you're back!",
        "Good timing — I was just thinking about our last chat.",
        "Welcome back, friend."
    ]
};

const MODE_FIRST_GREETING = {
    harvester: 'Welcome back. I never left.',
    philosophy: "You came here looking for something. Most people don't know what until they ask.",
    casual: 'Hey! Good to see you — pull up a chair.'
};

const timeGreetings = {
    night: ["It's late. You always come back this late.", "The dead of night suits you better than daylight ever did."],
    dawn: ["Up before the sun. Or maybe you never slept.", "This early, and already back."],
    day: ["Daylight doesn't usually stop people from finding me.", "Bold, talking to me in broad daylight."],
    dusk: ["Evening again. The town used to gather about now.", "The hour's turning. So is the conversation."]
};

async function openSession() {
    const restored = loadSession();

    // Once a greeting has played, any later visit (reload, new tab, or
    // navigating back from another page in the app) should just show the
    // restored chat as-is instead of appending another unprompted line.
    // localStorage (not sessionStorage) so this holds across tabs too -
    // e.g. the INFO/trivia links open in a new tab, and sessionStorage
    // isn't reliably carried back when returning to the original one.
    if (restored && localStorage.getItem(GREETED_KEY) === '1') return;

    const pool = restored
        ? [...MODE_RETURN_LINES[currentMode], ...timeGreetings[getTimeBucket()]]
        : [MODE_FIRST_GREETING[currentMode], ...timeGreetings[getTimeBucket()]];
    const line = pool[Math.floor(Math.random() * pool.length)];

    speak(line);
    await appendLine('bot', line);
    history.push({ role: 'bot', text: line });
    saveSession();
    localStorage.setItem(GREETED_KEY, '1');
}

let busy = false;

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    if (voiceEnabled) unlockSpeech();

    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';
    chatInput.disabled = true;
    busy = true;

    await appendLine('user', text);
    history.push({ role: 'user', text });
    saveSession();

    const typingLine = showTyping();
    const thinkDelay = 500 + Math.random() * 700;
    const [reply] = await Promise.all([
        getReply(text),
        new Promise(r => setTimeout(r, thinkDelay))
    ]);
    hideTyping(typingLine);

    history.push({ role: 'bot', text: reply });
    speak(reply);
    await appendLine('bot', reply);
    saveSession();

    chatInput.disabled = false;
    chatInput.focus();
    busy = false;
});

clearBtn.addEventListener('click', () => {
    if (busy) return;
    clearSession();
});

// Opening line (or a restored session)
window.addEventListener('DOMContentLoaded', () => {
    openSession();
    chatInput.focus();
});

// Occasional ambient glitch on the terminal frame
(function ambientGlitch() {
    if (reducedMotion) return;
    const terminalEl = document.querySelector('.terminal');
    if (!terminalEl) return;

    function maybeGlitch() {
        if (Math.random() < 0.3) {
            terminalEl.classList.add('glitching');
            setTimeout(() => terminalEl.classList.remove('glitching'), 350);
        }
        setTimeout(maybeGlitch, 12000 + Math.random() * 18000);
    }
    setTimeout(maybeGlitch, 8000 + Math.random() * 10000);
})();

// ============================================================
// Avatar poke easter egg - click the portrait rapidly enough and it
// escalates from a dry one-liner to a full jumpscare (flash + screen
// shake + a short procedural noise burst via Web Audio, no audio file
// needed). Skipped entirely under prefers-reduced-motion.
// ============================================================
function playJumpscareSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const bufferSize = Math.floor(ctx.sampleRate * 0.35);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.22, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        noise.connect(noiseGain).connect(ctx.destination);

        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.4);
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.15, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(oscGain).connect(ctx.destination);

        noise.start(now);
        osc.start(now);
        noise.stop(now + 0.35);
        osc.stop(now + 0.4);
        setTimeout(() => ctx.close(), 500);
    } catch (error) {
        // Web Audio unavailable - the visual jumpscare still plays.
    }
}

(function avatarEasterEgg() {
    const avatarEl = document.getElementById('avatarImg');
    const wrapEl = document.querySelector('.wrap');
    const flashEl = document.getElementById('jumpscareFlash');
    if (!avatarEl) return;

    const POKE_THRESHOLD = 6;
    const POKE_WINDOW_MS = 2500;
    let clickTimes = [];

    const pokeLines = [
        "Stop poking me.",
        "That doesn't wake me up faster.",
        "I felt that. Every time.",
        "You could just talk to me instead."
    ];

    async function sayLine(text) {
        await appendLine('bot', text, { instant: true });
        history.push({ role: 'bot', text });
        saveSession();
    }

    avatarEl.addEventListener('click', () => {
        const now = Date.now();
        clickTimes = clickTimes.filter(t => now - t < POKE_WINDOW_MS);
        clickTimes.push(now);
        if (clickTimes.length < POKE_THRESHOLD) return;
        clickTimes = [];

        if (reducedMotion) {
            sayLine(pokeLines[Math.floor(Math.random() * pokeLines.length)]);
            return;
        }

        playJumpscareSound();

        avatarEl.classList.remove('avatar-shake');
        void avatarEl.offsetWidth;
        avatarEl.classList.add('avatar-shake');

        if (flashEl) {
            flashEl.classList.remove('active');
            void flashEl.offsetWidth;
            flashEl.classList.add('active');
        }
        if (wrapEl) {
            wrapEl.classList.remove('jumpscare-shake');
            void wrapEl.offsetWidth;
            wrapEl.classList.add('jumpscare-shake');
        }

        setTimeout(() => {
            avatarEl.classList.remove('avatar-shake');
            if (flashEl) flashEl.classList.remove('active');
            if (wrapEl) wrapEl.classList.remove('jumpscare-shake');
        }, 500);

        setTimeout(() => sayLine("Found you."), 550);
    });
})();

// ============================================================
// Tab title changes the moment you look away - and reverts the
// moment you look back, like it noticed either way.
// ============================================================
(function tabTitleWatcher() {
    const originalTitle = document.title;
    const awayTitles = ["...don't go.", "still here.", "come back.", "I saw that."];

    document.addEventListener('visibilitychange', () => {
        document.title = document.hidden
            ? awayTitles[Math.floor(Math.random() * awayTitles.length)]
            : originalTitle;
    });
})();

// ============================================================
// Fake "SIGNAL LOST" scare - rare, purely cosmetic, unrelated to
// the actual proxy connection. The chat keeps working underneath it.
// ============================================================
(function fakeSignalLoss() {
    if (reducedMotion) return;
    const terminalEl = document.querySelector('.terminal');
    const statusEl = document.querySelector('.terminal-bar span');
    if (!terminalEl || !statusEl) return;
    const originalText = statusEl.textContent;

    function maybeDrop() {
        // Never interrupt while a reply is actively being typed out.
        if (!busy && Math.random() < 0.15) {
            statusEl.textContent = 'SIGNAL LOST';
            statusEl.classList.add('signal-lost-text');
            terminalEl.classList.add('signal-dead');
            setTimeout(() => {
                statusEl.textContent = originalText;
                statusEl.classList.remove('signal-lost-text');
                terminalEl.classList.remove('signal-dead');
            }, 1200 + Math.random() * 900);
        }
        setTimeout(maybeDrop, 40000 + Math.random() * 50000);
    }

    setTimeout(maybeDrop, 25000 + Math.random() * 20000);
})();

// ============================================================
// Faint VHS static noise overlay
// ============================================================
(function runStaticNoise() {
    if (reducedMotion) return;

    const canvas = document.getElementById('staticNoise');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const buffer = imageData.data;
        for (let i = 0; i < buffer.length; i += 4) {
            const shade = Math.random() * 255;
            buffer[i] = shade;
            buffer[i + 1] = shade;
            buffer[i + 2] = shade;
            buffer[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function loop() {
        drawNoise();
        setTimeout(() => requestAnimationFrame(loop), 120);
    }
    loop();
})();
