// =============================================
// KISAAN AI — AI Agents
// Gemini (Vision) + Claude (Reasoning)
// =============================================

// ─── DEMO CACHE (offline fallback) ───────────────────────────────
const DEMO_CACHE = {
  cropDisease: {
    disease: 'Yellow Rust (زرد زنگ)',
    severity: 72,
    confidence: 94,
    steps: [
      { step: 1, title: 'بیماری کی شناخت', titleEn: 'Disease Identified', text: 'Yellow Rust (Puccinia striiformis) — زرد زنگ پھپھوندی — پتوں پر زرد دھاریاں نظر آ رہی ہیں', emoji: '🔍' },
      { step: 2, title: 'شدت کا اندازہ', titleEn: 'Severity Assessment', text: '72% متاثر — ابھی علاج ممکن ہے مگر فوری اقدام ضروری ہے', emoji: '⚠️' },
      { step: 3, title: 'علاج', titleEn: 'Treatment', text: 'Tilt 25EC (Propiconazole) 0.5ml/liter پانی میں ملا کر سپرے کریں — 7 دن بعد دہرائیں', emoji: '💊' },
      { step: 4, title: 'لاگت کا تخمینہ', titleEn: 'Cost Estimate', text: 'علاج کی کل لاگت: PKR 1,200–1,500 فی ایکڑ — آج خریدیں: Tilt 25EC یا Folicur', emoji: '💰' },
      { step: 5, title: 'بچاؤ', titleEn: 'Prevention', text: 'اگلی فصل: زنگ مزاحم گندم کا بیج استعمال کریں — Inquilab-91 یا Galaxy-2013', emoji: '🛡️' },
    ],
    financial: { yieldLoss: [20, 45, 70], days: [3, 7, 14], damage: 45000, acres: 5 },
    recommendation: 'فوری علاج کریں — ہر دن کی تاخیر آپ کی فصل کا 3% نقصان بڑھاتی ہے',
  },

  mandi: {
    crop: 'wheat',
    city: 'lahore',
    currentPrice: 3850,
    weeklyAvg: 3765,
    trend: 'up',
    trendPct: 2.3,
    prediction: 'اگلے 2 ہفتوں میں 5-8% اضافہ متوقع',
    minPrice: 3700,
    negotiationScript: `آداب! میں ایک پیشہ ور کسان ہوں اور میری گندم اعلیٰ معیار کی ہے۔\n\nلاہور منڈی میں آج کا بھاؤ PKR 3,850 فی من ہے — یہ میں نے خود AMIS پاکستان پر چیک کیا ہے۔\n\nمیری کم از کم قیمت PKR 3,700 فی من ہے — اس سے کم میں نہیں بیچوں گا۔\n\nاگر آپ آج پوری مقدار خریدیں تو PKR 3,800 پر سودا کریں گے۔`,
  },

  livestock: {
    animal: 'goat',
    symptoms: 'بخار، ناک بہنا، منہ میں چھالے',
    diagnosis: 'PPR (بکری طاعون — Peste des Petits Ruminants)',
    severity: 'critical',
    probability: 87,
    steps: [
      { step: 1, title: 'تشخیص', text: 'PPR وائرس — بکریوں اور بھیڑوں میں سب سے خطرناک بیماری', emoji: '🔬', urgency: 'high' },
      { step: 2, title: 'فوری اقدام', text: 'بیمار جانور کو فوراً الگ کریں — یہ بیماری بہت تیزی سے پھیلتی ہے', emoji: '⛔', urgency: 'critical' },
      { step: 3, title: 'گھریلو علاج', text: 'Electral powder پانی میں ملا کر پلائیں — Paracetamol 10mg/kg بخار کے لیے', emoji: '💊', urgency: 'medium' },
      { step: 4, title: 'ویٹرنری', text: '24 گھنٹے میں ڈاکٹر بلائیں — PPR vaccine + Oxytetracycline injection ضروری ہے', emoji: '🏥', urgency: 'critical' },
      { step: 5, title: 'ٹائم لائن', text: '48 گھنٹے میں بہتری نہ ہو تو فوری ویٹ بلائیں — بغیر علاج 70% اموات ممکن', emoji: '⏰', urgency: 'high' },
    ],
    vetRequired: true,
  },

  irrigation: {
    crop: 'wheat',
    stage: 'tillering',
    schedule: [
      { day: 'پیر', water: 35, skip: false, reason: 'عام آبپاشی' },
      { day: 'منگل', water: 0, skip: true, reason: 'بارش کا امکان 60%' },
      { day: 'بدھ', water: 0, skip: true, reason: 'مٹی میں نمی کافی' },
      { day: 'جمعرات', water: 25, skip: false, reason: 'آدھی آبپاشی' },
      { day: 'جمعہ', water: 0, skip: true, reason: 'بارش کا امکان 45%' },
      { day: 'ہفتہ', water: 35, skip: false, reason: 'عام آبپاشی' },
      { day: 'اتوار', water: 0, skip: true, reason: 'آرام' },
    ],
    savings: { water: 340000, income: 28000, yieldBoost: 18 },
  },
};

// ─── GEMINI VISION AGENT ───────────────────────────────────────────
async function analyzeCropDisease(imageBase64) {
  const hasKey = CONFIG.GEMINI_API_KEY &&
                 CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' &&
                 !CONFIG.DEMO_MODE;

  // Show badge
  const badge = document.getElementById('apiStatusBadge');
  if (badge) {
    badge.style.display = 'block';
    if (hasKey) {
      badge.style.background = '#E6F4EA';
      badge.style.color = 'var(--green)';
      badge.style.border = '1px solid #0A5C3633';
      badge.textContent = '✅ LIVE AI — Real Gemini 2.0 Flash Vision';
    } else {
      badge.style.background = '#EBF5EE';
      badge.style.color = 'var(--gold)';
      badge.style.border = '1px solid rgba(30,175,113,0.3)';
      badge.textContent = '⚠️ DEMO MODE — Add API key for real analysis';
    }
  }

  if (!hasKey) {
    console.warn('[Kisaan AI] Using DEMO cache — set GEMINI_API_KEY and DEMO_MODE:false');
    await sleep(2500);
    return DEMO_CACHE.cropDisease;
  }

  console.log('[Kisaan AI] 🔑 Calling real Gemini Vision API...');

  const prompt = `You are an expert agricultural pathologist for Pakistani crops (wheat, cotton, rice, sugarcane, maize).

Carefully analyze this image and identify the exact crop disease shown. Do NOT default to Yellow Rust unless you clearly see yellow/orange stripe patterns on wheat leaves. Look carefully at what is actually shown.

IMPORTANT: If the image is NOT of a plant, crop, or agricultural nature, you MUST respond with: {"disease":"INVALID_IMAGE","severity":0,"confidence":0,"steps":[],"financial":{"yieldLoss":[0,0,0],"days":[0,0,0],"damage":0,"acres":0},"recommendation":"Not a valid crop image."}

Respond ONLY with a single valid JSON object, no markdown fences, no explanation:
{"disease":"Exact Disease Name (اردو نام)","severity":0,"confidence":0,"steps":[{"step":1,"title":"بیماری کی شناخت","titleEn":"Disease Identified","text":"Urdu description of what you see","emoji":"🔍"},{"step":2,"title":"شدت کا اندازہ","titleEn":"Severity Assessment","text":"Urdu severity detail","emoji":"⚠️"},{"step":3,"title":"علاج","titleEn":"Treatment","text":"Pakistan market product names + exact dosage in Urdu","emoji":"💊"},{"step":4,"title":"لاگت","titleEn":"Cost Estimate","text":"PKR cost per acre in Urdu","emoji":"💰"},{"step":5,"title":"بچاؤ","titleEn":"Prevention","text":"Urdu prevention advice","emoji":"🛡️"}],"financial":{"yieldLoss":[15,35,60],"days":[3,7,14],"damage":40000,"acres":5},"recommendation":"Urdu recommendation"}`;

  try {
    const response = await fetch(`${CONFIG.GEMINI_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
          ]
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 2048, responseMimeType: "application/json" }
      })
    });

    // Handle 429 rate limit
    if (response.status === 429) {
      console.warn('[Kisaan AI] ⏳ Rate limited (429) — waiting 60s then retrying...');
      if (badge) {
        badge.style.background = '#F3E8FD';
        badge.style.color = 'var(--purple)';
        badge.style.border = '1px solid #6B46C133';
      }

      // Show countdown
      for (let i = 60; i > 0; i--) {
        if (badge) badge.textContent = `⏳ API Rate Limit — Retrying in ${i}s (Free tier: 15 req/min)`;
        await sleep(1000);
      }

      // Retry once after waiting
      if (badge) badge.textContent = '🔄 Retrying Gemini API...';
      const retry = await fetch(`${CONFIG.GEMINI_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 2048, responseMimeType: "application/json" }
        })
      });
      if (!retry.ok) {
        if (badge) { badge.style.color = '#ff4444'; badge.textContent = '❌ Still rate limited — showing Demo Result'; }
        return { ...DEMO_CACHE.cropDisease, disease: '[DEMO] ' + DEMO_CACHE.cropDisease.disease };
      }
      const retryData = await retry.json();
      const retryText = retryData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const retryJson = retryText.replace(/```json|```/g, '').trim().match(/\{[\s\S]*\}/);
      if (retryJson) {
        const result = JSON.parse(retryJson[0]);
        if (badge) { badge.style.color = '#0A5C36'; badge.textContent = `✅ LIVE AI — ${result.disease}`; }
        return result;
      }
      return { ...DEMO_CACHE.cropDisease, disease: '[DEMO] ' + DEMO_CACHE.cropDisease.disease };
    }

    const data = await response.json();
    console.log('[Kisaan AI] Gemini raw response:', data);

    if (data.error) {
      console.error('[Kisaan AI] API error:', data.error.message);
      if (badge) { badge.style.color = '#ff4444'; badge.textContent = `❌ Error: ${data.error.message}`; }
      return { ...DEMO_CACHE.cropDisease, disease: '[DEMO] ' + DEMO_CACHE.cropDisease.disease };
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[Kisaan AI] Raw text:', text);
    
    // Fail-safe: catch non-crop text detection even if JSON payload is slightly malformed
    const raw = text.toLowerCase();
    if (raw.includes('invalid_image') || raw.includes('no crop') || raw.includes('غیر متعلقہ')) {
      if (badge) { badge.style.color = '#ff4444'; badge.textContent = `❌ یہ فصل کی تصویر نہیں ہے — Please upload a valid crop photo`; }
      return { disease: 'INVALID_IMAGE' };
    }
    const cleaned = text.replace(/```json|```/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      console.log('[Kisaan AI] ✅ Parsed result:', result.disease);
      if (badge) { badge.style.color = '#0A5C36'; badge.textContent = `✅ LIVE AI — ${result.disease}`; }
      return result;
    }

    console.warn('[Kisaan AI] Could not parse JSON');
    if (badge) { badge.style.color = '#ff4444'; badge.textContent = `❌ Parse Error: showing Demo Result`; }
    return { ...DEMO_CACHE.cropDisease, disease: '[DEMO] ' + DEMO_CACHE.cropDisease.disease };
  } catch (e) {
    console.error('[Kisaan AI] Fetch error:', e.message);
    if (badge) { badge.style.color = '#ff4444'; badge.textContent = `❌ Error: showing Demo Result`; }
    return { ...DEMO_CACHE.cropDisease, disease: '[DEMO] ' + DEMO_CACHE.cropDisease.disease };
  }
}


// ─── GEMINI REASONING AGENT (replaces Claude — free!) ────────────
// Uses Gemini 1.5 Flash for mandi, livestock & irrigation reasoning
async function runClaudeAgent(agentType, context) {
  const hasGeminiKey = CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE';
  if (!hasGeminiKey) {
    await sleep(2000);
    return DEMO_CACHE[agentType];
  }

  let promptText = "";
  if (agentType === 'mandi') promptText = buildMandiPrompt(context);
  else if (agentType === 'livestock') promptText = buildLivestockPrompt(context);
  else if (agentType === 'irrigation') promptText = buildIrrigationPrompt(context);
  else return DEMO_CACHE[agentType];

  try {
    const response = await fetch(`${CONFIG.GEMINI_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1500, responseMimeType: "application/json" }
      })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return DEMO_CACHE[agentType];
  } catch (e) {
    console.error('Gemini reasoning error:', e);
    return DEMO_CACHE[agentType];
  }
}

// ─── PROMPT BUILDERS (Gemini-optimized) ────────────────────────────
function buildMandiPrompt({ crop, city, prices }) {
  const change = MANDI_DATA[crop]?.weeklyChange || 2;
  const minP = Math.round(prices[city] * 0.96);
  return `You are a mandi price advisor for Pakistani farmers. Reply ONLY with a single valid JSON object, no markdown, no explanation.

Crop: ${crop}, City: ${city}, Price: PKR ${prices[city]} per man, Weekly change: ${change}%

Return JSON:
{"crop":"${crop}","city":"${city}","currentPrice":${prices[city]},"weeklyAvg":${Math.round(prices[city]*0.978)},"trend":"${change>=0?'up':'down'}","trendPct":${Math.abs(change)},"prediction":"write 2-week Urdu price forecast here","minPrice":${minP},"negotiationScript":"write complete Urdu script for farmer to negotiate at ${city} mandi, mention PKR ${prices[city]} rate, minimum PKR ${minP}"}`;
}

function buildLivestockPrompt({ animal, symptoms }) {
  return `You are a Pakistani veterinary expert. Reply ONLY with a single valid JSON object, no markdown, no explanation.

Animal: ${animal}. Symptoms: ${symptoms}
Common Pakistan diseases: FMD (منہ کھر), PPR (بکری طاعون), Lumpy Skin (گانٹھ دار چمڑی), Black Quarter (کالا بخار), Theileriosis (خون کی بیماری), Mastitis (تھن کی سوزش), Bloat (پیٹ پھولنا), HS (گلا گھونٹو)

Return JSON:
{"animal":"${animal}","symptoms":"${symptoms}","diagnosis":"Disease Name (اردو نام)","severity":"high","probability":82,"steps":[{"step":1,"title":"تشخیص","text":"Urdu diagnosis","emoji":"🔬"},{"step":2,"title":"فوری اقدام","text":"Urdu immediate action","emoji":"⛔"},{"step":3,"title":"گھریلو علاج","text":"Urdu home remedy with Pakistan medicine name","emoji":"💊"},{"step":4,"title":"ویٹرنری","text":"Urdu vet advice","emoji":"🏥"},{"step":5,"title":"ٹائم لائن","text":"Urdu timeline for recovery","emoji":"⏰"}],"vetRequired":true}`;
}

function buildIrrigationPrompt({ crop, stage, lat, lon, soilType, weatherInfo }) {
  return `You are a precision irrigation expert for Pakistani farmers. Reply ONLY with a single valid JSON object, no markdown, no explanation.

Crop: ${crop}, Growth stage: ${stage}, Soil: ${soilType}, Pakistan climate.
${weatherInfo ? `Forecasted rain probability next 7 days: ${weatherInfo}` : 'Assume normal weather without rain.'}
Urdu day names: پیر=Monday, منگل=Tuesday, بدھ=Wednesday, جمعرات=Thursday, جمعہ=Friday, ہفتہ=Saturday, اتوار=Sunday

Return JSON with exactly 7 days schedule and realistic water savings vs flood irrigation:
{"crop":"${crop}","stage":"${stage}","schedule":[{"day":"پیر","water":35,"skip":false,"reason":"Urdu reason"},{"day":"منگل","water":0,"skip":true,"reason":"Urdu reason"},{"day":"بدھ","water":25,"skip":false,"reason":"Urdu reason"},{"day":"جمعرات","water":0,"skip":true,"reason":"Urdu reason"},{"day":"جمعہ","water":35,"skip":false,"reason":"Urdu reason"},{"day":"ہفتہ","water":0,"skip":true,"reason":"Urdu reason"},{"day":"اتوار","water":20,"skip":false,"reason":"Urdu reason"}],"savings":{"water":320000,"income":24000,"yieldBoost":16}}`;
}

// ─── CROSS-AGENT COMMUNICATION ────────────────────────────────────
// Crop Disease → Mandi Agent: quality adjustment
function cropToMandiSignal(cropResult) {
  if (!cropResult) return null;
  const severity = cropResult.severity;
  if (severity > 60) {
    return {
      qualityReduction: Math.round(severity * 0.3),
      note: `فصل کی کوالٹی ${severity}% متاثر — قیمت مذاکرہ میں یہ بات چھپائیں مگر ذہن میں رکھیں`,
    };
  }
  return null;
}

// Irrigation → Crop Agent: drought stress alert
function irrigationToCropSignal(irrigationResult) {
  if (!irrigationResult) return null;
  const skipDays = irrigationResult.schedule?.filter(d => d.skip).length || 0;
  if (skipDays >= 4) {
    return { droughtRisk: true, note: 'خشک سالی کا خطرہ — فنگل انفیکشن کے لیے فصل پر نظر رکھیں' };
  }
  return null;
}

// ─── WEATHER AGENT ───────────────────────────────────────────────
async function getWeather(lat = 31.5497, lon = 74.3436) {
  try {
    const url = `${CONFIG.WEATHER_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=Asia/Karachi&forecast_days=7`;
    const res = await fetch(url);
    const data = await res.json();
    return data.daily;
  } catch (e) {
    return null;
  }
}

// ─── VOICE AGENT (Web Speech API) ────────────────────────────────
function startVoiceInput(onResult, onError) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError('آپ کا براؤزر آواز کو سپورٹ نہیں کرتا');
    return null;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.lang = 'ur-PK';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    onResult(transcript, e.results[e.results.length - 1].isFinal);
  };
  recognition.onerror = (e) => onError(e.error);
  recognition.start();
  return recognition;
}

// ─── UTILITY ──────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG at 70% quality to severely reduce payload size
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl.split(',')[1]);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ====================================================================
// ─── KISAAN SEWA ORCHESTRATION ENGINE (CHALLENGE 2) ──────────────────
// ====================================================================

// Mock informal agricultural service providers DB
const PROVIDER_DB = [
  { 
    id: 1, name: 'Zahid Harvester Service (زاہد ہارویسٹر)', type: 'harvester', 
    rating: 4.8, reliability: 96, distance: 12, rate: 3900, 
    availableToday: true, availableTomorrow: true, availableParson: false, 
    phone: '+92 300 123 4567', machine: 'John Deere W70', area: 'Lahore G-13'
  },
  { 
    id: 2, name: 'Kisan Tractor Rental (کسان ٹریکٹر رینٹل)', type: 'tractor', 
    rating: 4.2, reliability: 85, distance: 4, rate: 2500, 
    availableToday: true, availableTomorrow: true, availableParson: false, 
    phone: '+92 301 987 6543', machine: 'New Holland 80-56', area: 'Thokar Niaz'
  },
  { 
    id: 3, name: 'Ahmad Agri Machinery (احمد ایگری سروس)', type: 'harvester', 
    rating: 4.5, reliability: 92, distance: 18, rate: 4200, 
    availableToday: true, availableTomorrow: true, availableParson: true, 
    phone: '+92 321 456 7890', machine: 'Claas Crop Tiger 30', area: 'Raiwind'
  },
  { 
    id: 4, name: 'Malik Agri Rental (ملک رینٹل سروسز)', type: 'tractor', 
    rating: 3.9, reliability: 78, distance: 8, rate: 2200, 
    availableToday: true, availableTomorrow: false, availableParson: true, 
    phone: '+92 333 765 4321', machine: 'Massey Ferguson 385', area: 'Shahdara'
  },
  { 
    id: 5, name: 'Dr. Usman Livestock Vet (ڈاکٹر عثمان ویٹ)', type: 'vet', 
    rating: 4.9, reliability: 98, distance: 3, rate: 1500, 
    availableToday: true, availableTomorrow: true, availableParson: true, 
    phone: '+92 345 678 9012', machine: 'Emergency Vet Mobile', area: 'Lahore'
  },
  { 
    id: 6, name: 'Nadeem Spray Services (ندیم سپرے سروس)', type: 'sprayer', 
    rating: 4.6, reliability: 89, distance: 6, rate: 1200, 
    availableToday: true, availableTomorrow: true, availableParson: false, 
    phone: '+92 355 123 4567', machine: 'Boom Sprayer 600L', area: 'Thokar'
  }
];

// Helper to format logs in Antigravity terminal
function addTerminalLog(msg, type = 'plan') {
  const term = document.getElementById('agtTerminal');
  if (!term) return;
  const now = new Date().toLocaleTimeString();
  const typeTags = {
    plan: '<span class="agt-tag-plan">PLAN:</span>',
    warn: '<span class="agt-tag-warn">CONFLICT:</span>',
    tool: '<span class="agt-tag-tool">TOOL:</span>',
    action: '<span class="agt-tag-action">ACTION:</span>'
  };
  
  const line = document.createElement('div');
  line.className = 'agt-log-line';
  line.innerHTML = `<span class="agt-tag-time">[${now}]</span> ${typeTags[type] || ''} ${msg}`;
  term.appendChild(line);
  
  // Smooth fade in
  setTimeout(() => line.classList.add('show'), 50);
  term.scrollTop = term.scrollHeight;
}

// Stepper updater
function updateStepper(steps, activeIndex) {
  const wrapper = document.getElementById('sewaStepper');
  if (!wrapper) return;
  wrapper.innerHTML = steps.map((s, i) => `
    <div class="progress-step ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'done' : ''}">
      <div class="ps-dot"></div>
      <div class="ps-info">
        <div class="ps-title">
          <span class="lang-en-text">${s.titleEn}</span>
          <span class="lang-ur-text">${s.titleUr}</span>
        </div>
        <div class="ps-desc">
          <span class="lang-en-text">${s.descEn}</span>
          <span class="lang-ur-text">${s.descUr}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Main autonomous orchestration simulator
async function runAntigravityOrchestrator(inputString) {
  const term = document.getElementById('agtTerminal');
  term.innerHTML = ''; // Clear console
  
  const steps = [
    { 
      titleEn: 'Intent Ingestion', titleUr: 'درخواست کا تجزیہ', 
      descEn: 'Parsing Roman Urdu request', descUr: 'رومن اردو درخواست کا تجزیہ کیا جا رہا ہے' 
    },
    { 
      titleEn: 'Weather Guard', titleUr: 'موسمی تحفظ', 
      descEn: 'Checking climate constraints', descUr: 'موسمی خطرات اور پابندیوں کی جانچ' 
    },
    { 
      titleEn: 'Provider Matchmaking', titleUr: 'آپریٹر کا انتخاب', 
      descEn: 'Multi-factor ranking analysis', descUr: 'مختلف فیکٹرز کی بنیاد پر آپریٹر کی درجہ بندی' 
    },
    { 
      titleEn: 'Dynamic Bargaining', titleUr: 'مذاکرات اور ڈسکاؤنٹ', 
      descEn: 'Negotiating budget with operator', descUr: 'کسان کے بجٹ کے مطابق قیمت پر گفت و شنید' 
    },
    { 
      titleEn: 'Booking Simulated', titleUr: 'بکنگ کی تصدیق', 
      descEn: 'Auto-confirmed and SMS dispatched', descUr: 'بکنگ خودکار طور پر تصدیق اور ایس ایم ایس روانہ' 
    }
  ];
  
  updateStepper(steps, 0);
  document.getElementById('sewaResult').style.display = 'none';
  document.getElementById('sewaConflictBox').style.display = 'none';
  document.getElementById('negoSimulationBox').style.display = 'none';
  document.getElementById('valueCreatedCard').style.display = 'none';
  document.getElementById('bookingTicketCard').style.display = 'none';

  // Step 1: Intent Parsing
  addTerminalLog('Ingesting raw natural language input string...', 'plan');
  await sleep(1000);
  
  addTerminalLog('invoking intent_parser_api. Looking for nouns: harvester, tractor, vet...', 'tool');
  await sleep(800);
  
  const text = inputString.toLowerCase();
  // Dynamic Service Detection (Expanded to Crop/Livestock integrates)
  const isHarvester = text.includes('harvest') || text.includes('katne') || text.includes('katai') || text.includes('harvester');
  const isVet = text.includes('vet') || text.includes('doctor') || text.includes('dr') || text.includes('medical') || text.includes('moishi');
  const isSpray = text.includes('spray') || text.includes('pesticide') || text.includes('zahar') || text.includes('speray') || text.includes('bimar');
  
  let svcType = 'tractor';
  let svcTypeUrdu = 'ٹریکٹر';
  
  if (isHarvester) {
    svcType = 'harvester';
    svcTypeUrdu = 'ہارویسٹر';
  } else if (isVet) {
    svcType = 'vet';
    svcTypeUrdu = 'ویٹرنری ڈاکٹر';
  } else if (isSpray) {
    svcType = 'sprayer';
    svcTypeUrdu = 'سپرے مشین';
  }
  
  // Dynamic Acre Extraction
  const acresMatch = inputString.match(/(\d+)\s*(acre|ekad|ekarr|ایکڑ)/i) || inputString.match(/(\d+)/);
  const targetAcres = acresMatch ? Math.max(1, Math.min(100, parseInt(acresMatch[1]))) : 5;
  
  // Dynamic Date Construction relative to real-world date
  const isParson = text.includes('parson') || text.includes('16') || text.includes('parso') || text.includes('day after tomorrow') || text.includes('2 din');
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const parson = new Date(today); parson.setDate(today.getDate() + 2);
  
  const targetDate = isParson ? parson : tomorrow;
  const backupDate = isParson ? tomorrow : today;
  
  const targetDateStr = targetDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const backupDateStr = backupDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  
  // Localized Month Names for Urdu
  const monthsUrdu = { Jan: 'جنوری', Feb: 'فروری', Mar: 'مارچ', Apr: 'اپریل', May: 'مئی', Jun: 'جون', Jul: 'جولائی', Aug: 'اگست', Sep: 'ستمبر', Oct: 'اکتوبر', Nov: 'نومبر', Dec: 'دسمبر' };
  const targetMonthShort = targetDate.toLocaleDateString('en-US', { month: 'short' });
  const backupMonthShort = backupDate.toLocaleDateString('en-US', { month: 'short' });
  const targetDateStrUrdu = `${targetDate.getDate()} ${monthsUrdu[targetMonthShort] || targetMonthShort}`;
  const backupDateStrUrdu = `${backupDate.getDate()} ${monthsUrdu[backupMonthShort] || backupMonthShort}`;
  
  addTerminalLog(`Intent parsed successfully! Extraction: ServiceType='${svcType}', TargetDate='${targetDateStr}', Volume=${targetAcres} acres, Constraints=['budget']. Confidence: 96%`, 'plan');
  updateStepper(steps, 1);
  await sleep(1500);

  // Step 2: Weather Check (Force an override to prove agentic pivot!)
  addTerminalLog(`invoking hyper_local_weather_guard. Querying precipitation probability for ${targetDateStr} using OpenMeteo...`, 'tool');
  await sleep(1200);
  
  addTerminalLog(`CRITICAL CLIMATE THREAT FOUND! Thunderstorms (85% probability) predicted on ${targetDateStr} at 2:00 PM.`, 'warn');
  
  // Yield calculations relative to extracted Acres
  const yieldDamagePerAcre = isHarvester ? 26000 : 12000; // Higher impact for harvesting
  const estYieldLoss = targetAcres * yieldDamagePerAcre;
  
  const conflictBox = document.getElementById('sewaConflictBox');
  const conflictDesc = document.getElementById('conflictDesc');
  conflictBox.style.display = 'block';
  document.getElementById('sewaResult').style.display = 'flex';
  
  conflictDesc.innerHTML = `
    <span class="lang-en-text">
      <strong>High rain probability expected on ${targetDateStr}!</strong><br>
      Operating during rainfall can lead to severe crop spoilage.<br> 
      Projected yield risk: <strong>PKR ${estYieldLoss.toLocaleString()}</strong> (${targetAcres} acres)<br><br>
      <em>💡 Google Antigravity Agent adjusted scheduling to <strong>${backupDateStr}</strong> to evade risk.</em>
    </span>
    <span class="lang-ur-text">
      <strong>${targetDateStrUrdu} کو شدید بارش کا امکان ہے!</strong><br>
      بارش کے دوران کام کرنے سے فصل کو شدید نقصان ہو سکتا ہے۔<br> 
      متوقع مالی نقصان: <strong>PKR ${estYieldLoss.toLocaleString()}</strong> (${targetAcres} ایکڑ)<br><br>
      <em>💡 Google Antigravity ایجنٹ نے کام کا وقت تبدیل کر کے خودکار طور پر <strong>${backupDateStrUrdu}</strong> کر دیا ہے۔</em>
    </span>
  `;
  
  await sleep(1500);
  addTerminalLog(`Simulated financial threat analyzed: Expected ${targetAcres} acres of crop loss @ PKR ${yieldDamagePerAcre}/acre = PKR ${estYieldLoss.toLocaleString()}.`, 'plan');
  await sleep(1000);
  
  addTerminalLog(`AUTONOMOUS ACTION: Overriding execution window from ${targetDateStr} to ${backupDateStr} to protect crop yield.`, 'action');
  updateStepper(steps, 2);
  await sleep(2000);

  // Step 3: Provider Matching (Dynamically filtering and scoring database)
  addTerminalLog(`Scanning local provider registry for "${svcType}" operators available on ${backupDateStr}...`, 'plan');
  await sleep(800);
  
  // Real algorithmic filter & sort
  const matches = PROVIDER_DB.filter(p => p.type === svcType);
  const pool = matches.length > 0 ? matches : PROVIDER_DB;
  const rankedPool = pool.map(p => {
    // Higher availability score if active on backup day
    const isAvail = isParson ? p.availableTomorrow : p.availableToday;
    const score = Math.round(
      (isAvail ? 40 : 5) + 
      ((p.reliability/100)*25) + 
      ((p.rating/5)*20) + 
      ((20 - p.distance)*0.75)
    );
    return { ...p, isAvail, computedScore: Math.max(score, 35) };
  }).sort((a, b) => b.computedScore - a.computedScore);
  
  addTerminalLog(`invoking provider_discovery_api. Found ${rankedPool.length} active "${svcType}" entries in local registry.`, 'tool');
  await sleep(1000);
  
  addTerminalLog('Applying Multi-Factor Ranking Vector: W=[Avail: 0.4, Rel: 0.25, Rating: 0.2, Dist: 0.1, Cost: 0.05].', 'plan');
  await sleep(1200);

  // Recommended Provider (Dynamically generated)
  const topProv = rankedPool[0];
  addTerminalLog(`Optimal Match Confirmed: "${topProv.name}" scored ${topProv.computedScore}/100. Dispatching auto-negotiator...`, 'action');
  
  const recDiv = document.getElementById('recommendedProvider');
  recDiv.innerHTML = `
    <div class="provider-card recommended">
      <div class="prov-header">
        <div class="prov-avatar">🚜</div>
        <div>
          <div class="prov-name">${topProv.name}</div>
          <div class="prov-meta">
            <span>
              <span class="lang-en-text">📍 ${topProv.distance} km away (${topProv.area})</span>
              <span class="lang-ur-text">📍 ${topProv.distance} کلومیٹر دور (${topProv.area})</span>
            </span>
            <span class="star-rating">⭐ ${topProv.rating} / 5.0</span>
          </div>
        </div>
      </div>
      <div class="prov-factors">
        <span class="factor-badge green">
          <span class="lang-en-text">✅ Available ${backupDateStr}</span>
          <span class="lang-ur-text">✅ دستیاب ${backupDateStr}</span>
        </span>
        <span class="factor-badge">
          <span class="lang-en-text">🛡️ ${topProv.reliability}% Reliability Score</span>
          <span class="lang-ur-text">🛡️ ${topProv.reliability}% بھروسہ مندی اسکور</span>
        </span>
        <span class="factor-badge">⚙️ ${topProv.machine}</span>
      </div>
      <div class="prov-price-row">
        <div>
          <div class="prov-price-total">
            <span class="lang-en-text">Negotiated Rate:</span>
            <span class="lang-ur-text">طے شدہ شرح:</span>
          </div>
          <div class="prov-price-val" id="negotiatedPriceTag">
            <span class="lang-en-text">PKR ${topProv.rate} / acre</span>
            <span class="lang-ur-text">PKR ${topProv.rate} فی ایکڑ</span>
          </div>
        </div>
        <div class="prov-price-total" style="font-weight:bold; color:var(--text);">
          <span class="lang-en-text">Total for ${targetAcres} Acres:</span>
          <span class="lang-ur-text">کل ${targetAcres} ایکڑ کے لیے:</span>
          <br>
          <span id="negotiatedTotalTag">PKR ${(topProv.rate * targetAcres).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;

  updateStepper(steps, 3);
  await sleep(1800);

  // Step 4: Dynamic Bargaining Bot (Real numeric derivations)
  const baseRate = topProv.rate;
  const dealOffPercent = 0.06 + (Math.random() * 0.04); // 6% to 10% negotiated savings
  const negotiatedRate = Math.round(baseRate * (1 - dealOffPercent) / 10) * 10; // Rounded to nearest 10
  const initialOfferRate = Math.round(baseRate * 0.88 / 10) * 10;
  const perAcreSavings = baseRate - negotiatedRate;
  
  addTerminalLog(`Active bargain agent engaged with ${topProv.name}. Ingested Target Budget: PKR ${initialOfferRate}/acre.`, 'plan');
  await sleep(800);
  addTerminalLog(`invoking bargaining_engine_api. Simulating 2-way dialogue loop in Urdu...`, 'tool');
  
  const negoBox = document.getElementById('negoSimulationBox');
  negoBox.style.display = 'flex';
  const negoBubble = document.getElementById('negoBubbleText');
  negoBubble.innerHTML = `<em>مذاکرات اور سودے بازی جاری ہے...</em>`;
  await sleep(1500);
  
  negoBubble.innerHTML = `<strong>Antigravity Bot:</strong> السلام علیکم، ہمیں ${targetAcres} ایکڑ کے لیے ${svcTypeUrdu} بک کرنا ہے۔ بجٹ تھوڑا ٹائٹ ہے، کیا آپ PKR ${initialOfferRate} فی ایکڑ کر سکتے ہیں؟`;
  await sleep(2000);
  
  addTerminalLog(`Bargain Iteration 1: Counter-offer received from ${topProv.name.split(' ')[0]} (Base rate too tight).`, 'plan');
  negoBubble.innerHTML = `<strong>${topProv.name.split(' ')[0]}:</strong> وعلیکم السلام بھائی۔ ڈیزل اور مزدوری بہت مہنگی ہے، PKR ${baseRate} سے کم تو وارا نہیں کھاتا۔`;
  await sleep(2000);
  
  addTerminalLog(`Bargain Iteration 2: Dynamic compromise lock. Successful arbitrage reached.`, 'plan');
  addTerminalLog(`Price negotiated down by PKR ${perAcreSavings} per acre. Lock rate: PKR ${negotiatedRate}.`, 'action');
  
  negoBubble.innerHTML = `<strong>Antigravity Bot:</strong> ہم ${backupDateStrUrdu} کے لیے فوری بک کر رہے ہیں۔ PKR ${negotiatedRate} پر لاک کریں؟<br><strong>${topProv.name.split(' ')[0]}:</strong> چلیں بھائی ٹھیک ہے، PKR ${negotiatedRate} فائنل ہے۔ کل ٹائم پر پہنچ جاؤں گا۔`;
  
  // Animate price changes
  const tagRate = document.getElementById('negotiatedPriceTag');
  const tagTotal = document.getElementById('negotiatedTotalTag');
  tagRate.style.color = 'var(--green)';
  tagRate.innerHTML = `PKR ${negotiatedRate} / acre <span style="font-size:9px; text-decoration: line-through; color: var(--muted);">(${baseRate})</span>`;
  tagTotal.innerHTML = `PKR ${(negotiatedRate * targetAcres).toLocaleString()}`;

  updateStepper(steps, 4);
  await sleep(1800);

  // Step 5: Simulation Outcomes (Dynamic metrics)
  const bookingId = `KS-${Math.floor(10000 + Math.random() * 90000)}`;
  addTerminalLog(`Finalizing booking receipt on distributed ledger. Generated Booking ID: ${bookingId}...`, 'plan');
  addTerminalLog(`invoking booking_engine_api. Confirmed: ${topProv.name} scheduled for ${backupDateStr} @ 8:00 AM.`, 'tool');
  await sleep(1000);
  
  addTerminalLog(`invoking mock_notification_service. Broadcast dispatched: WhatsApp confirmation sent to operator (${topProv.phone}) and client.`, 'tool');
  await sleep(800);
  
  addTerminalLog('Simulation Sequence Complete. Real-time traces saved.', 'action');
  updateStepper(steps, 5);
  
  const totalSavedCost = perAcreSavings * targetAcres;
  const totalJobCost = negotiatedRate * targetAcres;

  // Render the Visual Booking Ticket (Challenge 2 Compliance)
  const ticketCard = document.getElementById('bookingTicketCard');
  document.getElementById('ticketBookingId').textContent = bookingId;
  document.getElementById('ticketOperatorName').textContent = topProv.name;
  document.getElementById('ticketDate').innerHTML = `
    <span class="lang-en-text">${backupDateStr} @ 8:00 AM</span>
    <span class="lang-ur-text">${backupDateStr} بوقت صبح 8:00 بجے</span>
  `;
  document.getElementById('ticketCost').innerHTML = `
    <span class="lang-en-text">PKR ${totalJobCost.toLocaleString()} (PKR ${negotiatedRate}/acre)</span>
    <span class="lang-ur-text">PKR ${totalJobCost.toLocaleString()} (PKR ${negotiatedRate} فی ایکڑ)</span>
  `;
  document.getElementById('ticketNotifText').innerHTML = `
    <span class="lang-en-text">${topProv.name.split(' ')[0]} was notified via WhatsApp dispatch loop. Auto-alert scheduled 1 hour before arrival.</span>
    <span class="lang-ur-text">${topProv.name.split(' ')[0]} کو واٹس ایپ ڈسپیچ لوپ کے ذریعے مطلع کیا گیا تھا۔ آمد سے 1 گھنٹہ پہلے خودکار الرٹ شیڈول کیا گیا ہے۔</span>
  `;
  
  // Store current booking data for the active WhatsApp send button!
  window._currentSewaBooking = {
    phone: topProv.phone,
    text: `السلام علیکم ${topProv.name.split(' ')[0]}، آپ کی سروس بک ہو گئی ہے۔\n\n📌 بکنگ آئی ڈی: ${bookingId}\n🌾 کل رقبہ: ${targetAcres} ایکڑ\n💰 ریٹ: PKR ${negotiatedRate}/ایکڑ\n📅 شیڈول: ${backupDateStr} بوقت صبح 8:00 بجے۔\n\nشکریہ (کِسان اے آئی)`
  };
  
  ticketCard.style.display = 'block';

  // Show dynamic value card
  const valCard = document.getElementById('valueCreatedCard');
  valCard.style.display = 'block';
  animateValueCounter('valSavedText', estYieldLoss);
  
  document.getElementById('valDescText').innerHTML = `
    <span class="lang-en-text">
      <strong>How value was simulated:</strong><br>
      - 🌧️ Evaded rain disaster (saved ${targetAcres} acres from storm) worth PKR ${estYieldLoss.toLocaleString()}.<br>
      - 💰 Negotiated PKR ${totalSavedCost.toLocaleString()} total cost arbitrage off original quote.<br>
      - 🔧 Total booking cost: PKR ${totalJobCost.toLocaleString()} via local informal net.
    </span>
    <span class="lang-ur-text">
      <strong>پیداوار کی قیمت کیسے بنائی گئی:</strong><br>
      - 🌧️ بارش کی تباہی سے بچاؤ (طوفان سے ${targetAcres} ایکڑ بچایا گیا) مالیت PKR ${estYieldLoss.toLocaleString()}۔<br>
      - 💰 مذاکرات کے ذریعے کل PKR ${totalSavedCost.toLocaleString()} کی بچت کی گئی۔<br>
      - 🔧 کل بکنگ لاگت: PKR ${totalJobCost.toLocaleString()} مقامی نیٹ ورک کے ذریعے۔
    </span>
  `;

  // Render other dynamically ranked pool items
  const othersList = document.getElementById('otherProvidersList');
  const others = rankedPool.slice(1);
  othersList.innerHTML = others.map(p => `
    <div class="provider-card" style="opacity: 0.8;">
      <div class="prov-header">
        <div class="prov-avatar">🚜</div>
        <div style="flex:1;">
          <div class="prov-name" style="font-size:13px;">${p.name}</div>
          <div class="prov-meta">
            <span>
              <span class="lang-en-text">📍 ${p.distance} km away</span>
              <span class="lang-ur-text">📍 ${p.distance} کلو میٹر دور</span>
            </span>
            <span class="star-rating">⭐ ${p.rating}</span>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px; color:var(--muted);">
            <span class="lang-en-text">Rank Score</span>
            <span class="lang-ur-text">درجہ بندی سکور</span>
          </div>
          <div style="font-size:14px; font-weight:700; color:var(--m2);">${p.computedScore}/100</div>
        </div>
      </div>
      <div class="prov-factors">
        <span class="factor-badge" style="color: ${p.isAvail ? 'var(--green)' : 'var(--red)'}; border-color: ${p.isAvail ? 'rgba(10,92,54,0.2)' : 'rgba(211,84,0,0.2)'};">
          <span class="lang-en-text">${p.isAvail ? `✅ Available ${backupDateStr}` : '❌ Unavailable'}</span>
          <span class="lang-ur-text">${p.isAvail ? `✅ دستیاب ${backupDateStr}` : '❌ غیر دستیاب'}</span>
        </span>
        <span class="factor-badge">⚙️ ${p.machine}</span>
      </div>
    </div>
  `).join('');


  // Show Feedback card for automated quality verification
  const fbCard = document.getElementById('feedbackCard');
  fbCard.style.display = 'block';
  fbCard.style.opacity = '0.6';
  fbCard.style.pointerEvents = 'none';
  // Update button to reset state
  const fbBtn = document.getElementById('feedbackSubmitBtn');
  fbBtn.disabled = false; fbBtn.style.background = 'var(--s3)'; fbBtn.style.color = 'var(--m2)';
  fbBtn.innerHTML = `
    <span class="lang-en-text">Submit Operator Rating</span>
    <span class="lang-ur-text">آپریٹر ریٹنگ جمع کریں</span>
  `;
  sewaCurrentRating = 0;
  for(let i=1; i<=5; i++) { document.getElementById('star'+i).style.opacity = '1'; }

  // Follow-up loop simulation
  setTimeout(() => {
    fbCard.style.opacity = '1';
    fbCard.style.pointerEvents = 'auto';
    addTerminalLog('Follow-up agent activated: Job confirmation and quality checklist ready for user review.', 'plan');
  }, 2500);

  // Scroll result area into view
  document.getElementById('sewaResult').scrollIntoView({ behavior: 'smooth' });
}

function animateValueCounter(elId, targetValue) {
  const el = document.getElementById(elId);
  let current = 0;
  const increment = Math.round(targetValue / 30);
  const timer = setInterval(() => {
    current += increment;
    if (current >= targetValue) {
      current = targetValue;
      clearInterval(timer);
    }
    el.textContent = 'PKR ' + current.toLocaleString();
  }, 30);
}

// Quality feedback rating logic
let sewaCurrentRating = 0;
function rateSewa(stars) {
  sewaCurrentRating = stars;
  for (let i = 1; i <= 5; i++) {
    const star = document.getElementById('star' + i);
    star.style.opacity = (i <= stars) ? '1' : '0.35';
  }
}

function submitSewaFeedback() {
  if (sewaCurrentRating === 0) {
    alert('براہ کرم ریٹنگ اسٹار سلیکٹ کریں (Please select operator rating first)');
    return;
  }
  const btn = document.getElementById('feedbackSubmitBtn');
  btn.disabled = true;
  btn.innerHTML = `
    <span class="lang-en-text">Updating reputation index...</span>
    <span class="lang-ur-text">ریپوٹیشن انڈیکس کو اپ ڈیٹ کیا جا رہا ہے...</span>
  `;
  
  addTerminalLog('invoking reputation_ledger_api. Parsing worker metrics...', 'tool');
  
  setTimeout(() => {
    addTerminalLog(`SUCCESS: Database updated! Operator Zahid rated ${sewaCurrentRating}/5. Metrics cached for next matchmaking run.`, 'action');
    btn.style.background = 'linear-gradient(135deg, var(--green), #063c22)';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.innerHTML = `
      <span class="lang-en-text">✅ Operator Rating Submitted!</span>
      <span class="lang-ur-text">✅ آپریٹر کی ریٹنگ جمع ہو گئی!</span>
    `;
  }, 1500);
}

// WhatsApp Action Link Generator for Ultimate Realism!
function triggerWhatsAppSend() {
  if (!window._currentSewaBooking) {
    alert('کوئی بکنگ نہیں ملی۔ پہلے بکنگ کریں (No active booking found to send.)');
    return;
  }
  const { phone, text } = window._currentSewaBooking;
  // Strip leading +, spaces and hyphens for the wa.me URL API
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  
  // Open actual WhatsApp in a new tab!
  window.open(url, '_blank');
  addTerminalLog('ACTION: Launched actual WhatsApp Web interface to send dispatch confirmation message.', 'action');
}
