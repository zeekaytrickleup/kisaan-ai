// =============================================
// KISAAN AI — Main App Controller
// =============================================

// ── State ──────────────────────────────────────────────
const STATE = {
  currentScreen: 'home',
  weather: null,
  cropResult: null,
  mandiResult: null,
  livestockResult: null,
  irrigationResult: null,
  selectedAnimal: 'cow',
  voiceRecognition: null,
};

// ── Seasonal context (Phase 3 — expanded) ──────────────
const SEASONAL_DATA = {
  1: { en:'Wheat Growth Stage', ur:'گندم میں کانگ نکل رہی ہے', season:'rabi',
    tips:[
      { en: 'Irrigate wheat - tillering stage', ur: 'گندم کو ایک آبپاشی دیں — کانگ مرحلہ' },
      { en: 'Monitor for yellow rust - check daily', ur: 'زرد زنگ کی نگرانی کریں — روزانہ چیک کریں' },
      { en: 'Low temperature - high fungal risk', ur: 'درجہ حرارت کم — فنگل حملے کا خطرہ زیادہ' }
    ] },
  2: { en:'Pre-Harvest Alert', ur:'گندم پک رہی ہے', season:'rabi',
    tips:[
      { en: 'Book harvesting machinery now', ur: 'کٹائی مشینری ابھی بک کریں' },
      { en: 'Wait until grain is hard', ur: 'دانہ سخت ہونے تک انتظار کریں' },
      { en: 'Check market prices - good timing', ur: 'منڈی میں بھاؤ چیک کریں — اچھا وقت ہے' }
    ] },
  3: { en:'Wheat Harvest Season', ur:'گندم کی کٹائی', season:'rabi',
    tips:[
      { en: 'Harvest early in the morning - low moisture', ur: 'صبح سویرے کٹائی کریں — نمی کم ہوتی ہے' },
      { en: 'Store in dry place', ur: 'خشک جگہ اسٹوریج کریں' },
      { en: 'Purchase cotton seeds now', ur: 'کپاس کے بیج ابھی خریدیں' }
    ] },
  4: { en:'Cotton Sowing Season', ur:'کپاس کی بوائی', season:'kharif',
    tips:[
      { en: 'Use resistant BT Cotton varieties', ur: 'BT Cotton مزاحم اقسام استعمال کریں' },
      { en: 'Complete land preparation', ur: 'زمین کی تیاری مکمل کریں' },
      { en: 'Pre-arrange whitefly control measures', ur: 'وائٹ فلائی کنٹرول کا پہلے انتظام کریں' },
      { en: 'Treat seed with Imidacloprid', ur: 'بیج کو Imidacloprid سے ٹریٹ کریں' }
    ] },
  5: { en:'Cotton/Rice Sowing', ur:'کپاس اور چاول بوائی', season:'kharif',
    tips:[
      { en: 'Complete cotton sowing by May 15', ur: 'مئی 15 تک کپاس بوائی مکمل کریں' },
      { en: 'Prepare rice nursery beds', ur: 'چاول نرسری تیار کریں' },
      { en: 'Start sowing Kharif maize', ur: 'مکئی کی بوائی شروع کریں' },
      { en: 'Install pheromone traps to monitor pests', ur: 'فیرومون ٹریپ لگائیں' }
    ] },
  6: { en:'Kharif Season Begins', ur:'خریف کا موسم شروع', season:'kharif',
    tips:[
      { en: 'Focus on maize, rice, and cotton', ur: 'مکئی، چاول اور کپاس پر توجہ دیں' },
      { en: 'Irrigate in the evening - save water', ur: 'آبپاشی شام کو کریں — پانی بچائیں' },
      { en: 'Check rice for Brown Plant Hopper', ur: 'BPH کے لیے چاول کو چیک کریں' }
    ] },
  7: { en:'Kharif Peak', ur:'خریف عروج پر', season:'kharif',
    tips:[
      { en: 'Increase irrigation frequency in hot weather', ur: 'گرمی میں پانی زیادہ دیں' },
      { en: 'Check cotton for Boll Worm', ur: 'Boll Worm کے لیے کپاس چیک کریں' },
      { en: 'Monitor rice for blast disease', ur: 'چاول میں Blast کی نگرانی' }
    ] },
  8: { en:'Kharif Monitoring', ur:'خریف فصلوں کی نگرانی', season:'kharif',
    tips:[
      { en: 'Rice blast is common - spray Beam immediately', ur: 'چاول بلاسٹ عام ہے — Beam فوری سپرے' },
      { en: 'Cotton square and boll formation stage', ur: 'کپاس گھنڈی بننے کا مرحلہ' },
      { en: 'Start land preparation for wheat', ur: 'گندم کے لیے زمین تیار کرنا شروع کریں' }
    ] },
  9: { en:'Pre-Rabi Preparation', ur:'ربیع کی تیاری', season:'transition',
    tips:[
      { en: 'Get soil test done', ur: 'زمین کی جانچ کروائیں — مٹی ٹیسٹ' },
      { en: 'Buy wheat seed - use resistant varieties', ur: 'گندم کا بیج خریدیں — مزاحم اقسام' },
      { en: 'Stock fertilizer', ur: 'کھاد کا ذخیرہ کریں' }
    ] },
  10: { en:'Wheat Sowing Season', ur:'گندم کی بوائی', season:'rabi',
    tips:[
      { en: 'Oct 20 to Nov 20 - best sowing window', ur: 'اکتوبر 20 سے نومبر 20 — بہترین وقت' },
      { en: 'Inquilab-91 or Seher-2006 seeds', ur: 'Inquilab-91 یا Seher-2006 بیج' },
      { en: 'Must treat seed with fungicide - Raxil', ur: 'بیج ٹریٹمنٹ ضرور کریں — Raxil' },
      { en: 'First irrigation 3 weeks after sowing', ur: 'پہلی آبپاشی بوائی کے 3 ہفتے بعد' }
    ] },
  11: { en:'Wheat Growing Fast', ur:'گندم تیزی سے بڑھ رہی ہے', season:'rabi',
    tips:[
      { en: 'Complete wheat sowing by November 20', ur: 'نومبر 20 تک بوائی مکمل کریں' },
      { en: 'Provide first irrigation on time', ur: 'پہلی آبپاشی وقت پر دیں' },
      { en: 'Check regularly for rust diseases', ur: 'زنگ کے لیے پابندی سے چیک کریں' }
    ] },
  12: { en:'Rabi Season Care', ur:'ربیع فصل کی دیکھ بھال', season:'rabi',
    tips:[
      { en: 'Provide second irrigation to wheat', ur: 'گندم کو دوسری آبپاشی دیں' },
      { en: 'Yellow rust season begins', ur: 'زرد زنگ کا موسم شروع ہوتا ہے' },
      { en: 'Reduce irrigation frequency in cold weather', ur: 'سردی میں کم آبپاشی کریں' }
    ] },
};

function getSeasonalAlert() {
  const month = new Date().getMonth() + 1;
  return SEASONAL_DATA[month] || SEASONAL_DATA[5];
}

// ── Disease Encyclopedia (Phase 3) ─────────────────────
function renderEncyclopedia(filter = 'all') {
  const list = document.getElementById('diseaseList');
  const search = document.getElementById('encSearch')?.value.toLowerCase() || '';
  const sevColor = { high: 'var(--red)', medium: 'var(--orange)', low: 'var(--green)', critical: '#ff3333' };
  let filtered = filter === 'all' ? DISEASE_DB : DISEASE_DB.filter(d => d.crop === filter || d.crop === 'all');
  if (search) {
    filtered = filtered.filter(d => d.name.toLowerCase().includes(search) || d.urdu.includes(search));
  }
  
  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="es-icon">🔍</div>
        <p class="lang-en-text">No diseases found</p>
        <p class="lang-ur-text">کوئی بیماری نہیں ملی</p>
      </div>`;
    return;
  }
  
  list.innerHTML = filtered.map((d, i) => {
    const costText = d.cost > 0 
      ? 'PKR ' + d.cost.toLocaleString() 
      : `<span class="lang-en-text">Use resistant variety</span><span class="lang-ur-text">مزاحم قسم استعمال کریں</span>`;
      
    return `
      <div class="disease-card" id="dc${i}" onclick="toggleDiseaseCard(${i})">
        <div class="dc-head">
          <div class="dc-sev" style="background:${sevColor[d.severity] || 'var(--muted)'}"></div>
          <div style="flex:1">
            <div class="dc-name lang-en-text">${d.name}</div>
            <div class="dc-urdu lang-ur-text">${d.urdu}</div>
          </div>
          <div class="dc-crop-tag">
            <span class="lang-en-text">${d.crop === 'all' ? '🌿 All' : d.crop.toUpperCase()}</span>
            <span class="lang-ur-text">${d.crop === 'all' ? '🌿 تمام' : (MANDI_DATA[d.crop] ? MANDI_DATA[d.crop].name : d.crop)}</span>
          </div>
        </div>
        <div class="dc-body">
          <div class="dc-row">
            <div class="dc-icon">🔍</div>
            <div>
              <div class="dc-label">
                <span class="lang-en-text">Symptoms</span>
                <span class="lang-ur-text">علامات</span>
              </div>
              <div class="dc-val">${d.symptoms}</div>
            </div>
          </div>
          <div class="dc-row">
            <div class="dc-icon">💊</div>
            <div>
              <div class="dc-label">
                <span class="lang-en-text">Treatment</span>
                <span class="lang-ur-text">علاج</span>
              </div>
              <div class="dc-val">${d.treatment}</div>
            </div>
          </div>
          <div class="dc-row">
            <div class="dc-icon">🛡️</div>
            <div>
              <div class="dc-label">
                <span class="lang-en-text">Prevention</span>
                <span class="lang-ur-text">بچاؤ</span>
              </div>
              <div class="dc-val">${d.prevention}</div>
            </div>
          </div>
          <div class="dc-row">
            <div class="dc-icon">💰</div>
            <div>
              <div class="dc-label">
                <span class="lang-en-text">Cost Per Acre</span>
                <span class="lang-ur-text">لاگت فی ایکڑ</span>
              </div>
              <div class="dc-cost">${costText}</div>
            </div>
          </div>
          ${d.markets && d.markets.length ? `<div class="dc-markets">${d.markets.map(m => `<span class="dc-market-tag">${m}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleDiseaseCard(i) {
  document.getElementById('dc' + i)?.classList.toggle('open');
}

function filterDiseases(filter) {
  document.querySelectorAll('.enc-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });
  renderEncyclopedia(filter);
}

// ── Seasonal Tips Card (Phase 3) ────────────────────────
function renderSeasonalTips() {
  const month = new Date().getMonth() + 1;
  const data = SEASONAL_DATA[month] || SEASONAL_DATA[5];
  const monthNamesUr = ['جنوری','فروری','مارچ','اپریل','مئی','جون','جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'];
  const monthNamesEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  document.getElementById('seasonTipTitle').innerHTML = `
    <span class="lang-en-text">📅 Key Tasks for ${monthNamesEn[month-1]}</span>
    <span class="lang-ur-text">📅 ${monthNamesUr[month-1]} کے اہم کام</span>
  `;
  
  document.getElementById('seasonTipsList').innerHTML = data.tips.map(t =>
    `<div style="display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--m2)">
      <span style="color:var(--gold);flex-shrink:0">✓</span>
      <span class="lang-en-text" style="direction:ltr;line-height:1.6">${t.en}</span>
      <span class="lang-ur-text" style="font-family:'Noto Nastaliq Urdu',serif;direction:rtl;line-height:1.8">${t.ur}</span>
    </div>`
  ).join('');
}

// ── Home Disease Quick Tags (Phase 3) ──────────────────
function renderHomeDiseaseTags() {
  const sevColor = { high:'var(--red)', medium:'var(--orange)', low:'var(--green)', critical:'#ff3333' };
  const tags = DISEASE_DB.slice(0, 10);
  document.getElementById('homeDiseaseTags').innerHTML = tags.map(d =>
    `<span onclick="navigate('enc')" style="cursor:pointer;background:var(--s2);border:1px solid ${sevColor[d.severity]}33;
     border-radius:20px;padding:4px 10px;font-size:10px;color:${sevColor[d.severity]};display:inline-flex;gap:4px;align-items:center">
      <span style="width:5px;height:5px;background:${sevColor[d.severity]};border-radius:50%;display:inline-block"></span>
      <span class="lang-en-text">${d.name}</span>
      <span class="lang-ur-text">${d.urdu}</span>
    </span>`
  ).join('');
}

// ── Navigation ──────────────────────────────────────────
function navigate(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('screen-' + screenId)?.classList.add('active');
  document.getElementById('nav-' + screenId)?.classList.add('active');
  STATE.currentScreen = screenId;

  // Dynamically update the Unified Global Header
  document.querySelectorAll('.global-logo-item').forEach(el => el.style.display = 'none');
  const activeLogo = document.getElementById('gl-' + screenId);
  if (activeLogo) activeLogo.style.display = 'block';

  // Toggle Global Back Button visibility (only show on sub-screens)
  const backBtn = document.getElementById('globalBackBtn');
  if (backBtn) {
    backBtn.style.display = screenId === 'home' ? 'none' : 'block';
  }
}

// ── Splash ──────────────────────────────────────────────
function initSplash() {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('app').classList.add('visible');
    setTimeout(() => document.getElementById('splash').remove(), 600);
    initHome();
    renderEncyclopedia(); // Phase 3: pre-render encyclopedia
  }, 2600);
}

// ── Home Screen ─────────────────────────────────────────
async function initHome() {
  updateSeasonalAlertUI();

  // Phase 3: seasonal tips + disease tags
  renderSeasonalTips();
  renderHomeDiseaseTags();

  const weather = await Promise.race([
    getWeather(),
    new Promise(r => setTimeout(() => r(null), 5000))
  ]);
  if (weather) {
    STATE.weather = weather;
    const temp = Math.round(weather.temperature_2m_max[0]);
    const rain = weather.precipitation_probability_max[0];
    document.getElementById('weatherChip').textContent = `🌡️ ${temp}°C · 🌧️ ${rain}%`;
    updateSeasonalAlertUI(); // Freshly render seasonal alerts with loaded weather warnings!
  } else {
    document.getElementById('weatherChip').textContent = '🌡️ -- · 🌧️ --';
  }

  // Load mandi prices strip
  renderMandStrip();
}

function renderMandStrip() {
  const strip = document.getElementById('priceStrip');
  strip.innerHTML = Object.entries(MANDI_DATA).map(([key, d]) => {
    const price = d.prices.lahore;
    const chg = d.weeklyChange;
    const cls = chg >= 0 ? 'pc-up' : 'pc-down';
    const arrow = chg >= 0 ? '▲' : '▼';
    return `<div class="price-chip">
      <div class="pc-crop">${d.icon} ${d.nameEn}</div>
      <div class="pc-price" style="color:var(--gold)">PKR ${price.toLocaleString()}</div>
      <div class="pc-change ${cls}">${arrow} ${Math.abs(chg)}% this week</div>
    </div>`;
  }).join('');
}

// ── Crop Disease Module ─────────────────────────────────
function initCropModule() {
  const zone = document.getElementById('cropUploadZone');
  const input = document.getElementById('cropInput');
  const preview = document.getElementById('cropPreviewWrap');
  const img = document.getElementById('cropPreview');
  const btn = document.getElementById('analyzeBtn');

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('drag');
    handleCropFile(e.dataTransfer.files[0]);
  });

  input.addEventListener('change', () => handleCropFile(input.files[0]));

  function handleCropFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    img.src = url;
    preview.style.display = 'block';
    btn.classList.add('visible');
    btn._file = file;
  }

  btn.addEventListener('click', () => {
    if (!btn._file) return;
    // Validate file type
    if (!btn._file.type.startsWith('image/')) {
      alert('صرف تصویر اپلوڈ کریں (JPG, PNG, WEBP)');
      return;
    }
    // Validate file size (max 10MB)
    if (btn._file.size > 10 * 1024 * 1024) {
      alert('تصویر بہت بڑی ہے — 10MB سے کم ہونی چاہیے');
      return;
    }
    btn.disabled = true;
    btn.textContent = '⏳ تجزیہ ہو رہا ہے...';
    runCropAnalysis(btn._file).finally(() => {
      btn.disabled = false;
      btn.innerHTML = '🔬 Analyze with Gemini AI — تجزیہ کریں';
    });
  });
}

async function runCropAnalysis(file) {
  showLoading('فصل کا معائنہ ہو رہا ہے...', 'AI Analyzing Crop...', [
    'بیماری کی شناخت...', 'شدت کا جائزہ...', 'علاج تلاش کر رہے ہیں...', 'قیمت کا اندازہ لگا رہے ہیں...', 'رپورٹ تیار ہو رہی ہے...'
  ]);

  const b64 = await imageToBase64(file);
  const result = await analyzeCropDisease(b64);
  STATE.cropResult = result;

  hideLoading();
  
  if (result.disease === 'INVALID_IMAGE') {
    document.getElementById('cropResult').classList.remove('visible');
    // The agents.js badge update handles UI notice already, ensure it is visible
    document.getElementById('apiStatusBadge').style.display = 'block';
    return;
  }
  
  renderCropResult(result);

  // Cross-agent: signal to Mandi module
  const signal = cropToMandiSignal(result);
  if (signal) STATE.cropToMandiSignal = signal;
}

function renderCropResult(r) {
  const sec = document.getElementById('cropResult');
  sec.classList.add('visible');

  document.getElementById('diseaseName').textContent = r.disease;
  document.getElementById('diseaseConf').textContent = `Confidence: ${r.confidence}%`;

  // Severity bar with color
  const fill = document.getElementById('severityFill');
  const color = r.severity > 70 ? 'var(--red)' : r.severity > 40 ? 'var(--orange)' : 'var(--green)';
  fill.style.background = color;
  setTimeout(() => { fill.style.width = r.severity + '%'; }, 200);
  document.getElementById('severityPct').textContent = r.severity + '%';
  document.getElementById('severityLabel').textContent = r.severity > 70 ? 'خطرناک' : r.severity > 40 ? 'متوسط' : 'قابو میں';

  // Financial impact timeline
  const fi = r.financial;
  document.getElementById('fiTimeline').innerHTML = fi.days.map((day, i) => `
    <div class="fi-day">
      <div class="fi-day-num">D${day}</div>
      <div class="fi-day-label">دن ${day}</div>
      <div class="fi-day-loss">${fi.yieldLoss[i]}% نقصان</div>
    </div>
  `).join('') + `<div class="fi-day">
    <div class="fi-day-num" style="color:var(--red);font-size:13px">PKR</div>
    <div class="fi-day-label">کل نقصان</div>
    <div class="fi-day-loss">${fi.damage.toLocaleString()}</div>
  </div>`;

  // Agent steps with staggered animation
  document.getElementById('agentSteps').innerHTML = r.steps.map((s, i) => `
    <div class="agent-step" id="step${i}" style="transition-delay:${i * 0.12}s">
      <div class="step-emoji">${s.emoji}</div>
      <div class="step-body">
        <div class="step-num">Step ${s.step} of ${r.steps.length}</div>
        <div class="step-title-urdu">${s.title}</div>
        <div class="step-title" style="color:var(--m2)">${s.titleEn}</div>
        <div class="step-text">${s.text}</div>
      </div>
    </div>
  `).join('');
  setTimeout(() => document.querySelectorAll('.agent-step').forEach(el => el.classList.add('show')), 100);

  document.getElementById('cropRec').innerHTML =
    (r.recommendation || '').replace(/\n/g, '<br>');

  // Add reset button
  let resetBtn = document.getElementById('cropResetBtn');
  if (!resetBtn) {
    resetBtn = document.createElement('button');
    resetBtn.id = 'cropResetBtn';
    resetBtn.style.cssText = 'width:100%;padding:12px;background:var(--s2);border:1px solid var(--border);border-radius:12px;color:var(--m2);font-family:Outfit,sans-serif;font-size:13px;cursor:pointer;margin-top:4px';
    resetBtn.textContent = '🔄 نئی تصویر لگائیں — New Analysis';
    resetBtn.onclick = () => {
      document.getElementById('cropResult').classList.remove('visible');
      document.getElementById('cropPreviewWrap').style.display = 'none';
      document.getElementById('analyzeBtn').classList.remove('visible');
      document.getElementById('apiStatusBadge').style.display = 'none';
      document.getElementById('cropInput').value = '';
      const ab = document.getElementById('analyzeBtn'); ab._file = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.getElementById('cropResult').appendChild(resetBtn);
  }

  // Cross-agent Sewa deep-linking button
  let cropSewaBtn = document.getElementById('cropSewaBtn');
  if (!cropSewaBtn) {
    cropSewaBtn = document.createElement('button');
    cropSewaBtn.id = 'cropSewaBtn';
    cropSewaBtn.style.cssText = 'width:100%;padding:14px;background:linear-gradient(135deg, var(--gold), #E68A00);border:none;border-radius:12px;color:#fff;font-family:Outfit,sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:12px;margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
    cropSewaBtn.innerHTML = `🚜 Book Pesticide Sprayer via Kisaan Sewa`;
    document.getElementById('cropResult').insertBefore(cropSewaBtn, resetBtn);
  }
  cropSewaBtn.onclick = () => {
    triggerSewaFromAdvisor(`Need urgent pesticide sprayer for ${r.disease} disease spotted on field.`);
  };

  // Voice + share (clear old ones first)
  document.querySelectorAll('.voice-read-btn, .whatsapp-btn').forEach(e => e.remove());
  const summary = `بیماری: ${r.disease}\nشدت: ${r.severity}% — ${r.severity > 70 ? 'خطرناک' : 'متوسط'}\nعلاج: ${r.steps?.[2]?.text || ''}\nسفارش: ${r.recommendation}`;
  addVoiceButton('cropRec', summary);
  addShareButton('cropRec', `فصل کی بیماری: ${r.disease}`, summary);
}

// ── Mandi Module ────────────────────────────────────────
function initMandiModule() {
  const cropSel = document.getElementById('mandiCrop');
  const citySel = document.getElementById('mandiCity');

  function updateMandi() {
    const crop = cropSel.value;
    const city = citySel.value;
    const d = MANDI_DATA[crop];
    const price = d.prices[city];
    const chg = d.weeklyChange;
    const isUp = chg >= 0;

    document.getElementById('mandiCropName').textContent = `${d.icon} ${d.nameEn} / ${d.name}`;
    document.getElementById('mandiCityName').textContent = city.charAt(0).toUpperCase() + city.slice(1) + ' Mandi';
    document.getElementById('mandiCurrentPrice').textContent = 'PKR ' + price.toLocaleString();
    document.getElementById('mandiUnit').textContent = '/' + d.unit;
    document.getElementById('mandiTrend').textContent = (isUp ? '▲ ' : '▼ ') + Math.abs(chg) + '%';
    document.getElementById('mandiTrend').className = 'mc-trend ' + (isUp ? 'trend-up' : 'trend-down');
    document.getElementById('mandiPrediction').textContent = isUp
      ? `📈 قیمت بڑھ رہی ہے — اگلے 2 ہفتوں میں مزید ${(chg * 2).toFixed(1)}% اضافے کا امکان ہے`
      : `📉 قیمت گر رہی ہے — آج یا کل فروخت کریں`;

    document.getElementById('negoScript').classList.remove('visible');
  }

  cropSel.addEventListener('change', updateMandi);
  citySel.addEventListener('change', updateMandi);
  updateMandi();

  document.getElementById('negoBtn').addEventListener('click', async () => {
    showLoading('مذاکراتی اسکرپٹ تیار ہو رہی ہے...', 'Writing Negotiation Script...', [
      'مارکیٹ ریٹ تجزیہ...', 'رجحان دیکھ رہے ہیں...', 'کم از کم قیمت طے کر رہے ہیں...', 'اسکرپٹ لکھ رہے ہیں...'
    ]);

    const crop = cropSel.value;
    const city = citySel.value;
    const result = await runClaudeAgent('mandi', { crop, city, prices: MANDI_DATA[crop].prices });
    STATE.mandiResult = result;
    hideLoading();

    // Cross-agent: adjust if crop quality signal exists
    let script = result.negotiationScript;
    if (STATE.cropToMandiSignal) {
      script += `\n\n[نوٹ: آپ کی فصل ${STATE.cropToMandiSignal.qualityReduction}% کم معیار ہے — اس کا ذکر نہ کریں لیکن قیمت توقع کم رکھیں]`;
    }

    document.getElementById('nsText').innerHTML =
      (script || '').replace(/\n/g, '<br>');
    document.getElementById('negoScript').classList.add('visible');
    document.getElementById('negoScript').scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Livestock Module ────────────────────────────────────
function initLivestockModule() {
  document.querySelectorAll('.animal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.animal-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      STATE.selectedAnimal = btn.dataset.animal;
    });
  });

  document.getElementById('voiceBtn').addEventListener('click', toggleVoice);
  document.getElementById('diagBtn').addEventListener('click', runLivestockDiag);
}

function toggleVoice() {
  const btn = document.getElementById('voiceBtn');
  if (STATE.voiceRecognition) {
    STATE.voiceRecognition.stop();
    STATE.voiceRecognition = null;
    btn.classList.remove('listening');
    btn.textContent = '🎤 آواز سے بتائیں';
    return;
  }
  btn.classList.add('listening');
  btn.textContent = '⏹️ رک جائیں';
  STATE.voiceRecognition = startVoiceInput(
    (text, isFinal) => {
      document.getElementById('symptomInput').value = text;
      if (isFinal) { btn.classList.remove('listening'); btn.textContent = '🎤 آواز سے بتائیں'; STATE.voiceRecognition = null; }
    },
    (err) => { btn.classList.remove('listening'); btn.textContent = '🎤 آواز سے بتائیں'; STATE.voiceRecognition = null; }
  );
}

async function runLivestockDiag() {
  const symptoms = document.getElementById('symptomInput').value.trim();
  if (!symptoms) { alert('براہ کرم علامات درج کریں'); return; }

  showLoading('تشخیص ہو رہی ہے...', 'Diagnosing...', [
    'علامات کا مطالعہ...', 'بیماریوں سے موازنہ...', 'امکان کا اندازہ...', 'علاج تلاش کر رہے ہیں...'
  ]);

  const result = await runClaudeAgent('livestock', { animal: STATE.selectedAnimal, symptoms });
  STATE.livestockResult = result;
  hideLoading();
  renderLivestockResult(result);
}

function renderLivestockResult(r) {
  const res = document.getElementById('liveResult');
  res.classList.add('visible');

  const sevClass = { critical: 'sev-critical', high: 'sev-high', medium: 'sev-medium', low: 'sev-low' };
  const sevUrdu = { critical: 'انتہائی خطرناک', high: 'خطرناک', medium: 'متوسط', low: 'ہلکا' };
  document.getElementById('diagSeverity').className = 'dh-severity ' + (sevClass[r.severity] || 'sev-medium');
  document.getElementById('diagSeverity').textContent = '⚠️ ' + (sevUrdu[r.severity] || r.severity);
  document.getElementById('diagName').textContent = r.diagnosis;
  document.getElementById('diagProb').textContent = `Confidence: ${r.probability}% | Animal: ${r.animal}`;

  document.getElementById('liveSteps').innerHTML = r.steps.map((s, i) => `
    <div class="agent-step" style="transition-delay:${i * 0.12}s">
      <div class="step-emoji">${s.emoji}</div>
      <div class="step-body">
        <div class="step-num">Step ${s.step}</div>
        <div class="step-title-urdu">${s.title}</div>
        <div class="step-text">${s.text}</div>
      </div>
    </div>
  `).join('');
  setTimeout(() => res.querySelectorAll('.agent-step').forEach(el => el.classList.add('show')), 100);

  document.getElementById('vetBanner').style.display = r.vetRequired ? 'flex' : 'none';

  // Cross-agent Sewa deep-linking button for Livestock
  let liveSewaBtn = document.getElementById('liveSewaBtn');
  if (!liveSewaBtn) {
    liveSewaBtn = document.createElement('button');
    liveSewaBtn.id = 'liveSewaBtn';
    liveSewaBtn.style.cssText = 'width:100%;padding:14px;background:linear-gradient(135deg, var(--gold), #E68A00);border:none;border-radius:12px;color:#fff;font-family:Outfit,sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:14px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
    liveSewaBtn.innerHTML = `🏥 Book Emergency Vet Doctor via Sewa`;
    document.getElementById('liveResult').appendChild(liveSewaBtn);
  }
  liveSewaBtn.onclick = () => {
    triggerSewaFromAdvisor(`Urgently need a livestock vet doctor for animal showing symptoms of ${r.diagnosis}.`);
  };

  // Voice + share (clear old ones first)
  document.querySelectorAll('#liveResult .voice-read-btn, #liveResult .whatsapp-btn').forEach(e => e.remove());
  const summary = `تشخیص: ${r.diagnosis}\nشدت: ${sevUrdu[r.severity] || r.severity}\nعلاج: ${r.steps?.[2]?.text || ''}\nنوٹ: ${r.vetRequired ? 'ڈاکٹر کو بلائیں' : 'پریشانی کی بات نہیں'}`;
  addVoiceButton('liveResult', summary);
  addShareButton('liveResult', `مویشی کی صحت: ${r.diagnosis}`, summary);

  res.scrollIntoView({ behavior: 'smooth' });
}

// ── Irrigation Module ───────────────────────────────────
function initIrrigationModule() {
  document.getElementById('planBtn').addEventListener('click', runIrrigationPlan);
}

async function runIrrigationPlan() {
  showLoading('آبپاشی کا منصوبہ بن رہا ہے...', 'Planning Irrigation...', [
    'موسم کی معلومات لے رہے ہیں...', 'فصل کی ضرورت حساب کر رہے ہیں...', 'مٹی کا جائزہ لے رہے ہیں...', 'شیڈول تیار ہو رہا ہے...'
  ]);

  const crop = document.getElementById('irrCrop').value;
  const stage = document.getElementById('irrStage').value;
  const soil = document.getElementById('irrSoil').value;

  const weatherStr = STATE.weather ? STATE.weather.precipitation_probability_max.slice(0, 7).join('%, ') + '%' : '';
  const result = await runClaudeAgent('irrigation', { crop, stage, lat: 31.5497, lon: 74.3436, soilType: soil, weatherInfo: weatherStr });
  STATE.irrigationResult = result;
  hideLoading();
  renderIrrigationResult(result);

  // Cross-agent: drought signal to crop module
  const signal = irrigationToCropSignal(result);
  if (signal) {
    document.getElementById('irrCrossAgent').textContent = '🤖 ' + signal.note;
    document.getElementById('irrCrossAgentWrap').style.display = 'flex';
  }
}

function renderIrrigationResult(r) {
  const res = document.getElementById('irrResult');
  res.classList.add('visible');
  const max = Math.max(...r.schedule.map(d => d.water || 1));
  document.getElementById('schedGrid').innerHTML = r.schedule.map(d => `
    <div class="sched-row ${d.skip ? 'skip-day' : ''}">
      <div class="sched-day">${d.day}</div>
      <div class="sched-bar-wrap"><div class="sched-bar" style="width:${d.skip ? 0 : (d.water / max * 100)}%"></div></div>
      <div class="sched-val">${d.skip ? '—' : d.water + 'mm'}</div>
      <div class="sched-reason">${d.reason}</div>
    </div>
  `).join('');

  document.getElementById('savWater').textContent = (r.savings.water / 1000).toFixed(0) + 'K L';
  document.getElementById('savIncome').textContent = 'PKR ' + r.savings.income.toLocaleString();
  document.getElementById('savYield').textContent = '+' + r.savings.yieldBoost + '%';

  // Cross-agent Sewa deep-linking button for Irrigation
  let irrSewaBtn = document.getElementById('irrSewaBtn');
  if (!irrSewaBtn) {
    irrSewaBtn = document.createElement('button');
    irrSewaBtn.id = 'irrSewaBtn';
    irrSewaBtn.style.cssText = 'width:100%;padding:14px;background:linear-gradient(135deg, var(--gold), #E68A00);border:none;border-radius:12px;color:#fff;font-family:Outfit,sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:16px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
    irrSewaBtn.innerHTML = `🔧 Book Tubewell Setup or Diesel Delivery`;
    document.getElementById('irrResult').appendChild(irrSewaBtn);
  }
  irrSewaBtn.onclick = () => {
    triggerSewaFromAdvisor(`Need a technician or solar equipment for scheduled irrigation task.`);
  };

  res.scrollIntoView({ behavior: 'smooth' });
}

// ── Loading Overlay ─────────────────────────────────────
function showLoading(urdu, en, steps = []) {
  const ov = document.getElementById('loadingOverlay');
  document.getElementById('loadText').textContent = en;
  document.getElementById('loadUrdu').textContent = urdu;
  const stepsEl = document.getElementById('loadSteps');
  stepsEl.innerHTML = steps.map((s, i) => `<div class="load-step" id="ls${i}">${s}</div>`).join('');
  ov.classList.add('active');
  steps.forEach((_, i) => setTimeout(() => document.getElementById('ls' + i)?.classList.add('show'), i * 500));
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('active');
}

// ── Phase 4: Urdu Text-to-Speech ────────────────────────
function speakUrdu(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  // Try to find Urdu voice, fallback to any available
  const voices = window.speechSynthesis.getVoices();
  const urduVoice = voices.find(v => v.lang.includes('ur') || v.lang.includes('hi') || v.lang.includes('pk'));
  if (urduVoice) utt.voice = urduVoice;
  utt.lang = 'ur-PK';
  utt.rate = 0.85;
  utt.pitch = 1.0;
  window.speechSynthesis.speak(utt);
}

function addVoiceButton(containerId, textToSpeak) {
  const container = document.getElementById(containerId);
  if (!container || !('speechSynthesis' in window)) return;
  const existing = container.querySelector('.voice-read-btn');
  if (existing) existing.remove();
  const btn = document.createElement('button');
  btn.className = 'voice-read-btn';
  btn.innerHTML = '🔊 آواز میں سنیں';
  btn.style.cssText = 'margin:10px 0 0;padding:8px 16px;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--gold);font-family:Outfit,sans-serif;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;width:100%';
  btn.onclick = () => {
    const isPlaying = btn.dataset.playing === 'true';
    if (isPlaying) { window.speechSynthesis.cancel(); btn.innerHTML = '🔊 آواز میں سنیں'; btn.dataset.playing = 'false'; return; }
    btn.innerHTML = '⏹️ آواز بند کریں';
    btn.dataset.playing = 'true';
    speakUrdu(textToSpeak);
    window.speechSynthesis.onend = () => { btn.innerHTML = '🔊 آواز میں سنیں'; btn.dataset.playing = 'false'; };
  };
  container.appendChild(btn);
}

// ── Phase 4: WhatsApp Share ──────────────────────────────
function shareOnWhatsApp(title, body) {
  const text = `*${title}*\n\n${body}\n\n_Kisaan AI — کسان اے آئی 🌾_\nAI Seekho 2026`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function addShareButton(containerId, title, body) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const existing = container.querySelector('.whatsapp-btn');
  if (existing) existing.remove();
  const btn = document.createElement('button');
  btn.className = 'whatsapp-btn';
  btn.innerHTML = '<span style="font-size:16px">📲</span> WhatsApp پر شیئر کریں';
  btn.style.cssText = 'margin:8px 0 0;padding:10px 16px;background:#075E54;border:none;border-radius:10px;color:#fff;font-family:Outfit,sans-serif;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;width:100%;justify-content:center';
  btn.onclick = () => shareOnWhatsApp(title, body);
  container.appendChild(btn);
}

// ── Phase 4: PWA Install Banner ──────────────────────────
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

// Auto-detect iOS/Safari and show custom install instructions on launch
window.addEventListener('DOMContentLoaded', () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || 
                (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
                (/iPad|iPhone|iPod/.test(navigator.userAgent));
  const isStandalone = window.navigator.standalone === true || 
                       window.matchMedia('(display-mode: standalone)').matches;
  
  if (isIOS && !isStandalone) {
    setTimeout(showIOSInstallBanner, 2000); // Prompts 2 seconds after page load
  }
});

function showIOSInstallBanner() {
  if (document.getElementById('installBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'installBanner';
  banner.style.cssText = `position:fixed;bottom:72px;left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:480px;
    background:linear-gradient(135deg,#EBF5EE,#FAFDFB);border:2px solid var(--green);border-radius:14px;
    padding:14px 16px;display:flex;align-items:center;gap:12px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.15);animation:slideUpBanner .3s ease`;
  banner.innerHTML = `
    <span style="font-size:24px">🍏</span>
    <div style="flex:1">
      <div style="font-size:14px;font-weight:700;color:var(--green)">iPhone پر انسٹال کریں (Install)</div>
      <div style="font-size:12px;color:var(--text);line-height:1.5;">
        نیچے <strong>Share (شیئر 📥)</strong> بٹن پر کلک کریں اور پھر <strong>'Add to Home Screen'</strong> منتخب کریں۔
      </div>
    </div>
    <button onclick="document.getElementById('installBanner').remove()" style="background:none;border:none;color:var(--muted);font-size:20px;cursor:pointer;padding:0 4px">×</button>
  `;
  document.body.appendChild(banner);
}

function showInstallBanner() {
  if (document.getElementById('installBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'installBanner';
  banner.style.cssText = `position:fixed;bottom:72px;left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:480px;
    background:linear-gradient(135deg,#EBF5EE,#FAFDFB);border:2px solid var(--green);border-radius:14px;
    padding:12px 16px;display:flex;align-items:center;gap:12px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.15);animation:slideUpBanner .3s ease`;
  banner.innerHTML = `
    <span style="font-size:24px">📱</span>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:600;color:var(--green)">Kisaan AI انسٹال کریں</div>
      <div style="font-size:10px;color:var(--text)">بغیر انٹرنیٹ کے بھی چلائیں — Install as App</div>
    </div>
    <button onclick="installPWA()" style="background:var(--gold);border:none;border-radius:8px;padding:6px 14px;color:#fff;font-weight:700;font-size:12px;cursor:pointer">انسٹال</button>
    <button onclick="document.getElementById('installBanner').remove()" style="background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;padding:0 4px">×</button>
  `;
  document.body.appendChild(banner);
}

function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
    document.getElementById('installBanner')?.remove();
  });
}

// ── Phase 4: Auto-Demo Mode (for judges) ────────────────
async function runAutoDemo() {
  const steps = [
    { action: () => navigate('crop'),      wait: 1200, msg: '🌿 Crop Disease AI' },
    { action: () => {
        // Inject demo wheat image
        const canvas = document.createElement('canvas');
        canvas.width=400; canvas.height=300;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle='#2d5a1a'; ctx.fillRect(0,0,400,300);
        ctx.fillStyle='#c87941';
        for(let i=0;i<10;i++){ctx.fillRect(30+i*12,20+i*26,200+i*8,14);}
        canvas.toBlob(blob=>{
          const file=new File([blob],'demo.jpg',{type:'image/jpeg'});
          const dt=new DataTransfer(); dt.items.add(file);
          document.getElementById('cropInput').files=dt.files;
          document.getElementById('cropInput').dispatchEvent(new Event('change',{bubbles:true}));
        },'image/jpeg');
      }, wait: 1000, msg: '📸 Loading sample wheat image...' },
    { action: () => {
        STATE.cropResult = null;
        hideLoading();
        renderCropResult(DEMO_CACHE.cropDisease);
      }, wait: 3000, msg: '🔬 Gemini analyzing disease...' },
    { action: () => navigate('mandi'),    wait: 1500, msg: '💰 Mandi Price Advisor' },
    { action: () => {
        document.getElementById('mandiCrop').value = 'wheat';
        document.getElementById('mandiCity').value = 'lahore';
        document.getElementById('mandiCrop').dispatchEvent(new Event('change'));
      }, wait: 800, msg: '📊 Loading Lahore wheat prices...' },
    { action: () => {
        hideLoading();
        document.getElementById('nsText').textContent = DEMO_CACHE.mandi.negotiationScript;
        document.getElementById('negoScript').classList.add('visible');
      }, wait: 2000, msg: '📝 Writing Urdu negotiation script...' },
    { action: () => navigate('live'),      wait: 1500, msg: '🐄 Livestock Health AI' },
    { action: () => {
        document.getElementById('symptomInput').value = 'بخار ہے، ناک بہ رہی ہے، منہ میں چھالے ہیں، کھانا نہیں کھا رہا';
      }, wait: 1000, msg: '🎤 Voice symptoms entered...' },
    { action: () => {
        hideLoading();
        renderLivestockResult(DEMO_CACHE.livestock);
      }, wait: 2500, msg: '🔬 Diagnosing livestock disease...' },
    { action: () => navigate('sewa'),      wait: 1500, msg: '🚜 Kisaan Sewa Orchestrator' },
    { action: () => {
        document.getElementById('sewaInput').value = 'Oye, parson 16 may ko 5 acre gandum kaatne ke liye harvester chahiye, sasta wala.';
      }, wait: 1000, msg: '✍️ Inputting Roman Urdu request...' },
    { action: () => {
        document.getElementById('sewaDiagBtn').click();
      }, wait: 18000, msg: '🧠 Antigravity Agent orchestrating autonomously...' },
    { action: () => navigate('home'),      wait: 1000, msg: '🏠 Demo Complete!' },
  ];

  const banner = document.createElement('div');
  banner.id = 'demoBanner';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg,var(--green),#063c22);padding:10px 16px;z-index:9998;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--gold)';
  banner.innerHTML = `<span style="color:var(--gold);font-size:12px;font-weight:700" id="demoMsg">🎬 AUTO DEMO MODE</span><button onclick="endDemo()" style="background:none;border:1px solid var(--border);border-radius:6px;color:var(--m2);padding:4px 10px;font-size:11px;cursor:pointer">Exit</button>`;
  document.body.appendChild(banner);

  for (const step of steps) {
    document.getElementById('demoMsg').textContent = `🎬 ${step.msg}`;
    step.action();
    await sleep(step.wait);
  }
  endDemo();
}

function endDemo() {
  document.getElementById('demoBanner')?.remove();
  navigate('home');
}

// ── Removed _origRenderCrop wrapper ────────────────────

// ── Phase 4: Add Demo button to home screen ──────────────
function addDemoButton() {
  const btn = document.createElement('button');
  btn.id = 'demoBtnHome';
  btn.onclick = runAutoDemo;
  btn.style.cssText = 'position:fixed;bottom:80px;right:16px;background:linear-gradient(135deg,var(--gold),#E68A00);border:none;border-radius:50%;width:52px;height:52px;font-size:20px;cursor:pointer;box-shadow:0 4px 20px #FF9F1C66;z-index:999;animation:pulse 2s infinite';
  btn.title = 'Auto Demo Mode';
  btn.textContent = '🎬';
  document.body.appendChild(btn);
}

// ── Phase 5: Animated Impact Counters ───────────────────
function animateCounter(elId, target, suffix, duration = 2000) {
  const el = document.getElementById(elId);
  if (!el) return;
  const start = Date.now();
  const fmt = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  };
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(eased * target);
    el.textContent = fmt(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  // Trigger when home screen is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('cnt-farmers', 2400000, '+', 2500);
        animateCounter('cnt-diseases', 850000, '', 2200);
        animateCounter('cnt-saved', 4200, 'CR', 1800);
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const el = document.getElementById('cnt-farmers');
  if (el) observer.observe(el.closest('.impact-stat') || el);
}

// ── Sewa Module (Challenge 2) ────────────────────────────
function initSewaModule() {
  const vBtn = document.getElementById('sewaVoiceBtn');
  const dBtn = document.getElementById('sewaDiagBtn');
  
  if (vBtn) {
    vBtn.addEventListener('click', () => {
      if (STATE.voiceRecognition) {
        STATE.voiceRecognition.stop();
        STATE.voiceRecognition = null;
        vBtn.classList.remove('listening');
        vBtn.textContent = '🎤 آواز سے بتائیں';
        return;
      }
      vBtn.classList.add('listening');
      vBtn.textContent = '⏹️ رک جائیں';
      STATE.voiceRecognition = startVoiceInput(
        (text, isFinal) => {
          document.getElementById('sewaInput').value = text;
          if (isFinal) {
            vBtn.classList.remove('listening');
            vBtn.textContent = '🎤 آواز سے بتائیں';
            STATE.voiceRecognition = null;
          }
        },
        (err) => {
          vBtn.classList.remove('listening');
          vBtn.textContent = '🎤 آواز سے بتائیں';
          STATE.voiceRecognition = null;
        }
      );
    });
  }

  if (dBtn) {
    dBtn.addEventListener('click', async () => {
      const input = document.getElementById('sewaInput').value.trim();
      if (!input) {
        alert('براہ کرم اپنی ضرورت درج کریں یا مائیک استعمال کریں (Please write your request or use Mic)');
        return;
      }
      dBtn.disabled = true;
      vBtn.disabled = true;
      const oldTxt = dBtn.textContent;
      dBtn.textContent = '⚡ Agent Operating...';
      
      try {
        await runAntigravityOrchestrator(input);
      } catch(e) {
        console.error('[Antigravity] Failed orchestration:', e);
      } finally {
        dBtn.disabled = false;
        vBtn.disabled = false;
        dBtn.textContent = oldTxt;
      }
    });
  }
}

// ── Init ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initCropModule();
  initMandiModule();
  initLivestockModule();
  initIrrigationModule();
  initSewaModule();
  // addDemoButton(); // Removed for live release
  initCounters();
  
  // Initialize default language and placeholders
  document.body.classList.add('lang-ur');
  updatePlaceholders();
  
  // Phase 5: Offline indicator
  window.addEventListener('offline', () => {
    let banner = document.getElementById('offlineBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'offlineBanner';
      banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#E05555;color:#fff;text-align:center;padding:6px;font-size:12px;z-index:10000;font-weight:600';
      banner.textContent = '⚠️ آپ کا انٹرنیٹ کنکشن منقطع ہو گیا ہے — You are offline';
      document.body.appendChild(banner);
    }
    banner.style.display = 'block';
  });
  window.addEventListener('online', () => {
    const banner = document.getElementById('offlineBanner');
    if (banner) {
      banner.style.background = '#0A5C36';
      banner.textContent = '✅ انٹرنیٹ بحال ہو گیا — Back online';
      setTimeout(() => banner.style.display = 'none', 3000);
    }
  });
});

// Helper function to link and trigger Kisaan Sewa dynamically from any module
function triggerSewaFromAdvisor(promptText) {
  navigate('sewa');
  const input = document.getElementById('sewaInput');
  if (input) {
    input.value = promptText;
    input.dispatchEvent(new Event('input'));
  }
  // Briefly wait for screen navigation, then click orchestrate automatically!
  setTimeout(() => {
    const diagBtn = document.getElementById('sewaDiagBtn');
    if (diagBtn) diagBtn.click();
  }, 650);
}

// ── Global Language System ──
let currentLanguage = 'ur'; // default to bilingual/Urdu mode

function toggleLanguage() {
  if (document.body.classList.contains('lang-ur')) {
    document.body.classList.remove('lang-ur');
    document.body.classList.add('lang-en');
    currentLanguage = 'en';
  } else {
    document.body.classList.remove('lang-en');
    document.body.classList.add('lang-ur');
    currentLanguage = 'ur';
  }
  updateLangToggleButton();
  updateSeasonalAlertUI();
  updatePlaceholders();
}

function updatePlaceholders() {
  const encSearch = document.getElementById('encSearch');
  const symptomInput = document.getElementById('symptomInput');
  const sewaInput = document.getElementById('sewaInput');
  
  if (currentLanguage === 'en') {
    if (encSearch) encSearch.placeholder = "Search disease...";
    if (symptomInput) symptomInput.placeholder = "e.g., fever, not eating, running nose, mouth ulcers...";
    if (sewaInput) sewaInput.placeholder = "e.g., need harvester tomorrow for 5 acres of wheat, tight budget...";
  } else {
    if (encSearch) encSearch.placeholder = "بیماری تلاش کریں... (Search disease)";
    if (symptomInput) symptomInput.placeholder = "مثال: بخار ہے، کھانا نہیں کھا رہا، ناک بہ رہا ہے، منہ میں چھالے ہیں...";
    if (sewaInput) sewaInput.placeholder = "مثال: parson 5 acre gandum kaatne ke liye harvester chahiye, budget tight hai...";
  }
}

function updateLangToggleButton() {
  const btn = document.getElementById('langToggleBtn');
  if (btn) {
    if (currentLanguage === 'ur') {
      btn.innerHTML = 'English (EN)';
      btn.style.background = 'var(--green)';
    } else {
      btn.innerHTML = 'اردو (UR)';
      btn.style.background = '#2B6CB0'; // Premium blue for English toggle
    }
  }
}

function updateSeasonalAlertUI() {
  const alert = getSeasonalAlert();
  const titleEl = document.getElementById('alertTitle');
  const urduEl = document.getElementById('alertUrdu');
  if (titleEl && urduEl) {
    let weatherWarningEn = "";
    let weatherWarningUr = "";

    // Parse weather forecast parameters for crop-health context
    if (STATE.weather) {
      const temp = Math.round(STATE.weather.temperature_2m_max[0]);
      const rain = STATE.weather.precipitation_probability_max[0];
      if (rain >= 50) {
        weatherWarningEn = `<div style="margin-top:8px;padding:8px 12px;background:rgba(229,62,62,0.1);border:1px solid rgba(229,62,62,0.3);border-radius:10px;font-size:12px;color:#C53030;font-weight:700;">⚠️ Weather Alert: ${rain}% rain forecast—delay sprays & irrigation!</div>`;
        weatherWarningUr = `<div style="margin-top:8px;padding:8px 12px;background:rgba(229,62,62,0.1);border:1px solid rgba(229,62,62,0.3);border-radius:10px;font-size:12.5px;color:#C53030;font-weight:700;font-family:'Noto Nastaliq Urdu',serif;direction:rtl;line-height:1.7;">⚠️ موسم کی وارننگ: بارش کا امکان ${rain}% ہے — سپرے اور پانی روکیں!</div>`;
      } else if (temp >= 40) {
        weatherWarningEn = `<div style="margin-top:8px;padding:8px 12px;background:rgba(214,158,46,0.1);border:1px solid rgba(214,158,46,0.3);border-radius:10px;font-size:12px;color:#9B6A15;font-weight:700;">🔥 Heat Alert: Extreme ${temp}°C forecast—avoid noon chemical sprays!</div>`;
        weatherWarningUr = `<div style="margin-top:8px;padding:8px 12px;background:rgba(214,158,46,0.1);border:1px solid rgba(214,158,46,0.3);border-radius:10px;font-size:12.5px;color:#9B6A15;font-weight:700;font-family:'Noto Nastaliq Urdu',serif;direction:rtl;line-height:1.7;">🔥 گرمی کی وارننگ: شدید درجہ حرارت (${temp}°C) متوقع ہے — دوپہر میں سپرے نہ کریں!</div>`;
      }
    }

    titleEl.innerHTML = '🌾 ' + alert.en + weatherWarningEn;
    urduEl.innerHTML = alert.ur + weatherWarningUr;
  }
}

let currentUtterance = null;

function speakSeasonalAlert() {
  if ('speechSynthesis' in window) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.getElementById('alertAudioBtn').textContent = '🔊';
      document.getElementById('alertAudioBtn').style.background = 'var(--s1)';
      document.getElementById('alertAudioBtn').style.color = 'var(--text)';
      return;
    }

    const alert = getSeasonalAlert();
    let weatherWarningEn = "";
    let weatherWarningUr = "";

    if (STATE.weather) {
      const temp = Math.round(STATE.weather.temperature_2m_max[0]);
      const rain = STATE.weather.precipitation_probability_max[0];
      if (rain >= 50) {
        weatherWarningEn = `. Caution: ${rain}% rain probability expected. Please delay pesticide sprays and field irrigation.`;
        weatherWarningUr = `۔ تنبیہ: بارش کا امکان ${rain}% ہے۔ مہربانی کر کے فصل پر سپرے اور پانی لگانا روک دیں۔`;
      } else if (temp >= 40) {
        weatherWarningEn = `. Warning: Extreme heat of ${temp}°C expected. Avoid midday chemical sprays and apply light early-morning irrigation.`;
        weatherWarningUr = `۔ تنبیہ: شدید گرمی (${temp}°C) متوقع ہے۔ دوپہر میں سپرے نہ کریں، اور صبح سویرے ہلکا پانی لگائیں۔`;
      }
    }

    const textToSpeak = currentLanguage === 'ur' 
      ? (alert.ur + weatherWarningUr) 
      : (alert.en + weatherWarningEn);
      
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLanguage === 'ur' ? 'ur-PK' : 'en-US';
    
    const voices = window.speechSynthesis.getVoices();
    if (currentLanguage === 'ur') {
      const urVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.startsWith('pa'));
      if (urVoice) utterance.voice = urVoice;
    } else {
      const enVoice = voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }
    
    utterance.onstart = () => {
      document.getElementById('alertAudioBtn').textContent = '⏹️';
      document.getElementById('alertAudioBtn').style.background = 'var(--red)';
      document.getElementById('alertAudioBtn').style.color = '#fff';
    };
    
    utterance.onend = () => {
      document.getElementById('alertAudioBtn').textContent = '🔊';
      document.getElementById('alertAudioBtn').style.background = 'var(--s1)';
      document.getElementById('alertAudioBtn').style.color = 'var(--text)';
    };
    
    utterance.onerror = () => {
      document.getElementById('alertAudioBtn').textContent = '🔊';
      document.getElementById('alertAudioBtn').style.background = 'var(--s1)';
      document.getElementById('alertAudioBtn').style.color = 'var(--text)';
    };
    
    window.speechSynthesis.speak(utterance);
    currentUtterance = utterance;
  } else {
    alert('Voice synthesis not supported on this browser.');
  }
}
