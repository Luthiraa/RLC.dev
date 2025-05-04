const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(process.cwd(), '.env');

function updateEnvFile(apiKey) {
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Update or add JUDGE0_API_KEY
  if (envContent.includes('JUDGE0_API_KEY=')) {
    envContent = envContent.replace(
      /JUDGE0_API_KEY=.*/,
      `JUDGE0_API_KEY="${apiKey}"`
    );
  } else {
    envContent += `\nJUDGE0_API_KEY="${apiKey}"`;
  }

  // Write back to .env file
  fs.writeFileSync(envPath, envContent.trim() + '\n');
  console.log('✅ Judge0 API key has been added to .env file');
}

function setupJudge0() {
  console.log('\n=== Judge0 API Setup ===\n');
  console.log('To get your Judge0 API key:');
  console.log('1. Go to https://rapidapi.com/');
  console.log('2. Sign up for a free account');
  console.log('3. Subscribe to the Judge0 API (free tier)');
  console.log('4. Get your API key from the RapidAPI dashboard\n');

  rl.question('Enter your Judge0 API key: ', (apiKey) => {
    if (!apiKey) {
      console.error('❌ API key cannot be empty');
      rl.close();
      return;
    }

    updateEnvFile(apiKey);
    rl.close();
  });
}

setupJudge0(); 