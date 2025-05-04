import { NextResponse } from 'next/server';

const JUDGE0_API_URL = 'https://judge029.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '896ea49f12msh6b7b17e14bf1b12p1bac2bjsna6f9d37ff281';

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();

    if (!JUDGE0_API_KEY) {
      console.error('Judge0 API key is not set');
      return NextResponse.json({
        error: 'Judge0 API key is not configured. Please check your environment variables.',
      }, { status: 500 });
    }

    console.log('Creating submission with language:', language);
    
    // Create submission
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge029.p.rapidapi.com',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: language === 'cpp' ? 54 : 50, // 54 for C++, 50 for C
        stdin: '',
        expected_output: null,
        cpu_time_limit: 2,
        memory_limit: 512000,
      }),
    });

    if (!submissionResponse.ok) {
      const errorText = await submissionResponse.text();
      console.error('Judge0 API error:', {
        status: submissionResponse.status,
        statusText: submissionResponse.statusText,
        body: errorText,
      });
      throw new Error(`Failed to create submission: ${submissionResponse.status} ${submissionResponse.statusText}`);
    }

    const submission = await submissionResponse.json();
    console.log('Submission created:', submission);

    // Poll for results
    let result;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      console.log(`Polling attempt ${attempts + 1}/${maxAttempts}`);
      
      const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${submission.token}?base64_encoded=true&fields=*`, {
        headers: {
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge029.p.rapidapi.com',
        },
      });

      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();
        console.error('Failed to get submission result:', {
          status: resultResponse.status,
          statusText: resultResponse.statusText,
          body: errorText,
        });
        throw new Error('Failed to get submission result');
      }

      result = await resultResponse.json();
      console.log('Submission status:', result.status);

      if (result.status.id !== 1 && result.status.id !== 2) {
        break; // Submission is complete
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling again
      attempts++;
    }

    if (!result) {
      throw new Error('Timeout waiting for submission result');
    }

    // Handle different status codes
    switch (result.status.id) {
      case 3: // Accepted
        return NextResponse.json({ output: result.stdout });
      case 4: // Wrong Answer
        return NextResponse.json({ 
          error: 'Wrong Answer\nExpected: ' + result.expected_output + '\nGot: ' + result.stdout 
        }, { status: 400 });
      case 5: // Time Limit Exceeded
        return NextResponse.json({ error: 'Time Limit Exceeded' }, { status: 400 });
      case 6: // Compilation Error
        return NextResponse.json({ error: 'Compilation Error\n' + result.compile_output }, { status: 400 });
      case 7: // Runtime Error
        return NextResponse.json({ error: 'Runtime Error\n' + result.stderr }, { status: 400 });
      default:
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  } catch (error) {
    console.error('Compilation error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Compilation failed',
    }, { status: 500 });
  }
} 