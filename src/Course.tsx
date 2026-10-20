import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  List,
  LockKeyhole,
  Maximize,
  Minimize,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { CourseArt } from './Art';
import { CourseCard, EmptyState } from './components';
import { DEMO_PASSWORD, slideContent } from './data';
import type { Course } from './data';
import { getFile } from './services';
import { useAcademy } from './store';

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
async function downloadCourse(course: Course) {
  let blob: Blob;
  let filename: string;
  if (course.fileId) {
    const file = await getFile(course.fileId);
    if (!file) throw new Error('本地资料已丢失，请在管理工作台重新上传。');
    blob = file;
    filename = course.fileName || file.name;
  } else {
    const content = slideContent(course, 1);
    blob = new Blob(
      [
        `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>${escape(course.title)} · 演示讲义</title><style>body{font:18px/1.9 system-ui;max-width:760px;margin:60px auto;padding:24px;color:#243e35}h1{font-size:32px}small{color:#777}</style><h1>${escape(course.title)}</h1><small>扶摇学院 · 演示讲义 · 非正式培训资料</small><p>${escape(course.description)}</p><h2>学习目录</h2><ol>${course.chapters.map((c) => `<li>${escape(c)}</li>`).join('')}</ol><h2>学习要点</h2><ul>${content.points.map((p) => `<li>${escape(p)}</li>`).join('')}</ul><p>内容仅供交互演示，不构成正式培训、合规或投资建议。</p></html>`,
      ],
      { type: 'text/html;charset=utf-8' },
    );
    filename = `${course.title}-演示讲义.html`;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CourseDetail() {
  const { id } = useParams();
  const { courses, categories, favorites, update, toast, unlocked, progress } = useAcademy();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  if (!course) return <MissingCourse />;
  const category = categories.find((c) => c.id === course.category);
  const favorite = favorites.includes(course.id);
  const canRead = !course.protected || unlocked.includes(course.id);
  const related = courses
    .filter((c) => c.id !== id)
    .sort((a, b) => Number(b.category === course.category) - Number(a.category === course.category))
    .slice(0, 3);
  const start = () => navigate(`/${canRead ? 'read' : 'access'}/${course.id}`);
  return (
    <main className="container page-main detail-page">
      <div className="breadcrumb">
        <Link to="/">首页</Link>
        <ChevronRight size={14} />
        <Link to="/courses">课程中心</Link>
        <ChevronRight size={14} />
        <Link to={`/courses?category=${course.category}`}>{category?.name}</Link>
        <ChevronRight size={14} />
        <span>{course.title}</span>
      </div>
      <section className="detail-hero">
        <div className={`detail-cover cover-${course.theme % 6}`}>
          <CourseArt theme={course.theme} />
          <div className="cover-copy">
            <span>扶摇学院 · {category?.name}</span>
            <strong>{course.title}</strong>
            <i>{course.subtitle}</i>
          </div>
          <span className="detail-cover-footer">数字课件 · 让成长持续发生</span>
        </div>
        <div className="detail-intro">
          <div className="detail-tags">
            <span className="tag">{category?.name}</span>
            {course.featured && <span className="tag gold">学院精选</span>}
            {course.protected && (
              <span className="tag neutral">
                <LockKeyhole size={12} />
                密码访问
              </span>
            )}
          </div>
          <h1>{course.title}</h1>
          <p>{course.subtitle}</p>
          <div className="detail-metadata">
            <span>
              <Clock3 size={16} />
              {course.duration} 分钟
            </span>
            <span>
              <FileText size={16} />
              {course.pages} 页 · {course.format}
            </span>
            <span>
              <GraduationCap size={16} />
              {course.teacher}
            </span>
          </div>
          <div className="detail-actions">
            <button className="button primary" onClick={start}>
              <BookOpen size={18} />
              {progress[course.id] ? '继续学习' : '开始学习'}
              <ArrowRight size={17} />
            </button>
            <button
              className={`button ${favorite ? 'selected' : ''}`}
              onClick={() => {
                if (
                  update((d) => ({
                    ...d,
                    favorites: favorite
                      ? d.favorites.filter((i) => i !== id)
                      : [...d.favorites, course.id],
                  }))
                )
                  toast(favorite ? '已取消收藏' : '已加入我的收藏');
              }}
            >
              <Bookmark size={17} fill={favorite ? 'currentColor' : 'none'} />
              {favorite ? '已收藏' : '收藏课程'}
            </button>
          </div>
          <small className="detail-update">
            最近更新于 {course.updatedAt.replaceAll('-', '.')}
            <span> · {course.fileId ? '本地上传资料' : '演示课程内容'}</span>
          </small>
        </div>
      </section>
      <div className="detail-columns">
        <div>
          <section className="content-panel">
            <h2>
              <span />
              课程介绍
            </h2>
            <p>{course.description}</p>
            <h3>
              <Users size={18} />
              适用人群
            </h3>
            <p>{course.audience}</p>
            <h3>
              <Check size={18} />
              你将收获
            </h3>
            <div className="outcome-list">
              {slideContent(course, 1).points.map((p) => (
                <div key={p}>
                  <Check size={16} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="content-panel">
            <h2>
              <span />
              课程目录<span className="heading-note">共 {course.chapters.length} 个章节</span>
            </h2>
            <div className="chapter-list">
              {course.chapters.map((ch, i) => (
                <button
                  key={i}
                  onClick={() =>
                    navigate(
                      canRead
                        ? `/read/${course.id}?page=${Math.floor((i * course.pages) / course.chapters.length) + 1}`
                        : `/access/${course.id}`,
                    )
                  }
                >
                  <span className="chapter-number">{String(i + 1).padStart(2, '0')}</span>
                  <span>{ch}</span>
                  <small>第 {Math.floor((i * course.pages) / course.chapters.length) + 1} 页</small>
                  {canRead ? <ArrowUpRight size={17} /> : <LockKeyhole size={15} />}
                </button>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <section className="content-panel resource-panel">
            <h2>课程资料</h2>
            <div className="resource-file">
              <span>
                <FileText size={25} />
              </span>
              <div>
                <strong>{course.fileName || `${course.title} · 演示课件`}</strong>
                <small>
                  {course.format} ·{' '}
                  {course.fileId ? '保存在当前浏览器' : '模拟资料，无真实课件文件'}
                </small>
              </div>
            </div>
            <button className="button primary full" onClick={start}>
              <Eye size={17} />
              在线阅读
            </button>
            <button
              className="button full"
              disabled={!course.downloadable}
              onClick={() => {
                if (!canRead) {
                  navigate(`/access/${course.id}`);
                  return;
                }
                downloadCourse(course)
                  .then(() => toast(course.fileId ? '已开始下载原始资料' : '已下载 HTML 演示讲义'))
                  .catch((e) => toast(e.message));
              }}
            >
              <ArrowDownToLine size={17} />
              {course.downloadable
                ? course.fileId
                  ? '下载原始资料'
                  : '下载演示讲义'
                : '本课程暂不开放下载'}
            </button>
            <p className="resource-note">
              {course.downloadable
                ? '初始课程下载为 HTML 演示讲义，可在浏览器打开或打印。'
                : '下载开关仅用于界面演示，不具备真实权限控制能力。'}
            </p>
          </section>
          <div className="detail-tip">
            <ShieldCheck size={22} />
            <div>
              <strong>让学习回归专注</strong>
              <p>按自己的节奏阅读，随时回顾。你的收藏和阅读进度会保存在本机。</p>
            </div>
          </div>
        </aside>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">继续探索</span>
            <h2>下一份收获，或许就在这里</h2>
          </div>
          <Link className="text-link" to="/courses">
            全部课程
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="course-grid">
          {related.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </main>
  );
}

export function Access() {
  const { id } = useParams();
  const { courses, unlock, unlocked } = useAcademy();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const course = courses.find((c) => c.id === id);
  if (!course) return <MissingCourse />;
  if (!course.protected || unlocked.includes(course.id))
    return <Navigate replace to={`/read/${course.id}`} />;
  return (
    <main className="container access-page">
      <Link className="back-link" to={`/course/${course.id}`}>
        <ArrowLeft size={16} />
        返回课程详情
      </Link>
      <div className="access-card">
        <div className="access-art">
          <div className="access-seal">
            <LockKeyhole size={43} strokeWidth={1} />
          </div>
          <span className="section-eyebrow">为专注学习，留一扇门</span>
          <h2>
            知识有界，
            <br />
            成长无界。
          </h2>
          <p>
            这是一门需要访问密码的课程。
            <br />
            验证后，即可开启学习。
          </p>
          <div className="access-art-bottom">
            <BookOpen size={19} />
            扶摇学院 · 数字课件中心
          </div>
        </div>
        <div className="access-form">
          <span className="tag neutral">
            <LockKeyhole size={13} />
            课程访问验证
          </span>
          <h1>{course.title}</h1>
          <p>输入课程访问密码，继续你的学习旅程。</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === DEMO_PASSWORD) {
                unlock(course.id);
                navigate(`/read/${course.id}`, { replace: true });
              } else setError('密码不正确，请使用下方演示密码重试。');
            }}
          >
            <label htmlFor="course-password">访问密码</label>
            <div className={`password-input ${error ? 'invalid' : ''}`}>
              <LockKeyhole size={17} />
              <input
                id="course-password"
                type={show ? 'text' : 'password'}
                autoComplete="off"
                required
                value={password}
                placeholder="请输入访问密码"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                aria-describedby={error ? 'password-error' : 'demo-hint'}
              />
              <button
                type="button"
                className="icon-button"
                aria-label={show ? '隐藏密码' : '显示密码'}
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="field-error" id="password-error" role="alert">
                {error}
              </p>
            )}
            <button className="button primary full" type="submit">
              验证并开始学习
              <ArrowRight size={17} />
            </button>
          </form>
          <div className="demo-hint" id="demo-hint">
            <strong>原型体验说明</strong>
            <p>
              演示密码：<code>{DEMO_PASSWORD}</code>
            </p>
            <p>仅模拟访问流程，没有真实身份认证，前端密码可被绕过，不具备安全保护能力。</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export function Reader() {
  const { id } = useParams();
  const { courses, categories, progress, update, unlocked, toast } = useAcademy();
  const course = courses.find((c) => c.id === id);
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(() => {
    const requested = Number(new URLSearchParams(window.location.hash.split('?')[1]).get('page'));
    return Math.max(1, Math.min(course?.pages || 1, requested || progress[id || ''] || 1));
  });
  const [sidebar, setSidebar] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const authorized = !!course && (!course.protected || unlocked.includes(course.id));
  const isPdf = !!course?.fileId && course.format === 'PDF';
  useEffect(() => {
    if (course && authorized && !isPdf)
      update((d) => ({ ...d, progress: { ...d.progress, [course.id]: page } }));
  }, [course?.id, page, authorized, isPdf]);
  useEffect(() => {
    const listener = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', listener);
    return () => document.removeEventListener('fullscreenchange', listener);
  }, []);
  useEffect(() => {
    if (!course || !authorized || !isPdf) return;
    let canceled = false;
    let url = '';
    setFileError('');
    getFile(course.fileId!)
      .then((file) => {
        if (!file) throw new Error('本地 PDF 已丢失，请在管理工作台重新上传。');
        if (!canceled) {
          url = URL.createObjectURL(file);
          setFileUrl(url);
        }
      })
      .catch((e) => {
        if (!canceled) setFileError(e.message);
      });
    return () => {
      canceled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [course?.fileId, authorized, isPdf]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches('input,select,textarea') || !authorized || isPdf)
        return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setPage((p) => Math.min(course?.pages || 1, p + 1));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPage((p) => Math.max(1, p - 1));
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [course?.pages, authorized, isPdf]);
  if (!course) return <MissingCourse />;
  if (!authorized) return <Navigate replace to={`/access/${course.id}`} />;
  const { chapter, points } = slideContent(course, page);
  const chapterIndex = Math.min(
    course.chapters.length - 1,
    Math.ceil((page / course.pages) * course.chapters.length) - 1,
  );
  return (
    <div className="reader" ref={container}>
      <header className="reader-header">
        <Link className="reader-back" to={`/course/${course.id}`}>
          <ArrowLeft size={20} />
          <span>返回课程</span>
        </Link>
        <div>
          <strong>{course.title}</strong>
          <span>
            {categories.find((c) => c.id === course.category)?.name} ·{' '}
            {isPdf ? '本地 PDF' : '演示课件'}
          </span>
        </div>
        <div className="reader-header-actions">
          {course.downloadable && (
            <button
              className="icon-button"
              aria-label="下载资料"
              onClick={() =>
                downloadCourse(course)
                  .then(() => toast('已开始下载资料'))
                  .catch((e) => toast(e.message))
              }
            >
              <ArrowDownToLine size={20} />
            </button>
          )}
          <button
            className="icon-button"
            aria-label={fullscreen ? '退出全屏' : '全屏阅读'}
            onClick={() => {
              if (document.fullscreenElement)
                document.exitFullscreen().catch(() => toast('退出全屏失败，请按 Esc 重试。'));
              else if (container.current?.requestFullscreen)
                container.current
                  .requestFullscreen()
                  .catch(() => toast('当前浏览器暂不支持全屏，请使用浏览器全屏功能。'));
              else toast('当前浏览器暂不支持全屏。');
            }}
          >
            {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </header>
      <div className="reader-body">
        {sidebar && (
          <button
            className="reader-backdrop"
            aria-label="关闭目录"
            onClick={() => setSidebar(false)}
          />
        )}
        <aside className={`reader-sidebar ${sidebar ? 'open' : ''}`}>
          <div className="reader-sidebar-title">
            <span>
              <List size={18} />
              课程目录
            </span>
            <button
              className="icon-button mobile-only"
              aria-label="关闭目录"
              onClick={() => setSidebar(false)}
            >
              <X size={18} />
            </button>
          </div>
          <p>
            {isPdf
              ? '使用 PDF 内置工具翻页和搜索'
              : `${course.chapters.length} 个章节 · ${course.pages} 页演示内容`}
          </p>
          {course.chapters.map((ch, i) => (
            <button
              key={i}
              disabled={isPdf}
              className={chapterIndex === i && !isPdf ? 'active' : ''}
              onClick={() => {
                setPage(Math.floor((i * course.pages) / course.chapters.length) + 1);
                setSidebar(false);
              }}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                {ch}
                <small>
                  {isPdf
                    ? '演示课程目录'
                    : `第 ${Math.floor((i * course.pages) / course.chapters.length) + 1} 页`}
                </small>
              </div>
              {chapterIndex === i && !isPdf && <span className="reading-dot" />}
            </button>
          ))}
          <div className="reader-sidebar-note">
            <BookOpen size={22} />
            <strong>慢慢学，也在向前。</strong>
            <p>
              {isPdf
                ? 'PDF 使用浏览器原生预览，实际页数以文件为准。'
                : '阅读进度会自动保存，下次可以从这里继续。'}
            </p>
          </div>
          <Link className="text-link" to={`/course/${course.id}`}>
            <ArrowLeft size={15} />
            返回课程详情
          </Link>
        </aside>
        <main className="reader-stage">
          <div className="reader-topline">
            <span>
              {isPdf
                ? course.fileName
                : `${String(chapterIndex + 1).padStart(2, '0')} / ${chapter}`}
            </span>
            <span>{isPdf ? '浏览器原生预览' : '演示内容 · 非正式培训资料'}</span>
          </div>
          {isPdf ? (
            <div className="pdf-stage">
              {fileError ? (
                <EmptyState
                  title="资料暂时无法读取"
                  description={fileError}
                  action={
                    <Link className="button" to="/admin">
                      前往管理工作台
                    </Link>
                  }
                />
              ) : fileUrl ? (
                <iframe title={`${course.title} PDF 预览`} src={fileUrl} />
              ) : (
                <p role="status">正在读取本地 PDF…</p>
              )}
            </div>
          ) : (
            <div className={`slide slide-theme-${course.theme % 6}`}>
              <div className="slide-brand">
                <BookOpen size={21} />
                <span>扶摇学院</span>
                <small>道术兼济，鲲鹏天下</small>
              </div>
              {page === 1 ? (
                <div className="slide-cover">
                  <div>
                    <span className="section-eyebrow">
                      {categories.find((c) => c.id === course.category)?.name} · 专题学习
                    </span>
                    <h1>{course.title}</h1>
                    <p>{course.subtitle}</p>
                    <div className="slide-rule" />
                    <small>{course.teacher} · 数字课件中心</small>
                  </div>
                  <div className="slide-cover-art">
                    <CourseArt theme={course.theme} />
                  </div>
                </div>
              ) : (
                <div className="slide-content">
                  <span className="section-eyebrow">
                    第 {String(chapterIndex + 1).padStart(2, '0')} 章 ·{' '}
                    {page % 2 === 0 ? '理解与认识' : '实践与思考'}
                  </span>
                  <h1>{chapter}</h1>
                  <p className="slide-intro">
                    {page % 2 === 0
                      ? '让知识形成框架，让专业拥有根基。'
                      : '把理解带入真实场景，让学习成为自己的能力。'}
                  </p>
                  <div className="slide-points">
                    {points.map((p, i) => (
                      <div key={p}>
                        <span>0{i + 1}</span>
                        <p>{p}</p>
                      </div>
                    ))}
                  </div>
                  <div className="slide-reflection">
                    <strong>{page === course.pages ? '学习回顾' : '思考一下'}</strong>
                    <span>
                      {page === course.pages
                        ? '选一个最有启发的要点，写下你准备采取的下一步行动。'
                        : `结合“${chapter}”，你能想到一个工作中的具体例子吗？`}
                    </span>
                  </div>
                </div>
              )}
              <div className="slide-footer">
                <span>扶摇学院 · 内部学习演示资料</span>
                <span>
                  {String(page).padStart(2, '0')} / {String(course.pages).padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
          {course.fileId && course.format === 'PPT' && (
            <div className="ppt-notice">
              已保存 {course.fileName}。当前为模拟阅读页，尚未转换或展示上传的 PPT 内容；
              {course.downloadable
                ? '可下载原件在本机打开。'
                : '如需查看原件，请联系课程管理员开启下载。'}
            </div>
          )}
          <div className="reader-controls">
            <button className="button directory-button" onClick={() => setSidebar(!sidebar)}>
              <List size={17} />
              目录
            </button>
            {!isPdf && (
              <>
                <div className="pagination">
                  <button
                    className="icon-button"
                    aria-label="上一页"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <ChevronLeft size={21} />
                  </button>
                  <label>
                    <select
                      aria-label="跳转页码"
                      value={page}
                      onChange={(e) => setPage(Number(e.target.value))}
                    >
                      {Array.from({ length: course.pages }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <span> / {course.pages}</span>
                  </label>
                  <button
                    className="icon-button"
                    aria-label="下一页"
                    disabled={page === course.pages}
                    onClick={() => setPage(page + 1)}
                  >
                    <ChevronRight size={21} />
                  </button>
                </div>
                <span className="keyboard-hint">使用 ← → 翻页</span>
              </>
            )}
            {isPdf && <span className="muted">使用 PDF 阅读器的工具栏操作</span>}
          </div>
          {!isPdf && page === course.pages && (
            <div className="completion">
              <span>
                <Check size={18} />
                本次阅读已到最后一页，给自己的进步一个肯定。
              </span>
              <button onClick={() => navigate('/courses')}>
                继续探索
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
function MissingCourse() {
  return (
    <main className="container page-main">
      <EmptyState
        title="这门课程暂时不在书架上"
        description="课程可能已被删除，看看其他学习内容吧。"
        action={
          <Link className="button primary" to="/courses">
            返回课程中心
          </Link>
        }
      />
    </main>
  );
}
