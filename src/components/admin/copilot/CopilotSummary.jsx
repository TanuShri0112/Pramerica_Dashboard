import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CopilotSummary = () => {
  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Summary</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your Copilot usage and savings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium mb-2">Total Credits Used</h3>
          <p className="text-3xl font-bold">12,450</p>
          <p className="text-sm text-muted-foreground mt-1">+20% from last month</p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium mb-2">Total Cost</h3>
          <p className="text-3xl font-bold">$124.50</p>
          <p className="text-sm text-muted-foreground mt-1">+15% from last month</p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium mb-2">Courses Created</h3>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-muted-foreground mt-1">+4 from last month</p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="font-medium mb-4">Monthly Usage</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border space-y-4">
        <h3 className="font-medium">Cost Savings</h3>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 font-medium border-r">Metric</div>
          <div className="p-4 font-medium">Value</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Average time saved per course</div>
          <div className="p-4">320 hours</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Cost per hour saved</div>
          <div className="p-4">$35</div>
        </div>
        
        <div className="grid grid-cols-2">
          <div className="p-4 border-r">Estimated cost savings per course due to Copilot</div>
          <div className="p-4">$11,200</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <h3 className="font-medium">Here are the assumptions and calculations:</h3>
        <p>Each hour of content takes about 40 hours to create. <span className="text-primary">[reference]</span></p>
        <p>A basic course module (3 sections of content and 4 assessments) represents about 1 hour of instructional content.</p>
        <p>A typical course has 10 modules.</p>
        <p>A typical instructional designer in the USA costs around $35/hour. <span className="text-primary">[reference]</span></p>
        <p>Without Copilot, a course with 10 modules would therefore take about 10 x 40 = 400 hours to create, and cost 400 x $35 = $14,000</p>
        <p>With Copilot doing 80% of the work for a few dollars, a course would take about 10 x 40 x 20% = 80 hours to create and cost 400 x $35 x 20% = $2,800</p>
        <p>Copilot thus saves you around 320 hours and $11,200 per course.</p>
      </div>
    </div>
  );
};

export default CopilotSummary;