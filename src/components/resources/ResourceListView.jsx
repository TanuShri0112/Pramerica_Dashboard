import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export function ResourceListView({ resources, onResourceClick }) {
  const [selectedResources, setSelectedResources] = useState([]);

  const handleSelectResource = (id, checked) => {
    if (checked) {
      setSelectedResources(prev => [...prev, id]);
    } else {
      setSelectedResources(prev => prev.filter(resourceId => resourceId !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedResources(resources.map(r => r.id));
    } else {
      setSelectedResources([]);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/30">
          <tr>
            <th className="w-10 p-3 text-left">
              <Checkbox 
                checked={selectedResources.length > 0 && selectedResources.length === resources.length}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </th>
            <th className="p-3 text-left font-medium">#</th>
            <th className="p-3 text-left font-medium">Resource</th>
            <th className="p-3 text-left font-medium">Tags</th>
            <th className="p-3 text-left font-medium">Creator</th>
            <th className="p-3 text-left font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-8 text-center text-muted-foreground">
                No resources available. Click "Add" to create a new resource.
              </td>
            </tr>
          ) : (
            resources.map((resource, index) => (
              <tr key={resource.id} 
                className="border-t hover:bg-muted/10 cursor-pointer"
                onClick={() => onResourceClick(resource)}
              >
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedResources.includes(resource.id)}
                    onCheckedChange={(checked) => handleSelectResource(resource.id, !!checked)}
                  />
                </td>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="font-medium text-blue-600">{resource.title}</span>
                      {resource.content?.library?.type && (
                        <span className="text-xs text-gray-500">
                          {resource.content.library.type} • {resource.content.library.scope}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {resource.content?.metadata?.tags?.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                        {tag}
                      </Badge>
                    ))}
                    {(resource.content?.metadata?.tags?.length || 0) > 3 && (
                      <Badge variant="secondary" className="bg-gray-100">
                        +{(resource.content?.metadata?.tags?.length || 0) - 3}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-3">{resource.author}</td>
                <td className="p-3">{resource.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}