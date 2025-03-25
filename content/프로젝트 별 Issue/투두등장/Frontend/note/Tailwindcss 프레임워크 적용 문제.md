---
tags:
  - "#TodoIssueFront"
  - "#tailwind"
---

- 이번 프로젝트는 Tailwind 사용해보기 위해 아래와 같이 명령어를 실행했다.
```sh
# Tailwind 설치
npm install -D tailwindcss

# 설정 파일 생성
npx tailwindcss init -p
```

- 하지만 `npx tailwindcss init -p ` 명령어 입력하니 'tailwind'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다. 라는 오류 메시지와 함께 설정 파일이 생성되지 않았다.
- `npx tailwindcss init -p` 이 명령어는 `node_modules/.bin`  경로에 있는 `tailwindcss.cmd` 파일을 실행하기 위함인데 해당 디렉토리에 가보니 `tailwindcss.cmd` 파일을 찾을 수 없었다.
- 재설치도 해보고 GPT 도움도 받아보고 했지만 모두 해결할 수 없어 Tailwindcss 공홈에 들어가 보았고 4.0버전부터 적용 방법이 바뀌었다는걸 알게되었다.


##### 1. 설치

```sh
npm install tailwindcss @tailwindcss/vite
```
- tailwindcss install, vite가 아닌 다른 걸 사용한다면 [tailwind 홈페이지 참조](https://tailwindcss.com/docs/installation/framework-guides)

##### 2. vite.config.ts 수정

```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({ 
	plugins: [ 
		tailwindcss(), 
	],
})
```
- `vite.config.ts` 의 코드를 위와 같이 수정

##### 3. CSS 파일에 import

```css
@import "tailwindcss";
```


- 엄한거 말고 공홈 레퍼런스를 확인해보도록 하자... 