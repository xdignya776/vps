
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Cpu, Database, Globe, Cloud, Shield } from 'lucide-react';
import { DigitalOceanSize } from '@/services/digitalOceanService';

interface VpsCategoriesProps {
  packages?: DigitalOceanSize[];
  category: string | null;
  setCategory: (category: string | null) => void;
  activeCategory?: string | null; // Keep backward compatibility
  onCategorySelect?: (category: string | null) => void; // Keep backward compatibility
}

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
};

const categories: Category[] = [
  {
    id: 'all',
    name: 'All Packages',
    icon: Server,
    description: 'Browse all available VPS packages'
  },
  {
    id: 'standard',
    name: 'Standard',
    icon: Cpu,
    description: 'Regular performance for general workloads'
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Database,
    description: 'Enhanced performance for demanding applications'
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    icon: Shield,
    description: 'Dedicated resources for maximum performance'
  }
];

const VpsCategories: React.FC<VpsCategoriesProps> = ({ 
  packages = [],
  category,
  setCategory,
  activeCategory = null,
  onCategorySelect
}) => {
  // Use either the new props or the backward compatible ones
  const selectedCategory = category ?? activeCategory;
  const handleCategorySelect = (cat: string | null) => {
    console.log("Category selected:", cat);
    if (setCategory) {
      setCategory(cat);
    } else if (onCategorySelect) {
      onCategorySelect(cat);
    }
  };

  // Calculate package count per category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return packages.length;
    
    return packages.filter(pkg => {
      const slug = pkg.slug;
      if (categoryId === 'standard' && (slug.includes('s-') || slug.startsWith('basic'))) return true;
      if (categoryId === 'premium' && (slug.includes('c-') || slug.startsWith('premium'))) return true;
      if (categoryId === 'dedicated' && (slug.includes('m-') || slug.includes('g-') || slug.startsWith('dedicated'))) return true;
      return false;
    }).length;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const count = getCategoryCount(cat.id);
          const Icon = cat.icon;
          const isActive = cat.id === 'all' ? selectedCategory === null : selectedCategory === cat.id;
          
          return (
            <Card 
              key={cat.id} 
              className={`hover:shadow-md transition-all cursor-pointer ${
                isActive ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => handleCategorySelect(cat.id === 'all' ? null : cat.id)}
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  isActive ? 'bg-primary/10' : 'bg-secondary'
                }`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-foreground/70'}`} />
                </div>
                <div>
                  <div className="font-medium">{cat.name}</div>
                  <div className="text-sm text-muted-foreground">{count} packages</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VpsCategories;
