import { Dataset, FrequencyClass, LearningGoal, GlossaryTerm, QuizQuestion, SpotMistakeItem } from '../types';

// Helper functions for dynamic computation
export function calculateTotal(classes: FrequencyClass[]): number {
  return classes.reduce((sum, item) => sum + item.frequency, 0);
}

export function calculateMidpoint(cls: FrequencyClass): number {
  return (cls.lower + cls.upper) / 2;
}

export function formatInterval(cls: FrequencyClass, symbol: string = 'x'): string {
  return `${cls.lower} ≤ ${symbol} < ${cls.upper}`;
}

export function getModalClass(classes: FrequencyClass[]): FrequencyClass {
  return [...classes].sort((a, b) => b.frequency - a.frequency)[0];
}

export function getMaxFrequency(classes: FrequencyClass[]): number {
  return Math.max(...classes.map(c => c.frequency));
}

// 1. Core Datasets
export const SCREEN_TIME_DATA: Dataset = {
  id: 'screen-time',
  title: 'Phone Screen Time of 30 Students',
  subtitle: 'Stage 8 Class Survey on Daily Smartphone Use',
  variableName: 'Screen time',
  symbol: 't',
  unit: 'hours/day',
  story: 'Maya and her friends tracked their daily screen time over one week to see how much time they spend texting, watching video reels, and studying.',
  realWorldContext: 'Smartphone operating systems (iOS Screen Time & Android Digital Wellbeing) use histograms to show app usage patterns!',
  classes: [
    { lower: 0, upper: 1, frequency: 2, label: '0 ≤ t < 1' },
    { lower: 1, upper: 2, frequency: 5, label: '1 ≤ t < 2' },
    { lower: 2, upper: 3, frequency: 9, label: '2 ≤ t < 3' },
    { lower: 3, upper: 4, frequency: 8, label: '3 ≤ t < 4' },
    { lower: 4, upper: 5, frequency: 4, label: '4 ≤ t < 5' },
    { lower: 5, upper: 6, frequency: 2, label: '5 ≤ t < 6' },
  ],
};

export const HEIGHTS_DATA: Dataset = {
  id: 'heights',
  title: 'Heights of 40 Girls in Year 8',
  subtitle: 'Annual Physical Education Health Check',
  variableName: 'Height',
  symbol: 'h',
  unit: 'cm',
  story: 'During the school annual health check, Nurse Ratna measured the heights of 40 Year 8 girls to check their growth milestones.',
  realWorldContext: 'Paediatricians and the World Health Organization (WHO) use height distribution polygons to monitor healthy adolescent growth.',
  classes: [
    { lower: 140, upper: 145, frequency: 3, label: '140 ≤ h < 145' },
    { lower: 145, upper: 150, frequency: 8, label: '145 ≤ h < 150' },
    { lower: 150, upper: 155, frequency: 14, label: '150 ≤ h < 155' },
    { lower: 155, upper: 160, frequency: 10, label: '155 ≤ h < 160' },
    { lower: 160, upper: 165, frequency: 5, label: '160 ≤ h < 165' },
  ],
};

export const BOBA_WAITING_DATA: Dataset = {
  id: 'boba-waiting',
  title: 'Waiting Time at a Bubble Tea Shop',
  subtitle: 'Friday Afternoon Queue at ChaTime Grand Mall',
  variableName: 'Waiting time',
  symbol: 't',
  unit: 'minutes',
  story: 'Nadia investigated customer queue times at the school boba shop during peak Friday afternoon rush to see if service was fast enough.',
  realWorldContext: 'Logistics and café managers use frequency diagrams to optimise staff scheduling and reduce wait queues.',
  classes: [
    { lower: 0, upper: 2, frequency: 6, label: '0 ≤ t < 2' },
    { lower: 2, upper: 4, frequency: 11, label: '2 ≤ t < 4' },
    { lower: 4, upper: 6, frequency: 9, label: '4 ≤ t < 6' },
    { lower: 6, upper: 8, frequency: 3, label: '6 ≤ t < 8' },
    { lower: 8, upper: 10, frequency: 1, label: '8 ≤ t < 10' },
  ],
};

export const READING_DATA: Dataset = {
  id: 'reading-time',
  title: 'Weekly Reading Time of 25 Students',
  subtitle: 'English Literature Book Club Survey',
  variableName: 'Reading time',
  symbol: 't',
  unit: 'hours/week',
  story: 'Students in the Year 8 Book Club recorded how many hours they spent reading novels and articles over the week.',
  realWorldContext: 'Publishing houses and reading advocates use histograms to understand leisure habits.',
  classes: [
    { lower: 0, upper: 2, frequency: 3, label: '0 ≤ t < 2' },
    { lower: 2, upper: 4, frequency: 7, label: '2 ≤ t < 4' },
    { lower: 4, upper: 6, frequency: 8, label: '4 ≤ t < 6' },
    { lower: 6, upper: 8, frequency: 5, label: '6 ≤ t < 8' },
    { lower: 8, upper: 10, frequency: 2, label: '8 ≤ t < 10' },
  ],
};

export const MESSAGES_DATA: Dataset = {
  id: 'messages-sent',
  title: 'Messages Sent in a Day by 35 Students',
  subtitle: 'WhatsApp & Social Chat Activity Survey',
  variableName: 'Messages sent',
  symbol: 'n',
  unit: 'messages',
  story: 'How chatty is Year 8? 35 students recorded how many messages they sent in a 24-hour period.',
  realWorldContext: 'Social networks analyze messaging volume distributions to dimension their servers and cloud bandwidth.',
  classes: [
    { lower: 0, upper: 10, frequency: 4, label: '0 ≤ n < 10' },
    { lower: 10, upper: 20, frequency: 9, label: '10 ≤ n < 20' },
    { lower: 20, upper: 30, frequency: 12, label: '20 ≤ n < 30' },
    { lower: 30, upper: 40, frequency: 7, label: '30 ≤ n < 40' },
    { lower: 40, upper: 50, frequency: 3, label: '40 ≤ n < 50' },
  ],
};

// Comparison dataset for Level 3
export const COMPARISON_CLASSES_8A: FrequencyClass[] = [
  { lower: 20, upper: 30, frequency: 3, label: '20 ≤ t < 30' },
  { lower: 30, upper: 40, frequency: 12, label: '30 ≤ t < 40' },
  { lower: 40, upper: 50, frequency: 8, label: '40 ≤ t < 50' },
  { lower: 50, upper: 60, frequency: 2, label: '50 ≤ t < 60' },
];

export const COMPARISON_CLASSES_8B: FrequencyClass[] = [
  { lower: 20, upper: 30, frequency: 1, label: '20 ≤ t < 30' },
  { lower: 30, upper: 40, frequency: 4, label: '30 ≤ t < 40' },
  { lower: 40, upper: 50, frequency: 11, label: '40 ≤ t < 50' },
  { lower: 50, upper: 60, frequency: 9, label: '50 ≤ t < 60' },
];

// 2. Learning Goals (Checklist)
export const LEARNING_GOALS: LearningGoal[] = [
  {
    id: 'goal-1',
    textEn: 'I can explain what a frequency table with grouped data (class intervals) shows.',
    textId: 'Saya dapat menjelaskan apa yang ditunjukkan oleh tabel frekuensi data berkelompok (interval kelas).',
    sectionTarget: 1,
  },
  {
    id: 'goal-2',
    textEn: 'I can draw a histogram with equal class widths for continuous data.',
    textId: 'Saya dapat menggambar histogram dengan lebar kelas yang sama untuk data kontinu.',
    sectionTarget: 4,
  },
  {
    id: 'goal-3',
    textEn: 'I can draw a frequency polygon by plotting midpoints.',
    textId: 'Saya dapat menggambar poligon frekuensi dengan memplot titik tengah (midpoint).',
    sectionTarget: 4,
  },
  {
    id: 'goal-4',
    textEn: 'I can read information from a histogram and a frequency polygon (modal class, totals, "how many more than...").',
    textId: 'Saya dapat membaca informasi dari histogram dan poligon frekuensi (kelas modus, total, "berapa banyak yang lebih dari...").',
    sectionTarget: 5,
  },
  {
    id: 'goal-5',
    textEn: 'I can compare the two diagrams and choose the best one for a situation.',
    textId: 'Saya dapat membandingkan kedua diagram dan memilih diagram terbaik sesuai situasi.',
    sectionTarget: 3,
  },
  {
    id: 'goal-6',
    textEn: 'I can spot common mistakes in frequency diagrams.',
    textId: 'Saya dapat menemukan dan memperbaiki kesalahan umum pada diagram frekuensi.',
    sectionTarget: 6,
  },
];

// 3. Glossary Terms
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Continuous data',
    termId: 'Data kontinu',
    cambridgeDefinitionEn: 'Data that can take any numeric value within an interval (e.g. height, time, mass, temperature). Measured on a continuous scale.',
    definitionId: 'Data yang dapat memiliki nilai berapa pun dalam suatu rentang (contoh: tinggi badan, waktu, massa). Diukur dengan alat ukur.',
    example: 'Height = 152.4 cm or time = 2.75 hours.',
    iconName: 'Ruler',
  },
  {
    term: 'Class interval',
    termId: 'Interval kelas',
    cambridgeDefinitionEn: 'A group or range into which continuous or grouped data is organised, such as 0 ≤ t < 1.',
    definitionId: 'Rentang nilai tempat data dikelompokkan, ditulis misalnya 0 ≤ t < 1 (dari 0 sampai kurang dari 1).',
    example: '2 ≤ t < 3 means "t is at least 2 hours, but strictly less than 3 hours".',
    iconName: 'Layers',
  },
  {
    term: 'Frequency',
    termId: 'Frekuensi',
    cambridgeDefinitionEn: 'The number of times a particular data value or class interval occurs in a dataset.',
    definitionId: 'Banyaknya data atau pengamatan yang masuk ke dalam kategori atau interval kelas tertentu.',
    example: 'A frequency of 9 means 9 students fall into that category.',
    iconName: 'Hash',
  },
  {
    term: 'Midpoint',
    termId: 'Titik tengah (Midpoint)',
    cambridgeDefinitionEn: 'The exact middle value of a class interval. Calculated as: (Lower boundary + Upper boundary) ÷ 2.',
    definitionId: 'Nilai tepat di tengah interval kelas. Dihitung: (Batas bawah + Batas atas) ÷ 2.',
    example: 'For 150 ≤ h < 155, the midpoint is (150 + 155) / 2 = 152.5.',
    iconName: 'Crosshair',
  },
  {
    term: 'Histogram',
    termId: 'Histogram',
    cambridgeDefinitionEn: 'A diagram made of touching bars representing grouped continuous data. For equal class widths in Stage 8, the height of each bar represents frequency.',
    definitionId: 'Diagram balok berimpit (tanpa celah) untuk data kontinu. Di Stage 8 dengan lebar kelas sama, tinggi balok menunjukkan frekuensi.',
    example: 'Bars touch each other with no gaps because continuous data has no spaces between intervals.',
    iconName: 'BarChart2',
  },
  {
    term: 'Frequency polygon',
    termId: 'Poligon frekuensi',
    cambridgeDefinitionEn: 'A line graph created by plotting points at (midpoint, frequency) for each class interval and connecting them with straight line segments.',
    definitionId: 'Grafik garis yang dibuat dengan memplot titik pada (titik tengah, frekuensi) lalu menghubungkannya dengan garis lurus.',
    example: 'Points joined with straight lines using a ruler, excellent for comparing two datasets!',
    iconName: 'TrendingUp',
  },
  {
    term: 'Modal class',
    termId: 'Kelas modus',
    cambridgeDefinitionEn: 'The class interval with the highest frequency (the tallest bar in a histogram or highest peak on a polygon).',
    definitionId: 'Interval kelas yang memiliki frekuensi tertinggi (balok paling tinggi atau puncak tertinggi).',
    example: 'In the phone data, the modal class is 2 ≤ t < 3 because its frequency is 9.',
    iconName: 'Award',
  },
  {
    term: 'Discrete data',
    termId: 'Data diskrit',
    cambridgeDefinitionEn: 'Data that can only take specific, separate values (often counted in whole numbers, like number of siblings or pets).',
    definitionId: 'Data yang nilainya terpisah atau dihitung dalam bilangan bulat (seperti jumlah saudara atau hewan peliharaan).',
    example: 'Number of pens in a pencil case: 1, 2, 3 (not 2.37 pens!).',
    iconName: 'Grid',
  },
];

// 4. Section 5 Interpreting Questions
export const SCREEN_TIME_QUESTIONS: QuizQuestion[] = [
  {
    id: 'st-q1',
    datasetId: 'screen-time',
    type: 'multiple-choice',
    questionEn: 'Which class interval is the modal class?',
    questionId: 'Interval kelas manakah yang merupakan kelas modus?',
    options: ['1 ≤ t < 2', '2 ≤ t < 3', '3 ≤ t < 4', '4 ≤ t < 5'],
    correctAnswer: '2 ≤ t < 3',
    hintEn: 'Look for the tallest bar on the histogram!',
    hintId: 'Cari balok yang paling tinggi pada histogram!',
    explanationEn: 'The tallest bar has a frequency of 9, which corresponds to the class interval 2 ≤ t < 3 hours.',
    explanationId: 'Balok tertinggi memiliki frekuensi 9, yang merupakan interval 2 ≤ t < 3 jam.',
  },
  {
    id: 'st-q2',
    datasetId: 'screen-time',
    type: 'number-input',
    questionEn: 'How many students use their phone for at least 4 hours a day?',
    questionId: 'Berapa banyak siswa yang menggunakan ponselnya setidaknya 4 jam sehari?',
    correctAnswer: 6,
    hintEn: '"At least 4 hours" means 4 hours or more: add the classes 4 ≤ t < 5 and 5 ≤ t < 6.',
    hintId: '"Setidaknya 4 jam" berarti 4 jam atau lebih: jumlahkan frekuensi kelas 4 ≤ t < 5 dan 5 ≤ t < 6.',
    explanationEn: 'Add the frequencies for 4 ≤ t < 5 (4 students) and 5 ≤ t < 6 (2 students): 4 + 2 = 6 students.',
    explanationId: 'Jumlahkan frekuensi: 4 + 2 = 6 siswa.',
  },
  {
    id: 'st-q3',
    datasetId: 'screen-time',
    type: 'number-input',
    questionEn: 'How many students use their phone for less than 2 hours?',
    questionId: 'Berapa banyak siswa yang menggunakan ponselnya kurang dari 2 jam?',
    correctAnswer: 7,
    hintEn: 'Check all classes below 2 hours: 0 ≤ t < 1 and 1 ≤ t < 2.',
    hintId: 'Lihat semua kelas di bawah 2 jam: 0 ≤ t < 1 dan 1 ≤ t < 2.',
    explanationEn: 'The classes strictly under 2 hours are 0 ≤ t < 1 (2 students) and 1 ≤ t < 2 (5 students). 2 + 5 = 7 students.',
    explanationId: 'Kelas di bawah 2 jam adalah 0 ≤ t < 1 (2) dan 1 ≤ t < 2 (5). 2 + 5 = 7 siswa.',
  },
  {
    id: 'st-q4',
    datasetId: 'screen-time',
    type: 'number-input',
    questionEn: 'How many students use their phone for 3 hours or more?',
    questionId: 'Berapa banyak siswa yang menggunakan ponselnya selama 3 jam atau lebih?',
    correctAnswer: 14,
    hintEn: 'Sum the bars starting from boundary 3 to the right: (3 ≤ t < 4), (4 ≤ t < 5), (5 ≤ t < 6).',
    hintId: 'Jumlahkan balok mulai dari angka 3 ke kanan: 8 + 4 + 2.',
    explanationEn: 'Students with 3 hours or more: 8 (for 3-4 hrs) + 4 (for 4-5 hrs) + 2 (for 5-6 hrs) = 14 students.',
    explanationId: 'Frekuensi yang dijumlahkan: 8 + 4 + 2 = 14 siswa.',
  },
  {
    id: 'st-q5',
    datasetId: 'screen-time',
    type: 'multiple-choice',
    questionEn: 'What fraction of the 30 students use their phone for less than 2 hours?',
    questionId: 'Berapa pecahan dari 30 siswa yang menggunakan ponselnya kurang dari 2 jam?',
    options: ['7/30', '5/30', '9/30', '2/30'],
    correctAnswer: '7/30',
    hintEn: 'Earlier we found that 7 students use their phone for less than 2 hours. What is the total?',
    hintId: 'Tadi kita temukan 7 siswa menggunakan kurang dari 2 jam. Berapa total siswa?',
    explanationEn: 'There are 7 students out of 30 total students, so the fraction is 7/30.',
    explanationId: 'Terdapat 7 siswa dari total 30 siswa, jadi pecahannya adalah 7/30.',
  },
  {
    id: 'st-q6',
    datasetId: 'screen-time',
    type: 'true-false',
    questionEn: 'True or False: "Exactly 9 students use their phone for exactly 2.5 hours."',
    questionId: 'Benar atau Salah: "Tepat 9 siswa menggunakan ponselnya tepat 2,5 jam."',
    options: ['True', 'False'],
    correctAnswer: 'False',
    hintEn: 'Does grouped data tell us individual exact values?',
    hintId: 'Apakah data berkelompok memberi tahu nilai individu yang pasti?',
    explanationEn: 'False! With grouped data, we only know that 9 students had screen times between 2 and 3 hours. Some could be 2.1 h, others 2.9 h. We do NOT know individual exact values.',
    explanationId: 'Salah! Pada data berkelompok, kita hanya tahu 9 siswa berada di rentang 2 sampai 3 jam, bukan nilai pastinya.',
  },
];

export const HEIGHTS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'ht-q1',
    datasetId: 'heights',
    type: 'number-input',
    questionEn: 'What is the midpoint of the class 150 ≤ h < 155?',
    questionId: 'Berapakah titik tengah (midpoint) dari kelas 150 ≤ h < 155?',
    correctAnswer: 152.5,
    hintEn: 'Formula: (lower boundary + upper boundary) ÷ 2 = (150 + 155) ÷ 2.',
    hintId: 'Rumus: (150 + 155) ÷ 2.',
    explanationEn: '(150 + 155) ÷ 2 = 305 ÷ 2 = 152.5 cm.',
    explanationId: 'Titik tengahnya adalah (150 + 155) / 2 = 152,5 cm.',
  },
  {
    id: 'ht-q2',
    datasetId: 'heights',
    type: 'multiple-choice',
    questionEn: 'Which class is the modal class?',
    questionId: 'Kelas manakah yang merupakan kelas modus?',
    options: ['145 ≤ h < 150', '150 ≤ h < 155', '155 ≤ h < 160', '160 ≤ h < 165'],
    correctAnswer: '150 ≤ h < 155',
    hintEn: 'Look for the highest peak point on the frequency polygon.',
    hintId: 'Cari titik puncak tertinggi pada poligon frekuensi.',
    explanationEn: 'The highest plotted point is at frequency 14, which belongs to the class 150 ≤ h < 155.',
    explanationId: 'Titik puncak tertinggi adalah pada frekuensi 14, yaitu kelas 150 ≤ h < 155.',
  },
  {
    id: 'ht-q3',
    datasetId: 'heights',
    type: 'number-input',
    questionEn: 'How many girls are shorter than 155 cm?',
    questionId: 'Berapa banyak siswi yang tingginya kurang dari 155 cm?',
    correctAnswer: 25,
    hintEn: 'Add the frequencies of the first 3 classes: (140-145) + (145-150) + (150-155).',
    hintId: 'Jumlahkan 3 kelas pertama: 3 + 8 + 14.',
    explanationEn: 'Frequencies for heights under 155 cm: 3 + 8 + 14 = 25 girls.',
    explanationId: 'Jumlah siswi: 3 + 8 + 14 = 25 orang.',
  },
  {
    id: 'ht-q4',
    datasetId: 'heights',
    type: 'number-input',
    questionEn: 'How many girls are 160 cm or taller?',
    questionId: 'Berapa banyak siswi yang tingginya 160 cm atau lebih?',
    correctAnswer: 5,
    hintEn: 'Look at the class with lower boundary 160: 160 ≤ h < 165.',
    hintId: 'Lihat frekuensi untuk kelas 160 ≤ h < 165.',
    explanationEn: 'The class 160 ≤ h < 165 has a frequency of 5 girls.',
    explanationId: 'Frekuensi kelas 160 ≤ h < 165 adalah 5 orang.',
  },
  {
    id: 'ht-q5',
    datasetId: 'heights',
    type: 'number-input',
    questionEn: 'How many more girls are in the 150–155 class than in the 140–145 class?',
    questionId: 'Berapa selisih banyaknya siswi di kelas 150–155 dibandingkan kelas 140–145?',
    correctAnswer: 11,
    hintEn: 'Subtract the frequency of 140–145 from the frequency of 150–155.',
    hintId: 'Kurangkan frekuensi 140–145 dari frekuensi 150–155: 14 - 3.',
    explanationEn: '14 - 3 = 11 more girls in the 150–155 class.',
    explanationId: 'Selisihnya adalah 14 - 3 = 11 siswi.',
  },
  {
    id: 'ht-q6',
    datasetId: 'heights',
    type: 'multiple-choice',
    questionEn: 'Why do we join the points with straight lines, and why is it NOT exact to say "the tallest girl is 165 cm"?',
    questionId: 'Mengapa kita menghubungkan titik dengan garis lurus, dan mengapa tidak tepat mengatakan "siswi tertinggi tepat 165 cm"?',
    options: [
      'Because straight lines guide the eye between grouped intervals; the tallest girl is in 160 ≤ h < 165 but her exact height is unknown.',
      'Because curves are illegal in mathematics; 165 cm is definitely the tallest girl.',
      'Because a ruler is faster; the tallest girl must be 160 cm.',
      'Because we do not have enough ink to draw bars.',
    ],
    correctAnswer: 'Because straight lines guide the eye between grouped intervals; the tallest girl is in 160 ≤ h < 165 but her exact height is unknown.',
    hintEn: 'Think about Cambridge mathematical convention and what grouped data conceals.',
    hintId: 'Pikirkan aturan konvensi matematika Cambridge dan keterbatasan data berkelompok.',
    explanationEn: 'Cambridge convention uses straight line segments (polygons) between plotted midpoints. Since the data is grouped (160 ≤ h < 165), the tallest girl could be 161 cm, 163.2 cm, or 164.8 cm, but not strictly 165 cm!',
    explanationId: 'Garis lurus menghubungkan titik tengah untuk menunjukkan tren. Nilai pasti siswi tertinggi tidak dapat diketahui dari data kelompok.',
  },
];

// 5. Section 6 Practice Level 1 Questions (Reading Time)
export const PRACTICE_L1_QUESTIONS: QuizQuestion[] = [
  {
    id: 'p1-q1',
    datasetId: 'reading-time',
    type: 'number-input',
    questionEn: 'What is the total number of students in this reading survey?',
    questionId: 'Berapakah jumlah total siswa dalam survei membaca ini?',
    correctAnswer: 25,
    hintEn: 'Add all bar heights: 3 + 7 + 8 + 5 + 2.',
    hintId: 'Jumlahkan tinggi semua balok: 3 + 7 + 8 + 5 + 2.',
    explanationEn: 'Total = 3 + 7 + 8 + 5 + 2 = 25 students.',
    explanationId: 'Total = 3 + 7 + 8 + 5 + 2 = 25 siswa.',
  },
  {
    id: 'p1-q2',
    datasetId: 'reading-time',
    type: 'multiple-choice',
    questionEn: 'Which class interval is the modal class?',
    questionId: 'Interval kelas manakah yang merupakan kelas modus?',
    options: ['0 ≤ t < 2', '2 ≤ t < 4', '4 ≤ t < 6', '6 ≤ t < 8'],
    correctAnswer: '4 ≤ t < 6',
    hintEn: 'Look for the class with the highest frequency (height 8).',
    hintId: 'Cari interval dengan frekuensi tertinggi (tinggi 8).',
    explanationEn: 'The highest frequency is 8, which occurs in the class 4 ≤ t < 6.',
    explanationId: 'Frekuensi tertinggi adalah 8, yaitu pada kelas 4 ≤ t < 6.',
  },
  {
    id: 'p1-q3',
    datasetId: 'reading-time',
    type: 'number-input',
    questionEn: 'How many students read for less than 4 hours a week?',
    questionId: 'Berapa banyak siswa yang membaca kurang dari 4 jam seminggu?',
    correctAnswer: 10,
    hintEn: 'Sum the frequencies for 0 ≤ t < 2 and 2 ≤ t < 4.',
    hintId: 'Jumlahkan 3 + 7.',
    explanationEn: '3 + 7 = 10 students read for less than 4 hours.',
    explanationId: '3 + 7 = 10 siswa membaca kurang dari 4 jam.',
  },
  {
    id: 'p1-q4',
    datasetId: 'reading-time',
    type: 'number-input',
    questionEn: 'How many students read for 6 hours or more?',
    questionId: 'Berapa banyak siswa yang membaca selama 6 jam atau lebih?',
    correctAnswer: 7,
    hintEn: 'Add the classes 6 ≤ t < 8 and 8 ≤ t < 10.',
    hintId: 'Jumlahkan 5 + 2.',
    explanationEn: '5 (from 6–8) + 2 (from 8–10) = 7 students.',
    explanationId: '5 + 2 = 7 siswa.',
  },
  {
    id: 'p1-q5',
    datasetId: 'reading-time',
    type: 'number-input',
    questionEn: 'What is the midpoint of the class interval 6 ≤ t < 8?',
    questionId: 'Berapakah titik tengah dari interval kelas 6 ≤ t < 8?',
    correctAnswer: 7,
    hintEn: '(6 + 8) ÷ 2 = ?',
    hintId: '(6 + 8) ÷ 2 = ?',
    explanationEn: '(6 + 8) ÷ 2 = 14 ÷ 2 = 7.',
    explanationId: '(6 + 8) ÷ 2 = 7.',
  },
];

// 6. Section 6 Practice Level 3 Detective & Challenge Questions
export const SPOT_MISTAKE_ITEMS: SpotMistakeItem[] = [
  {
    id: 'mistake-1',
    title: 'Chart A: Run times of runners',
    description: 'A student drew a histogram for continuous marathon run times, but left empty spaces between each bar.',
    faultType: 'gap-in-continuous',
    options: [
      {
        id: 'opt-1a',
        textEn: 'Mistake: Bars have gaps between them. For continuous data, bars in a histogram must touch with no gaps.',
        isCorrect: true,
        explanationEn: 'Correct! Continuous data flows continuously without breaks. In a histogram, the bars must touch.',
      },
      {
        id: 'opt-1b',
        textEn: 'Mistake: The title is missing a date.',
        isCorrect: false,
        explanationEn: 'Not the main mathematical error. The fundamental error is the gaps between bars.',
      },
      {
        id: 'opt-1c',
        textEn: 'Mistake: The bars should be drawn horizontally.',
        isCorrect: false,
        explanationEn: 'Histograms can be drawn vertically as standard in Cambridge stage 8.',
      },
    ],
  },
  {
    id: 'mistake-2',
    title: 'Chart B: Plant heights polygon',
    description: 'A student plotted points for a frequency polygon at the upper boundaries (e.g. at x = 10, 20, 30) instead of the midpoints (x = 5, 15, 25).',
    faultType: 'wrong-polygon-plotting',
    options: [
      {
        id: 'opt-2a',
        textEn: 'Mistake: Points are plotted at the class upper boundary instead of the midpoint of each class interval.',
        isCorrect: true,
        explanationEn: 'Spot on! In a frequency polygon, each point must be plotted at the MIDPOINT of the class interval (not the start or end).',
      },
      {
        id: 'opt-2b',
        textEn: 'Mistake: The lines connecting points are too straight.',
        isCorrect: false,
        explanationEn: 'Frequency polygons must use straight lines drawn with a ruler!',
      },
      {
        id: 'opt-2c',
        textEn: 'Mistake: The frequency axis should start from 10.',
        isCorrect: false,
        explanationEn: 'The frequency axis should normally start from 0.',
      },
    ],
  },
  {
    id: 'mistake-3',
    title: 'Chart C: Daily water intake',
    description: 'The vertical frequency scale marks: 0, 2, 5, 6, 12, 15 with irregular spacing.',
    faultType: 'uneven-scale',
    options: [
      {
        id: 'opt-3a',
        textEn: 'Mistake: The vertical scale is uneven and irregular; equal intervals must represent equal frequencies.',
        isCorrect: true,
        explanationEn: 'Excellent detective work! An axis scale must be evenly spaced with consistent increments (e.g. 0, 2, 4, 6, 8...).',
      },
      {
        id: 'opt-3b',
        textEn: 'Mistake: Water intake cannot be measured in litres.',
        isCorrect: false,
        explanationEn: 'Litres is a valid continuous unit for volume.',
      },
      {
        id: 'opt-3c',
        textEn: 'Mistake: The line colours are too light.',
        isCorrect: false,
        explanationEn: 'The mathematical flaw is the non-linear, uneven numerical scale.',
      },
    ],
  },
];
