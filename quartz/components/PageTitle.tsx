import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title-wrapper")}>
    {/* 이미지에 링크 추가 */}
    <a href="https://github.com/seungwb" target="_blank" rel="noopener noreferrer">
      <img src="/static/gorapaduck.png" alt="깃허브 링크" class="profile-img" />
    </a>
    <h2 class="page-title">
      <a href={baseDir}>{title}</a>
    </h2>
  </div>
  )
}

PageTitle.css = `
.page-title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.page-title {
  font-size: 1.65rem;
  margin: 0;
  font-family: var(--titleFont);
}

.profile-img {
  width: 144px;
  height: 144px;
  border-radius: 9999px;
  transition: transform 0.2s ease;
}
@media (max-width: 800px) {
  .profile-img {
    display: none;
  }
}
.profile-img:hover {
  transform: scale(1.05);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
