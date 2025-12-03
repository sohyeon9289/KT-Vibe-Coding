"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { sampleArticles, sampleProducts, categories } from "@/lib/data";
import {
  Search,
  TrendingUp,
  Shield,
  BarChart3,
  Filter,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTab, setActiveTab] = useState("articles");

  // Filter articles
  const filteredArticles = useMemo(() => {
    return sampleArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "전체" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "전체" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort
    if (sortBy === "return-high") {
      products = [...products].sort((a, b) => b.returnRate - a.returnRate);
    } else if (sortBy === "return-low") {
      products = [...products].sort((a, b) => a.returnRate - b.returnRate);
    } else if (sortBy === "risk-low") {
      products = [...products].sort((a, b) => a.riskLevel - b.riskLevel);
    } else if (sortBy === "risk-high") {
      products = [...products].sort((a, b) => b.riskLevel - a.riskLevel);
    }

    return products;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="gradient-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              신뢰할 수 있는 금융 정보
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-primary">투자 판단</span>을 위한
              <br />
              명확한 정보
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              수익률과 위험도를 한눈에 비교하고, 나에게 맞는 투자 상품을 찾아보세요.
              모든 정보는 출처와 갱신 날짜가 명시됩니다.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="상품명, 키워드로 검색하세요..."
                className="h-14 pl-12 pr-4 text-lg rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span>{sampleProducts.length}개 상품 분석</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Shield className="h-4 w-4 text-accent" />
                </div>
                <span>위험도 5단계 평가</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                </div>
                <span>{sampleArticles.length}개 분석 글</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Tabs & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="articles" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                분석 글
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                투자 상품
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              {categories.slice(0, 5).map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer shrink-0 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-24 h-7 text-xs">
                  <SelectValue placeholder="더보기" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort (Products only) */}
            {activeTab === "products" && (
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="return-high">수익률 높은순</SelectItem>
                  <SelectItem value="return-low">수익률 낮은순</SelectItem>
                  <SelectItem value="risk-low">위험도 낮은순</SelectItem>
                  <SelectItem value="risk-high">위험도 높은순</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <Tabs value={activeTab} className="space-y-8">
          <TabsContent value="articles" className="mt-0">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState type="articles" />
            )}
          </TabsContent>

          <TabsContent value="products" className="mt-0">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState type="products" />
            )}
          </TabsContent>
        </Tabs>

        {/* Compare CTA */}
        <Card className="mt-12 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">상품 비교가 필요하신가요?</h3>
              <p className="text-muted-foreground">
                여러 상품의 수익률과 위험도를 한눈에 비교해보세요.
              </p>
            </div>
            <Link href="/compare">
              <Button size="lg" className="gap-2">
                상품 비교하기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function EmptyState({ type }: { type: "articles" | "products" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
      <p className="text-muted-foreground max-w-md">
        {type === "articles"
          ? "다른 키워드나 카테고리로 검색해보세요."
          : "다른 조건으로 상품을 검색해보세요."}
      </p>
    </div>
  );
}
