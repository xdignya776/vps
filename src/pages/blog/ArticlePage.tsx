
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react';
import { blogArticles } from './blogData';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the article by slug
  const article = blogArticles.find(article => article.slug === slug);
  
  // If article not found, redirect to docs page
  if (!article) {
    React.useEffect(() => {
      navigate('/docs', { replace: true });
    }, [navigate]);
    
    return null;
  }

  // Get related articles (except current one)
  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-muted-foreground mb-8 gap-4 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span>{article.category}</span>
              </div>
            </div>

            {/* Featured image */}
            {article.featuredImage && (
              <div className="mb-8">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            {/* Article content */}
            <div className="prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
              {article.content.map((paragraph, index) => (
                <div key={index} className="mb-6">
                  {paragraph.type === 'heading' && (
                    <h2 className="text-2xl font-bold mb-4">{paragraph.content}</h2>
                  )}
                  {paragraph.type === 'paragraph' && (
                    <p className="text-muted-foreground">{paragraph.content}</p>
                  )}
                  {paragraph.type === 'code' && (
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code>{paragraph.content}</code>
                    </pre>
                  )}
                  {paragraph.type === 'list' && (
                    <ul className="list-disc pl-6 space-y-2">
                      {paragraph.items.map((item, i) => (
                        <li key={i} className="text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Share buttons */}
            <div className="border-t border-b py-6 my-8">
              <div className="flex items-center">
                <span className="mr-4 font-medium">Share this article:</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Related Documentation</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map(related => (
                  <Card key={related.slug} className="h-full bg-card text-card-foreground">
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-2">
                        <Link 
                          to={`/docs/${related.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {related.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">{related.summary}</p>
                      <div className="text-sm text-muted-foreground">
                        {related.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
