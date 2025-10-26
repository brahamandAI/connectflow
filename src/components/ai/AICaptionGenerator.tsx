"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Copy, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface Caption {
  text: string;
  tone: string;
  hashtags: string[];
  emoji: string;
}

interface AICaptionGeneratorProps {
  imageUrl?: string;
  textContent?: string;
  postType: string;
  userContext?: string;
  onCaptionSelect: (caption: string) => void;
  onClose: () => void;
}

export function AICaptionGenerator({
  imageUrl,
  textContent,
  postType,
  userContext,
  onCaptionSelect,
  onClose
}: AICaptionGeneratorProps) {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCaptions = async () => {
    setLoading(true);
    try {
      const endpoint = imageUrl 
        ? '/api/ai/generate-caption'
        : '/api/ai/generate-text-caption';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          text: textContent,
          postType,
          userContext
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCaptions(data.captions || []);
        toast.success('AI captions generated successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate captions');
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      toast.error('Failed to generate captions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Caption copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error('Failed to copy caption');
    }
  };

  const selectCaption = (caption: Caption) => {
    const fullCaption = `${caption.emoji} ${caption.text} ${caption.hashtags.join(' ')}`;
    onCaptionSelect(fullCaption);
    onClose();
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'casual':
        return 'bg-green-100 text-green-800';
      case 'enthusiastic':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              AI Caption Writer
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {imageUrl ? 'Generate captions for your image' : 'Enhance your text with AI-generated captions'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {captions.length === 0 ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold mb-2">Generate AI Captions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let AI help you create engaging captions for your {imageUrl ? 'image' : 'post'}
                  </p>
                </div>
                <Button 
                  onClick={generateCaptions} 
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating captions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Captions
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Generated Captions</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={generateCaptions}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Generate More'
                    )}
                  </Button>
                </div>
                
                {captions.map((caption, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2 leading-relaxed">
                          {caption.emoji} {caption.text}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {caption.hashtags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getToneColor(caption.tone)}`}
                        >
                          {caption.tone}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(
                            `${caption.emoji} ${caption.text} ${caption.hashtags.join(' ')}`,
                            index
                          )}
                          className="hover:bg-gray-50"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => selectCaption(caption)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Use This
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
