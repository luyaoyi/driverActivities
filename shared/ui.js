export function card(title, body) {
  return `<section class="card"><div class="card-header"><span>${title}</span></div><div class="card-body">${body}</div></section>`;
}

export function item(label, control, required = false, id = "", extra = "") {
  return `<div class="edit-item ${extra}" ${id ? `id="${id}"` : ""}><div class="edit-label ${required ? "required" : ""}">${label}</div><div class="control">${control}</div></div>`;
}

export function radios(name, options, selected, disabled) {
  return `<div class="radio-row">${options.map(([value, label]) => `<label><input type="radio" name="${name}" value="${value}" ${value === selected ? "checked" : ""} ${disabled}> ${label}</label>`).join("")}</div>`;
}

export function imageUpload(id, value, disabled, tierIndex = "", tierField = "") {
  const fileName = value ? value.split("/").pop() : "";
  const tierMeta = tierField ? ` data-tier-image-index="${tierIndex}" data-tier-image-field="${tierField}"` : "";
  return `<div class="image-upload-control"><label class="image-upload-box ${value ? "has-image" : ""}" data-image-box="${id}"><input type="file" accept="image/*" data-image-file="${id}"${tierMeta} ${disabled}><span class="image-upload-icon">${value ? "✓" : "＋"}</span><span data-image-label="${id}">${value ? "已上传" : "上传图片"}</span><small data-image-name="${id}">${fileName}</small></label><input type="hidden" id="${id}" value="${value}">${disabled ? "" : `<button type="button" class="btn btn-text danger" data-clear-image="${id}"${tierMeta}>移除</button>`}</div>`;
}

export function toast(message, error = false) {
  const host = document.querySelector("#toast");
  host.textContent = message;
  host.className = `toast show${error ? " error" : ""}`;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => { host.className = "toast"; }, 2200);
}

export function nowText() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}
