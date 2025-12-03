"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InvestmentProduct, riskColors, categoryColors } from "@/lib/data";
import { TrendingUp, TrendingDown, AlertTriangle, Info, ArrowRight, Bookmark } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: InvestmentProduct;
  index?: number;
  showCompareButton?: boolean;
  isSelected?: boolean;
  onCompareToggle?: (product: InvestmentProduct) => void;
}

export function ProductCard({ 
  product, 
  index = 0,
  showCompareButton = false,
  isSelected = false,
  onCompareToggle 
}: ProductCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const riskStyle = riskColors[product.riskLevel];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  return (
    <Card 
      className={`group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-up opacity-0 stagger-${Math.min(index + 1, 5)} ${isSelected ? "ring-2 ring-primary" : ""}`}
      style={{ animationFillMode: "forwards" }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className={categoryColors[product.category] || "bg-gray-100 text-gray-700"}
              >
                {product.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.provider}
              </Badge>
            </div>
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors truncate">
              {product.name}
            </h3>
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

      <CardContent className="space-y-4">
        {/* Return Rate */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${product.returnRate >= 5 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}>
              {product.returnRate >= 5 ? (
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <span className="text-sm text-muted-foreground">연 수익률</span>
          </div>
          <span className={`text-xl font-bold ${product.returnRate >= 5 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
            {product.returnRate.toFixed(1)}%
          </span>
        </div>

        {/* Risk Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 cursor-help">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">위험도</span>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    위험도는 과거 변동성과 상품 특성을 기반으로 산정됩니다.
                    1등급(매우 낮음)부터 5등급(매우 높음)까지 있습니다.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge className={`${riskStyle.bg} ${riskStyle.text} border-0`}>
            {product.riskLevel}등급 · {riskStyle.label}
          </Badge>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 rounded-md bg-muted/30">
            <p className="text-xs text-muted-foreground">최소 투자금</p>
            <p className="font-medium">{formatCurrency(product.minInvestment)}원</p>
          </div>
          <div className="p-2 rounded-md bg-muted/30">
            <p className="text-xs text-muted-foreground">투자 기간</p>
            <p className="font-medium">{product.period}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {product.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="outline" className="text-xs font-normal">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border/50 flex gap-2">
        {showCompareButton && (
          <Button 
            variant={isSelected ? "default" : "outline"} 
            size="sm"
            className="flex-1"
            onClick={() => onCompareToggle?.(product)}
          >
            {isSelected ? "비교 해제" : "비교 추가"}
          </Button>
        )}
        <Link href={`/products/${product.id}`} className={showCompareButton ? "" : "w-full"}>
          <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary w-full">
            상세 보기
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>

      {/* Source & Update Info */}
      <div className="px-6 pb-4 pt-0">
        <p className="text-[10px] text-muted-foreground">
          출처: {product.source} · 갱신: {product.updatedAt}
        </p>
      </div>
    </Card>
  );
}

