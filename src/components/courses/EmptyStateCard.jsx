import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmptyStateCard = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 bg-gray-100 rounded-full p-6 w-20 h-20 flex items-center justify-center">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-6">{description}</p>
        <Button onClick={onAction} className="w-full bg-ca-primary hover:bg-ca-secondary">
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;