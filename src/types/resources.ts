
export type ResourceType = {
  id: string;
  title: string;
  image?: string;
  date: string;
  author: string;
  type: 'document' | 'file' | 'pdf' | 'certificate' | 'badge' | 'template' | 'question-bank' | 'rubric' | 'scorm';
  content?: {
    skills?: {
      category: string;
      items: string[];
    }[];
    metadata?: {
      creator: string;
      created: string;
      tags: string[];
    };
    library?: {
      type: string;
      scope: string;
      favorite: boolean;
    };
  };
};
