import { createMockActivityRepository } from "../../data/mock-activity-repository.js";
import { card, imageUpload, item, nowText, radios, toast } from "../../shared/ui.js";

const ACTIVITY_ID = "driver-fission";
const TASK_LABELS = {
  certification: "认证任务",
  first_order: "首单任务",
  combined: "认证+首单任务",
};

const SELECT_OPTIONS = {
  certification: [
    ["CERT-REAL-OWNER-001", "真车主认证任务"],
    ["CERT-DRIVER-2026", "司机认证专项任务"],
  ],
  order: [
    ["ORDER-FIRST-001", "司机首单完单任务"],
    ["ORDER-FIRST-CITY", "城市首单专项任务"],
  ],
  ordinaryReward: [
    ["CLAIM-BONUS-10", "奖励金卡10元"],
    ["CLAIM-MEMBER-30D", "会员卡30天"],
  ],
  cashReward: [
    ["CASH-DRIVER-30", "司机认证返现30元"],
    ["CASH-FIRST-ORDER-50", "首单完单返现50元"],
  ],
  guestReward: [
    ["GUEST-CERT-10", "客态认证奖励"],
    ["GUEST-ORDER-20", "客态首单奖励"],
    ["GUEST-COMMON-10", "客态通用奖励"],
  ],
};

const IMAGE_FIELDS = [
  ["hostHeaderImage", "主态落地页头图"],
  ["hostFlowImage", "主态落地页流程图"],
  ["hostInviteBackgroundImage", "主态邀请页背景图"],
  ["guestHeaderImage", "客态落地页头图"],
  ["guestFlowImage", "客态落地页流程图"],
  ["guestCertButtonImage", "客态可认证按钮图片"],
  ["guestOrderButtonImage", "客态可接单按钮图片"],
];

function defaultConfig() {
  return {
    code: "保存后生成",
    name: "",
    channels: [],
    riskControl: "off",
    begin: "2026-09-20 00:00:00",
    end: "2026-10-20 23:59:59",
    status: 1,
    taskType: "certification",
    certificationTaskId: "",
    orderTaskId: "",
    certificationRewardType: "ordinary",
    certificationOrdinaryReward: "",
    certificationCashReward: "",
    certificationCashAmount: 1,
    certificationClaimDelay: 1,
    certificationClaimLimit: 1,
    orderCashReward: "",
    orderCashAmount: 1,
    orderClaimDelay: 1,
    orderClaimLimit: 1,
    guestReward: "",
    memberBenefitEnabled: "off",
    memberBenefitStart: "reward",
    memberBenefitCode: "",
    hostPageTitle: "",
    hostHeaderImage: "",
    hostFlowImage: "",
    hostInviteBackgroundImage: "",
    activityRules: "",
    guestHeaderImage: "",
    guestFlowImage: "",
    guestCertButtonImage: "",
    guestOrderButtonImage: "",
    shareTitle: "",
    shareSubtitle: "",
    shareImage: "",
    pushNodes: [],
  };
}

function seedRecord(overrides = {}) {
  return {
    ...defaultConfig(),
    code: "FISSION-202609-001",
    name: "真车主认证裂变活动",
    channels: ["driver_app", "mada_h5"],
    begin: "2026-09-20 00:00:00",
    end: "2026-10-20 23:59:59",
    taskType: "combined",
    certificationTaskId: "CERT-REAL-OWNER-001",
    orderTaskId: "ORDER-FIRST-001",
    certificationOrdinaryReward: "CLAIM-BONUS-10",
    orderCashReward: "CASH-FIRST-ORDER-50",
    orderCashAmount: 50,
    guestReward: "GUEST-COMMON-10",
    memberBenefitEnabled: "on",
    memberBenefitCode: "MEMBER-30D-DRIVER",
    hostPageTitle: "邀请车主完成任务，一起领好礼",
    hostHeaderImage: "https://example.com/fission-host-header.png",
    hostFlowImage: "https://example.com/fission-host-flow.png",
    hostInviteBackgroundImage: "https://example.com/fission-invite-bg.png",
    activityRules: "1. 主态用户邀请新用户完成指定任务后可获得奖励。\n2. 每位邀请人每种奖励领取次数以后台配置为准。",
    guestHeaderImage: "https://example.com/fission-guest-header.png",
    guestFlowImage: "https://example.com/fission-guest-flow.png",
    guestCertButtonImage: "https://example.com/fission-cert-button.png",
    guestOrderButtonImage: "https://example.com/fission-order-button.png",
    shareTitle: "邀请你完成真车主认证",
    shareSubtitle: "完成任务即可领取奖励",
    shareImage: "https://example.com/fission-share.png",
    pushNodes: ["guest_accept", "guest_complete"],
    status: 1,
    creator: "沈岚1212240",
    created: "2026-08-27 18:27:32",
    modifier: "沈岚1212240",
    modified: "2026-09-15 16:10:20",
    ...overrides,
  };
}

export function createDriverFissionActivity({ main, modalRoot, navigate }) {
  const repository = createMockActivityRepository([
    seedRecord(),
    seedRecord({ code: "FISSION-202606-002", name: "邀请车主认证-首单现金30", taskType: "first_order", status: 1, created: "2026-06-12 16:13:06", modified: "2026-06-12 16:13:06" }),
    seedRecord({ code: "FISSION-202605-003", name: "邀请车主认证-认证现金", taskType: "certification", certificationRewardType: "cash", status: 0, created: "2026-05-25 17:11:32", modified: "2026-05-25 17:11:32" }),
    seedRecord({ code: "FISSION-202605-004", name: "邀请车主认证-首单现金", taskType: "first_order", status: 0, created: "2026-05-11 18:46:24", modified: "2026-05-11 18:46:24" }),
    seedRecord({ code: "FISSION-202604-005", name: "邀请车主认证-双重", taskType: "combined", status: 0, created: "2026-04-15 11:31:13", modified: "2026-04-15 11:31:13" }),
    seedRecord({ code: "FISSION-202601-006", name: "邀请车主认证", taskType: "certification", status: 0, created: "2026-01-16 13:16:37", modified: "2026-01-16 13:16:37" }),
  ]);
  const state = { draft: null, readonly: false };

  function go(page) {
    navigate(`${ACTIVITY_ID}/${page}`);
  }

  function renderPage(page) {
    modalRoot.innerHTML = "";
    if (page === "list") renderList();
    if (page === "edit") renderEdit();
  }

  function renderList() {
    const records = repository.list();
    main.innerHTML = `
      <div class="breadcrumb"><a>真车主裂变活动</a><i>›</i><span>活动配置</span></div>
      <section class="panel">
        <div class="query-grid">
          <div class="form-field"><label>活动编号：</label><input id="fissionQCode" placeholder="请输入活动编号"></div>
          <div class="form-field"><label>活动名称：</label><input id="fissionQName" placeholder="请输入活动名称"></div>
          <div class="form-field"><label>活动状态：</label><select id="fissionQStatus"><option value="">请选择状态</option><option value="1">有效</option><option value="0">无效</option></select></div>
        </div>
        <div class="query-actions">
          <button class="btn btn-primary" id="fissionQuery">⌕ 查询</button>
          <button class="btn btn-primary" id="fissionReset">↻ 重置</button>
          <button class="btn btn-primary" id="fissionNew">＋ 新建</button>
        </div>
      </section>
      <section>
        <div class="table-titlebar"><span class="table-title">真车主裂变活动配置</span><span id="fissionCount" style="color:#909399;font-size:12px">共 ${records.length} 条</span></div>
        <div class="table-wrap"><table><thead><tr><th>序号</th><th>活动编号</th><th>活动名称</th><th>任务类型</th><th>状态</th><th>创建人</th><th>创建时间</th><th>操作</th></tr></thead><tbody id="fissionRows"></tbody></table></div>
        <div class="pagination"><span>共 ${records.length} 条</span><select style="width:90px"><option>10条/页</option><option>20条/页</option><option>50条/页</option></select><span class="page-box">‹</span><span class="page-box active">1</span><span class="page-box">›</span><span>前往</span><input style="width:46px;height:28px" value="1"><span>页</span></div>
      </section>`;
    drawRows(records);
    document.querySelector("#fissionQuery").onclick = filterRows;
    document.querySelector("#fissionReset").onclick = () => {
      ["fissionQCode", "fissionQName", "fissionQStatus"].forEach(id => { document.querySelector(`#${id}`).value = ""; });
      toast("筛选条件已重置，请点击查询");
    };
    document.querySelector("#fissionNew").onclick = () => openEdit(null, false);
  }

  function drawRows(records) {
    const host = document.querySelector("#fissionRows");
    document.querySelector("#fissionCount").textContent = `共 ${records.length} 条`;
    host.innerHTML = records.length ? records.map((record, index) => `<tr>
      <td>${index + 1}</td><td>${record.code}</td><td>${record.name}</td><td>${TASK_LABELS[record.taskType]}</td>
      <td><span class="tag ${record.status ? "tag-success" : "tag-info"}">${record.status ? "有效" : "无效"}</span></td>
      <td>${record.creator}</td><td>${record.created}</td>
      <td><button class="btn btn-text" data-fission-view="${record.code}">查看</button><button class="btn btn-text" data-fission-edit="${record.code}">编辑</button><button class="btn btn-text" data-fission-log="${record.code}">日志</button></td>
    </tr>`).join("") : `<tr><td colspan="8" class="empty">暂无数据</td></tr>`;
    host.querySelectorAll("[data-fission-view]").forEach(button => { button.onclick = () => openEdit(button.dataset.fissionView, true); });
    host.querySelectorAll("[data-fission-edit]").forEach(button => { button.onclick = () => openEdit(button.dataset.fissionEdit, false); });
    host.querySelectorAll("[data-fission-log]").forEach(button => { button.onclick = () => showLogs(button.dataset.fissionLog); });
  }

  function filterRows() {
    const code = document.querySelector("#fissionQCode").value.trim().toLowerCase();
    const name = document.querySelector("#fissionQName").value.trim().toLowerCase();
    const status = document.querySelector("#fissionQStatus").value;
    drawRows(repository.list().filter(record => (!code || record.code.toLowerCase().includes(code)) && (!name || record.name.toLowerCase().includes(name)) && (status === "" || String(record.status) === status)));
  }

  function openEdit(code, readonly) {
    state.readonly = readonly;
    state.draft = cloneConfig(code ? repository.find(code) : defaultConfig());
    go("edit");
  }

  function cloneConfig(record) {
    return { ...record, channels: [...(record.channels || [])], pushNodes: [...(record.pushNodes || [])] };
  }

  function optionList(options, selected) {
    return `<option value="">请选择</option>${options.map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`).join("")}`;
  }

  function input(id, value, placeholder, disabled = "", type = "text") {
    return `<input id="${id}" data-model="${id}" type="${type}" value="${value ?? ""}" placeholder="${placeholder}" ${disabled}>`;
  }

  function select(id, options, value, disabled = "") {
    return `<select id="${id}" data-model="${id}" ${disabled}>${optionList(options, value)}</select>`;
  }

  function errorText(message) {
    return `<div class="error-text">${message}</div>`;
  }

  function numberControl(id, value, unit, disabled = "", min = 1) {
    return `<div class="number-control"><button type="button" data-step="-1" data-number-target="${id}" ${disabled}>−</button><input id="${id}" data-model="${id}" type="number" min="${min}" step="1" value="${value}" ${disabled}><button type="button" data-step="1" data-number-target="${id}" ${disabled}>＋</button>${unit ? `<span>${unit}</span>` : ""}</div>`;
  }

  function renderEdit() {
    const draft = state.draft || defaultConfig();
    const ro = state.readonly ? "disabled" : "";
    main.innerHTML = `
      <div class="breadcrumb"><a id="fissionBack1">真车主裂变活动</a><i>›</i><a id="fissionBack2">活动配置</a><i>›</i><span>${state.readonly ? "查看" : draft.code === "保存后生成" ? "新建" : "编辑"}</span></div>
      <div class="page-header"><div><h1>${state.readonly ? "查看真车主裂变活动" : draft.code === "保存后生成" ? "新建真车主裂变活动" : "编辑真车主裂变活动"}</h1><p>配置任务、主客态奖励、会员权益、页面素材、分享及用户触达</p></div><span class="tag ${draft.status ? "tag-success" : "tag-info"}">${draft.status ? "有效" : "无效"}</span></div>
      <form id="fissionForm">
        ${renderBasicCard(draft, ro)}
        ${renderActivityCard(draft, ro)}
        ${renderMemberCard(draft, ro)}
        ${renderPageCard(draft, ro)}
        ${renderShareCard(draft, ro)}
        ${renderPushCard(draft, ro)}
        <div class="form-footer">${state.readonly ? "" : `<button type="button" class="btn btn-primary solid" id="fissionSave">✓ 确定</button>`}<button type="button" class="btn" id="fissionClose">× 关闭</button></div>
      </form>`;
    ["fissionBack1", "fissionBack2", "fissionClose"].forEach(id => { document.querySelector(`#${id}`).onclick = () => go("list"); });
    if (!state.readonly) bindFormInteractions();
  }

  function renderBasicCard(draft, ro) {
    return card("基本配置", `<div class="edit-grid single-column">
      ${item("活动名称", `${input("name", draft.name, "请输入活动名称", ro)}${errorText("请输入20个字符以内的活动名称")}`, true, "error-name")}
      ${item("业务类型", radios("businessType", [["car", "用车"]], "car", "disabled"), true)}
      ${item("渠道", `<div class="radio-row"><label><input type="checkbox" data-array-model="channels" value="driver_app" ${draft.channels.includes("driver_app") ? "checked" : ""} ${ro}> 真车主司机端(10327)</label><label><input type="checkbox" data-array-model="channels" value="mada_h5" ${draft.channels.includes("mada_h5") ? "checked" : ""} ${ro}> 马达出行APP-H5(10185)</label></div>${errorText("请至少选择一个渠道")}`, true, "error-channels")}
      ${item("风控开关", radios("riskControl", [["on", "打开"], ["off", "关闭"]], draft.riskControl, ro), true)}
      ${item("有效期", `<div class="inline-control">${input("begin", draft.begin, "开始日期", ro)}<span>至</span>${input("end", draft.end, "结束日期", ro)}</div>${errorText("请填写正确的活动有效期")}`, true, "error-period", "full")}
      ${item("状态", radios("status", [["1", "有效"], ["0", "无效"]], String(draft.status), ro), true)}
    </div>`);
  }

  function renderActivityCard(draft, ro) {
    const certificationVisible = draft.taskType !== "first_order";
    const orderVisible = draft.taskType !== "certification";
    const combined = draft.taskType === "combined";
    return card("活动配置", `<div class="edit-grid single-column">
      ${item("任务类型", radios("taskType", [["certification", "认证任务"], ["first_order", "首单任务"], ["combined", "认证+首单任务"]], draft.taskType, ro), true)}
      ${certificationVisible ? renderCertificationFields(draft, ro, combined) : ""}
      ${orderVisible ? renderOrderFields(draft, ro, combined) : ""}
      ${item("客态奖励", `${select("guestReward", SELECT_OPTIONS.guestReward, draft.guestReward, ro)}${errorText("请选择客态奖励")}`, true, "error-guestReward")}
    </div>`);
  }

  function renderCertificationFields(draft, ro, combined) {
    const rewardType = combined ? "ordinary" : draft.certificationRewardType;
    const ordinaryVisible = rewardType === "ordinary" || rewardType === "both";
    const cashVisible = rewardType === "cash" || rewardType === "both";
    return `
      ${item("认证任务ID", `${select("certificationTaskId", SELECT_OPTIONS.certification, draft.certificationTaskId, ro)}${errorText("请选择认证任务ID")}`, true, "error-certificationTaskId")}
      ${item("认证主态奖励类型", radios("certificationRewardType", [["ordinary", "普通奖励"], ...(!combined ? [["cash", "现金奖励"], ["both", "普通+现金奖励"]] : [])], rewardType, combined ? "disabled" : ro), true)}
      ${ordinaryVisible ? item("认证主态普通奖励", `${select("certificationOrdinaryReward", SELECT_OPTIONS.ordinaryReward, draft.certificationOrdinaryReward, ro)}${errorText("请选择认证主态普通奖励")}`, true, "error-certificationOrdinaryReward") : ""}
      ${cashVisible ? `
        ${item("认证主态现金奖励", `${select("certificationCashReward", SELECT_OPTIONS.cashReward, draft.certificationCashReward, ro)}${errorText("请选择认证主态现金奖励")}`, true, "error-certificationCashReward")}
        ${item("认证主态现金奖励金额", `${numberControl("certificationCashAmount", draft.certificationCashAmount, "元", ro)}${errorText("请输入大于0的整数金额")}`, true, "error-certificationCashAmount")}
        ${item("认证主态现金奖励", `${numberControl("certificationClaimDelay", draft.certificationClaimDelay, "天后可领取", ro)}${errorText("请输入大于等于0的整数天数")}<div class="helper">奖励流转为待领取后，达到配置天数即可领取</div>`, true, "error-certificationClaimDelay")}
      ` : ""}
      ${item("认证主态可领奖次数", `${numberControl("certificationClaimLimit", draft.certificationClaimLimit, "次", ro)}${errorText("请输入大于0的整数次数")}<div class="helper">联通邀请人完成任务，邀请人可以领取奖励的总次数</div>`, true, "error-certificationClaimLimit")}`;
  }

  function renderOrderFields(draft, ro, combined) {
    return `
      ${item("订单任务ID", `${select("orderTaskId", SELECT_OPTIONS.order, draft.orderTaskId, ro)}${errorText("请选择订单任务ID")}`, true, "error-orderTaskId")}
      ${item("订单主态奖励类型", radios("orderRewardType", [["cash", "现金奖励"]], "cash", "disabled"), true)}
      ${item("订单主态现金奖励", `${select("orderCashReward", SELECT_OPTIONS.cashReward, draft.orderCashReward, ro)}${errorText("请选择订单主态现金奖励")}`, true, "error-orderCashReward")}
      ${item("订单主态奖励金额", `${numberControl("orderCashAmount", draft.orderCashAmount, "元", ro)}${errorText("请输入大于0的整数金额")}`, true, "error-orderCashAmount")}
      ${item("订单主态奖励", `${numberControl("orderClaimDelay", draft.orderClaimDelay, "天后可领取", ro, 0)}${errorText("请输入大于等于0的整数天数")}<div class="helper">达到配置天数后奖励变为可领取</div>`, true, "error-orderClaimDelay")}
      ${item("订单主态可领奖次数", `${numberControl("orderClaimLimit", draft.orderClaimLimit, "次", ro)}${errorText("请输入大于0的整数次数")}<div class="helper">被邀请人完成任务，邀请人可以领取奖励的总次数</div>`, true, "error-orderClaimLimit")}
      ${combined ? `<div class="module-tip">认证任务使用普通奖励，首单任务使用现金奖励；两类任务分别累计可领取次数。</div>` : ""}`;
  }

  function renderMemberCard(draft, ro) {
    const enabled = draft.memberBenefitEnabled === "on";
    return card("会员权益配置", `<div class="edit-grid single-column">
      ${item("是否发放会员权益", radios("memberBenefitEnabled", [["off", "不发放"], ["on", "发放"]], draft.memberBenefitEnabled, ro), true)}
      ${enabled ? `
        ${item("权益有效期开始时间", radios("memberBenefitStart", [["reward", "奖励发放时间"], ["activity_end", "活动结束时间"]], draft.memberBenefitStart, ro), true)}
        ${item("权益code", `${input("memberBenefitCode", draft.memberBenefitCode, "请输入权益code", ro)}${errorText("请输入权益code")}`, true, "error-memberBenefitCode")}
      ` : ""}
    </div>`);
  }

  function renderPageCard(draft, ro) {
    return card("页面配置", `<div class="edit-grid single-column">
      ${item("主态落地页标题", `${input("hostPageTitle", draft.hostPageTitle, "请输入", ro)}${errorText("请输入主态落地页标题")}`, true, "error-hostPageTitle")}
      ${IMAGE_FIELDS.map(([field, label]) => item(label, `${imageUpload(field, draft[field], ro)}<div class="helper">图片尺寸：150 × 150</div>${errorText(`请上传${label}`)}`, true, `error-${field}`)).slice(0, 3).join("")}
      ${item("活动规则", `<textarea id="activityRules" data-model="activityRules" class="multiline-input tall" placeholder="请输入活动规则" ${ro}>${draft.activityRules}</textarea>${errorText("请输入活动规则")}`, true, "error-activityRules")}
      ${IMAGE_FIELDS.slice(3).map(([field, label]) => item(label, `${imageUpload(field, draft[field], ro)}<div class="helper">图片尺寸：150 × 150</div>${errorText(`请上传${label}`)}`, true, `error-${field}`)).join("")}
    </div>`);
  }

  function renderShareCard(draft, ro) {
    return card("分享配置", `<div class="edit-grid single-column">
      ${item("分享主标题", `${input("shareTitle", draft.shareTitle, "请输入", ro)}${errorText("请输入分享主标题")}`, true, "error-shareTitle")}
      ${item("分享副标题", `${input("shareSubtitle", draft.shareSubtitle, "请输入", ro)}${errorText("请输入分享副标题")}`, true, "error-shareSubtitle")}
      ${item("小程序分享图", `${imageUpload("shareImage", draft.shareImage, ro)}<div class="helper">图片尺寸：150 × 150；建议最大128KB</div>${errorText("请上传小程序分享图")}`, true, "error-shareImage")}
    </div>`);
  }

  function renderPushCard(draft, ro) {
    return card("用户触达", `<div class="edit-grid single-column">
      ${item("消息推送节点", `<div class="radio-row"><label><input type="checkbox" data-array-model="pushNodes" value="guest_accept" ${draft.pushNodes.includes("guest_accept") ? "checked" : ""} ${ro}> 客态用户接受邀请通知主态</label><label><input type="checkbox" data-array-model="pushNodes" value="guest_complete" ${draft.pushNodes.includes("guest_complete") ? "checked" : ""} ${ro}> 客态完成任务通知主态</label></div>`, false)}
    </div>`);
  }

  function bindFormInteractions() {
    document.querySelectorAll("[data-model]").forEach(control => {
      control.addEventListener("input", () => { state.draft[control.dataset.model] = control.type === "number" ? Number(control.value) : control.value; });
      control.addEventListener("change", () => { state.draft[control.dataset.model] = control.type === "number" ? Number(control.value) : control.value; });
    });
    document.querySelectorAll("[data-array-model]").forEach(control => {
      control.addEventListener("change", () => {
        const key = control.dataset.arrayModel;
        state.draft[key] = [...document.querySelectorAll(`[data-array-model="${key}"]:checked`)].map(item => item.value);
      });
    });
    bindRadio("riskControl");
    bindRadio("status", value => { state.draft.status = Number(value); });
    bindRadio("memberBenefitStart");
    bindRadio("taskType", value => {
      state.draft.taskType = value;
      if (value === "first_order") clearCertificationConfig();
      if (value === "certification") clearOrderConfig();
      if (value === "combined") state.draft.certificationRewardType = "ordinary";
      renderEdit();
    });
    bindRadio("certificationRewardType", value => {
      state.draft.certificationRewardType = value;
      if (value === "ordinary") clearCertificationCash();
      if (value === "cash") state.draft.certificationOrdinaryReward = "";
      renderEdit();
    });
    bindRadio("memberBenefitEnabled", value => {
      state.draft.memberBenefitEnabled = value;
      if (value === "off") state.draft.memberBenefitCode = "";
      renderEdit();
    });
    document.querySelectorAll("[data-number-target]").forEach(button => {
      button.onclick = () => {
        const key = button.dataset.numberTarget;
        const field = document.querySelector(`#${key}`);
        const minimum = Number(field.min || 0);
        state.draft[key] = Math.max(minimum, Number(state.draft[key] || 0) + Number(button.dataset.step));
        field.value = state.draft[key];
      };
    });
    bindImageUploads();
    document.querySelector("#fissionSave").onclick = saveActivity;
  }

  function bindRadio(name, callback) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(control => {
      control.onchange = () => {
        state.draft[name] = control.value;
        if (callback) callback(control.value);
      };
    });
  }

  function bindImageUploads() {
    document.querySelectorAll("[data-image-file]").forEach(control => {
      control.onchange = () => {
        const file = control.files?.[0];
        if (!file) return;
        const key = control.dataset.imageFile;
        state.draft[key] = `uploaded://${file.name}`;
        const box = document.querySelector(`[data-image-box="${key}"]`);
        box.classList.add("has-image");
        box.querySelector(".image-upload-icon").textContent = "✓";
        box.querySelector(`[data-image-label="${key}"]`).textContent = "已上传";
        box.querySelector(`[data-image-name="${key}"]`).textContent = file.name;
        document.querySelector(`#${key}`).value = state.draft[key];
      };
    });
    document.querySelectorAll("[data-clear-image]").forEach(button => {
      button.onclick = () => {
        state.draft[button.dataset.clearImage] = "";
        renderEdit();
      };
    });
  }

  function clearCertificationCash() {
    Object.assign(state.draft, { certificationCashReward: "", certificationCashAmount: 1, certificationClaimDelay: 1 });
  }

  function clearCertificationConfig() {
    Object.assign(state.draft, { certificationTaskId: "", certificationOrdinaryReward: "", certificationRewardType: "ordinary" });
    clearCertificationCash();
  }

  function clearOrderConfig() {
    Object.assign(state.draft, { orderTaskId: "", orderCashReward: "", orderCashAmount: 1, orderClaimDelay: 1, orderClaimLimit: 1 });
  }

  function saveActivity() {
    document.querySelectorAll(".has-error").forEach(element => { element.classList.remove("has-error"); });
    const errors = validate(state.draft);
    if (errors.length) {
      errors.forEach(key => { document.querySelector(`#error-${key}`)?.classList.add("has-error"); });
      document.querySelector(`#error-${errors[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast("请完整填写当前展示的必填配置", true);
      return;
    }
    const common = { ...cloneConfig(state.draft), modified: nowText(), modifier: "当前用户" };
    if (state.draft.code === "保存后生成") {
      const index = repository.list().length + 1;
      repository.create({ ...common, code: `FISSION-202609-${String(index).padStart(3, "0")}`, creator: "当前用户", created: nowText() });
    } else {
      repository.update(state.draft.code, common);
    }
    toast("保存成功");
    setTimeout(() => go("list"), 550);
  }

  function validate(draft) {
    const errors = [];
    const requiredText = ["name", "guestReward", "hostPageTitle", "activityRules", "shareTitle", "shareSubtitle", "shareImage", ...IMAGE_FIELDS.map(([key]) => key)];
    requiredText.forEach(key => { if (!String(draft[key] || "").trim()) errors.push(key); });
    if (draft.name.trim().length > 20) errors.push("name");
    if (!draft.channels.length) errors.push("channels");
    if (!draft.begin || !draft.end || draft.begin >= draft.end) errors.push("period");
    if (draft.taskType !== "first_order") {
      if (!draft.certificationTaskId) errors.push("certificationTaskId");
      const rewardType = draft.taskType === "combined" ? "ordinary" : draft.certificationRewardType;
      if ((rewardType === "ordinary" || rewardType === "both") && !draft.certificationOrdinaryReward) errors.push("certificationOrdinaryReward");
      if (rewardType === "cash" || rewardType === "both") {
        if (!draft.certificationCashReward) errors.push("certificationCashReward");
        validatePositiveInteger(draft.certificationCashAmount, "certificationCashAmount", errors);
        validateNonNegativeInteger(draft.certificationClaimDelay, "certificationClaimDelay", errors);
      }
      validatePositiveInteger(draft.certificationClaimLimit, "certificationClaimLimit", errors);
    }
    if (draft.taskType !== "certification") {
      if (!draft.orderTaskId) errors.push("orderTaskId");
      if (!draft.orderCashReward) errors.push("orderCashReward");
      validatePositiveInteger(draft.orderCashAmount, "orderCashAmount", errors);
      validateNonNegativeInteger(draft.orderClaimDelay, "orderClaimDelay", errors);
      validatePositiveInteger(draft.orderClaimLimit, "orderClaimLimit", errors);
    }
    if (draft.memberBenefitEnabled === "on" && !draft.memberBenefitCode.trim()) errors.push("memberBenefitCode");
    return [...new Set(errors)];
  }

  function validatePositiveInteger(value, key, errors) {
    if (!Number.isInteger(Number(value)) || Number(value) < 1) errors.push(key);
  }

  function validateNonNegativeInteger(value, key, errors) {
    if (!Number.isInteger(Number(value)) || Number(value) < 0) errors.push(key);
  }

  function showLogs(code) {
    modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal medium"><div class="modal-header"><span>操作日志 · ${code}</span><button class="modal-close">×</button></div><div class="modal-body"><ul class="timeline"><li><time>2026-09-15 16:10:20</time>沈岚1212240修改活动页面与奖励配置</li><li><time>2026-08-27 18:27:32</time>沈岚1212240创建活动</li></ul></div><div class="modal-footer"><button class="btn close-modal">关闭</button></div></div></div>`;
    modalRoot.querySelectorAll(".modal-close,.close-modal,.modal-backdrop").forEach(element => { element.onclick = event => { if (element.classList.contains("modal-backdrop") && event.target !== element) return; modalRoot.innerHTML = ""; }; });
  }

  return {
    id: ACTIVITY_ID,
    title: "真车主裂变活动",
    icon: "♧",
    defaultRoute: `${ACTIVITY_ID}/list`,
    menuItems: [{ title: "真车主裂变活动配置", route: `${ACTIVITY_ID}/list`, activeRoutes: [`${ACTIVITY_ID}/list`, `${ACTIVITY_ID}/edit`] }],
    routes: {
      [`${ACTIVITY_ID}/list`]: () => renderPage("list"),
      [`${ACTIVITY_ID}/edit`]: () => renderPage("edit"),
    },
  };
}
