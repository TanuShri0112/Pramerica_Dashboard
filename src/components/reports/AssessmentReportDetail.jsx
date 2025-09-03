import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlayCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AssessmentReportDetail = ({ reportId, onBack }) => {
  const [selectedColumns, setSelectedColumns] = useState(['course_name']);

  const reportData = {
    id: reportId,
    name: "Admin's Course Evaluation Report",
    description: "Admin's Course Evaluation Report",
    reportOn: "Assessments",
    library: "Built-in"
  };

  const handleRun = () => {
    toast.success(`Running report: ${reportData.name}`);
  };

  const toggleColumn = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{reportData.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            Back to Reports
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
            onClick={handleRun}
          >
            <PlayCircle className="h-4 w-4" />
            Run
          </Button>
        </div>
      </div>

      <Tabs defaultValue="setup">
        <TabsList className="bg-transparent border-b w-full flex justify-start rounded-none gap-1 h-auto p-0 overflow-x-auto">
          <TabsTrigger 
            value="setup" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Setup
          </TabsTrigger>
          <TabsTrigger 
            value="basics" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Basics
          </TabsTrigger>
          <TabsTrigger 
            value="columns" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Columns
          </TabsTrigger>
          <TabsTrigger 
            value="filters" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Filters
          </TabsTrigger>
          <TabsTrigger 
            value="sort" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Sort
          </TabsTrigger>
          <TabsTrigger 
            value="grouping" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Grouping
          </TabsTrigger>
          <TabsTrigger 
            value="summaries" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Summaries
          </TabsTrigger>
          <TabsTrigger 
            value="organize" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Organize
          </TabsTrigger>
          <TabsTrigger 
            value="charts" 
            className="px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="pt-6">
          <div className="text-lg font-semibold mb-6">Setup</div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">1</div>
                <div>
                  <p className="mb-4">Click Columns and then select one or more columns from the table you are reporting on, as well as zero or more columns from related tables.</p>
                  <div className="border p-4 rounded-lg bg-gray-50">
                    <img src="/placeholder.svg" alt="Columns selection" className="w-full h-28 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">2</div>
                <div>
                  <p className="mb-4">Click Filters, Sort, Grouping, and Organize to define how rows are selected, sorted, grouped, and displayed.</p>
                  <div className="border p-4 rounded-lg bg-gray-50">
                    <img src="/placeholder.svg" alt="Report configuration" className="w-full h-28 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">3</div>
                <div>
                  <p className="mb-4">Click Charts if the columns should be represented graphically.</p>
                  <div className="border p-4 rounded-lg bg-gray-50 grid grid-cols-2 gap-4">
                    <img src="/placeholder.svg" alt="Chart types" className="w-full h-24 object-contain" />
                    <img src="/placeholder.svg" alt="Chart examples" className="w-full h-24 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="basics" className="pt-6">
          <div className="text-lg font-semibold mb-6">Basics</div>
          
          <div className="space-y-4">
            <div>
              <div className="font-medium mb-1">Name:</div>
              <div>{reportData.name}</div>
            </div>
            
            <div>
              <div className="font-medium mb-1">Description:</div>
              <div>{reportData.description}</div>
            </div>
            
            <div>
              <div className="font-medium mb-1">Report on:</div>
              <div>{reportData.reportOn}</div>
            </div>
            
            <div>
              <div className="font-medium mb-1">Library:</div>
              <div>{reportData.library}</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="columns" className="pt-6">
          <div className="text-lg font-semibold mb-6">Columns</div>
          
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-medium mb-4">Assessments</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="allow-late" />
                  <label htmlFor="allow-late" className="text-sm">Allow late submissions</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="disable-past" />
                  <label htmlFor="disable-past" className="text-sm">Disable past due</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="grading" />
                  <label htmlFor="grading" className="text-sm">Grading</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="lms-id" />
                  <label htmlFor="lms-id" className="text-sm">LMS ID</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="start" />
                  <label htmlFor="start" className="text-sm">Start</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="type" />
                  <label htmlFor="type" className="text-sm">Type</label>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="category" />
                  <label htmlFor="category" className="text-sm">Category</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="due" />
                  <label htmlFor="due" className="text-sm">Due</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="instructions" />
                  <label htmlFor="instructions" className="text-sm">Instructions</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="score-release" />
                  <label htmlFor="score-release" className="text-sm">Score release</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="tags" />
                  <label htmlFor="tags" className="text-sm">Tags</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="weight" />
                  <label htmlFor="weight" className="text-sm">Weight</label>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="course-name" checked={selectedColumns.includes('course_name')} 
                    onCheckedChange={() => toggleColumn('course_name')}
                  />
                  <label htmlFor="course-name" className="text-sm">Course name</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="given" />
                  <label htmlFor="given" className="text-sm">Given</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="introduction" />
                  <label htmlFor="introduction" className="text-sm">Introduction (displayed in the module)</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-title" />
                  <label htmlFor="section-title" className="text-sm">Section title</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="title" />
                  <label htmlFor="title" className="text-sm">Title</label>
                </div>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="mt-6 border-t pt-4">
              <AccordionItem value="class" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
                    <span className="font-medium">Class</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="pl-6">
                    <p className="text-gray-500">Class related columns will appear here</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Accordion type="single" collapsible className="border-t pt-2">
              <AccordionItem value="learner-answers" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
                    <span className="font-medium">Learner answers</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pl-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="correct-answer" />
                        <label htmlFor="correct-answer" className="text-sm">Correct answer</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="finished-at" />
                        <label htmlFor="finished-at" className="text-sm">Finished at</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="last-name" />
                        <label htmlFor="last-name" className="text-sm">Last name</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="required" />
                        <label htmlFor="required" className="text-sm">Required</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="score" />
                        <label htmlFor="score" className="text-sm">Score</label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="description" />
                        <label htmlFor="description" className="text-sm">Description</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="first-name" />
                        <label htmlFor="first-name" className="text-sm">First name</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="points" />
                        <label htmlFor="points" className="text-sm">Points</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="response" />
                        <label htmlFor="response" className="text-sm">Response</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="started-at" />
                        <label htmlFor="started-at" className="text-sm">Started at</label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="email" />
                        <label htmlFor="email" className="text-sm">Email</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="graded-at" />
                        <label htmlFor="graded-at" className="text-sm">Graded at</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="position" />
                        <label htmlFor="position" className="text-sm">Position</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="result-id" />
                        <label htmlFor="result-id" className="text-sm">Result ID</label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Accordion type="single" collapsible className="border-t pt-2">
              <AccordionItem value="learner-submissions" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
                    <span className="font-medium">Learner submissions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="pl-6">
                    <p className="text-gray-500">Learner submissions columns will appear here</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Accordion type="single" collapsible className="border-t pt-2">
              <AccordionItem value="proficiencies" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
                    <span className="font-medium">Proficiencies</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="pl-6">
                    <p className="text-gray-500">Proficiencies columns will appear here</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Accordion type="single" collapsible className="border-t pt-2">
              <AccordionItem value="user-visits" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
                    <span className="font-medium">User visits</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="pl-6">
                    <p className="text-gray-500">User visits columns will appear here</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="filters" className="pt-6">
          <div className="text-lg font-semibold mb-6">Filters</div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">1</div>
                <div>
                  <p>Filters allow you to specify conditions that must be met for rows to be included in the report.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">2</div>
                <div>
                  <p>To add a filter condition, click Add Filter, then specify the column, operator, and value.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">3</div>
                <div>
                  <p>If you want the value in a filter condition to be entered by the user when the report is run, check the User prompt? box.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sort" className="pt-6">
          <div className="text-lg font-semibold mb-6">Sort</div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">1</div>
                <div>
                  <p>Sorting allows you to order the rows of a report based on one or more columns.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">2</div>
                <div>
                  <p>To add a sort criteria, click Add Sort, then specify the column to sort by and whether it's ascending or descending order.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">3</div>
                <div>
                  <p>If you add more than one sort criteria, the rows are ordered by the first criteria. If any rows match according to the first criteria, they are sorted by the second criteria, and so on.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="grouping" className="pt-6">
          <div className="text-lg font-semibold mb-6">Grouping</div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">1</div>
                <div>
                  <p>Grouping allows you to cluster records that have the same value for particular column(s).</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">2</div>
                <div>
                  <p>Grouping only applies to HTML and CSV reports.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">3</div>
                <div>
                  <p>When grouping is selected, rows are organized into sections where each section is associated with a unique group value.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="summaries" className="pt-6">
          <div className="text-lg font-semibold mb-6">Summaries</div>
          
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-medium mb-4">Summary data</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Learner answers</h4>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="summary-score" />
                    <label htmlFor="summary-score" className="text-sm">Score</label>
                  </div>
                  <div className="text-sm text-gray-500">AVG</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Assessments</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="pl-0">
                        <div className="pl-6">Learner answers</div>
                      </TableCell>
                      <TableCell className="text-right">COUNT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-0">
                        <div className="pl-6">Learner submissions</div>
                      </TableCell>
                      <TableCell className="text-right">COUNT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-0">
                        <div className="pl-6">Proficiencies</div>
                      </TableCell>
                      <TableCell className="text-right">COUNT</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-0">
                        <div className="pl-6">User visits</div>
                      </TableCell>
                      <TableCell className="text-right">COUNT</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="organize" className="pt-6">
          <div className="text-lg font-semibold mb-6">Organize</div>
          
          <div className="bg-white p-6 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-1/3">Label</TableHead>
                  <TableHead className="w-1/3">Format</TableHead>
                  <TableHead className="w-1/6 text-center">Bold</TableHead>
                  <TableHead className="w-1/6 text-center">Italic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Assessments</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pl-8">Course name</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Learner answers</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pl-8">Score</TableCell>
                  <TableCell>
                    <div className="border rounded px-3 py-1 text-sm">Default</div>
                  </TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="charts" className="pt-6">
          <div className="text-lg font-semibold mb-6">Charts</div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">1</div>
                <div>
                  <p>Charts allow you to display one or more column relationships graphically. Depending on which columns are selected, you may see more than one chart to choose from.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">2</div>
                <div>
                  <p>To include a particular chart, click "Select". To select a particular kind of chart, pick one from the chart dropdown.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">3</div>
                <div>
                  <p>To swap the axes of the relationship that is displayed, click Transpose.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentReportDetail;