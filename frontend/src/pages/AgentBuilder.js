import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Robot, Plus, Trash, Pencil, X, Code, ChartBar, 
  Headset, PencilLine, SpinnerGap, Check, Sliders 
} from '@phosphor-icons/react';
import { agentsAPI } from '../lib/api';
import { toast } from 'sonner';

const TEMPLATES = {
  code_assistant: { icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  data_analyst: { icon: ChartBar, color: 'text-green-400', bg: 'bg-green-500/20' },
  customer_support: { icon: Headset, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  content_writer: { icon: PencilLine, color: 'text-pink-400', bg: 'bg-pink-500/20' },
  custom: { icon: Robot, color: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/20' }
};

const AgentBuilder = () => {
  const [agents, setAgents] = useState([]);
  const [templates, setTemplates] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    system_prompt: '',
    model: 'claude-opus-4-5-20251101',
    temperature: 0.7,
    template: 'custom'
  });

  const models = [
    { value: 'claude-opus-4-5-20251101', label: 'Claude Opus 4.5 (Most Capable)' },
    { value: 'claude-sonnet-4-5-20250929', label: 'Claude Sonnet 4.5 (Balanced)' },
    { value: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5 (Fast)' },
    { value: 'gpt-5.2', label: 'GPT-5.2 (OpenAI)' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [agentsRes, templatesRes] = await Promise.all([
        agentsAPI.getAll(),
        agentsAPI.getTemplates()
      ]);
      setAgents(agentsRes.data);
      setTemplates(templatesRes.data);
    } catch (error) {
      toast.error('Failed to load agents');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (agent = null) => {
    if (agent) {
      setEditingAgent(agent);
      setFormData({
        name: agent.name,
        description: agent.description,
        system_prompt: agent.system_prompt,
        model: agent.model,
        temperature: agent.temperature,
        template: agent.template
      });
    } else {
      setEditingAgent(null);
      setFormData({
        name: '',
        description: '',
        system_prompt: '',
        model: 'claude-opus-4-5-20251101',
        temperature: 0.7,
        template: 'custom'
      });
    }
    setShowModal(true);
  };

  const applyTemplate = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      setFormData({
        ...formData,
        name: template.name,
        description: template.description,
        system_prompt: template.system_prompt,
        template: templateKey
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.system_prompt) {
      toast.error('Name and system prompt are required');
      return;
    }

    try {
      if (editingAgent) {
        await agentsAPI.update(editingAgent.id, formData);
        toast.success('Agent updated successfully');
      } else {
        await agentsAPI.create(formData);
        toast.success('Agent created successfully');
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const deleteAgent = async (agentId) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) return;
    
    try {
      await agentsAPI.delete(agentId);
      setAgents(agents.filter(a => a.id !== agentId));
      toast.success('Agent deleted');
    } catch (error) {
      toast.error('Failed to delete agent');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="agent-builder">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-['Syne'] mb-2">AI Agents</h1>
          <p className="text-[#A1A1AA]">Create and manage your custom AI agents</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
          data-testid="create-agent-btn"
        >
          <Plus size={18} weight="bold" />
          Create Agent
        </button>
      </div>

      {/* Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Start Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(templates).map(([key, template]) => {
            const config = TEMPLATES[key] || TEMPLATES.custom;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { applyTemplate(key); setShowModal(true); }}
                className="glass-card rounded-xl p-5 text-left hover:border-[#00E5FF]/30 transition-colors group"
                data-testid={`template-${key}`}
              >
                <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <config.icon size={24} weight="duotone" className={config.color} />
                </div>
                <h4 className="font-semibold mb-1">{template.name}</h4>
                <p className="text-sm text-[#A1A1AA] line-clamp-2">{template.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Agents Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Agents ({agents.length})</h3>
        {agents.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <Robot size={48} className="mx-auto mb-4 text-[#A1A1AA]" />
            <h4 className="text-lg font-semibold mb-2">No agents yet</h4>
            <p className="text-[#A1A1AA] mb-6">Create your first AI agent to get started</p>
            <button onClick={() => openModal()} className="btn-primary">
              Create Agent
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const config = TEMPLATES[agent.template] || TEMPLATES.custom;
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-xl p-5 group"
                  data-testid={`agent-${agent.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}>
                      <config.icon size={24} weight="duotone" className={config.color} />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openModal(agent)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Pencil size={16} className="text-[#A1A1AA]" />
                      </button>
                      <button
                        onClick={() => deleteAgent(agent.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      >
                        <Trash size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-1">{agent.name}</h4>
                  <p className="text-sm text-[#A1A1AA] mb-4 line-clamp-2">{agent.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                    <Sliders size={14} />
                    <span className="truncate">{models.find(m => m.value === agent.model)?.label || agent.model}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold font-['Syne']">
                  {editingAgent ? 'Edit Agent' : 'Create New Agent'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Template Quick Select */}
                {!editingAgent && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Start from Template</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(templates).map(([key, template]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => applyTemplate(key)}
                          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                            formData.template === key
                              ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {template.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field w-full"
                    placeholder="My Custom Agent"
                    data-testid="agent-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field w-full"
                    placeholder="What does this agent do?"
                    data-testid="agent-description-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">System Prompt</label>
                  <textarea
                    value={formData.system_prompt}
                    onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                    className="input-field w-full h-32 resize-none"
                    placeholder="You are a helpful assistant..."
                    data-testid="agent-prompt-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Model</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="input-field w-full"
                      data-testid="agent-model-select"
                    >
                      {models.map((model) => (
                        <option key={model.value} value={model.value}>
                          {model.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Temperature: {formData.temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                      className="w-full accent-[#00E5FF]"
                    />
                    <div className="flex justify-between text-xs text-[#A1A1AA] mt-1">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                    data-testid="agent-submit-btn"
                  >
                    <Check size={18} weight="bold" />
                    {editingAgent ? 'Update Agent' : 'Create Agent'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentBuilder;
