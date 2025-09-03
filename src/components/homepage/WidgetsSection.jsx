import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Folder } from "lucide-react";
import { motion } from "framer-motion";

const groups = [
  {
    id: 1,
    name: "Sales Agents",
    desc: "Insurance sales training group",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=40&q=80",
  },
  {
    id: 2,
    name: "Training Managers",
    desc: "Sales training coordination group",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=40&q=80",
  },
  {
    id: 3,
    name: "New Agents",
    desc: "Insurance license prep group",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=40&q=80",
  },
];

const catalog = [
  {
    id: 1,
    name: "Insurance Fundamentals",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=40&q=80",
  },
  {
    id: 2,
    name: "Life Insurance Sales",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=40&q=80",
  },
  {
    id: 3,
    name: "Sales Training",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=40&q=80",
  },
  {
    id: 4,
    name: "Insurance Compliance",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=40&q=80",
  },
];

export default function WidgetsSection() {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  const handleGroupsClick = () => {
    navigate("/groups");
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Widgets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Catalog Widget */}
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg border-blue-100 overflow-hidden h-full"
            onClick={handleCatalogClick}
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white">
              <CardTitle className="flex items-center gap-2 text-base text-blue-800">
                <Folder className="text-blue-500" />
                Catalog overview
                <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {catalog.length}
                </span>
              </CardTitle>
              <span className="lucide lucide-more-vertical text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"></span>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {catalog.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-3 mb-2 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="h-8 w-8 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-medium text-gray-700 hover:text-blue-700 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Groups Widget */}
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg border-blue-100 overflow-hidden h-full"
            onClick={handleGroupsClick}
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white">
              <CardTitle className="flex items-center gap-2 text-base text-blue-800">
                <Users className="text-blue-500" />
                Groups
                <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {groups.length}
                </span>
              </CardTitle>
              <span className="lucide lucide-more-vertical text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"></span>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {groups.map((grp) => (
                  <div
                    key={grp.id}
                    className="flex items-center gap-3 mb-2 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <img
                      src={grp.img}
                      alt={grp.name}
                      className="h-8 w-8 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <span className="font-medium text-gray-700 hover:text-blue-700 transition-colors">
                        {grp.name}
                      </span>
                      <div className="text-xs text-gray-500">{grp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
