import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🎵</div>
        <h1 className="text-4xl font-bold text-white mb-4">分类不存在</h1>
        <p className="text-slate-400 mb-8">该分类可能已被删除或不存在</p>
        <Link 
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
