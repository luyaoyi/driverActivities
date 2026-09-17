export const BASELINE_REQUIREMENT = "基线版本";

const REQUIREMENTS = {
  "司乘互推": {
    pages: {
      "driver-fission/list": {
        title: "活动配置列表改动",
        items: [
          { target: "list-driver-task-type", type: "updated", text: "“任务类型”调整为“司机任务类型”，与乘客订单任务区分。" },
          { target: "list-passenger-fission", type: "new", text: "新增“乘客裂变”列，展示活动是否开启乘客裂变。" },
        ],
      },
      "driver-fission/edit": {
        title: "活动配置编辑改动",
        items: [
          { target: "edit-passenger-card", type: "new", text: "新增乘客裂变开关、参与范围、订单任务及主客态奖励配置。" },
          { target: "edit-passenger-switch", type: "updated", text: "“是否开启乘客裂变”仅允许在新建活动时选择，活动首次保存后不可修改。" },
          { target: "edit-passenger-validation", type: "updated", text: "乘客裂变关闭时，隐藏并跳过乘客配置校验。" },
          { target: "edit-page-driver-invite-button", type: "updated", text: "“主态邀请按钮图片”调整为“主态邀请司机按钮图片”。" },
          { target: "edit-page-driver-guest-header", type: "updated", text: "“客态落地页头图”调整为“司机客态落地页头图”。" },
          { target: "edit-page-driver-guest-bottom", type: "updated", text: "“客态落地页底图”调整为“司机客态落地页底图”。" },
          { target: "edit-page-driver-cert-button", type: "updated", text: "“客态可认证按钮图片”调整为“司机客态可认证按钮图片”。" },
          { target: "edit-page-driver-order-button", type: "updated", text: "“客态可接单按钮图片”调整为“司机客态可接单按钮图片”。" },
          { target: "edit-page-passenger-invite-button", type: "new", text: "开启乘客裂变时，新增“主态邀请乘客按钮图片”。" },
          { target: "edit-page-passenger-guest-header", type: "new", text: "开启乘客裂变时，新增“乘客客态落地页头图”。" },
          { target: "edit-page-passenger-guest-bottom", type: "new", text: "开启乘客裂变时，新增“乘客客态落地页底图”。" },
          { target: "edit-page-passenger-order-button", type: "new", text: "开启乘客裂变时，新增“乘客客态去下单按钮图片”。" },
          { target: "edit-driver-share", type: "updated", text: "原分享配置调整为司机裂变分享配置。" },
          { target: "edit-passenger-share", type: "new", text: "新增独立的乘客裂变分享配置，仅在开启乘客裂变时展示并参与校验。" },
        ],
      },
      "driver-fission/data": {
        title: "活动数据列表改动",
        items: [
          { target: "data-driver-claimable", type: "updated", text: "原“可领奖总次数”明确为司机裂变数据。" },
          { target: "data-driver-claimed", type: "updated", text: "原“已领奖总次数”明确为司机裂变数据。" },
          { target: "data-passenger-claimable", type: "new", text: "新增乘客裂变可领奖总次数。" },
          { target: "data-passenger-claimed", type: "new", text: "新增乘客裂变已领奖总次数，按活动配置的主态奖励类型展示。" },
        ],
      },
      "driver-fission/data-detail": {
        title: "任务明细改动",
        items: [
          { target: "detail-fission-filter", type: "new", text: "新增裂变类型筛选项，区分司机裂变、乘客裂变。" },
          { target: "detail-fission-column", type: "new", text: "新增裂变类型列表字段。" },
          { target: "detail-subtask-filter", type: "updated", text: "子任务类型筛选新增“订单任务”。" },
          { target: "detail-task-type", type: "updated", text: "乘客裂变的任务类型统一展示为“订单任务”。" },
          { target: "detail-subtask-column", type: "updated", text: "乘客裂变的子任务类型统一展示为“订单任务”。" },
        ],
      },
    },
  },
};

function availableRequirement(name) {
  return name === BASELINE_REQUIREMENT || Boolean(REQUIREMENTS[name]);
}

function readRequirementFromUrl() {
  const name = new URL(window.location.href).searchParams.get("requirement");
  return availableRequirement(name) ? name : "";
}

let selectedRequirement = readRequirementFromUrl()
  || (availableRequirement(sessionStorage.getItem("marketingSelectedRequirement")) ? sessionStorage.getItem("marketingSelectedRequirement") : "")
  || BASELINE_REQUIREMENT;

export function getSelectedRequirement() {
  return selectedRequirement;
}

export function isRequirementSelected(name) {
  return selectedRequirement === name;
}

export function createRequirementView({ button, valueHost, menu, panel, onChange }) {
  const requirementNames = Object.keys(REQUIREMENTS);
  let currentRoute = "";

  menu.innerHTML = [BASELINE_REQUIREMENT, ...requirementNames]
    .map(name => `<button type="button" data-requirement-option="${name}">${name}</button>`)
    .join("");

  function writeRequirementToUrl(name) {
    const url = new URL(window.location.href);
    url.searchParams.set("requirement", name);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function renderPicker() {
    document.body.dataset.requirement = selectedRequirement;
    valueHost.textContent = selectedRequirement;
    button.classList.toggle("active", selectedRequirement !== BASELINE_REQUIREMENT);
    menu.querySelectorAll("[data-requirement-option]").forEach(option => {
      option.classList.toggle("active", option.dataset.requirementOption === selectedRequirement);
    });
    document.querySelectorAll("[data-requirement-names]").forEach(marker => {
      marker.classList.toggle("visible", marker.dataset.requirementNames.split("|").includes(selectedRequirement));
    });
  }

  function highlightChange(target) {
    document.querySelectorAll(".change-badge.is-highlighted,.requirement-change-item.is-highlighted").forEach(element => element.classList.remove("is-highlighted"));
    const marker = document.querySelector(`[data-change-point="${target}"]`);
    const item = panel.querySelector(`[data-change-target="${target}"]`);
    marker?.classList.add("is-highlighted");
    item?.classList.add("is-highlighted");
    marker?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    window.setTimeout(() => marker?.classList.remove("is-highlighted"), 1800);
  }

  function renderPanel(route) {
    currentRoute = route;
    const requirement = REQUIREMENTS[selectedRequirement];
    const page = requirement?.pages[route];
    panel.classList.toggle("visible", Boolean(page));
    panel.innerHTML = page ? `
      <div class="requirement-change-resizer" title="拖动调整宽度" aria-hidden="true"></div>
      <div class="requirement-change-panel-head">
        <div><span class="requirement-change-kicker">当前需求</span><h2>${selectedRequirement}</h2></div>
        <button type="button" class="requirement-change-close" aria-label="返回基线版本">×</button>
      </div>
      <div class="requirement-change-page">${page.title}</div>
      <ol>${page.items.map((item, index) => `
        <li><button type="button" class="requirement-change-item" data-change-target="${item.target}">
          <span class="requirement-change-index">${index + 1}</span>
          <span>${item.text}</span>
          <em class="change-type-${item.type}">${item.type === "new" ? "新增" : "调整"}</em>
        </button></li>`).join("")}</ol>
      <div class="requirement-change-legend">
        <span><i class="legend-new"></i>本次新增</span>
        <span><i class="legend-updated"></i>本次调整</span>
      </div>
    ` : "";
    panel.querySelector(".requirement-change-close")?.addEventListener("click", () => selectRequirement(BASELINE_REQUIREMENT));
    panel.querySelectorAll("[data-change-target]").forEach(item => {
      item.addEventListener("click", () => highlightChange(item.dataset.changeTarget));
    });
    bindPanelResize();
  }

  function bindPageMarkers() {
    document.querySelectorAll("[data-change-point]").forEach(marker => {
      if (marker.dataset.changeBound === "true") return;
      marker.dataset.changeBound = "true";
      marker.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        const item = panel.querySelector(`[data-change-target="${marker.dataset.changePoint}"]`);
        item?.scrollIntoView({ behavior: "smooth", block: "center" });
        highlightChange(marker.dataset.changePoint);
      });
    });
  }

  function bindPanelResize() {
    const resizer = panel.querySelector(".requirement-change-resizer");
    if (!resizer) return;
    const savedWidth = Number(sessionStorage.getItem("marketingRequirementPanelWidth"));
    if (savedWidth) panel.style.setProperty("--requirement-panel-width", `${savedWidth}px`);
    resizer.addEventListener("pointerdown", event => {
      event.preventDefault();
      const startX = event.clientX;
      const startWidth = panel.getBoundingClientRect().width;
      resizer.setPointerCapture(event.pointerId);
      panel.classList.add("is-resizing");
      const move = moveEvent => {
        const width = Math.min(560, Math.max(260, startWidth + startX - moveEvent.clientX));
        panel.style.setProperty("--requirement-panel-width", `${width}px`);
      };
      const stop = stopEvent => {
        resizer.releasePointerCapture(stopEvent.pointerId);
        resizer.removeEventListener("pointermove", move);
        resizer.removeEventListener("pointerup", stop);
        panel.classList.remove("is-resizing");
        sessionStorage.setItem("marketingRequirementPanelWidth", String(Math.round(panel.getBoundingClientRect().width)));
      };
      resizer.addEventListener("pointermove", move);
      resizer.addEventListener("pointerup", stop);
    });
  }

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  function selectRequirement(name) {
    selectedRequirement = availableRequirement(name) ? name : BASELINE_REQUIREMENT;
    sessionStorage.setItem("marketingSelectedRequirement", selectedRequirement);
    writeRequirementToUrl(selectedRequirement);
    renderPicker();
    closeMenu();
    onChange?.(selectedRequirement);
  }

  button.addEventListener("click", event => {
    event.stopPropagation();
    menu.hidden = !menu.hidden;
    button.setAttribute("aria-expanded", String(!menu.hidden));
  });

  menu.querySelectorAll("[data-requirement-option]").forEach(option => {
    option.addEventListener("click", () => selectRequirement(option.dataset.requirementOption));
  });

  document.addEventListener("click", event => {
    if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) closeMenu();
  });
  document.addEventListener("prototypecontentchange", bindPageMarkers);

  renderPicker();
  writeRequirementToUrl(selectedRequirement);

  return {
    setRoute(route) {
      renderPanel(route);
      bindPageMarkers();
    },
    refresh() {
      renderPanel(currentRoute);
      bindPageMarkers();
    },
  };
}
