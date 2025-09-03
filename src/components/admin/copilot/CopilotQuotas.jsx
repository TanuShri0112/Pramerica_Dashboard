import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CopilotQuotas = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Quotas</h3>
        <p className="text-sm text-muted-foreground">
          Set the monthly quotas for your organization.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quota-type">Quota Type</Label>
            <Select>
              <SelectTrigger id="quota-type">
                <SelectValue placeholder="Select quota type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credits">Credits</SelectItem>
                <SelectItem value="dollars">Dollars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quota-amount">Amount</Label>
            <Input id="quota-amount" type="number" placeholder="Enter amount" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quota-period">Period</Label>
            <Select>
              <SelectTrigger id="quota-period">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CopilotQuotas;