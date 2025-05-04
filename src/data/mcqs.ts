export interface MCQ {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  diagram?: string; // URL or base64 of the diagram
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const mcqs: MCQ[] = [
  // Control Systems Questions
  {
    id: 1,
    category: 'Control Systems',
    question: 'What is the transfer function of a PID controller?',
    options: [
      'G(s) = Kp + Ki/s + Kd*s',
      'G(s) = Kp*s + Ki + Kd/s',
      'G(s) = Kp + Ki*s + Kd/s',
      'G(s) = Kp/s + Ki + Kd*s',
    ],
    correctAnswer: 0,
    explanation: 'The transfer function of a PID controller is G(s) = Kp + Ki/s + Kd*s, where Kp is the proportional gain, Ki is the integral gain, and Kd is the derivative gain.',
    diagram: '/diagrams/pid_transfer_function.png',
    difficulty: 'Medium',
  },
  {
    id: 2,
    category: 'Control Systems',
    question: 'Which of the following is NOT a characteristic of a stable system?',
    options: [
      'Bounded input produces bounded output',
      'All poles are in the left half plane',
      'Zero steady-state error',
      'Finite settling time',
    ],
    correctAnswer: 2,
    explanation: 'Zero steady-state error is a performance characteristic, not a stability characteristic. A system can be stable without having zero steady-state error.',
    diagram: '/diagrams/stable_system.png',
    difficulty: 'Easy',
  },
  // Circuit Theory Questions
  {
    id: 3,
    category: 'Circuit Theory',
    question: 'In the given RLC circuit, what is the resonant frequency?',
    options: [
      '1/√(LC)',
      '1/(2π√(LC))',
      '2π√(LC)',
      '√(LC)',
    ],
    correctAnswer: 1,
    explanation: 'The resonant frequency of an RLC circuit is given by fr = 1/(2π√(LC)), where L is the inductance and C is the capacitance.',
    diagram: '/diagrams/rlc_circuit.png',
    difficulty: 'Medium',
  },
  {
    id: 4,
    category: 'Circuit Theory',
    question: 'What is the equivalent resistance of three 10Ω resistors connected in parallel?',
    options: [
      '30Ω',
      '10Ω',
      '3.33Ω',
      '0.3Ω',
    ],
    correctAnswer: 2,
    explanation: 'For parallel resistors, 1/Req = 1/R1 + 1/R2 + 1/R3. Therefore, 1/Req = 1/10 + 1/10 + 1/10 = 3/10, so Req = 10/3 ≈ 3.33Ω.',
    diagram: '/diagrams/parallel_resistors.png',
    difficulty: 'Easy',
  },
  // Signal Processing Questions
  {
    id: 5,
    category: 'Signal Processing',
    question: 'What is the Nyquist frequency for a signal sampled at 44.1kHz?',
    options: [
      '22.05kHz',
      '44.1kHz',
      '88.2kHz',
      '176.4kHz',
    ],
    correctAnswer: 0,
    explanation: 'The Nyquist frequency is half of the sampling frequency. Therefore, for a 44.1kHz sampling rate, the Nyquist frequency is 22.05kHz.',
    diagram: '/diagrams/nyquist_frequency.png',
    difficulty: 'Medium',
  },
  {
    id: 6,
    category: 'Signal Processing',
    question: 'Which window function provides the best frequency resolution?',
    options: [
      'Rectangular window',
      'Hamming window',
      'Blackman window',
      'Hanning window',
    ],
    correctAnswer: 0,
    explanation: 'The rectangular window provides the best frequency resolution but has the worst spectral leakage. It has the narrowest main lobe width.',
    diagram: '/diagrams/window_functions.png',
    difficulty: 'Hard',
  },
  // Embedded Systems Questions
  {
    id: 7,
    category: 'Embedded Systems',
    question: 'What is the purpose of a watchdog timer?',
    options: [
      'To generate accurate time delays',
      'To detect and recover from system crashes',
      'To synchronize multiple processors',
      'To measure system performance',
    ],
    correctAnswer: 1,
    explanation: 'A watchdog timer is used to detect and recover from system crashes by resetting the system if the main program fails to periodically reset the timer.',
    diagram: '/diagrams/watchdog_timer.png',
    difficulty: 'Medium',
  },
  {
    id: 8,
    category: 'Embedded Systems',
    question: 'Which of the following is NOT a common microcontroller communication protocol?',
    options: [
      'I2C',
      'SPI',
      'USB',
      'HDMI',
    ],
    correctAnswer: 3,
    explanation: 'HDMI is a display interface protocol, not a microcontroller communication protocol. Common microcontroller protocols include I2C, SPI, UART, and CAN.',
    diagram: '/diagrams/communication_protocols.png',
    difficulty: 'Easy',
  },
  // Photonics Questions
  {
    id: 9,
    category: 'Photonics',
    question: 'What is the wavelength of light in a medium with refractive index 1.5?',
    options: [
      'λ₀/1.5',
      'λ₀*1.5',
      'λ₀',
      'λ₀/2',
    ],
    correctAnswer: 0,
    explanation: 'The wavelength in a medium is given by λ = λ₀/n, where λ₀ is the wavelength in vacuum and n is the refractive index.',
    diagram: '/diagrams/wavelength_refraction.png',
    difficulty: 'Medium',
  },
  {
    id: 10,
    category: 'Photonics',
    question: 'Which type of optical fiber has the highest bandwidth?',
    options: [
      'Single-mode fiber',
      'Multi-mode fiber',
      'Plastic optical fiber',
      'Graded-index fiber',
    ],
    correctAnswer: 0,
    explanation: 'Single-mode fiber has the highest bandwidth because it supports only one propagation mode, eliminating modal dispersion.',
    diagram: '/diagrams/optical_fibers.png',
    difficulty: 'Hard',
  },
  // Graphics Questions
  {
    id: 11,
    category: 'Graphics',
    question: 'What is the refresh rate required for 4K resolution at 60Hz?',
    options: [
      '8.3 Gbps',
      '12.4 Gbps',
      '16.6 Gbps',
      '20.8 Gbps',
    ],
    correctAnswer: 2,
    explanation: 'For 4K (3840x2160) at 60Hz with 24-bit color depth: 3840 * 2160 * 60 * 24 = 16.6 Gbps.',
    diagram: '/diagrams/display_timing.png',
    difficulty: 'Hard',
  },
  {
    id: 12,
    category: 'Graphics',
    question: 'Which color space is most commonly used for digital video?',
    options: [
      'RGB',
      'YUV',
      'CMYK',
      'HSV',
    ],
    correctAnswer: 1,
    explanation: 'YUV is most commonly used for digital video because it separates luminance (Y) from chrominance (UV), allowing for better compression.',
    diagram: '/diagrams/color_spaces.png',
    difficulty: 'Medium',
  },
  // Add more questions for each category...
]; 