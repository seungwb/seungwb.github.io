
%% DATAVIEW_PUBLISHER: start
```dataviewjs
// 웹 환경인지 판단 (Obsidian에서는 app 객체가 존재함)
const isWebExport = typeof app === "undefined";

// 파일 경로를 웹 export용으로 변환
function convertToExportPath(originalPath) {
  return originalPath
    .replace(".md", ".html")
    .split("/")
    .map(segment =>
      segment
        .trim()
        .replace(/\s*-\s*/g, "-")         // " - " → "-"
        .replace(/\s+/g, "-")             // 공백 → 하이픈
        .replace(/-+/g, "-")              // 중복 하이픈 → 한 개
    )
    .join("/");
}

// 카드 생성 함수
function createCard(name, path) {
  // 웹에서는 변환된 경로로, Obsidian에서는 원본 경로로
  const href = isWebExport ? convertToExportPath(path) :  convertToExportPath(path);

  const card = document.createElement("a");
  card.href = href;

  // 웹에선 같은 탭에서 열기 (필요하면 target="_blank"로 변경 가능)
  if (isWebExport) card.target = "_self";

  card.style.textDecoration = "none";
  card.style.color = "inherit";
  card.style.width = "250px";
  card.style.borderRadius = "8px";
  card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  card.style.margin = "10px";
  card.style.display = "inline-block";
  card.style.overflow = "hidden";
  card.style.backgroundColor = "var(--background-primary)";
  card.style.border = "1px solid var(--background-modifier-border)";
  card.style.cursor = "pointer";

  const header = document.createElement("div");
  header.style.padding = "12px 16px";
  header.style.fontWeight = "bold";
  header.style.fontSize = "1.1em";
  header.style.borderBottom = "1px solid var(--background-modifier-border)";
  header.style.backgroundColor = "var(--interactive-accent)";
  header.style.color = "var(--text-on-accent)";
  header.innerText = name;

  const body = document.createElement("div");
  body.style.padding = "16px";
  body.innerHTML = `📁 ${path}`;

  card.appendChild(header);
  card.appendChild(body);

  // Obsidian 내부에서는 직접 열기
  if (!isWebExport) {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      app.workspace.openLinkText(path, "", false);
    });
  }

  return card;
}

// 섹션 출력 함수
function renderSection(title, pages) {
  dv.header(3, title);

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";

  pages.forEach(page => {
    const card = createCard(page.file.name, page.file.path);
    container.appendChild(card);
  });

  dv.el("div", container);
}

// 각 섹션 실행
dv.header(2, "공부 정리")
dv.el("hr");

renderSection("Java", dv.pages("#JavaStudy"));
renderSection("Spring", dv.pages("#SpringStudy"));
renderSection("기타", dv.pages("#ETCStudy"));
renderSection("프로젝트 중 공부한 것들", dv.pages("#PJTStudy"));

dv.el("hr");
dv.header(2, "개인 프로젝트")
dv.el("hr");

renderSection("", dv.pages("#PersonalPJT"));

dv.el("hr");
dv.header(2, "프로젝트 별 이슈 정리")
dv.el("hr");

renderSection("", dv.pages("#Issue"));
```
%%
%% DATAVIEW_PUBLISHER: end %%

