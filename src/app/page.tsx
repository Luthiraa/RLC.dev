import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master Electrical Engineering
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Practice real-world electrical engineering problems, prepare for interviews, and enhance your skills with our interactive learning platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/problems"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Practicing
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Problems section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Problems
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore our collection of carefully curated electrical engineering problems
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
          {[
            {
              title: 'PID Controller Design',
              category: 'Control Systems',
              difficulty: 'Medium',
              description: 'Design a PID controller for a DC motor speed control system',
            },
            {
              title: 'Digital Filter Implementation',
              category: 'Signal Processing',
              difficulty: 'Hard',
              description: 'Implement a low-pass filter using DSP techniques',
            },
            {
              title: 'Circuit Analysis',
              category: 'Circuit Theory',
              difficulty: 'Easy',
              description: 'Analyze a complex RLC circuit and find its transfer function',
            },
          ].map((problem) => (
            <article key={problem.title} className="flex flex-col items-start">
              <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-600">
                    {problem.category}
                  </span>
                  <span className="rounded-full bg-green-50 px-2 py-1 text-green-600">
                    {problem.difficulty}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href="/problems/1">
                      <span className="absolute inset-0" />
                      {problem.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {problem.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
