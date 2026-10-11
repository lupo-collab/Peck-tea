// Catalogo Peck: tè, tisane e infusi.
// Fonte: PDF "Digitalizzato_20261011-1104" (trascritto nel Google Doc "Peck catalogo tè").
// "page" è la pagina del PDF da cui proviene la scheda.
//
// Campi:
//   name       nome come nel catalogo (stringa o { it, en, ... } se descrittivo)
//   category   black | green | white | oolong | puerh | herbal | rooibos | fruit
//   caffeine   none | low | medium | high. NON indicata nel PDF: stimata in base al tipo di tè
//   flavors    floral fruity spicy citrus earthy sweet fresh (dal PDF)
//   moments    morning afternoon evening afterMeal (solo se il PDF lo dice)
//   pairing    plain = "da bere in purezza" (solo se il PDF lo dice)
//   iced       true se il PDF lo consiglia anche freddo
//   origin     chiave del dizionario PECK_ORIGINS
//   brew       temp °C, time minuti [min, max], grams per tazza [min, max]; null se non indicato
//   ingredients chiavi del dizionario PECK_INGREDIENTS, con ":NN" per la percentuale
// Le descrizioni sono in js/desc.js, i nomi degli ingredienti e delle origini qui sotto.
window.PECK_SAMPLE = false;

(function () {
  function P(id, page, name, category, caffeine, flavors, moments, pairing, iced, origin, brew, ingredients) {
    return {
      id: id, page: page, name: name, category: category, caffeine: caffeine,
      flavors: flavors || [], moments: moments || [], pairing: pairing || [], iced: !!iced,
      origin: origin || null, brew: brew || null, ingredients: ingredients || [],
    };
  }
  function B(temp, time, grams) { return { temp: temp, time: time, grams: grams }; }

  window.PECK_TEAS = [
    P("long-jing", 1, "Long Jing Puit du Dragon", "green", "medium", ["sweet", "fresh"], null, null, false, "china-hubei", B(80, [3, 4], [2, 3])),
    P("jin-ya-hong-cha", 2, "Jin Ya Hong Cha Yunnan Golden Buds", "black", "high", ["spicy", "fruity", "sweet"], null, ["plain"], false, "china-yunnan", B(95, [4, 5], [2, 3])),
    P("white-monkey", 3, "White Monkey", "green", "medium", ["fresh", "floral", "sweet"], null, null, false, "china", B(80, [3, 4], [2, 3])),
    P("yunnan-silver-bud", 4, "Yunnan Silver Bud Ja Bao", "white", "low", ["sweet", "fruity", "floral"], null, null, false, "china-yunnan", B(85, [5, 6], [2, 3])),
    P("assam-halmari", 5, "Assam Halmari B.O.P.", "black", "high", ["spicy"], null, null, false, "india-assam-dibrugarh", B(95, [2, 3], [2, 3])),
    P("assam-mangalam", 6, "Assam Mangalam F.O.P.", "black", "high", ["fruity", "spicy"], null, null, false, "india-assam", B(95, [2, 3], [2, 3])),
    P("assam-orangajulli", 7, "Assam Orangajulli F.O.P.", "black", "high", ["earthy"], null, null, false, "india-assam", B(95, [2, 3], [2, 3])),
    P("darjeeling-margarets-hope", 8, "Darjeeling Margaret's Hope 2nd Flush", "black", "high", ["sweet", "fruity"], null, null, false, "india-darjeeling", B(95, [4, 5], [2, 3])),
    P("assam-thowra", 9, "Assam Thowra F.O.P.", "black", "high", ["spicy"], null, null, false, "india-assam", B(95, [2, 3], [2, 3])),
    P("ceylon-pettiagalla", 10, "Ceylon Pettiagalla O.P.S.", "black", "high", ["sweet", "fruity"], null, ["plain"], false, "ceylon-dimbula", B(95, [2, 3], [2, 3])),
    P("darjeeling-selimbong", 11, "Darjeeling Selimbong 2nd Flush", "black", "high", ["sweet", "fruity", "floral", "spicy", "citrus"], ["afternoon"], ["plain"], false, "india-darjeeling-mirik", B(95, [2, 3], [2, 3])),
    P("darjeeling-lingia", 12, "Darjeeling Lingia 1st Flush 2014", "black", "high", ["floral", "fruity"], null, null, false, "india-darjeeling", B(95, [2, 3], [2, 3])),
    P("darjeeling-castleton", 13, "Darjeeling Castleton T.G.F.O.P. 2nd Flush", "black", "high", ["fruity", "floral"], null, null, false, "india-darjeeling-kurseong", B(95, [2, 3], [2, 3])),
    P("lady-chatterley", 14, "Lady Chatterley", "green", "medium", ["floral", "citrus"], null, ["plain"], false, null, B(80, [3, 4], [2, 3]),
      ["green_tea:83", "lemon_peel", "orange_blossom", "bergamot_aroma", "flavouring"]),
    P("earl-grey", 15, "Peck Earl Grey", "black", "high", ["sweet", "citrus"], null, null, false, "ceylon-yunnan", B(95, [4, 5], [2, 3]),
      ["black_tea", "bergamot_aroma"]),
    P("caribbean-kiss", 16, "Caribbean Kiss", "green", "medium", ["citrus", "spicy", "sweet"], null, null, false, null, B(80, [3, 4], [2, 3]),
      ["green_tea:44", "black_tea:20", "lemongrass", "carrot_peel", "orange_peel", "pink_pepper", "pomelo", "flavouring"]),
    P("princess-shahrazad", 17, "Princess Shahrazàd", "green", "medium", ["floral", "sweet"], null, null, false, "china", B(80, [3, 4], [2, 3]),
      ["green_tea", "rose_petals"]),
    P("oriental-tchay", 18, "Oriental Tchay", "black", "medium", ["spicy"], ["morning", "afternoon", "evening"], ["plain"], false, "china", B(100, [3, 4], [2, 3]),
      ["black_tea:66", "cinnamon", "black_pepper", "cloves", "flavouring", "ginger", "cardamom", "cardamom_seeds"]),
    P("ryokan-dew", 19, "Ryokan Dew", "green", "medium", ["fruity"], null, null, false, null, B(80, [3, 4], [2, 3]),
      ["green_white_tea:80", "dragon_fruit", "lemon_peel", "flavouring", "kiwi_fd", "raspberry_fd", "pomegranate"]),
    P("pleasure-forest", 20, "Pleasure Forest", "black", "high", ["sweet"], null, null, false, null, B(95, [4, 5], [2, 3]),
      ["black_tea:89", "pistachio", "flavouring", "safflower"]),
    P("majorelle-garden", 21, "Majorelle Garden", "green", "medium", ["fresh"], null, null, true, null, B(80, [3, 4], [2, 3]),
      ["green_tea", "spearmint", "mint_aroma"]),
    P("ceylon-kenylworth", 22, "Ceylon Kenylworth F.O.P.", "black", "high", null, null, null, false, "ceylon", B(95, [2, 3], [2, 3])),
    P("exotic-love", 23, "Exotic Love", "fruit", "none", ["fruity", "citrus"], null, null, false, null, B(95, [4, 5], [3]),
      ["papaya", "mango", "apple", "hibiscus_buds", "flavouring", "orange", "pomegranate", "safflower"]),
    P("heart-melodies", 24, "Heart Melodies", "herbal", "none", ["citrus"], null, null, false, null, B(95, [4, 5], [3]),
      ["cocoa_husk", "apple", "orange_peel", "cocoa_nibs", "lemongrass", "flavouring", "rose_hip", "nettle_leaves", "blackberry_leaves"]),
    P("sweet-temptation", 25, "Sweet Temptation", "herbal", "none", ["fruity", "spicy"], ["evening"], null, false, null, B(95, [4, 5], [3]),
      ["cranberry", "apple", "mistletoe", "star_anise", "cinnamon", "flavouring", "blackberry_leaves", "cranberry_fd", "safflower"]),
    P("spicy-yoga", 26, "Spicy Yoga", "herbal", "none", ["spicy", "earthy", "citrus"], null, null, false, null, B(95, [4, 5], [3]),
      ["ginger_root", "cardamom", "coriander", "turmeric_root", "cloves", "nutmeg"]),
    P("pai-mu-tan", 27, "Pai Mu Tan", "white", "low", ["fruity", "sweet"], null, null, false, "china", B(80, [5, 6], [2, 3])),
    P("english-breakfast", 28, "Peck English Breakfast", "black", "high", null, ["morning"], ["plain"], false, "sumatra-assam", B(95, [4, 5], [2, 3])),
    P("afternoon-tea", 29, "Peck Afternoon Tea", "black", "high", null, ["afternoon"], null, false, "darjeeling-ceylon", B(95, [2, 3], [2, 3])),
    P("irish-breakfast", 30, "Peck Irish Breakfast", "black", "high", null, ["morning"], null, false, "assam-sumatra", B(95, [2, 3], [2, 3])),
    P("tou-cha-1998", 31, "Tou Cha Vintage 1998", "puerh", "medium", ["earthy", "sweet"], null, null, false, "china", B(100, [5], null)),
    P("fu-zi-zhuan-1987", 32, "Pu-erh Fu Zi Zhuan Vintage 1987", "puerh", "medium", ["sweet", "fruity", "earthy"], null, null, false, "china", B(100, [5], null)),
    P("bancha", 33, "Bancha", "green", "low", null, ["afterMeal"], null, false, "japan", B(80, [3, 4], [2, 3])),
    P("sencha-fuji", 34, "Sencha Fuji", "green", "medium", ["fresh", "sweet"], null, ["plain"], true, "japan", B(80, [2, 3], [2, 3])),
    P("kukicha", 35, "Kukicha", "green", "low", ["fresh", "sweet", "spicy"], null, null, false, "japan", B(80, [3, 4], [2, 3])),
    P("gyokuro-asahi", 36, "Gyokuro Asahi", "green", "high", ["sweet"], null, null, false, "japan", B(80, [3, 4], [2, 3])),
    P("gyokuro-hiki", 37, "Gyokuro Hiki", "green", "high", ["sweet"], null, null, false, "japan-wakayama", B(80, [3, 4], [2, 3])),
    P("secret-eyes", 38, "Secret Eyes", "herbal", "none", ["citrus", "spicy", "fresh"], ["morning", "afternoon", "evening"], null, true, null, B(95, [4, 5], [3]),
      ["lemongrass", "liquorice_root", "ginger", "peppermint", "lemon_peel", "black_pepper"]),
    P("childhood-memories", 39, "Childhood Memories", "rooibos", "none", ["fruity"], null, null, false, null, B(80, [3, 4], [2, 3]),
      ["rooibos", "cranberry_fd", "flavouring"]),
    P("aurora-borealis", 41, "Aurora Borealis · Vata", "herbal", "none", ["spicy"], null, null, false, null, B(100, [5, 10], [5]),
      ["cinnamon", "liquorice_root", "ginger", "fennel", "orange_peel", "cardamom"]),
    P("rooibos-prugna", 42, { it: "Rooibos alla prugna", en: "Plum rooibos", fr: "Rooibos à la prune", es: "Rooibos con ciruela", ru: "Ройбуш со сливой", zh: "李子路易波士茶", ar: "رويبوس بالبرقوق" },
      "rooibos", "none", ["fruity"], null, null, false, null, null,
      ["rooibos", "apple", "flavouring", "sour_cherry", "plum_fd", "sour_cherry_fd", "mallow_flowers"]),
    P("lavanda-lampone", 43, { it: "Infuso alla lavanda e lampone", en: "Lavender & raspberry infusion", fr: "Infusion lavande et framboise", es: "Infusión de lavanda y frambuesa", ru: "Настой с лавандой и малиной", zh: "薰衣草覆盆子花草茶", ar: "منقوع الخزامى والتوت" },
      "herbal", "none", ["fruity", "floral"], null, null, false, null, B(100, [5, 10], [3]),
      ["apple", "fennel", "elderberries", "rose_hip_peel", "chamomile", "raspberry_leaves", "lemon_verbena", "lavender", "flavouring", "raspberry_fd"]),
    P("gelsomino-agrumi", 44, { it: "Tè verde e bianco al gelsomino e agrumi", en: "Green & white tea with jasmine and citrus", fr: "Thé vert et blanc jasmin et agrumes", es: "Té verde y blanco con jazmín y cítricos", ru: "Зелёный и белый чай с жасмином и цитрусами", zh: "茉莉柑橘绿白茶", ar: "شاي أخضر وأبيض بالياسمين والحمضيات" },
      "green", "medium", ["floral", "citrus"], null, null, false, null, null,
      ["green_tea_mix:84", "white_tea_pmt:8", "flavouring", "rose_buds", "rose_petals", "mallow_flowers"]),
    P("erbe-montagna-miele", 45, { it: "Infuso alle erbe di montagna e miele", en: "Mountain herbs & honey infusion", fr: "Infusion herbes de montagne et miel", es: "Infusión de hierbas de montaña y miel", ru: "Настой горных трав с мёдом", zh: "高山草本蜂蜜花草茶", ar: "منقوع أعشاب الجبل والعسل" },
      "herbal", "none", ["floral", "sweet"], null, null, false, null, B(null, [5, 10], null),
      ["apple", "hibiscus_flowers", "greek_mountain_tea", "heather_flowers", "apple_mint", "sweet_blackberry_leaves", "lemon_verbena", "silver_lime_flowers", "rose_petals", "manuka_honey", "poppy_petals", "cornflowers"]),
  ];

  window.PECK_ORIGINS = {
    "china": { it: "Cina", en: "China", fr: "Chine", es: "China", ru: "Китай", zh: "中国", ar: "الصين" },
    "china-hubei": { it: "Cina, Hubei", en: "China, Hubei", fr: "Chine, Hubei", es: "China, Hubei", ru: "Китай, Хубэй", zh: "中国湖北", ar: "الصين، هوبي" },
    "china-yunnan": { it: "Cina, Yunnan", en: "China, Yunnan", fr: "Chine, Yunnan", es: "China, Yunnan", ru: "Китай, Юньнань", zh: "中国云南", ar: "الصين، يونان" },
    "india-assam": { it: "India, Assam", en: "India, Assam", fr: "Inde, Assam", es: "India, Assam", ru: "Индия, Ассам", zh: "印度阿萨姆", ar: "الهند، آسام" },
    "india-assam-dibrugarh": { it: "India, Assam (distretto di Dibrugarh)", en: "India, Assam (Dibrugarh district)", fr: "Inde, Assam (district de Dibrugarh)", es: "India, Assam (distrito de Dibrugarh)", ru: "Индия, Ассам (округ Дибругарх)", zh: "印度阿萨姆（迪布鲁格尔县）", ar: "الهند، آسام (مقاطعة ديبروغاره)" },
    "india-darjeeling": { it: "India, Darjeeling", en: "India, Darjeeling", fr: "Inde, Darjeeling", es: "India, Darjeeling", ru: "Индия, Дарджилинг", zh: "印度大吉岭", ar: "الهند، دارجيلنغ" },
    "india-darjeeling-mirik": { it: "India, Darjeeling (valle di Mirik)", en: "India, Darjeeling (Mirik valley)", fr: "Inde, Darjeeling (vallée de Mirik)", es: "India, Darjeeling (valle de Mirik)", ru: "Индия, Дарджилинг (долина Мирик)", zh: "印度大吉岭（米里克山谷）", ar: "الهند، دارجيلنغ (وادي ميريك)" },
    "india-darjeeling-kurseong": { it: "India, Darjeeling (Kurseong South Valley)", en: "India, Darjeeling (Kurseong South Valley)", fr: "Inde, Darjeeling (Kurseong South Valley)", es: "India, Darjeeling (Kurseong South Valley)", ru: "Индия, Дарджилинг (долина Курсеонг)", zh: "印度大吉岭（库尔塞昂南谷）", ar: "الهند، دارجيلنغ (وادي كورسيونغ الجنوبي)" },
    "ceylon": { it: "Ceylon (Sri Lanka)", en: "Ceylon (Sri Lanka)", fr: "Ceylan (Sri Lanka)", es: "Ceilán (Sri Lanka)", ru: "Цейлон (Шри-Ланка)", zh: "锡兰（斯里兰卡）", ar: "سيلان (سريلانكا)" },
    "ceylon-dimbula": { it: "Ceylon, Dimbula (distretto di Balangoda)", en: "Ceylon, Dimbula (Balangoda district)", fr: "Ceylan, Dimbula (district de Balangoda)", es: "Ceilán, Dimbula (distrito de Balangoda)", ru: "Цейлон, Димбула (округ Балангода)", zh: "锡兰汀布拉（巴兰戈达区）", ar: "سيلان، ديمبولا (مقاطعة بالانغودا)" },
    "ceylon-yunnan": { it: "Ceylon e Yunnan", en: "Ceylon and Yunnan", fr: "Ceylan et Yunnan", es: "Ceilán y Yunnan", ru: "Цейлон и Юньнань", zh: "锡兰与云南", ar: "سيلان ويونان" },
    "sumatra-assam": { it: "Sumatra e Assam", en: "Sumatra and Assam", fr: "Sumatra et Assam", es: "Sumatra y Assam", ru: "Суматра и Ассам", zh: "苏门答腊与阿萨姆", ar: "سومطرة وآسام" },
    "assam-sumatra": { it: "Assam e Sumatra", en: "Assam and Sumatra", fr: "Assam et Sumatra", es: "Assam y Sumatra", ru: "Ассам и Суматра", zh: "阿萨姆与苏门答腊", ar: "آسام وسومطرة" },
    "darjeeling-ceylon": { it: "Darjeeling e Ceylon", en: "Darjeeling and Ceylon", fr: "Darjeeling et Ceylan", es: "Darjeeling y Ceilán", ru: "Дарджилинг и Цейлон", zh: "大吉岭与锡兰", ar: "دارجيلنغ وسيلان" },
    "japan": { it: "Giappone", en: "Japan", fr: "Japon", es: "Japón", ru: "Япония", zh: "日本", ar: "اليابان" },
    "japan-wakayama": { it: "Giappone, Wakayama", en: "Japan, Wakayama", fr: "Japon, Wakayama", es: "Japón, Wakayama", ru: "Япония, Вакаяма", zh: "日本和歌山", ar: "اليابان، واكاياما" },
  };

  // Ingredienti: [it, en, fr, es, ru, zh, ar]
  var I = {
    green_tea: ["tè verde", "green tea", "thé vert", "té verde", "зелёный чай", "绿茶", "شاي أخضر"],
    black_tea: ["tè nero", "black tea", "thé noir", "té negro", "чёрный чай", "红茶", "شاي أسود"],
    green_white_tea: ["miscela di tè verde e bianco", "green and white tea blend", "mélange de thé vert et blanc", "mezcla de té verde y blanco", "смесь зелёного и белого чая", "绿茶白茶拼配", "مزيج شاي أخضر وأبيض"],
    green_tea_mix: ["tè verde Sencha, Lung Ching e Yunnan", "Sencha, Lung Ching and Yunnan green tea", "thé vert Sencha, Lung Ching et Yunnan", "té verde Sencha, Lung Ching y Yunnan", "зелёный чай Сенча, Лунцзин и Юньнань", "煎茶、龙井与云南绿茶", "شاي أخضر سينشا ولونغ تشينغ ويونان"],
    white_tea_pmt: ["tè bianco Pai Mu Tan", "Pai Mu Tan white tea", "thé blanc Pai Mu Tan", "té blanco Pai Mu Tan", "белый чай Пай Му Тань", "白牡丹白茶", "شاي أبيض باي مو تان"],
    rooibos: ["rooibos", "rooibos", "rooibos", "rooibos", "ройбуш", "路易波士", "رويبوس"],
    flavouring: ["aroma", "flavouring", "arôme", "aroma", "ароматизатор", "香料", "منكّه"],
    bergamot_aroma: ["aroma naturale di bergamotto", "natural bergamot flavouring", "arôme naturel de bergamote", "aroma natural de bergamota", "натуральный ароматизатор бергамота", "天然佛手柑香料", "منكّه البرغموت الطبيعي"],
    mint_aroma: ["aroma naturale di menta fresca", "natural fresh mint flavouring", "arôme naturel de menthe fraîche", "aroma natural de menta fresca", "натуральный ароматизатор свежей мяты", "天然鲜薄荷香料", "منكّه النعناع الطازج الطبيعي"],
    lemon_peel: ["scorza di limone", "lemon peel", "zeste de citron", "piel de limón", "цедра лимона", "柠檬皮", "قشر الليمون"],
    orange_peel: ["scorza d'arancia", "orange peel", "zeste d'orange", "piel de naranja", "апельсиновая цедра", "橙皮", "قشر البرتقال"],
    orange: ["arancia", "orange", "orange", "naranja", "апельсин", "橙", "برتقال"],
    orange_blossom: ["fiori d'arancio", "orange blossom", "fleurs d'oranger", "flor de azahar", "цветы апельсина", "橙花", "زهر البرتقال"],
    pomelo: ["pomelo", "pomelo", "pomelo", "pomelo", "помело", "柚子", "بوميلو"],
    lemongrass: ["citronella", "lemongrass", "citronnelle", "hierba limón", "лемонграсс", "香茅", "عشبة الليمون"],
    carrot_peel: ["buccia di carota", "carrot peel", "pelure de carotte", "piel de zanahoria", "кожура моркови", "胡萝卜皮", "قشر الجزر"],
    pink_pepper: ["pepe rosa", "pink pepper", "baies roses", "pimienta rosa", "розовый перец", "粉红胡椒", "فلفل وردي"],
    black_pepper: ["pepe nero", "black pepper", "poivre noir", "pimienta negra", "чёрный перец", "黑胡椒", "فلفل أسود"],
    rose_petals: ["petali di rosa", "rose petals", "pétales de rose", "pétalos de rosa", "лепестки розы", "玫瑰花瓣", "بتلات الورد"],
    rose_buds: ["boccioli di rosa", "rose buds", "boutons de rose", "capullos de rosa", "бутоны розы", "玫瑰花苞", "براعم الورد"],
    cinnamon: ["cannella", "cinnamon", "cannelle", "canela", "корица", "肉桂", "قرفة"],
    cloves: ["chiodi di garofano", "cloves", "clous de girofle", "clavo", "гвоздика", "丁香", "قرنفل"],
    ginger: ["zenzero", "ginger", "gingembre", "jengibre", "имбирь", "姜", "زنجبيل"],
    ginger_root: ["radice di zenzero", "ginger root", "racine de gingembre", "raíz de jengibre", "корень имбиря", "姜根", "جذر الزنجبيل"],
    cardamom: ["cardamomo", "cardamom", "cardamome", "cardamomo", "кардамон", "小豆蔻", "هيل"],
    cardamom_seeds: ["semi di cardamomo", "cardamom seeds", "graines de cardamome", "semillas de cardamomo", "семена кардамона", "小豆蔻籽", "بذور الهيل"],
    star_anise: ["anice stellato", "star anise", "anis étoilé", "anís estrellado", "бадьян", "八角", "يانسون نجمي"],
    coriander: ["coriandolo", "coriander", "coriandre", "cilantro", "кориандр", "芫荽籽", "كزبرة"],
    turmeric_root: ["radice di curcuma", "turmeric root", "racine de curcuma", "raíz de cúrcuma", "корень куркумы", "姜黄根", "جذر الكركم"],
    nutmeg: ["noce moscata", "nutmeg", "noix de muscade", "nuez moscada", "мускатный орех", "肉豆蔻", "جوزة الطيب"],
    liquorice_root: ["radice di liquirizia", "liquorice root", "racine de réglisse", "raíz de regaliz", "корень солодки", "甘草根", "جذر العرقسوس"],
    fennel: ["finocchio", "fennel", "fenouil", "hinojo", "фенхель", "茴香", "شمر"],
    peppermint: ["menta piperita", "peppermint", "menthe poivrée", "menta piperita", "перечная мята", "薄荷", "نعناع فلفلي"],
    spearmint: ["menta verde", "spearmint", "menthe verte", "hierbabuena", "мята колосистая", "留兰香", "نعناع أخضر"],
    apple_mint: ["menta mela", "apple mint", "menthe pomme", "menta manzana", "яблочная мята", "苹果薄荷", "نعناع التفاح"],
    dragon_fruit: ["frutto del drago", "dragon fruit", "fruit du dragon", "pitahaya", "питахайя", "火龙果", "فاكهة التنين"],
    kiwi_fd: ["kiwi liofilizzato", "freeze-dried kiwi", "kiwi lyophilisé", "kiwi liofilizado", "сублимированный киви", "冻干猕猴桃", "كيوي مجفف بالتجميد"],
    raspberry_fd: ["lamponi liofilizzati", "freeze-dried raspberries", "framboises lyophilisées", "frambuesa liofilizada", "сублимированная малина", "冻干覆盆子", "توت العليق مجفف بالتجميد"],
    pomegranate: ["melagrana", "pomegranate", "grenade", "granada", "гранат", "石榴", "رمان"],
    pistachio: ["pistacchio", "pistachio", "pistache", "pistacho", "фисташка", "开心果", "فستق"],
    safflower: ["cartamo", "safflower", "carthame", "cártamo", "сафлор", "红花", "عصفر"],
    papaya: ["papaia (papaia, zucchero)", "papaya (papaya, sugar)", "papaye (papaye, sucre)", "papaya (papaya, azúcar)", "папайя (папайя, сахар)", "木瓜（木瓜、糖）", "بابايا (بابايا، سكر)"],
    mango: ["mango (mango, zucchero)", "mango (mango, sugar)", "mangue (mangue, sucre)", "mango (mango, azúcar)", "манго (манго, сахар)", "芒果（芒果、糖）", "مانجو (مانجو، سكر)"],
    apple: ["mela", "apple", "pomme", "manzana", "яблоко", "苹果", "تفاح"],
    hibiscus_buds: ["boccioli di ibisco", "hibiscus buds", "boutons d'hibiscus", "capullos de hibisco", "бутоны гибискуса", "洛神花苞", "براعم الكركديه"],
    hibiscus_flowers: ["fiori di ibisco", "hibiscus flowers", "fleurs d'hibiscus", "flores de hibisco", "цветы гибискуса", "洛神花", "زهور الكركديه"],
    cocoa_husk: ["buccia di cacao", "cocoa husk", "coques de cacao", "cáscara de cacao", "шелуха какао", "可可壳", "قشر الكاكاو"],
    cocoa_nibs: ["croccante di cacao tostato", "roasted cocoa nibs", "éclats de cacao torréfié", "nibs de cacao tostado", "обжаренная крупка какао", "烘焙可可碎", "حبيبات كاكاو محمصة"],
    rose_hip: ["bacche di rosa canina", "rose hips", "baies d'églantier", "escaramujo", "шиповник", "玫瑰果", "ثمر الورد"],
    rose_hip_peel: ["scorza di rosa canina", "rose hip peel", "écorce d'églantier", "cáscara de escaramujo", "кожура шиповника", "玫瑰果皮", "قشر ثمر الورد"],
    nettle_leaves: ["foglie di ortica", "nettle leaves", "feuilles d'ortie", "hojas de ortiga", "листья крапивы", "荨麻叶", "أوراق القراص"],
    blackberry_leaves: ["foglie di mora", "blackberry leaves", "feuilles de mûrier", "hojas de zarzamora", "листья ежевики", "黑莓叶", "أوراق العليق"],
    sweet_blackberry_leaves: ["foglie di mora dolce", "sweet blackberry leaves", "feuilles de mûrier doux", "hojas de zarzamora dulce", "листья сладкой ежевики", "甜黑莓叶", "أوراق العليق الحلو"],
    cranberry: ["mirtillo rosso (mirtillo rosso, zucchero, olio di girasole)", "cranberry (cranberry, sugar, sunflower oil)", "canneberge (canneberge, sucre, huile de tournesol)", "arándano rojo (arándano rojo, azúcar, aceite de girasol)", "клюква (клюква, сахар, подсолнечное масло)", "蔓越莓（蔓越莓、糖、葵花籽油）", "توت بري (توت بري، سكر، زيت دوار الشمس)"],
    cranberry_fd: ["mirtillo rosso liofilizzato", "freeze-dried cranberry", "canneberge lyophilisée", "arándano rojo liofilizado", "сублимированная клюква", "冻干蔓越莓", "توت بري مجفف بالتجميد"],
    mistletoe: ["vischio", "mistletoe", "gui", "muérdago", "омела", "槲寄生", "الهدال"],
    sour_cherry: ["amarene", "sour cherries", "griottes", "guindas", "вишня", "酸樱桃", "كرز حامض"],
    sour_cherry_fd: ["amarene liofilizzate", "freeze-dried sour cherries", "griottes lyophilisées", "guindas liofilizadas", "сублимированная вишня", "冻干酸樱桃", "كرز حامض مجفف بالتجميد"],
    plum_fd: ["prugna liofilizzata", "freeze-dried plum", "prune lyophilisée", "ciruela liofilizada", "сублимированная слива", "冻干李子", "برقوق مجفف بالتجميد"],
    mallow_flowers: ["fiori di malva", "mallow flowers", "fleurs de mauve", "flores de malva", "цветы мальвы", "锦葵花", "زهور الخبيزة"],
    elderberries: ["bacche di sambuco", "elderberries", "baies de sureau", "bayas de saúco", "ягоды бузины", "接骨木果", "ثمار البلسان"],
    chamomile: ["camomilla", "chamomile", "camomille", "manzanilla", "ромашка", "洋甘菊", "بابونج"],
    raspberry_leaves: ["foglie di lampone", "raspberry leaves", "feuilles de framboisier", "hojas de frambuesa", "листья малины", "覆盆子叶", "أوراق توت العليق"],
    lemon_verbena: ["verbena odorosa", "lemon verbena", "verveine citronnelle", "hierba luisa", "лимонная вербена", "柠檬马鞭草", "لويزة"],
    lavender: ["lavanda", "lavender", "lavande", "lavanda", "лаванда", "薰衣草", "خزامى"],
    greek_mountain_tea: ["tè greco di montagna", "Greek mountain tea", "thé de montagne grec", "té de montaña griego", "греческий горный чай", "希腊山茶", "شاي الجبل اليوناني"],
    heather_flowers: ["fiori di erica", "heather flowers", "fleurs de bruyère", "flores de brezo", "цветы вереска", "石楠花", "زهور الخلنج"],
    silver_lime_flowers: ["fiori di tiglio argentato", "silver lime flowers", "fleurs de tilleul argenté", "flores de tilo plateado", "цветы серебристой липы", "银椴花", "زهور الزيزفون الفضي"],
    manuka_honey: ["miele di Manuka in polvere (miele di Manuka, maltodestrina)", "Manuka honey powder (Manuka honey, maltodextrin)", "miel de Manuka en poudre (miel de Manuka, maltodextrine)", "miel de Manuka en polvo (miel de Manuka, maltodextrina)", "порошок мёда манука (мёд манука, мальтодекстрин)", "麦卢卡蜂蜜粉（麦卢卡蜂蜜、麦芽糊精）", "مسحوق عسل المانوكا (عسل المانوكا، مالتودكسترين)"],
    poppy_petals: ["petali di papavero", "poppy petals", "pétales de coquelicot", "pétalos de amapola", "лепестки мака", "罂粟花瓣", "بتلات الخشخاش"],
    cornflowers: ["fiordalisi", "cornflowers", "bleuets", "acianos", "васильки", "矢车菊", "زهور القنطريون"],
  };
  var order = ["it", "en", "fr", "es", "ru", "zh", "ar"];
  window.PECK_INGREDIENTS = {};
  Object.keys(I).forEach(function (k) {
    var o = {};
    order.forEach(function (l, i) { o[l] = I[k][i]; });
    window.PECK_INGREDIENTS[k] = o;
  });
})();

// Foto illustrative da Pexels (licenza Pexels: uso gratuito, attribuzione non obbligatoria).
// NON ritraggono i prodotti Peck: rappresentano il tipo di tè. id = numero della foto su pexels.com.
window.PECK_PHOTOS = {
  "loose-flatlay": 33118330,     // Artistic Flat Lay of Teapot and Loose Tea Leaves
  "cha-he": 6545351,             // Tea in Cha He on Tea Ceremony
  "gaiwan-green": 5975975,       // Gaiwan Pot with Green Tea Leaves Prepared for Brewing
  "gaiwan-pour": 6545346,        // Hand Holding Ceramic Gaiwan and Pouring Tea in Glass Teapot
  "dark-leaves": 6351839,        // Top View of Oolong Tea
  "green-glass": 1638278,        // Green Leaves in Clear Glass Cup
  "green-white": 4390014,        // Green tea with leaves on white background
  "herbal-loose": 32908162,      // Close-up of Dried Herbal Tea Leaves
  "herbs-spoon": 6694167,        // Dried Herbs on Wooden Spoon (camomilla e lavanda)
  "herbs-jars": 16716139,        // Tea in Glasses by Herbs in Glass Bottles
  "spices": 1590139,             // Assorted Seasoning in White Ceramic Spoon
  "hibiscus-cup": 8678927,       // A Hibiscus Tea
  "hibiscus-leaves": 6507025,    // Tea With Hibiscus Leaves
  "fruit-cup": 11470219,         // Fruit Tea in a Cup
  "moroccan-set": 30906052,      // Traditional Moroccan Mint Tea Set on Red Rug
  "mint-fresh": 5275234,         // Refreshing tea with green mint
  "kettle-pour": 230477,         // Gold Kettle Pouring Hot Water on Cup of Tea
  "cup-pour": 3889844,           // A Person Pouring Tea in the Cup
};
(function () {
  var map = {
    "long-jing": "gaiwan-green", "jin-ya-hong-cha": "cha-he", "white-monkey": "gaiwan-green", "yunnan-silver-bud": "gaiwan-pour",
    "assam-halmari": "loose-flatlay", "assam-mangalam": "loose-flatlay", "assam-orangajulli": "loose-flatlay", "assam-thowra": "loose-flatlay",
    "darjeeling-margarets-hope": "cup-pour", "darjeeling-selimbong": "cup-pour", "darjeeling-lingia": "cup-pour", "darjeeling-castleton": "cup-pour",
    "ceylon-pettiagalla": "kettle-pour", "ceylon-kenylworth": "kettle-pour",
    "lady-chatterley": "green-white", "earl-grey": "loose-flatlay", "caribbean-kiss": "herbal-loose", "princess-shahrazad": "gaiwan-green",
    "oriental-tchay": "spices", "ryokan-dew": "herbal-loose", "pleasure-forest": "loose-flatlay", "majorelle-garden": "moroccan-set",
    "exotic-love": "fruit-cup", "heart-melodies": "herbal-loose", "sweet-temptation": "hibiscus-cup", "spicy-yoga": "spices",
    "pai-mu-tan": "gaiwan-pour", "english-breakfast": "kettle-pour", "afternoon-tea": "cup-pour", "irish-breakfast": "kettle-pour",
    "tou-cha-1998": "dark-leaves", "fu-zi-zhuan-1987": "dark-leaves",
    "bancha": "green-glass", "sencha-fuji": "green-glass", "kukicha": "green-white", "gyokuro-asahi": "green-glass", "gyokuro-hiki": "green-white",
    "secret-eyes": "mint-fresh", "childhood-memories": "hibiscus-leaves", "aurora-borealis": "spices", "rooibos-prugna": "hibiscus-leaves",
    "lavanda-lampone": "herbs-spoon", "gelsomino-agrumi": "herbs-jars", "erbe-montagna-miele": "herbs-spoon",
  };
  window.PECK_TEAS.forEach(function (t) { t.photo = window.PECK_PHOTOS[map[t.id]] || null; });
})();
