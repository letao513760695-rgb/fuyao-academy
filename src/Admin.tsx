import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  FileText,
  FolderOpen,
  LockKeyhole,
  Pencil,
  Plus,
  Search,
  Settings2,
  ShieldAlert,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import { Modal } from './components';
import type { Category, Course } from './data';
import { CourseArt } from './Art';
import { useAcademy } from './store';
import { saveFile } from './services';

export function Admin() {
  const { courses, categories, update, toast } = useAcademy();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState<Course | null | undefined>(undefined);
  const [deleteCourse, setDeleteCourse] = useState<Course | null>(null);
  const [categoryModal, setCategoryModal] = useState(false);
  const filtered = courses.filter(
    (c) => (category === 'all' || c.category === category) && c.title.includes(query.trim()),
  );
  return (
    <main className="container page-main admin-page">
      <div className="breadcrumb">
        <Link to="/">首页</Link>
        <ChevronRight size={14} />
        管理工作台
      </div>
      <div className="admin-heading">
        <div>
          <span className="section-eyebrow">内容管理 · 让好知识被看见</span>
          <h1>打理你的知识书架</h1>
          <p>整理每一份课件，连接每一次成长。</p>
        </div>
        <Link className="text-link" to="/courses">
          <ArrowLeft size={16} />
          返回课程中心
        </Link>
      </div>
      <div className="demo-warning">
        <ShieldAlert size={21} />
        <div>
          <strong>这是管理功能演示，没有真实权限保护。</strong>
          <span>
            所有人均可进入。课程和资料仅保存在当前浏览器，不会上传服务器；请勿上传敏感内容。密码与下载开关仅用于演示。
          </span>
        </div>
        <span className="local-status">
          <span />
          本地模式
        </span>
      </div>
      <div className="admin-stats">
        {[
          { icon: BookOpen, title: '书架课程', value: courses.length, unit: '门' },
          { icon: FolderOpen, title: '学习分类', value: categories.length, unit: '个' },
          {
            icon: FileText,
            title: '本地上传资料',
            value: courses.filter((c) => c.fileId).length,
            unit: '份',
          },
          {
            icon: LockKeyhole,
            title: '密码访问课程',
            value: courses.filter((c) => c.protected).length,
            unit: '门',
          },
        ].map((s) => (
          <div key={s.title}>
            <span>
              <s.icon size={23} />
            </span>
            <div>
              <small>{s.title}</small>
              <strong>
                {s.value}
                <em>{s.unit}</em>
              </strong>
            </div>
          </div>
        ))}
      </div>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>
            课程管理<span>{courses.length}</span>
          </h2>
          <div>
            <button className="button" onClick={() => setCategoryModal(true)}>
              <Settings2 size={16} />
              管理分类
            </button>
            <button className="button primary" onClick={() => setEditing(null)}>
              <Plus size={17} />
              添加课程
            </button>
          </div>
        </div>
        <div className="admin-filters">
          <label>
            <Search size={18} />
            <input
              aria-label="查找管理课程"
              placeholder="搜索课程名称…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="icon-button"
                onClick={() => setQuery('')}
                aria-label="清空管理搜索"
              >
                <X size={15} />
              </button>
            )}
          </label>
          <select
            aria-label="管理课程分类"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">全部分类</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="table-scroll">
          <table className="course-table">
            <thead>
              <tr>
                <th>课程信息</th>
                <th>课程分类</th>
                <th>访问方式</th>
                <th>允许下载</th>
                <th>更新日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="table-course">
                      <div className="table-cover">
                        <CourseArt theme={c.theme} />
                      </div>
                      <div>
                        <Link to={`/course/${c.id}`}>
                          {c.title}
                          <ArrowUpRight size={12} />
                        </Link>
                        <small>
                          {c.format} · {c.fileId ? '本地上传' : '演示课件'} · {c.pages} 页
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-category">
                      {categories.find((cat) => cat.id === c.category)?.name}
                    </span>
                  </td>
                  <td>
                    <span className={c.protected ? 'protected-text' : 'public-text'}>
                      {c.protected ? <LockKeyhole size={13} /> : <Check size={13} />}{' '}
                      {c.protected ? '密码访问' : '自由学习'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`toggle ${c.downloadable ? 'on' : ''}`}
                      role="switch"
                      aria-checked={c.downloadable}
                      aria-label={`允许下载${c.title}`}
                      onClick={() => {
                        if (
                          update((d) => ({
                            ...d,
                            courses: d.courses.map((course) =>
                              course.id === c.id
                                ? { ...course, downloadable: !course.downloadable }
                                : course,
                            ),
                          }))
                        )
                          toast(c.downloadable ? '已关闭下载入口' : '已开启下载入口');
                      }}
                    >
                      <span />
                    </button>
                  </td>
                  <td className="table-date">{c.updatedAt}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="icon-button"
                        aria-label={`编辑${c.title}`}
                        onClick={() => setEditing(c)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="icon-button danger"
                        aria-label={`删除${c.title}`}
                        onClick={() => setDeleteCourse(c)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <div className="table-empty">没有找到相关课程，试试其他关键词或分类。</div>
          )}
        </div>
        <div className="table-bottom">
          <span>共 {filtered.length} 门课程</span>
          <span>修改会自动保存到当前浏览器</span>
        </div>
      </section>
      {editing !== undefined && (
        <CourseForm
          key={editing?.id || 'new'}
          course={editing}
          onClose={() => setEditing(undefined)}
        />
      )}
      {categoryModal && <CategoryEditor onClose={() => setCategoryModal(false)} />}
      {deleteCourse && (
        <Modal title="从书架移除课程" onClose={() => setDeleteCourse(null)}>
          <div className="confirm-body">
            <p>确定删除《{deleteCourse.title}》吗？</p>
            <p className="muted">
              该课程将从当前浏览器的课程中心移除，相关收藏和阅读进度也会清除。
            </p>
          </div>
          <div className="modal-actions">
            <button className="button" onClick={() => setDeleteCourse(null)}>
              保留课程
            </button>
            <button
              className="button danger-solid"
              onClick={() => {
                if (
                  update((d) => {
                    const progress = { ...d.progress };
                    delete progress[deleteCourse.id];
                    return {
                      ...d,
                      courses: d.courses.filter((c) => c.id !== deleteCourse.id),
                      favorites: d.favorites.filter((id) => id !== deleteCourse.id),
                      progress,
                    };
                  })
                ) {
                  setDeleteCourse(null);
                  toast('课程已从书架移除');
                }
              }}
            >
              确认删除
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

function CourseForm({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const { categories, update, toast } = useAcademy();
  const [form, setForm] = useState<Course>(
    course || {
      id: crypto.randomUUID(),
      title: '',
      subtitle: '',
      description: '',
      category: categories[0]?.id || '',
      audience: '全体员工',
      teacher: '学院教研组',
      duration: 30,
      pages: 8,
      format: 'PDF',
      theme: 0,
      updatedAt: new Date().toISOString().slice(0, 10),
      featured: false,
      protected: false,
      downloadable: true,
      chapters: ['课程导读', '核心知识', '场景实践', '回顾与思考'],
    },
  );
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const change = <K extends keyof Course>(key: K, value: Course[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const chooseFile = (next?: File) => {
    if (!next) return;
    if (!/\.(pdf|ppt|pptx)$/i.test(next.name)) {
      setError('仅支持 PDF、PPT 和 PPTX 文件。');
      return;
    }
    if (next.size > 20 * 1024 * 1024) {
      setError('文件超过 20 MB，请选择较小的资料。');
      return;
    }
    if (next.size === 0) {
      setError('不能上传空文件。');
      return;
    }
    setError('');
    setFile(next);
    change('format', /\.pdf$/i.test(next.name) ? 'PDF' : 'PPT');
  };
  return (
    <Modal
      title={course ? '编辑课程' : '添加一门好课'}
      onClose={() => {
        if (!saving) onClose();
      }}
      wide
    >
      <form
        className="course-form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (saving) return;
          if (
            !form.title.trim() ||
            !form.subtitle.trim() ||
            !form.description.trim() ||
            !form.audience.trim() ||
            !form.teacher.trim()
          ) {
            setError('请完整填写课程名称、简介、介绍、适用人群和讲师。');
            return;
          }
          if (!categories.some((c) => c.id === form.category)) {
            setError('请选择有效的课程分类。');
            return;
          }
          const chapters = form.chapters.map((chapter) => chapter.trim()).filter(Boolean);
          if (!chapters.length || chapters.length > form.pages) {
            setError('请填写至少一个章节，章节数量不能超过演示页数。');
            return;
          }
          setSaving(true);
          setError('');
          try {
            const fileId = file ? await saveFile(file) : form.fileId;
            const next = {
              ...form,
              title: form.title.trim(),
              chapters,
              fileId,
              fileName: file?.name || form.fileName,
              updatedAt: new Date().toISOString().slice(0, 10),
            };
            if (
              update((d) => ({
                ...d,
                courses: course
                  ? d.courses.map((c) => (c.id === course.id ? next : c))
                  : [next, ...d.courses],
              }))
            ) {
              toast(course ? '课程已更新' : '新课程已加入书架');
              onClose();
            }
          } catch (e) {
            setError(e instanceof Error ? e.message : '保存失败，请重试。');
          } finally {
            setSaving(false);
          }
        }}
      >
        <div className="form-fields">
          <label className="span-2">
            课程名称 <em>*</em>
            <input
              required
              maxLength={40}
              value={form.title}
              onChange={(e) => change('title', e.target.value)}
              placeholder="例如：客户需求分析与沟通"
            />
          </label>
          <label>
            课程分类
            <select
              value={form.category}
              onChange={(e) => {
                change('category', e.target.value);
                change(
                  'theme',
                  Math.max(
                    0,
                    categories.findIndex((c) => c.id === e.target.value),
                  ) % 6,
                );
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            授课团队
            <input
              required
              maxLength={30}
              value={form.teacher}
              onChange={(e) => change('teacher', e.target.value)}
            />
          </label>
          <label className="span-2">
            一句话简介 <em>*</em>
            <input
              required
              maxLength={80}
              value={form.subtitle}
              onChange={(e) => change('subtitle', e.target.value)}
              placeholder="为这门课程写一句温暖、有吸引力的介绍"
            />
          </label>
          <label className="span-2">
            课程介绍 <em>*</em>
            <textarea
              required
              rows={3}
              maxLength={1200}
              value={form.description}
              onChange={(e) => change('description', e.target.value)}
              placeholder="介绍课程内容、学习目标与适用场景…"
            />
          </label>
          <label className="span-2">
            适用人群
            <input
              required
              maxLength={150}
              value={form.audience}
              onChange={(e) => change('audience', e.target.value)}
            />
          </label>
          <label>
            预计学习时长（分钟）
            <input
              type="number"
              min={1}
              max={600}
              required
              value={form.duration}
              onChange={(e) => change('duration', Number(e.target.value))}
            />
          </label>
          <label>
            演示页数
            <input
              type="number"
              min={4}
              max={100}
              required
              value={form.pages}
              onChange={(e) => change('pages', Number(e.target.value))}
            />
          </label>
          <label className="span-2">
            课程目录（每行一个章节）
            <textarea
              rows={4}
              required
              value={form.chapters.join('\n')}
              onChange={(e) => change('chapters', e.target.value.split('\n'))}
              onBlur={() =>
                change(
                  'chapters',
                  form.chapters
                    .map((ch) => ch.trim())
                    .filter(Boolean)
                    .slice(0, form.pages),
                )
              }
            />
          </label>
        </div>
        <fieldset className="cover-picker">
          <legend>选择课程封面</legend>
          <div>
            {Array.from({ length: 6 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={form.theme === i ? 'selected' : ''}
                aria-label={`封面风格 ${i + 1}`}
                aria-pressed={form.theme === i}
                onClick={() => change('theme', i)}
              >
                <CourseArt theme={i} />
                {form.theme === i && (
                  <span>
                    <Check size={14} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </fieldset>
        <div
          className={`upload-zone ${dragging ? 'dragging' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            chooseFile(e.dataTransfer.files[0]);
          }}
        >
          <UploadCloud size={29} />
          <strong>{file?.name || form.fileName || '点击上传，或将课件拖放至此'}</strong>
          <span>PDF、PPT、PPTX · 最大 20 MB · 仅保存到本机</span>
          <input
            type="file"
            aria-label="上传课件资料"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => chooseFile(e.target.files?.[0])}
          />
        </div>
        <p className="upload-note">
          可不上传文件，直接体验演示课件。PDF 支持原生预览；PPT
          仅保存原文件，不会自动转换，阅读页显示演示内容。
        </p>
        <div className="form-options">
          {[
            { key: 'featured' as const, label: '设为精选课程', desc: '优先展示在首页' },
            {
              key: 'protected' as const,
              label: '启用演示访问密码',
              desc: '统一密码 fuyao2026，无真实保护',
            },
            { key: 'downloadable' as const, label: '允许下载资料', desc: '仅控制演示下载入口' },
          ].map((option) => (
            <label key={option.key}>
              <input
                type="checkbox"
                checked={form[option.key]}
                onChange={(e) => change(option.key, e.target.checked)}
              />
              <span>
                <strong>{option.label}</strong>
                <small>{option.desc}</small>
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button className="button" type="button" disabled={saving} onClick={onClose}>
            取消
          </button>
          <button className="button primary" disabled={saving} type="submit">
            {saving ? '正在保存…' : course ? '保存修改' : '添加课程'}
            <Check size={17} />
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CategoryEditor({ onClose }: { onClose: () => void }) {
  const { categories, courses, update, toast } = useAcademy();
  const [draft, setDraft] = useState<Category[]>(categories.map((c) => ({ ...c })));
  const [error, setError] = useState('');
  function move(index: number, direction: number) {
    setDraft((old) => {
      const next = [...old];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
  }
  return (
    <Modal title="管理学习分类" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const names = draft.map((c) => c.name.trim());
          if (names.some((n) => !n)) {
            setError('分类名称不能为空。');
            return;
          }
          if (new Set(names).size !== names.length) {
            setError('分类名称不能重复。');
            return;
          }
          if (
            update((d) => ({ ...d, categories: draft.map((c) => ({ ...c, name: c.name.trim() })) }))
          ) {
            toast('分类已更新，课程中心已同步');
            onClose();
          }
        }}
      >
        <p className="category-editor-note">调整名称与排列顺序，已有关联课程的分类不可删除。</p>
        <div className="category-editor">
          {draft.map((c, i) => (
            <div key={c.id}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <input
                aria-label={`分类名称 ${i + 1}`}
                required
                maxLength={12}
                value={c.name}
                onChange={(e) =>
                  setDraft((d) =>
                    d.map((item) => (item.id === c.id ? { ...item, name: e.target.value } : item)),
                  )
                }
              />
              <small>{courses.filter((course) => course.category === c.id).length} 门</small>
              <button
                type="button"
                className="icon-button"
                disabled={i === 0}
                aria-label={`上移${c.name}`}
                onClick={() => move(i, -1)}
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                className="icon-button"
                disabled={i === draft.length - 1}
                aria-label={`下移${c.name}`}
                onClick={() => move(i, 1)}
              >
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                className="icon-button danger"
                disabled={courses.some((course) => course.category === c.id) || draft.length === 1}
                aria-label={`删除分类${c.name}`}
                onClick={() => setDraft((d) => d.filter((item) => item.id !== c.id))}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="button add-category"
          onClick={() =>
            setDraft((d) => [
              ...d,
              { id: crypto.randomUUID(), name: '', description: '探索新的学习领域' },
            ])
          }
        >
          <Plus size={16} />
          添加分类
        </button>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button className="button" type="button" onClick={onClose}>
            取消
          </button>
          <button className="button primary" type="submit">
            保存分类
            <Check size={16} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
