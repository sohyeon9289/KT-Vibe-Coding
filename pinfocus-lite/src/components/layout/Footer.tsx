import Link from "next/link";
import { TrendingUp, Mail, Github, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">핀포커스</span>
                <span className="text-muted-foreground font-normal"> 라이트</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              투자 상품의 수익률과 위험도 정보를 신뢰성 있게 제공하여 
              개인 투자자의 올바른 판단을 돕습니다.
            </p>
            <div className="flex gap-3 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">홈</Link></li>
              <li><Link href="/compare" className="hover:text-foreground transition-colors">상품 비교</Link></li>
              <li><Link href="/bookmarks" className="hover:text-foreground transition-colors">북마크</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">카테고리</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/?category=예금" className="hover:text-foreground transition-colors">예금</Link></li>
              <li><Link href="/?category=펀드" className="hover:text-foreground transition-colors">펀드</Link></li>
              <li><Link href="/?category=ETF" className="hover:text-foreground transition-colors">ETF</Link></li>
              <li><Link href="/?category=채권" className="hover:text-foreground transition-colors">채권</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 핀포커스 라이트. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">이용약관</Link>
            <Link href="#" className="hover:text-foreground transition-colors">개인정보처리방침</Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            ⚠️ <strong>투자 유의사항:</strong> 본 서비스에서 제공하는 정보는 투자 참고용이며, 투자 권유가 아닙니다. 
            투자 결정은 본인의 판단과 책임 하에 이루어져야 하며, 투자에 따른 손실에 대해 당사는 책임지지 않습니다.
            모든 투자에는 원금 손실의 위험이 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

