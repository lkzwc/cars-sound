"use client";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 右上微弱暖光 */}
      <div className="absolute -top-40 -right-20 w-[700px] h-[700px] bg-amber-400/6 rounded-full blur-[150px]" />
      {/* 左下微弱冷光 */}
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-slate-500/4 rounded-full blur-[140px]" />
    </div>
  );
}
