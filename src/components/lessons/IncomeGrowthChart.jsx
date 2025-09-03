import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Play, Pause, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const IncomeGrowthChart = () => {
  const [animatedData, setAnimatedData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chartData = [
    { year: 'Year 5', income: 50000, displayValue: '₹50,000' },
    { year: 'Year 10', income: 120000, displayValue: '₹1,20,000' },
    { year: 'Year 15', income: 200000, displayValue: '₹2,00,000' },
    { year: 'Year 20', income: 350000, displayValue: '₹3,50,000' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animationDuration = 1200;
      const steps = 50;
      const stepDuration = animationDuration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        const animated = chartData.map(item => ({
          ...item,
          income: Math.floor(item.income * progress)
        }));

        setAnimatedData(animated);

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedData(chartData);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2">
          <p className="font-semibold text-sm text-gray-800">{label}</p>
          <p className="text-indigo-600 font-bold text-md">
            {data.displayValue}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = "This chart shows your guaranteed income growth. By Year 5: ₹50,000, Year 10: ₹1,20,000, Year 15: ₹2,00,000, and Year 20: ₹3,50,000. This demonstrates long-term financial security.";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFullView = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Income Growth</h2>
            <p className="text-xs text-gray-500">Guaranteed returns over time</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSpeakToggle}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              {isSpeaking ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            <Button
              onClick={handleFullView}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={animatedData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="2 2" 
                  stroke="#e5e7eb" 
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="year" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 500, fill: '#374151' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  tickFormatter={formatYAxis}
                  width={40}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                />
                <Bar 
                  dataKey="income" 
                  fill="url(#gradient)"
                  radius={[3, 3, 0, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                  barSize={40}
                />
                
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights - Compact Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {chartData.map((item) => (
            <div 
              key={item.year}
              className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center hover:shadow-sm transition-all"
            >
              <div className="text-xs font-medium text-gray-600 mb-1">
                {item.year}
              </div>
              <div className="text-sm font-semibold text-indigo-600">
                {item.displayValue}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Summary */}
        <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
          <h4 className="text-xs font-semibold text-blue-800 mb-2 text-center">
            Investment Benefits
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 text-xs">📈</span>
              </div>
              <p className="text-[10px] text-blue-700">Growth</p>
            </div>
            <div className="space-y-1">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 text-xs">🛡️</span>
              </div>
              <p className="text-[10px] text-blue-700">Security</p>
            </div>
            <div className="space-y-1">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 text-xs">🎯</span>
              </div>
              <p className="text-[10px] text-blue-700">Goals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full View Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto p-4">
          <DialogHeader className="pb-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">Income Growth Chart</DialogTitle>
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {/* Chart in Modal */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 15,
                      right: 25,
                      left: 25,
                      bottom: 15,
                    }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#e5e7eb" 
                      opacity={0.5}
                    />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fontWeight: 600, fill: '#374151' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      tickFormatter={formatYAxis}
                      width={45}
                    />
                    <Tooltip 
                      content={<CustomTooltip />}
                      cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                    />
                    <Bar 
                      dataKey="income" 
                      fill="url(#gradient)"
                      radius={[4, 4, 0, 0]}
                      barSize={50}
                    />
                    
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Insights in Modal */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {chartData.map((item) => (
                <div 
                  key={item.year}
                  className="bg-white border border-gray-200 rounded-md p-3 text-center hover:shadow-sm transition-all"
                >
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {item.year}
                  </div>
                  <div className="text-md font-semibold text-indigo-600">
                    {item.displayValue}
                  </div>
                  <div className="text-xs text-gray-500">
                    Guaranteed
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits in Modal */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-3 text-center">
                Key Benefits
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 text-sm">📈</span>
                  </div>
                  <p className="text-xs font-medium text-blue-800">Growth</p>
                  <p className="text-[11px] text-blue-700">Steady increase</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 text-sm">🛡️</span>
                  </div>
                  <p className="text-xs font-medium text-blue-800">Security</p>
                  <p className="text-[11px] text-blue-700">Guaranteed</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-600 text-sm">🎯</span>
                  </div>
                  <p className="text-xs font-medium text-blue-800">Goals</p>
                  <p className="text-[11px] text-blue-700">Long-term</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeGrowthChart;