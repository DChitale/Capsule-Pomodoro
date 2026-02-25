# Capsule Pomodoro

Capsule Pomodoro is a minimalist, high-performance productivity tool designed to sit elegantly on your desktop. Built using the Tauri framework, it combines the speed of Rust with the flexibility of React to create a seamless, non-intrusive timer experience.

## Features

- **Glassmorphic Interface**: A premium aesthetic utilizing frosted glass effects and subtle accent glows.
- **Minimalist Footprint**: A compact, floating capsule design that minimizes workspace clutter.
- **Contextual Expansion**: The application interface remains collapsed by default, expanding to reveal full controls only upon user interaction.
- **High Performance**: Optimized backend execution using Rust and Tauri v2.
- **Fluid Motion**: Smooth interface transitions and state changes powered by Framer Motion.
- **Dual Modes**: Seamlessly switch between dedicated Work and Break cycles.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Desktop Environment**: Tauri v2
- **Language**: JavaScript / Rust
- **Styling**: Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

Development requires the following tools:
- Node.js (Latest LTS recommended)
- Rust toolchain
- Tauri-specific system dependencies (refer to the Tauri documentation for your OS)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DChitale/Pomodoro-Timer.git
   cd Pomodoro-Timer
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Launch the development environment:
   ```bash
   npm run tauri dev
   ```

4. Generate a production build:
   ```bash
   npm run tauri build
   ```

---

Developed by [Dhananjay](https://github.com/DChitale)
