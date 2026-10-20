import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight, Menu, ShieldCheck, X } from 'lucide-react';
import { Brand } from './components';
import { Home, Catalog, Guide } from './Browse';
import { CourseDetail, Access, Reader } from './Course';
import { Admin } from './Admin';

export function App() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const reading = pathname.startsWith('/read/');
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);
  return (
    <>
      {!reading && (
        <header className="site-header">
          <div className="container header-inner">
            <Brand />
            <nav className={menuOpen ? 'open' : ''} aria-label="主导航">
              <NavLink to="/" end>
                首页
              </NavLink>
              <NavLink to="/courses">课程中心</NavLink>
              <NavLink to="/guide">学习指南</NavLink>
              <NavLink to="/courses?view=favorites" className="mobile-favorites">
                我的收藏
              </NavLink>
            </nav>
            <div className="header-actions">
              <Link className="admin-link" to="/admin">
                <span className="admin-dot" />
                管理工作台
                <ArrowRight size={15} />
              </Link>
              <button
                className="menu-toggle icon-button"
                aria-label={menuOpen ? '关闭导航' : '打开导航'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </header>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Catalog />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/access/:id" element={<Access />} />
        <Route path="/read/:id" element={<Reader />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <main className="container not-found">
              <BookOpen size={44} />
              <h1>这一页暂时没有内容</h1>
              <p>从课程中心继续探索，找到下一份灵感。</p>
              <Link className="button primary" to="/courses">
                返回课程中心
                <ArrowRight size={17} />
              </Link>
            </main>
          }
        />
      </Routes>
      {!reading && (
        <footer className="site-footer">
          <div className="container footer-main">
            <div>
              <Brand small />
              <p>让知识触手可及，让成长持续发生。</p>
            </div>
            <div className="footer-links">
              <Link to="/courses">
                探索课程
                <ChevronRight size={14} />
              </Link>
              <Link to="/guide">
                学习指南
                <ChevronRight size={14} />
              </Link>
              <Link to="/admin">
                管理工作台
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className="footer-note">
              <span>
                <ShieldCheck size={17} />
                学习，从每一次探索开始
              </span>
              <p>内部学习资源 · 交互演示原型</p>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© 2026 扶摇学院 · 数字课件中心</span>
            <span>演示数据仅保存在当前浏览器，访问密码不具备真实安全保护能力。</span>
          </div>
        </footer>
      )}
    </>
  );
}
