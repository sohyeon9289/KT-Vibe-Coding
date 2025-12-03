"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CompareChart } from "@/components/charts/ReturnChart";
import { RiskBar } from "@/components/charts/RiskGauge";
import { sampleProducts, categories, riskColors, categoryColors, InvestmentProduct } from "@/lib/data";
import {
  ArrowLeft,
  Search,
  Plus,
  X,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Scale,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<InvestmentProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("전체");

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "전체" || product.category === categoryFilter;
      const notSelected = !selectedProducts.some((p) => p.id === product.id);
      return matchesSearch && matchesCategory && notSelected;
    });
  }, [searchQuery, categoryFilter, selectedProducts]);

  const addProduct = (product: InvestmentProduct) => {
    if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  // Calculate comparison stats
  const stats = useMemo(() => {
    if (selectedProducts.length === 0) return null;

    const returns = selectedProducts.map((p) => p.returnRate);
    const risks = selectedProducts.map((p) => p.riskLevel);
    const volatilities = selectedProducts.map((p) => p.volatility);

    return {
      highestReturn: Math.max(...returns),
      lowestRisk: Math.min(...risks),
      avgReturn: returns.reduce((a, b) => a + b, 0) / returns.length,
      avgVolatility: volatilities.reduce((a, b) => a + b, 0) / volatilities.length,
    };
  }, [selectedProducts]);

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              홈으로
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Scale className="h-8 w-8 text-primary" />
                상품 비교
              </h1>
              <p className="text-muted-foreground mt-1">
                최대 4개 상품의 수익률과 위험도를 비교해보세요
              </p>
            </div>

            <Badge variant="outline" className="text-sm px-3 py-1.5 w-fit">
              {selectedProducts.length}/4 상품 선택됨
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  상품 추가
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="상품명 검색..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Product List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer group"
                        onClick={() => addProduct(product)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${categoryColors[product.category]}`}
                            >
                              {product.category}
                            </Badge>
                          </div>
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.provider} · {product.returnRate}%
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          disabled={selectedProducts.length >= 4}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      검색 결과가 없습니다
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">선택된 상품</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`,
                          }}
                        />
                        <span className="text-sm font-medium truncate">{product.name}</span>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 shrink-0"
                        onClick={() => removeProduct(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Comparison Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedProducts.length === 0 ? (
              <Card className="py-16">
                <CardContent className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Scale className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">상품을 선택해주세요</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    왼쪽 패널에서 비교하고 싶은 상품을 선택하면 수익률과 위험도를 한눈에
                    비교할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary Stats */}
                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up">
                    <Card>
                      <CardContent className="py-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">최고 수익률</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {stats.highestReturn.toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="py-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">최저 위험도</p>
                        <p className="text-2xl font-bold text-primary">
                          {stats.lowestRisk}등급
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="py-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">평균 수익률</p>
                        <p className="text-2xl font-bold">{stats.avgReturn.toFixed(1)}%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="py-4 text-center">
                        <p className="text-xs text-muted-foreground mb-1">평균 변동성</p>
                        <p className="text-2xl font-bold">{stats.avgVolatility.toFixed(1)}%</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Chart Comparison */}
                <Card className="animate-fade-up stagger-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      수익률 추이 비교
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CompareChart products={selectedProducts} height={300} />
                    <div className="flex flex-wrap gap-4 mt-4 justify-center">
                      {selectedProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`,
                            }}
                          />
                          <span className="text-sm">{product.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Comparison Table */}
                <Card className="animate-fade-up stagger-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      상세 비교
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                            항목
                          </th>
                          {selectedProducts.map((product) => (
                            <th
                              key={product.id}
                              className="text-center py-3 px-2 font-medium min-w-[120px]"
                            >
                              <span className="line-clamp-1">{product.name}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-2 text-sm text-muted-foreground">카테고리</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="text-center py-3 px-2">
                              <Badge
                                variant="secondary"
                                className={categoryColors[product.category]}
                              >
                                {product.category}
                              </Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 text-sm text-muted-foreground">제공사</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="text-center py-3 px-2 text-sm">
                              {product.provider}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b bg-emerald-50/50 dark:bg-emerald-950/20">
                          <td className="py-3 px-2 text-sm font-medium flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                            연 수익률
                          </td>
                          {selectedProducts.map((product) => {
                            const isHighest =
                              product.returnRate === stats?.highestReturn;
                            return (
                              <td
                                key={product.id}
                                className={`text-center py-3 px-2 font-bold text-lg ${
                                  isHighest
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : ""
                                }`}
                              >
                                {product.returnRate.toFixed(1)}%
                                {isHighest && (
                                  <span className="ml-1 text-xs">🏆</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 text-sm font-medium flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            위험도
                          </td>
                          {selectedProducts.map((product) => {
                            const isLowest = product.riskLevel === stats?.lowestRisk;
                            const riskStyle = riskColors[product.riskLevel];
                            return (
                              <td key={product.id} className="text-center py-3 px-2">
                                <Badge className={`${riskStyle.bg} ${riskStyle.text} border-0`}>
                                  {product.riskLevel}등급
                                  {isLowest && <span className="ml-1">⭐</span>}
                                </Badge>
                              </td>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 text-sm text-muted-foreground">변동성</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="text-center py-3 px-2 text-sm">
                              {product.volatility}%
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 text-sm text-muted-foreground">최소 투자금</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="text-center py-3 px-2 text-sm">
                              {formatCurrency(product.minInvestment)}원
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 text-sm text-muted-foreground">투자 기간</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="text-center py-3 px-2 text-sm">
                              {product.period}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-2 text-sm text-muted-foreground">주요 특징</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="text-center py-3 px-2">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {product.features.slice(0, 2).map((feature) => (
                                  <Badge
                                    key={feature}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 animate-fade-up stagger-3">
                  <CardContent className="py-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800 dark:text-amber-200">
                        <p className="font-medium mb-1">비교 정보 안내</p>
                        <p className="text-xs leading-relaxed">
                          위 비교 정보는 각 상품의 공시 자료를 기반으로 작성되었습니다.
                          과거 수익률은 미래 수익을 보장하지 않으며, 투자 결정은 본인의
                          판단과 책임 하에 이루어져야 합니다.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

