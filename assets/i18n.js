(function () {
  const STORAGE_KEY = "hajimeLang";
  const SUPPORTED = ["sk", "en"];
  const textSources = new WeakMap();

  const meta = {
    titles: {
      "Aplikácie | Lukas Kubaliak": "Apps | Lukas Kubaliak",
      "Cyclia | Sledovanie cyklu a menštruácie": "Cyclia | Cycle and period tracking",
      "Levela | Tréningový denník pre progres": "Levela | Training journal for progress",
      "Košíq | Nákupný zoznam a ceny potravín": "Košíq | Shopping list and grocery prices",
      "Podpora | Cyclia": "Support | Cyclia",
      "Zásady ochrany súkromia | Cyclia": "Privacy Policy | Cyclia",
      "Obchodné podmienky | Cyclia": "Terms of Service | Cyclia"
    },
    descriptions: {
      "Prehľad iOS aplikácií Cyclia, Levela a Košíq od Lukasa Kubaliaka.": "Overview of iOS apps Cyclia, Levela, and Košíq by Lukas Kubaliak.",
      "Cyclia je jednoduchá a súkromná iOS aplikácia na sledovanie cyklu, menštruácie, ovulácie a pripomienok.": "Cyclia is a simple, private iOS app for tracking your cycle, period, ovulation, and reminders.",
      "Levela je iOS tréningový denník pre zápis tréningov, sledovanie progresu, objemu, 1RM a progresívneho preťažovania.": "Levela is an iOS training journal for logging workouts, tracking progress, volume, 1RM, and progressive overload.",
      "Košíq je iOS aplikácia pre nákupné zoznamy, porovnávanie cien potravín a históriu nákupov. Aplikácia je dočasne nedostupná v App Store.": "Košíq is an iOS app for shopping lists, grocery price comparison, and purchase history. The app is temporarily unavailable in the App Store.",
      "Podpora pre aplikáciu Cyclia. Pomoc s predplatným, súkromím a kontaktom.": "Support for Cyclia. Help with subscriptions, privacy, and contact.",
      "Zásady ochrany súkromia pre aplikáciu Cyclia.": "Privacy policy for Cyclia.",
      "Obchodné podmienky používania aplikácie Cyclia.": "Terms of service for Cyclia."
    }
  };

  const text = {
    "Lukas Kubaliak": "Lukas Kubaliak",
    "Cyclia": "Cyclia",
    "Levela": "Levela",
    "Košíq": "Košíq",
    "App Store": "App Store",
    "FAQ": "FAQ",
    "Privacy": "Privacy",
    "Workflow": "Workflow",
    "Bench press": "Bench press",
    "Upper Strength": "Upper Strength",
    "+7,8 %": "+7.8%",
    "12": "12",
    "1": "1",
    "2": "2",
    "3": "3",

    "Aplikácie": "Apps",
    "Kontakt": "Contact",
    "Domov": "Home",
    "Výber jazyka": "Language selection",
    "Funkcie": "Features",
    "Súkromie": "Privacy",
    "Podpora": "Support",
    "Podmienky": "Terms",
    "Obrazovky": "Screens",
    "Cyklus": "Cycle",
    "Tréning": "Training",
    "Pozastavené": "Paused",
    "Detail aplikácie": "App details",
    "Dočasne nedostupné": "Temporarily unavailable",
    "Jednoduchosť": "Simplicity",
    "Dlhodobosť": "Longevity",
    "iOS developer": "iOS developer",
    "Malé mobilné produkty s jasným účelom, čistým rozhraním a vlastnou detailnou stránkou.": "Small mobile products with a clear purpose, clean interface, and a dedicated detail page.",
    "Prehľadný kalendár pre cyklus, menštruáciu, ovuláciu a pripomienky.": "A clear calendar for cycle, period, ovulation, and reminders.",
    "Zápis tréningov, sledovanie výkonu, objemu a progresívneho preťažovania.": "Workout logging, performance tracking, volume, and progressive overload.",
    "Aplikácia na nákupné zoznamy je dočasne odstránená z App Store.": "The shopping list app is temporarily removed from the App Store.",
    "Každá aplikácia má jasný účel a rozhranie bez zbytočného šumu.": "Every app has a clear purpose and an interface without unnecessary noise.",
    "Citlivé dáta a osobné návyky zostávajú čo najbližšie používateľovi.": "Sensitive data and personal habits stay as close to the user as possible.",
    "Dizajn aj funkcie sú stavané tak, aby dávali zmysel aj po čase.": "Design and features are built to keep making sense over time.",

    "Cycle & period tracker": "Cycle & period tracker",
    "Spoznajte svoj cyklus bez zbytočného hluku.": "Understand your cycle without unnecessary noise.",
    "Cyclia spája kalendár, predpovede, pripomienky a históriu cyklu do pokojnej aplikácie, ktorá rešpektuje súkromie a nezaťažuje vás zložitým rozhraním.": "Cyclia brings a calendar, predictions, reminders, and cycle history into a calm app that respects privacy and does not burden you with a complicated interface.",
    "Stiahnuť v App Store": "Download on the App Store",
    "Pozrieť funkcie": "View features",
    "Týždeň zadarmo, potom 1,99 €/mesiac. Predplatné môžete kedykoľvek zrušiť.": "One week free, then €1.99/month. You can cancel the subscription anytime.",
    "Dnes": "Today",
    "22. deň cyklu": "Cycle day 22",
    "Ďalšia menštruácia": "Next period",
    "Odhad o 6 dní": "Estimated in 6 days",
    "Plodné obdobie": "Fertile window",
    "Prehľad ovulácie a šance na otehotnenie": "Overview of ovulation and chance of pregnancy",
    "História": "History",
    "Upraviteľné záznamy": "Editable records",
    "Pripomienky": "Reminders",
    "Jemné upozornenia": "Gentle notifications",
    "Všetko dôležité pre prehľadný cyklus.": "Everything important for a clear cycle overview.",
    "Žiadne preplnené dashboardy. Cyclia drží najdôležitejšie informácie na očiach a zvyšok necháva v jednoduchých detailoch.": "No overcrowded dashboards. Cyclia keeps the most important information visible and leaves the rest in simple details.",
    "Sledovanie menštruácie": "Period tracking",
    "Zapisujte začiatok a dĺžku menštruácie, upravujte históriu a sledujte rytmus cyklu v čase.": "Log the start and length of your period, edit history, and follow your cycle rhythm over time.",
    "Ovulácia a plodné dni": "Ovulation and fertile days",
    "Predpovede pomáhajú lepšie plánovať dni, ktoré sú pre vás dôležité.": "Predictions help you better plan the days that matter to you.",
    "Jemné pripomienky": "Gentle reminders",
    "Voliteľné upozornenia pred menštruáciou alebo ovuláciou, bez agresívneho tónu a tlaku.": "Optional notifications before your period or ovulation, without an aggressive tone or pressure.",
    "Vlastný cyklus": "Your own cycle",
    "Nastavte typickú dĺžku cyklu a menštruácie, aby boli odhady osobnejšie.": "Set your typical cycle and period length so estimates feel more personal.",
    "Prehľadná história": "Clear history",
    "Minulé záznamy môžete spätne upravovať a lepšie chápať zmeny v čase.": "You can edit past records and better understand changes over time.",
    "Pokojný dizajn": "Calm design",
    "Farby rozlišujú menštruáciu, ovuláciu a plodné obdobie tak, aby boli čitateľné za pár sekúnd.": "Colors distinguish period, ovulation, and fertile windows so they are readable in seconds.",
    "Citlivé dáta patria pod vašu kontrolu.": "Sensitive data belongs under your control.",
    "Cyclia je navrhnutá pre tému, ktorá si vyžaduje diskrétnosť. Základná logika aplikácie funguje sústredene na zariadení a bez zbytočného zberu údajov.": "Cyclia is designed for a topic that requires discretion. The core app logic is focused on the device and avoids unnecessary data collection.",
    "Žiadne preplnené analytické vrstvy na landing page.": "No overloaded analytics layers on the landing page.",
    "Jasná dokumentácia v zásadách ochrany súkromia.": "Clear documentation in the privacy policy.",
    "Predplatné je spravované cez Apple App Store.": "Subscriptions are managed through the Apple App Store.",
    "Podpora je dostupná priamo cez e-mail.": "Support is available directly by email.",
    "Zásady súkromia": "Privacy policy",
    "Najčastejšie otázky.": "Frequently asked questions.",
    "Je Cyclia vhodná na každodenné používanie?": "Is Cyclia suitable for everyday use?",
    "Áno. Aplikácia je postavená tak, aby rýchlo ukázala najdôležitejší kontext bez komplikovaného nastavovania.": "Yes. The app is built to quickly show the most important context without complicated setup.",
    "Je Cyclia zdravotnícka pomôcka?": "Is Cyclia a medical device?",
    "Nie. Slúži na osobné sledovanie a odhady. Pri zdravotných otázkach je vždy potrebné obrátiť sa na odborníka.": "No. It is for personal tracking and estimates. For health questions, always consult a professional.",
    "Ako funguje predplatné?": "How does the subscription work?",
    "Stiahnutie prebieha cez App Store. Po skúšobnom období je cena 1,99 €/mesiac a predplatné môžete zrušiť v nastaveniach Apple účtu.": "Download happens through the App Store. After the trial period, the price is €1.99/month and you can cancel the subscription in your Apple account settings.",
    "Začnite sledovať cyklus jednoduchšie.": "Start tracking your cycle more simply.",
    "Stiahnite Cyclia a majte dôležité dni, pripomienky a históriu v jednom pokojnom kalendári.": "Download Cyclia and keep important days, reminders, and history in one calm calendar.",

    "Tréningový denník pre iPhone": "Training journal for iPhone",
    "Prestaňte hádať, či sa zlepšujete.": "Stop guessing whether you are improving.",
    "Levela pomáha zapisovať tréningy, sledovať silový progres, plánovať objem a robiť ďalší krok podľa dát namiesto pocitu z poslednej série.": "Levela helps you log workouts, track strength progress, plan volume, and choose the next step based on data instead of the feeling from your last set.",
    "Pre hypertrofiu, silový progres, tréningový objem a systematické plánovanie.": "For hypertrophy, strength progress, training volume, and systematic planning.",
    "Dnešný tréning": "Today's workout",
    "Silový progres": "Strength progress",
    "Efektívne série": "Effective sets",
    "4 x 6-8, odporúčané +2,5 kg": "4 x 6-8, recommended +2.5 kg",
    "Objem za týždeň": "Weekly volume",
    "8,4 t pracovnej tonáže": "8.4 t of working tonnage",
    "Tréningový progres, ktorý sa dá čítať.": "Training progress you can read.",
    "Levela je praktická pre ľudí, ktorí chcú vedieť, čo cvičia, prečo to cvičia a či sa ich výkon skutočne posúva.": "Levela is practical for people who want to know what they train, why they train it, and whether their performance is truly moving.",
    "Zápis sérií": "Set logging",
    "Rýchlo zapisujte váhu, opakovania, série a poznámky bez rozbíjania tréningového tempa.": "Quickly log weight, reps, sets, and notes without breaking your training rhythm.",
    "Odhad 1RM": "1RM estimate",
    "Sledujte odhadované maximum a osobné rekordy bez ručných prepočtov.": "Track estimated maxes and personal records without manual calculations.",
    "Progresívne preťažovanie": "Progressive overload",
    "Vidíte, kde má zmysel pridať váhu, opakovania alebo objem.": "See where it makes sense to add weight, reps, or volume.",
    "Objem a efektívne série": "Volume and effective sets",
    "Rozložte stimul medzi svalové partie s lepším prehľadom o práci v čase.": "Distribute stimulus across muscle groups with a clearer view of work over time.",
    "Workout plány": "Workout plans",
    "Pripravte tréning dopredu a v gyme už len zapisujte výkon.": "Prepare your workout in advance and only log performance in the gym.",
    "Coach Mode": "Coach Mode",
    "Vhodné aj pre trénerov, ktorí potrebujú prehľad medzi viacerými klientmi.": "Useful for coaches who need an overview across multiple clients.",
    "Od prvej série po dlhodobý trend.": "From the first set to the long-term trend.",
    "Appka nerieši motivačný šum. Pomáha zapísať výkon, vidieť trend a rozhodnúť, čo má nasledovať.": "The app avoids motivational noise. It helps you log performance, see the trend, and decide what should come next.",
    "Zapisuj tréning": "Log the workout",
    "Vyber plán, doplň váhu a opakovania. Posledné hodnoty ostávajú poruke.": "Choose a plan, add weight and reps. Recent values stay within reach.",
    "Čítaj trend": "Read the trend",
    "Pozeraj výkon, objem a históriu cvikov v čase, nie izolovanú jednu sériu.": "Look at performance, volume, and exercise history over time, not one isolated set.",
    "Uprav plán": "Adjust the plan",
    "Rozhodni, či pridať záťaž, objem, opakovania alebo regeneráciu.": "Decide whether to add load, volume, reps, or recovery.",
    "Pre koho": "Who it is for",
    "Pre tréning, ktorý nechce stáť na mieste.": "For training that does not want to stand still.",
    "Levela dáva najväčší zmysel, keď už nechcete spoliehať na poznámky bez kontextu alebo pamäť po náročnom tréningu.": "Levela makes the most sense when you no longer want to rely on context-free notes or memory after a hard workout.",
    "Pre ľudí, ktorí sledujú hypertrofiu alebo silu.": "For people tracking hypertrophy or strength.",
    "Pre trénerov, ktorí potrebujú rýchly prehľad o klientoch.": "For coaches who need a quick client overview.",
    "Pre každého, kto chce vidieť objem, rekordy a trendy.": "For anyone who wants to see volume, records, and trends.",
    "Pre tréningy, kde rozhoduje dlhodobá konzistencia.": "For training where long-term consistency matters.",
    "Je Levela vhodná pre začiatočníkov?": "Is Levela suitable for beginners?",
    "Áno. Základný tok je jednoduchý zápis série a kontrola trendov. Pokročilejšie metriky môžete využívať postupne.": "Yes. The basic flow is simple set logging and trend checking. You can use advanced metrics gradually.",
    "Aké dáta aplikácia sleduje?": "What data does the app track?",
    "Tréningy, cviky, série, váhy, opakovania, objem, históriu výkonu a odvodené metriky ako odhad 1RM.": "Workouts, exercises, sets, weights, reps, volume, performance history, and derived metrics such as estimated 1RM.",
    "Je Levela zdravotnícka aplikácia?": "Is Levela a medical app?",
    "Nie. Je to tréningový denník a analytický nástroj, nie zdravotnícka pomôcka ani lekárske odporúčanie.": "No. It is a training journal and analytics tool, not a medical device or medical recommendation.",
    "Levela spracúva tréningové údaje, ktoré do aplikácie zadáte: tréningové záznamy, série, váhy, opakovania, plány, históriu výkonu a odvodené metriky. Dáta slúžia na zobrazenie progresu, plánovanie tréningov a výpočty v aplikácii.": "Levela processes the training data you enter into the app: workout logs, sets, weights, reps, plans, performance history, and derived metrics. The data is used to show progress, plan workouts, and calculate app metrics.",
    "Aktuálna verzia je navrhnutá ako lokálny tréningový denník. Levela nepredáva tréningové dáta používateľov. Ak použijete export alebo systémové zdieľanie iOS, sami rozhodujete, kam sa exportovaný súbor odošle.": "The current version is designed as a local training journal. Levela does not sell users' training data. If you use export or iOS system sharing, you decide where the exported file is sent.",
    "Pri otázkach k súkromiu alebo podpore kontaktujte": "For privacy or support questions, contact",
    "Trénujte podľa dát, nie podľa dojmu.": "Train by data, not by impression.",
    "Zapíšte tréning, sledujte trend a posuňte ďalší týždeň s jasnejším rozhodnutím.": "Log your workout, track the trend, and move into the next week with a clearer decision.",

    "Dočasne nedostupné v App Store": "Temporarily unavailable in the App Store",
    "Nákupný zoznam, ktorý počíta aj s cenami.": "A shopping list that also counts prices.",
    "Košíq je aplikácia pre vyhľadávanie potravín, tvorbu nákupných zoznamov a návrat k histórii nákupov. Momentálne je však dočasne odstránená z App Store.": "Košíq is an app for searching groceries, creating shopping lists, and returning to purchase history. It is currently temporarily removed from the App Store.",
    "Opýtať sa na dostupnosť": "Ask about availability",
    "Download CTA je zámerne vypnuté, aby stránka neposielala návštevníkov na neaktuálny odkaz.": "The download CTA is intentionally disabled so the page does not send visitors to an outdated link.",
    "Vyhľadávanie": "Search",
    "Zoznam": "List",
    "Praktický nákupný tok bez prepisovania zoznamov odznova.": "A practical shopping flow without rewriting lists from scratch.",
    "Obsah stránky ostáva pripravený pre návrat aplikácie. Komunikácia dostupnosti je však férová a jednoznačná.": "The page content stays ready for the app's return, while availability is communicated fairly and clearly.",
    "Vyhľadávanie produktov": "Product search",
    "Hľadajte potraviny a pridávajte výsledky do nákupného zoznamu bez ručného vypisovania každej položky.": "Search for groceries and add results to your shopping list without manually typing every item.",
    "Porovnanie cien": "Price comparison",
    "Produktové výsledky pomáhajú lepšie chápať rozdiely medzi obchodmi a cenami.": "Product results help you better understand differences between stores and prices.",
    "Vlastné položky": "Custom items",
    "Ak produkt chýba, vlastná položka udrží plánovanie nákupu v pohybe.": "If a product is missing, a custom item keeps shopping planning moving.",
    "História zoznamov": "List history",
    "Archivované zoznamy pomáhajú opakovať bežné nákupy bez skladania rovnakého plánu od nuly.": "Archived lists help repeat common purchases without rebuilding the same plan from zero.",
    "Rýchly onboarding": "Quick onboarding",
    "Aplikácia je navrhnutá tak, aby vás rýchlo dostala k prvému nákupnému zoznamu.": "The app is designed to get you to your first shopping list quickly.",
    "Aktuálny stav": "Current status",
    "Košíq je dočasne mimo App Store. Tlačidlá na stiahnutie sú vypnuté až do návratu aplikácie.": "Košíq is temporarily outside the App Store. Download buttons are disabled until the app returns.",
    "Ako Košíq vyzerá v praxi.": "How Košíq looks in practice.",
    "Ukážky ostávajú dostupné aj počas pauzy, aby bolo jasné, čo aplikácia rieši.": "Screens remain available during the pause so it is clear what the app solves.",
    "Onboarding": "Onboarding",
    "Zásady ochrany súkromia": "Privacy Policy",
    "Košíq môže spracúvať údaje potrebné na fungovanie aplikácie: obsah nákupných zoznamov, archivované zoznamy, históriu nákupov a technické údaje potrebné na načítanie produktových dát.": "Košíq may process data needed for the app to work: shopping list content, archived lists, purchase history, and technical data required to load product data.",
    "Údaje slúžia na ukladanie zoznamov, zobrazovanie histórie a poskytovanie produktových výsledkov. Košíq nepredáva osobné údaje používateľov tretím stranám.": "The data is used to store lists, show history, and provide product results. Košíq does not sell users' personal data to third parties.",
    "Aplikácia môže používať online služby ako Firebase Authentication a Cloud Firestore na anonymné prihlásenie a doručenie produktových dát. Pri otázkach kontaktujte": "The app may use online services such as Firebase Authentication and Cloud Firestore for anonymous sign-in and product data delivery. For questions, contact",
    "Košíq je pripravený na návrat, no teraz je pozastavený.": "Košíq is ready to return, but is currently paused.",
    "Keď bude aplikácia opäť dostupná v App Store, stránka môže znovu aktivovať download CTA.": "When the app is available in the App Store again, the page can reactivate the download CTA.",
    "App Store vypnutý": "App Store disabled",

    "Ako vám môžeme pomôcť?": "How can we help?",
    "Najrýchlejšia cesta je e-mail. Pri chybe prosím priložte model iPhonu, verziu iOS a krátky popis situácie.": "The fastest way is email. For bugs, please include your iPhone model, iOS version, and a short description of the situation.",
    "Napísať podporu": "Email support",
    "Prečítať súkromie": "Read privacy",
    "Ako Cyclia narába s údajmi?": "How does Cyclia handle data?",
    "Cyclia je navrhnutá s dôrazom na lokálne používanie a bez zbytočného zberu údajov. Podrobnosti sú v zásadách ochrany súkromia.": "Cyclia is designed with an emphasis on local use and without unnecessary data collection. Details are in the privacy policy.",
    "Ako zruším predplatné?": "How do I cancel my subscription?",
    "Predplatné spravuje Apple. Zrušíte ho v nastaveniach iPhonu cez Apple ID a sekciu Predplatné.": "Apple manages the subscription. You can cancel it in iPhone settings through Apple ID and the Subscriptions section.",
    "Je Cyclia zdravotnícka aplikácia?": "Is Cyclia a medical app?",
    "Nie. Cyclia poskytuje osobné záznamy a odhady. Pri zdravotných otázkach kontaktujte odborníka.": "No. Cyclia provides personal records and estimates. For health questions, consult a professional.",

    "Posledná aktualizácia: 1. marec 2026": "Last updated: March 1, 2026",
    "Tieto zásady vysvetľujú, ako mobilná aplikácia Cyclia narába s informáciami používateľov.": "This policy explains how the Cyclia mobile app handles user information.",
    "1. Prevádzkovateľ": "1. Operator",
    "Prevádzkovateľom aplikácie je Lukáš Kubaliak, Slovenská republika. Kontakt:": "The app operator is Lukáš Kubaliak, Slovak Republic. Contact:",
    "2. Základné vyhlásenie": "2. Basic statement",
    "Cyclia je navrhnutá s dôrazom na súkromie. Aplikácia nevyžaduje registráciu, neobsahuje reklamy a nepoužíva analytické ani reklamné sledovanie.": "Cyclia is designed with privacy in mind. The app does not require registration, contains no ads, and does not use analytics or advertising tracking.",
    "3. Lokálne údaje": "3. Local data",
    "Informácie zadané do aplikácie, napríklad údaje o cykle, sú uložené a spracované lokálne na zariadení používateľa. Vývojár k nim nemá prístup.": "Information entered into the app, such as cycle data, is stored and processed locally on the user's device. The developer does not have access to it.",
    "4. Predplatné a platby": "4. Subscriptions and payments",
    "Platby a predplatné spracúva Apple cez App Store. Vývojár nespracúva platobné karty ani fakturačné údaje.": "Payments and subscriptions are processed by Apple through the App Store. The developer does not process payment cards or billing information.",
    "5. Práva a kontakt": "5. Rights and contact",
    "Ak používateľ kontaktuje podporu e-mailom, e-mailová adresa sa použije len na vybavenie požiadavky. Pri otázkach k súkromiu nás kontaktujte na vyššie uvedenom e-maile.": "If a user contacts support by email, the email address is used only to handle the request. For privacy questions, contact us at the email above.",
    "6. Zmeny zásad": "6. Policy changes",
    "Zásady môžu byť aktualizované pri zmene aplikácie alebo právnych požiadaviek. Aktuálna verzia je vždy dostupná na tejto stránke.": "This policy may be updated when the app or legal requirements change. The current version is always available on this page.",

    "Obchodné podmienky": "Terms of Service",
    "Tieto podmienky upravujú používanie mobilnej aplikácie Cyclia. Používaním aplikácie používateľ potvrdzuje, že s nimi súhlasí.": "These terms govern the use of the Cyclia mobile app. By using the app, the user confirms agreement with them.",
    "2. Povaha aplikácie": "2. Nature of the app",
    "Cyclia slúži na sledovanie menštruačného cyklu, informatívne predpovede ovulácie a menštruácie a zobrazovanie pripomienok.": "Cyclia is used to track the menstrual cycle, provide informational ovulation and period predictions, and show reminders.",
    "3. Informatívny charakter": "3. Informational nature",
    "Aplikácia neposkytuje zdravotnú starostlivosť, lekárske rady ani diagnostiku a nie je zdravotníckou pomôckou. Výsledky sú iba orientačné.": "The app does not provide healthcare, medical advice, or diagnosis and is not a medical device. Results are indicative only.",
    "4. Predplatné": "4. Subscription",
    "Aplikácia môže ponúkať mesačné predplatné s bezplatným skúšobným obdobím. Platby sú spracované cez Apple ID a spravujú sa v nastaveniach App Store.": "The app may offer a monthly subscription with a free trial period. Payments are processed through Apple ID and managed in App Store settings.",
    "5. Duševné vlastníctvo": "5. Intellectual property",
    "Aplikácia, jej dizajn, texty, grafika a algoritmy sú duševným vlastníctvom prevádzkovateľa. Kopírovanie alebo spätné inžinierstvo bez súhlasu je zakázané.": "The app, its design, texts, graphics, and algorithms are the operator's intellectual property. Copying or reverse engineering without consent is prohibited.",
    "6. Zodpovednosť": "6. Liability",
    "Používateľ používa aplikáciu na vlastnú zodpovednosť. Prevádzkovateľ nezodpovedá za rozhodnutia vykonané na základe orientačných výstupov aplikácie.": "The user uses the app at their own responsibility. The operator is not responsible for decisions made based on indicative app outputs.",
    "7. Právo a zmeny": "7. Law and changes",
    "Podmienky sa riadia právom Slovenskej republiky. Prevádzkovateľ môže podmienky aktualizovať; aktuálna verzia je dostupná na tejto stránke.": "These terms are governed by the law of the Slovak Republic. The operator may update the terms; the current version is available on this page."
  };

  const attrs = {
    "Domov": "Home",
    "Späť na prehľad aplikácií": "Back to app overview",
    "Hlavná navigácia": "Main navigation",
    "Ukážka aplikácie Cyclia": "Cyclia app preview",
    "Ukážka aplikácie Levela": "Levela app preview",
    "Vyhľadávanie produktov v Košíq": "Product search in Košíq",
    "Nákupný zoznam v Košíq": "Shopping list in Košíq",
    "Onboarding Košíq": "Košíq onboarding",
    "Vyhľadávanie v Košíq": "Search in Košíq",
    "História nákupov v Košíq": "Purchase history in Košíq",
    "Prístup": "Approach"
  };

  function getLang() {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.includes(urlLang)) {
      localStorage.setItem(STORAGE_KEY, urlLang);
      return urlLang;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : "sk";
  }

  function translateValue(source, lang, table) {
    if (lang === "sk") return source;
    return table[source] || source;
  }

  function setTextNode(node, lang) {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (!textSources.has(node)) textSources.set(node, trimmed);

    const source = textSources.get(node);
    if (!text[source]) return;

    const leading = raw.match(/^\s*/)[0];
    const trailing = raw.match(/\s*$/)[0];
    node.nodeValue = leading + translateValue(source, lang, text) + trailing;
  }

  function setMeta(lang) {
    if (!document.documentElement.dataset.titleSource) {
      document.documentElement.dataset.titleSource = document.title;
    }
    const titleSource = document.documentElement.dataset.titleSource;
    document.title = translateValue(titleSource, lang, meta.titles);

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      if (!description.dataset.i18nSource) {
        description.dataset.i18nSource = description.getAttribute("content") || "";
      }
      description.setAttribute("content", translateValue(description.dataset.i18nSource, lang, meta.descriptions));
    }
  }

  function setAttributes(lang) {
    document.querySelectorAll("[aria-label], [alt], [title]").forEach((el) => {
      ["aria-label", "alt", "title"].forEach((attr) => {
        if (!el.hasAttribute(attr)) return;
        const key = `i18n${attr.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())}Source`;
        if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr) || "";
        el.setAttribute(attr, translateValue(el.dataset[key], lang, attrs));
      });
    });
  }

  function setButtons(lang) {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    setMeta(lang);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest(".language-switch")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => setTextNode(node, lang));

    setAttributes(lang);
    setButtons(lang);
  }

  window.setSiteLanguage = function (lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => window.setSiteLanguage(button.dataset.lang));
    });
    applyLanguage(getLang());
  });
})();
