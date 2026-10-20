export type Category = { id: string; name: string; description: string };
export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  audience: string;
  teacher: string;
  duration: number;
  pages: number;
  format: 'PDF' | 'PPT';
  theme: number;
  updatedAt: string;
  featured: boolean;
  protected: boolean;
  downloadable: boolean;
  fileName?: string;
  fileId?: string;
  chapters: string[];
};

export const initialCategories: Category[] = [
  { id: 'culture', name: '企业文化', description: '认同理念，与企业同行' },
  { id: 'industry', name: '行业认知', description: '打开视野，洞察新价值' },
  { id: 'product', name: '产品知识', description: '深耕专业，读懂好产品' },
  { id: 'marketing', name: '营销技能', description: '真诚沟通，连接每一份信任' },
  { id: 'growth', name: '人才培养', description: '积蓄力量，遇见更好的自己' },
  { id: 'compliance', name: '合规教育', description: '心有所守，行有所循' },
];

export const initialCourses: Course[] = [
  {
    id: 'oriental',
    title: '走进东方金典',
    subtitle: '以文化凝聚力量，以初心共赴远方',
    description:
      '从品牌故事到文化理念，从团队精神到日常行动，一起认识东方金典。用一堂课建立共同语言，找到个人成长与企业发展的交汇点。',
    category: 'culture',
    audience: '新入职伙伴、希望了解企业文化的全体员工',
    teacher: '学院教研组',
    duration: 25,
    pages: 8,
    format: 'PDF',
    theme: 0,
    updatedAt: '2026-10-18',
    featured: true,
    protected: false,
    downloadable: true,
    chapters: ['初识东方金典', '我们的文化与理念', '团队与共同成长', '让文化融入日常'],
  },
  {
    id: 'coin-values',
    title: '钱币收藏六大价值',
    subtitle: '方寸之间，读懂时间的价值',
    description:
      '走近钱币背后的历史、文化与艺术。从六个角度建立收藏知识框架，学习观察、理解和表达钱币的独特价值。课程为基础认知演示，不构成投资建议。',
    category: 'industry',
    audience: '收藏行业新人、客户顾问及对钱币文化感兴趣的学习者',
    teacher: '学院教研组',
    duration: 35,
    pages: 12,
    format: 'PPT',
    theme: 1,
    updatedAt: '2026-10-17',
    featured: true,
    protected: false,
    downloadable: true,
    chapters: ['钱币与时代的对话', '历史、文化与艺术', '工艺、研究与情感', '建立理性的收藏观'],
  },
  {
    id: 'rmb-fourth',
    title: '第四套人民币收藏知识',
    subtitle: '一套人民币，一段时代记忆',
    description:
      '认识第四套人民币的发行背景、票面设计与基础鉴赏要点。通过知识卡片和观察方法，建立有条理的产品知识体系。内容仅为原型演示。',
    category: 'product',
    audience: '产品顾问、培训讲师及钱币知识爱好者',
    teacher: '产品培训组',
    duration: 40,
    pages: 10,
    format: 'PDF',
    theme: 2,
    updatedAt: '2026-10-16',
    featured: true,
    protected: true,
    downloadable: false,
    chapters: [
      '时代背景与发行故事',
      '票面设计与艺术表达',
      '基础观察与知识辨析',
      '知识回顾与学习建议',
    ],
  },
  {
    id: 'communication',
    title: '客户需求分析与沟通',
    subtitle: '从认真倾听开始，让沟通更有温度',
    description:
      '了解需求识别、开放式提问与反馈确认的基本方法。结合日常服务情境，练习从客户视角思考，把专业知识转化为清晰、真诚的沟通。',
    category: 'marketing',
    audience: '客户顾问、销售伙伴及客户服务人员',
    teacher: '营销培训组',
    duration: 30,
    pages: 8,
    format: 'PPT',
    theme: 3,
    updatedAt: '2026-10-15',
    featured: false,
    protected: false,
    downloadable: true,
    chapters: ['从倾听开始', '发现真实需求', '有温度地表达', '情境练习与复盘'],
  },
  {
    id: 'career',
    title: '新人职业成长课程',
    subtitle: '每一个小小的进步，都通向更好的自己',
    description:
      '为职业旅程的起点准备一份成长地图。围绕角色认知、工作习惯、协作方法和个人计划，帮助新伙伴稳步融入团队，开启持续学习。',
    category: 'growth',
    audience: '新入职员工、带教伙伴及基层团队负责人',
    teacher: '人才发展组',
    duration: 30,
    pages: 8,
    format: 'PDF',
    theme: 4,
    updatedAt: '2026-10-14',
    featured: false,
    protected: false,
    downloadable: true,
    chapters: ['找到自己的坐标', '建立高效工作习惯', '在协作中成长', '写下你的成长计划'],
  },
  {
    id: 'compliance',
    title: '合规与职业行为规范',
    subtitle: '心有准绳，行稳致远',
    description:
      '理解职业行为中的责任与边界，学习信息保护、真实表达和风险反馈等基础原则。通过常见场景建立合规意识，让专业与信任同行。',
    category: 'compliance',
    audience: '全体员工及获得授权的合作伙伴',
    teacher: '合规培训组',
    duration: 20,
    pages: 8,
    format: 'PDF',
    theme: 5,
    updatedAt: '2026-10-13',
    featured: false,
    protected: true,
    downloadable: false,
    chapters: ['理解责任与边界', '保护信息与隐私', '真实表达与专业服务', '发现问题与及时反馈'],
  },
];

export const DEMO_PASSWORD = 'fuyao2026';

export function slideContent(course: Course, page: number) {
  const chapter =
    course.chapters[
      Math.max(
        0,
        Math.min(
          Math.ceil((page / course.pages) * course.chapters.length) - 1,
          course.chapters.length - 1,
        ),
      )
    ];
  const examples: Record<string, string[]> = {
    culture: [
      '了解共同的文化理念，建立彼此信任的工作关系。',
      '将专业与真诚落到每一次沟通和每一个细节。',
      '保持学习、主动协作，让个人成长融入团队前行。',
    ],
    industry: [
      '观察时代背景，理解钱币承载的历史与文化信息。',
      '从设计、工艺与故事出发，建立多角度认知。',
      '尊重事实与个人兴趣，理性理解收藏，避免收益承诺。',
    ],
    product: [
      '先了解发行背景，再观察票面图案与设计语言。',
      '用可靠资料核对知识，区分事实、观点与传闻。',
      '把观察记录整理为知识卡片，逐步形成产品知识体系。',
    ],
    marketing: [
      '使用开放式提问，邀请对方表达真实想法。',
      '复述关键需求，确认理解后再提出建议。',
      '清晰说明适用条件与边界，尊重客户的自主选择。',
    ],
    growth: [
      '明确当前角色与目标，把大目标拆成可行动的小步骤。',
      '记录行动与反馈，逐步建立自己的工作方法。',
      '主动寻求协作与帮助，让每次复盘成为进步的起点。',
    ],
    compliance: [
      '保护个人与业务信息，仅在获得授权的范围内使用。',
      '坚持真实、准确的表达，不夸大效果或作出不当承诺。',
      '遇到不确定事项，及时向负责人确认并做好记录。',
    ],
  };
  return {
    chapter,
    points: examples[course.category] ?? [
      '理解课程的核心概念，形成自己的知识框架。',
      '结合工作场景思考，在实践中检验所学。',
      '记录问题与收获，把学习转化为下一步行动。',
    ],
  };
}
