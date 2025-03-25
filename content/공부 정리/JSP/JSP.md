---
tags:
  - "#ETCStudy"
content:
---


```dataviewjs
const currentFile = dv.current();
const currentFilePath = currentFile.file.path;
const currentFolder = currentFile.file.folder;
const currentFolderName = currentFolder.split('/').pop();

const isWebExport = typeof app === "undefined";

const files = dv.pages(`"${currentFolder}"`)
  .where(p => p.file.name != currentFolderName)
  .sort(p => p.file.name);

let html = '<table class="dataview table-view-table">';
html += '<thead><tr><th>목차</th><th>경로</th></tr></thead>';
html += '<tbody>';

files.forEach((page, index) => {
  const fileName = page.file.name;
  const filePath = page.file.path;

  // HTML 링크 대신 span으로 감싸고 클릭 이벤트 사용
  html += '<tr>';
  html += `<td><span class="file-link" data-path="${filePath}" style="color: var(--link-color); text-decoration: underline; cursor: pointer;">${fileName}</span></td>`;
  html += `<td>${filePath}</td>`;
  html += '</tr>';
});

html += '</tbody></table>';

dv.paragraph(html);

// Obsidian에서 링크 클릭 시 해당 노트 열기
if (!isWebExport) {
  const links = this.container.querySelectorAll(".file-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const path = e.target.getAttribute("data-path");
      app.workspace.openLinkText(path, "", false);
    });
  });
}
```