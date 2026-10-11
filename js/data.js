// Catalogo dei prodotti.
// ATTENZIONE: i prodotti qui sotto sono ESEMPI generici, non il catalogo Peck.
// Vanno sostituiti con le schede del PDF "Digitalizzato_20261011-1104".
//
// Schema di ogni prodotto:
//   id        identificativo unico (minuscole, trattini)
//   name      nome del prodotto (stringa, oppure { it, en, ... } se va tradotto)
//   category  black | green | white | oolong | puerh | herbal | rooibos | fruit
//   caffeine  none | low | medium | high
//   flavors   lista tra: floral fruity spicy citrus earthy sweet fresh
//   moments   lista tra: morning afternoon evening afterMeal
//   pairing   lista tra: pastry chocolate cheese fish fruit plain
//   iced      true se è buono anche freddo
//   origin    { it, en, ... } paese/regione
//   brew      { temp: °C, time: minuti, grams: g per tazza }
//   image     percorso foto in img/ (facoltativo)
//   desc      { it, en, fr, es, ru, zh, ar } descrizione breve
window.PECK_SAMPLE = true;

window.PECK_TEAS = [
  {
    id: "earl-grey",
    name: "Earl Grey",
    category: "black", caffeine: "high",
    flavors: ["citrus", "floral"], moments: ["morning", "afternoon"], pairing: ["pastry", "chocolate"],
    iced: true,
    origin: { it: "Miscela (India, Sri Lanka)", en: "Blend (India, Sri Lanka)", fr: "Mélange (Inde, Sri Lanka)", es: "Mezcla (India, Sri Lanka)", ru: "Купаж (Индия, Шри-Ланка)", zh: "拼配（印度、斯里兰卡）", ar: "مزيج (الهند، سريلانكا)" },
    brew: { temp: 95, time: 4, grams: 2.5 },
    desc: {
      it: "Tè nero aromatizzato al bergamotto: profumo agrumato e corpo deciso.",
      en: "Black tea scented with bergamot: citrus perfume and a firm body.",
      fr: "Thé noir parfumé à la bergamote : notes d'agrumes et corps affirmé.",
      es: "Té negro aromatizado con bergamota: perfume cítrico y cuerpo firme.",
      ru: "Чёрный чай с бергамотом: цитрусовый аромат и насыщенный вкус.",
      zh: "佛手柑调味红茶：柑橘香气，茶体浓郁。",
      ar: "شاي أسود بنكهة البرغموت: عطر حمضي وقوام قوي.",
    },
  },
  {
    id: "sencha",
    name: "Sencha",
    category: "green", caffeine: "medium",
    flavors: ["fresh", "sweet"], moments: ["morning", "afterMeal"], pairing: ["fish", "plain"],
    iced: true,
    origin: { it: "Giappone", en: "Japan", fr: "Japon", es: "Japón", ru: "Япония", zh: "日本", ar: "اليابان" },
    brew: { temp: 75, time: 2, grams: 2.5 },
    desc: {
      it: "Tè verde giapponese al vapore: note vegetali, erba fresca e finale dolce.",
      en: "Steamed Japanese green tea: vegetal notes, fresh grass and a sweet finish.",
      fr: "Thé vert japonais étuvé : notes végétales, herbe fraîche et finale douce.",
      es: "Té verde japonés al vapor: notas vegetales, hierba fresca y final dulce.",
      ru: "Японский зелёный чай, обработанный паром: травянистые ноты и сладкое послевкусие.",
      zh: "日本蒸青绿茶：青草清香，回味甘甜。",
      ar: "شاي أخضر ياباني مُبخّر: نفحات نباتية وعشب طازج وختام حلو.",
    },
  },
  {
    id: "pai-mu-tan",
    name: "Pai Mu Tan",
    category: "white", caffeine: "low",
    flavors: ["floral", "sweet"], moments: ["afternoon", "evening"], pairing: ["fruit", "plain"],
    iced: true,
    origin: { it: "Cina, Fujian", en: "China, Fujian", fr: "Chine, Fujian", es: "China, Fujian", ru: "Китай, Фуцзянь", zh: "中国福建", ar: "الصين، فوجيان" },
    brew: { temp: 80, time: 4, grams: 3 },
    desc: {
      it: "Tè bianco di gemme e foglie giovani: delicato, floreale, con note di miele.",
      en: "White tea of buds and young leaves: delicate and floral, with honey notes.",
      fr: "Thé blanc de bourgeons et jeunes feuilles : délicat, floral, notes de miel.",
      es: "Té blanco de yemas y hojas jóvenes: delicado, floral, con notas de miel.",
      ru: "Белый чай из почек и молодых листьев: нежный, цветочный, с медовыми нотами.",
      zh: "由芽头和嫩叶制成的白茶：细腻花香，带蜜韵。",
      ar: "شاي أبيض من البراعم والأوراق الفتية: رقيق وزهري مع لمسات عسل.",
    },
  },
  {
    id: "tie-guan-yin",
    name: "Tie Guan Yin",
    category: "oolong", caffeine: "medium",
    flavors: ["floral", "earthy"], moments: ["afternoon", "afterMeal"], pairing: ["cheese", "fish"],
    iced: false,
    origin: { it: "Cina, Anxi", en: "China, Anxi", fr: "Chine, Anxi", es: "China, Anxi", ru: "Китай, Аньси", zh: "中国安溪", ar: "الصين، أنشي" },
    brew: { temp: 90, time: 3, grams: 3 },
    desc: {
      it: "Oolong semi-ossidato: orchidea, burro e un leggero tostato. Regge più infusioni.",
      en: "Semi-oxidised oolong: orchid, butter and a light roast. Stands several infusions.",
      fr: "Oolong semi-oxydé : orchidée, beurre et léger torréfié. Supporte plusieurs infusions.",
      es: "Oolong semioxidado: orquídea, mantequilla y un ligero tostado. Admite varias infusiones.",
      ru: "Полуферментированный улун: орхидея, сливочность, лёгкая обжарка. Выдерживает несколько заварок.",
      zh: "半发酵乌龙：兰花香、奶香与微焙火香，耐冲泡。",
      ar: "أولونغ نصف مؤكسد: أوركيد وزبدة وتحميص خفيف. يتحمّل عدة نقعات.",
    },
  },
  {
    id: "rooibos",
    name: "Rooibos",
    category: "rooibos", caffeine: "none",
    flavors: ["sweet", "earthy"], moments: ["evening", "afternoon"], pairing: ["pastry", "chocolate"],
    iced: true,
    origin: { it: "Sudafrica", en: "South Africa", fr: "Afrique du Sud", es: "Sudáfrica", ru: "ЮАР", zh: "南非", ar: "جنوب أفريقيا" },
    brew: { temp: 100, time: 6, grams: 3 },
    desc: {
      it: "Infuso sudafricano senza teina: morbido, naturalmente dolce, note di caramello.",
      en: "Caffeine-free South African infusion: smooth, naturally sweet, caramel notes.",
      fr: "Infusion sud-africaine sans théine : ronde, naturellement douce, notes de caramel.",
      es: "Infusión sudafricana sin teína: suave, dulce por naturaleza, notas de caramelo.",
      ru: "Южноафриканский настой без кофеина: мягкий, естественно сладкий, с нотами карамели.",
      zh: "不含咖啡因的南非草本茶：顺滑，天然甜润，带焦糖香。",
      ar: "منقوع جنوب أفريقي بدون كافيين: ناعم وحلو بطبيعته مع نفحات كراميل.",
    },
  },
  {
    id: "camomilla",
    name: { it: "Camomilla", en: "Chamomile", fr: "Camomille", es: "Manzanilla", ru: "Ромашка", zh: "洋甘菊", ar: "بابونج" },
    category: "herbal", caffeine: "none",
    flavors: ["floral", "sweet"], moments: ["evening", "afterMeal"], pairing: ["plain", "pastry"],
    iced: false,
    origin: { it: "Egitto", en: "Egypt", fr: "Égypte", es: "Egipto", ru: "Египет", zh: "埃及", ar: "مصر" },
    brew: { temp: 100, time: 5, grams: 2 },
    desc: {
      it: "Fiori interi di camomilla: rilassante, con note di mela e fieno.",
      en: "Whole chamomile flowers: relaxing, with notes of apple and hay.",
      fr: "Fleurs entières de camomille : apaisante, notes de pomme et de foin.",
      es: "Flores enteras de manzanilla: relajante, con notas de manzana y heno.",
      ru: "Цельные цветки ромашки: расслабляет, ноты яблока и сена.",
      zh: "整朵洋甘菊：舒缓放松，带苹果与干草香。",
      ar: "أزهار بابونج كاملة: مهدّئ بنفحات التفاح والقش.",
    },
  },
];
