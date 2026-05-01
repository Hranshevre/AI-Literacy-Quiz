const questions = [
  {
    question: "What does AI stand for?",
    options: ["Automated Interface", "Artificial Intelligence", "Advanced Integration", "Automated Inference"],
    answer: 1,
    topic: "AI Basics"
  },
  {
    question: "Which of these is an example of a Large Language Model (LLM)?",
    options: ["Photoshop", "GPT-4", "Excel", "Chrome"],
    answer: 1,
    topic: "Large Language Models"
  },
  {
    question: "What is machine learning?",
    options: [
      "Programming a robot to walk",
      "Teaching computers to learn from data without being explicitly programmed",
      "Writing software in machine code",
      "Using a computer to do math"
    ],
    answer: 1,
    topic: "Machine Learning"
  },
  {
    question: "What is a 'hallucination' in the context of AI chatbots?",
    options: [
      "When an AI generates creative poetry",
      "When an AI confidently produces false or made-up information",
      "A visual art style used by AI image generators",
      "When an AI refuses to answer a question"
    ],
    answer: 1,
    topic: "AI Limitations & Safety"
  },
  {
    question: "What is 'prompt engineering'?",
    options: [
      "Building physical AI hardware",
      "Designing chatbot user interfaces",
      "Crafting inputs to AI systems to get better outputs",
      "Writing code for self-driving cars"
    ],
    answer: 2,
    topic: "Prompt Engineering"
  },
  {
    question: "Which of these tasks is AI currently WEAKEST at?",
    options: [
      "Pattern recognition in images",
      "Translating languages",
      "Genuine long-term common sense reasoning",
      "Generating text summaries"
    ],
    answer: 2,
    topic: "AI Capabilities & Limitations"
  },
  {
    question: "What is 'training data' in machine learning?",
    options: [
      "A gym program for AI researchers",
      "The dataset used to teach a model to recognise patterns",
      "Instructions written by engineers",
      "The output of a neural network"
    ],
    answer: 1,
    topic: "Machine Learning"
  },
  {
    question: "What does 'generative AI' refer to?",
    options: [
      "AI that generates profit for companies",
      "AI that creates new content such as text, images, or music",
      "AI that generates code only",
      "AI used in power generation"
    ],
    answer: 1,
    topic: "Generative AI"
  },
  {
    question: "What is a key ethical concern around AI-generated content?",
    options: [
      "It uses too much electricity",
      "It always produces perfect, unbiased results",
      "It can spread misinformation and be used for deepfakes",
      "It is too expensive for businesses"
    ],
    answer: 2,
    topic: "AI Ethics & Responsible Use"
  },
  {
    question: "What is 'bias' in an AI model?",
    options: [
      "When the model runs too slowly",
      "A preference in the model's outputs caused by imbalanced or skewed training data",
      "When an AI disagrees with the user",
      "A programming error in the model's code"
    ],
    answer: 1,
    topic: "AI Ethics & Responsible Use"
  }
];

let currentIndex = 0;
let score = 0;
let wrongTopics = [];
let answered = false;

const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const nextBtn = document.getElementById('next-btn');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const scoreDisplay = document.getElementById('score-display');
const feedbackBox = document.getElementById('feedback-box');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  const q = questions[currentIndex];
  questionText.textContent = q.question;
  questionCounter.textContent = 'Question ' + (currentIndex + 1) + ' of ' + questions.length;
  progressBar.style.width = ((currentIndex / questions.length) * 100) + '%';

  optionsList.innerHTML = '';
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.addEventListener('click', () => selectAnswer(i, li));
    optionsList.appendChild(li);
  });
}

function selectAnswer(index, el) {
  if (answered) return;
  answered = true;
  nextBtn.disabled = false;

  const q = questions[currentIndex];
  const items = optionsList.querySelectorAll('li');
  items.forEach(item => item.classList.add('disabled'));

  if (index === q.answer) {
    el.classList.add('correct');
    score++;
  } else {
    el.classList.add('wrong');
    items[q.answer].classList.add('correct');
    wrongTopics.push(q.topic);
  }
}

function showResults() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');

  scoreDisplay.textContent = score + ' / ' + questions.length;

  let level, badgeClass, advice;

  if (score <= 3) {
    level = 'Beginner';
    badgeClass = 'badge-beginner';
    advice = [
      'Start with what AI actually is — explore "AI for Everyone" by Andrew Ng (free on Coursera).',
      'Learn the difference between AI, machine learning, and deep learning.',
      'Read beginner-friendly articles on how ChatGPT and image generators work.',
      'Practice using an AI tool like ChatGPT daily to build intuition.'
    ];
  } else if (score <= 5) {
    level = 'Intermediate';
    badgeClass = 'badge-intermediate';
    advice = [
      'Deepen your understanding of how LLMs (like GPT) are trained and how they generate text.',
      'Study prompt engineering techniques — try different phrasing and observe the output.',
      'Learn about AI hallucinations and how to fact-check AI-generated content.',
      'Explore AI ethics resources such as the Montreal AI Ethics Institute.'
    ];
  } else if (score <= 8) {
    level = 'Advanced';
    badgeClass = 'badge-advanced';
    advice = [
      'Explore how fine-tuning and RLHF (Reinforcement Learning from Human Feedback) shape model behaviour.',
      'Read AI safety research from organisations like Anthropic or DeepMind.',
      'Study bias in AI — look into fairness-aware machine learning techniques.',
      'Experiment with the OpenAI or Hugging Face APIs to build small AI-powered tools.'
    ];
  } else {
    level = 'AI Expert';
    badgeClass = 'badge-expert';
    advice = [
      'Excellent work! You have a strong grasp of core AI concepts.',
      'Stay current by following AI research papers on arXiv (cs.AI, cs.CL sections).',
      'Contribute to open-source AI projects or write about AI to share your knowledge.',
      'Explore emerging areas: multimodal AI, AI agents, and AI governance.'
    ];
  }

  const uniqueWrong = [...new Set(wrongTopics)];

  let html = '<span class="level-badge ' + badgeClass + '">' + level + '</span>';

  if (uniqueWrong.length > 0) {
    html += '<h3>📚 Topics to Review</h3><ul>';
    uniqueWrong.forEach(t => { html += '<li>' + t + '</li>'; });
    html += '</ul><br>';
  }

  html += '<h3>💡 What to Do Next</h3><ul>';
  advice.forEach(a => { html += '<li>' + a + '</li>'; });
  html += '</ul>';

  feedbackBox.innerHTML = html;
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
    if (currentIndex === questions.length - 1) {
      nextBtn.textContent = 'See Results 🎯';
    }
  } else {
    showResults();
  }
});

restartBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  wrongTopics = [];
  nextBtn.textContent = 'Next →';
  resultSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  progressBar.style.width = '0%';
  loadQuestion();
});

loadQuestion();
