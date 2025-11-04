import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Paperclip, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

export const SupportTicketSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    subject: '',
    priority: 'medium',
    category: 'technical',
    description: ''
  });

  const [attachments, setAttachments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support ticket submitted:', { ...formData, attachments });
    // Here you would typically send the data to your backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t.createSupportTicket}</h2>
        <p className="text-muted-foreground">
          {t.supportTicketDesc}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.newSupportTicket}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject">{t.subject}</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={language === 'en' ? "Briefly describe your issue" : "Descreva brevemente seu problema"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">{t.priority}</Label>
                <Select
                  name="priority"
                  value={formData.priority}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectPriority} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t.low}</SelectItem>
                    <SelectItem value="medium">{t.medium}</SelectItem>
                    <SelectItem value="high">{t.high}</SelectItem>
                    <SelectItem value="urgent">{t.urgent}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{t.category}</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">{t.technicalIssue}</SelectItem>
                    <SelectItem value="billing">{t.billing}</SelectItem>
                    <SelectItem value="account">{t.account}</SelectItem>
                    <SelectItem value="feature">{t.featureRequest}</SelectItem>
                    <SelectItem value="other">{t.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t.descriptionPlaceholder}
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>{t.attachments}</Label>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-dashed rounded-md text-sm font-medium text-muted-foreground hover:bg-muted/50">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                  <Paperclip className="h-4 w-4 mr-2" />
                  {t.addFiles}
                </label>
                <span className="text-sm text-muted-foreground">
                  {attachments.length} {t.filesAttached}
                </span>
              </div>

              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/30 rounded-md p-2 text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[200px]">{file.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                {t.submitTicket}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketSection;