// src/App.js

import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import { motion } from "framer-motion"; // ✅ NEW: Import motion

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 p-6">
        
        {/* ✅ Animated Header */}
        <header className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            🧠 FocusFlow
          </motion.h1>

          {/* ✅ Animated Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsDark(!isDark)}
            className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:shadow"
          >
            {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </motion.button>
        </header>

        {/* ✅ Animated Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* ✅ Timer Card with animation */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg space-y-6"
          >
            <Timer />
          </motion.section>

          {/* ✅ Task List Card with animation */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg space-y-6"
          >
            <TaskList />
          </motion.section>
        </main>

        {/* ✅ Animated Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400"
        >
          Built with 💡 by <span className="text-blue-400 font-medium">Ragasree Thatipamula</span>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
