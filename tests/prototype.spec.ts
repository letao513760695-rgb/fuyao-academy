import { test, expect } from '@playwright/test';

test('首页、搜索、分类、空结果与收藏可交互并保存', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /让知识生长，\s*让每一步都有方向。/ }),
  ).toBeVisible();
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  await page.getByRole('textbox', { name: '搜索课程' }).fill('钱币');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await expect(page).toHaveURL(/courses\?q=/);
  await expect(page.locator('.course-card')).toHaveCount(2);
  await page.getByRole('button', { name: '清空搜索', exact: true }).click();
  await page.getByRole('button', { name: '营销技能', exact: true }).click();
  await expect(page.locator('.course-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: '客户需求分析与沟通' })).toBeVisible();
  await page.getByRole('button', { name: '收藏客户需求分析与沟通', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: '取消收藏客户需求分析与沟通' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: '只看收藏' }).click();
  await expect(page.locator('.course-card')).toHaveCount(1);
  await page.getByRole('textbox', { name: '搜索课程' }).fill('不存在的课程');
  await expect(page.getByRole('heading', { name: '没有找到相关课程' })).toBeVisible();
  await page.getByRole('button', { name: '查看全部课程' }).click();
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page.getByRole('button', { name: '列表视图' }).click();
  await expect(page.locator('.course-list-card')).toHaveCount(6);
  expect(errors).toEqual([]);
});

test('密码、阅读目录、翻页、全屏、进度和下载', async ({ page }) => {
  await page.goto('/#/read/rmb-fourth');
  await expect(page).toHaveURL(/access\/rmb-fourth/);
  await page.getByLabel('访问密码', { exact: true }).fill('wrong');
  await page.getByRole('button', { name: '验证并开始学习' }).click();
  await expect(page.getByRole('alert')).toContainText('密码不正确');
  await page.getByLabel('访问密码', { exact: true }).fill('fuyao2026');
  await page.getByRole('button', { name: '验证并开始学习' }).click();
  await expect(page).toHaveURL(/read\/rmb-fourth/);
  await expect(page.getByRole('heading', { name: '第四套人民币收藏知识' })).toBeVisible();
  await page.getByRole('button', { name: '下一页' }).click();
  await expect(page.getByLabel('跳转页码')).toHaveValue('2');
  await page.locator('.slide').click();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByLabel('跳转页码')).toHaveValue('3');
  await page.getByRole('button', { name: '04 知识回顾与学习建议 第 8 页' }).click();
  await expect(page.getByLabel('跳转页码')).toHaveValue('8');
  await expect(
    page.getByRole('heading', { name: '知识回顾与学习建议', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: '全屏阅读' }).click();
  await expect.poll(() => page.evaluate(() => !!document.fullscreenElement)).toBe(true);
  await page.getByRole('button', { name: '退出全屏' }).click();
  await page.getByLabel('跳转页码').selectOption('10');
  await expect(page.getByRole('button', { name: '下一页' })).toBeDisabled();
  await expect(page.locator('.completion')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('跳转页码')).toHaveValue('10');
  await page.getByRole('link', { name: '返回课程', exact: true }).click();
  await expect(page.getByRole('button', { name: '本课程暂不开放下载' })).toBeDisabled();
  await page.goto('/#/course/oriental');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '下载演示讲义' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('走进东方金典-演示讲义.html');
});

test('管理课程新增、修改、下载开关、删除及持久化', async ({ page }) => {
  await page.goto('/#/admin');
  await expect(page.getByText('这是管理功能演示，没有真实权限保护。')).toBeVisible();
  await page.getByRole('button', { name: '添加课程', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('课程名称').fill('新伙伴学习计划');
  await dialog.getByLabel('一句话简介').fill('迈出成长第一步');
  await dialog.getByLabel('课程介绍').fill('从目标设定到团队协作，建立清晰的学习路径。');
  await dialog.getByRole('combobox', { name: /课程分类/ }).selectOption('growth');
  await dialog.getByRole('button', { name: '添加课程', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await page.reload();
  await expect(page.getByRole('link', { name: '新伙伴学习计划', exact: true })).toBeVisible();
  await page.getByRole('switch', { name: '允许下载新伙伴学习计划' }).click();
  await expect(page.getByRole('switch', { name: '允许下载新伙伴学习计划' })).toHaveAttribute(
    'aria-checked',
    'false',
  );
  await page.getByRole('button', { name: '编辑新伙伴学习计划' }).click();
  await dialog.getByLabel('课程名称').fill('新伙伴成长路径');
  await dialog.getByRole('button', { name: '保存修改' }).click();
  await page.getByRole('link', { name: '新伙伴成长路径', exact: true }).click();
  await expect(page.getByRole('heading', { name: '新伙伴成长路径', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '本课程暂不开放下载' })).toBeDisabled();
  await page.goto('/#/admin');
  await page.getByRole('button', { name: '删除新伙伴成长路径' }).click();
  await page.getByRole('button', { name: '确认删除' }).click();
  await expect(page.getByRole('link', { name: '新伙伴成长路径', exact: true })).toHaveCount(0);
});

test('分类调整同步到课程中心，关联分类不可删除', async ({ page }) => {
  await page.goto('/#/admin');
  await page.getByRole('button', { name: '管理分类' }).click();
  await expect(page.getByRole('button', { name: '删除分类企业文化' })).toBeDisabled();
  await page.getByLabel('分类名称 1', { exact: true }).fill('品牌与文化');
  await page.getByRole('button', { name: '下移品牌与文化' }).click();
  await page.getByRole('button', { name: '添加分类' }).click();
  await page.getByLabel('分类名称 7', { exact: true }).fill('专题学习');
  await page.getByRole('button', { name: '保存分类' }).click();
  await page.goto('/#/courses');
  await page.getByRole('button', { name: '品牌与文化', exact: true }).click();
  await expect(page.locator('.course-card')).toHaveCount(1);
  await page.getByRole('button', { name: '专题学习', exact: true }).click();
  await expect(page.getByRole('heading', { name: '没有找到相关课程' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: '专题学习', exact: true })).toBeVisible();
});

test('上传 PDF 本地保存、预览与原件下载；错误格式被拒绝', async ({ page }) => {
  await page.goto('/#/admin');
  await page.getByRole('button', { name: '编辑走进东方金典' }).click();
  const input = page.getByLabel('上传课件资料');
  await input.setInputFiles({
    name: 'invalid.exe',
    mimeType: 'application/octet-stream',
    buffer: Buffer.from('invalid'),
  });
  await expect(page.getByRole('alert')).toContainText('仅支持 PDF');
  const pdf = Buffer.from(
    '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 300]/Contents 4 0 R>>endobj\n4 0 obj<</Length 0>>stream\n\nendstream\nendobj\ntrailer<</Root 1 0 R>>\n%%EOF',
  );
  await input.setInputFiles({ name: '本地学习资料.pdf', mimeType: 'application/pdf', buffer: pdf });
  await page.getByRole('button', { name: '保存修改' }).click();
  await page.reload();
  await page.getByRole('link', { name: '走进东方金典', exact: true }).click();
  await expect(page.getByText('本地学习资料.pdf', { exact: true })).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '下载原始资料' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('本地学习资料.pdf');
  await page.getByRole('button', { name: '开始学习' }).click();
  const iframe = page.locator('iframe');
  await expect(iframe).toHaveAttribute('src', /^blob:/);
  const pdfResult = await iframe.evaluate(async (el) => {
    const response = await fetch((el as HTMLIFrameElement).src);
    return { status: response.status, content: (await response.text()).slice(0, 8) };
  });
  expect(pdfResult).toEqual({ status: 200, content: '%PDF-1.4' });
});

test('手机导航、全页面布局和阅读器可用', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  await page.getByRole('button', { name: '打开导航' }).click();
  await page.locator('nav').getByRole('link', { name: '课程中心' }).click();
  await expect(page).toHaveURL(/courses/);
  for (const route of [
    '/',
    '/courses',
    '/course/oriental',
    '/access/rmb-fourth',
    '/guide',
    '/admin',
  ]) {
    await page.goto(`/#${route}`);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      route,
    ).toBe(true);
  }
  await page.goto('/#/read/oriental');
  await page.getByRole('button', { name: '下一页' }).click();
  await expect(page.getByLabel('跳转页码')).toHaveValue('2');
  await page.screenshot({ path: 'test-results/reader-mobile.png', fullPage: true });
  await page.getByRole('button', { name: '目录', exact: true }).click();
  await page.getByRole('button', { name: '03 团队与共同成长 第 5 页' }).click();
  await expect(page.getByLabel('跳转页码')).toHaveValue('5');
  await expect(page.locator('.reader-sidebar')).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect(errors).toEqual([]);
});
