'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock data - replace with actual data from database
const progress = {
  'Control Systems': { completed: 5, total: 10 },
  'Embedded Systems': { completed: 3, total: 8 },
  'Signal Processing': { completed: 2, total: 6 },
  'Circuit Theory': { completed: 4, total: 7 },
};

const achievements = [
  {
    title: 'First Problem Solved',
    description: 'Completed your first electrical engineering problem',
    icon: '🎯',
  },
  {
    title: 'Control Systems Master',
    description: 'Completed 5 control systems problems',
    icon: '🎮',
  },
  {
    title: 'Circuit Wizard',
    description: 'Solved 3 circuit analysis problems',
    icon: '⚡',
  },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Welcome back, {session?.user?.name}! Track your progress and achievements here.
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Your Progress</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(progress).map(([category, { completed, total }]) => (
            <div
              key={category}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{category}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{completed}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                  of {total}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href={`/problems?category=${category}`}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View problems
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Your Achievements</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
            >
              <div className="flex-shrink-0">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                  <p className="truncate text-sm text-gray-500">{achievement.description}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 