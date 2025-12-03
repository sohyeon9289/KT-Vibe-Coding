// 투자 상품 타입 정의
export interface InvestmentProduct {
  id: string;
  name: string;
  category: "예금" | "적금" | "펀드" | "ETF" | "채권" | "주식";
  provider: string;
  returnRate: number; // 연환산 수익률 (%)
  riskLevel: 1 | 2 | 3 | 4 | 5; // 1: 매우 낮음 ~ 5: 매우 높음
  riskGrade: "매우 낮음" | "낮음" | "보통" | "높음" | "매우 높음";
  minInvestment: number;
  period: string;
  description: string;
  features: string[];
  updatedAt: string;
  source: string;
  historicalData: { month: string; value: number }[];
  volatility: number; // 변동성 (%)
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  thumbnail: string;
  products: InvestmentProduct[];
  content: string;
}

// 샘플 투자 상품 데이터
export const sampleProducts: InvestmentProduct[] = [
  {
    id: "prod-1",
    name: "KB국민 정기예금",
    category: "예금",
    provider: "KB국민은행",
    returnRate: 3.5,
    riskLevel: 1,
    riskGrade: "매우 낮음",
    minInvestment: 100000,
    period: "12개월",
    description: "안정적인 수익을 원하는 분들을 위한 정기예금 상품입니다. 예금자보호법에 따라 5천만원까지 보호됩니다.",
    features: ["예금자보호", "중도해지 가능", "자동재예치"],
    updatedAt: "2024-12-01",
    source: "KB국민은행 공시자료",
    historicalData: [
      { month: "7월", value: 3.2 },
      { month: "8월", value: 3.3 },
      { month: "9월", value: 3.4 },
      { month: "10월", value: 3.4 },
      { month: "11월", value: 3.5 },
      { month: "12월", value: 3.5 },
    ],
    volatility: 0.1,
  },
  {
    id: "prod-2",
    name: "신한 적금플러스",
    category: "적금",
    provider: "신한은행",
    returnRate: 4.0,
    riskLevel: 1,
    riskGrade: "매우 낮음",
    minInvestment: 10000,
    period: "24개월",
    description: "매월 일정 금액을 저축하여 목돈을 마련할 수 있는 적금 상품입니다.",
    features: ["우대금리 제공", "자동이체 할인", "예금자보호"],
    updatedAt: "2024-12-01",
    source: "신한은행 공시자료",
    historicalData: [
      { month: "7월", value: 3.8 },
      { month: "8월", value: 3.9 },
      { month: "9월", value: 3.9 },
      { month: "10월", value: 4.0 },
      { month: "11월", value: 4.0 },
      { month: "12월", value: 4.0 },
    ],
    volatility: 0.15,
  },
  {
    id: "prod-3",
    name: "삼성 글로벌 배당 펀드",
    category: "펀드",
    provider: "삼성자산운용",
    returnRate: 8.5,
    riskLevel: 3,
    riskGrade: "보통",
    minInvestment: 1000000,
    period: "권장 3년 이상",
    description: "글로벌 우량 배당주에 분산 투자하는 펀드입니다. 안정적인 배당 수익과 자본 이득을 동시에 추구합니다.",
    features: ["글로벌 분산투자", "배당수익", "전문가 운용"],
    updatedAt: "2024-12-01",
    source: "삼성자산운용 공시자료",
    historicalData: [
      { month: "7월", value: 7.2 },
      { month: "8월", value: 6.8 },
      { month: "9월", value: 8.1 },
      { month: "10월", value: 7.9 },
      { month: "11월", value: 8.3 },
      { month: "12월", value: 8.5 },
    ],
    volatility: 12.5,
  },
  {
    id: "prod-4",
    name: "KODEX 200 ETF",
    category: "ETF",
    provider: "삼성자산운용",
    returnRate: 12.3,
    riskLevel: 4,
    riskGrade: "높음",
    minInvestment: 50000,
    period: "자유",
    description: "KOSPI 200 지수를 추종하는 대표적인 국내 ETF입니다. 실시간 매매가 가능합니다.",
    features: ["실시간 매매", "낮은 보수", "분산투자 효과"],
    updatedAt: "2024-12-01",
    source: "한국거래소",
    historicalData: [
      { month: "7월", value: 10.5 },
      { month: "8월", value: 8.2 },
      { month: "9월", value: 11.8 },
      { month: "10월", value: 9.5 },
      { month: "11월", value: 13.2 },
      { month: "12월", value: 12.3 },
    ],
    volatility: 18.5,
  },
  {
    id: "prod-5",
    name: "국고채 3년물",
    category: "채권",
    provider: "대한민국 정부",
    returnRate: 3.2,
    riskLevel: 1,
    riskGrade: "매우 낮음",
    minInvestment: 10000,
    period: "3년",
    description: "대한민국 정부가 발행하는 국채로, 가장 안전한 투자 수단 중 하나입니다.",
    features: ["정부 보증", "안정적 이자", "유동성 양호"],
    updatedAt: "2024-12-01",
    source: "기획재정부",
    historicalData: [
      { month: "7월", value: 3.4 },
      { month: "8월", value: 3.3 },
      { month: "9월", value: 3.2 },
      { month: "10월", value: 3.1 },
      { month: "11월", value: 3.2 },
      { month: "12월", value: 3.2 },
    ],
    volatility: 2.1,
  },
  {
    id: "prod-6",
    name: "삼성전자 보통주",
    category: "주식",
    provider: "삼성전자",
    returnRate: 15.8,
    riskLevel: 4,
    riskGrade: "높음",
    minInvestment: 70000,
    period: "자유",
    description: "대한민국 대표 기업 삼성전자의 보통주입니다. 반도체, 스마트폰 등 다양한 사업을 영위합니다.",
    features: ["배당금 지급", "시가총액 1위", "글로벌 기업"],
    updatedAt: "2024-12-01",
    source: "한국거래소",
    historicalData: [
      { month: "7월", value: 12.5 },
      { month: "8월", value: 8.3 },
      { month: "9월", value: 14.2 },
      { month: "10월", value: 11.8 },
      { month: "11월", value: 16.5 },
      { month: "12월", value: 15.8 },
    ],
    volatility: 25.3,
  },
  {
    id: "prod-7",
    name: "하나 달러예금",
    category: "예금",
    provider: "하나은행",
    returnRate: 4.8,
    riskLevel: 2,
    riskGrade: "낮음",
    minInvestment: 1000,
    period: "6개월",
    description: "미국 달러로 예치하는 외화예금 상품입니다. 환율 변동에 따른 추가 수익 또는 손실이 발생할 수 있습니다.",
    features: ["달러 예치", "환차익 가능", "예금자보호"],
    updatedAt: "2024-12-01",
    source: "하나은행 공시자료",
    historicalData: [
      { month: "7월", value: 4.5 },
      { month: "8월", value: 4.6 },
      { month: "9월", value: 4.7 },
      { month: "10월", value: 4.8 },
      { month: "11월", value: 4.8 },
      { month: "12월", value: 4.8 },
    ],
    volatility: 3.2,
  },
  {
    id: "prod-8",
    name: "미래에셋 테크성장 펀드",
    category: "펀드",
    provider: "미래에셋자산운용",
    returnRate: 22.5,
    riskLevel: 5,
    riskGrade: "매우 높음",
    minInvestment: 500000,
    period: "권장 5년 이상",
    description: "글로벌 기술 성장주에 집중 투자하는 공격적인 펀드입니다. 높은 수익을 기대할 수 있지만 손실 위험도 큽니다.",
    features: ["기술주 집중", "성장 잠재력", "전문가 운용"],
    updatedAt: "2024-12-01",
    source: "미래에셋자산운용 공시자료",
    historicalData: [
      { month: "7월", value: 18.2 },
      { month: "8월", value: 12.5 },
      { month: "9월", value: 25.3 },
      { month: "10월", value: 19.8 },
      { month: "11월", value: 28.1 },
      { month: "12월", value: 22.5 },
    ],
    volatility: 35.2,
  },
];

// 샘플 글 데이터
export const sampleArticles: Article[] = [
  {
    id: "article-1",
    title: "2024년 12월 예금 금리 비교: 어디가 가장 높을까?",
    summary: "주요 시중은행의 정기예금 금리를 비교 분석합니다. 안전하게 목돈을 굴리고 싶은 분들을 위한 가이드입니다.",
    category: "예금",
    tags: ["예금", "금리비교", "안전자산"],
    publishedAt: "2024-12-01",
    updatedAt: "2024-12-01",
    readTime: 5,
    thumbnail: "/images/deposit.jpg",
    products: [sampleProducts[0], sampleProducts[1]],
    content: `
## 2024년 12월 예금 시장 동향

기준금리 동결 기조가 이어지면서 예금 금리도 안정세를 유지하고 있습니다. 
하지만 은행별로 금리 차이가 있으므로 꼼꼼히 비교해보는 것이 좋습니다.

### 주요 은행 금리 현황

| 은행 | 12개월 금리 | 24개월 금리 |
|------|------------|------------|
| KB국민 | 3.5% | 3.6% |
| 신한 | 3.4% | 3.5% |
| 하나 | 3.5% | 3.7% |
| 우리 | 3.3% | 3.4% |

### 예금 선택 시 고려사항

1. **예금자보호 여부**: 5천만원까지 보호됩니다
2. **중도해지 조건**: 급하게 돈이 필요할 때를 대비하세요
3. **우대금리 조건**: 급여이체, 카드실적 등 확인하세요

⚠️ **안내**: 이 글은 정보 제공 목적이며, 투자 권유가 아닙니다.
    `,
  },
  {
    id: "article-2",
    title: "ETF 입문자를 위한 완벽 가이드",
    summary: "ETF가 무엇인지, 어떻게 투자하는지 초보자도 쉽게 이해할 수 있도록 설명합니다.",
    category: "ETF",
    tags: ["ETF", "초보투자", "분산투자"],
    publishedAt: "2024-11-28",
    updatedAt: "2024-12-01",
    readTime: 8,
    thumbnail: "/images/etf.jpg",
    products: [sampleProducts[3]],
    content: `
## ETF란 무엇인가요?

ETF(Exchange Traded Fund)는 주식처럼 거래소에서 사고팔 수 있는 펀드입니다.
여러 종목에 한 번에 투자하는 효과가 있어 분산투자에 유리합니다.

### ETF의 장점

- **분산투자**: 한 종목 리스크를 줄일 수 있습니다
- **낮은 비용**: 일반 펀드보다 운용보수가 저렴합니다
- **실시간 매매**: 주식처럼 언제든 사고팔 수 있습니다

### 대표적인 국내 ETF

KODEX 200은 KOSPI 200 지수를 추종하는 가장 대표적인 ETF입니다.

⚠️ **주의**: ETF도 원금 손실 가능성이 있습니다. 투자 전 충분히 공부하세요.
    `,
  },
  {
    id: "article-3",
    title: "위험도별 포트폴리오 구성 전략",
    summary: "투자 성향에 따라 어떻게 포트폴리오를 구성해야 하는지 알아봅니다.",
    category: "투자전략",
    tags: ["포트폴리오", "자산배분", "위험관리"],
    publishedAt: "2024-11-25",
    updatedAt: "2024-11-30",
    readTime: 10,
    thumbnail: "/images/portfolio.jpg",
    products: [sampleProducts[0], sampleProducts[2], sampleProducts[3], sampleProducts[4]],
    content: `
## 나에게 맞는 포트폴리오 찾기

투자에서 가장 중요한 것은 자신의 투자 성향을 아는 것입니다.

### 보수적 투자자 (위험 회피형)

- 예금/적금: 60%
- 채권: 30%
- 주식/펀드: 10%

### 중립적 투자자 (균형형)

- 예금/적금: 30%
- 채권: 30%
- 주식/펀드: 40%

### 공격적 투자자 (수익 추구형)

- 예금/적금: 10%
- 채권: 20%
- 주식/펀드: 70%

⚠️ **안내**: 위 비율은 일반적인 가이드라인이며, 개인 상황에 따라 조정이 필요합니다.
    `,
  },
  {
    id: "article-4",
    title: "채권 투자, 지금이 적기일까?",
    summary: "금리 변동기에 채권 투자의 매력과 주의점을 분석합니다.",
    category: "채권",
    tags: ["채권", "금리", "안전자산"],
    publishedAt: "2024-11-20",
    updatedAt: "2024-11-28",
    readTime: 7,
    thumbnail: "/images/bond.jpg",
    products: [sampleProducts[4]],
    content: `
## 채권의 기본 이해

채권은 정부나 기업이 자금을 빌리면서 발행하는 차용증서입니다.

### 채권과 금리의 관계

금리가 오르면 채권 가격은 떨어지고, 금리가 내리면 채권 가격은 올라갑니다.

### 국고채의 안정성

국고채는 대한민국 정부가 원리금을 보장하므로 가장 안전한 투자 수단입니다.

⚠️ **참고**: 채권도 중도 매도 시 손실이 발생할 수 있습니다.
    `,
  },
  {
    id: "article-5",
    title: "글로벌 배당 펀드로 월급 외 수입 만들기",
    summary: "배당 펀드를 통해 정기적인 현금 흐름을 만드는 방법을 알아봅니다.",
    category: "펀드",
    tags: ["배당", "펀드", "패시브인컴"],
    publishedAt: "2024-11-15",
    updatedAt: "2024-11-25",
    readTime: 6,
    thumbnail: "/images/dividend.jpg",
    products: [sampleProducts[2]],
    content: `
## 배당 투자의 매력

배당 투자는 주가 상승과 별개로 정기적인 현금 수입을 얻을 수 있습니다.

### 배당 펀드의 장점

- 전문가가 배당주를 선별해줍니다
- 글로벌 분산투자로 리스크를 줄입니다
- 재투자를 통한 복리 효과를 누릴 수 있습니다

⚠️ **주의**: 배당이 줄어들거나 없어질 수 있으며, 원금 손실 가능성도 있습니다.
    `,
  },
  {
    id: "article-6",
    title: "기술주 투자, 높은 수익의 이면",
    summary: "기술 성장주 투자의 기회와 위험을 균형 있게 분석합니다.",
    category: "펀드",
    tags: ["기술주", "성장주", "고위험"],
    publishedAt: "2024-11-10",
    updatedAt: "2024-11-20",
    readTime: 9,
    thumbnail: "/images/tech.jpg",
    products: [sampleProducts[7]],
    content: `
## 기술주 투자의 양면

기술주는 높은 수익 잠재력이 있지만, 그만큼 변동성도 큽니다.

### 최근 기술주 동향

AI, 반도체, 클라우드 관련 기업들이 주목받고 있습니다.

### 투자 시 주의사항

- 단기 급등락에 흔들리지 마세요
- 장기 투자 관점을 유지하세요
- 전체 자산의 일부만 투자하세요

⚠️ **경고**: 기술주는 단기간에 큰 손실이 발생할 수 있습니다. 감당 가능한 금액만 투자하세요.
    `,
  },
];

// 카테고리 목록
export const categories = ["전체", "예금", "적금", "펀드", "ETF", "채권", "주식", "투자전략"];

// 위험도 색상 매핑
export const riskColors: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", label: "매우 낮음" },
  2: { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-400", label: "낮음" },
  3: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", label: "보통" },
  4: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", label: "높음" },
  5: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-400", label: "매우 높음" },
};

// 카테고리 색상 매핑
export const categoryColors: Record<string, string> = {
  "예금": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "적금": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "펀드": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "ETF": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "채권": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  "주식": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "투자전략": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

