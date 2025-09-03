import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScormViewer } from './ScormViewer';

export const UnitViewer = () => {
  const { courseId, moduleId, unitId } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUnit = () => {
      const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
      const foundUnit = savedUnits.find((u) => u.id === unitId);
      
      if (foundUnit) {
        setUnit(foundUnit);
      }
      setLoading(false);
    };

    loadUnit();
  }, [unitId]);

  const handleBack = () => {
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/units`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading unit...</span>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Units
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Unit not found</h1>
            <p className="text-muted-foreground">The requested unit could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle SCORM units specifically
  if (unit.type === 'scorm' && unit.blocks.length > 0 && unit.blocks[0].type === 'scorm') {
    return (
      <div className="container mx-auto py-6">
        <ScormViewer
          scormData={unit.blocks[0].content}
          title={unit.title}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Handle regular units
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Units
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{unit.title}</h1>
          <p className="text-muted-foreground">{unit.description}</p>
        </div>
      </div>

      {/* Render unit content based on type */}
      <div className="space-y-6">
        {unit.blocks.map((block) => (
          <div key={block.id} className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Block: {block.type}</h3>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {JSON.stringify(block.content, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitViewer;