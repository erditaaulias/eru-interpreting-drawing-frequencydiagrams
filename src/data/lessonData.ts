import { Dataset, FrequencyClass, DiscreteCategory, LearningGoal, GlossaryTerm, QuizQuestion, SpotMistakeItem } from '../types';

// Helper functions for dynamic computation
export function calculateTotal(classes?: FrequencyClass[], discrete?: DiscreteCategory[]): number {
  if (classes) {
    return classes.reduce((sum, item) => sum + item.frequency, 0);
  }
  if (discrete) {
    return discrete.reduce((sum, item) => sum + item.frequency, 0);
  }
  return 0;
}

export function formatInterval(cls: FrequencyClass, symbol: string = 'x'): string {
  return `${cls.lower} ≤ ${symbol} < ${cls.upper}`;
}

export function getModalClass(classes: FrequencyClass[]): FrequencyClass {
  return [...classes].sort((a, b) => b.frequency - a.frequency)[0];
}

export function getModalCategory(discrete: DiscreteCategory[]): DiscreteCategory {
  return [...discrete].sort((a, b) => b.frequency - a.frequency)[0];
}

// 1. Core Datasets
export const SCREEN_TIME_DATA: Dataset = {
  id: 'screen-time',
  title: 'Phone Screen Time of 30 Students',
  subtitle: 'Continuous Grouped Data • Daily Smartphone Use',
  variableName: 'Screen time',
  symbol: 't',
  unit: 'hours/day',
  dataType: 'continuous',
  story: 'Maya and her friends tracked their daily screen time over one week. Time is continuous, so it is grouped into equal class intervals.',
  realWorldContext: 'iOS Screen Time & Android Digital Wellbeing use histograms with touching bars because time flows continuously!',
  classes: [
    { lower: 0, upper: 1, frequency: 2, label: '0 ≤ t < 1' },
    { lower: 1, upper: 2, frequency: 5, label: '1 ≤ t < 2' },
    { lower: 2, upper: 3, frequency: 9, label: '2 ≤ t < 3' },
    { lower: 3, upper: 4, frequency: 8, label: '3 ≤ t < 4' },
    { lower: 4, upper: 5, frequency: 4, label: '4 ≤ t < 5' },
    { lower: 5, upper: 6, frequency: 2, label: '5 ≤ t < 6' },
  ],
};

export const SIBLINGS_DATA: Dataset = {
  id: 'siblings-data',
  title: 'Number of Siblings of 40 Students',
  subtitle: 'Discrete Data • Counted in Whole Numbers',
  variableName: 'Number of siblings',
  unit: 'siblings',
  dataType: 'discrete',
  story: 'In Year 8, students were surveyed on how many brothers and sisters they have. Because you can only have 0, 1, 2, 3, or 4 siblings (not 1.7 siblings!), this is discrete data.',
  realWorldContext: 'Demographers and schools use bar charts with gaps between bars to represent discrete household counts.',
  discreteData: [
    { category: '0 siblings', frequency: 6 },
    { category: '1 sibling', frequency: 16 },
    { category: '2 siblings', frequency: 12 },
    { category: '3 siblings', frequency: 4 },
    { category: '4+ siblings', frequency: 2 },
  ],
};

export const BOBA_WAITING_DATA: Dataset = {
  id: 'boba-waiting',
  title: 'Waiting Time at a Bubble Tea Shop',
  subtitle: 'Continuous Grouped Data • Friday Rush Hours',
  variableName: 'Waiting time',
  symbol: 't',
  unit: 'minutes',
  dataType: 'continuous',
  story: 'Nadia investigated customer queue times at the school boba shop during peak Friday afternoon rush to see if service was fast enough.',
  realWorldContext: 'Logistics and café managers use histograms to optimise staff scheduling and reduce wait queues.',
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
  subtitle: 'Stage 8 Book Club Survey (Histogram)',
  variableName: 'Reading time',
  symbol: 't',
  unit: 'hours/week',
  dataType: 'continuous',
  story: 'Students in the Year 8 Book Club recorded how many hours they spent reading novels over the week.',
  realWorldContext: 'Publishing houses and reading advocates use histograms to understand leisure reading distributions.',
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
  subtitle: 'Stage 8 Class Group Activity (Continuous Histogram)',
  variableName: 'Messages sent',
  symbol: 'n',
  unit: 'messages',
  dataType: 'continuous',
  story: '35 students recorded how many messages they sent during a 24-hour study cycle, grouped in equal classes of 10 messages.',
  realWorldContext: 'Social networks analyze messaging volume distributions using continuous interval histograms.',
  classes: [
    { lower: 0, upper: 10, frequency: 4, label: '0 ≤ n < 10' },
    { lower: 10, upper: 20, frequency: 9, label: '10 ≤ n < 20' },
    { lower: 20, upper: 30, frequency: 12, label: '20 ≤ n < 30' },
    { lower: 30, upper: 40, frequency: 7, label: '30 ≤ n < 40' },
    { lower: 40, upper: 50, frequency: 3, label: '40 ≤ n < 50' },
  ],
};

export const PETS_DISCRETE_DATA: DiscreteCategory[] = [
  { category: '0 pets', frequency: 8 },
  { category: '1 pet', frequency: 14 },
  { category: '2 pets', frequency: 10 },
  { category: '3 pets', frequency: 5 },
  { category: '4+ pets', frequency: 3 },
];

// 2. Learning Goals (Checklist aligned to Cambridge Stage 8 Coursebook)
export const LEARNING_GOALS: LearningGoal[] = [
  {
    id: 'goal-1',
    textEn: 'I can explain what a frequency table with grouped continuous data shows.',
    textId: 'Saya dapat menjelaskan apa yang ditunjukkan oleh tabel frekuensi data kelompok kontinu.',
    sectionTarget: 1,
  },
  {
    id: 'goal-2',
    textEn: 'I can draw a histogram with equal class widths for continuous data (bars touch with no gaps).',
    textId: 'Saya dapat menggambar histogram dengan lebar kelas sama untuk data kontinu (balok berimpit tanpa celah).',
    sectionTarget: 4,
  },
  {
    id: 'goal-3',
    textEn: 'I can draw a bar chart for discrete data with equal gaps between bars.',
    textId: 'Saya dapat menggambar diagram batang untuk data diskrit dengan celah yang sama antarbalok.',
    sectionTarget: 4,
  },
  {
    id: 'goal-4',
    textEn: 'I can read information from a histogram and a bar chart (modal class, totals, comparing values).',
    textId: 'Saya dapat membaca informasi dari histogram dan diagram batang (kelas modus, total, selisih frekuensi).',
    sectionTarget: 5,
  },
  {
    id: 'goal-5',
    textEn: 'I can compare histograms and bar charts and choose the right diagram for a situation.',
    textId: 'Saya dapat membandingkan histogram dan diagram batang serta memilih diagram yang tepat sesuai jenis data.',
    sectionTarget: 3,
  },
  {
    id: 'goal-6',
    textEn: 'I can spot common mistakes (gaps in histograms vs touching bars in bar charts).',
    textId: 'Saya dapat menemukan kesalahan umum (celah pada histogram vs balok menempel pada diagram batang).',
    sectionTarget: 6,
  },
];

// 3. Glossary Terms
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Continuous data',
    termId: 'Data kontinu',
    cambridgeDefinitionEn: 'Data that can take any value within a range (e.g. height, time, mass, temperature). Measured on a continuous scale. Illustrated with a Histogram.',
    definitionId: 'Data yang dapat memiliki nilai berapa pun dalam suatu rentang (contoh: tinggi, waktu, massa). Diukur dengan alat ukur dan digambar dengan Histogram.',
    example: 'Screen time = 2.45 hours or height = 153.2 cm.',
    iconName: 'Ruler',
  },
  {
    term: 'Discrete data',
    termId: 'Data diskrit',
    cambridgeDefinitionEn: 'Data that can only take specific, separate values (often counted in whole numbers, like number of siblings, goals, or pets). Illustrated with a Bar Chart.',
    definitionId: 'Data yang nilainya terpisah atau dihitung dalam bilangan bulat (seperti jumlah saudara atau hewan peliharaan). Digambar dengan Diagram Batang.',
    example: 'Number of siblings: 0, 1, 2, 3 (not 1.8 siblings!).',
    iconName: 'Grid',
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
    cambridgeDefinitionEn: 'The number of times a particular value or class interval occurs in a dataset.',
    definitionId: 'Banyaknya data yang masuk ke dalam kategori atau interval kelas tertentu.',
    example: 'A frequency of 9 means 9 students fall into that category.',
    iconName: 'Hash',
  },
  {
    term: 'Histogram',
    termId: 'Histogram',
    cambridgeDefinitionEn: 'A frequency diagram made of touching bars (no gaps) representing continuous grouped data. The horizontal axis is a continuous number line.',
    definitionId: 'Diagram frekuensi balok berimpit (tanpa celah) untuk data kontinu. Sumbu horizontal berupa garis bilangan kontinu.',
    example: 'Bars touch each other because continuous measurements have no breaks between classes.',
    iconName: 'BarChart2',
  },
  {
    term: 'Bar chart',
    termId: 'Diagram batang',
    cambridgeDefinitionEn: 'A diagram made of separate bars with equal gaps between them, used to show discrete numerical data or categorical data.',
    definitionId: 'Diagram yang terdiri dari balok-balok terpisah dengan celah yang sama di antaranya, digunakan untuk data diskrit atau kategorikal.',
    example: 'Bars have spaces between them because categories (or whole number counts) are separate.',
    iconName: 'BarChart2',
  },
  {
    term: 'Modal class',
    termId: 'Kelas modus',
    cambridgeDefinitionEn: 'The class interval with the highest frequency (the tallest bar in a histogram).',
    definitionId: 'Interval kelas yang memiliki frekuensi tertinggi (balok paling tinggi pada histogram).',
    example: 'In the screen time data, the modal class is 2 ≤ t < 3 because it has the tallest bar (frequency 9).',
    iconName: 'Award',
  },
  {
    term: 'Frequency table',
    termId: 'Tabel frekuensi',
    cambridgeDefinitionEn: 'A table that lists all categories or class intervals alongside their corresponding frequencies.',
    definitionId: 'Tabel yang menyajikan kategori atau interval kelas beserta jumlah frekuensinya.',
    example: 'A table showing intervals 0 ≤ t < 1, 1 ≤ t < 2 and the count of students for each.',
    iconName: 'Layers',
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
    explanationEn: 'Students with 3 hours or more: 8 + 4 + 2 = 14 students.',
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
    hintEn: 'Earlier we found that 7 students use their phone for less than 2 hours out of 30 students.',
    hintId: 'Tadi kita temukan 7 siswa menggunakan kurang dari 2 jam dari total 30 siswa.',
    explanationEn: 'There are 7 students out of 30 total students, so the fraction is 7/30.',
    explanationId: 'Terdapat 7 siswa dari total 30 siswa, jadi pecahannya adalah 7/30.',
  },
  {
    id: 'st-q6',
    datasetId: 'screen-time',
    type: 'true-false',
    questionEn: 'True or False: "Because the data is grouped, we cannot know the exact screen time of an individual student."',
    questionId: 'Benar atau Salah: "Karena data berkelompok, kita tidak dapat mengetahui waktu pasti dari siswa tertentu."',
    options: ['True', 'False'],
    correctAnswer: 'True',
    hintEn: 'Does grouped continuous data store individual measurements or only interval counts?',
    hintId: 'Apakah data berkelompok menyimpan nilai individu atau hanya jumlah per interval?',
    explanationEn: 'True! Grouped continuous data tells us how many students are in each interval, but the individual exact numbers are lost.',
    explanationId: 'Benar! Pada data kelompok, kita hanya tahu banyaknya data per interval, bukan nilai individu secara pasti.',
  },
];

export const SIBLINGS_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sib-q1',
    datasetId: 'siblings-data',
    type: 'multiple-choice',
    questionEn: 'What is the modal number of siblings?',
    questionId: 'Berapakah modus jumlah saudara kandung?',
    options: ['0 siblings', '1 sibling', '2 siblings', '3 siblings'],
    correctAnswer: '1 sibling',
    hintEn: 'Look for the tallest bar on the bar chart!',
    hintId: 'Cari balok tertinggi pada diagram batang!',
    explanationEn: 'The tallest bar has a frequency of 16, which is for students with 1 sibling.',
    explanationId: 'Balok tertinggi memiliki frekuensi 16, yaitu untuk siswa dengan 1 saudara.',
  },
  {
    id: 'sib-q2',
    datasetId: 'siblings-data',
    type: 'number-input',
    questionEn: 'How many students have 2 or more siblings?',
    questionId: 'Berapa banyak siswa yang memiliki 2 saudara atau lebih?',
    correctAnswer: 18,
    hintEn: 'Add the frequencies for 2 siblings (12), 3 siblings (4), and 4+ siblings (2).',
    hintId: 'Jumlahkan frekuensi: 12 + 4 + 2.',
    explanationEn: '12 + 4 + 2 = 18 students have 2 or more siblings.',
    explanationId: '12 + 4 + 2 = 18 siswa.',
  },
  {
    id: 'sib-q3',
    datasetId: 'siblings-data',
    type: 'number-input',
    questionEn: 'How many students are only children (have 0 siblings)?',
    questionId: 'Berapa banyak siswa yang merupakan anak tunggal (memiliki 0 saudara)?',
    correctAnswer: 6,
    hintEn: 'Read the height of the first bar (0 siblings).',
    hintId: 'Baca tinggi balok pertama (0 saudara).',
    explanationEn: 'The bar for 0 siblings has a height of 6 students.',
    explanationId: 'Tinggi balok untuk 0 saudara adalah 6 siswa.',
  },
  {
    id: 'sib-q4',
    datasetId: 'siblings-data',
    type: 'multiple-choice',
    questionEn: 'Why are there gaps between the bars in this diagram?',
    questionId: 'Mengapa ada celah di antara balok-balok pada diagram ini?',
    options: [
      'Because number of siblings is discrete data; you cannot have 1.5 siblings, so bars must have gaps.',
      'Because the printer ran out of ink.',
      'Because the teacher made a mistake.',
      'Because bars should always have gaps in every math chart.',
    ],
    correctAnswer: 'Because number of siblings is discrete data; you cannot have 1.5 siblings, so bars must have gaps.',
    hintEn: 'Recall the Cambridge rule: Discrete data uses Bar Charts with gaps between bars.',
    hintId: 'Ingat aturan Cambridge: Data diskrit menggunakan Diagram Batang dengan celah.',
    explanationEn: 'Correct! Discrete data can only take separate whole-number values. In a bar chart, equal spaces (gaps) separate the bars.',
    explanationId: 'Benar! Data diskrit memiliki nilai terpisah, sehingga balok diagram batang harus memiliki celah.',
  },
];

// 5. Section 6 Practice Level 1 Questions (Reading Time Histogram)
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
    type: 'multiple-choice',
    questionEn: 'Why do the bars touch each other in this reading diagram?',
    questionId: 'Mengapa balok-balok saling berimpit pada diagram membaca ini?',
    options: [
      'Because reading time is continuous data, so it is a histogram with touching bars.',
      'Because the students like reading together.',
      'Because it is a regular bar chart.',
      'Because all bars have the same height.',
    ],
    correctAnswer: 'Because reading time is continuous data, so it is a histogram with touching bars.',
    hintEn: 'Continuous time has no breaks between intervals, so histogram bars must touch!',
    hintId: 'Waktu adalah data kontinu, sehingga balok histogram harus berimpit tanpa celah!',
    explanationEn: 'Because time is continuous, classes flow directly into one another (e.g. 0 to 2, then 2 to 4), so the bars touch.',
    explanationId: 'Karena waktu adalah data kontinu, balok histogram harus berimpit tanpa celah.',
  },
];

// 6. Section 6 Practice Level 3 Detective Questions
export const SPOT_MISTAKE_ITEMS: SpotMistakeItem[] = [
  {
    id: 'mistake-1',
    title: 'Chart A: Race completion times (Continuous Data)',
    description: 'A student drew a diagram for continuous sprint times in seconds, but left empty spaces (gaps) between every bar.',
    faultType: 'gap-in-continuous',
    options: [
      {
        id: 'opt-1a',
        textEn: 'Mistake: Bars have gaps between them. For continuous data, a histogram must have touching bars (no gaps).',
        isCorrect: true,
        explanationEn: 'Correct! Continuous data flows uninterrupted. In a histogram, the bars must touch.',
      },
      {
        id: 'opt-1b',
        textEn: 'Mistake: Sprint times should only be measured in hours.',
        isCorrect: false,
        explanationEn: 'Seconds is the standard unit for sprint times.',
      },
      {
        id: 'opt-1c',
        textEn: 'Mistake: Bars should be drawn horizontally.',
        isCorrect: false,
        explanationEn: 'Histograms are typically drawn with vertical bars.',
      },
    ],
  },
  {
    id: 'mistake-2',
    title: 'Chart B: Shoe sizes of Year 8 students (Discrete Data)',
    description: 'A student drew a diagram for shoe sizes (sizes 36, 37, 38, 39), but drew the bars touching each other with no gaps.',
    faultType: 'touching-in-discrete',
    options: [
      {
        id: 'opt-2a',
        textEn: 'Mistake: Bars are touching. Shoe sizes are discrete values, so a bar chart with equal gaps between bars should be drawn.',
        isCorrect: true,
        explanationEn: 'Spot on! Discrete numerical categories are separate values. Bars in a bar chart MUST have spaces between them!',
      },
      {
        id: 'opt-2b',
        textEn: 'Mistake: Shoe sizes should be measured in kilograms.',
        isCorrect: false,
        explanationEn: 'Kilograms is a unit of mass, not shoe size.',
      },
      {
        id: 'opt-2c',
        textEn: 'Mistake: The chart has too many bars.',
        isCorrect: false,
        explanationEn: 'The number of bars is fine; the error is that the discrete bars touch.',
      },
    ],
  },
  {
    id: 'mistake-3',
    title: 'Chart C: Daily water intake (Continuous Data)',
    description: 'The vertical frequency scale marks: 0, 2, 5, 6, 12, 15 with irregular, uneven spacing between gridlines.',
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
        textEn: 'Mistake: The chart bars are too wide.',
        isCorrect: false,
        explanationEn: 'The mathematical flaw is the non-linear, irregular numerical scale on the frequency axis.',
      },
    ],
  },
];
