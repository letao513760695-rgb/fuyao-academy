import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  Compass,
  FileText,
  LayoutGrid,
  List,
  LockKeyhole,
  Search,
  Sparkles,
} from 'lucide-react';
import { HeroArt } from './Art';
import { categoryIcons, CourseCard, EmptyState, SearchField } from './components';
import { useAcademy } from './store';

export function Home() {
  const { courses, categories } = useAcademy();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const visible = courses
    .filter((c) => category === 'all' || c.category === category)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 6);
  const latest = [...courses].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);
  return (
    <main>
      <section className="container hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span />
            在这里，遇见成长的更多可能
          </div>
          <h1>
            让知识生长，
            <br />
            让每一步<span>都有方向。</span>
          </h1>
          <p className="hero-description">
            连接专业知识与实践，沉淀每一份经验。
            <br />
            你的成长之旅，从扶摇学院开始。
          </p>
          <SearchField
            value={query}
            onChange={setQuery}
            large
            onSubmit={() => navigate(`/courses${query ? `?q=${encodeURIComponent(query)}` : ''}`)}
          />
          <div className="hot-search">
            <span>热门搜索</span>
            {['企业文化', '收藏知识', '沟通'].map((s) => (
              <button key={s} onClick={() => navigate(`/courses?q=${encodeURIComponent(s)}`)}>
                {s}
                <ArrowUpRight size={11} />
              </button>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <HeroArt />
          <div className="hero-art-label">
            <span>
              <Sparkles size={16} />
            </span>
            <div>
              <strong>学习，向上而行</strong>
              <small>积跬步，至千里</small>
            </div>
          </div>
          <div className="hero-side-text">道术兼济 · 鲲鹏天下</div>
        </div>
        <div className="hero-bottom">
          <span>
            <BookOpen size={16} />
            一座随时为你开放的知识书院
          </span>
          <div>
            <span>
              <b>{categories.length}</b> 大学习领域
            </span>
            <i />
            <span>
              <b>{courses.length}</b> 门成长课程
            </span>
            <i />
            <span>
              <b>随时</b> 自主学习
            </span>
          </div>
        </div>
      </section>
      <section className="container category-section">
        <div className="section-heading compact">
          <div>
            <h2>
              {categories.length === 6 ? '六大学习领域' : '学习领域'}
              <span>构建你的专业知识版图</span>
            </h2>
          </div>
          <Link className="text-link" to="/courses">
            全部课程
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => {
            const Icon = categoryIcons[i % 6];
            return (
              <Link
                key={c.id}
                to={`/courses?category=${c.id}`}
                className={`category-tile category-${i}`}
              >
                <div className="category-icon">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <strong>{c.name}</strong>
                <span>
                  {courses.filter((item) => item.category === c.id).length} 门课程
                  <ChevronRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container featured-section">
        <div className="section-heading">
          <div>
            <div className="section-eyebrow">
              <span />
              精选好课
            </div>
            <h2>每一份知识，都值得探索</h2>
            <p>精选实用课程，陪伴你的每一次进步。</p>
          </div>
          <Link className="text-link" to="/courses">
            探索全部课程
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="course-tabs" role="group" aria-label="精选课程分类">
          <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>
            全部课程
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={category === c.id ? 'active' : ''}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="course-grid">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {!visible.length && (
          <EmptyState description="这个领域的课程正在准备中，先探索其他知识吧。" />
        )}
      </section>
      <section className="container lower-section">
        <div className="updates-panel">
          <div className="section-heading compact">
            <h2>
              新知速递<span className="tiny-badge">持续更新</span>
            </h2>
            <Link className="text-link" to="/courses?sort=newest">
              查看全部
              <ArrowRight size={15} />
            </Link>
          </div>
          {latest.map((c, i) => (
            <Link className="update-row" key={c.id} to={`/course/${c.id}`}>
              <span className={`update-icon update-icon-${i}`}>
                <FileText size={21} />
              </span>
              <span>
                <strong>{c.title}</strong>
                <small>
                  {categories.find((cat) => cat.id === c.category)?.name} · {c.format} 课件
                </small>
              </span>
              <time>{c.updatedAt.slice(5).replace('-', '月')}日</time>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
        <div className="learning-banner">
          <div className="banner-decoration">
            <Compass size={113} strokeWidth={0.6} />
          </div>
          <span className="section-eyebrow">每一次学习，都在积蓄力量</span>
          <h2>
            不止于知道，
            <br />
            更在于做到。
          </h2>
          <p>
            把今天的收获，变成明天的底气。
            <br />
            从一门好课开始，探索自己的成长节奏。
          </p>
          <Link to="/guide">
            开启学习之旅
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export function Catalog() {
  const { courses, categories, favorites } = useAcademy();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const category = params.get('category') || 'all';
  const favoriteOnly = params.get('view') === 'favorites';
  const [layout, setLayout] = useState('grid');
  const sort = params.get('sort') || 'featured';
  const setParam = (name: string, value: string) =>
    setParams(
      (p) => {
        if (value) p.set(name, value);
        else p.delete(name);
        return p;
      },
      { replace: true },
    );
  const visible = courses
    .filter((c) => {
      const text = [
        c.title,
        c.subtitle,
        c.description,
        c.audience,
        ...c.chapters,
        categories.find((cat) => cat.id === c.category)?.name,
      ]
        .join(' ')
        .toLowerCase();
      return (
        (category === 'all' || c.category === category) &&
        (!favoriteOnly || favorites.includes(c.id)) &&
        text.includes(query.trim().toLowerCase())
      );
    })
    .sort((a, b) =>
      sort === 'newest'
        ? b.updatedAt.localeCompare(a.updatedAt)
        : sort === 'duration'
          ? a.duration - b.duration
          : Number(b.featured) - Number(a.featured),
    );
  return (
    <main className="container page-main">
      <div className="breadcrumb">
        <Link to="/">首页</Link>
        <ChevronRight size={14} />
        <span>课程中心</span>
      </div>
      <div className="catalog-heading">
        <div>
          <div className="section-eyebrow">
            <span />
            探索 · 学习 · 成长
          </div>
          <h1>每一步成长，都有好课相伴。</h1>
          <p>在不同学习领域中，找到属于你的下一份收获。</p>
        </div>
        <div className="catalog-illustration">
          <BookOpen size={65} strokeWidth={1} />
          <Sparkles size={23} />
        </div>
      </div>
      <div className="catalog-controls">
        <SearchField value={query} onChange={(value) => setParam('q', value)} />
        <button
          className={`button favorites-filter ${favoriteOnly ? 'selected' : ''}`}
          onClick={() => setParam('view', favoriteOnly ? '' : 'favorites')}
          aria-pressed={favoriteOnly}
        >
          <Bookmark size={17} />
          {favoriteOnly ? '我的收藏' : '只看收藏'}
          <span>{favorites.filter((id) => courses.some((c) => c.id === id)).length}</span>
        </button>
      </div>
      <div className="filter-panel">
        <span>课程分类</span>
        <div className="course-tabs" role="group" aria-label="课程分类">
          <button
            className={category === 'all' ? 'active' : ''}
            onClick={() => setParam('category', '')}
          >
            全部课程
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={category === c.id ? 'active' : ''}
              onClick={() => setParam('category', c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="result-toolbar">
        <span>
          共 <b>{visible.length}</b> 门课程{query && <> · 搜索“{query}”</>}
        </span>
        <div>
          <label className="sort-label">
            排序
            <select
              aria-label="课程排序"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
            >
              <option value="featured">精选推荐</option>
              <option value="newest">最新更新</option>
              <option value="duration">学习时长</option>
            </select>
          </label>
          <div className="view-switch">
            <button
              aria-label="网格视图"
              aria-pressed={layout === 'grid'}
              className={layout === 'grid' ? 'active' : ''}
              onClick={() => setLayout('grid')}
            >
              <LayoutGrid size={17} />
            </button>
            <button
              aria-label="列表视图"
              aria-pressed={layout === 'list'}
              className={layout === 'list' ? 'active' : ''}
              onClick={() => setLayout('list')}
            >
              <List size={19} />
            </button>
          </div>
        </div>
      </div>
      {visible.length ? (
        <div className={layout === 'grid' ? 'course-grid' : 'course-list'}>
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} list={layout === 'list'} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={favoriteOnly && !query ? '还没有收藏的课程' : '没有找到相关课程'}
          description={
            favoriteOnly
              ? '点击课程上的书签，保存你感兴趣的内容。'
              : '试试“企业文化”“收藏”或“沟通”，也可以清除筛选。'
          }
          action={
            <button className="button" onClick={() => setParams({})}>
              查看全部课程
            </button>
          }
        />
      )}
    </main>
  );
}

export function Guide() {
  return (
    <main className="container page-main guide-page">
      <div className="breadcrumb">
        <Link to="/">首页</Link>
        <ChevronRight size={14} />
        学习指南
      </div>
      <div className="guide-heading">
        <span className="section-eyebrow">从好奇出发，与知识相遇</span>
        <h1>你的学习旅程，从这里开始。</h1>
        <p>不用复杂的准备，为自己留一点学习的时间。</p>
      </div>
      <div className="guide-steps">
        {[
          {
            icon: Search,
            title: '找到想学的内容',
            text: '在首页搜索课程关键词，或从六大学习领域进入。收藏感兴趣的课程，下次回来可以快速找到。',
          },
          {
            icon: BookOpen,
            title: '按自己的节奏阅读',
            text: '进入课程详情，点击“开始学习”。演示课件支持目录、翻页、键盘方向键和全屏，阅读进度自动保存在本机。',
          },
          {
            icon: Check,
            title: '让所学成为收获',
            text: '结合工作场景回顾所学，继续探索推荐课程。允许下载的课程可保存演示讲义或已上传的原始文件。',
          },
        ].map((s, i) => (
          <article key={s.title}>
            <span className="guide-number">0{i + 1}</span>
            <s.icon size={31} strokeWidth={1.5} />
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <div className="guide-faq">
        <h2>关于这个学习空间</h2>
        <details open>
          <summary>
            <LockKeyhole size={18} />
            如何访问有密码的课程？
          </summary>
          <p>
            课程详情会标注访问限制。点击开始学习后，输入演示密码 <code>fuyao2026</code>{' '}
            即可继续。本原型没有身份认证或服务端权限校验，前端密码可以被绕过，不具备真实安全保护能力，请勿上传敏感资料。
          </p>
        </details>
        <details>
          <summary>
            <ArrowDownToLine size={18} />
            资料如何预览和下载？
          </summary>
          <p>
            六门初始课程使用模拟幻灯片，不是真实课件。管理工作台可在本机添加 PDF、PPT、PPTX（不超过
            20 MB）。PDF 使用浏览器内置阅读器；PPT
            不会自动转换，显示演示阅读页。开启下载后，上传文件可下载原件，初始课程提供带演示标识的
            HTML 讲义。
          </p>
        </details>
        <details>
          <summary>
            <Bookmark size={18} />
            课程和学习进度会保存在哪里？
          </summary>
          <p>
            课程信息、收藏与阅读进度保存在当前浏览器的本地存储，上传资料保存在
            IndexedDB。不会上传服务器，也不会跨设备同步；清除浏览器数据将删除这些记录。
          </p>
        </details>
        <details>
          <summary>
            <ShieldIcon />
            管理员功能是否有权限保护？
          </summary>
          <p>
            管理工作台是开放的交互演示，任何访问者都能进入。下载开关和访问密码仅演示界面流程；正式使用需要服务端身份认证、授权、审计和云存储。体验版仅用于演示，请勿上传敏感资料。
          </p>
        </details>
      </div>
      <div className="guide-cta">
        <h2>今天，也向前一步。</h2>
        <Link className="button primary" to="/courses">
          探索课程
          <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  );
}
function ShieldIcon() {
  return <LockKeyhole size={18} />;
}
