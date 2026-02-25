import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightning, Robot, ShieldCheck, ChartLineUp, ArrowRight, Check, Star, Users, Cpu } from '@phosphor-icons/react';

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monthly');

  const features = [
    {
      icon: <Robot size={32} weight="duotone" />,
      title: "AI Agent Builder",
      description: "Create custom AI agents with no code. Choose from templates or build your own with advanced configurations."
    },
    {
      icon: <Lightning size={32} weight="duotone" />,
      title: "Claude Opus Thinking",
      description: "Powered by Claude Opus 4.5 with extended thinking. Watch the AI reason through complex problems."
    },
    {
      icon: <ShieldCheck size={32} weight="duotone" />,
      title: "Compliance Firewall",
      description: "Real-time data leak detection. Automatically scan and block PII, API keys, and sensitive data."
    },
    {
      icon: <ChartLineUp size={32} weight="duotone" />,
      title: "Analytics Dashboard",
      description: "Track usage, monitor threats blocked, and optimize your AI workflows with detailed insights."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for getting started",
      features: ["1 AI Agent", "100 Messages/month", "Basic Compliance Scan", "Community Support"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing teams",
      features: ["10 AI Agents", "Unlimited Messages", "Advanced Compliance", "Priority Support", "Custom Templates", "API Access"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/month",
      description: "For large organizations",
      features: ["Unlimited Agents", "Unlimited Everything", "Full Compliance Suite", "Dedicated Support", "Custom Integrations", "SLA Guarantee", "On-premise Option"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const stats = [
    { value: "150K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "10M+", label: "Messages/Day" },
    { value: "500+", label: "Enterprise Clients" }
  ];

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#7B2CBF] flex items-center justify-center">
              <Cpu size={24} weight="bold" className="text-black" />
            </div>
            <span className="text-xl font-bold font-['Syne']">SYNQRA</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#A1A1AA] hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-[#A1A1AA] hover:text-white transition-colors">Pricing</a>
            <Link to="/login" className="text-[#A1A1AA] hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="btn-primary" data-testid="nav-get-started">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 hero-glow overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Star size={16} weight="fill" className="text-[#00E5FF]" />
              <span className="text-sm text-[#A1A1AA]">Powered by Claude Opus 4.5 Extended Thinking</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-['Syne'] mb-6 leading-tight">
              The World's Most<br />
              <span className="gradient-text">Powerful AI Platform</span>
            </h1>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10">
              Build autonomous AI agents, scan for data leaks, and automate your workflows. 
              Enterprise-grade security with consumer-grade simplicity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/register')} 
                className="btn-primary flex items-center gap-2 text-lg"
                data-testid="hero-get-started"
              >
                Start Building Free <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/login')} 
                className="btn-secondary text-lg"
                data-testid="hero-watch-demo"
              >
                View Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold font-['Syne'] gradient-text">{stat.value}</div>
              <div className="text-[#A1A1AA] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-['Syne'] mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
              From AI chat to compliance scanning, SYNQRA has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-8 hover:border-[#00E5FF]/50 transition-all duration-300 group"
                data-testid={`feature-card-${index}`}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7B2CBF]/20 flex items-center justify-center mb-6 text-[#00E5FF] group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-['Syne'] mb-3">{feature.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7B2CBF]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-['Syne'] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-8">
              Start free, scale as you grow. No hidden fees.
            </p>
            <div className="inline-flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'monthly' ? 'bg-[#00E5FF] text-black font-semibold' : 'text-[#A1A1AA]'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'yearly' ? 'bg-[#00E5FF] text-black font-semibold' : 'text-[#A1A1AA]'}`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card rounded-xl p-8 relative ${plan.popular ? 'border-[#00E5FF] ring-1 ring-[#00E5FF]/50' : ''}`}
                data-testid={`pricing-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00E5FF] text-black text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold font-['Syne'] mb-2">{plan.name}</h3>
                <p className="text-[#A1A1AA] mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold font-['Syne']">
                    {activeTab === 'yearly' && plan.price !== "$0" 
                      ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                      : plan.price}
                  </span>
                  <span className="text-[#A1A1AA]">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#A1A1AA]">
                      <Check size={18} weight="bold" className="text-[#00E5FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(plan.name === 'Enterprise' ? '/contact' : '/register')}
                  className={`w-full py-3 rounded-full font-semibold transition-all ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-[#7B2CBF]/10 pointer-events-none" />
            <div className="relative z-10">
              <Users size={48} weight="duotone" className="text-[#00E5FF] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold font-['Syne'] mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using SYNQRA to automate workflows and protect their data.
              </p>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-lg px-10"
                data-testid="cta-get-started"
              >
                Get Started for Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#7B2CBF] flex items-center justify-center">
              <Cpu size={18} weight="bold" className="text-black" />
            </div>
            <span className="font-bold font-['Syne']">SYNQRA</span>
          </div>
          <div className="flex items-center gap-8 text-[#A1A1AA]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-[#A1A1AA] text-sm">© 2026 SYNQRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
