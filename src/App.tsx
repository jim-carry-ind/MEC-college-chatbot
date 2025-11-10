import ChatWidget from './components/ChatWidget';
import DarkVeil from './components/DarkVeil';

function App() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* 🔮 Full-screen DarkVeil background */}
      <div className="fixed inset-0 -z-30">
        <DarkVeil />
      </div>

      {/* 🌟 All content above the animation */}
      <div className="relative z-0 min-h-screen">
        <header className="bg-black/30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MEC</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Mahendra Engineering College</h1>
                  <p className="text-sm">Excellence in Education</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Welcome to Mahendra Engineering College
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Empowering minds, shaping futures. Discover world-class education with cutting-edge facilities and expert faculty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black/40 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Admissions</h3>
              <p>
                Join our community of scholars. Application process made simple and transparent.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Programs</h3>
              <p>
                Wide range of undergraduate and postgraduate programs across all disciplines.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Placements</h3>
              <p>
                Top-tier companies recruit our graduates. 95% placement record year after year.
              </p>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl shadow-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
              <p className="mb-6">
                Our AI assistant is here to help! Click the chat button in the bottom-right corner to get instant answers about admissions, courses, campus life, and more.
              </p>
            </div>
          </div>
        </main>

        {/* 💬 ChatWidget floating above all */}
        <ChatWidget />
      </div>
    </div>
  );
}

export default App;
