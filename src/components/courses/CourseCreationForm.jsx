import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Clock, FileImage, Upload, DollarSign, Users, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseCreationForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [customCategories, setCustomCategories] = React.useState([]);
  const [newCategoryInput, setNewCategoryInput] = React.useState("");
  const [learningObjectives, setLearningObjectives] = React.useState([""]);
  const [selectedBloomsTaxonomy, setSelectedBloomsTaxonomy] = React.useState([]);
  const [thumbnailPreview, setThumbnailPreview] = React.useState(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      level: "Beginner",
      duration: "",
      maxStudents: "",
      categories: [],
      thumbnail: null,
      price: "",
      learningObjectives: [],
      bloomsTaxonomy: [],
    },
  });

  const availableCategories = [
    "General", 
    "Finance", 
    "SOVEREIGNTY 101", 
    "Legal Studies", 
    "Personal Development", 
    "Professional Skills"
  ];

  const bloomsTaxonomyLevels = [
    "Remember",
    "Understand", 
    "Apply",
    "Analyze",
    "Evaluate",
    "Create"
  ];

  const allCategories = [...availableCategories, ...customCategories];

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      form.setValue("thumbnail", file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleAddCustomCategory = () => {
    if (newCategoryInput.trim() && !allCategories.includes(newCategoryInput.trim())) {
      const newCategory = newCategoryInput.trim();
      setCustomCategories(prev => [...prev, newCategory]);
      setSelectedCategories(prev => [...prev, newCategory]);
      setNewCategoryInput("");
    }
  };

  const handleRemoveCustomCategory = (categoryToRemove) => {
    setCustomCategories(prev => prev.filter(cat => cat !== categoryToRemove));
    setSelectedCategories(prev => prev.filter(cat => cat !== categoryToRemove));
  };

  const handleBloomsTaxonomyToggle = (level) => {
    setSelectedBloomsTaxonomy(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const handleLearningObjectiveChange = (index, value) => {
    const newObjectives = [...learningObjectives];
    newObjectives[index] = value;
    setLearningObjectives(newObjectives);
  };

  const addLearningObjective = () => {
    setLearningObjectives([...learningObjectives, ""]);
  };

  const removeLearningObjective = (index) => {
    if (learningObjectives.length > 1) {
      const newObjectives = learningObjectives.filter((_, i) => i !== index);
      setLearningObjectives(newObjectives);
    }
  };

  const onSubmit = (data) => {
    data.categories = selectedCategories;
    data.learningObjectives = learningObjectives.filter(obj => obj.trim() !== "");
    data.bloomsTaxonomy = selectedBloomsTaxonomy;
    
    const newCourseId = `new-${Date.now()}`;
    
    console.log("Creating course:", data);
    
    toast({
      title: "Course Created Successfully!",
      description: "Now let's build your course modules and content.",
    });
    
    const builderUrl = `/courses/builder/${newCourseId}${templateId ? `?template=${templateId}` : ''}`;
    navigate(builderUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Course Information</h1>
        <p className="text-muted-foreground">
          {templateId ? `Creating course from template ${templateId}` : 'Creating a new course from scratch'}
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter course title" 
                    {...field}
                    required
                    className="text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what students will learn in this course" 
                    {...field} 
                    rows={4}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Label>Learning Objectives</Label>
            <p className="text-sm text-muted-foreground">
              Define what students will be able to do after completing this course
            </p>
            {learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder={`Learning objective ${index + 1}`}
                  value={objective}
                  onChange={(e) => handleLearningObjectiveChange(index, e.target.value)}
                  className="flex-1"
                />
                {learningObjectives.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeLearningObjective(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLearningObjective}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Learning Objective
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Bloom's Taxonomy Levels</Label>
            <p className="text-sm text-muted-foreground">
              Select the cognitive levels this course will target
            </p>
            <div className="flex flex-wrap gap-2">
              {bloomsTaxonomyLevels.map((level) => (
                <Badge 
                  key={level}
                  variant={selectedBloomsTaxonomy.includes(level) ? "default" : "outline"}
                  className={`cursor-pointer hover:scale-105 transition-transform ${
                    selectedBloomsTaxonomy.includes(level) ? "bg-purple-500 hover:bg-purple-600" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleBloomsTaxonomyToggle(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="29.99" 
                        {...field}
                        className="pl-10"
                      />
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Set to 0 for free courses (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Level *</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxStudents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Students</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number"
                        min="1"
                        placeholder="100" 
                        {...field}
                        className="pl-10"
                      />
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Leave empty for unlimited
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Duration *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="e.g., 4 weeks, 10 hours, 3 months" 
                      {...field}
                      required
                      className="pl-10"
                      />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormDescription>
                  How long will it take students to complete this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <Label>Course Categories *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {allCategories.map((category) => (
                <div key={category} className="relative">
                  <Badge 
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className={`cursor-pointer hover:scale-105 transition-transform ${
                      selectedCategories.includes(category) ? "bg-blue-500 hover:bg-blue-600" : "hover:bg-gray-100"
                    } ${customCategories.includes(category) ? "pr-8" : ""}`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                    {customCategories.includes(category) && (
                      <X 
                        className="h-3 w-3 ml-1 hover:bg-red-500 hover:text-white rounded-full p-0.5 absolute right-1 top-1/2 -translate-y-1/2" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCustomCategory(category);
                        }}
                      />
                    )}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add new category"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCategory();
                  }
                }}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomCategory}
                disabled={!newCategoryInput.trim() || allCategories.includes(newCategoryInput.trim())}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            {selectedCategories.length === 0 && (
              <p className="text-sm text-destructive">Please select at least one category</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Course Thumbnail</Label>
            <div className="flex flex-col gap-4">
              {thumbnailPreview ? (
                <div className="relative w-full max-w-md h-48 bg-slate-100 rounded-md overflow-hidden">
                  <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      setThumbnailPreview(null);
                      form.setValue("thumbnail", null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="w-full max-w-md h-48 border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center p-4 hover:border-slate-300 transition-colors">
                  <FileImage className="h-10 w-10 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500 text-center mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-slate-400 text-center">
                    Recommended size: 1280 x 720px (JPG, PNG)
                  </p>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById("thumbnail")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end pt-6 border-t">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2"
              disabled={selectedCategories.length === 0}
            >
              Create Course & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseCreationForm;