"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article, categoryColors } from "@/lib/data";
import { Calendar, Clock, Bookmark, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card 
      className={`group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-up opacity-0 stagger-${Math.min(index + 1, 5)}`}
      style={{ animationFillMode: "forwards" }}
    >
      {/* Gradient Top Border */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className={categoryColors[article.category] || "bg-gray-100 text-gray-700"}
              >
                {article.category}
              </Badge>
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            <Link href={`/articles/${article.id}`}>
              <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`shrink-0 ${isBookmarked ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {article.summary}
        </p>
        
        {/* Related Products Preview */}
        {article.products.length > 0 && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">관련 상품:</span>
            {article.products.slice(0, 2).map((product) => (
              <Badge key={product.id} variant="secondary" className="text-xs bg-muted">
                {product.name}
              </Badge>
            ))}
            {article.products.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{article.products.length - 2}
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}분
            </span>
          </div>
          <Link href={`/articles/${article.id}`}>
            <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
              자세히 보기
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

