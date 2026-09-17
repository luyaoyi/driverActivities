const REQUIREMENTS = {
  "driver-passenger-referral": {
    name: "司乘互推",
    pages: {
      "driver-fission/list": {
        title: "活动配置列表改动",
        items: [
          "“任务类型”调整为“司机任务类型”，与乘客订单任务区分。",
          "新增“乘客裂变”列，展示活动是否开启乘客裂变。",
        ],
      },
      "driver-fission/edit": {
        title: "活动配置编辑改动",
        items: [
          "新增乘客裂变开关、参与范围、订单任务及主客态奖励配置。",
          "“是否开启乘客裂变”仅允许在新建活动时选择，活动首次保存后不可修改。",
          "乘客裂变关闭时，隐藏并跳过乘客配置校验。",
          "原分享配置调整为司机裂变分享配置，并新增独立的乘客裂变分享配置。",
          "乘客分享配置仅在开启乘客裂变时展示并参与校验。",
        ],
      },
      "driver-fission/data": {
        title: "活动数据列表改动",
        items: [
          "原领奖次数列明确为司机裂变可领奖和已领奖次数。",
          "新增乘客裂变可领奖和已领奖次数。",
          "乘客裂变次数按活动配置的主态奖励类型展示。",
        ],
      },
      "driver-fission/data-detail": {
        title: "任务明细改动",
        items: [
          "新增裂变类型筛选项和列表字段，区分司机裂变、乘客裂变。",
          "子任务类型筛选新增“订单任务”。",
          "乘客裂变的任务类型、子任务类型统一展示为“订单任务”。",
        ],
      },
    },
  },
};

export function createRequirementView({ button, valueHost, menu, panel }) {
  let selectedRequirement = sessionStorage.getItem("marketingSelectedRequirement") || "";

  function renderPicker() {
    const requirement = REQUIREMENTS[selectedRequirement];
    document.body.dataset.requirement = selectedRequirement;
    valueHost.textContent = requirement?.name || "未选择";
    button.classList.toggle("active", Boolean(requirement));
    menu.querySelectorAll("[data-requirement-option]").forEach(option => {
      option.classList.toggle("active", option.dataset.requirementOption === selectedRequirement);
    });
  }

  function renderPanel(route) {
    const requirement = REQUIREMENTS[selectedRequirement];
    const page = requirement?.pages[route];
    panel.classList.toggle("visible", Boolean(page));
    panel.innerHTML = page ? `
      <div class="requirement-change-panel-head">
        <div><span class="requirement-change-kicker">当前需求</span><h2>${requirement.name}</h2></div>
        <button type="button" class="requirement-change-close" aria-label="关闭改动说明">×</button>
      </div>
      <div class="requirement-change-page">${page.title}</div>
      <ol>${page.items.map(item => `<li>${item}</li>`).join("")}</ol>
      <div class="requirement-change-legend">
        <span><i class="legend-new"></i>本次新增</span>
        <span><i class="legend-updated"></i>本次调整</span>
      </div>
    ` : "";
    panel.querySelector(".requirement-change-close")?.addEventListener("click", () => selectRequirement(""));
  }

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  function selectRequirement(requirementId, route = window.location.hash) {
    selectedRequirement = REQUIREMENTS[requirementId] ? requirementId : "";
    sessionStorage.setItem("marketingSelectedRequirement", selectedRequirement);
    renderPicker();
    renderPanel(String(route || "").replace(/^#\/?/, ""));
    closeMenu();
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

  renderPicker();

  return {
    setRoute(route) {
      renderPanel(route);
    },
  };
}
