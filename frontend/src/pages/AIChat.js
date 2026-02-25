import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperPlaneRight, Robot, User, Plus, Trash, Clock, 
  SpinnerGap, Brain, Code, CaretDown 
} from '@phosphor-icons/react';
import { chatAPI, agentsAPI } from '../lib/api';
import { toast } from 'sonner';

const AIChat = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchSessions();
    fetchAgents();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSessions = async () => {
    try {
      const response = await chatAPI.getSessions();
      setSessions(response.data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await agentsAPI.getAll();
      setAgents(response.data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  };

  const loadSession = async (sessionId) => {
    try {
      const response = await chatAPI.getHistory(sessionId);
      setMessages(response.data);
      setCurrentSession(sessionId);
    } catch (error) {
      toast.error('Failed to load chat history');
    }
  };

  const startNewChat = () => {
    setCurrentSession(null);
    setMessages([]);
    setInput('');
    inputRef.current?.focus();
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    try {
      await chatAPI.deleteSession(sessionId);
      setSessions(sessions.filter(s => s.session_id !== sessionId));
      if (currentSession === sessionId) {
        startNewChat();
      }
      toast.success('Chat deleted');
    } catch (error) {
      toast.error('Failed to delete chat');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message immediately
    const tempUserMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const response = await chatAPI.send({
        message: userMessage,
        session_id: currentSession,
        agent_id: selectedAgent?.id
      });

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        thinking: response.data.thinking,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMsg]);
      setCurrentSession(response.data.session_id);
      
      // Refresh sessions list
      fetchSessions();
    } catch (error) {
      toast.error('Failed to send message');
      // Remove the temp user message on error
      setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id));
    } finally {
      setLoading(false);
    }
  };

  const formatCode = (content) => {
    // Simple code block detection and formatting
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
      }
      // Add code block
      parts.push({ type: 'code', language: match[1] || 'text', content: match[2] });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  const MessageContent = ({ content }) => {
    const parts = formatCode(content);
    return (
      <>
        {parts.map((part, index) => (
          part.type === 'code' ? (
            <div key={index} className="my-3">
              <div className="flex items-center justify-between bg-black/50 px-3 py-1.5 rounded-t-lg border-b border-white/10">
                <span className="text-xs text-[#A1A1AA] flex items-center gap-1.5">
                  <Code size={14} />
                  {part.language}
                </span>
              </div>
              <pre className="code-block rounded-t-none overflow-x-auto">
                <code className="text-sm text-[#00E5FF]">{part.content}</code>
              </pre>
            </div>
          ) : (
            <p key={index} className="whitespace-pre-wrap">{part.content}</p>
          )
        ))}
      </>
    );
  };

  return (
    <div className="h-[calc(100vh-100px)] flex gap-6" data-testid="ai-chat">
      {/* Sidebar - Sessions */}
      <div className="w-72 flex-shrink-0 flex flex-col">
        <button
          onClick={startNewChat}
          className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
          data-testid="new-chat-btn"
        >
          <Plus size={18} weight="bold" />
          New Chat
        </button>

        {/* Agent Selector */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowAgentDropdown(!showAgentDropdown)}
            className="w-full glass-card rounded-lg p-3 flex items-center justify-between hover:border-[#00E5FF]/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Robot size={18} className="text-[#00E5FF]" />
              <span className="text-sm truncate">
                {selectedAgent ? selectedAgent.name : 'Default Assistant'}
              </span>
            </div>
            <CaretDown size={16} className={`text-[#A1A1AA] transition-transform ${showAgentDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showAgentDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 glass-card rounded-lg overflow-hidden z-10"
              >
                <button
                  onClick={() => { setSelectedAgent(null); setShowAgentDropdown(false); }}
                  className="w-full p-3 text-left text-sm hover:bg-white/5 flex items-center gap-2"
                >
                  <Robot size={16} className="text-[#A1A1AA]" />
                  Default Assistant
                </button>
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => { setSelectedAgent(agent); setShowAgentDropdown(false); }}
                    className="w-full p-3 text-left text-sm hover:bg-white/5 flex items-center gap-2 border-t border-white/5"
                  >
                    <Robot size={16} className="text-[#00E5FF]" />
                    {agent.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto space-y-1">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-[#A1A1AA]">
              <Clock size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chat history yet</p>
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session.session_id}
                onClick={() => loadSession(session.session_id)}
                className={`w-full p-3 rounded-lg text-left group flex items-start justify-between transition-colors ${
                  currentSession === session.session_id 
                    ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/30' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{session.last_message}...</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">{session.message_count} messages</p>
                </div>
                <button
                  onClick={(e) => deleteSession(session.session_id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                >
                  <Trash size={16} />
                </button>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-card rounded-xl flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7B2CBF]/20 flex items-center justify-center mb-6">
                <Brain size={40} weight="duotone" className="text-[#00E5FF]" />
              </div>
              <h3 className="text-xl font-bold font-['Syne'] mb-2">Start a Conversation</h3>
              <p className="text-[#A1A1AA] max-w-md">
                Chat with Claude Opus 4.5 - powered by extended thinking for complex reasoning and problem-solving.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-[#7B2CBF]' 
                    : 'bg-gradient-to-br from-[#00E5FF] to-[#00E5FF]/50'
                }`}>
                  {message.role === 'user' 
                    ? <User size={20} className="text-white" />
                    : <Robot size={20} className="text-black" />
                  }
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  {message.thinking && (
                    <div className="mb-3 p-3 rounded-lg bg-[#7B2CBF]/10 border border-[#7B2CBF]/30">
                      <div className="flex items-center gap-2 text-[#7B2CBF] text-sm mb-2">
                        <Brain size={16} />
                        <span className="font-medium">Thinking...</span>
                      </div>
                      <p className="text-sm text-[#A1A1AA] mono">{message.thinking}</p>
                    </div>
                  )}
                  <div className={`rounded-xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-[#7B2CBF]/20 border border-[#7B2CBF]/30 inline-block' 
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <MessageContent content={message.content} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#00E5FF]/50 flex items-center justify-center">
                <Robot size={20} className="text-black" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#A1A1AA]">
                  <SpinnerGap size={18} className="animate-spin" />
                  <span className="thinking-dots">Thinking</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-4 border-t border-white/5">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input-field flex-1"
              disabled={loading}
              data-testid="chat-input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="chat-send"
            >
              <PaperPlaneRight size={20} weight="fill" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
