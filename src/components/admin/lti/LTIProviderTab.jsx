import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PolicySection from '../policies/PolicySection';
import PolicyItem from '../policies/PolicyItem';

const LTIProviderTab = () => {
  const handleSave = (id, value) => {
    console.log(`Saving ${id} with value:`, value);
    // Add your save logic here
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LTI Provider Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ltiKey">LTI Key</Label>
            <Input id="ltiKey" placeholder="Enter LTI key" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ltiSecret">LTI Secret</Label>
            <Input id="ltiSecret" type="password" placeholder="Enter LTI secret" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ltiLaunchUrl">LTI Launch URL</Label>
            <Input id="ltiLaunchUrl" placeholder="https://example.com/lti/launch" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ltiDescription">Description</Label>
            <Textarea id="ltiDescription" placeholder="Enter description" rows={3} />
          </div>
        </CardContent>
      </Card>

      <PolicySection title="LTI Provider Policies">
        <PolicyItem 
          id="ltiEnabled" 
          label="Enable LTI Provider" 
          type="checkbox" 
          initialValue={true} 
          onSave={handleSave} 
        />
        <PolicyItem 
          id="ltiAutoCreateAccounts" 
          label="Automatically create accounts at LTI launch." 
          type="checkbox" 
          initialValue={false} 
          onSave={handleSave} 
        />
      </PolicySection>
    </div>
  );
};

export default LTIProviderTab;