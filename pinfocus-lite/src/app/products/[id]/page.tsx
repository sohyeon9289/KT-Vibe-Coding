"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReturnChart } from "@/components/charts/ReturnChart";
import { RiskGauge, RiskBar } from "@/components/charts/RiskGauge";
import { sampleProducts, sampleArticles, riskColors, categoryColors } from "@/lib/data";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Bookmark,
  Share2,
  Info,
  Calendar,
  Building2,
  Coins,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const product = sampleProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const riskStyle = riskColors[product.riskLevel];

  // Find related articles
  const relatedArticles = sampleArticles.filter((article) =>
    article.products.some((p) => p.id === product.id)
  );

  // Find similar products
  const similarProducts = sampleProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
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

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={categoryColors[product.category] || "bg-gray-100 text-gray-700"}
                >
                  {product.category}
                </Badge>
                <Badge variant="outline">{product.provider}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {product.name}
              </h1>

              <p className="text-muted-foreground max-w-2xl">{product.description}</p>

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

            {/* Quick Stats */}
            <div className="flex gap-4 animate-fade-up stagger-1">
              <Card className="min-w-[140px]">
                <CardContent className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                    <TrendingUp className="h-4 w-4" />
                    연 수익률
                  </div>
                  <p className={`text-3xl font-bold ${product.returnRate >= 5 ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}>
                    {product.returnRate.toFixed(1)}%
                  </p>
                </CardContent>
              </Card>
              <Card className="min-w-[140px]">
                <CardContent className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                    <AlertTriangle className="h-4 w-4" />
                    위험도
                  </div>
                  <p className={`text-3xl font-bold ${riskStyle.text}`}>
                    {product.riskLevel}등급
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Return Chart */}
            <Card className="animate-fade-up stagger-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  수익률 추이
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReturnChart product={product} height={280} />
                <p className="text-xs text-muted-foreground mt-4">
                  * 과거 수익률은 미래 수익을 보장하지 않습니다.
                </p>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="animate-fade-up stagger-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  위험도 분석
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <RiskGauge level={product.riskLevel} size="lg" />
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">위험도 등급 설명</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.riskLevel === 1 &&
                          "원금 손실 가능성이 매우 낮습니다. 예금자보호 대상이거나 정부 보증 상품입니다."}
                        {product.riskLevel === 2 &&
                          "원금 손실 가능성이 낮습니다. 안정적인 수익을 기대할 수 있습니다."}
                        {product.riskLevel === 3 &&
                          "원금 손실 가능성이 있습니다. 중간 수준의 변동성이 예상됩니다."}
                        {product.riskLevel === 4 &&
                          "원금 손실 가능성이 높습니다. 시장 상황에 따라 큰 변동이 있을 수 있습니다."}
                        {product.riskLevel === 5 &&
                          "원금 손실 가능성이 매우 높습니다. 투자 원금의 상당 부분을 잃을 수 있습니다."}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">변동성</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <RiskBar level={product.riskLevel} showLabels={false} />
                        </div>
                        <span className="text-lg font-semibold">{product.volatility}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="animate-fade-up stagger-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  상품 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">제공사</p>
                      <p className="font-medium">{product.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Coins className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">최소 투자금</p>
                      <p className="font-medium">{formatCurrency(product.minInvestment)}원</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">투자 기간</p>
                      <p className="font-medium">{product.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">정보 갱신일</p>
                      <p className="font-medium">{product.updatedAt}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-3">주요 특징</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Disclaimer */}
            <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 animate-fade-up stagger-2">
              <CardContent className="py-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">투자 유의사항</p>
                    <p className="text-xs leading-relaxed">
                      본 정보는 투자 참고용이며, 투자 권유가 아닙니다. 투자에는 원금
                      손실의 위험이 있으며, 투자 결정은 본인의 판단과 책임 하에
                      이루어져야 합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Source Info */}
            <Card className="animate-fade-up stagger-3">
              <CardContent className="py-4 space-y-3">
                <h3 className="font-medium text-sm">정보 출처</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>출처</span>
                    <span className="font-medium text-foreground">{product.source}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>갱신일</span>
                    <span className="font-medium text-foreground">{product.updatedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="space-y-4 animate-fade-up stagger-4">
                <h3 className="font-semibold">관련 분석 글</h3>
                <div className="space-y-3">
                  {relatedArticles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`} className="block">
                      <Card className="hover:border-primary/30 transition-colors">
                        <CardContent className="py-3">
                          <p className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                            {article.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {article.readTime}분 읽기
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="space-y-4 animate-fade-up stagger-5">
                <h3 className="font-semibold">유사 상품</h3>
                <div className="space-y-3">
                  {similarProducts.map((similarProduct) => (
                    <Link
                      key={similarProduct.id}
                      href={`/products/${similarProduct.id}`}
                      className="block"
                    >
                      <Card className="hover:border-primary/30 transition-colors">
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm truncate">
                              {similarProduct.name}
                            </p>
                            <Badge variant="outline" className="text-xs shrink-0 ml-2">
                              {similarProduct.returnRate}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {similarProduct.provider} · 위험도 {similarProduct.riskLevel}등급
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Compare CTA */}
            <Card className="border-primary/20 bg-primary/5 animate-fade-up stagger-5">
              <CardContent className="py-4 text-center">
                <p className="text-sm mb-3">다른 상품과 비교해보세요</p>
                <Link href={`/compare?products=${product.id}`}>
                  <Button className="w-full gap-2">
                    상품 비교하기
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

