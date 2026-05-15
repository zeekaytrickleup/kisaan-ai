// =============================================
// KISAAN AI — Configuration  (Phase 3 Update)
// =============================================
// Gemini: https://ai.google.dev
// Claude: https://console.anthropic.com

const CONFIG = {
  GEMINI_API_KEY: 'REDACTED_LEAKED_KEY',
  CLAUDE_API_KEY: 'YOUR_CLAUDE_API_KEY_HERE',

  GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
  CLAUDE_URL: 'https://api.anthropic.com/v1/messages',

  // Open-Meteo (free, no key needed)
  WEATHER_URL: 'https://api.open-meteo.com/v1/forecast',

  // App version
  VERSION: '1.0.0',

  // Demo mode: false = uses real Gemini API. Claude still uses demo until key is added.
  DEMO_MODE: false,
};

// Mandi prices (update daily from amis.pk)
const MANDI_DATA = {
  wheat: {
    name: 'گندم',
    nameEn: 'Wheat',
    icon: '🌾',
    prices: { lahore: 3850, karachi: 3900, faisalabad: 3820, multan: 3800, rawalpindi: 3870 },
    unit: 'من (40kg)',
    weeklyChange: +2.3,
  },
  cotton: {
    name: 'کپاس',
    nameEn: 'Cotton',
    icon: '🌿',
    prices: { lahore: 8200, karachi: 8350, faisalabad: 8100, multan: 8250, rawalpindi: 8180 },
    unit: 'من (40kg)',
    weeklyChange: -1.1,
  },
  rice: {
    name: 'چاول',
    nameEn: 'Rice (Basmati)',
    icon: '🍚',
    prices: { lahore: 5200, karachi: 5400, faisalabad: 5150, multan: 5100, rawalpindi: 5300 },
    unit: 'من (40kg)',
    weeklyChange: +4.7,
  },
  sugarcane: {
    name: 'گنا',
    nameEn: 'Sugarcane',
    icon: '🎋',
    prices: { lahore: 450, karachi: 460, faisalabad: 445, multan: 440, rawalpindi: 455 },
    unit: 'من (40kg)',
    weeklyChange: +0.8,
  },
  maize: {
    name: 'مکئی',
    nameEn: 'Maize',
    icon: '🌽',
    prices: { lahore: 2100, karachi: 2200, faisalabad: 2050, multan: 2080, rawalpindi: 2120 },
    unit: 'من (40kg)',
    weeklyChange: -0.5,
  },
};

// ─── 20 Pakistani Crop Diseases (Phase 3) ─────────────────────────
const DISEASE_DB = [
  // WHEAT
  { id:'yw', name:'Yellow Rust', urdu:'زرد زنگ', crop:'wheat', season:'rabi', severity:'high',
    symptoms:'پتوں پر زرد دھاریاں، پیلا پاؤڈر', treatment:'Tilt 25EC 0.5ml/L یا Folicur 0.75ml/L', cost:1200,
    prevention:'مزاحم اقسام: Inquilab-91, Galaxy-2013', markets:['Punjab Seed Corp','Al-Hamra Pesticides'] },

  { id:'br', name:'Brown Rust', urdu:'بھورا زنگ', crop:'wheat', season:'rabi', severity:'medium',
    symptoms:'پتوں پر بھورے دھبے، گول شکل', treatment:'Propiconazole 25EC سپرے', cost:1100,
    prevention:'بوائی وقت پر کریں، نومبر کے آخر تک', markets:['Syngenta','FMC Pakistan'] },

  { id:'lb', name:'Loose Smut', urdu:'کھلا کانگ', crop:'wheat', season:'rabi', severity:'medium',
    symptoms:'کانگ کی جگہ کالا پاؤڈر نکلتا ہے', treatment:'Raxil 2% بیج کو ٹریٹ کریں', cost:800,
    prevention:'بیج ٹریٹمنٹ ضروری ہے — بوائی سے پہلے', markets:['Bayer CropScience'] },

  { id:'pm', name:'Powdery Mildew', urdu:'سفید پھپھوندی', crop:'wheat', season:'rabi', severity:'medium',
    symptoms:'پتوں پر سفید پاؤڈر، بعد میں سیاہ ہو جاتا ہے', treatment:'Sulfur 80WP 2g/L یا Topsin-M', cost:900,
    prevention:'گھنی بوائی سے بچیں', markets:['ICI Pakistan'] },

  { id:'ka', name:'Karnal Bunt', urdu:'کرنال بنٹ', crop:'wheat', season:'rabi', severity:'low',
    symptoms:'دانوں میں کالا پاؤڈر، مچھلی جیسی بو', treatment:'Vitavax 200 بیج ٹریٹمنٹ', cost:700,
    prevention:'مرطوب موسم میں زیادہ ہوتی ہے', markets:['Chevron Chemicals'] },

  // COTTON
  { id:'clc', name:'Cotton Leaf Curl', urdu:'پتہ مروڑ وائرس', crop:'cotton', season:'kharif', severity:'high',
    symptoms:'پتے اوپر کو مڑ جاتے ہیں، نسیں موٹی ہو جاتی ہیں', treatment:'سفید مکھی کنٹرول: Confidor 0.5ml/L', cost:2500,
    prevention:'BT Cotton مزاحم اقسام استعمال کریں', markets:['Bayer','Syngenta'] },

  { id:'bw', name:'Boll Worm', urdu:'گھنڈی کا کیڑا', crop:'cotton', season:'kharif', severity:'high',
    symptoms:'گھنڈی میں سوراخ، اندر سے کالا، گر جاتی ہے', treatment:'Karate 2.5EC یا Cypermethrin', cost:1800,
    prevention:'فیرومون ٹریپ لگائیں — جولائی سے', markets:['BASF','FMC'] },

  { id:'alt', name:'Alternaria Leaf Spot', urdu:'الٹرنیریا دھبہ', crop:'cotton', season:'kharif', severity:'medium',
    symptoms:'پتوں پر بھورے گول دھبے، بعد میں چھید', treatment:'Dithane M-45 2g/L سپرے', cost:1200,
    prevention:'کھیت میں فاصلہ رکھیں، ہوا آئے', markets:['Dow AgroSciences'] },

  // RICE
  { id:'rb', name:'Rice Blast', urdu:'چاول بلاسٹ', crop:'rice', season:'kharif', severity:'high',
    symptoms:'پتوں پر ہیرے جیسے دھبے، گردن پر بھی آتا ہے', treatment:'Beam 75WP 0.6g/L یا Tricyclazole', cost:1800,
    prevention:'نائٹروجن زیادہ نہ دیں، متوازن کھاد', markets:['Dow','Syngenta'] },

  { id:'bpb', name:'Brown Plant Hopper', urdu:'بھورا پلانٹ ہاپر', crop:'rice', season:'kharif', severity:'high',
    symptoms:'پودہ جل جاتا ہے، چکر میں پیلا ہوتا ہے', treatment:'Applaud 25SC یا Actara 25WG', cost:2200,
    prevention:'پانی کو وقفہ وقفہ سے لگائیں', markets:['Bayer'] },

  { id:'sh', name:'Sheath Blight', urdu:'چاول غلاف جھلسا', crop:'rice', season:'kharif', severity:'medium',
    symptoms:'غلاف پر بھورے دھبے، آبی رنگ', treatment:'Validacin 3L 1.5ml/L', cost:1500,
    prevention:'زیادہ پودے ایک جگہ نہ لگائیں', markets:['ICI'] },

  // SUGARCANE
  { id:'sr', name:'Red Rot', urdu:'سرخ سڑن', crop:'sugarcane', season:'kharif', severity:'high',
    symptoms:'اندر سے سرخ، شراب جیسی بو، گانٹھیں سڑتی ہیں', treatment:'مزاحم اقسام: CPF-238, HSF-240', cost:3000,
    prevention:'متاثرہ بیج استعمال نہ کریں', markets:['Punjab Sugar Mills'] },

  { id:'sm', name:'Sugarcane Stem Borer', urdu:'گنا تنہ چھیدنے والا', crop:'sugarcane', season:'kharif', severity:'medium',
    symptoms:'اندر سے کھوکھلا، مردہ ڈنڈی', treatment:'Furadan 3G granules بوائی پر', cost:1600,
    prevention:'اپریل میں Trichogramma parasitoids چھوڑیں', markets:['FMC Pakistan'] },

  // MAIZE
  { id:'msb', name:'Maize Stem Borer', urdu:'مکئی تنہ کیڑا', crop:'maize', season:'kharif', severity:'high',
    symptoms:'پتوں پر قطاریں، تنہ میں سوراخ، ٹوٹ جاتا ہے', treatment:'Chlorpyrifos 40EC 1.5ml/L', cost:1500,
    prevention:'مئی جون میں بوائی کریں', markets:['Dow AgroSciences'] },

  { id:'flw', name:'Fall Armyworm', urdu:'موسمی فوجی سنڈی', crop:'maize', season:'kharif', severity:'high',
    symptoms:'پتوں پر چھید، مل کر حملہ کرتے ہیں', treatment:'Coragen 20SC 0.4ml/L — فوری', cost:2000,
    prevention:'جلد پتہ لگائیں — ہر 3 دن نگرانی', markets:['FMC','Corteva'] },

  { id:'gls', name:'Gray Leaf Spot', urdu:'سرمئی پتہ دھبہ', crop:'maize', season:'kharif', severity:'medium',
    symptoms:'پتوں پر لمبے سرمئی دھبے', treatment:'Mancozeb 80WP 2.5g/L', cost:1100,
    prevention:'مزاحم ہائبرڈ: Pioneer 3025, Monsanto DK6525', markets:['Pioneer'] },

  // GENERAL / MULTI-CROP
  { id:'afe', name:'Aphid Infestation', urdu:'تیلا کا حملہ', crop:'all', season:'all', severity:'medium',
    symptoms:'پتوں کے نیچے چھوٹے سبز/کالے کیڑے، پتے مڑتے ہیں', treatment:'Confidor 200SL 0.5ml/L یا Dimethoate', cost:900,
    prevention:'قدرتی دشمن: لیڈی برڈ بیٹل — کیمیکل آخری حل', markets:['Bayer','Nufarm'] },

  { id:'sp', name:'Spider Mites', urdu:'مکڑی کا حملہ', crop:'cotton', season:'kharif', severity:'medium',
    symptoms:'پتوں پر باریک سفید جالا، زرد ہو جاتے ہیں', treatment:'Polo 250SC یا Oberon 240SC', cost:2200,
    prevention:'گرم خشک موسم میں زیادہ — پانی سپرے کریں', markets:['BASF','Bayer'] },

  { id:'root', name:'Root Rot', urdu:'جڑ سڑن', crop:'all', season:'all', severity:'medium',
    symptoms:'پودا مرجھاتا ہے، جڑیں سیاہ ہو جاتی ہیں', treatment:'Ridomil Gold 68WP ڈرینچ', cost:1300,
    prevention:'کھیت میں پانی کھڑا نہ ہونے دیں', markets:['Syngenta'] },

  { id:'wilt', name:'Fusarium Wilt', urdu:'مرجھاؤ بیماری', crop:'cotton', season:'kharif', severity:'high',
    symptoms:'پودا اچانک مرجھا جاتا ہے، تنہ اندر سے بھورا', treatment:'کوئی موثر علاج نہیں — متاثرہ پودے اکھاڑیں', cost:0,
    prevention:'فصل کی تبدیلی — 3 سال بعد کپاس', markets:[] },
];

// ─── Pakistan Livestock Diseases — Extended (Phase 3) ─────────────
const LIVESTOCK_DB = [
  { id:'fmd', name:'Foot & Mouth Disease', urdu:'منہ کھر بیماری', animals:['cow','buffalo','goat','sheep'],
    severity:'critical', vetRequired:true,
    symptoms:['بخار','منہ میں چھالے','پیروں میں چھالے','لنگڑانا','کھانا نہ کھانا'],
    homeRemedy:'Antiseptic سے منہ اور پیر دھوئیں — Betadine 1% محلول',
    vaccine:'TriVac FMD vaccine ہر 6 ماہ', mortality:'علاج سے 5% — بغیر علاج 20%' },

  { id:'ppr', name:'PPR (Goat Plague)', urdu:'بکری طاعون', animals:['goat','sheep'],
    severity:'critical', vetRequired:true,
    symptoms:['تیز بخار 40-41°C','ناک بہنا','آنکھ سے پانی','منہ میں زخم','اسہال'],
    homeRemedy:'Electral پانی میں ملا کر پلائیں — Paracetamol 10mg/kg',
    vaccine:'PPR vaccine — ایک بار لگانے سے 3 سال حفاظت', mortality:'بغیر علاج 70-80%' },

  { id:'lsd', name:'Lumpy Skin Disease', urdu:'گانٹھ دار چمڑی بیماری', animals:['cow','buffalo'],
    severity:'high', vetRequired:true,
    symptoms:['جلد پر گانٹھیں','بخار','دودھ کم ہونا','کھانا بند'],
    homeRemedy:'گانٹھوں پر Betadine لگائیں — مکھیوں سے بچائیں',
    vaccine:'Sheep Pox vaccine (cross protection) ہر سال', mortality:'1-5%' },

  { id:'bq', name:'Black Quarter', urdu:'کالا بخار / بلیک کوارٹر', animals:['cow','buffalo'],
    severity:'critical', vetRequired:true,
    symptoms:['اچانک تیز بخار','ٹانگ میں سوجن','کریکریاہٹ کی آواز','اٹھ نہ سکنا'],
    homeRemedy:'فوری ڈاکٹر — گھریلو علاج ناکافی ہے',
    vaccine:'BQ Vaccine ہر سال مانسون سے پہلے', mortality:'بغیر علاج 100% — 12-36 گھنٹے' },

  { id:'theil', name:'Theileriosis', urdu:'خون کی بیماری (تھیلیریوسس)', animals:['cow','buffalo'],
    severity:'high', vetRequired:false,
    symptoms:['تیز بخار','خون کی کمی','آنکھ زرد','کھانا کم کرنا'],
    homeRemedy:'Buparvaquone injection (Butalex) — ڈاکٹر سے لیں',
    vaccine:'کوئی ویکسین نہیں — چیچڑ کنٹرول ضروری', mortality:'10-30%' },

  { id:'hs', name:'Hemorrhagic Septicemia', urdu:'گلا گھونٹو / تیزابی', animals:['cow','buffalo'],
    severity:'critical', vetRequired:true,
    symptoms:['اچانک بخار','گلے میں سوجن','سانس لینے میں تکلیف','لعاب زیادہ'],
    homeRemedy:'Oxytetracycline injection فوری — پھر ڈاکٹر',
    vaccine:'HS Vaccine مانسون سے پہلے لازمی', mortality:'بغیر علاج 80%' },

  { id:'mast', name:'Mastitis', urdu:'تھن کی سوزش', animals:['cow','buffalo'],
    severity:'medium', vetRequired:false,
    symptoms:['تھن سرخ اور گرم','دودھ میں گانٹھیں','کم دودھ','درد پر ٹھوکر'],
    homeRemedy:'دودھ نکال کر پھینکیں — Intramammary Tube لگائیں',
    vaccine:'کوئی ویکسین نہیں — صفائی سب سے اہم', mortality:'0%' },

  { id:'bloat', name:'Bloat', urdu:'پیٹ پھولنا', animals:['cow','buffalo','goat','sheep'],
    severity:'high', vetRequired:false,
    symptoms:['پیٹ بائیں طرف سے پھولا','بے چینی','سانس لینے میں تکلیف','جمین پر لوٹنا'],
    homeRemedy:'ٹروکار لگائیں یا Poloxalene دوائی — سر اوپر رکھیں',
    vaccine:'کوئی نہیں', mortality:'فوری علاج نہ ہو تو 100%' },
];
