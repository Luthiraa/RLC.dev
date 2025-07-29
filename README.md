
# RLC.dev

**RLC.dev** is a comprehensive open-source platform that integrates simulation, code verification, and AI-driven assessment tools for core areas of electrical and computer engineering. It is designed to support both academic learning and professional development across foundational and emerging subfields of the hardware stack.

---

## Overview

RLC.dev combines modular educational tooling with high-performance simulation backends, compiler integrations, and intelligent grading logic to enable rigorous experimentation and feedback in:

- Control Systems and Dynamic Response Analysis  
- Digital Communication Systems and Modulation Architectures  
- Embedded System Programming and Peripheral Interface Validation  
- Hardware Description Language Simulation (Verilog, SystemVerilog)  
- SPICE-Based Circuit Modeling with DC/DC Converter Simulation  
- Compiler-Level Behavioral Checking for C/C++ Logic  
- Agentic LLM-Based Assessment of Design Specifications and Performance Metrics  

This platform is optimized for ECE learners navigating the control, communications, and embedded systems streams, as well as researchers building AI-integrated educational tooling or automated grading pipelines.

---

## Core Features

### Unified Embedded Code Execution

RLC.dev supports C, C++, Verilog, and SystemVerilog with backend-specific sandboxed evaluation environments. Submitted programs are compiled, simulated, and output-matched against golden references using behavioral testbenches and assertion pipelines.

- GCC toolchain via MinGW-w64 for C/C++
- Icarus Verilog and Verilator simulation environments
- Static code analysis and memory access validation (planned)
- In-browser waveform viewers (e.g., VCD explorer for Verilog outputs)

### Online SPICE Simulation for Power Electronics

Our platform integrates server-side `ngspice` to support low- and high-level analog simulation use cases, with a focus on switching regulator topologies (e.g., buck, boost, buck-boost). Users can author and simulate SPICE netlists directly in the browser.

- Parametric sweeps and transient analysis
- Time-domain validation of control loop stability
- DC operating point computation and small-signal Bode plots (in progress)

### Control Systems & Signal Processing

Incorporates dynamic system modeling, transfer function analysis, and step/impulse response evaluations. Compatible with block diagram representations, canonical state-space models, and frequency-domain design techniques.

- Root locus, Nyquist, and Bode-based visualizations
- Pole-zero placement tasks with auto-evaluation
- PID tuning simulations and digital controller realization

### Digital Communication Protocol Evaluation

Includes an extensible module for simulating baseband and passband modulation schemes with agentic grading of waveform properties, noise resilience, and bandwidth efficiency.

- BPSK, QPSK, and FSK simulation environments
- Eye diagram and BER analysis
- Demodulator logic synthesis tasks (Verilog/SystemVerilog)

### AI-Assisted Grading Engine

Backed by a custom large language model (LLM) pipeline, the grader evaluates:

- Code functionality and efficiency
- Signal behavior under constraints
- Control loop correctness based on specification matching
- User explanations for subjective or derived response questions

---

## Technology Stack

- **Frontend**: React, Next.js  
- **Backend**: Node.js, Prisma, PostgreSQL  
- **Embedded Execution**: Docker sandbox runners for language-specific toolchains  
- **Circuit Simulation**: ngspice, Icarus Verilog, Verilator  
- **Grading Engine**: OpenAI, LangChain orchestration  
- **Data Management**: PostgreSQL, Prisma ORM  

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.8+ (for agentic grading)
- MinGW-w64 (C/C++)
- ngspice, iverilog, verilator (install locally or via Docker)

### Setup

```bash
git clone https://github.com/Luthiraa/RLC.dev.git
cd RLC.dev
npm install
