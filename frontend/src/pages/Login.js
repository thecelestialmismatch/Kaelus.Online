import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Eye, EyeSlash, ArrowRight, SpinnerGap } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#7B2CBF] flex items-center justify-center">
              <Cpu size={24} weight="bold" className="text-black" />
            </div>
            <span className="text-xl font-bold font-['Syne']">SYNQRA</span>
          </Link>

          <h1 className="text-3xl font-bold font-['Syne'] mb-2">Welcome back</h1>
          <p className="text-[#A1A1AA] mb-8">Sign in to continue to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field w-full"
                placeholder="you@company.com"
                data-testid="login-email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field w-full pr-12"
                  placeholder="••••••••"
                  data-testid="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#27272A] bg-transparent" />
                <span className="text-sm text-[#A1A1AA]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#00E5FF] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
              data-testid="login-submit"
            >
              {loading ? (
                <SpinnerGap size={20} className="animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center text-[#A1A1AA] mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#00E5FF] hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-[#00E5FF]/10 to-[#7B2CBF]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1771875802948-0d0f3424fe6d?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#7B2CBF] flex items-center justify-center mx-auto mb-8 glow-primary">
              <Cpu size={48} weight="bold" className="text-black" />
            </div>
            <h2 className="text-3xl font-bold font-['Syne'] mb-4">The Future of AI Agents</h2>
            <p className="text-[#A1A1AA] max-w-sm mx-auto">
              Build, deploy, and monitor AI agents with enterprise-grade security and compliance.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
