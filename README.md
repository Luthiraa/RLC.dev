<<<<<<< HEAD
# Engineering Learning Platform

A platform for learning and practicing engineering concepts with interactive problems and real-time feedback.

## Prerequisites

### C++ Development Environment

To run C++ code problems, you need to install MinGW-w64 (g++ compiler):

1. Download MinGW-w64 from: https://github.com/niXman/mingw-builds-binaries/releases
   - Choose the latest version (e.g., x86_64-13.2.0-release-posix-seh-ucrt-rt_v11-rev1.7z)
   - Download the file ending in `.7z`

2. Install 7-Zip if you haven't already:
   - Download from: https://7-zip.org/
   - Install with default settings

3. Extract MinGW-w64:
   - Right-click the downloaded `.7z` file
   - Select "7-Zip" → "Extract to..."
   - Extract to `C:\mingw64`

4. Add to PATH:
   - Open Windows Search
   - Type "Environment Variables"
   - Click "Edit the system environment variables"
   - Click "Environment Variables"
   - Under "System Variables", find and select "Path"
   - Click "Edit"
   - Click "New"
   - Add `C:\mingw64\bin`
   - Click "OK" on all windows

5. Verify installation:
   - Open a new terminal/command prompt
   - Type `g++ --version`
   - You should see version information

### Node.js and npm

1. Download Node.js from: https://nodejs.org/
2. Install with default settings
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Features

- Interactive circuit simulation
- C++ code execution
- Multiple choice questions
- Progress tracking
- User authentication

## Troubleshooting

### Compiler Not Found

If you see the error "g++ is not recognized", follow these steps:

1. Make sure MinGW-w64 is installed correctly
2. Verify the PATH environment variable includes `C:\mingw64\bin`
3. Restart your terminal/IDE
4. Try running `g++ --version` in a new terminal

### Database Connection Issues

1. Check if PostgreSQL is running
2. Verify your database credentials in `.env`
3. Make sure the database exists
4. Run `npx prisma generate` and `npx prisma migrate dev`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

# IndiaBIX MCQ Scraper

This Python script scrapes multiple-choice questions (MCQs) from IndiaBIX's Electrical Engineering test section and stores them in a SQLite database.

## Features

- Scrapes questions from multiple pages
- Stores questions in a SQLite database
- Includes error handling and rate limiting
- Logs scraping progress and errors
- Extracts question text, options, correct answer, and explanations

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. Clone this repository or download the files
2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Run the scraper:
```bash
python scraper.py
```

By default, the script will scrape the first 5 pages of questions. To modify the number of pages, edit the `num_pages` parameter in the `main()` function.

## Database Structure

The questions are stored in a SQLite database (`mcq_database.db`) with the following structure:

- `id`: Unique identifier for each question
- `question_text`: The question text
- `option_a`: First option
- `option_b`: Second option
- `option_c`: Third option
- `option_d`: Fourth option
- `correct_answer`: The correct answer
- `explanation`: Explanation of the answer (if available)
- `category`: Question category (default: "Electrical Engineering")
- `difficulty`: Question difficulty level (default: "Medium")
- `created_at`: Timestamp of when the question was added

## Notes

- The scraper includes rate limiting (1-3 seconds between requests) to avoid overwhelming the server
- Error handling is implemented for network issues and parsing errors
- Progress is logged to the console
- The script uses a user agent header to mimic a browser request

## Disclaimer

This scraper is for educational purposes only. Please respect the website's terms of service and robots.txt file when using this script.
=======
RLC.dev 
>>>>>>> 9baefb24b1373635bd2dd2560960c6b24f455c8f
