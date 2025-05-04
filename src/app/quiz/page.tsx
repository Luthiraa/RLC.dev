'use client';

import { useState } from 'react';
import { mcqs } from '@/data/mcqs';
import Image from 'next/image';

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const categories = ['All', ...new Set(mcqs.map(q => q.category))];
  const filteredQuestions = selectedCategory === 'All' 
    ? mcqs 
    : mcqs.filter(q => q.category === selectedCategory);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === filteredQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const question = filteredQuestions[currentQuestion];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Engineering Quiz</h1>
        <p className="mt-2 text-sm text-gray-600">
          Test your knowledge in various engineering disciplines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Selection and Progress */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quiz Settings</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Progress */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Progress</h3>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Question {currentQuestion + 1} of {filteredQuestions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / filteredQuestions.length) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Score */}
              <div>
                <h3 className="text-sm font-medium text-gray-700">Score</h3>
                <p className="mt-2 text-2xl font-bold text-indigo-600">
                  {score}/{currentQuestion + 1}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                question.difficulty === 'Easy'
                  ? 'bg-green-100 text-green-700'
                  : question.difficulty === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {question.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {question.category}
              </span>
            </div>

            <h2 className="text-xl font-medium text-gray-900 mb-6">
              {question.question}
            </h2>

            {/* Diagram */}
            {question.diagram && (
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <Image
                  src={question.diagram}
                  alt="Question diagram"
                  width={600}
                  height={400}
                  className="rounded-lg mx-auto"
                />
              </div>
            )}

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors duration-200 ${
                    selectedAnswer === index
                      ? index === question.correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                      : 'border-gray-200 hover:border-indigo-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Explanation</h3>
                <p className="text-sm text-blue-700">{question.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setShowExplanation(true)}
                disabled={selectedAnswer === null}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                Show Explanation
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === filteredQuestions.length - 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 