/* ============================================================
   LAJU — Animated school buddy + offline Q&A assistant
   Lajpat Public School, Jamshedpur
   No dependencies. No network. Works fully offline.
   ============================================================ */
(function () {
  "use strict";

  var SCHOOL = {
    name: "Lajpat Public School",
    phone: "+91 90313 88358",
    phoneRaw: "919031388358",
    address: "New Kalimati Rd, near Howrah Bridge, Tuiladungri, Golmuri, Jamshedpur, Jharkhand 831007",
    hours: "Mon–Sat, 8:00 AM – 2:00 PM"
  };

  /* ---------- Character SVG ---------- */
  var LAJU_SVG =
    '<svg class="laju" viewBox="0 0 132 152" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Laju, the Lajpat Public School guide">' +
      '<defs>' +
        '<linearGradient id="ljSkin" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#ffd9b3"/><stop offset="1" stop-color="#f0b482"/></linearGradient>' +
        '<linearGradient id="ljShirt" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe4fb"/></linearGradient>' +
        '<linearGradient id="ljPant" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#2c3585"/><stop offset="1" stop-color="#161d44"/></linearGradient>' +
        '<linearGradient id="ljHair" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#2b2118"/><stop offset="1" stop-color="#120d09"/></linearGradient>' +
        '<linearGradient id="ljBag" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#f03030"/><stop offset="1" stop-color="#a8121f"/></linearGradient>' +
      '</defs>' +

      /* backpack */
      '<g class="laju__bag">' +
        '<rect x="30" y="72" width="18" height="34" rx="8" fill="url(#ljBag)"/>' +
        '<rect x="32" y="84" width="14" height="5" rx="2.5" fill="#ffd94a"/>' +
      '</g>' +

      /* legs */
      '<g class="laju__legL"><rect x="50" y="108" width="13" height="32" rx="6" fill="url(#ljPant)"/>' +
        '<rect x="46" y="134" width="20" height="10" rx="5" fill="#1b1b28"/></g>' +
      '<g class="laju__legR"><rect x="70" y="108" width="13" height="32" rx="6" fill="url(#ljPant)"/>' +
        '<rect x="68" y="134" width="20" height="10" rx="5" fill="#1b1b28"/></g>' +

      /* left arm (behind body) */
      '<g class="laju__armL"><rect x="38" y="70" width="11" height="34" rx="5.5" fill="url(#ljShirt)"/>' +
        '<circle cx="43.5" cy="106" r="6.4" fill="url(#ljSkin)"/></g>' +

      /* torso */
      '<path d="M46 70c0-8 9-13 20-13s20 5 20 13v34c0 5-4 8-9 8H55c-5 0-9-3-9-8z" fill="url(#ljShirt)"/>' +
      '<path d="M46 96h40v8c0 5-4 8-9 8H55c-5 0-9-3-9-8z" fill="url(#ljPant)" opacity=".92"/>' +
      /* collar */
      '<path d="M56 58l10 10 10-10-4-3-6 5-6-5z" fill="#eef1ff"/>' +
      /* tie */
      '<g class="laju__tie"><path d="M66 68l-4.5 5 4.5 20 4.5-20z" fill="#c72638"/>' +
        '<path d="M66 63l-4 4 4 3 4-3z" fill="#8e1622"/></g>' +
      /* crest badge */
      '<circle cx="55" cy="82" r="5" fill="#ffd94a" stroke="#c9a227" stroke-width="1"/>' +
      '<text x="55" y="85.4" font-size="6" font-weight="900" text-anchor="middle" fill="#1e2664" font-family="Arial,sans-serif">L</text>' +

      /* right arm (waving) */
      '<g class="laju__armR"><rect x="83" y="70" width="11" height="34" rx="5.5" fill="url(#ljShirt)"/>' +
        '<circle cx="88.5" cy="106" r="6.4" fill="url(#ljSkin)"/></g>' +

      /* head group */
      '<g class="laju__head">' +
        '<rect x="62" y="48" width="8" height="10" rx="4" fill="#f0b482"/>' + /* neck */
        '<ellipse cx="66" cy="34" rx="23" ry="24" fill="url(#ljSkin)"/>' +    /* face */
        '<ellipse cx="43.5" cy="36" rx="4" ry="6" fill="#f0b482"/>' +          /* ears */
        '<ellipse cx="88.5" cy="36" rx="4" ry="6" fill="#f0b482"/>' +
        /* hair */
        '<path d="M43 30c0-14 10-22 23-22s23 8 23 22c0 0-3-7-9-8-5 6-19 8-28 3-4 2-7 4-9 5z" fill="url(#ljHair)"/>' +
        '<path d="M78 12c5 3 8 8 8 8s3-6-1-9z" fill="#3a2c20"/>' +
        /* brows */
        '<path d="M52 26q5-3.5 10 0" stroke="#2b2118" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
        '<path d="M70 26q5-3.5 10 0" stroke="#2b2118" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
        /* eyes */
        '<g><ellipse cx="57" cy="35" rx="5.6" ry="6.2" fill="#fff"/>' +
          '<g class="laju__pupil"><circle cx="57.6" cy="35.6" r="3.1" fill="#22242e"/>' +
            '<circle cx="58.9" cy="34.2" r="1.15" fill="#fff"/></g>' +
          '<ellipse class="laju__eyelid" cx="57" cy="35" rx="5.8" ry="6.4" fill="url(#ljSkin)"/></g>' +
        '<g><ellipse cx="75" cy="35" rx="5.6" ry="6.2" fill="#fff"/>' +
          '<g class="laju__pupil"><circle cx="75.6" cy="35.6" r="3.1" fill="#22242e"/>' +
            '<circle cx="76.9" cy="34.2" r="1.15" fill="#fff"/></g>' +
          '<ellipse class="laju__eyelid" cx="75" cy="35" rx="5.8" ry="6.4" fill="url(#ljSkin)"/></g>' +
        /* cheeks */
        '<ellipse class="laju__cheek" cx="50" cy="43" rx="4.4" ry="2.8" fill="#f58a8a"/>' +
        '<ellipse class="laju__cheek" cx="82" cy="43" rx="4.4" ry="2.8" fill="#f58a8a"/>' +
        /* nose + smile */
        '<path d="M66 38v4" stroke="#d99a6e" stroke-width="1.8" stroke-linecap="round" fill="none" opacity=".55"/>' +
        '<path class="laju__mouth" d="M59 45q7 7 14 0" stroke="#b8503f" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        /* graduation cap */
        '<g class="laju__cap">' +
          '<path d="M66 4L42 13l24 9 24-9z" fill="#1e2664"/>' +
          '<path d="M52 17v8c0 4 7 6 14 6s14-2 14-6v-8l-14 5z" fill="#2c3585"/>' +
          '<path d="M88 13.6v11" stroke="#ffd94a" stroke-width="1.7" stroke-linecap="round"/>' +
          '<circle cx="88" cy="26" r="3" fill="#ffd94a"/>' +
        '</g>' +
      '</g>' +

      /* sparkles */
      '<path class="laju__sparkle" d="M104 30l1.7 4.6 4.6 1.7-4.6 1.7-1.7 4.6-1.7-4.6-4.6-1.7 4.6-1.7z" fill="#ffd94a"/>' +
      '<path class="laju__sparkle" d="M22 54l1.3 3.4 3.4 1.3-3.4 1.3-1.3 3.4-1.3-3.4-3.4-1.3 3.4-1.3z" fill="#f03030"/>' +
    '</svg>';

  var MINI_SVG =
    '<svg viewBox="0 0 132 152" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="66" cy="72" rx="42" ry="44" fill="#ffd9b3"/>' +
      '<path d="M24 66C24 40 42 26 66 26s42 14 42 40c0 0-6-13-17-15-9 11-34 15-51 6-7 4-13 7-16 9z" fill="#241a12"/>' +
      '<ellipse cx="50" cy="74" rx="9" ry="10" fill="#fff"/><circle cx="51" cy="75" r="5" fill="#22242e"/><circle cx="53" cy="72" r="2" fill="#fff"/>' +
      '<ellipse cx="82" cy="74" rx="9" ry="10" fill="#fff"/><circle cx="83" cy="75" r="5" fill="#22242e"/><circle cx="85" cy="72" r="2" fill="#fff"/>' +
      '<ellipse cx="38" cy="88" rx="7" ry="4.5" fill="#f58a8a" opacity=".6"/>' +
      '<ellipse cx="94" cy="88" rx="7" ry="4.5" fill="#f58a8a" opacity=".6"/>' +
      '<path d="M54 92q12 12 24 0" stroke="#b8503f" stroke-width="4.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M66 2L26 18l40 15 40-15z" fill="#1e2664"/>' +
      '<circle cx="104" cy="34" r="4.4" fill="#ffd94a"/><path d="M104 20v14" stroke="#ffd94a" stroke-width="2.4" stroke-linecap="round"/>' +
    '</svg>';

  /* ============================================================
     KNOWLEDGE BASE
     ============================================================ */
  var KB = [
    {
      id: "greet",
      k: ["hi", "hello", "hey", "namaste", "namaskar", "good morning", "good evening", "good afternoon", "hii", "helo", "yo", "hlo"],
      a: "Hey there! I'm <strong>Laju</strong> 🎓 — your friendly guide at Lajpat Public School, Jamshedpur. Ask me about admissions, fees, timings, subjects, uniform, sports or anything else!"
    },
    {
      id: "admission",
      k: ["admission", "admit", "enroll", "enrol", "apply", "registration", "register", "new student", "join", "seat", "form", "entrance"],
      a: "<strong>Admissions</strong> at Lajpat Public School:<ul>" +
         "<li>Admissions usually open in <strong>January</strong> for the session beginning in <strong>April</strong>.</li>" +
         "<li>For <strong>LKG</strong>, a birth certificate is required.</li>" +
         "<li>For other classes, an <strong>entrance test</strong> is held and the age criteria for that class must be met.</li>" +
         "<li>A <strong>Transfer Certificate</strong> from the previous school is mandatory.</li>" +
         "<li>The Principal reserves the right to accept or refuse any application.</li></ul>" +
         "Call <a href=\"tel:+919031388358\">+91 90313 88358</a> or use the <a href=\"admissions.html\">admission enquiry form</a>."
    },
    {
      id: "documents",
      k: ["document", "documents", "certificate", "birth certificate", "papers", "required", "need to bring", "checklist"],
      a: "<strong>Documents required:</strong><ul><li>Birth Certificate (mandatory for LKG)</li><li>Transfer Certificate from the last school</li><li>Previous class report card / marksheet</li><li>Passport-size photographs of the student</li><li>Aadhaar copy of student & parents</li><li>Address proof</li></ul>"
    },
    {
      id: "fee",
      k: ["fee", "fees", "payment", "pay", "cost", "charges", "tuition", "fine", "late fee", "how much", "price", "money"],
      a: "<strong>Fee rules:</strong><ul>" +
         "<li>Fees are accepted in the school office <strong>8:00 AM – 12:00 noon</strong>, from the <strong>1st to the 20th</strong> of every month.</li>" +
         "<li>If the 20th is a holiday, payment may be made on the next working day.</li>" +
         "<li>From the 21st to the last working day a <strong>late fine of ₹20</strong> applies.</li>" +
         "<li>Previous month's dues from the 1st–15th carry a <strong>₹50 fine</strong>.</li>" +
         "<li>Transfer Certificate is issued for <strong>₹200</strong> after all dues are cleared.</li></ul>" +
         "For the exact current fee structure please call <a href=\"tel:+919031388358\">+91 90313 88358</a>."
    },
    {
      id: "timing",
      k: ["timing", "time", "hours", "open", "close", "schedule", "when", "office hour", "shift", "start", "assembly"],
      a: "<strong>School timings:</strong> " + SCHOOL.hours + ".<ul>" +
         "<li>Office / fee counter: <strong>8:00 AM – 12:00 noon</strong> on working days.</li>" +
         "<li>Principal meeting: <strong>8:00 – 9:00 AM</strong> (Mon, Wed & Sat) with prior appointment.</li>" +
         "<li>Teacher meeting: <strong>7:45 – 8:30 AM</strong> on Thursday, other days by appointment.</li></ul>"
    },
    {
      id: "contact",
      k: ["contact", "phone", "number", "call", "mobile", "reach", "whatsapp", "talk", "email", "enquiry", "enquire"],
      a: "You can reach us at:<ul><li>📞 <a href=\"tel:+919031388358\">" + SCHOOL.phone + "</a></li>" +
         "<li>💬 <a href=\"https://wa.me/" + SCHOOL.phoneRaw + "\" target=\"_blank\" rel=\"noopener\">WhatsApp us</a></li>" +
         "<li>📍 " + SCHOOL.address + "</li></ul>"
    },
    {
      id: "address",
      k: ["address", "location", "where", "map", "direction", "reach school", "situated", "golmuri", "tuiladungri", "kalimati", "howrah bridge", "landmark"],
      a: "We're located at <strong>" + SCHOOL.address + "</strong> — right near <strong>Howrah Bridge</strong> in Golmuri. " +
         "<a href=\"https://www.google.com/maps/search/?api=1&query=Lajpat+Public+School+Golmuri+Jamshedpur\" target=\"_blank\" rel=\"noopener\">Open in Google Maps</a>"
    },
    {
      id: "subjects",
      k: ["subject", "subjects", "course", "courses", "curriculum", "syllabus", "study", "studies", "stream", "academics", "teach", "english medium", "medium of instruction", "language"],
      a: "<strong>Courses of study</strong> include English, Hindi, Mathematics, Science, Social Science, Sanskrit and Computer Studies. " +
         "The <strong>medium of instruction is English</strong>, while Hindi and Sanskrit also have an important role. " +
         "Importance is also given to Games, Crafts, Singing and Moral Education for character formation."
    },
    {
      id: "activities",
      k: ["activity", "activities", "co-curricular", "cocurricular", "club", "dance", "music", "band", "drama", "dramatics", "speaking", "debate", "adventure", "extra"],
      a: "To help students discover and foster their talents we run: <ul><li>Dance</li><li>Music & Singing</li><li>Dramatics</li><li>School Band</li><li>Public Speaking & Debate</li><li>Adventure Club</li><li>Physical exercise & Karate</li></ul>"
    },
    {
      id: "sports",
      k: ["sport", "sports", "game", "games", "karate", "athletics", "playground", "physical", "yoga", "annual sports", "meet"],
      a: "Sports are a big part of life here! Students take part in <strong>athletics, Karate, yoga and indoor & outdoor games</strong>. " +
         "Our <strong>Annual Sports Meet</strong> and <strong>International Yoga Day</strong> events are much-loved traditions. Parents are encouraged to let their ward take a balanced interest in studies, co-curricular activities and sports."
    },
    {
      id: "moral",
      k: ["moral", "value", "values", "sanskar", "dharma", "hawan", "prayer", "mantra", "bhartiya", "sanskriti", "spiritual", "shiksha"],
      a: "Moral education is imparted for <strong>character formation</strong>. Every Saturday students learn Vedic mantras, devotional songs and quotations. " +
         "<strong>Hawan</strong> is performed on Saturdays and <strong>Dharma Shiksha</strong> books guide students in moral values — blending modernity with the eternal values of Bhartiya Sanskriti."
    },
    {
      id: "vision",
      k: ["vision", "mission", "aim", "goal", "philosophy", "about the school", "motto", "purpose", "tell me about"],
      a: "<strong>Our Vision:</strong> to facilitate value-based holistic education that combines the spirit of enquiry with positive attitudes to nature and sensitive beings.<br><br>" +
         "<strong>Our Mission:</strong> to bring about the intellectual, emotional and physical development of each pupil to their full potential."
    },
    {
      id: "values",
      k: ["core value", "child focus", "accountability", "transparency", "discipline value", "integrity", "principles"],
      a: "The values we promote at Lajpat Public School are: <ul><li><strong>Child Focus</strong></li><li><strong>Accountability</strong></li><li><strong>Transparency</strong></li><li><strong>Discipline</strong></li><li><strong>Integrity</strong></li></ul>"
    },
    {
      id: "attendance",
      k: ["attendance", "absent", "leave", "holiday", "medical", "sick", "late", "late coming", "present", "75"],
      a: "<strong>Attendance rules:</strong><ul>" +
         "<li>A minimum of <strong>75% attendance</strong> is compulsory to sit for the final examination.</li>" +
         "<li>Absence beyond two days without prior information may lead to the name being struck off the rolls.</li>" +
         "<li>A <strong>medical certificate</strong> is required for absence over a long period or for contagious illness.</li>" +
         "<li>Late-comers must show the diary signed by the parent to the teacher in charge.</li>" +
         "<li>Leave must be sanctioned in advance by the Principal.</li></ul>"
    },
    {
      id: "promotion",
      k: ["promotion", "promote", "pass", "exam", "examination", "test", "result", "marks", "grade", "weekly test", "term", "unfair means", "cheating", "copying"],
      a: "<strong>Promotion</strong> is decided on overall performance through the year — weekly tests, term exams and the final examination. " +
         "A student is eligible for promotion only with the minimum required marks in <strong>all scholastic subjects</strong> and at least <strong>grade D</strong> in non-scholastic subjects. " +
         "Regularity in doing homework is also considered. <strong>Unfair means</strong> in any test may lead to expulsion, and supplementary examinations are not conducted."
    },
    {
      id: "discipline",
      k: ["discipline", "rule", "rules", "punishment", "behaviour", "behavior", "conduct", "dismissal", "misconduct", "regulation"],
      a: "<strong>Discipline:</strong> Students are expected to address teachers and staff with respect and politeness, and to behave with honour on the way to and from school. " +
         "Corporal punishment is not allowed — teachers guide students through counselling and a system of objective evaluation, and a record of conduct is maintained. " +
         "Habitual disobedience, immorality or serious disrespect towards authority may lead to dismissal."
    },
    {
      id: "uniform",
      k: ["uniform", "dress", "dress code", "shoes", "tie", "belt", "id card", "identity", "wear"],
      a: "Much emphasis is placed on the <strong>correct wearing of the school uniform</strong>, regular attendance, speaking correct English and healthy habits. " +
         "Students must carry their <strong>ID card</strong> daily; if lost or damaged, the cost of a new card will be realised. Books and belongings should be labelled with the student's name."
    },
    {
      id: "withdrawal",
      k: ["withdraw", "withdrawal", "tc", "transfer certificate", "leaving", "leave school", "quit", "shift school", "one month notice", "notice period"],
      a: "<strong>Withdrawal:</strong> A clear <strong>one month's notice in writing</strong>, or one month's fee in lieu, must be given. " +
         "A written application by the parent/guardian is needed for the Transfer Certificate, which is issued for <strong>₹200</strong> after all dues are paid. " +
         "If a withdrawn student wishes to rejoin, an entrance test is held and the registration fee applies."
    },
    {
      id: "parents",
      k: ["parent", "parents", "guardian", "meeting", "ptm", "visit", "progress card", "report card", "diary", "2nd saturday", "second saturday", "visiting day"],
      a: "<strong>For parents:</strong><ul>" +
         "<li>Please visit on the <strong>2nd Saturday</strong> of every month to stay in touch with teachers.</li>" +
         "<li><strong>Progress Cards</strong> are given at the end of each period and must be signed and returned; unsigned cards may bar the student from the next exam.</li>" +
         "<li>Parents may not enter classrooms during school hours without the Principal's permission.</li>" +
         "<li>Principal appointments: 8–9 AM on Monday, Wednesday & Saturday.</li></ul>"
    },
    {
      id: "scholarship",
      k: ["scholarship", "free", "concession", "poor", "weaker section", "financial", "help", "discount", "waiver"],
      a: "Yes — <strong>seats are reserved for talented students from the weaker sections of society</strong> whose parents cannot afford to pay the fees and other dues. " +
         "Please speak to the school office at <a href=\"tel:+919031388358\">" + SCHOOL.phone + "</a> for details."
    },
    {
      id: "classes",
      k: ["classes", "lkg", "ukg", "nursery", "which class", "what class", "standard", "up to", "10th", "12th", "primary", "senior"],
      a: "We welcome children from <strong>LKG</strong> right through the senior classes, with a smooth progression: Pre-Primary → Primary → Middle → Secondary. " +
         "For availability in a specific class, please call <a href=\"tel:+919031388358\">" + SCHOOL.phone + "</a>."
    },
    {
      id: "facility",
      k: ["facility", "facilities", "lab", "laboratory", "library", "computer", "smart class", "infrastructure", "campus", "building", "transport", "bus"],
      a: "Our campus supports learning with <ul><li>Science & Computer laboratories</li><li>A well-stocked library</li><li>Smart, activity-based classrooms</li><li>Playground & sports facilities</li><li>Music, dance and art spaces</li><li>Safe, supervised campus</li></ul>"
    },
    {
      id: "safety",
      k: ["safety", "safe", "security", "cctv", "care", "medical room", "first aid"],
      a: "Student safety comes first — a supervised campus, staff on duty, first-aid support and strict visitor rules. Parents are not permitted to enter classrooms during school hours without permission from the Principal."
    },
    {
      id: "phone_ban",
      k: ["mobile phone", "phone allowed", "objectionable", "banned", "not allowed", "prohibited"],
      a: "No books, magazines or articles of an objectionable nature may be brought onto the school premises. Students are fully responsible for the safety of their books and belongings — each item should carry the student's name."
    },
    {
      id: "thanks",
      k: ["thank", "thanks", "thank you", "thx", "great", "awesome", "nice", "good job", "helpful", "cool"],
      a: "Aww, you're most welcome! 😊 Anything else you'd like to know about Lajpat Public School?"
    },
    {
      id: "bye",
      k: ["bye", "goodbye", "see you", "tata", "ok bye", "later"],
      a: "Goodbye! 👋 Come back anytime — and remember, <strong>" + SCHOOL.phone + "</strong> is always there if you need us."
    },
    {
      id: "who",
      k: ["who are you", "your name", "what are you", "laju", "bot", "robot", "assistant"],
      a: "I'm <strong>Laju</strong> 🎓 — the little school buddy of Lajpat Public School. I know the prospectus by heart, so ask me anything about admissions, fees, rules, subjects or activities!"
    },
    {
      id: "principal",
      k: ["principal", "teacher", "staff", "faculty", "management", "head"],
      a: "Our teachers guide students through counselling and continuous evaluation rather than punishment. To meet a teacher, come on <strong>Thursday 7:45–8:30 AM</strong>; to meet the <strong>Principal</strong>, take a prior appointment for 8–9 AM on Monday, Wednesday or Saturday."
    },
    {
      id: "why",
      k: ["why choose", "should i choose", "best school", "top school", "why lajpat", "why this school", "different", "special", "unique"],
      a: "Because at Lajpat Public School your child gets <strong>value-based holistic education</strong>: an English medium academic core, strong moral grounding rooted in Bhartiya Sanskriti, and a wide sweep of sports, dance, music, dramatics, band and adventure activities — all in a caring, disciplined campus in the heart of Golmuri, Jamshedpur."
    }
  ];

  var FALLBACKS = [
    "Hmm, I don't have that one memorised yet 🤔 — but our office will know! Call <a href=\"tel:+919031388358\">" + SCHOOL.phone + "</a> or ask me about <strong>admissions, fees, timings, subjects, uniform, attendance</strong> or <strong>activities</strong>.",
    "That's a new one for me! 📚 Try asking about <strong>admission</strong>, <strong>fee rules</strong>, <strong>school timings</strong> or <strong>sports</strong> — or ring us on <a href=\"tel:+919031388358\">" + SCHOOL.phone + "</a>.",
    "I'm still learning that! 🎒 Meanwhile, you can ask me about <strong>documents required</strong>, <strong>promotion rules</strong> or <strong>parent meetings</strong>."
  ];

  var IDLE_LINES = [
    "Need help? Just tap me! 👋",
    "Ask me about admissions 🎓",
    "Curious about fees? I know! 💰",
    "Want to know our timings? ⏰",
    "I love questions. Try me! 💬",
    "Namaste! Welcome to LPS 🙏"
  ];

  /* ---------- Matching engine ---------- */
  function normalise(s) {
    return " " + String(s).toLowerCase().replace(/[^a-z0-9\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim() + " ";
  }
  function score(query, entry) {
    var q = normalise(query), total = 0;
    for (var i = 0; i < entry.k.length; i++) {
      var kw = entry.k[i];
      if (q.indexOf(" " + kw + " ") !== -1) { total += kw.split(" ").length * 12 + kw.length; continue; }
      if (kw.length < 5) continue;
      if (q.indexOf(kw) !== -1) { total += kw.split(" ").length * 7 + Math.floor(kw.length / 2); continue; }
      if (kw.length > 4) {
        var stem = kw.slice(0, Math.max(4, kw.length - 2));
        if (q.indexOf(stem) !== -1) total += 3;
      }
    }
    return total;
  }
  function answer(query) {
    if (!query || !query.trim()) return FALLBACKS[0];
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var s = score(query, KB[i]);
      if (s > bestScore) { bestScore = s; best = KB[i]; }
    }
    if (best && bestScore >= 6) return best.a;
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }

  /* ============================================================
     DOM
     ============================================================ */
  var root, charEl, bubble, ping, chat, body, input, sendBtn, micBtn;
  var idleTimer, bubbleTimer, walkTimer, isOpen = false, hasGreeted = false;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function build() {
    root = el("div", "");
    root.id = "laju-root";
    root.innerHTML =
      '<div class="laju-bubble" id="lajuBubble"></div>' +
      '<div class="laju__shadow"></div>' +
      LAJU_SVG +
      '<span class="laju-ping" id="lajuPing">1</span>';
    document.body.appendChild(root);

    chat = el("aside", "laju-chat");
    chat.id = "lajuChat";
    chat.setAttribute("role", "dialog");
    chat.setAttribute("aria-label", "Chat with Laju, the school assistant");
    chat.setAttribute("aria-modal", "false");
    chat.innerHTML =
      '<div class="laju-chat__head">' +
        '<div class="laju-chat__ava">' + MINI_SVG + '</div>' +
        '<div class="laju-chat__id"><strong>Laju</strong><span>Online • School Buddy</span></div>' +
        '<button class="laju-chat__close" id="lajuClose" aria-label="Close chat">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="laju-chat__body" id="lajuBody" aria-live="polite"></div>' +
      '<div class="laju-chips" id="lajuChips"></div>' +
      '<form class="laju-chat__foot" id="lajuForm">' +
        '<button type="button" class="laju-mic" id="lajuMic" aria-label="Speak your question" title="Speak your question">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></svg>' +
        '</button>' +
        '<input id="lajuInput" type="text" autocomplete="off" placeholder="Ask me anything…" aria-label="Type your question">' +
        '<button type="submit" class="laju-send" aria-label="Send message">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>' +
        '</button>' +
      '</form>';
    document.body.appendChild(chat);

    charEl = root.querySelector(".laju");
    bubble = document.getElementById("lajuBubble");
    ping = document.getElementById("lajuPing");
    body = document.getElementById("lajuBody");
    input = document.getElementById("lajuInput");
    micBtn = document.getElementById("lajuMic");

    charEl.setAttribute("tabindex", "0");
    charEl.setAttribute("role", "button");
    charEl.setAttribute("aria-label", "Open chat with Laju, the school assistant");

    var chipWrap = document.getElementById("lajuChips");
    ["Admission process", "Fee rules", "School timings", "Subjects", "Activities", "Documents", "Attendance", "Contact"].forEach(function (t) {
      var c = el("button", "laju-chip", t);
      c.type = "button";
      c.addEventListener("click", function () { ask(t); });
      chipWrap.appendChild(c);
    });

    charEl.addEventListener("click", toggle);
    charEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    document.getElementById("lajuClose").addEventListener("click", close);
    document.getElementById("lajuForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (v) { input.value = ""; ask(v); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) close(); });

    document.querySelectorAll("[data-laju-open]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        var q = b.getAttribute("data-laju-open");
        open();
        if (q && q !== "true") setTimeout(function () { ask(q); }, 500);
      });
    });

    setupMic();
  }

  /* ---------- animation helpers ---------- */
  function pose(name, ms) {
    charEl.classList.add(name);
    setTimeout(function () { charEl.classList.remove(name); }, ms);
  }
  function say(text, ms) {
    clearTimeout(bubbleTimer);
    bubble.innerHTML = text;
    bubble.classList.add("show");
    pose("talk", Math.min(ms || 3200, 2600));
    bubbleTimer = setTimeout(function () { bubble.classList.remove("show"); }, ms || 3600);
  }

  /* ---------- walking ---------- */
  function walkAbout() {
    if (isOpen || document.hidden) return;
    var maxX = Math.max(0, window.innerWidth - 190);
    var target = Math.round(Math.random() * Math.min(maxX, window.innerWidth * 0.55));
    var current = parseFloat(root.dataset.x || "0");
    if (Math.abs(target - current) < 90) return;

    root.classList.toggle("face-left", target < current);
    root.classList.toggle("near-right", target > window.innerWidth * 0.55);
    charEl.classList.add("walk");

    var dist = Math.abs(target - current);
    var dur = Math.min(3.4, Math.max(1.1, dist / 130));
    root.style.transition = "transform " + dur + "s linear";
    root.style.transform = "translateX(" + target + "px)";
    root.dataset.x = target;

    clearTimeout(walkTimer);
    walkTimer = setTimeout(function () {
      charEl.classList.remove("walk");
      root.classList.remove("face-left");
      root.style.transition = "transform .9s cubic-bezier(0.22,1,0.36,1)";
    }, dur * 1000);
  }

  function idleLoop() {
    clearInterval(idleTimer);
    idleTimer = setInterval(function () {
      if (isOpen || document.hidden) return;
      var r = Math.random();
      if (r < 0.34) {
        pose("wave", 3200);
        say(IDLE_LINES[Math.floor(Math.random() * IDLE_LINES.length)], 3800);
      } else if (r < 0.72) {
        walkAbout();
      } else {
        pose("happy", 2200);
      }
    }, 9000);
  }

  /* ---------- chat ---------- */
  function push(html, mine) {
    var m = el("div", "msg" + (mine ? " msg--me" : ""));
    m.innerHTML = '<div class="msg__ava">' + (mine ? "You" : MINI_SVG) + '</div><div class="msg__txt">' + html + "</div>";
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }
  function typing() {
    var m = el("div", "msg");
    m.innerHTML = '<div class="msg__ava">' + MINI_SVG + '</div><div class="msg__txt typing"><i></i><i></i><i></i></div>';
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }
  function ask(q) {
    open();
    push(q.replace(/[<>]/g, ""), true);
    var t = typing();
    charEl.classList.add("think");
    var reply = answer(q);
    var wait = Math.min(1500, 420 + reply.length * 3);
    setTimeout(function () {
      t.remove();
      charEl.classList.remove("think");
      push(reply, false);
      pose("talk", 1600);
      pose("happy", 2000);
    }, wait);
  }
  function greet() {
    if (hasGreeted) return;
    hasGreeted = true;
    var t = typing();
    setTimeout(function () {
      t.remove();
      push("Namaste! 🙏 I'm <strong>Laju</strong>, your buddy at <strong>Lajpat Public School</strong>, Jamshedpur. Ask me anything — or tap a topic below to begin!", false);
      pose("wave", 2600);
    }, 700);
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    chat.classList.add("open");
    root.classList.add("is-hidden");
    ping.classList.add("hide");
    bubble.classList.remove("show");
    clearInterval(idleTimer);
    greet();
    setTimeout(function () { if (window.innerWidth > 720) input.focus(); }, 480);
  }
  function close() {
    isOpen = false;
    chat.classList.remove("open");
    root.classList.remove("is-hidden");
    idleLoop();
    setTimeout(function () { pose("wave", 1800); }, 400);
  }
  function toggle() { isOpen ? close() : open(); }

  /* ---------- voice input (progressive enhancement) ---------- */
  function setupMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { micBtn.style.display = "none"; return; }
    var rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    var listening = false;
    micBtn.addEventListener("click", function () {
      if (listening) { rec.stop(); return; }
      try { rec.start(); } catch (e) { return; }
    });
    rec.onstart = function () { listening = true; micBtn.classList.add("rec"); input.placeholder = "Listening…"; };
    rec.onend = function () { listening = false; micBtn.classList.remove("rec"); input.placeholder = "Ask me anything…"; };
    rec.onerror = function () { listening = false; micBtn.classList.remove("rec"); input.placeholder = "Ask me anything…"; };
    rec.onresult = function (e) {
      var txt = e.results[0][0].transcript;
      if (txt) ask(txt);
    };
  }

  /* ---------- boot ---------- */
  function init() {
    if (document.getElementById("laju-root")) return;
    build();
    root.dataset.x = "0";

    setTimeout(function () {
      pose("wave", 3400);
      say("Hi! I'm Laju 👋 Ask me anything!", 5200);
    }, 2600);

    idleLoop();

    window.addEventListener("resize", function () {
      var maxX = Math.max(0, window.innerWidth - 190);
      var x = parseFloat(root.dataset.x || "0");
      if (x > maxX) { root.dataset.x = maxX; root.style.transform = "translateX(" + maxX + "px)"; }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { clearInterval(idleTimer); } else if (!isOpen) { idleLoop(); }
    });

    window.Laju = { open: open, close: close, ask: ask, say: say };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
