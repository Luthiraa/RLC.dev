'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface TestCase {
  input: string | number | boolean | Array<any> | Record<string, unknown>;
  output: string | number | boolean;
  description?: string;
}

interface CodeEditorProps {
  initialCode?: string;
  language?: 'cpp' | 'c';
  onCodeChange?: (code: string) => void;
  onSubmit?: (code: string) => void;
  functionName?: string;
  parameters?: string[];
  returnType?: string;
  testCases?: TestCase[];
}

export default function CodeEditor({
  initialCode = '',
  language = 'cpp',
  onCodeChange,
  onSubmit,
  functionName = 'solution',
  parameters = ['input'],
  returnType = 'int',
  testCases = [],
}: CodeEditorProps) {
  const generateTestCode = (testCase: TestCase | undefined) => {
    if (!testCase) return '';
    
    // Handle different input types
    let inputStr: string;
    if (Array.isArray(testCase.input)) {
      inputStr = testCase.input.map((param: unknown) => {
        if (Array.isArray(param)) {
          return `{${param.join(', ')}}`;
        }
        return param;
      }).join(', ');
    } else if (typeof testCase.input === 'object' && testCase.input !== null) {
      // Handle object inputs
      inputStr = Object.entries(testCase.input as Record<string, unknown>)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: {${value.join(', ')}}`;
          }
          return `${key}: ${value}`;
        })
        .join(', ');
    } else {
      // Handle primitive inputs
      inputStr = String(testCase.input);
    }
    
    return `
        ${returnType} result = ${functionName}(${inputStr});
        std::cout << "Test case result: " << result << std::endl;
        std::cout << "Expected: " << ${testCase.output} << std::endl;
        std::cout << (result == ${testCase.output} ? "PASSED" : "FAILED") << std::endl;
        std::cout << std::endl;`;
  };

  const generateFunctionSkeleton = () => {
    const paramList = parameters.join(', ');
    return `// Write your solution here
${returnType} ${functionName}(${paramList}) {
    // Your code here
    return 0;
}

// Test cases will be automatically run
int main() {
    // Test case 1
    {
        ${generateTestCode(testCases[0])}
    }
    
    // Test case 2
    {
        ${generateTestCode(testCases[1])}
    }
    
    return 0;
}`;
  };

  const [code, setCode] = useState(initialCode || generateFunctionSkeleton());
  const [output, setOutput] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentTestCase, setCurrentTestCase] = useState(0);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      onCodeChange?.(value);
    }
  };

  const handleSubmit = async () => {
    setIsCompiling(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Compilation failed');
      }

      setOutput(data.output);
      onSubmit?.(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-medium text-gray-900">Code Editor</h3>
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
            {language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isCompiling}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isCompiling ? 'Compiling...' : 'Run Code'}
        </button>
      </div>

      <div className="h-[400px]">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            renderWhitespace: 'selection',
          }}
        />
      </div>

      {(output || error) && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Output</h4>
          <pre className={`text-sm font-mono rounded-lg p-4 ${
            error ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'
          }`}>
            {error || output}
          </pre>
        </div>
      )}
    </div>
  );
}