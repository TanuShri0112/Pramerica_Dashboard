import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Lightbulb, Shield } from 'lucide-react';

const templates = [
  {
    id: 'welcome-course',
    name: 'Welcome Course',
    description: 'Perfect for onboarding new employees or students',
    icon: <Users className="h-5 w-5" />,
    color: 'from-blue-500 to-purple-600',
    blockCount: 4,
    category: 'onboarding',
    blocks: [
      {
        id: 'block_1',
        type: 'text',
        content: {
          text:
            "Welcome to our amazing learning platform! 🎉\n\nWe're excited to have you join us on this educational journey. This course is designed to help you get started and make the most of your learning experience.",
        },
        order: 0,
      },
      {
        id: 'block_2',
        type: 'statement',
        content: {
          text: "This course will help you understand our platform and get you ready for success!",
          type: 'info',
        },
        order: 1,
      },
      {
        id: 'block_3',
        type: 'video',
        content: {
          url: '',
          title: 'Welcome Video',
          description: 'A warm welcome from your instructor',
        },
        order: 2,
      },
      {
        id: 'block_4',
        type: 'list',
        content: {
          items: [
            'Learn at your own pace',
            'Access materials 24/7',
            'Get support when you need it',
            'Track your progress',
          ],
        },
        order: 3,
      },
    ],
  },
  {
    id: 'compliance-training',
    name: 'Compliance Training',
    description: 'Structured format for compliance and safety training',
    icon: <Shield className="h-5 w-5" />,
    color: 'from-red-500 to-orange-500',
    blockCount: 4,
    category: 'compliance',
    blocks: [
      {
        id: 'block_1',
        type: 'text',
        content: {
          text:
            '🛡️ Compliance Training Module\n\nThis module covers essential policies and procedures that ensure workplace safety and regulatory compliance.',
        },
        order: 0,
      },
      {
        id: 'block_2',
        type: 'statement',
        content: {
          text:
            "Compliance is everyone's responsibility. Understanding these policies protects both you and the organization.",
          type: 'warning',
        },
        order: 1,
      },
      {
        id: 'block_3',
        type: 'text',
        content: {
          text: '📋 Policy Overview\n\nFamiliarize yourself with our key policies and procedures.',
        },
        order: 2,
      },
      {
        id: 'block_4',
        type: 'text',
        content: {
          text: '⚠️ Safety Procedures\n\nLearn about essential safety protocols and emergency procedures.',
        },
        order: 3,
      },
    ],
  },
  {
    id: 'product-training',
    name: 'Product Training',
    description: 'Showcase features and benefits effectively',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'from-green-500 to-emerald-500',
    blockCount: 3,
    category: 'product',
    blocks: [
      {
        id: 'block_1',
        type: 'text',
        content: {
          text:
            '🚀 Product Overview\n\nDiscover the amazing features and benefits of our latest product innovation.',
        },
        order: 0,
      },
      {
        id: 'block_2',
        type: 'video',
        content: {
          url: '',
          title: 'Product Demo Video',
          description: 'Watch a comprehensive demonstration of key features',
        },
        order: 1,
      },
      {
        id: 'block_3',
        type: 'image',
        content: {
          url: '',
          alt: 'Product Dashboard',
          description: 'Overview of the main interface',
        },
        order: 2,
      },
    ],
  },
  {
    id: 'innovation-workshop',
    name: 'Innovation Workshop',
    description: 'Foster creativity and innovative thinking',
    icon: <Lightbulb className="h-5 w-5" />,
    color: 'from-yellow-500 to-orange-500',
    blockCount: 3,
    category: 'innovation',
    blocks: [
      {
        id: 'block_1',
        type: 'text',
        content: {
          text:
            '💡 Innovation Workshop\n\nUnlock your creative potential and learn to think outside the box.',
        },
        order: 0,
      },
      {
        id: 'block_2',
        type: 'quote',
        content: {
          quote: 'Innovation distinguishes between a leader and a follower.',
          author: 'Steve Jobs',
        },
        order: 1,
      },
      {
        id: 'block_3',
        type: 'text',
        content: {
          text:
            'Workshop Overview\n\nInteractive sessions designed to boost creativity and innovation skills.',
        },
        order: 2,
      },
    ],
  },
];

export const TemplatesTab = ({ onUseTemplate }) => {
  const handleTemplateClick = (template) => {
    onUseTemplate(template.blocks);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Course Templates</h3>
        <p className="text-xs text-gray-600">Click on a template to start building your lesson</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3 pb-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => handleTemplateClick(template)}
              >
                <div className={`h-2 bg-gradient-to-r ${template.color}`}></div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center text-white`}
                      >
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                          {template.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {template.blockCount} blocks
                    </Badge>
                    <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to use →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
