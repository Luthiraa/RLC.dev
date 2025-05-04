'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { problems } from '@/data/problems';
import SpiceSimulator from '@/components/SpiceSimulator';
import CodeEditor from '@/components/CodeEditor';

interface SimulationResults {
  nodes: Record<string, number>;
  currents: Record<string, number>;
  voltages: Record<string, number>;
  power: Record<string, number>;
}

export default function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const problem = problems.find(p => p.id === parseInt(resolvedParams.id)) || problems[0];
  const [code, setCode] = useState('');

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  const handleSubmit = () => {
    // Implement solution submission logic
    console.log('Submitting solution:', code);
  };

  const handleSimulationComplete = (results: SimulationResults) => {
    console.log('Simulation results:', results);
    // Handle simulation results
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/problems"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            ← Back to Problems
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
              <div className="mt-2 flex items-center gap-4">
                <span className="inline-flex items-center rounded-full bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-300">
                  {problem.category}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    problem.difficulty === 'Easy'
                      ? 'bg-green-900/50 text-green-300'
                      : problem.difficulty === 'Medium'
                      ? 'bg-yellow-900/50 text-yellow-300'
                      : 'bg-red-900/50 text-red-300'
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-300">
                {problem.description}
              </pre>
            </div>

            <div>
              <h2 className="text-lg font-medium text-white">Test Cases</h2>
              <div className="mt-4 space-y-4">
                {problem.testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-800/50 p-4 text-sm font-mono"
                  >
                    <div className="text-gray-400">Input:</div>
                    <pre className="mt-1 text-gray-200">
                      {JSON.stringify(testCase.input, null, 2)}
                    </pre>
                    <div className="mt-2 text-gray-400">Expected Output:</div>
                    <pre className="mt-1 text-gray-200">
                      {JSON.stringify(testCase.output, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Area */}
          <div className="space-y-6">
            {problem.category === 'Circuit Theory' ? (
              <SpiceSimulator
                initialComponents={[
                  {
                    id: 'v1',
                    type: 'voltageSource',
                    value: 5,
                    x: 100,
                    y: 300,
                    unit: 'V',
                    rotation: 0,
                    connections: ['r1'],
                  },
                  {
                    id: 'r1',
                    type: 'resistor',
                    value: 100,
                    x: 200,
                    y: 300,
                    unit: 'Ω',
                    rotation: 0,
                    connections: ['v1', 'c1'],
                  },
                  {
                    id: 'c1',
                    type: 'capacitor',
                    value: 0.001,
                    x: 300,
                    y: 300,
                    unit: 'F',
                    rotation: 0,
                    connections: ['r1', 'l1'],
                  },
                  {
                    id: 'l1',
                    type: 'inductor',
                    value: 0.1,
                    x: 400,
                    y: 300,
                    unit: 'H',
                    rotation: 0,
                    connections: ['c1', 'gnd'],
                  },
                  {
                    id: 'gnd',
                    type: 'ground',
                    value: 0,
                    x: 500,
                    y: 300,
                    unit: '',
                    rotation: 0,
                    connections: ['l1'],
                  },
                ]}
                onSimulationComplete={handleSimulationComplete}
              />
            ) : (
              <CodeEditor
                initialCode={code}
                language="cpp"
                onCodeChange={handleEditorChange}
                onSubmit={handleSubmit}
                functionName={problem.functionName || 'solution'}
                parameters={problem.parameters || ['input']}
                returnType={problem.returnType || 'int'}
                testCases={problem.testCases.map(tc => ({
                  input: tc.input,
                  output: typeof tc.output === 'object' ? JSON.stringify(tc.output) : tc.output
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}