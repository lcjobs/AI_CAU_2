import React, { useState } from 'react';
import { X, Lock, User, Loader2, Building2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 模拟网络请求
    setTimeout(() => {
      setIsLoading(false);
      alert('模拟登录成功！\n(此处功能仅为演示，实际需对接CAU统一身份认证API)');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <div className="bg-green-800 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            统一身份认证
          </h3>
          <button onClick={onClose} className="text-green-100 hover:text-white transition-colors bg-green-700/50 p-1 rounded-full hover:bg-green-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4 ring-4 ring-green-50">
               <span className="text-2xl font-bold text-green-700">CAU</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">欢迎登录校园网</h2>
            <p className="text-stone-500 text-sm mt-1">请使用学号/工号和密码登录</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">学号 / 工号</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-stone-400 group-focus-within:text-green-600 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                  placeholder="请输入您的学号"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">密码</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400 group-focus-within:text-green-600 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                  placeholder="请输入校园网密码"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  正在认证...
                </>
              ) : (
                '立即登录'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 flex justify-between text-xs text-stone-500">
            <a href="#" className="hover:text-green-700 hover:underline">忘记密码?</a>
            <span>遇到问题请联系信电中心</span>
          </div>
        </div>
      </div>
    </div>
  );
};