import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, BarChart3, PieChart, TrendingUp } from 'lucide-react';

export const ChartEditor = ({ open, onOpenChange, content, onSave }) => {
  const [chartType, setChartType] = useState(content?.chartType || 'bar');
  const [title, setTitle] = useState(content?.title || 'Chart Title');
  const [data, setData] = useState(content?.data || [
    { label: 'Item 1', value: 30 },
    { label: 'Item 2', value: 50 },
    { label: 'Item 3', value: 20 }
  ]);

  useEffect(() => {
    if (content) {
      setChartType(content.chartType || 'bar');
      setTitle(content.title || 'Chart Title');
      setData(content.data || [
        { label: 'Item 1', value: 30 },
        { label: 'Item 2', value: 50 },
        { label: 'Item 3', value: 20 }
      ]);
    }
  }, [content]);

  const addDataPoint = () => {
    setData([...data, { label: `Item ${data.length + 1}`, value: 0 }]);
  };

  const removeDataPoint = (index) => {
    if (data.length > 1) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  const updateDataPoint = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleSave = () => {
    const chartContent = {
      chartType,
      title,
      data: data.filter(item => item.label.trim() && item.value >= 0)
    };
    onSave(chartContent);
    onOpenChange(false);
  };

  const getChartIcon = () => {
    switch (chartType) {
      case 'bar': return <BarChart3 className="h-5 w-5" />;
      case 'pie': return <PieChart className="h-5 w-5" />;
      case 'line': return <TrendingUp className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getChartIcon()}
            <span>Edit Chart</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <Label htmlFor="chartType" className="text-sm font-medium">Chart Type</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Bar Chart</span>
                  </div>
                </SelectItem>
                <SelectItem value="pie">
                  <div className="flex items-center space-x-2">
                    <PieChart className="h-4 w-4" />
                    <span>Pie Chart</span>
                  </div>
                </SelectItem>
                <SelectItem value="line">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Line Chart</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title" className="text-sm font-medium">Chart Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter chart title"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Chart Data</Label>
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Input
                      value={item.label}
                      onChange={(e) => updateDataPoint(index, 'label', e.target.value)}
                      placeholder="Label"
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateDataPoint(index, 'value', parseFloat(e.target.value) || 0)}
                      placeholder="Value"
                      min="0"
                    />
                  </div>
                  {data.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeDataPoint(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addDataPoint}
              className="mt-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Data Point
            </Button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Chart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChartEditor;