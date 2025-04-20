
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Server, Shield, Database, Terminal, FileCode } from 'lucide-react';
import { blogArticles } from './blog/blogData';

const DocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Group articles by category
  const categories = [...new Set(blogArticles.map(article => article.category))];
  
  // Filter articles based on search query
  const filteredArticles = blogArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via the filter above
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return <BookOpen className="h-6 w-6 text-primary" />;
      case 'Server Management':
        return <Server className="h-6 w-6 text-primary" />;
      case 'Security Guide':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'Database Setup':
        return <Database className="h-6 w-6 text-primary" />;
      case 'Command Line Guide':
        return <Terminal className="h-6 w-6 text-primary" />;
      case 'Web Server Setup':
        return <FileCode className="h-6 w-6 text-primary" />;
      default:
        return <BookOpen className="h-6 w-6 text-primary" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">DG Servers Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Guides, tutorials and insights to help you get the most out of your hosting experience.
            </p>
            
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto relative">
              <Input
                type="search"
                placeholder="Search documentation..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          <Tabs defaultValue="all" className="max-w-5xl mx-auto">
            <TabsList className="flex mb-8 overflow-x-auto">
              <TabsTrigger value="all" className="px-4">All Documentation</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="px-4">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <Card key={article.id} className="h-full flex flex-col bg-card text-card-foreground">
                    <CardContent className="p-6 flex-grow">
                      <div className="mb-4">
                        {getCategoryIcon(article.category)}
                      </div>
                      <div>
                        <Link 
                          to={`/docs/${article.slug}`}
                          className="text-xl font-medium hover:text-primary transition-colors mb-2 block"
                        >
                          {article.title}
                        </Link>
                        <p className="text-muted-foreground mb-4">{article.summary}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t bg-muted/10">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-muted-foreground">{article.date}</span>
                        <span className="text-sm font-medium">{article.category}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles
                    .filter(article => article.category === category)
                    .map(article => (
                      <Card key={article.id} className="h-full flex flex-col bg-card text-card-foreground">
                        <CardContent className="p-6 flex-grow">
                          <div className="mb-4">
                            {getCategoryIcon(article.category)}
                          </div>
                          <div>
                            <Link 
                              to={`/docs/${article.slug}`}
                              className="text-xl font-medium hover:text-primary transition-colors mb-2 block"
                            >
                              {article.title}
                            </Link>
                            <p className="text-muted-foreground mb-4">{article.summary}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="px-6 py-4 border-t bg-muted/10">
                          <div className="flex justify-between items-center w-full">
                            <span className="text-sm text-muted-foreground">{article.date}</span>
                            <span className="text-sm font-medium">{article.category}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocsPage;
