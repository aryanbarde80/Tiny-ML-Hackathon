# TinyFish Agent - AI-Powered Browser Automation

TinyFish Agent is a modern web application that leverages the power of **TinyFish AI** to perform autonomous browser automation tasks. Built with a robust and scalable tech stack, it provides a seamless interface for users to define goals and watch as an AI agent navigates websites to achieve them in real-time.

## 🚀 Features

- **Autonomous Browser Automation**: Simply provide a target URL and a goal, and the AI agent will handle the rest.
- **Real-time Activity Streaming**: Watch the agent's thought process and actions as they happen through a live event log.
- **Secure Proxy Architecture**: Uses Supabase Edge Functions to securely communicate with the TinyFish AI API, protecting sensitive credentials.
- **Modern UI/UX**: A sleek, responsive interface built with React, Tailwind CSS, and shadcn/ui, featuring a terminal-style activity log.
- **Type-Safe Development**: Fully implemented in TypeScript for enhanced developer productivity and code reliability.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **AI Engine**: [TinyFish AI](https://tinyfish.ai/)
- **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) account
- A [TinyFish AI](https://tinyfish.ai/) API Key

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aryanbarde80/Tiny-ML-Hackathon.git
   cd Tiny-ML-Hackathon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Supabase Edge Function Configuration**:
   The agent requires a `TINYFISH_API_KEY` to be set in your Supabase project secrets:
   ```bash
   supabase secrets set TINYFISH_API_KEY=your_tinyfish_api_key
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📖 Usage

1. Open the application in your browser (usually at `http://localhost:8080`).
2. Enter the **Target URL** of the website you want the agent to visit.
3. Describe the **Task** in the text area (e.g., "Find the price of the latest iPhone and summarize the specs").
4. Click **Launch Agent** and monitor the "Agent Activity" log for real-time updates.
5. Once completed, the final result will be displayed in the "Result" section.

## 🧪 Testing

The project includes both unit and end-to-end tests:

- **Unit Tests**: Run `npm run test`
- **E2E Tests**: Run `npx playwright test`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for the Tiny-ML Hackathon.
