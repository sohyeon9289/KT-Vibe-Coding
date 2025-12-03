"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { sampleArticles, sampleProducts } from "@/lib/data";
import { ArrowLeft, Bookmark, FileText, Package, Trash2 } from "lucide-react";

export default function BookmarksPage() {
  // 실제 앱에서는 로컬 스토리지나 백엔드에서 북마크 데이터를 가져옵니다
  // 데모를 위해 일부 샘플 데이터를 사용합니다
  const [bookmarkedArticles, setBookmarkedArticles] = useState(sampleArticles.slice(0, 3));
  const [bookmarkedProducts, setBookmarkedProducts] = useState(sampleProducts.slice(0, 4));

  const removeArticle = (articleId: string) => {
    setBookmarkedArticles(bookmarkedArticles.filter((a) => a.id !== articleId));
  };

  const removeProduct = (productId: string) => {
    setBookmarkedProducts(bookmarkedProducts.filter((p) => p.id !== productId));
  };

  const totalBookmarks = bookmarkedArticles.length + bookmarkedProducts.length;

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
                <Bookmark className="h-8 w-8 text-primary" />
                북마크
              </h1>
              <p className="text-muted-foreground mt-1">
                저장한 글과 상품을 확인하세요
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              총 <span className="font-semibold text-foreground">{totalBookmarks}</span>개 저장됨
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {totalBookmarks === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">저장된 항목이 없습니다</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                관심 있는 글이나 상품의 북마크 버튼을 눌러 저장해보세요.
                나중에 쉽게 찾아볼 수 있습니다.
              </p>
              <Link href="/">
                <Button>둘러보기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all" className="gap-2">
                전체
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {totalBookmarks}
                </span>
              </TabsTrigger>
              <TabsTrigger value="articles" className="gap-2">
                <FileText className="h-4 w-4" />
                글
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {bookmarkedArticles.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-2">
                <Package className="h-4 w-4" />
                상품
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {bookmarkedProducts.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Articles Section */}
              {bookmarkedArticles.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    저장한 글
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedArticles.map((article, index) => (
                      <ArticleCard key={article.id} article={article} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {bookmarkedProducts.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    저장한 상품
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {bookmarkedProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="articles">
              {bookmarkedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              ) : (
                <EmptyState type="articles" />
              )}
            </TabsContent>

            <TabsContent value="products">
              {bookmarkedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {bookmarkedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <EmptyState type="products" />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function EmptyState({ type }: { type: "articles" | "products" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        {type === "articles" ? (
          <FileText className="h-8 w-8 text-muted-foreground" />
        ) : (
          <Package className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">
        저장된 {type === "articles" ? "글" : "상품"}이 없습니다
      </h3>
      <p className="text-muted-foreground max-w-md">
        관심 있는 {type === "articles" ? "글" : "상품"}의 북마크 버튼을 눌러 저장해보세요.
      </p>
    </div>
  );
}

