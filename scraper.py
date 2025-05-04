import requests
from bs4 import BeautifulSoup
import sqlite3
import time
import random
from typing import List, Dict, Optional
import logging
import urllib3
import re

# Suppress SSL verification warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class QuestionParser:
    def __init__(self):
        self.db_path = 'mcq_database.db'
        self.setup_database()

    def setup_database(self):
        """Create the database and tables if they don't exist."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Drop existing table to ensure clean schema
        cursor.execute('DROP TABLE IF EXISTS questions')

        # Create questions table with module field
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_text TEXT NOT NULL,
            option_a TEXT NOT NULL,
            option_b TEXT NOT NULL,
            option_c TEXT NOT NULL,
            option_d TEXT NOT NULL,
            correct_answer TEXT NOT NULL,
            explanation TEXT,
            category TEXT,
            difficulty TEXT,
            module TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')

        conn.commit()
        conn.close()
        logger.info("Database setup completed")

    def parse_questions(self, text: str, module: str = "Module 1"):
        """Parse questions from the provided text."""
        # Split text into questions using regex
        questions_raw = re.split(r'\n\s*(?=\d+\.)', text.strip())
        
        for q_raw in questions_raw:
            if not q_raw.strip():
                continue
                
            try:
                # Split into lines and clean
                lines = [line.strip() for line in q_raw.splitlines() if line.strip()]
                if not lines:
                    continue

                # Extract question number and text
                match = re.match(r'(\d+)\.\s*(.+)', lines[0])
                if not match:
                    continue
                    
                question_text = match.group(2)
                
                # Get options (skip the question line)
                options = []
                for line in lines[1:]:
                    if line and not re.match(r'^\d+\.', line):
                        # Skip empty lines and lines that look like question numbers
                        if line.strip() and not re.match(r'^\d+\s*$', line):
                            options.append(line)
                
                # Handle True/False questions
                if len(options) == 2 and options[0].lower() == 'true' and options[1].lower() == 'false':
                    options.extend(['N/A', 'N/A'])
                elif len(options) >= 4:
                    # Take the first 4 options
                    options = options[:4]
                else:
                    # Try to find 4 options in the remaining text
                    remaining_text = '\n'.join(lines[1:])
                    potential_options = []
                    
                    # First try to find options with newlines
                    matches = re.finditer(r'\n([^\n]+?)(?=\n[^\n]+|\Z)', '\n' + remaining_text)
                    for match in matches:
                        opt = match.group(1).strip()
                        if opt and not re.match(r'^\d+\s*$', opt) and len(opt.strip()) > 1:
                            potential_options.append(opt)
                    
                    # If we don't have enough options, try splitting by newlines
                    if len(potential_options) < 4:
                        potential_options = []
                        for line in remaining_text.split('\n'):
                            line = line.strip()
                            if line and not re.match(r'^\d+\s*$', line) and len(line) > 1:
                                potential_options.append(line)
                    
                    # If we still don't have enough options, try splitting by common separators
                    if len(potential_options) < 4:
                        for line in remaining_text.split('\n'):
                            parts = re.split(r'[,;]', line)
                            for part in parts:
                                part = part.strip()
                                if part and not re.match(r'^\d+\s*$', part) and len(part) > 1:
                                    potential_options.append(part)
                    
                    if len(potential_options) >= 4:
                        options = potential_options[:4]
                    else:
                        logger.warning(f"Question '{question_text}' does not have the correct number of options")
                        continue

                question = {
                    'question_text': question_text,
                    'option_a': options[0],
                    'option_b': options[1],
                    'option_c': options[2],
                    'option_d': options[3],
                    'correct_answer': options[0],  # First option is typically correct
                    'explanation': None,
                    'category': 'Electrical Engineering',
                    'difficulty': 'Medium',
                    'module': module
                }

                self.save_question(question)
                logger.info(f"Successfully parsed and saved question: {question_text[:50]}...")

            except Exception as e:
                logger.error(f"Error parsing question: {str(e)}")
                continue

    def save_question(self, question: Dict):
        """Save a question to the database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            cursor.execute('''
            INSERT INTO questions (
                question_text, option_a, option_b, option_c, option_d,
                correct_answer, explanation, category, difficulty, module
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                question['question_text'],
                question['option_a'],
                question['option_b'],
                question['option_c'],
                question['option_d'],
                question['correct_answer'],
                question['explanation'],
                question['category'],
                question['difficulty'],
                question['module']
            ))
            conn.commit()
            logger.info("Question saved successfully")
        except sqlite3.Error as e:
            logger.error(f"Error saving question to database: {str(e)}")
        finally:
            conn.close()

    def print_questions(self, module: str = None):
        """Print all questions from the database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            if module:
                cursor.execute('SELECT * FROM questions WHERE module = ?', (module,))
            else:
                cursor.execute('SELECT * FROM questions')
            
            questions = cursor.fetchall()
            
            if not questions:
                print("No questions found in the database.")
                return

            for i, q in enumerate(questions, 1):
                print(f"\n--- Question {i} ---")
                print(f"Module: {q[10]}")  # Print module
                print(f"Question: {q[1]}")
                print(f"A) {q[2]}")
                print(f"B) {q[3]}")
                if q[4] != "N/A":  # Only print C and D if they're not N/A
                    print(f"C) {q[4]}")
                    print(f"D) {q[5]}")
                print(f"Correct Answer: {q[6]}")
                if q[7]:  # explanation
                    print(f"Explanation: {q[7]}")
                print(f"Category: {q[8]}")
                print(f"Difficulty: {q[9]}")
                print("-" * 50)

        except sqlite3.Error as e:
            logger.error(f"Error reading from database: {str(e)}")
        finally:
            conn.close()

def main():
    parser = QuestionParser()
    
    # Module 1 questions
    module1_questions = """1. An open circuit is one that has a complete current path.

True

False

2. How much resistance is needed to draw 17.6 mA from a 12V source?

212 Ω

6.8 kΩ

68 Ω

680 Ω

3. When the current through a 12 kΩ resistor is 8 mA, the power is:

7.68 mW

768 mW

7.68 W

76.8 W

4. The following currents are measured in the same direction in a three-branch parallel circuit: 200 mA, 340 mA, and 700 mA. The total current into the junction is:

200 mA

540 mA

1.24 A

900 mA

5. The total resistance for two resistors in parallel is equal to the sum of the two resistors.

True

False

6. A 12 kΩ, a 15 kΩ, and a 22 kΩ resistor are in series with two 10 kΩ resistors that are in parallel. The source voltage is 75V. Current through the 15 kΩ resistor is approximately:

14 mA

1.4 mA

5 mA

50 mA

7. Referring to the given circuit, the voltage and current for the load resistor RL is:

450 mV, 4.5 mA

4.50 V, 45 mA

4.50 V, 4.5 mA

450 mV, 45 mA

8. Find the total current through R3 in the given circuit:

7.3 mA

5.5 mA

12.8 mA

1.8 mA

9. Some circuits require more than one voltage or current source.

True

False

10. The Thevenin equivalent voltage (VTH) is the short-circuit voltage between two terminals in a circuit.

True

False

11. A sine wave of 15 kHz is changing at a faster rate than a sine wave with a frequency of:

25 kHz

12 kHz

18 kHz

1.3 MHz

12. A 5 mH, 4.3 mH, and 0.6 mH inductor are connected in parallel. The total inductance is:

9.9 mH

Greater than 5 mH

9.9 mH or greater than 5 mH

Less than 0.6 mH

13. A 47 Ω resistor and a capacitor with 120 Ω capacitive reactance are in series across an AC source. What is the circuit impedance, Z?

129 Ω

12.9 Ω

167 Ω

73 Ω

14. XL and XC have opposing effects in an RLC circuit.

True

False

15. A series resonant band-stop filter consists of a 68 Ω resistor, a 110 mH coil, and a 0.02 µF capacitor. The internal resistance (RW) of the coil is 4 Ω. Input voltage is 200 mV. Output voltage is taken across the coil and capacitor in series. What is the output voltage magnitude at f₀?

1.1 mV

11.1 mV

111 mV

200 mV

16. With an RL integrator, at the instant of the rising pulse edge:

All the input voltage is across the resistor

All the input voltage is across the inductor

63% of the input voltage is across the resistor

63% of the input voltage is across the inductor

17. In an RC differentiator, the capacitor:

Charges exponentially at a rate depending on the RC time constant

Charges exponentially at a rate depending on the input voltage

Charges when the input voltage is decreasing

Charges to approximately one time constant

18. In an RC differentiating circuit, the output voltage is taken across the resistor.

True

False

19. The flat portions of a pulse waveform contain low-frequency components.

True

False

20. Polyphase is characterized by two or more sinusoidal voltages, each having a different phase angle.

True

False"""

    # Parse and save the questions for Module 1
    parser.parse_questions(module1_questions, "Module 1")
    
    # Print all questions from Module 1
    parser.print_questions("Module 1")

if __name__ == "__main__":
    main()