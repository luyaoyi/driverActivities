export function createShell({ host, activities, navigate }) {
  const expandedActivities = new Set(activities.map(activity => activity.id));

  host.innerHTML = `
    <div class="nav-section">营销活动</div>
    ${activities.map(activity => `
      <div class="nav-group" data-activity="${activity.id}">
        <button class="nav-item" data-toggle-activity="${activity.id}" aria-expanded="true">
          <span>${activity.icon || "◇"}</span>
          <span>${activity.title}</span>
          <span class="nav-arrow">⌄</span>
        </button>
        <div class="subnav" data-activity-pages="${activity.id}">
          ${activity.menuItems.map(item => `
            <button class="subnav-item" data-route="${item.route}">${item.title}</button>
          `).join("")}
        </div>
      </div>
    `).join("")}`;

  host.querySelectorAll("[data-route]").forEach(button => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });

  host.querySelectorAll("[data-toggle-activity]").forEach(button => {
    button.addEventListener("click", () => {
      const activityId = button.dataset.toggleActivity;
      const pages = host.querySelector(`[data-activity-pages="${activityId}"]`);
      const expanded = expandedActivities.has(activityId);
      if (expanded) expandedActivities.delete(activityId);
      else expandedActivities.add(activityId);
      button.setAttribute("aria-expanded", String(!expanded));
      button.querySelector(".nav-arrow").textContent = expanded ? "›" : "⌄";
      pages.classList.toggle("collapsed", expanded);
    });
  });

  return {
    setActiveRoute(route) {
      activities.forEach(activity => {
        const activityActive = route.startsWith(`${activity.id}/`);
        host.querySelector(`[data-toggle-activity="${activity.id}"]`).classList.toggle("active", activityActive);
        activity.menuItems.forEach(item => {
          const active = item.activeRoutes.includes(route);
          host.querySelector(`[data-route="${item.route}"]`).classList.toggle("active", active);
        });
      });
    },
  };
}
