'use client';

import Link from 'next/link';
import { problems } from '@/data/problems';

export default function ProblemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Engineering Problems</h1>
        <p className="mt-2 text-sm text-gray-600">
          Practice solving real-world engineering problems
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Link
            key={problem.id}
            href={`/problems/${problem.id}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-6 hover:border-indigo-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                {problem.title}
              </h2>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  problem.difficulty === 'Easy'
                    ? 'bg-green-100 text-green-700'
                    : problem.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {problem.difficulty}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {problem.category}
            </p>
            <div className="mt-4 flex-1">
              <p className="text-sm text-gray-600 line-clamp-3">
                {problem.description.split('\n')[0]}
              </p>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                Start solving →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 