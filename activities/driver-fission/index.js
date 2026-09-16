import { createMockActivityRepository } from "../../data/mock-activity-repository.js";
import { card, imageUpload, item, nowText, radios, toast } from "../../shared/ui.js";

const ACTIVITY_ID = "driver-fission";
const TASK_LABELS = {
  certification: "认证任务",
  first_order: "首单任务",
  combined: "认证+首单任务",
  order: "订单任务",
};

const FISSION_TYPE_LABELS = { driver: "司机裂变", passenger: "乘客裂变" };
const PASSENGER_REWARD_TYPE_LABELS = { cash: "现金奖励" };

const SELECT_OPTIONS = {
  certification: [
    ["CERT-REAL-OWNER-001", "真车主认证任务"],
    ["CERT-DRIVER-2026", "司机认证专项任务"],
  ],
  order: [
    ["ORDER-FIRST-001", "司机首单完单任务"],
    ["ORDER-FIRST-CITY", "城市首单专项任务"],
  ],
  passengerOrder: [
    ["PASSENGER-ORDER-001", "乘客用车完单任务"],
    ["PASSENGER-MILEAGE-001", "乘客用车里程任务"],
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
  passengerVoucher: [
    ["PASSENGER-VOUCHER-10", "乘客用车代金券10元"],
    ["PASSENGER-VOUCHER-20", "乘客用车代金券20元"],
  ],
  passengerCashReward: [
    ["CASH-PASSENGER-10", "邀请乘客完单返现10元"],
    ["CASH-PASSENGER-20", "邀请乘客完单返现20元"],
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
    passengerFissionEnabled: "off",
    passengerEligibility: "new_only",
    passengerOrderTaskId: "",
    passengerVoucherReward: "",
    passengerMasterRewardType: "cash",
    passengerCashReward: "",
    passengerCashAmount: 1,
    passengerClaimDelay: 0,
    passengerClaimLimit: 1,
    passengerShareTitle: "",
    passengerShareSubtitle: "",
    passengerShareImage: "",
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
    passengerFissionEnabled: "on",
    passengerEligibility: "all",
    passengerOrderTaskId: "PASSENGER-MILEAGE-001",
    passengerVoucherReward: "PASSENGER-VOUCHER-10",
    passengerMasterRewardType: "cash",
    passengerCashReward: "CASH-PASSENGER-10",
    passengerCashAmount: 10,
    passengerClaimDelay: 0,
    passengerClaimLimit: 5,
    passengerShareTitle: "邀请你组队打车领券",
    passengerShareSubtitle: "完成指定里程订单，我也能领现金",
    passengerShareImage: "https://example.com/fission-passenger-share.png",
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

function seedParticipationRecords() {
  return [
    { activityCode: "FISSION-202606-002", hostMid: "1728696355", shareId: "3a00a5663f9c", taskType: "first_order", joinedAt: "2026-09-16 16:33:25", claimable: { ordinary: 0, cash: 30 }, claimed: { ordinary: 0, cash: 0 }, passengerClaimable: 0, passengerClaimed: 0 },
    { activityCode: "FISSION-202606-002", hostMid: "2062421952", shareId: "c7cec6971a42", taskType: "first_order", joinedAt: "2026-09-16 16:32:15", claimable: { ordinary: 0, cash: 30 }, claimed: { ordinary: 0, cash: 0 }, passengerClaimable: 0, passengerClaimed: 0 },
    { activityCode: "FISSION-202606-002", hostMid: "3365504441", shareId: "e57777642c81", taskType: "first_order", joinedAt: "2026-09-16 16:31:18", claimable: { ordinary: 0, cash: 30 }, claimed: { ordinary: 0, cash: 0 }, passengerClaimable: 0, passengerClaimed: 0 },
    { activityCode: "FISSION-202609-001", hostMid: "3567297664", shareId: "0f705f1c601b", taskType: "combined", joinedAt: "2026-06-27 09:49:24", claimable: { ordinary: 30, cash: 30 }, claimed: { ordinary: 0, cash: 0 }, passengerClaimable: 5, passengerClaimed: 0 },
    { activityCode: "FISSION-202609-001", hostMid: "1434376038", shareId: "6d8ea106be32", taskType: "combined", joinedAt: "2026-06-22 20:26:09", claimable: { ordinary: 30, cash: 30 }, claimed: { ordinary: 3, cash: 1 }, passengerClaimable: 5, passengerClaimed: 2 },
    { activityCode: "FISSION-202601-006", hostMid: "3555708953", shareId: "9a1ab127bb94", taskType: "certification", joinedAt: "2026-06-16 16:09:23", claimable: { ordinary: 12, cash: 0 }, claimed: { ordinary: 5, cash: 0 }, passengerClaimable: 0, passengerClaimed: 0 },
  ];
}

function seedTaskRecords() {
  return [
    { id: "TASK-27771", shareId: "3a00a5663f9c", guestMid: "3603557583", deviceNo: "DEVICE-A102", taskNo: "TST0Z6TT001", fissionType: "driver", taskType: "first_order", subTaskType: "首单完单", taskStatus: "进行中", startedAt: "2026-09-16 16:16:41", expiresAt: "2026-09-23 16:16:40", completedAt: "-", rewardType: "cash", rewardStatus: "初始化", paymentStatus: "未打款", guestRewardStatus: "领取成功" },
    { id: "TASK-27772", shareId: "3a00a5663f9c", guestMid: "1592063031", deviceNo: "DEVICE-B208", taskNo: "TSRH6Y4E002", fissionType: "driver", taskType: "first_order", subTaskType: "首单完单", taskStatus: "已完成", startedAt: "2026-09-16 16:25:59", expiresAt: "2026-09-23 16:25:59", completedAt: "2026-09-18 10:22:16", rewardType: "cash", rewardStatus: "领取失败", paymentStatus: "打款失败", guestRewardStatus: "领取成功" },
    { id: "TASK-27773", shareId: "0f705f1c601b", guestMid: "1883201145", deviceNo: "DEVICE-C319", taskNo: "CERT2026003", fissionType: "driver", taskType: "combined", subTaskType: "认证任务", taskStatus: "已完成", startedAt: "2026-06-27 10:01:12", expiresAt: "2026-07-04 10:01:12", completedAt: "2026-06-27 11:15:32", rewardType: "ordinary", rewardStatus: "领取成功", paymentStatus: "-", guestRewardStatus: "领取成功" },
    { id: "TASK-27774", shareId: "0f705f1c601b", guestMid: "1883201145", deviceNo: "DEVICE-C319", taskNo: "ORDER2026004", fissionType: "driver", taskType: "combined", subTaskType: "首单任务", taskStatus: "已完成", startedAt: "2026-06-27 11:16:00", expiresAt: "2026-07-04 11:16:00", completedAt: "2026-06-28 09:08:27", rewardType: "cash", rewardStatus: "初始化", paymentStatus: "未打款", guestRewardStatus: "领取成功" },
    { id: "TASK-27775", shareId: "6d8ea106be32", guestMid: "2095517632", deviceNo: "DEVICE-D427", taskNo: "ORDER2026005", fissionType: "driver", taskType: "combined", subTaskType: "首单任务", taskStatus: "已完成", startedAt: "2026-06-22 20:35:18", expiresAt: "2026-06-29 20:35:18", completedAt: "2026-06-24 08:42:11", rewardType: "cash", rewardStatus: "领取成功", paymentStatus: "打款成功", guestRewardStatus: "领取成功" },
    { id: "TASK-27776", shareId: "9a1ab127bb94", guestMid: "2261095804", deviceNo: "DEVICE-E531", taskNo: "CERT2026006", fissionType: "driver", taskType: "certification", subTaskType: "认证任务", taskStatus: "已完成", startedAt: "2026-06-16 16:20:15", expiresAt: "2026-06-23 16:20:15", completedAt: "2026-06-18 14:30:41", rewardType: "ordinary", rewardStatus: "领取成功", paymentStatus: "-", guestRewardStatus: "领取成功" },
    { id: "TASK-27777", shareId: "0f705f1c601b", guestMid: "3187064215", deviceNo: "DEVICE-P612", taskNo: "PASSENGER2026007", fissionType: "passenger", taskType: "order", subTaskType: "订单任务", taskStatus: "已完成", startedAt: "2026-06-28 12:08:10", expiresAt: "2026-07-05 12:08:10", completedAt: "2026-06-29 18:26:40", rewardType: "cash", rewardStatus: "初始化", paymentStatus: "未打款", guestRewardStatus: "领取成功" },
  ];
}

export function createDriverFissionActivity({ main, modalRoot, navigate }) {
  const repository = createMockActivityRepository([
    seedRecord(),
    seedRecord({ code: "FISSION-202606-002", name: "邀请车主认证-首单现金30", taskType: "first_order", passengerFissionEnabled: "off", status: 1, created: "2026-06-12 16:13:06", modified: "2026-06-12 16:13:06" }),
    seedRecord({ code: "FISSION-202605-003", name: "邀请车主认证-认证现金", taskType: "certification", certificationRewardType: "cash", passengerFissionEnabled: "off", status: 0, created: "2026-05-25 17:11:32", modified: "2026-05-25 17:11:32" }),
    seedRecord({ code: "FISSION-202605-004", name: "邀请车主认证-首单现金", taskType: "first_order", passengerFissionEnabled: "off", status: 0, created: "2026-05-11 18:46:24", modified: "2026-05-11 18:46:24" }),
    seedRecord({ code: "FISSION-202604-005", name: "邀请车主认证-双重", taskType: "combined", passengerFissionEnabled: "off", status: 0, created: "2026-04-15 11:31:13", modified: "2026-04-15 11:31:13" }),
    seedRecord({ code: "FISSION-202601-006", name: "邀请车主认证", taskType: "certification", passengerFissionEnabled: "off", status: 0, created: "2026-01-16 13:16:37", modified: "2026-01-16 13:16:37" }),
  ]);
  const state = {
    draft: null,
    readonly: false,
    participations: seedParticipationRecords(),
    tasks: seedTaskRecords(),
    selectedShareId: "",
  };

  function go(page) {
    navigate(`${ACTIVITY_ID}/${page}`);
  }

  function renderPage(page) {
    modalRoot.innerHTML = "";
    if (page === "list") renderList();
    if (page === "edit") renderEdit();
    if (page === "data") renderData();
    if (page === "data-detail") renderDataDetail();
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
        <div class="table-wrap"><table><thead><tr><th>序号</th><th>活动编号</th><th>活动名称</th><th>司机任务类型</th><th>乘客裂变</th><th>状态</th><th>创建人</th><th>创建时间</th><th>操作</th></tr></thead><tbody id="fissionRows"></tbody></table></div>
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
      <td><span class="tag ${record.passengerFissionEnabled === "on" ? "tag-success" : "tag-info"}">${record.passengerFissionEnabled === "on" ? "已开启" : "未开启"}</span></td>
      <td><span class="tag ${record.status ? "tag-success" : "tag-info"}">${record.status ? "有效" : "无效"}</span></td>
      <td>${record.creator}</td><td>${record.created}</td>
      <td><button class="btn btn-text" data-fission-view="${record.code}">查看</button><button class="btn btn-text" data-fission-edit="${record.code}">编辑</button><button class="btn btn-text" data-fission-log="${record.code}">日志</button></td>
    </tr>`).join("") : `<tr><td colspan="9" class="empty">暂无数据</td></tr>`;
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

  function renderData() {
    main.innerHTML = `
      <div class="breadcrumb"><a>真车主裂变活动</a><i>›</i><span>活动数据</span></div>
      <section class="panel">
        <div class="query-grid">
          <div class="form-field"><label>活动编号：</label><input id="dataActivityCode" placeholder="请输入"></div>
          <div class="form-field"><label>主态mid：</label><input id="dataHostMid" placeholder="请输入"></div>
          <div class="form-field"><label>分享Id：</label><input id="dataShareId" placeholder="请输入"></div>
        </div>
        <div class="query-actions"><button class="btn btn-primary" id="dataQuery">⌕ 查询</button><button class="btn btn-primary" id="dataReset">↻ 重置</button></div>
      </section>
      <section>
        <div class="table-titlebar"><span class="table-title">裂变活动参与数据</span><span id="participationCount" style="color:#909399;font-size:12px"></span></div>
        <div class="table-wrap"><table><thead><tr><th>序号</th><th>活动编号</th><th>主态mid</th><th>分享ID</th><th>任务类型</th><th>活动参与时间</th><th>司机裂变可领奖总次数</th><th>司机已领奖总次数</th><th>乘客裂变可领奖总次数</th><th>乘客裂变已领奖总次数</th><th>操作</th></tr></thead><tbody id="participationRows"></tbody></table></div>
        <div class="pagination"><span id="participationPaginationCount"></span><select style="width:90px"><option>10条/页</option><option>20条/页</option><option>50条/页</option></select><span class="page-box">‹</span><span class="page-box active">1</span><span class="page-box">›</span><span>前往</span><input style="width:46px;height:28px" value="1"><span>页</span></div>
      </section>`;
    drawParticipationRows(state.participations);
    document.querySelector("#dataQuery").onclick = filterParticipationRows;
    document.querySelector("#dataReset").onclick = () => {
      ["dataActivityCode", "dataHostMid", "dataShareId"].forEach(id => { document.querySelector(`#${id}`).value = ""; });
      toast("筛选条件已重置，请点击查询");
    };
  }

  function configuredRewardTypes(activityCode) {
    const activity = repository.find(activityCode);
    if (!activity) return [];
    if (activity.taskType === "first_order" || activity.taskType === "combined") return activity.taskType === "combined" ? ["ordinary", "cash"] : ["cash"];
    if (activity.certificationRewardType === "both") return ["ordinary", "cash"];
    return [activity.certificationRewardType === "cash" ? "cash" : "ordinary"];
  }

  function rewardCountLines(record, field) {
    const labels = { ordinary: "普通奖励", cash: "现金奖励" };
    const rewardTypes = configuredRewardTypes(record.activityCode);
    return rewardTypes.map(type => `<div class="reward-count-line"><span>${labels[type]}：</span><b>${record[field][type] || 0}</b></div>`).join("");
  }

  function passengerRewardCountLine(record, field) {
    const activity = repository.find(record.activityCode);
    const rewardType = activity?.passengerMasterRewardType;
    const rewardLabel = PASSENGER_REWARD_TYPE_LABELS[rewardType] || "未配置奖励";
    return `<div class="reward-count-line"><span>${rewardLabel}：</span><b>${record[field] || 0}</b></div>`;
  }

  function drawParticipationRows(records) {
    const host = document.querySelector("#participationRows");
    document.querySelector("#participationCount").textContent = `共 ${records.length} 条`;
    document.querySelector("#participationPaginationCount").textContent = `共 ${records.length} 条`;
    host.innerHTML = records.length ? records.map((record, index) => `<tr>
      <td>${index + 1}</td><td>${record.activityCode}</td><td>${record.hostMid}</td><td class="ellipsis-cell" title="${record.shareId}">${record.shareId}</td>
      <td>${TASK_LABELS[record.taskType]}</td><td>${record.joinedAt}</td><td>${rewardCountLines(record, "claimable")}</td><td>${rewardCountLines(record, "claimed")}</td>
      <td>${passengerRewardCountLine(record, "passengerClaimable")}</td><td>${passengerRewardCountLine(record, "passengerClaimed")}</td>
      <td><button class="btn btn-text" data-participation-detail="${record.shareId}">查看明细</button></td>
    </tr>`).join("") : `<tr><td colspan="11" class="empty">暂无数据</td></tr>`;
    host.querySelectorAll("[data-participation-detail]").forEach(button => {
      button.onclick = () => {
        state.selectedShareId = button.dataset.participationDetail;
        go("data-detail");
      };
    });
  }

  function filterParticipationRows() {
    const activityCode = document.querySelector("#dataActivityCode").value.trim().toLowerCase();
    const hostMid = document.querySelector("#dataHostMid").value.trim();
    const shareId = document.querySelector("#dataShareId").value.trim().toLowerCase();
    drawParticipationRows(state.participations.filter(record => (!activityCode || record.activityCode.toLowerCase().includes(activityCode)) && (!hostMid || record.hostMid.includes(hostMid)) && (!shareId || record.shareId.toLowerCase().includes(shareId))));
  }

  function renderDataDetail() {
    if (!state.selectedShareId) state.selectedShareId = state.participations[0]?.shareId || "";
    const selectedParticipation = state.participations.find(record => record.shareId === state.selectedShareId);
    main.innerHTML = `
      <div class="breadcrumb"><a id="backToFissionData">真车主裂变活动</a><i>›</i><a id="backToFissionData2">活动数据</a><i>›</i><span>任务明细</span></div>
      <div class="page-header"><div><h1>裂变任务明细</h1><p>${selectedParticipation ? `主态mid：${selectedParticipation.hostMid}　活动编号：${selectedParticipation.activityCode}` : "查看客态任务及奖励状态"}</p></div></div>
      <section class="panel">
        <div class="detail-query-grid">
          <div class="form-field"><label>分享Id：</label><input id="detailShareId" value="${state.selectedShareId}" placeholder="请输入"></div>
          <div class="form-field"><label>客态mid：</label><input id="detailGuestMid" placeholder="请输入"></div>
          <div class="form-field"><label>设备号：</label><input id="detailDeviceNo" placeholder="请输入"></div>
          <div class="form-field"><label>裂变类型：</label><select id="detailFissionType"><option value="">全部</option><option value="driver">司机裂变</option><option value="passenger">乘客裂变</option></select></div>
          <div class="form-field"><label>主态奖励类型：</label><select id="detailRewardType"><option value="">全部</option><option value="ordinary">普通奖励</option><option value="cash">现金奖励</option></select></div>
          <div class="form-field"><label>子任务类型：</label><select id="detailSubTaskType"><option value="">全部</option><option value="认证任务">认证任务</option><option value="首单任务">首单任务</option><option value="首单完单">首单完单</option><option value="订单任务">订单任务</option></select></div>
        </div>
        <div class="query-actions"><button class="btn btn-primary" id="detailQuery">⌕ 查询</button><button class="btn btn-primary" id="detailReset">↻ 重置</button></div>
      </section>
      <section>
        <div class="table-titlebar"><span class="table-title">客态任务明细</span><span id="taskCount" style="color:#909399;font-size:12px"></span></div>
        <div class="table-wrap"><table class="extra-wide"><thead><tr><th>序号</th><th>分享ID</th><th>客态mid</th><th>设备号</th><th>taskNo</th><th>裂变类型</th><th>任务类型</th><th>子任务类型</th><th>任务状态</th><th>任务开始时间</th><th>任务过期时间</th><th>任务完成时间</th><th>主态奖励类型</th><th>主态奖励状态</th><th>打款状态</th><th>客态奖励状态</th><th>操作</th></tr></thead><tbody id="taskRows"></tbody></table></div>
        <div class="pagination"><span id="taskPaginationCount"></span><select style="width:90px"><option>10条/页</option><option>20条/页</option><option>50条/页</option></select><span class="page-box">‹</span><span class="page-box active">1</span><span class="page-box">›</span><span>前往</span><input style="width:46px;height:28px" value="1"><span>页</span></div>
      </section>`;
    ["backToFissionData", "backToFissionData2"].forEach(id => { document.querySelector(`#${id}`).onclick = () => go("data"); });
    drawTaskRows(tasksForSelectedParticipation());
    document.querySelector("#detailQuery").onclick = filterTaskRows;
    document.querySelector("#detailReset").onclick = () => {
      document.querySelector("#detailShareId").value = state.selectedShareId;
      ["detailGuestMid", "detailDeviceNo", "detailFissionType", "detailRewardType", "detailSubTaskType"].forEach(id => { document.querySelector(`#${id}`).value = ""; });
      toast("筛选条件已重置，请点击查询");
    };
  }

  function tasksForSelectedParticipation() {
    return state.tasks.filter(record => record.shareId === state.selectedShareId);
  }

  function rewardTypeLabel(type) {
    return type === "cash" ? "现金奖励" : "普通奖励";
  }

  function drawTaskRows(records) {
    const host = document.querySelector("#taskRows");
    document.querySelector("#taskCount").textContent = `共 ${records.length} 条`;
    document.querySelector("#taskPaginationCount").textContent = `共 ${records.length} 条`;
    host.innerHTML = records.length ? records.map((record, index) => {
      const canForceUpdate = record.rewardType === "cash" && ["未打款", "打款失败"].includes(record.paymentStatus);
      return `<tr>
        <td>${index + 1}</td><td class="ellipsis-cell" title="${record.shareId}">${record.shareId}</td><td>${record.guestMid}</td><td>${record.deviceNo}</td><td>${record.taskNo}</td>
        <td>${FISSION_TYPE_LABELS[record.fissionType]}</td><td>${record.fissionType === "passenger" ? "订单任务" : TASK_LABELS[record.taskType]}</td><td>${record.fissionType === "passenger" ? "订单任务" : record.subTaskType}</td><td>${record.taskStatus}</td><td>${record.startedAt}</td><td>${record.expiresAt}</td><td>${record.completedAt}</td>
        <td>${rewardTypeLabel(record.rewardType)}</td><td>${record.rewardStatus}</td><td><span class="tag ${record.paymentStatus === "打款成功" ? "tag-success" : record.paymentStatus === "打款失败" ? "tag-danger" : "tag-info"}">${record.paymentStatus}</span></td><td>${record.guestRewardStatus}</td>
        <td>${canForceUpdate ? `<button class="btn btn-text" data-force-payment="${record.id}">强制更新打款状态</button>` : "-"}</td>
      </tr>`;
    }).join("") : `<tr><td colspan="17" class="empty">暂无数据</td></tr>`;
    host.querySelectorAll("[data-force-payment]").forEach(button => { button.onclick = () => forceUpdatePayment(button.dataset.forcePayment); });
  }

  function filterTaskRows() {
    const shareId = document.querySelector("#detailShareId").value.trim().toLowerCase();
    const guestMid = document.querySelector("#detailGuestMid").value.trim();
    const deviceNo = document.querySelector("#detailDeviceNo").value.trim().toLowerCase();
    const fissionType = document.querySelector("#detailFissionType").value;
    const rewardType = document.querySelector("#detailRewardType").value;
    const subTaskType = document.querySelector("#detailSubTaskType").value;
    drawTaskRows(state.tasks.filter(record => (!shareId || record.shareId.toLowerCase().includes(shareId)) && (!guestMid || record.guestMid.includes(guestMid)) && (!deviceNo || record.deviceNo.toLowerCase().includes(deviceNo)) && (!fissionType || record.fissionType === fissionType) && (!rewardType || record.rewardType === rewardType) && (!subTaskType || record.subTaskType === subTaskType)));
  }

  function forceUpdatePayment(taskId) {
    const record = state.tasks.find(task => task.id === taskId);
    if (!record || record.rewardType !== "cash" || !["未打款", "打款失败"].includes(record.paymentStatus)) return;
    record.rewardStatus = "领取成功";
    record.paymentStatus = "打款成功";
    drawTaskRows(tasksForSelectedParticipation());
    toast("打款状态更新成功");
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
      <div class="page-header"><div><h1>${state.readonly ? "查看真车主裂变活动" : draft.code === "保存后生成" ? "新建真车主裂变活动" : "编辑真车主裂变活动"}</h1><p>配置司机裂变、乘客裂变、主客态奖励、页面素材及分享触达</p></div><span class="tag ${draft.status ? "tag-success" : "tag-info"}">${draft.status ? "有效" : "无效"}</span></div>
      <form id="fissionForm">
        ${renderBasicCard(draft, ro)}
        ${renderActivityCard(draft, ro)}
        ${renderPassengerFissionCard(draft, ro)}
        ${renderMemberCard(draft, ro)}
        ${renderPageCard(draft, ro)}
        ${renderShareCard(draft, ro)}
        ${renderPassengerShareCard(draft, ro)}
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

  function renderPassengerFissionCard(draft, ro) {
    const enabled = draft.passengerFissionEnabled === "on";
    return card("乘客裂变配置", `<div class="edit-grid single-column">
      ${item("是否开启乘客裂变", `${radios("passengerFissionEnabled", [["off", "不开启"], ["on", "开启"]], draft.passengerFissionEnabled, ro)}<div class="helper">开启后，发起人可分别生成司机邀请和乘客邀请两个分享入口</div>`, true)}
      ${enabled ? `
        ${item("乘客参与范围", radios("passengerEligibility", [["new_only", "仅新客"], ["existing_only", "仅老客"], ["all", "新老客均可"]], draft.passengerEligibility, ro), true)}
        ${item("乘客订单任务ID", `${select("passengerOrderTaskId", SELECT_OPTIONS.passengerOrder, draft.passengerOrderTaskId, ro)}${errorText("请选择乘客订单任务ID")}<div class="helper">任务有效期、订单类型和公里数等条件在任务中心配置</div>`, true, "error-passengerOrderTaskId")}
        ${item("乘客裂变客态奖励", `${select("passengerVoucherReward", SELECT_OPTIONS.passengerVoucher, draft.passengerVoucherReward, ro)}${errorText("请选择乘客裂变客态奖励")}<div class="helper">乘客确认组队成功后立即发放；任务过期后重新组队可再次发放</div>`, true, "error-passengerVoucherReward")}
        ${item("乘客裂变主态奖励类型", radios("passengerMasterRewardType", [["cash", "现金奖励"]], draft.passengerMasterRewardType, "disabled"), true)}
        ${item("现金奖励金额", `${numberControl("passengerCashAmount", draft.passengerCashAmount, "元", ro)}${errorText("请输入大于0的整数金额")}`, true, "error-passengerCashAmount")}
        ${item("乘客裂变主态奖励", `${select("passengerCashReward", SELECT_OPTIONS.passengerCashReward, draft.passengerCashReward, ro)}${errorText("请选择乘客裂变主态奖励")}`, true, "error-passengerCashReward")}
        ${item("奖励可领取时间", `${numberControl("passengerClaimDelay", draft.passengerClaimDelay, "天后可领取", ro, 0)}${errorText("请输入大于等于0的整数天数")}<div class="helper">乘客完成订单任务后，奖励按现有司机裂变方式流转为可领取</div>`, true, "error-passengerClaimDelay")}
        ${item("乘客裂变主态可领奖次数", `${numberControl("passengerClaimLimit", draft.passengerClaimLimit, "次", ro)}${errorText("请输入大于0的整数次数")}<div class="helper">达到上限后仍可继续邀请和组队，但发起人不再可领现金奖励</div>`, true, "error-passengerClaimLimit")}
      ` : ""}
    </div>`);
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
    return card("司机裂变分享配置", `<div class="edit-grid single-column">
      ${item("分享主标题", `${input("shareTitle", draft.shareTitle, "请输入", ro)}${errorText("请输入分享主标题")}`, true, "error-shareTitle")}
      ${item("分享副标题", `${input("shareSubtitle", draft.shareSubtitle, "请输入", ro)}${errorText("请输入分享副标题")}`, true, "error-shareSubtitle")}
      ${item("小程序分享图", `${imageUpload("shareImage", draft.shareImage, ro)}<div class="helper">图片尺寸：150 × 150；建议最大128KB</div>${errorText("请上传小程序分享图")}`, true, "error-shareImage")}
    </div>`);
  }

  function renderPassengerShareCard(draft, ro) {
    if (draft.passengerFissionEnabled !== "on") return "";
    return card("乘客裂变分享配置", `<div class="edit-grid single-column">
      ${item("乘客分享主标题", `${input("passengerShareTitle", draft.passengerShareTitle, "请输入乘客邀请分享主标题", ro)}${errorText("请输入乘客分享主标题")}`, true, "error-passengerShareTitle")}
      ${item("乘客分享副标题", `${input("passengerShareSubtitle", draft.passengerShareSubtitle, "请输入乘客邀请分享副标题", ro)}${errorText("请输入乘客分享副标题")}`, true, "error-passengerShareSubtitle")}
      ${item("乘客小程序分享图", `${imageUpload("passengerShareImage", draft.passengerShareImage, ro)}<div class="helper">图片尺寸：150 × 150；建议最大128KB</div>${errorText("请上传乘客小程序分享图")}`, true, "error-passengerShareImage")}
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
    bindRadio("passengerEligibility");
    bindRadio("passengerFissionEnabled", value => {
      state.draft.passengerFissionEnabled = value;
      renderEdit();
    });
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
    if (draft.passengerFissionEnabled === "on") {
      const passengerRequired = ["passengerOrderTaskId", "passengerVoucherReward", "passengerCashReward", "passengerShareTitle", "passengerShareSubtitle", "passengerShareImage"];
      passengerRequired.forEach(key => { if (!String(draft[key] || "").trim()) errors.push(key); });
      validatePositiveInteger(draft.passengerCashAmount, "passengerCashAmount", errors);
      validateNonNegativeInteger(draft.passengerClaimDelay, "passengerClaimDelay", errors);
      validatePositiveInteger(draft.passengerClaimLimit, "passengerClaimLimit", errors);
    }
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
    menuItems: [
      { title: "真车主裂变活动配置", route: `${ACTIVITY_ID}/list`, activeRoutes: [`${ACTIVITY_ID}/list`, `${ACTIVITY_ID}/edit`] },
      { title: "真车主裂变活动数据", route: `${ACTIVITY_ID}/data`, activeRoutes: [`${ACTIVITY_ID}/data`, `${ACTIVITY_ID}/data-detail`] },
    ],
    routes: {
      [`${ACTIVITY_ID}/list`]: () => renderPage("list"),
      [`${ACTIVITY_ID}/edit`]: () => renderPage("edit"),
      [`${ACTIVITY_ID}/data`]: () => renderPage("data"),
      [`${ACTIVITY_ID}/data-detail`]: () => renderPage("data-detail"),
    },
  };
}
