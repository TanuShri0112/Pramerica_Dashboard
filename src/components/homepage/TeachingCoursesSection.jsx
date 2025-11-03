import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Book, Calendar, Users, Copy } from "lucide-react";

const teachingCourses = [
  {
    id: 1,
    title: "K-12 Curriculum: Grades 2 & 3",
    image: "https://aiiteducation.com/assets_web1/img/courses.jpg",
    students: 45,
    modules: 8
  },
  {
    id: 2,
    title: "K-12 Curriculum: Grade 5",
    image: "https://aiiteducation.com/assets_web1/img/courses.jpg",
    students: 38,
    modules: 7
  },
  {
    id: 3,
    title: "K-12 Curriculum: Grade 8",
    image: "https://aiiteducation.com/assets_web1/img/courses.jpg",
    students: 42,
    modules: 9
  }
];

export default function TeachingCoursesSection() {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  return (
    <section>
      <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">Training Modules</CardTitle>
          <Badge variant="default" className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm shadow-sm hover:bg-blue-600 transition-colors">
            Active&nbsp;{teachingCourses.length}
          </Badge>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachingCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl bg-white shadow p-3 flex flex-col items-start cursor-pointer hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border border-blue-50 group"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="relative w-full h-48 mb-3 overflow-hidden rounded-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-semibold text-base mb-2 text-blue-900 group-hover:text-blue-700 transition-colors">
                  {course.title}
                </h4>
                <div className="flex gap-3 mt-2 text-gray-400 w-full items-center">
                  <div className="flex items-center gap-1">
                    <Book className="h-4 w-4" />
                    <span className="text-sm">{course.modules}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{course.students}</span>
                  </div>
                  <Calendar className="h-4 w-4 cursor-pointer hover:text-blue-500 transition-colors" />
                  <Copy className="h-4 w-4 cursor-pointer hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
