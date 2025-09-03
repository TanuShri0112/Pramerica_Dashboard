import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const ScenarioSimulation = () => {
  const navigate = useNavigate();
  const [selectedActions, setSelectedActions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  const scenario = {
    title: "Database Server Crisis Management",
    situation:
      "You are the Lead Database Administrator for an e-commerce company. It's Black Friday, and your primary database server has started showing critical performance issues.",
    metrics: [
      { label: "CPU Usage", value: "95%", status: "critical" },
      { label: "Memory", value: "89%", status: "critical" },
      { label: "Disk I/O", value: "92%", status: "critical" },
      { label: "Connections", value: "98%", status: "critical" },
      { label: "Response Time", value: "8500ms", status: "critical" }
    ],
    symptoms: [
      "Customer complaints about slow checkout process",
      "API response times exceeding 8 seconds",
      "Connection pool nearly exhausted",
      "Sales dropping by 30% in the last hour"
    ]
  };

  const availableActions = [
    {
      id: 'restart',
      title: 'Restart Database Server',
      description: 'Full server restart to clear memory leaks',
      impact: '5-10 minutes downtime',
      cost: '$50,000 revenue loss',
      riskLevel: 'High Risk',
      effectiveness: 70
    },
    {
      id: 'replicas',
      title: 'Enable Read Replicas',
      description: 'Redirect read queries to replica servers',
      impact: '2 minutes to implement',
      cost: '$200/hour infrastructure',
      riskLevel: 'Medium Risk',
      effectiveness: 85
    },
    {
      id: 'queries',
      title: 'Kill Long-Running Queries',
      description: 'Identify and terminate resource-heavy queries',
      impact: 'Immediate effect',
      cost: 'No additional cost',
      riskLevel: 'Low Risk',
      effectiveness: 60
    },
    {
      id: 'scaling',
      title: 'Vertical Scaling',
      description: 'Increase server RAM and CPU resources',
      impact: '3-5 minutes to apply',
      cost: '$500/hour infrastructure',
      riskLevel: 'Medium Risk',
      effectiveness: 80
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleActionToggle = (actionId) => {
    setSelectedActions((prev) =>
      prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]
    );
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High Risk':
        return 'text-red-600 bg-red-100';
      case 'Medium Risk':
        return 'text-orange-600 bg-orange-100';
      case 'Low Risk':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return null;
    }
  };

  const calculateEffectiveness = () => {
    if (selectedActions.length === 0) return 0;
    const selected = availableActions.filter((action) => selectedActions.includes(action.id));
    let total = 0;
    selected.forEach((a) => (total += a.effectiveness));
    return Math.min(100, total * 0.8); // diminishing returns
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setSelectedActions([]);
    setIsCompleted(false);
    setTimeRemaining(1800);
  };

  if (isCompleted) {
    const effectiveness = calculateEffectiveness();
    let grade = 'F';
    if (effectiveness >= 90) grade = 'A';
    else if (effectiveness >= 80) grade = 'B';
    else if (effectiveness >= 70) grade = 'C';
    else if (effectiveness >= 60) grade = 'D';

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Simulation Completed!</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">{grade}</div>
              <p className="text-lg mb-4">Solution Effectiveness: {effectiveness.toFixed(1)}%</p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Actions Selected:</span> {selectedActions.length} out of {availableActions.length}
                </p>
              </div>
              <div className="space-y-4">
                <Button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700">
                  Restart Simulation
                </Button>
                <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="outline" className="w-full">
                  Back to Assessments
                </Button>
                <Button onClick={() => navigate('/courses/modules')} variant="outline" className="w-full">
                  Go to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/courses/modules/1/assessments')} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Scenario Simulation</h1>
                <p className="text-gray-600">Question 1 of 1</p>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Critical
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Scenario */}
        <Card className="mb-6 border-l-4 border-l-red-500">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-red-700">{scenario.title}</h2>
              <Badge className="bg-red-100 text-red-800 ml-auto">Critical</Badge>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{scenario.situation}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {scenario.metrics.map((metric, i) => (
                <div key={i} className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="text-lg font-bold text-red-600">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Symptoms */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-red-700 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Current Symptoms
              </h3>
              <ul className="space-y-2">
                {scenario.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-red-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6">Available Actions</h2>
            <p className="text-gray-600 mb-6">
              Select the actions you want to take to resolve the crisis. Consider the risks, costs, and effectiveness of each action. You can select multiple actions to execute simultaneously.
            </p>

            <div className="space-y-4">
              {availableActions.map((action) => (
                <div
                  key={action.id}
                  className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                    selectedActions.includes(action.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleActionToggle(action.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={selectedActions.includes(action.id)}
                        onChange={() => handleActionToggle(action.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{action.title}</h3>
                          <Badge className={getRiskColor(action.riskLevel)}>{action.riskLevel}</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{action.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-blue-700">Impact:</span>
                            <p className="text-blue-600">{action.impact}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-700">Cost:</span>
                            <p className="text-green-600">{action.cost}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedActions.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  Estimated Solution Effectiveness: {calculateEffectiveness().toFixed(1)}%
                </h4>
                <p className="text-sm text-blue-700">
                  Based on your selected actions, this is the projected effectiveness of your crisis management approach.
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Instructions:</span> Analyze the situation and select appropriate actions to resolve the database crisis.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <span className="text-sm text-gray-500">Auto-save enabled</span>
          <Button onClick={handleComplete} disabled={selectedActions.length === 0} className="bg-yellow-600 hover:bg-yellow-700">
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulation;
