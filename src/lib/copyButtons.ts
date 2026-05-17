export const attachCopyButtons = (container: HTMLElement): void => {
  container.querySelectorAll<HTMLPreElement>("pre").forEach((pre) => {
    if (pre.querySelector(".copy-btn")) return;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";

    btn.addEventListener("click", () => {
      const text = (pre.querySelector("code")?.textContent ?? pre.textContent ?? "").replace(/\n+$/, "");
      navigator.clipboard
        .writeText(text)
        .then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 2000);
        })
        .catch(() => {
          btn.textContent = "Failed";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 2000);
        });
    });

    pre.appendChild(btn);
  });
};
