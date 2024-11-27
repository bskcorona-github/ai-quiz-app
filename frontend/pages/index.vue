<template>
    <div class="quiz-app">
      <h1>AI学習サポートクイズ</h1>
      <form @submit.prevent="fetchQuiz">
        <input
          type="text"
          v-model="theme"
          placeholder="テーマを入力してください"
        />
        <button type="submit">クイズを生成</button>
      </form>
  
      <div v-if="quiz">
        <h2>生成されたクイズ</h2>
        <div class="quiz-container">
          <p><strong>問題:</strong> {{ quiz.question }}</p>
          <div class="choices">
            <button
              v-for="(choice, index) in quiz.choices"
              :key="index"
              :class="{ selected: selectedAnswer === index + 1, correct: isCorrect(index + 1), incorrect: isIncorrect(index + 1) }"
              @click="checkAnswer(index + 1)"
            >
              {{ choice }}
            </button>
          </div>
          <p v-if="feedback" class="feedback">{{ feedback }}</p>
          <button v-if="feedback && isCorrectAnswer" class="next-btn" @click="fetchNextQuiz">次へ</button>
        </div>
      </div>
    </div>
  </template>
  
  
  

  <script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const theme = ref('');
    const quiz = ref<{ question: string; choices: string[]; correctAnswer: number } | null>(null);
    const feedback = ref('');
    const selectedAnswer = ref<number | null>(null);
    const isCorrectAnswer = ref(false);

    const fetchQuiz = async () => {
      if (!theme.value.trim()) {
        feedback.value = 'テーマを入力してください';
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ theme: theme.value }),
        });

        const data = await response.json();

        // パースしてクイズデータを設定
        const parsedQuiz = parseQuiz(data.quiz);
        quiz.value = parsedQuiz;
        feedback.value = ''; // フィードバックをリセット
        selectedAnswer.value = null; // 選択リセット
        isCorrectAnswer.value = false; // 正誤リセット
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
        feedback.value = 'クイズの生成に失敗しました';
      }
    };

    const fetchNextQuiz = () => {
      fetchQuiz(); // 次のクイズを取得
    };

    const parseQuiz = (quizText: string) => {
      const lines = quizText.split('\n').map(line => line.trim());
      const question = lines.find(line => line.startsWith('問題:'))?.replace('問題:', '').trim() || '';
      const choices = lines
        .filter(line => line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.'))
        .map(line => line.replace(/^\d\.\s*/, '').trim());
      const correctAnswer = parseInt(
        lines.find(line => line.startsWith('正解:'))?.replace('正解:', '').trim() || '0',
        10
      );

      return { question, choices, correctAnswer };
    };

    const checkAnswer = (selected: number) => {
      if (!quiz.value) return;

      selectedAnswer.value = selected; // 選択された回答を保存

      if (selected === quiz.value.correctAnswer) {
        isCorrectAnswer.value = true;
        feedback.value = '正解！';
      } else {
        isCorrectAnswer.value = false;
        feedback.value = '残念・・・外れ。もう一度選んでください。';
      }
    };

    const isCorrect = (choice: number) => {
      return isCorrectAnswer.value && selectedAnswer.value === choice;
    };

    const isIncorrect = (choice: number) => {
      return !isCorrectAnswer.value && selectedAnswer.value === choice;
    };

    return { theme, quiz, fetchQuiz, fetchNextQuiz, feedback, selectedAnswer, isCorrectAnswer, checkAnswer, isCorrect, isIncorrect };
  },
});
</script>

  
  
<style scoped>
.quiz-app {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}

.quiz-container {
  margin-top: 20px;
}

.choices button {
  margin: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.choices button.selected {
  background-color: lightblue;
  color: white;
}

.choices button.correct {
  background-color: lightgreen;
  color: black;
}

.choices button.incorrect {
  background-color: lightcoral;
  color: black;
}

.feedback {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
}

.next-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.next-btn:hover {
  background-color: #0056b3;
}
</style>
