import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import CustomReportDialog from '@/components/reports/CustomReportDialog';
import AssessmentReportDetail from '@/components/reports/AssessmentReportDetail';

const initialAssessmentReports = [
  {
    id: 'admin-course-eval',
    title: "Admin's Course Evaluation Report",
    image: '/lovable-uploads/a7f0fcd0-363d-47fe-9b05-2b59cc82bea8.png',
    date: 'Wed Jan 24, 2024',
    description: "Admin's Course Evaluation Report",
    library: 'Built-in'
  },
  {
    id: 'admin-feedback',
    title: "Admin's User Feedback Report",
    image: '/lovable-uploads/a7f0fcd0-363d-47fe-9b05-2b59cc82bea8.png',
    date: 'Wed Jan 24, 2024',
    description: "Admin's User Feedback Report",
    library: 'Built-in'
  },
  {
    id: 'assessment-usage',
    title: "Assessment usage",
    image: '/lovable-uploads/a7f0fcd0-363d-47fe-9b05-2b59cc82bea8.png',
    date: 'Thu Jul 13, 2017',
    description: "See how various assessment types are being used.",
    library: 'Built-in'
  },
  {
    id: 'manager-competency',
    title: "Manager's Competency Assessment Report",
    image: '/lovable-uploads/a7f0fcd0-363d-47fe-9b05-2b59cc82bea8.png',
    date: 'Wed Jan 24, 2024',
    description: "Manager's Competency Assessment Report",
    library: 'Built-in'
  },
  {
    id: 'manager-course-eval',
    title: "Manager's Course Evaluation Trends Report",
    image: '/lovable-uploads/a7f0fcd0-363d-47fe-9b05-2b59cc82bea8.png',
    date: 'Wed Jan 24, 2024',
    description: "Manager's Course Evaluation Trends Report",
    library: 'Built-in'
  }
];

const initialCategoryReports = {
  assessments: initialAssessmentReports,
  certificates: [
    {
      id: 'certificate-1',
      title: 'Certificate of Completion',
      image: '/lovable-uploads/d2ec9d1c-262f-43d8-b29e-5098dc49bf32.png',
      date: 'Wed Jan 24, 2024',
      description: 'Certificate of Completion for courses.',
      library: 'Built-in',
    },
  ],
  courses: [
    {
      id: 'course-1',
      title: 'Course Progress Report',
      image: '/lovable-uploads/9583fabd-1d7a-4162-b184-ca09ea10d280.png',
      date: 'Wed Jan 24, 2024',
      description: 'Shows progress of all users in courses.',
      library: 'Built-in',
    },
  ],
  compliance: [
    {
      id: 'compliance-1',
      title: 'Compliance Status Report',
      image: '/lovable-uploads/3457f0a5-e623-4454-ad61-76766d94d02e.png',
      date: 'Wed Jan 24, 2024',
      description: 'Compliance course completion status.',
      library: 'Built-in',
    },
  ],
  groups: [
    {
      id: 'group-1',
      title: 'Group Participation Report',
      image: '/lovable-uploads/bf4e7c38-d052-456d-8727-1a69d00eadd3.png',
      date: 'Wed Jan 24, 2024',
      description: 'Participation stats for groups.',
      library: 'Built-in',
    },
  ],
  orders: [
    {
      id: 'order-1',
      title: 'Order Summary Report',
      image: '/placeholder.svg',
      date: 'Wed Jan 24, 2024',
      description: 'Summary of all orders.',
      library: 'Built-in',
    },
  ],
  organizations: [
    {
      id: 'org-1',
      title: 'Organization Overview Report',
      image: '/placeholder.svg',
      date: 'Wed Jan 24, 2024',
      description: 'Overview of organizations.',
      library: 'Built-in',
    },
  ],
  users: [
    {
      id: 'user-1',
      title: 'User Activity Report',
      image: '/placeholder.svg',
      date: 'Wed Jan 24, 2024',
      description: 'Activity details for users.',
      library: 'Built-in',
    },
  ],
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isCustomReportDialogOpen, setIsCustomReportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryReports, setCategoryReports] = useState(initialCategoryReports);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedReport(null);
  };

  const handleBackToCatalog = () => {
    setSelectedCategory(null);
    setSelectedReport(null);
  };

  const handleReportClick = (reportId) => {
    setSelectedReport(reportId);
  };

  const openCustomReportDialog = () => {
    setIsCustomReportDialogOpen(true);
  };

  const closeCustomReportDialog = () => {
    setIsCustomReportDialogOpen(false);
  };

  // Add custom report handler
  const handleAddCustomReport = (report) => {
    const { name, description, library, category } = report;
    const newReport = {
      id: `${category}-custom-${Date.now()}`,
      title: name,
      image: '/placeholder.svg',
      date: new Date().toLocaleDateString(),
      description,
      library,
    };
    setCategoryReports((prev) => ({
      ...prev,
      [category]: prev[category] ? [newReport, ...prev[category]] : [newReport],
    }));
    setSelectedCategory(category); // Optionally switch to the category
    setIsCustomReportDialogOpen(false);
  };

  const reportCategories = [
    { id: 'assessments', title: 'Assessments', image: '/lovable-uploads/a7f0fcd0-363d-47fe-9b05-2b59cc82bea8.png', count: categoryReports.assessments.length },
    { id: 'certificates', title: 'Certificates', image: '/lovable-uploads/d2ec9d1c-262f-43d8-b29e-5098dc49bf32.png', count: categoryReports.certificates.length },
    { id: 'compliance', title: 'Compliance courses', image: '/lovable-uploads/3457f0a5-e623-4454-ad61-76766d94d02e.png', count: categoryReports.compliance.length },
    { id: 'courses', title: 'Courses', image: '/lovable-uploads/9583fabd-1d7a-4162-b184-ca09ea10d280.png', count: categoryReports.courses.length },
    { id: 'groups', title: 'Groups', image: '/lovable-uploads/bf4e7c38-d052-456d-8727-1a69d00eadd3.png', count: categoryReports.groups.length },
    { id: 'orders', title: 'Orders', image: '/placeholder.svg', count: categoryReports.orders.length },
    { id: 'organizations', title: 'Organizations', image: '/placeholder.svg', count: categoryReports.organizations.length },
    { id: 'users', title: 'Users', image: '/placeholder.svg', count: categoryReports.users.length },
  ];

  const myReports = [
    {
      id: 1,
      icon: '📊',
      title: 'Our canned reports cover a wide range of common reporting such as the completion status of courses.',
      number: 1
    },
    {
      id: 2,
      icon: '📈',
      title: 'Ad-hoc reporting allows you to create your own custom reports, which can include charts, HTML, and CSV output.',
      number: 2
    },
    {
      id: 3,
      icon: '➕',
      title: 'To create a custom report, click +Custom report and follow the directions.',
      number: 3
    }
  ];

  // Filter reports based on search query
  const filteredCategories = reportCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssessmentReports = categoryReports.assessments.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMyReports = myReports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 animate-fade-in max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="w-full">
        {selectedReport ? (
          <AssessmentReportDetail
            reportId={selectedReport}
            onBack={() => setSelectedReport(null)}
          />
        ) : (
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent border-b w-full flex justify-start rounded-none gap-1 h-auto p-0">
                <TabsTrigger value="catalog" className="rounded-full py-2 px-6 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Catalog</TabsTrigger>
                <TabsTrigger value="myreports" className="rounded-full py-2 px-6 data-[state=active]:bg-blue-500 data-[state=active]:text-white">My reports</TabsTrigger>
                <TabsTrigger value="history" className="rounded-full py-2 px-6 data-[state=active]:bg-blue-500 data-[state=active]:text-white">History</TabsTrigger>
                <TabsTrigger value="scheduled" className="rounded-full py-2 px-6 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Scheduled</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="catalog" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      {selectedCategory && (
                        <Button
                          variant="ghost"
                          onClick={handleBackToCatalog}
                          className="flex items-center text-blue-500"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Back to Catalog
                        </Button>
                      )}
                    </div>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
                      onClick={openCustomReportDialog}
                    >
                      <Plus className="h-4 w-4" />
                      Custom report
                    </Button>
                  </div>

                  {!selectedCategory ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredCategories.map((category) => (
                        <Card
                          key={category.id}
                          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <div className="h-40 bg-blue-50">
                            <img
                              src={category.image}
                              alt={category.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                            <p className="text-sm text-gray-500">{category.count} Reports</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-semibold text-blue-500 mb-4">
                        {reportCategories.find(cat => cat.id === selectedCategory)?.title || 'Reports'}
                      </h2>
                      {(() => {
                        const reports = categoryReports[selectedCategory] || [];
                        const filteredReports = reports.filter(report =>
                          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (report.description && report.description.toLowerCase().includes(searchQuery.toLowerCase()))
                        );
                        if (filteredReports.length > 0) {
                          return (
                            <div className="space-y-4">
                              {filteredReports.map((report) => (
                                <div
                                  key={report.id}
                                  className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                  onClick={() => handleReportClick(report.id)}
                                >
                                  <div className="w-24 bg-blue-50 flex-shrink-0">
                                    <img
                                      src={report.image}
                                      alt={report.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                                          <div className="flex items-center gap-2">
                                            <Checkbox id={`myreport-${report.id}`} />
                                            <label htmlFor={`myreport-${report.id}`}>In My reports</label>
                                          </div>
                                          <div>Library: {report.library}</div>
                                          <div>Created: {report.date}</div>
                                        </div>
                                        <p className="text-gray-700">{report.description}</p>
                                      </div>
                                      <Button
                                        className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleReportClick(report.id);
                                        }}
                                      >
                                        Run
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        } else {
                          return (
                            <div className="text-center py-8">
                              <p className="text-gray-500">Sample reports for {
                                reportCategories.find(cat => cat.id === selectedCategory)?.title || 'this category'
                              } will appear here.</p>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="myreports" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
                      onClick={openCustomReportDialog}
                    >
                      <Plus className="h-4 w-4" />
                      Custom report
                    </Button>
                  </div>

                  <h2 className="text-xl font-semibold mb-2">My reports</h2>
                  <p className="text-gray-500 mb-6">Click on a report to run it, or visit the catalog to browse other available reports.</p>

                  <div className="space-y-6">
                    {filteredMyReports.map((report) => (
                      <div key={report.id} className="flex gap-4 items-center bg-white border rounded-lg p-4">
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-md">
                          <span className="text-2xl">{report.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{report.number} {report.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">There is no history of run reports.</p>
                  </div>
                </TabsContent>

                <TabsContent value="scheduled" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">There are no scheduled reports.</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>

      <CustomReportDialog
        isOpen={isCustomReportDialogOpen}
        onClose={closeCustomReportDialog}
        onAddCustomReport={handleAddCustomReport}
      />
    </div>
  );
};

export default Reports;