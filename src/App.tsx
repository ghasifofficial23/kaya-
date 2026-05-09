/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { History } from './components/History';
import { Awards } from './components/Awards';
import { Dishes } from './components/Dishes';
import { Menu } from './components/Menu';
import { Reservations } from './components/Reservations';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#1A1612] text-[#F5EFE0] cursor-none">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="app">
            <Navbar />
            <main>
              <Hero />
              <History />
              <Awards />
              <Dishes />
              <Menu />
              <Reservations />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
