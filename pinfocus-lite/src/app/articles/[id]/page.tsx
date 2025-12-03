"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/cards/ProductCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ReturnChart } from "@/components/charts/ReturnChart";
import { RiskBar } from "@/components/charts/RiskGauge";
import { sampleArticles, sampleProducts, categoryColors } from "@/lib/data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  Share2,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function ArticleDetailPage() {
  const params = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const article = sampleArticles.find((a) => a.id === params.id);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">글을 찾을 수 없습니다</h1>
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const relatedArticles = sampleArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Badge
                variant="secondary"
                className={categoryColors[article.category] || "bg-gray-100 text-gray-700"}
              >
                {article.category}
              </Badge>
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 animate-fade-up">
              {article.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6 animate-fade-up stagger-1">
              {article.summary}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-up stagger-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readTime}분 읽기
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={isBookmarked ? "text-primary" : ""}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-4 w-4 mr-1.5 ${isBookmarked ? "fill-current" : ""}`} />
                  저장
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1.5" />
                  공유
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Content */}
            <Card className="animate-fade-up stagger-3">
              <CardContent className="prose prose-slate dark:prose-invert max-w-none py-8">
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.content
                      .replace(/^## /gm, '<h2 class="text-xl font-semibold mt-6 mb-3">')
                      .replace(/^### /gm, '<h3 class="text-lg font-medium mt-4 mb-2">')
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/^- /gm, '<li class="ml-4">')
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/⚠️/g, '<span class="text-amber-600">⚠️</span>'),
                  }}
                />
              </CardContent>
            </Card>

            {/* Related Products */}
            {article.products.length > 0 && (
              <div className="space-y-4 animate-fade-up stagger-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  관련 투자 상품
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.products.map((product, index) => (
                    <Card key={product.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {product.provider}
                          </span>
                        </div>
                        <CardTitle className="text-base">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Return Rate */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">연 수익률</span>
                          <span className="text-lg font-bold text-primary">
                            {product.returnRate.toFixed(1)}%
                          </span>
                        </div>

                        {/* Risk */}
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">위험도</span>
                          <RiskBar level={product.riskLevel} />
                        </div>

                        {/* Chart */}
                        <div>
                          <span className="text-sm text-muted-foreground block mb-2">
                            수익률 추이
                          </span>
                          <ReturnChart product={product} height={120} />
                        </div>

                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            상세 보기
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Disclaimer */}
            <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 animate-fade-up stagger-3">
              <CardContent className="py-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">투자 유의사항</p>
                    <p className="text-xs leading-relaxed">
                      본 글은 정보 제공 목적이며, 투자 권유가 아닙니다. 투자 결정은
                      본인의 판단과 책임 하에 이루어져야 합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Update Info */}
            <Card className="animate-fade-up stagger-4">
              <CardContent className="py-4 space-y-3">
                <h3 className="font-medium text-sm">정보 출처</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>작성일</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>최종 수정</span>
                    <span>{formatDate(article.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="space-y-4 animate-fade-up stagger-5">
                <h3 className="font-semibold">관련 글</h3>
                <div className="space-y-3">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/articles/${relatedArticle.id}`}
                      className="block"
                    >
                      <Card className="hover:border-primary/30 transition-colors">
                        <CardContent className="py-3">
                          <p className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                            {relatedArticle.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedArticle.readTime}분 읽기
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

