import { useState, useEffect } from "react";

const bulkTradeQuiz = [
  {
    question: "What does 'bulk trade' mean in the stock market?",
    options: [
      "A trade involving large quantities of shares in a single transaction",
      "A trade involving small investors pooling funds",
      "A trade executed after market hours",
      "A type of options trading strategy",
    ],
    answer: "A trade involving large quantities of shares in a single transaction",
  },
  {
    question: "Who generally executes bulk trades?",
    options: [
      "Retail investors",
      "Institutional investors",
      "Day traders",
      "Government agencies",
    ],
    answer: "Institutional investors",
  },
  {
    question: "What percentage of total listed shares must a trade cross to be considered a 'bulk deal' in India?",
    options: ["0.1%", "0.5%", "1%", "2%"],
    answer: "0.5%",
  },
  {
    question: "Which exchange regulation requires bulk deals to be reported within the same trading day?",
    options: ["RBI guidelines", "SEBI regulations", "IRDA norms", "NSE margin rules"],
    answer: "SEBI regulations",
  },
  {
    question: "Where can investors see bulk trade data daily?",
    options: [
      "Company’s annual report",
      "Stock exchange website",
      "Broker’s WhatsApp group",
      "Business newspapers only",
    ],
    answer: "Stock exchange website",
  },
  {
    question: "Bulk trades can affect stock prices because they—",
    options: [
      "Show investor confidence or exit",
      "Change market volatility rules",
      "Trigger circuit filters automatically",
      "Alter company’s financial statements",
    ],
    answer: "Show investor confidence or exit",
  },
  {
    question: "What’s the difference between a 'block deal' and a 'bulk deal'?",
    options: [
      "Block deals happen through a separate window; bulk deals happen in the normal market",
      "Bulk deals are smaller; block deals are retail-only",
      "Block deals happen after hours; bulk deals don’t",
      "There is no difference",
    ],
    answer:
      "Block deals happen through a separate window; bulk deals happen in the normal market",
  },
  {
    question: "Which of these best describes a 'promoter bulk deal'?",
    options: [
      "Company owners selling or buying large chunks of their own shares",
      "Brokers manipulating share prices",
      "Retail investors pooling funds",
      "Government stake sale",
    ],
    answer: "Company owners selling or buying large chunks of their own shares",
  },
];

export default function BulkTradeQuizArena() {
  const [username, setUsername] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const savedBoard = JSON.parse(localStorage.getItem("bulkTradeLeaderboard")) || [];
    setLeaderboard(savedBoard);
  }, []);

  const saveToLeaderboard = (name, finalScore) => {
    const newBoard = [...leaderboard, { name, score: finalScore }].sort(
      (a, b) => b.score - a.score
    );
    setLeaderboard(newBoard);
    localStorage.setItem("bulkTradeLeaderboard", JSON.stringify(newBoard));
  };

  const handleAnswer = (option) => {
    if (option === bulkTradeQuiz[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < bulkTradeQuiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      saveToLeaderboard(username, score + (option === bulkTradeQuiz[currentQuestion].answer ? 1 : 0));
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center font-sans relative px-4">
      {!quizStarted ? (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 glow-text">BULK TRADE QUIZ ARENA</h1>
          <p className="mb-4">Test your Bulk Trade knowledge!</p>

          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md mb-4 text-black text-center w-64"
          />
          <br />
          <button
            onClick={() => username && setQuizStarted(true)}
            className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-all disabled:opacity-40"
            disabled={!username}
          >
            Start Quiz
          </button>

          {leaderboard.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
              <div className="text-left bg-gray-900 p-4 rounded-lg shadow-md max-w-sm mx-auto">
                {leaderboard.map((entry, i) => (
                  <p key={i} className="mb-2">
                    {i + 1}. <span className="font-semibold">{entry.name}</span> —{" "}
                    {entry.score} pts
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : showResult ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            {username}, your Score: {score} / {bulkTradeQuiz.length}
          </p>
          <button
            onClick={restartQuiz}
            className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-all"
          >
            Play Again
          </button>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
            <div className="text-left bg-gray-900 p-4 rounded-lg shadow-md max-w-sm mx-auto">
              {leaderboard.map((entry, i) => (
                <p key={i} className="mb-2">
                  {i + 1}. <span className="font-semibold">{entry.name}</span> —{" "}
                  {entry.score} pts
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Question {currentQuestion + 1} / {bulkTradeQuiz.length}
          </h2>
          <p className="text-lg mb-6">{bulkTradeQuiz[currentQuestion].question}</p>
          <div className="flex flex-col gap-4">
            {bulkTradeQuiz[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="border border-yellow-400 text-yellow-400 py-2 px-4 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <footer className="absolute bottom-4 text-sm text-gray-400 text-center w-full">
        Made with ❤️ by <span className="text-yellow-400 font-semibold">Basu</span>
      </footer>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px #facc15, 0 0 20px #facc15, 0 0 30px #facc15;
        }
      `}</style>
    </div>
  );
}
