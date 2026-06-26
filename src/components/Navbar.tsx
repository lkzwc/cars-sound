'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: '首页', href: '/' },
    { name: '语音包定制', href: '/custom' },
    { name: '车载音乐', href: '/music' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d18]/85 backdrop-blur-2xl border-b border-white/[0.06]">
      {/* 顶部微光细线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/25 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group hover:scale-120 transition-opacity">
            <div className="relative w-30 h-28 flex items-center justify-center rounded-xl overflow-hidden">
              <img src="/logo.png" alt="CarSound" className="relative w-full h-full object-contain" />
            </div>
            <span className="relative text-xl font-bold text-white tracking-tight -ml-6">
              Car<span className="text-pink-400">Sound</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'text-pink-400 bg-pink-500/10'
                      : 'text-slate-400 hover:text-pink-300 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  {item.name}
                  {/* 激活态底部指示条 */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-pink-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.06] space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'text-pink-400 bg-pink-500/10'
                      : 'text-slate-400 hover:text-pink-300 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
