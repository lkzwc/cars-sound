"use client";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 增强的霓虹光晕 - 更大更亮 */}
      <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-pink-500/40 rounded-full blur-[130px] animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-cyan-400/40 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-purple-500/35 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-violet-500/25 rounded-full blur-[160px]" />

      {/* 顶部暖光 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-amber-500/20 to-transparent" />

      {/* 霓虹线条 - 更亮 */}
      <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/80 to-transparent animate-pulse" />
      <div className="absolute top-2/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-pulse" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/80 to-transparent animate-pulse" style={{ animationDelay: "0.6s" }} />

      {/* 赛博朋克网格 - 更清晰 */}
      <div className="absolute inset-0 opacity-[0.25]" style={{
        backgroundImage: `
          linear-gradient(rgba(236, 72, 153, 0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(236, 72, 153, 0.35) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        transform: "perspective(500px) rotateX(60deg)",
        transformOrigin: "center top"
      }} />

      {/* 浮动粒子 */}
      <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
      <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.8)]" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.8)]" style={{ animationDelay: "1.4s" }} />
    </div>
  );
}
