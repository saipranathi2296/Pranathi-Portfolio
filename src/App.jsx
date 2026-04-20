import { About } from './components/About'
import { Cursor } from './components/Cursor'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'

function App() {
  return (
    <>
      <Cursor />
      <Navbar />

      <main className="relative overflow-x-clip bg-[#0a0a0a] text-white md:pl-16 lg:pl-20">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,255,136,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_32%)]" />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
