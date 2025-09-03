import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, BookOpen, Award } from "lucide-react";
import CategoryEditDialog from "./CategoryEditDialog";
import CourseSectionDialog from "./CourseSectionDialog";
import CertificateSectionDialog from "./CertificateSectionDialog";
import VisibilityDialog from "./VisibilityDialog";
import SEODialog from "./SEODialog";

const CoursePathAdmin = () => {
  const [pathEnabled, setPathEnabled] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [courseSectionDialogOpen, setCourseSectionDialogOpen] = useState(false);
  const [certificateSectionDialogOpen, setCertificateSectionDialogOpen] = useState(false);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [seoDialogOpen, setSeoDialogOpen] = useState(false);

  const [pathFeatures, setPathFeatures] = useState([
    { id: "publish", label: "Publish?", checked: false },
    { id: "displayContact", label: "Display contact option instead of allowing purchase/enrollment?", checked: false },
    { id: "includeShortDescription", label: "Include short description?", checked: true },
    { id: "includeLongDescription", label: "Include long description?", checked: true },
    { id: "includeTableOfContents", label: "Include table of contents?", checked: true },
    { id: "includeInstructor", label: "Include instructor?", checked: true },
    { id: "featuredItem", label: "Featured item?", checked: false }
  ]);

  const handleEnablePathFeatures = () => {
    setPathEnabled(true);
  };

  const handleFeatureToggle = (id) => {
    setPathFeatures(prev =>
      prev.map(feature =>
        feature.id === id ? { ...feature, checked: !feature.checked } : feature
      )
    );
  };

  const pathSteps = [
    {
      number: 1,
      title: "A learning path is a great way to guide a learner through a set of other courses and/or certifications.",
      icon: (
        <div className="flex space-x-2">
          <div className="w-8 h-10 bg-green-400 rounded" />
          <div className="w-8 h-10 bg-blue-400 rounded" />
          <div className="w-6 h-8 bg-yellow-400 rounded-t-full" />
        </div>
      )
    },
    {
      number: 2,
      title: "If you enable learning path features for a course, you can add two additional kinds of sections - course sections and certificate sections.",
      icon: (
        <div className="flex space-x-2">
          <div className="w-8 h-10 bg-blue-400 rounded relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded" />
          </div>
          <div className="w-6 h-8 bg-yellow-400 rounded-t-full" />
        </div>
      )
    },
    {
      number: 3,
      title: "A course section is completed when a learner completes a specified course.",
      icon: (
        <div className="relative">
          <div className="w-8 h-10 bg-blue-400 rounded" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <div className="mt-1 space-y-1">
            <div className="w-6 h-1 bg-green-500 rounded" />
            <div className="w-6 h-1 bg-green-500 rounded" />
            <div className="w-6 h-1 bg-green-500 rounded" />
            <div className="w-6 h-1 bg-green-500 rounded" />
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: "A certificate section is completed when a learner is awarded a specified certificate. The learner can click a popup to enroll into a course which awards the certificate.",
      icon: (
        <div className="flex flex-col items-center relative">
          <div className="w-12 h-8 bg-blue-100 rounded-t border-2 border-blue-300 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">🏆</span>
            </div>
          </div>
          <div className="w-16 h-2 bg-blue-300 rounded-b" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
      )
    }
  ];

  if (!pathEnabled) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-gray-700">Learning path features are currently disabled.</p>
          <Button onClick={handleEnablePathFeatures} className="bg-blue-500 hover:bg-blue-600">
            <Plus className="mr-2 h-4 w-4" />
            Enable path features
          </Button>
        </div>

        <div className="space-y-8">
          {pathSteps.map((step) => (
            <Card key={step.number} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-gray-700">{step.number}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Path</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1">
          <p className="text-green-800 text-sm font-medium">Path features enabled</p>
        </div>
      </div>

      {/* Feature Toggle Section */}
      <Card>
        <CardHeader><CardTitle>Feature</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pathFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between">
                <label htmlFor={feature.id} className="text-sm font-medium cursor-pointer flex-1 pr-4">
                  {feature.label}
                </label>
                <Checkbox
                  id={feature.id}
                  checked={feature.checked}
                  onCheckedChange={() => handleFeatureToggle(feature.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Names</h4>
              <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800">General</Button>
            </div>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              onClick={() => setCategoryDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
              Edit categories
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visibility */}
      <Card>
        <CardHeader><CardTitle>Visibility</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Condition</h4>
              <p className="text-gray-600">No filter condition has been set.</p>
            </div>
            <Button
              onClick={() => setVisibilityDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">There is no meta description or keywords.</p>
            <Button
              onClick={() => setSeoDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Path Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Path Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => setCourseSectionDialogOpen(true)}
            >
              <BookOpen className="h-6 w-6 mb-2" />
              <span>Add Course Section</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => setCertificateSectionDialogOpen(true)}
            >
              <Award className="h-6 w-6 mb-2" />
              <span>Add Certificate Section</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CategoryEditDialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen} type="path" />
      <CourseSectionDialog open={courseSectionDialogOpen} onOpenChange={setCourseSectionDialogOpen} />
      <CertificateSectionDialog open={certificateSectionDialogOpen} onOpenChange={setCertificateSectionDialogOpen} />
      <VisibilityDialog open={visibilityDialogOpen} onOpenChange={setVisibilityDialogOpen} />
      <SEODialog open={seoDialogOpen} onOpenChange={setSeoDialogOpen} />
    </div>
  );
};

export default CoursePathAdmin;
