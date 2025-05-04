export interface Problem {
  id: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  testCases: {
    input: any;
    output: any;
  }[];
}

export const problems: Problem[] = [
  {
    id: 1,
    title: 'PID Controller Design',
    category: 'Control Systems',
    difficulty: 'Medium',
    description: `Design a PID controller for a DC motor speed control system.

Requirements:
1. Implement a PID controller class with the following methods:
   - __init__(self, kp, ki, kd)
   - compute(self, setpoint, current_value)
   - reset(self)

2. The controller should handle:
   - Proportional gain (Kp)
   - Integral gain (Ki)
   - Derivative gain (Kd)
   - Anti-windup protection
   - Output limiting

3. Test the controller with:
   - Step response
   - Ramp response
   - Disturbance rejection

Example usage:

# Create PID controller
pid = PIDController(kp=1.0, ki=0.1, kd=0.01)

# Control loop
while True:
    current_speed = get_motor_speed()
    control_signal = pid.compute(setpoint=1000, current_value=current_speed)
    set_motor_voltage(control_signal)`,
    testCases: [
      {
        input: {
          kp: 1.0,
          ki: 0.1,
          kd: 0.01,
          setpoint: 1000,
          current_value: 800,
        },
        output: 200,
      },
    ],
  },
  {
    id: 2,
    title: 'Circuit Analysis',
    category: 'Circuit Theory',
    difficulty: 'Easy',
    description: `Analyze a complex RLC circuit and find its transfer function.

Requirements:
1. Implement a function to calculate the transfer function of an RLC circuit:
   - Input: R (resistance), L (inductance), C (capacitance)
   - Output: Transfer function coefficients

2. The circuit should handle:
   - Series RLC configuration
   - Parallel RLC configuration
   - Damping ratio calculation
   - Natural frequency calculation

3. Test cases should include:
   - Underdamped response
   - Critically damped response
   - Overdamped response

Example usage:

def calculate_transfer_function(R, L, C):
    # Your code here
    pass

# Test the function
R = 100  # ohms
L = 0.1  # henries
C = 0.001  # farads
coefficients = calculate_transfer_function(R, L, C)`,
    testCases: [
      {
        input: {
          R: 100,
          L: 0.1,
          C: 0.001,
        },
        output: {
          natural_frequency: 31.62,
          damping_ratio: 0.5,
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Digital Filter Implementation',
    category: 'Signal Processing',
    difficulty: 'Hard',
    description: `Implement a low-pass filter using DSP techniques.

Requirements:
1. Create a digital low-pass filter class with:
   - FIR filter implementation
   - IIR filter implementation
   - Cutoff frequency specification
   - Filter order selection

2. The filter should handle:
   - Real-time processing
   - Window functions (Hamming, Hanning)
   - Frequency response analysis
   - Phase response analysis

3. Test the filter with:
   - Different input signals
   - Various cutoff frequencies
   - Different filter orders

Example usage:

class DigitalFilter:
    def __init__(self, cutoff_freq, sample_rate, filter_type='lowpass'):
        # Your code here
        pass

    def process(self, input_signal):
        # Your code here
        pass`,
    testCases: [
      {
        input: {
          cutoff_freq: 1000,
          sample_rate: 44100,
          input_signal: [1, 0, -1, 0, 1],
        },
        output: [0.8, 0.2, -0.4, 0.2, 0.8],
      },
    ],
  },
  {
    id: 4,
    title: 'Microcontroller Interrupt Handling',
    category: 'Embedded Systems',
    difficulty: 'Medium',
    description: `Implement interrupt handling for a microcontroller system.

Requirements:
1. Create an interrupt service routine (ISR) system with:
   - Priority-based interrupt handling
   - Interrupt vector table
   - Context saving/restoring
   - Interrupt masking

2. The system should handle:
   - Multiple interrupt sources
   - Nested interrupts
   - Interrupt latency optimization
   - Error handling

3. Test the system with:
   - Different interrupt priorities
   - Concurrent interrupts
   - Error conditions

Example usage:

class InterruptHandler:
    def __init__(self):
        self.interrupt_vectors = {}
        self.priority_queue = []

    def register_handler(self, vector, handler, priority):
        # Your code here
        pass

    def handle_interrupt(self, vector):
        # Your code here
        pass`,
    testCases: [
      {
        input: {
          vector: 1,
          priority: 2,
          handler: "print('Interrupt 1')",
        },
        output: "Interrupt 1 handled successfully",
      },
    ],
  },
  {
    id: 5,
    title: 'Optical Communication System',
    category: 'Photonics',
    difficulty: 'Hard',
    description: `Design an optical communication system with error correction.

Requirements:
1. Implement an optical communication system with:
   - Modulation schemes (OOK, PPM)
   - Error detection (CRC)
   - Forward error correction
   - Link budget calculation

2. The system should handle:
   - Different data rates
   - Various modulation formats
   - Channel impairments
   - Power optimization

3. Test the system with:
   - Different data patterns
   - Various channel conditions
   - Error rates

Example usage:

class OpticalSystem:
    def __init__(self, data_rate, modulation_type):
        # Your code here
        pass

    def transmit(self, data):
        # Your code here
        pass

    def receive(self, signal):
        # Your code here
        pass`,
    testCases: [
      {
        input: {
          data_rate: 1000000,
          modulation_type: 'OOK',
          data: [1, 0, 1, 1, 0],
        },
        output: [1, 0, 1, 1, 0],
      },
    ],
  },
  {
    id: 6,
    title: 'Display Timing Controller',
    category: 'Graphics',
    difficulty: 'Medium',
    description: `Implement a display timing controller for video signals.

Requirements:
1. Create a timing controller that handles:
   - Horizontal sync generation
   - Vertical sync generation
   - Pixel clock generation
   - Blanking intervals

2. The controller should support:
   - Different resolutions
   - Various refresh rates
   - Multiple color depths
   - Timing adjustments

3. Test the controller with:
   - Standard resolutions (1080p, 4K)
   - Different refresh rates
   - Various timing parameters

Example usage:

class TimingController:
    def __init__(self, resolution, refresh_rate):
        # Your code here
        pass

    def generate_timing_signals(self):
        # Your code here
        pass`,
    testCases: [
      {
        input: {
          resolution: '1920x1080',
          refresh_rate: 60,
        },
        output: {
          pixel_clock: 148500000,
          h_sync: 44000,
          v_sync: 1125,
        },
      },
    ],
  },
]; 