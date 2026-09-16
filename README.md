# 真车主组队完单活动后台原型

仓库包含：

- 后台配置原型：`index.html`、`styles.css`、`app.js`
- 公共后台能力：`core/`、`shared/`、`data/`
- 活动模块：`activities/`
- 后台配置说明：`后台配置说明.md`

## 扩展结构

页面采用“公共后台外壳 + 独立活动模块”的组织方式：

```text
app.js                         应用入口，登记活动模块
core/router.js                 带活动命名空间的哈希路由
core/shell.js                  根据活动配置生成侧边栏
shared/ui.js                   公共后台 UI 辅助能力
data/mock-activity-repository.js  模拟数据访问边界
activities/team-order/index.js 真车主组队完单活动模块
activities/driver-fission/index.js 真车主裂变活动模块
```

活动模块自行管理活动专属的页面、状态、校验和模拟业务数据，只通过以下元信息接入公共后台：

- `id`：活动唯一标识，也是路由命名空间。
- `title`、`icon`：侧边栏一级菜单信息。
- `defaultRoute`：默认页面。
- `menuItems`：侧边栏子菜单及其激活路由。
- `routes`：路由与页面渲染函数的映射。

### 新增活动

1. 在 `activities/` 下新建独立目录并导出活动创建函数。
2. 为页面使用 `<activity-id>/<page>` 格式的路由，例如 `invite-reward/list`。
3. 将活动专属状态、表单校验和报表逻辑保留在活动目录内。
4. 公共视觉控件优先复用 `shared/ui.js`，数据读写通过独立仓库对象封装。
5. 在 `app.js` 中创建活动模块并加入 `activities` 数组，菜单和路由会自动完成注册。

不要把不同活动的业务表单合并成一个万能表单；公共层只承载菜单、路由、通用控件和数据访问约定。

## GitHub Pages 发布

1. 进入仓库的 `Settings`。
2. 在左侧选择 `Pages`。
3. 在 `Build and deployment` 中，将 `Source` 选择为 `Deploy from a branch`。
4. `Branch` 选择 `main`，目录选择 `/ (root)`，点击 `Save`。
5. 等待 GitHub 完成首次发布后，访问：`https://luyaoyi.github.io/driverActivities/`。

页面为纯静态原型，不需要构建命令。由于使用浏览器原生 ES Modules，需要通过 HTTP 服务访问，不能直接双击 `index.html`。原型数据仅保存在当前浏览器内存中，刷新后恢复为示例数据。
