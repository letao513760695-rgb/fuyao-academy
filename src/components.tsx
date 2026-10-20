import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Building2,
  ChartNoAxesCombined,
  Clock3,
  FileText,
  Gem,
  GraduationCap,
  LockKeyhole,
  MessagesSquare,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CourseArt } from './Art';
import { useAcademy } from './store';
import type { Course } from './data';

const coverLines: Record<string, string[]> = {
  走进东方金典: ['走进东方金典'],
  钱币收藏六大价值: ['钱币收藏', '六大价值'],
  第四套人民币收藏知识: ['第四套人民币', '收藏知识'],
  客户需求分析与沟通: ['客户需求分析', '与沟通'],
  新人职业成长课程: ['新人职业', '成长课程'],
  合规与职业行为规范: ['合规与职业', '行为规范'],
};

export const categoryIcons = [
  Building2,
  ChartNoAxesCombined,
  Gem,
  MessagesSquare,
  GraduationCap,
  ShieldCheck,
];
export function Brand({ small = false }: { small?: boolean }) {
  return (
    <Link to="/" className={`brand ${small ? 'small' : ''}`} aria-label="扶摇学院首页">
      <img src="/favicon.svg" alt="" />
      <span>
        <strong>扶摇学院</strong>
        <span>道术兼济，鲲鹏天下</span>
      </span>
    </Link>
  );
}
export function SearchField({
  value,
  onChange,
  onSubmit,
  placeholder = '搜索课程名称、知识主题…',
  large = false,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  large?: boolean;
}) {
  return (
    <form
      className={`search-field ${large ? 'large' : ''}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <Search size={21} />
      <input
        aria-label="搜索课程"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="clear-search icon-button"
          aria-label="清空搜索"
          onClick={() => onChange('')}
        >
          <X size={17} />
        </button>
      )}
      <button className="search-submit" type="submit">
        搜索{large && <ArrowUpRight size={16} />}
      </button>
    </form>
  );
}
export function CourseCard({ course, list = false }: { course: Course; list?: boolean }) {
  const { categories, favorites, update, toast, progress } = useAcademy();
  const favorite = favorites.includes(course.id);
  const category = categories.find((c) => c.id === course.category)?.name || '其他课程';
  return (
    <article className={`course-card ${list ? 'course-list-card' : ''}`}>
      <Link
        to={`/course/${course.id}`}
        className={`course-cover cover-${course.theme % 6}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <CourseArt theme={course.theme} />
        <div className="cover-copy">
          <span>扶摇学院 · {category}</span>
          <strong>
            {(coverLines[course.title] || [course.title]).map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </strong>
          <i className={course.title.length > 7 ? 'hide-cover-caption' : ''}>
            {
              [
                '初心如磐 · 同心同行',
                '方寸之间 · 见天地',
                '纸上时光 · 时代记忆',
                '真诚倾听 · 专业表达',
                '向下扎根 · 向上生长',
                '心有准绳 · 行稳致远',
              ][course.theme % 6]
            }
          </i>
        </div>
        <span className="format-label">
          <FileText size={12} />
          {course.format} 课件
        </span>
        {course.protected && (
          <span className="cover-lock">
            <LockKeyhole size={13} />
            密码访问
          </span>
        )}
      </Link>
      <div className="course-card-body">
        <div className="card-kicker">
          <span>{category}</span>
          {course.featured && <span className="featured-label">精选</span>}
          <button
            className={`bookmark icon-button ${favorite ? 'active' : ''}`}
            aria-label={`${favorite ? '取消收藏' : '收藏'}${course.title}`}
            aria-pressed={favorite}
            onClick={() => {
              if (
                update((d) => ({
                  ...d,
                  favorites: favorite
                    ? d.favorites.filter((id) => id !== course.id)
                    : [...d.favorites, course.id],
                }))
              )
                toast(favorite ? '已取消收藏' : '已加入我的收藏');
            }}
          >
            <Bookmark size={17} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h3>
          <Link to={`/course/${course.id}`}>{course.title}</Link>
        </h3>
        <p>{course.subtitle}</p>
        <div className="course-meta">
          <span>
            <FileText size={13} />
            {course.pages} 页
          </span>
          <span>
            <Clock3 size={13} />
            {course.duration} 分钟
          </span>
          <Link
            to={`/course/${course.id}`}
            className="course-go"
            aria-label={`学习${course.title}`}
          >
            {progress[course.id] ? '继续学习' : '开始学习'}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function EmptyState({
  title = '没有找到相关课程',
  description = '换一个关键词，或试试其他分类。',
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div>
        <BookOpen size={33} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? 'wide' : ''}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="关闭弹窗">
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
