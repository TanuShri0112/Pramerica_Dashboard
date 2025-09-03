import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Heading1, Heading2, Table, Plus, X } from 'lucide-react';

const textTypes = [
  {
    id: 'paragraph',
    name: 'Paragraph',
    description: 'Simple text paragraph',
    icon: <FileText className="h-6 w-6" />,
    preview: <p className="text-sm text-gray-700">This is a sample paragraph text that would appear in your lesson content.</p>
  },
  {
    id: 'heading-paragraph',
    name: 'Heading + Paragraph',
    description: 'Main heading with content',
    icon: <Heading1 className="h-6 w-6" />,
    preview: (
      <div>
        <h3 className="text-lg font-bold mb-2">Main Heading</h3>
        <p className="text-sm text-gray-700">Content paragraph goes here.</p>
      </div>
    )
  },
  {
    id: 'subheading-paragraph',
    name: 'Subheading + Paragraph',
    description: 'Subheading with content',
    icon: <Heading2 className="h-6 w-6" />,
    preview: (
      <div>
        <h4 className="text-base font-semibold mb-2">Subheading</h4>
        <p className="text-sm text-gray-700">Content paragraph goes here.</p>
      </div>
    )
  },
  {
    id: 'table',
    name: 'Table',
    description: 'Data in table format',
    icon: <Table className="h-6 w-6" />,
    preview: (
      <table className="w-full text-xs border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-2 py-1">Header 1</th>
            <th className="border border-gray-300 px-2 py-1">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-2 py-1">Data 1</td>
            <td className="border border-gray-300 px-2 py-1">Data 2</td>
          </tr>
        </tbody>
      </table>
    )
  }
];

export const TextTypeDialog = ({ open, onOpenChange, onSelectType, currentContent, onSave }) => {
  const [selectedType, setSelectedType] = useState(currentContent?.textType || 'paragraph');
  const [text, setText] = useState(currentContent?.text || '');
  const [heading, setHeading] = useState(currentContent?.heading || '');
  const [subheading, setSubheading] = useState(currentContent?.subheading || '');
  const [tableHeaders, setTableHeaders] = useState(currentContent?.tableData?.headers || ['Header 1', 'Header 2']);
  const [tableRows, setTableRows] = useState(currentContent?.tableData?.rows || [['Data 1', 'Data 2']]);
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState(currentContent?.backgroundVideoUrl || '');
  const [backgroundVideoMuted, setBackgroundVideoMuted] = useState(
    currentContent?.backgroundVideoMuted !== undefined ? currentContent.backgroundVideoMuted : true
  );
  const [backgroundVideoLoop, setBackgroundVideoLoop] = useState(
    currentContent?.backgroundVideoLoop !== undefined ? currentContent.backgroundVideoLoop : true
  );
  const [backgroundOverlay, setBackgroundOverlay] = useState(
    currentContent?.backgroundOverlay !== undefined ? currentContent.backgroundOverlay : true
  );

  useEffect(() => {
    if (currentContent) {
      setSelectedType(currentContent.textType || 'paragraph');
      setText(currentContent.text || '');
      setHeading(currentContent.heading || '');
      setSubheading(currentContent.subheading || '');
      setTableHeaders(currentContent.tableData?.headers || ['Header 1', 'Header 2']);
      setTableRows(currentContent.tableData?.rows || [['Data 1', 'Data 2']]);
      setBackgroundVideoUrl(currentContent.backgroundVideoUrl || '');
      setBackgroundVideoMuted(currentContent.backgroundVideoMuted !== undefined ? currentContent.backgroundVideoMuted : true);
      setBackgroundVideoLoop(currentContent.backgroundVideoLoop !== undefined ? currentContent.backgroundVideoLoop : true);
      setBackgroundOverlay(currentContent.backgroundOverlay !== undefined ? currentContent.backgroundOverlay : true);
    }
  }, [currentContent]);

  const handleSelectType = (type) => {
    setSelectedType(type);
    if (onSelectType && !currentContent) {
      onSelectType(type);
    }
  };

  const addTableColumn = () => {
    const newHeaders = [...tableHeaders, `Header ${tableHeaders.length + 1}`];
    const newRows = tableRows.map(row => [...row, `Data ${row.length + 1}`]);
    setTableHeaders(newHeaders);
    setTableRows(newRows);
  };

  const addTableRow = () => {
    const newRow = tableHeaders.map((_, index) => `Data ${index + 1}`);
    setTableRows([...tableRows, newRow]);
  };

  const updateTableHeader = (index, value) => {
    const newHeaders = [...tableHeaders];
    newHeaders[index] = value;
    setTableHeaders(newHeaders);
  };

  const updateTableCell = (rowIndex, cellIndex, value) => {
    const newRows = [...tableRows];
    newRows[rowIndex][cellIndex] = value;
    setTableRows(newRows);
  };

  const removeTableColumn = (index) => {
    if (tableHeaders.length > 1) {
      const newHeaders = tableHeaders.filter((_, i) => i !== index);
      const newRows = tableRows.map(row => row.filter((_, i) => i !== index));
      setTableHeaders(newHeaders);
      setTableRows(newRows);
    }
  };

  const removeTableRow = (index) => {
    if (tableRows.length > 1) {
      const newRows = tableRows.filter((_, i) => i !== index);
      setTableRows(newRows);
    }
  };

  const handleSave = () => {
    const content = {
      textType: selectedType,
      text,
      heading,
      subheading,
      backgroundVideoUrl,
      backgroundVideoMuted,
      backgroundVideoLoop,
      backgroundOverlay
    };

    if (selectedType === 'table') {
      content.tableData = {
        headers: tableHeaders,
        rows: tableRows
      };
    }

    if (onSave) {
      onSave(content);
    }
  };

  const renderEditor = () => {
    switch (selectedType) {
      case 'paragraph':
        return (
          <>
          <div className="space-y-4">
            <div>
              <Label>Paragraph Text</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your paragraph text here..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Background Video (optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setBackgroundVideoUrl(url);
                    }
                  }}
                />
                {backgroundVideoUrl && (
                  <Button variant="outline" size="sm" onClick={() => setBackgroundVideoUrl('')}>Remove</Button>
                )}
              </div>
              {backgroundVideoUrl && (
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundVideoMuted} onChange={(e) => setBackgroundVideoMuted(e.target.checked)} />
                    Muted
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundVideoLoop} onChange={(e) => setBackgroundVideoLoop(e.target.checked)} />
                    Loop
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundOverlay} onChange={(e) => setBackgroundOverlay(e.target.checked)} />
                    Dark overlay
                  </label>
                </div>
              )}
            </div>
          </div>
          {backgroundVideoUrl && (
            <div className="space-y-2">
              <Label>Background Video Preview</Label>
              <div className="relative rounded-lg overflow-hidden min-h-64 border">
                <video
                  src={backgroundVideoUrl}
                  autoPlay
                  muted={backgroundVideoMuted}
                  loop={backgroundVideoLoop}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {backgroundOverlay && <div className="absolute inset-0 bg-black/40" />}
                <div className="relative p-4">
                  <p className="text-white text-sm">This is how your paragraph text will appear over the video.</p>
                </div>
              </div>
            </div>
          )}
          </>
        );

      case 'heading-paragraph':
        return (
          <>
          <div className="space-y-4">
            <div>
              <Label>Heading</Label>
              <Input
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter main heading"
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your content here..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Background Video (optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setBackgroundVideoUrl(url);
                    }
                  }}
                />
                {backgroundVideoUrl && (
                  <Button variant="outline" size="sm" onClick={() => setBackgroundVideoUrl('')}>Remove</Button>
                )}
              </div>
              {backgroundVideoUrl && (
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundVideoMuted} onChange={(e) => setBackgroundVideoMuted(e.target.checked)} />
                    Muted
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundVideoLoop} onChange={(e) => setBackgroundVideoLoop(e.target.checked)} />
                    Loop
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundOverlay} onChange={(e) => setBackgroundOverlay(e.target.checked)} />
                    Dark overlay
                  </label>
                </div>
              )}
            </div>
          </div>
          {backgroundVideoUrl && (
            <div className="space-y-2">
              <Label>Background Video Preview</Label>
              <div className="relative rounded-lg overflow-hidden min-h-64 border">
                <video
                  src={backgroundVideoUrl}
                  autoPlay
                  muted={backgroundVideoMuted}
                  loop={backgroundVideoLoop}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {backgroundOverlay && <div className="absolute inset-0 bg-black/40" />}
                <div className="relative p-4">
                  <h3 className="text-white font-bold mb-2">{heading || 'Main Heading'}</h3>
                  <p className="text-white text-sm">This is how your content will appear over the video.</p>
                </div>
              </div>
            </div>
          )}
          </>
        );

      case 'subheading-paragraph':
        return (
          <>
          <div className="space-y-4">
            <div>
              <Label>Subheading</Label>
              <Input
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="Enter subheading"
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your content here..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Background Video (optional)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setBackgroundVideoUrl(url);
                    }
                  }}
                />
                {backgroundVideoUrl && (
                  <Button variant="outline" size="sm" onClick={() => setBackgroundVideoUrl('')}>Remove</Button>
                )}
              </div>
              {backgroundVideoUrl && (
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundVideoMuted} onChange={(e) => setBackgroundVideoMuted(e.target.checked)} />
                    Muted
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundVideoLoop} onChange={(e) => setBackgroundVideoLoop(e.target.checked)} />
                    Loop
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={backgroundOverlay} onChange={(e) => setBackgroundOverlay(e.target.checked)} />
                    Dark overlay
                  </label>
                </div>
              )}
            </div>
          </div>
          {backgroundVideoUrl && (
            <div className="space-y-2">
              <Label>Background Video Preview</Label>
              <div className="relative rounded-lg overflow-hidden min-h-64 border">
                <video
                  src={backgroundVideoUrl}
                  autoPlay
                  muted={backgroundVideoMuted}
                  loop={backgroundVideoLoop}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {backgroundOverlay && <div className="absolute inset-0 bg-black/40" />}
                <div className="relative p-4">
                  <h4 className="text-white font-semibold mb-2">{subheading || 'Subheading'}</h4>
                  <p className="text-white text-sm">This is how your content will appear over the video.</p>
                </div>
              </div>
            </div>
          )}
          </>
        );

      case 'table':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Table Structure</Label>
              <div className="space-x-2">
                <Button onClick={addTableColumn} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Column
                </Button>
                <Button onClick={addTableRow} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Row
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th key={index} className="p-2 border-r border-gray-200 last:border-r-0">
                        <div className="flex items-center space-x-1">
                          <Input
                            value={header}
                            onChange={(e) => updateTableHeader(index, e.target.value)}
                            className="text-xs h-8"
                            placeholder={`Header ${index + 1}`}
                          />
                          {tableHeaders.length > 1 && (
                            <Button
                              onClick={() => removeTableColumn(index)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-gray-200">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 border-r border-gray-200 last:border-r-0">
                          <div className="flex items-center space-x-1">
                            <Input
                              value={cell}
                              onChange={(e) => updateTableCell(rowIndex, cellIndex, e.target.value)}
                              className="text-xs h-8"
                              placeholder={`Data ${cellIndex + 1}`}
                            />
                            {cellIndex === 0 && tableRows.length > 1 && (
                              <Button
                                onClick={() => removeTableRow(rowIndex)}
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentContent && onSave) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit Text Content</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 max-h-[calc(80vh-140px)] overflow-y-auto">
            <div className="space-y-6 p-1 pr-4">
              <div>
                <Label>Text Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {textTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      onClick={() => handleSelectType(type.id)}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-600">{type.icon}</div>
                        <div>
                          <div className="font-medium text-xs">{type.name}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {renderEditor()}
            </div>
          </ScrollArea>

          <div className="flex justify-end space-x-3 pt-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Choose Text Type</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(80vh-140px)]">
            <div className="grid gap-4 py-4 pr-4">
              {textTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className="h-auto p-4 justify-start text-left hover:bg-blue-50"
                  onClick={() => handleSelectType(type.id)}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="text-blue-600 mt-1 flex-shrink-0">
                      {type.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                      <div className="border-t pt-2">
                        {type.preview}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};