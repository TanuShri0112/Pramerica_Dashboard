import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Plus } from "lucide-react";
import CategoryEditDialog from "./CategoryEditDialog";
import VisibilityDialog from "./VisibilityDialog";
import SEODialog from "./SEODialog";

const CourseCatalogAdmin = () => {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [seoDialogOpen, setSeoDialogOpen] = useState(false);

  const [catalogFeatures, setCatalogFeatures] = useState([
    { id: "publish", label: "Publish?", checked: false },
    { id: "displayContact", label: "Display contact option instead of allowing purchase/enrollment?", checked: false },
    { id: "includeShortDescription", label: "Include short description?", checked: true },
    { id: "includeLongDescription", label: "Include long description?", checked: true },
    { id: "includeTableOfContents", label: "Include table of contents?", checked: true },
    { id: "includeInstructor", label: "Include instructor?", checked: true },
    { id: "featuredItem", label: "Featured item?", checked: false },
  ]);

  const handleFeatureToggle = (id) => {
    setCatalogFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, checked: !feature.checked } : feature
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Catalog</h2>

      {/* Feature Section */}
      <Card>
        <CardHeader>
          <CardTitle>Feature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {catalogFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between">
                <label
                  htmlFor={feature.id}
                  className="text-sm font-medium cursor-pointer flex-1 pr-4"
                >
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

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Names</h4>
              <Button
                variant="link"
                className="p-0 text-blue-600 hover:text-blue-800"
              >
                General
              </Button>
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

      {/* Visibility Section */}
      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
        </CardHeader>
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

      {/* SEO Section */}
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
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

      {/* Dialogs */}
      <CategoryEditDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        type="catalog"
      />

      <VisibilityDialog
        open={visibilityDialogOpen}
        onOpenChange={setVisibilityDialogOpen}
      />

      <SEODialog
        open={seoDialogOpen}
        onOpenChange={setSeoDialogOpen}
      />
    </div>
  );
};

export default CourseCatalogAdmin;
