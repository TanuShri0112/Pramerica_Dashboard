import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, PillTabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Lock, 
  Unlock,
  Settings,
  Tag,
  User,
  FileText,
  Globe,
  MoreHorizontal,
  Star,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

import AdminConfigureSteps from './admin/AdminConfigureSteps';
import CourseBasicsSection from './admin/CourseBasicsSection';
import CourseModulesAdmin from './admin/CourseModulesAdmin';
import CourseAssessmentsAdmin from './admin/CourseAssessmentsAdmin';
import CourseCompletionAdmin from './admin/CourseCompletionAdmin';
import CourseFeaturesAdmin from './admin/CourseFeaturesAdmin';
import CourseScheduleAdmin from './admin/CourseScheduleAdmin';
import CourseEnrollmentAdmin from './admin/CourseEnrollmentAdmin';
import CourseNewsFeedAdmin from './admin/CourseNewsFeedAdmin';
import CourseDeactivationAdmin from './admin/CourseDeactivationAdmin';
import CourseCatalogAdmin from './admin/CourseCatalogAdmin';
import CoursePathAdmin from './admin/CoursePathAdmin';

const CourseAdmin = () => {
  const [activeTab, setActiveTab] = useState("configure");
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();
  
  const allTabs = [
    { value: "configure", label: "Configure", color: "slate" },
    { value: "basics", label: "Basics", color: "slate" },
    { value: "features", label: "Features", color: "slate" },
    { value: "schedule", label: "Schedule", color: "slate" },
    { value: "enrollment", label: "Enrollment", color: "slate" },
    { value: "modules", label: "Modules", color: "slate" },
    { value: "assessments", label: "Assessments", color: "slate" },
    { value: "completion", label: "Completion", color: "slate" },
    { value: "newsfeed", label: "News feed", color: "slate" },
    { value: "deactivation", label: "Deactivation", color: "slate" },
    { value: "catalog", label: "Catalog", color: "slate" },
    { value: "path", label: "Path", color: "slate" }
  ];

  const [visibleTabs, setVisibleTabs] = useState([
    "configure", "basics", "features", "schedule", "enrollment", "modules", "assessments"
  ]);
  
  const [moreTabs, setMoreTabs] = useState([
    "completion", "newsfeed", "deactivation", "catalog", "path"
  ]);

  const courseMetadata = {
    style: "instructor",
    dateRange: "May 14, 2025 - May 21, 2025",
    catalog: "page",
    publishStatus: "Not published",
    accessCode: "No access code required",
    activeLearners: 0,
    enrollment: "open",
    locked: "Unlocked",
    creator: "demo instructor",
    lmsId: "1757539",
    tags: "none"
  };

  const handleMoreOptionClick = (selectedTabValue) => {
    const selectedTab = allTabs.find(tab => tab.value === selectedTabValue);
    if (selectedTab && moreTabs.includes(selectedTabValue)) {
      const lastVisibleTab = visibleTabs[visibleTabs.length - 1];
      
      const newVisibleTabs = [...visibleTabs.slice(0, -1), selectedTabValue];
      const newMoreTabs = moreTabs.filter(tab => tab !== selectedTabValue);
      newMoreTabs.push(lastVisibleTab);
      
      setVisibleTabs(newVisibleTabs);
      setMoreTabs(newMoreTabs);
    }
    
    setActiveTab(selectedTabValue);
    toast({
      title: "Tab switched",
      description: `Switched to ${getTabLabel(selectedTabValue)}`,
      duration: 1500,
    });
  };

  const getTabLabel = (tabValue) => {
    const tab = allTabs.find(t => t.value === tabValue);
    return tab ? tab.label : tabValue;
  };

  const handleQuickAction = (action) => {
    toast({
      title: "Quick Action",
      description: `${action} action performed`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 overflow-auto p-6 space-y-6 animate-fade-in">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-700 text-white rounded-t-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">Course Administration</h1>
                  <p className="text-slate-200">Manage course settings and configuration</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Learners</span>
                  </div>
                  <p className="text-xl font-semibold">{courseMetadata.activeLearners}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Status</span>
                  </div>
                  <p className="text-sm font-medium">{courseMetadata.publishStatus}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Enrollment</span>
                  </div>
                  <p className="text-sm font-medium capitalize">{courseMetadata.enrollment}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Growth</span>
                  </div>
                  <p className="text-sm font-medium">+0%</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <TabsList className="grid w-full grid-cols-8 bg-slate-100 gap-2 p-2 h-auto">
                  {visibleTabs.map((tabValue) => (
                    <PillTabsTrigger 
                      key={tabValue}
                      value={tabValue}
                      className={cn(
                        "px-4 py-3 text-sm font-medium rounded-md transition-all",
                        "data-[state=active]:bg-slate-700 data-[state=active]:text-white",
                        "data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200"
                      )}
                    >
                      {getTabLabel(tabValue)}
                    </PillTabsTrigger>
                  ))}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="px-4 py-3 text-sm font-medium hover:bg-slate-200 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          More
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-2">
                      {moreTabs.map((tabValue) => (
                        <DropdownMenuItem 
                          key={tabValue}
                          onClick={() => handleMoreOptionClick(tabValue)}
                          className="cursor-pointer px-3 py-2 rounded-md mb-1 last:mb-0"
                        >
                          {getTabLabel(tabValue)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TabsList>
              </CardContent>
            </Card>

            <div className="mt-6">
              <TabsContent value="configure" className="space-y-4">
                <AdminConfigureSteps />
              </TabsContent>

              <TabsContent value="basics" className="space-y-2">
                <CourseBasicsSection />
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <CourseFeaturesAdmin />
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <CourseScheduleAdmin />
              </TabsContent>

              <TabsContent value="enrollment" className="space-y-4">
                <CourseEnrollmentAdmin />
              </TabsContent>
                
              <TabsContent value="modules">
                <CourseModulesAdmin />
              </TabsContent>

              <TabsContent value="assessments">
                <CourseAssessmentsAdmin />
              </TabsContent>

              <TabsContent value="completion">
                <CourseCompletionAdmin />
              </TabsContent>

              <TabsContent value="newsfeed" className="space-y-4">
                <CourseNewsFeedAdmin />
              </TabsContent>

              <TabsContent value="deactivation" className="space-y-4">
                <CourseDeactivationAdmin />
              </TabsContent>

              <TabsContent value="catalog" className="space-y-4">
                <CourseCatalogAdmin />
              </TabsContent>

              <TabsContent value="path" className="space-y-4">
                <CoursePathAdmin />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="w-80 flex-shrink-0 border-l border-slate-200 bg-white">
          <div className="h-full overflow-auto">
            <Card className="border-0 h-full rounded-none">
              <CardHeader className="bg-slate-100 border-b border-slate-200 sticky top-0 z-10">
                <CardTitle className="flex items-center gap-3 text-lg text-slate-700">
                  <User className="h-5 w-5" />
                  Admin Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-3 text-sm">
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Style:
                    </span>
                    <span className="font-medium text-slate-700">{courseMetadata.style}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date:
                    </span>
                    <span className="font-medium text-xs text-slate-700">{courseMetadata.dateRange}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Catalog:
                    </span>
                    <Button variant="link" className="p-0 h-auto text-slate-600 text-sm hover:text-slate-800">
                      {courseMetadata.catalog}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Status:
                    </span>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        {courseMetadata.publishStatus}
                      </Badge>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-slate-600 text-xs hover:text-slate-800"
                        onClick={() => handleQuickAction("Course published")}
                      >
                        publish
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Access:
                    </span>
                    <span className="font-medium text-xs text-slate-700">{courseMetadata.accessCode}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Learners:
                    </span>
                    <span className="font-medium text-slate-700">{courseMetadata.activeLearners}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Enrollment:
                    </span>
                    <div className="flex flex-col items-end">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {courseMetadata.enrollment}
                      </Badge>
                      <Button variant="link" className="p-0 h-auto text-slate-600 text-xs hover:text-slate-800">
                        close
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Unlock className="h-4 w-4" />
                      Status:
                    </span>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="bg-white border-slate-200">
                        {courseMetadata.locked}
                      </Badge>
                      <Button variant="link" className="p-0 h-auto text-slate-600 text-xs hover:text-slate-800">
                        lock
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Creator:
                    </span>
                    <Button variant="link" className="p-0 h-auto text-slate-600 text-sm hover:text-slate-800">
                      {courseMetadata.creator}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      LMS ID:
                    </span>
                    <span className="font-medium text-slate-700">{courseMetadata.lmsId}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags:
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-slate-700">{courseMetadata.tags}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-600">
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      size="sm" 
                      className="w-full bg-slate-700 hover:bg-slate-800"
                      onClick={() => handleQuickAction("Course published")}
                    >
                      Publish
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-slate-300 hover:bg-slate-50"
                      onClick={() => handleQuickAction("Course preview opened")}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAdmin;