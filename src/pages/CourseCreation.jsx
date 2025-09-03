import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileImage, Upload } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const CourseCreation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState(null);

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newCourseId = `new-${Date.now()}`;
    const data = { title, description, thumbnail };
    // eslint-disable-next-line no-console
    console.log('Creating course (minimal):', data);
    toast({
      title: 'Course Created Successfully!',
      description: 'Now let\'s build your course modules and content.',
    });
    const builderUrl = `/courses/builder/${newCourseId}${templateId ? `?template=${templateId}` : ''}`;
    navigate(builderUrl);
  };

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Create New Course</h1>
      </div>

      <form onSubmit={onSubmit} className="max-w-3xl p-6 bg-white rounded-lg shadow space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Course Name *</Label>
          <Input
            id="title"
            placeholder="Enter course name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe what students will learn"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Course Thumbnail</Label>
          <div className="flex flex-col gap-4">
            {thumbnailPreview ? (
              <div className="relative w-full max-w-md h-48 bg-slate-100 rounded-md overflow-hidden">
                <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => {
                    setThumbnail(null);
                    setThumbnailPreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-md h-48 border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center p-4 hover:border-slate-300 transition-colors">
                <FileImage className="h-10 w-10 text-slate-400 mb-2" />
                <p className="text-sm text-slate-500 text-center mb-2">Drag and drop or click to upload</p>
                <p className="text-xs text-slate-400 text-center">Recommended size: 1280 x 720px (JPG, PNG)</p>
                <Input id="thumbnail" type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('thumbnail')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8 py-2">Create Course & Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreation;