import { createRouter } from "./core/router.js";
import { createShell } from "./core/shell.js";
import { createRequirementView } from "./core/requirement-view.js";
import { createDriverFissionActivity } from "./activities/driver-fission/index.js";
import { createTeamOrderActivity } from "./activities/team-order/index.js";

const main = document.querySelector("#main");
const modalRoot = document.querySelector("#modalRoot");

const router = createRouter();
const activities = [
  createTeamOrderActivity({
    main,
    modalRoot,
    navigate: route => router.navigate(route),
  }),
  createDriverFissionActivity({
    main,
    modalRoot,
    navigate: route => router.navigate(route),
  }),
];

const shell = createShell({
  host: document.querySelector("#sidebar"),
  activities,
  navigate: route => router.navigate(route),
});

const requirementView = createRequirementView({
  button: document.querySelector("#requirementPickerButton"),
  valueHost: document.querySelector("#requirementPickerValue"),
  menu: document.querySelector("#requirementPickerMenu"),
  panel: document.querySelector("#requirementChangePanel"),
  onChange: () => router.navigate(router.getCurrentRoute(), { replace: true }),
});

activities.forEach(activity => {
  Object.entries(activity.routes).forEach(([route, render]) => {
    router.register(route, render);
  });
});

router.onChange(route => {
  shell.setActiveRoute(route);
  requirementView.setRoute(route);
});
router.start(activities[0].defaultRoute);
