# 延安科创网 MVP

延安科创网是面向 K12 学生的编程教育平台，本仓库实现了 MVP：访客可体验旗舰课一次，后续引导注册或购买。

## 目录结构

- `frontend/`：Next.js 15 (App Router) 前端，SSR + RSC
- `backend/`：FastAPI 后端，PostgreSQL + Redis + Judge0 集成
- `infrastructure/`：Docker Compose 开发环境、Dockerfile
- `docs/`：上手指南、合规资料

## 快速开始

1. 安装依赖
   ```bash
   corepack enable
   pnpm install
   python -m pip install --upgrade pip
   cd backend && pip install -e '.[dev]'
   ```

2. 启动基础服务（PostgreSQL、Redis、Judge0）
   ```bash
   cd infrastructure
   docker compose up db redis judge0
   ```

3. 初始化数据库与种子数据
   ```bash
   cd backend
   alembic upgrade head
   python -m app.scripts.seed_reference
   ```

4. 启动后端
   ```bash
   uvicorn app.main:app --reload
   ```

5. 启动前端
   ```bash
   cd frontend
   pnpm dev
   ```

访问 `http://localhost:3000/catalog` 体验旗舰课程；API 文档位于 `http://localhost:8000/api/docs`。

## 环境变量

复制 `.env.example` 为 `.env` 并根据实际填写：

- `DATABASE_URL`：PostgreSQL 连接串
- `REDIS_URL`：Redis 连接串
- `API_BASE_URL`：前端调用后端地址
- `JWT_SECRET`、支付相关密钥等

## 测试

```bash
pnpm lint && pnpm test              # 前端
cd backend && ruff check . && pytest  # 后端
```

Playwright 测试脚本覆盖访客体验流程；pytest 覆盖访客免费课配额与课程加载逻辑。

## 约束与后续

- 当前 MVP 仅实现微信模拟登录及访客一次体验；手机号、邮箱、支付宝登录在后续里程碑完成。
- Judge0 评测以占位逻辑返回通过/失败，M2 将改为真实队列与隐藏测试。
- 生产部署将使用 K8s + Cloudflare CDN，详见 `specs/001-yanan-core-spec/plan.md`。

欢迎贡献改进！
