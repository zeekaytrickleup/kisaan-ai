// =============================================
// KISAAN AI — Configuration
// =============================================
// Gemini: https://ai.google.dev

// Keys come from js/secrets.js (gitignored). If that file is missing, falls back to placeholders.
const _S = typeof SECRETS !== 'undefined' ? SECRETS : {};

const CONFIG = {
  GEMINI_API_KEY: _S.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE',

  GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',

  // Open-Meteo (free, no key needed)
  WEATHER_URL: 'https://api.open-meteo.com/v1/forecast',

  // App version
  VERSION: '1.0.0',

  // Demo mode: false = uses real Gemini API
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
    symptoms:'پتوں پر زرد دھاریاں، پیلا پاؤڈر', symptomsEn:'Yellow stripes on leaves, yellow powdery deposit',
    treatment:'Tilt 25EC 0.5ml/L یا Folicur 0.75ml/L', treatmentEn:'Tilt 25EC 0.5ml/L or Folicur 0.75ml/L', cost:1200,
    prevention:'مزاحم اقسام: Inquilab-91, Galaxy-2013', preventionEn:'Resistant varieties: Inquilab-91, Galaxy-2013',
    markets:['Punjab Seed Corp','Al-Hamra Pesticides'] },

  { id:'br', name:'Brown Rust', urdu:'بھورا زنگ', crop:'wheat', season:'rabi', severity:'medium',
    symptoms:'پتوں پر بھورے دھبے، گول شکل', symptomsEn:'Brown spots on leaves, round in shape',
    treatment:'Propiconazole 25EC سپرے', treatmentEn:'Spray Propiconazole 25EC', cost:1100,
    prevention:'بوائی وقت پر کریں، نومبر کے آخر تک', preventionEn:'Sow on time, by end of November',
    markets:['Syngenta','FMC Pakistan'] },

  { id:'lb', name:'Loose Smut', urdu:'کھلا کانگ', crop:'wheat', season:'rabi', severity:'medium',
    symptoms:'کانگ کی جگہ کالا پاؤڈر نکلتا ہے', symptomsEn:'Black powder appears in place of grain heads',
    treatment:'Raxil 2% بیج کو ٹریٹ کریں', treatmentEn:'Treat seed with Raxil 2%', cost:800,
    prevention:'بیج ٹریٹمنٹ ضروری ہے — بوائی سے پہلے', preventionEn:'Seed treatment is essential — before sowing',
    markets:['Bayer CropScience'] },

  { id:'pm', name:'Powdery Mildew', urdu:'سفید پھپھوندی', crop:'wheat', season:'rabi', severity:'medium',
    symptoms:'پتوں پر سفید پاؤڈر، بعد میں سیاہ ہو جاتا ہے', symptomsEn:'White powder on leaves, later turns black',
    treatment:'Sulfur 80WP 2g/L یا Topsin-M', treatmentEn:'Sulfur 80WP 2g/L or Topsin-M', cost:900,
    prevention:'گھنی بوائی سے بچیں', preventionEn:'Avoid dense sowing',
    markets:['ICI Pakistan'] },

  { id:'ka', name:'Karnal Bunt', urdu:'کرنال بنٹ', crop:'wheat', season:'rabi', severity:'low',
    symptoms:'دانوں میں کالا پاؤڈر، مچھلی جیسی بو', symptomsEn:'Black powder in grains, fishy smell',
    treatment:'Vitavax 200 بیج ٹریٹمنٹ', treatmentEn:'Vitavax 200 seed treatment', cost:700,
    prevention:'مرطوب موسم میں زیادہ ہوتی ہے', preventionEn:'More common in humid weather',
    markets:['Chevron Chemicals'] },

  // COTTON
  { id:'clc', name:'Cotton Leaf Curl', urdu:'پتہ مروڑ وائرس', crop:'cotton', season:'kharif', severity:'high',
    symptoms:'پتے اوپر کو مڑ جاتے ہیں، نسیں موٹی ہو جاتی ہیں', symptomsEn:'Leaves curl upward, veins become thick',
    treatment:'سفید مکھی کنٹرول: Confidor 0.5ml/L', treatmentEn:'Whitefly control: Confidor 0.5ml/L', cost:2500,
    prevention:'BT Cotton مزاحم اقسام استعمال کریں', preventionEn:'Use BT Cotton resistant varieties',
    markets:['Bayer','Syngenta'] },

  { id:'bw', name:'Boll Worm', urdu:'گھنڈی کا کیڑا', crop:'cotton', season:'kharif', severity:'high',
    symptoms:'گھنڈی میں سوراخ، اندر سے کالا، گر جاتی ہے', symptomsEn:'Holes in bolls, black inside, bolls drop',
    treatment:'Karate 2.5EC یا Cypermethrin', treatmentEn:'Karate 2.5EC or Cypermethrin', cost:1800,
    prevention:'فیرومون ٹریپ لگائیں — جولائی سے', preventionEn:'Install pheromone traps — from July',
    markets:['BASF','FMC'] },

  { id:'alt', name:'Alternaria Leaf Spot', urdu:'الٹرنیریا دھبہ', crop:'cotton', season:'kharif', severity:'medium',
    symptoms:'پتوں پر بھورے گول دھبے، بعد میں چھید', symptomsEn:'Brown round spots on leaves, holes later',
    treatment:'Dithane M-45 2g/L سپرے', treatmentEn:'Spray Dithane M-45 2g/L', cost:1200,
    prevention:'کھیت میں فاصلہ رکھیں، ہوا آئے', preventionEn:'Maintain field spacing for airflow',
    markets:['Dow AgroSciences'] },

  // RICE
  { id:'rb', name:'Rice Blast', urdu:'چاول بلاسٹ', crop:'rice', season:'kharif', severity:'high',
    symptoms:'پتوں پر ہیرے جیسے دھبے، گردن پر بھی آتا ہے', symptomsEn:'Diamond-shaped spots on leaves, also infects neck',
    treatment:'Beam 75WP 0.6g/L یا Tricyclazole', treatmentEn:'Beam 75WP 0.6g/L or Tricyclazole', cost:1800,
    prevention:'نائٹروجن زیادہ نہ دیں، متوازن کھاد', preventionEn:'Do not over-apply nitrogen, use balanced fertilizer',
    markets:['Dow','Syngenta'] },

  { id:'bpb', name:'Brown Plant Hopper', urdu:'بھورا پلانٹ ہاپر', crop:'rice', season:'kharif', severity:'high',
    symptoms:'پودہ جل جاتا ہے، چکر میں پیلا ہوتا ہے', symptomsEn:'Plant scorches and yellows in patches',
    treatment:'Applaud 25SC یا Actara 25WG', treatmentEn:'Applaud 25SC or Actara 25WG', cost:2200,
    prevention:'پانی کو وقفہ وقفہ سے لگائیں', preventionEn:'Alternate wet/dry irrigation',
    markets:['Bayer'] },

  { id:'sh', name:'Sheath Blight', urdu:'چاول غلاف جھلسا', crop:'rice', season:'kharif', severity:'medium',
    symptoms:'غلاف پر بھورے دھبے، آبی رنگ', symptomsEn:'Brown water-soaked lesions on sheath',
    treatment:'Validacin 3L 1.5ml/L', treatmentEn:'Validacin 3L 1.5ml/L', cost:1500,
    prevention:'زیادہ پودے ایک جگہ نہ لگائیں', preventionEn:'Avoid dense transplanting',
    markets:['ICI'] },

  // SUGARCANE
  { id:'sr', name:'Red Rot', urdu:'سرخ سڑن', crop:'sugarcane', season:'kharif', severity:'high',
    symptoms:'اندر سے سرخ، شراب جیسی بو، گانٹھیں سڑتی ہیں', symptomsEn:'Red inside, alcoholic smell, nodes rot',
    treatment:'مزاحم اقسام: CPF-238, HSF-240', treatmentEn:'Resistant varieties: CPF-238, HSF-240', cost:3000,
    prevention:'متاثرہ بیج استعمال نہ کریں', preventionEn:'Do not use infected seed canes',
    markets:['Punjab Sugar Mills'] },

  { id:'sm', name:'Sugarcane Stem Borer', urdu:'گنا تنہ چھیدنے والا', crop:'sugarcane', season:'kharif', severity:'medium',
    symptoms:'اندر سے کھوکھلا، مردہ ڈنڈی', symptomsEn:'Hollow stems, dead heart in shoots',
    treatment:'Furadan 3G granules بوائی پر', treatmentEn:'Furadan 3G granules at sowing', cost:1600,
    prevention:'اپریل میں Trichogramma parasitoids چھوڑیں', preventionEn:'Release Trichogramma parasitoids in April',
    markets:['FMC Pakistan'] },

  // MAIZE
  { id:'msb', name:'Maize Stem Borer', urdu:'مکئی تنہ کیڑا', crop:'maize', season:'kharif', severity:'high',
    symptoms:'پتوں پر قطاریں، تنہ میں سوراخ، ٹوٹ جاتا ہے', symptomsEn:'Linear damage on leaves, holes in stems, stems break',
    treatment:'Chlorpyrifos 40EC 1.5ml/L', treatmentEn:'Chlorpyrifos 40EC 1.5ml/L', cost:1500,
    prevention:'مئی جون میں بوائی کریں', preventionEn:'Sow in May–June',
    markets:['Dow AgroSciences'] },

  { id:'flw', name:'Fall Armyworm', urdu:'موسمی فوجی سنڈی', crop:'maize', season:'kharif', severity:'high',
    symptoms:'پتوں پر چھید، مل کر حملہ کرتے ہیں', symptomsEn:'Holes in leaves, swarming attack',
    treatment:'Coragen 20SC 0.4ml/L — فوری', treatmentEn:'Coragen 20SC 0.4ml/L — apply immediately', cost:2000,
    prevention:'جلد پتہ لگائیں — ہر 3 دن نگرانی', preventionEn:'Detect early — scout every 3 days',
    markets:['FMC','Corteva'] },

  { id:'gls', name:'Gray Leaf Spot', urdu:'سرمئی پتہ دھبہ', crop:'maize', season:'kharif', severity:'medium',
    symptoms:'پتوں پر لمبے سرمئی دھبے', symptomsEn:'Long gray lesions on leaves',
    treatment:'Mancozeb 80WP 2.5g/L', treatmentEn:'Mancozeb 80WP 2.5g/L', cost:1100,
    prevention:'مزاحم ہائبرڈ: Pioneer 3025, Monsanto DK6525', preventionEn:'Resistant hybrids: Pioneer 3025, Monsanto DK6525',
    markets:['Pioneer'] },

  // GENERAL / MULTI-CROP
  { id:'afe', name:'Aphid Infestation', urdu:'تیلا کا حملہ', crop:'all', season:'all', severity:'medium',
    symptoms:'پتوں کے نیچے چھوٹے سبز/کالے کیڑے، پتے مڑتے ہیں', symptomsEn:'Small green/black insects under leaves, leaves curl',
    treatment:'Confidor 200SL 0.5ml/L یا Dimethoate', treatmentEn:'Confidor 200SL 0.5ml/L or Dimethoate', cost:900,
    prevention:'قدرتی دشمن: لیڈی برڈ بیٹل — کیمیکل آخری حل', preventionEn:'Natural enemy: ladybird beetle — chemicals as last resort',
    markets:['Bayer','Nufarm'] },

  { id:'sp', name:'Spider Mites', urdu:'مکڑی کا حملہ', crop:'cotton', season:'kharif', severity:'medium',
    symptoms:'پتوں پر باریک سفید جالا، زرد ہو جاتے ہیں', symptomsEn:'Fine white webbing on leaves, leaves turn yellow',
    treatment:'Polo 250SC یا Oberon 240SC', treatmentEn:'Polo 250SC or Oberon 240SC', cost:2200,
    prevention:'گرم خشک موسم میں زیادہ — پانی سپرے کریں', preventionEn:'Common in hot dry weather — water spray helps',
    markets:['BASF','Bayer'] },

  { id:'root', name:'Root Rot', urdu:'جڑ سڑن', crop:'all', season:'all', severity:'medium',
    symptoms:'پودا مرجھاتا ہے، جڑیں سیاہ ہو جاتی ہیں', symptomsEn:'Plant wilts, roots turn black',
    treatment:'Ridomil Gold 68WP ڈرینچ', treatmentEn:'Ridomil Gold 68WP drench', cost:1300,
    prevention:'کھیت میں پانی کھڑا نہ ہونے دیں', preventionEn:'Do not let water stand in the field',
    markets:['Syngenta'] },

  { id:'wilt', name:'Fusarium Wilt', urdu:'مرجھاؤ بیماری', crop:'cotton', season:'kharif', severity:'high',
    symptoms:'پودا اچانک مرجھا جاتا ہے، تنہ اندر سے بھورا', symptomsEn:'Plant wilts suddenly, stem brown inside',
    treatment:'کوئی موثر علاج نہیں — متاثرہ پودے اکھاڑیں', treatmentEn:'No effective cure — uproot infected plants', cost:0,
    prevention:'فصل کی تبدیلی — 3 سال بعد کپاس', preventionEn:'Crop rotation — return to cotton only after 3 years',
    markets:[] },
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
