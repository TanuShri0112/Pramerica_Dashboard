import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Target, Book, Award } from 'lucide-react';

const CourseMastery = () => {
  const [isAddSkillsOpen, setIsAddSkillsOpen] = useState(false);

  const skillOptions = [
    {
      icon: Target,
      title: "New",
      description: "Create a new skill from scratch",
      color: "text-blue-500"
    },
    {
      icon: Book,
      title: "Library",
      description: "Add skills from your library or favorites",
      color: "text-green-500"
    }
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Mastery</h1>
        
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="mt-6">
            <div className="space-y-6">
              {/* Add Skills Button */}
              <div className="flex justify-start">
                <Dialog open={isAddSkillsOpen} onOpenChange={setIsAddSkillsOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add skills
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Skills</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      {skillOptions.map((option) => (
                        <Card 
                          key={option.title}
                          className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-transparent hover:border-l-blue-500"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <option.icon className={`h-5 w-5 mt-0.5 ${option.color}`} />
                              <div className="flex-1">
                                <h3 className={`font-medium ${option.color} hover:underline cursor-pointer`}>
                                  {option.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Empty State */}
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
                  <p className="text-gray-600 mb-4">
                    Get started by adding skills to track learner mastery and progress.
                  </p>
                  <Button 
                    onClick={() => setIsAddSkillsOpen(true)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add your first skill
                  </Button>
                </CardContent>
              </Card>

              {/* Mastery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Mastery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <p>Add skills to define what learners should master in this course</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <p>Link assessments and activities to skills to track progress</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                      <p>Monitor learner mastery levels and provide targeted feedback</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseMastery;