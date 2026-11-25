/**
 * Données réelles pour le Portail Master PINEP - ENS Meknès
 * Semestre 1 (Temps Aménagé - Session d'Automne)
 * Les emails des professeurs sont laissés vides (en attente de communication officielle).
 */

const defaultMasterData = {
  info: {
    title: "Master PINEP - ENS Meknès",
    fullTitle: "Master Pédagogie Innovante de l'Enseignement Primaire",
    type: "Temps Aménagé - Mode Hybride (Présentiel & En ligne)",
    university: "Université Moulay Ismaïl - École Normale Supérieure de Meknès",
    academicYear: "2026 - 2027",
    semester: "Semestre 1 (Session d'automne)",
    mainRoom: "Salle C6 (Bâtiment ENS Meknès)"
  },
  announcements: [
    {
      id: "ann-0",
      title: "📚 Nouveaux Cours & Fiche Stratégique de Révision pour les Examens S1",
      date: "2026-11-22",
      badge: "Examens & Cours",
      badgeColor: "emerald",
      content: "Les supports officiels de Sciences 1 (Pr. El Alaoui), Littérature d'enfance (Pr. Bouazza), Python (Pr. Benmoussa) et le Descriptif PInEP sont classés et téléchargeables dans 'Cours & TD'. Consultez le Guide de Préparation d'Examen dans le dossier docs/."
    },
    {
      id: "ann-1",
      title: "📌 Planning des Exposés & Travaux Dirigés (TD)",
      date: "2026-11-14",
      badge: "Pédagogie",
      badgeColor: "emerald",
      content: "La répartition des sujets d'exposés par groupe pour les modules de Didactique et Psychologie de l'enfant est disponible dans l'onglet 'Exposés'."
    },
    {
      id: "ann-2",
      title: "📝 Évaluations & Examens de fin de Semestre 1",
      date: "2026-11-14",
      badge: "Examens",
      badgeColor: "rose",
      content: "Les dates prévisionnelles et les modalités d'évaluation (Épreuves écrites, QCM et Mini-projets de programmation) sont affichées dans l'onglet 'Examens'."
    },
    {
      id: "ann-3",
      title: "👥 Annuaire de la promotion 2026-2027",
      date: "2026-11-14",
      badge: "Promotion",
      badgeColor: "amber",
      content: "Retrouvez la liste des étudiants inscrits pour faciliter la formation des binômes de travail et des groupes d'exposé."
    }
  ],
  schedule: [
    {
      id: "sch-1",
      day: "Vendredi",
      dayIndex: 5,
      time: "18H00 - 21H00",
      module: "Langues étrangères",
      code: "M101",
      professor: "Pr. LAABIDI Abdelfattah",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "Séance du vendredi soir. Amélioration des compétences linguistiques appliquées à l'enseignement.",
      semester: "S1"
    },
    {
      id: "sch-2",
      day: "Samedi",
      dayIndex: 6,
      time: "09H00 - 12H30",
      module: "Sciences 1 : concepts pour l'éveil scientifique",
      code: "M102",
      professor: "Pr. EL ALAOUI Lamiae",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "Démarche d'investigation et transposition didactique en sciences expérimentales.",
      semester: "S1"
    },
    {
      id: "sch-3",
      day: "Samedi",
      dayIndex: 6,
      time: "12H30 - 15H30",
      module: "Littérature d'enfance et de jeunesse",
      code: "M103",
      professor: "Pr. BOUAZZA Mohammed",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "Analyse d'albums jeunesse et scénarisation d'activités de lecture.",
      semester: "S1"
    },
    {
      id: "sch-4",
      day: "Samedi",
      dayIndex: 6,
      time: "15H30 - 18H30",
      module: "Algorithmes et Programmation de base de Python",
      code: "M104",
      professor: "Pr. CHADLI Adil",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "TP sur ordinateurs portables : Variables, structures alternatives et boucles en Python.",
      semester: "S1"
    },
    {
      id: "sch-5",
      day: "Dimanche",
      dayIndex: 7,
      time: "09H00 - 12H30",
      module: "Introduction à la psychologie de l'enfant",
      code: "M105",
      professor: "Pr. SALAH Hamza",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "Théories du développement de Piaget, Wallon et Vygotsky.",
      semester: "S1"
    },
    {
      id: "sch-6",
      day: "Dimanche",
      dayIndex: 7,
      time: "12H30 - 15H30",
      module: "Développement cognitif et mécanismes d'acquisition des langues chez l'enfant",
      code: "M106",
      professor: "Pr. Mouhcine SAIDI AMRANI",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "Bilinguisme précoce et plasticité cérébrale chez l'apprenant du primaire.",
      semester: "S1"
    },
    {
      id: "sch-7",
      day: "Dimanche",
      dayIndex: 7,
      time: "15H30 - 18H30",
      module: "Soft Skills",
      code: "M107",
      professor: "Pr. NABIH Mohammed",
      mode: "in-person",
      location: "Salle C6",
      meetingLink: "",
      notes: "Communication interpersonnelle, posture professionnelle et gestion du stress.",
      semester: "S1"
    }
  ],
  modules: [
    {
      id: "mod-1",
      code: "M101",
      title: "Langues étrangères",
      professor: "Pr. LAABIDI Abdelfattah",
      email: "", // Laissé vide en attente de l'email officiel
      semester: "S1",
      daySlot: "Vendredi (18H00 - 21H00)",
      room: "Salle C6",
      color: "emerald",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Perfectionnement linguistique et méthodologies d'enseignement des langues pour le primaire.",
      resources: [
        {
          id: "res-1-1",
          title: "Cours 1 : Les approches communicatives et actionnelles dans l'apprentissage des langues",
          type: "pdf",
          url: "#",
          size: "2.4 Mo",
          date: "2026-11-06"
        },
        {
          id: "res-1-2",
          title: "TD 1 : Analyse critique de manuels scolaires de français/anglais du primaire",
          type: "assignment",
          url: "#",
          size: "Fiche TD (PDF)",
          date: "2026-11-13"
        }
      ]
    },
    {
      id: "mod-2",
      code: "M102",
      title: "Sciences 1 : concepts pour l'éveil scientifique",
      professor: "Pr. EL ALAOUI Lamiae",
      email: "",
      semester: "S1",
      daySlot: "Samedi (09H00 - 12H30)",
      room: "Salle C6",
      color: "blue",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Didactique des sciences d'éveil, démarche expérimentale et démarche d'investigation.",
      resources: [
        {
          id: "res-2-1",
          title: "Diaporama Séance 2 : Écologie générale, Écosystèmes & Pyramides trophiques",
          type: "pdf",
          url: "cours/02_Sciences1_Eveil_Scientifique_Pr_EL_ALAOUI/Cours_Seance2_Ecologie_Ecosystemes_Pr_EL_ALAOUI.pdf",
          size: "13.1 Mo",
          date: "2026-11-14"
        },
        {
          id: "res-2-2",
          title: "Article de Revue (ScienceDirect) : Carences et excès en micronutriments (Metsu et al., 2023)",
          type: "pdf",
          url: "cours/02_Sciences1_Eveil_Scientifique_Pr_EL_ALAOUI/Article_Revue_Carences_Exces_Micronutriments_2023.pdf",
          size: "1.76 Mo",
          date: "2026-11-14"
        },
        {
          id: "res-2-3",
          title: "Programme officiel des Exposés & Concepts clés d'éveil scientifique (2026-2027)",
          type: "assignment",
          url: "cours/02_Sciences1_Eveil_Scientifique_Pr_EL_ALAOUI/Programme_Officiel_Exposes_Sciences1_2026_2027.xlsx",
          size: "54 Ko",
          date: "2026-11-22"
        }
      ]
    },
    {
      id: "mod-3",
      code: "M103",
      title: "Littérature d'enfance et de jeunesse",
      professor: "Pr. BOUAZZA Mohammed",
      email: "",
      semester: "S1",
      daySlot: "Samedi (12H30 - 15H30)",
      room: "Salle C6",
      color: "amber",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Typologie de la littérature jeunesse, sémiotique du texte illustré et médiation du livre.",
      resources: [
        {
          id: "res-3-1",
          title: "Cours Séance 1 : أدب الطفل - تعريفات ومناقشات (Définitions, statuts et débats)",
          type: "pdf",
          url: "cours/03_Litterature_Enfance_Jeunesse_Pr_BOUAZZA/Cours_Seance1_Definitions_Debats_Pr_BOUAZZA.pdf",
          size: "782 Ko",
          date: "2026-11-02"
        },
        {
          id: "res-3-2",
          title: "Ouvrage de Référence : في أدب الأطفال (Dr. Ali Al-Hadidi - 330 pages)",
          type: "pdf",
          url: "cours/03_Litterature_Enfance_Jeunesse_Pr_BOUAZZA/Livre_Reference_Fi_Adab_Al_Atfal_Dr_Ali_Al_Hadidi.pdf",
          size: "8.7 Mo",
          date: "2026-11-22"
        }
      ]
    },
    {
      id: "mod-4",
      code: "M104",
      title: "Algorithmes et Programmation de base de Python",
      professor: "Pr. CHADLI Adil",
      email: "",
      semester: "S1",
      daySlot: "Samedi (15H30 - 18H30)",
      room: "Salle C6",
      color: "indigo",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Logique algorithmique, syntaxe Python, pensée computationnelle et introduction aux TICE.",
      resources: [
        {
          id: "res-4-1",
          title: "TD 2 : Instructions de base (Booléens, tables de vérité, conditions 'if' et variables)",
          type: "pdf",
          url: "cours/04_Python_Algorithmique_Pr_CHADLI/TD2_Instructions_Base_Variables_Booleens.pdf",
          size: "329 Ko",
          date: "2026-11-14"
        },
        {
          id: "res-4-2",
          title: "TP 1 : Prise en main Python & Exercices corrigés (Variables & Opérateurs)",
          type: "code",
          url: "#",
          size: "Jupyter (.ipynb)",
          date: "2026-11-09"
        }
      ]
    },
    {
      id: "mod-5",
      code: "M105",
      title: "Introduction à la psychologie de l'enfant",
      professor: "Pr. SALAH Hamza",
      email: "",
      semester: "S1",
      daySlot: "Dimanche (09H00 - 12H30)",
      room: "Salle C6",
      color: "rose",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Théories du développement psychomoteur, affectif et intellectuel de l'enfant d'âge primaire.",
      resources: [
        {
          id: "res-5-1",
          title: "Cours 1 : La théorie opératoire de Jean Piaget (Les 4 stades du développement)",
          type: "pdf",
          url: "#",
          size: "2.9 Mo",
          date: "2026-11-03"
        },
        {
          id: "res-5-2",
          title: "TD 1 : Étude de cas cliniques et analyse des comportements d'élèves en difficulté",
          type: "assignment",
          url: "#",
          size: "Fiche TD (PDF)",
          date: "2026-11-10"
        }
      ]
    },
    {
      id: "mod-6",
      code: "M106",
      title: "Développement cognitif et mécanismes d'acquisition des langues chez l'enfant",
      professor: "Pr. Mouhcine SAIDI AMRANI",
      email: "",
      semester: "S1",
      daySlot: "Dimanche (12H30 - 15H30)",
      room: "Salle C6",
      color: "teal",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Neurolinguistique, mécanismes cognitifs de l'acquisition de la langue maternelle et seconde.",
      resources: [
        {
          id: "res-6-1",
          title: "Cours 1 : Les bases psycholinguistiques de l'acquisition du vocabulaire et de la syntaxe",
          type: "pdf",
          url: "#",
          size: "3.5 Mo",
          date: "2026-11-04"
        },
        {
          id: "res-6-2",
          title: "TD 1 : Analyse comparative de la production langagière d'un enfant monolingue vs bilingue",
          type: "pdf",
          url: "#",
          size: "1.8 Mo",
          date: "2026-11-11"
        }
      ]
    },
    {
      id: "mod-7",
      code: "M107",
      title: "Soft Skills",
      professor: "Pr. NABIH Mohammed",
      email: "",
      semester: "S1",
      daySlot: "Dimanche (15H30 - 18H30)",
      room: "Salle C6",
      color: "purple",
      driveFolder: "",
      whatsappGroup: "",
      meetingLink: "",
      description: "Compétences de communication interpersonnelle, gestion des émotions et posture d'enseignant innovant.",
      resources: [
        {
          id: "res-7-1",
          title: "Cours 1 : Techniques d'écoute active, de prise de parole et de communication non-violente",
          type: "pdf",
          url: "#",
          size: "2.1 Mo",
          date: "2026-11-05"
        },
        {
          id: "res-7-2",
          title: "Atelier pratique 1 : Jeux de rôle et simulations de gestion de conflits en classe",
          type: "assignment",
          url: "#",
          size: "Guide d'atelier",
          date: "2026-11-12"
        }
      ]
    }
  ],
  exams: [
    {
      id: "ex-1",
      module: "Algorithmes et Programmation de base de Python",
      code: "M104",
      professor: "Pr. CHADLI Adil",
      date: "Samedi 09 Janvier 2027",
      time: "15H30 - 18H30",
      type: "Épreuve Pratique sur Machine & Mini-Projet",
      room: "Salle C6 / Labo Info",
      weight: "50% Écrit + 50% TP",
      status: "À venir",
      description: "Exercices d'algorithmique et codage de scripts Python (boucles, fonctions, manipulation de listes)."
    },
    {
      id: "ex-2",
      module: "Sciences 1 : concepts pour l'éveil scientifique",
      code: "M102",
      professor: "Pr. EL ALAOUI Lamiae",
      date: "Samedi 16 Janvier 2027",
      time: "09H00 - 11H30",
      type: "Épreuve Écrite sur Table",
      room: "Salle C6",
      weight: "60% Écrit + 40% Fiche Pédagogique",
      status: "À venir",
      description: "Questions de cours sur la démarche d'investigation et conception d'une séquence pédagogique complète."
    },
    {
      id: "ex-3",
      module: "Introduction à la psychologie de l'enfant",
      code: "M105",
      professor: "Pr. SALAH Hamza",
      date: "Dimanche 17 Janvier 2027",
      time: "09H00 - 11H30",
      type: "Dissertation & Étude de Cas",
      room: "Salle C6",
      weight: "70% Examen final + 30% Contrôle Continu",
      status: "À venir",
      description: "Analyse d'une situation d'apprentissage à la lumière des théories piagétiennes et vygotskiennes."
    },
    {
      id: "ex-4",
      module: "Littérature d'enfance et de jeunesse",
      code: "M103",
      professor: "Pr. BOUAZZA Mohammed",
      date: "Samedi 23 Janvier 2027",
      time: "12H30 - 15H00",
      type: "Épreuve Écrite & Dossier de Lecture",
      room: "Salle C6",
      weight: "50% Examen + 50% Dossier",
      status: "À venir",
      description: "Analyse d'un extrait d'album jeunesse et proposition d'un dispositif de médiation littéraire."
    },
    {
      id: "ex-5",
      module: "Développement cognitif et mécanismes d'acquisition des langues",
      code: "M106",
      professor: "Pr. Mouhcine SAIDI AMRANI",
      date: "Dimanche 24 Janvier 2027",
      time: "12H30 - 15H00",
      type: "QCM Approfondi & Questions de Synthèse",
      room: "Salle C6",
      weight: "60% Examen + 40% TD",
      status: "À venir",
      description: "Évaluation sur les mécanismes psycholinguistiques de l'apprentissage de la L1 et L2."
    },
    {
      id: "ex-6",
      module: "Langues étrangères",
      code: "M101",
      professor: "Pr. LAABIDI Abdelfattah",
      date: "Vendredi 29 Janvier 2027",
      time: "18H00 - 20H30",
      type: "Épreuve Écrite & Compréhension",
      room: "Salle C6",
      weight: "70% Examen + 30% Participation",
      status: "À venir",
      description: "Compréhension de textes didactiques et rédaction d'une consigne pédagogique contextualisée."
    },
    {
      id: "ex-7",
      module: "Soft Skills",
      code: "M107",
      professor: "Pr. NABIH Mohammed",
      date: "Dimanche 31 Janvier 2027",
      time: "15H30 - 18H30",
      type: "Soutenance Orale & Portfolio Personnel",
      room: "Salle C6",
      weight: "50% Présentation Orale + 50% Portfolio",
      status: "À venir",
      description: "Présentation individuelle de 10 min sur une compétence clé (ex: Gestion du temps, Leadership, Écoute active)."
    }
  ],
  exposes: [
  {
    "id": "exp-1",
    "title": "La démarche d'investigation appliquée à l'astronomie à l'école primaire",
    "module": "Sciences 1 : concepts pour l'éveil scientifique",
    "professor": "Pr. EL ALAOUI Lamiae",
    "students": [
      "Khadija Alaoui Ismaili",
      "Younes Aghray",
      "Fatima Kebbou"
    ],
    "presentationDate": "Samedi 05 Décembre 2026",
    "status": "À venir",
    "duration": "20 min + 10 min débat",
    "materials": "Slides PPT + Fiche d'investigation"
  },
  {
    "id": "exp-2",
    "title": "Le rôle de l'album sans texte dans le développement de l'imaginaire chez l'enfant",
    "module": "Littérature d'enfance et de jeunesse",
    "professor": "Pr. BOUAZZA Mohammed",
    "students": [
      "Abdelali Ouhri",
      "Mohamed Ourrahho",
      "Hafid Bouakchach"
    ],
    "presentationDate": "Samedi 12 Décembre 2026",
    "status": "À venir",
    "duration": "20 min + 10 min débat",
    "materials": "Corpus d'albums + Grille sémiotique"
  },
  {
    "id": "exp-3",
    "title": "L'intelligence artificielle et la programmation Python au service de l'apprentissage des mathématiques",
    "module": "Algorithmes et Programmation de base de Python",
    "professor": "Pr. CHADLI Adil",
    "students": [
      "Rachid El Amraouy",
      "Imane Tarid",
      "Hassan Mansouri"
    ],
    "presentationDate": "Samedi 19 Décembre 2026",
    "status": "À venir",
    "duration": "25 min avec démonstration",
    "materials": "Notebook Python + Fiches d'activités"
  },
  {
    "id": "exp-4",
    "title": "Impact du bilinguisme précoce sur le développement des fonctions exécutives",
    "module": "Développement cognitif et mécanismes d'acquisition des langues chez l'enfant",
    "professor": "Pr. Mouhcine SAIDI AMRANI",
    "students": [
      "Youssef Salle",
      "Mohamed Ouarad",
      "Assma Joundi"
    ],
    "presentationDate": "Dimanche 20 Décembre 2026",
    "status": "À venir",
    "duration": "20 min",
    "materials": "Revue de littérature (PDF) + Diaporama"
  },
  {
    "id": "exp-5",
    "title": "Gestion du stress, posture professionnelle et écoute active chez l'enseignant innovant",
    "module": "Soft Skills",
    "professor": "Pr. NABIH Mohammed",
    "students": [
      "Fatima Ezzahra Berki",
      "Lhoussaine Bourbi",
      "Hicham Boutserfine"
    ],
    "presentationDate": "Dimanche 27 Décembre 2026",
    "status": "À venir",
    "duration": "20 min + Atelier",
    "materials": "Fiche pratique auto-évaluation"
  }
],
  students: [
  {
    "id": "std-1",
    "fullName": "Khadija Alaoui Ismaili",
    "city": "Meknes",
    "specialty": "Bilingue - Maths"
  },
  {
    "id": "std-2",
    "fullName": "Younes Aghray",
    "city": "Meknes",
    "specialty": "Bilingue"
  },
  {
    "id": "std-3",
    "fullName": "Fatima Kebbou",
    "city": "Meknes",
    "specialty": "Bilingue - bcg / droit privé"
  },
  {
    "id": "std-4",
    "fullName": "Samira Tarmidi",
    "city": "Meknes",
    "specialty": "Bilingue - sociologie"
  },
  {
    "id": "std-5",
    "fullName": "Abdelghani Boubekri",
    "city": "Meknes",
    "specialty": "Primaire arabe - licence physique"
  },
  {
    "id": "std-6",
    "fullName": "Naima Aabi",
    "city": "Meknes",
    "specialty": "Primaire bilingue - biologie"
  },
  {
    "id": "std-7",
    "fullName": "Achraf Med Berrada",
    "city": "Meknes",
    "specialty": "Prof d'arts collège - licence études fr."
  },
  {
    "id": "std-8",
    "fullName": "Abouhali Badr",
    "city": "Meknes",
    "specialty": "Français secondaire qualifiant - licence études fr."
  },
  {
    "id": "std-9",
    "fullName": "Achaoui Mouaad",
    "city": "Meknes",
    "specialty": "Primaire amazighya - licence géog., amazighya"
  },
  {
    "id": "std-10",
    "fullName": "Youssef Elmetrouch",
    "city": "Meknes",
    "specialty": "Bilingue - économie et gestion"
  },
  {
    "id": "std-11",
    "fullName": "Amina Gastoune",
    "city": "Meknes",
    "specialty": "Français"
  },
  {
    "id": "std-12",
    "fullName": "Youssef Salle",
    "city": "Taza",
    "specialty": "Primaire - études françaises"
  },
  {
    "id": "std-13",
    "fullName": "Mohamed Ouarad",
    "city": "Taza",
    "specialty": "Bilingue - licence biologie, français"
  },
  {
    "id": "std-14",
    "fullName": "Rachid El Amraouy",
    "city": "Fès",
    "specialty": "Primaire - licence géologie"
  },
  {
    "id": "std-15",
    "fullName": "Imane Tarid",
    "city": "Fès",
    "specialty": "Primaire bilingue - lp droit et technique d’assurance"
  },
  {
    "id": "std-16",
    "fullName": "Hafid Bouakchach",
    "city": "Midelt",
    "specialty": "Français - licence physique"
  },
  {
    "id": "std-17",
    "fullName": "Mohamed Ourrahho",
    "city": "Midelt",
    "specialty": "Primaire - licence géographie"
  },
  {
    "id": "std-18",
    "fullName": "Abdelali Ouhri",
    "city": "Midelt",
    "specialty": "Primaire"
  },
  {
    "id": "std-19",
    "fullName": "Hassan Mansouri",
    "city": "Boumia",
    "specialty": "Primaire bilingue - licence chimie"
  },
  {
    "id": "std-20",
    "fullName": "Assma Joundi",
    "city": "Boumia",
    "specialty": "Primaire - licence économie"
  },
  {
    "id": "std-21",
    "fullName": "Fatima Ezzahra Berki",
    "city": "Imilchil",
    "specialty": "Bilingue - licence biotech microbienne"
  },
  {
    "id": "std-22",
    "fullName": "Lhoussaine Bourbi",
    "city": "Boulemane",
    "specialty": "Primaire maths bilingue - licence physique appliquée."
  },
  {
    "id": "std-23",
    "fullName": "Hicham Boutserfine",
    "city": "Boulemane",
    "specialty": "Primaire double - études anglaises"
  },
  {
    "id": "std-24",
    "fullName": "Ibtissam El Oujjaini",
    "city": "Taounat",
    "specialty": "Primaire - licence droit privé"
  },
  {
    "id": "std-25",
    "fullName": "Monaim Laassire",
    "city": "Khenifra",
    "specialty": "Primaire bilingue - licence biologie et santé"
  },
  {
    "id": "std-26",
    "fullName": "Zineb Essafi",
    "city": "Khenifra",
    "specialty": "Primaire - licence géographie"
  },
  {
    "id": "std-27",
    "fullName": "Mchich Nassira",
    "city": "El hajeb",
    "specialty": "Primaire - licence physique"
  },
  {
    "id": "std-28",
    "fullName": "Azzeddine Lafissi",
    "city": "Marrakech",
    "specialty": "Primaire bilingue - licence biologie"
  },
  {
    "id": "std-29",
    "fullName": "Zakaria Es-safy",
    "city": "Sidi Slimane",
    "specialty": "Bilingue - licence agroalimentaire"
  },
  {
    "id": "std-30",
    "fullName": "Hassan Fadili",
    "city": "Errachidia tinjdad",
    "specialty": "Primaire bilingue - licence en grh"
  },
  {
    "id": "std-31",
    "fullName": "Oumani El Mustapha",
    "city": "Autre",
    "specialty": "Primaire - licence chimie"
  },
  {
    "id": "std-32",
    "fullName": "Khalid Amaati",
    "city": "Autre",
    "specialty": "Langue espagnole"
  },
  {
    "id": "std-33",
    "fullName": "Abderrahmane El Borjaoui",
    "city": "Autre",
    "specialty": "Langue française"
  }
]
};
