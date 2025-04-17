---
tags:
  - TVET-Vue
  - ES6문법
  - Vue문법
---
## 모듈 번들러
---
>여러 개의 JS, CSS, 이미지 파일 등을 하나 또는 여러 개의 번들 파일로 합쳐주는 도구 JS 최신 문법이나 TypeScript 같은 것은 브라우저에서 작동을 안하여 해당 파일의 **코드 변환** 역할도 해준다.

### Webpack

- **구성**: 설정 파일(`webpack.config.js`)로 세세하게 설정함.
- **기능**: 번들링, 코드 스플리팅, 로더(loader)로 파일 처리, 플러그인으로 기능 확장 등.    
- **장점**: 유연하고 확장성이 좋음.
- **단점**: 설정이 복잡하고 초기 러닝 커브가 있음.

### Vite

- **구성**: 설정이 간단 (`vite.config.js`)
- **기능**: 개발 서버가 빠름(HMR, 모듈 캐싱), 기본적으로 ESM 사용.
- **기술스택**: Rollup 기반으로 빌드, 개발 중엔 native ESM으로 빠르게 실행됨.
- **장점**: 빠른 빌드, 빠른 개발 환경, 설정이 직관적.
- **단점**: 아주 특이한 커스텀은 Webpack보다 불편할 수 있음.
## ES 6 문법
---

### 변수 선언

- **`let`**: 재할당 가능. 블록 스코프를 가짐.
- **`const`**: 재할당 불가. 블록 스코프를 가짐. 단, 객체나 배열의 **내용 변경은 가능**.
```javascript
let a = 1;

a = 2; //재할당 가능

const b = 1;

// b = 2; //재할당 불가능
```

### 템플릿 리터럴

- **백틱(\`\`)을 사용하여 문자열을 작성.
- `${}` 문법을 통해 **변수를 문자열 안에 삽입** 가능.
- 문자열 내 **줄바꿈, 표현식 삽입**이 용이함.
```javascript
const literal = "백승우";

console.log(`안녕하세요. 제이름은 ${literal} 입니다.`);
```

### 화살표 함수 (Arrow Function)

- `function` 키워드 대신 **간결한 함수 표현식** 제공.
- `return` 키워드 없이 한 줄로 결과 반환 가능 (중괄호 `{}` 없이 쓸 때).
- `this` 바인딩이 기존 함수와 달라서 **콜백 함수나 메서드 내에서 자주 사용됨**.

```javascript
const es5Fuction = function(){
    return;
}

const es6Function = (a, b) =>{
    return a + b;
}

const es6Function2 = (a, b) => a + b;       // return을 해야 할 때
console.log(es6Function2(1,2));             // 결과값: 3

const es6Function3 = (a, b) => {a + b};     // return을 하면 안될 때
console.log(es6Function3(1,2));             // 결과값: undefined
```

### 구조 분해 할당

- 객체나 배열의 값을 **개별 변수로 쉽게 분리해 할당**할 수 있는 문법.
- 객체의 키나 배열의 인덱스를 기준으로 값 추출.
- 나머지 값을 받을 때 **rest 문법(`...`)** 사용 가능.

```javascript
const objectTest = {이름: "백승우", 집: "인천", 학력: "대학"}

const {이름, 나이, 집, 학력} = objectTest;

console.log(`안녕하세요 제 이름은 ${이름} 이고요, 집은 ${집}이고, 최종학력은 ${학력}입니다.`);

const list = [1, 2, 3, 4, 5, 6, 7];

const [el1, el2, el3, ...others] = list;

console.log(el1, el2, el3);                      //결과값 1, 2, 3 

console.log(others[0]);                          //결과값 4
```

### Spread operator

- 배열이나 객체의 값을 **복사 또는 병합**할 때 사용.
- **얕은 복사**를 수행하며, 새로운 참조를 생성함.
- 객체나 배열을 **확장하거나 덮어쓸 때 유용**함.

```javascript
const spreadObject = {...objectTest};

objectTest.키 = 170;

console.log(objectTest);
console.log(spreadObject);          //새로운 객체를 만드는 느낌이라 objectTest와 참조값이 다르다.
```

### `foreach`, `map`을 이용한 for방식

- **`forEach`**: 배열을 순회하며 작업을 수행. 반환값 없음. **원본 배열 변경 시 사용**.
- **`map`**: 배열을 순회하고 **새로운 배열을 생성하여 반환**. 원본 배열은 변경되지 않음.

```javascript
let arr = [1, 2, 3, 4];
// 배열의 요소를 순회하면서 작업을 수행, return 없음, 원본 배열을 변경 할 때 사용
arr.forEach((value, index, array) =>{
    array[index] = value * 2;
})

console.log(arr);

let arr2 = [9, 8, 7, 6];

let newArr = arr2.map((value) => value * 2);

console.log("map", newArr);
```

## Vue options, composition
---

>Vue 는 options api, composition api 두가지 종류가 있다.

#### Options API vs Composition API 핵심 비교

|항목|Options API|Composition API|
|---|---|---|
|선언 방식|`data()`, `methods`, `computed` 등 옵션을 나눠서 선언|`setup()` 안에서 함수와 변수로 한 번에 구성|
|코드 구조|역할별로 코드가 나눠짐|기능 단위로 코드가 묶임|
|재사용성|mixin 사용 (복잡도↑)|함수로 추출 (`composables`)해서 재사용 쉬움|
|타입 지원|TypeScript 대응이 다소 불편함|TypeScript에 최적화되어 있음|
|학습 난이도|Vue 초보자에게 친숙|JS 문법 이해도가 요구됨 (reactive, ref 등)|
|사용 위치|Vue 2.x, Vue 3에서도 여전히 사용 가능|Vue 3부터 새로 도입된 방식|
|실무 사용|빠른 페이지 제작, 단순 컴포넌트|대규모 기능, 로직 분리, 복잡한 컴포넌트|

## Vue의 Life Cycle
---
>Vue의 생명 주기는 Vue 2 (Options API)와 Vue 3 (Composition API) 에 따라 다르다.

###  Vue 2 (Options API) Life Cycle 순서

#### 1. 생성 관련
- **`beforeCreate`**
    - data, methods, computed 등 아직 세팅되지 않음.
- **`created`**
    - data, methods 사용 가능. DOM에는 접근 불가.
#### 2. 마운트 관련
- **`beforeMount`**
    - DOM에 붙기 직전. 가상 DOM이 만들어진 상태.
- **`mounted`**
    - 실제 DOM에 마운트 완료. DOM 접근 가능.
    - 보통 **초기 API 호출**이나 **3rd-party 라이브러리 초기화**는 여기서.

#### 3. 업데이트 관련
- **`beforeUpdate`**
    - reactive data가 변경되어 DOM 업데이트 직전.
- **`updated`**
    - DOM이 변경된 이후. **실제 화면 갱신 후 작업 가능**.

#### 4. 제거 관련
- **`beforeDestroy`**
    - 컴포넌트 제거 직전. 이벤트 리스너 정리 등 정리 작업.
- **`destroyed`**
    - 컴포넌트 완전 제거 완료.

###  Vue 3 (Composition API) Life Cycle 순서
>Composition API에서는 라이프사이클 훅을 함수로 가져와서 사용한다, Composition API에서는 **setup() 안에서 라이프 사이클 훅 함수를 직접 호출**해서 사용하는 구조로 바뀌었다.

```javascript
import { onMounted, onBeforeMount, onUnmounted } from 'vue';
export default {
  setup() {
    onMounted(() => {
      // DOM 접근 가능
    });
    onUnmounted(() => {
      // 컴포넌트가 제거될 때 정리 작업
    });
  }
}
```

## Vue 주요 문법
---
### 1. `ref`

- **반응형 변수 선언**할 때 사용 (Composition API에서 핵심).
- DOM 요소나 기본형 값에 쓰이며 `.value`로 접근.

```js
import { ref } from 'vue';
const count = ref(0);
count.value++;
```

### 2. `@click`

- **이벤트 바인딩**. 클릭 이벤트 처리할 때 사용.

```html
<button @click="handleClick">클릭</button>
```

### 3. `v-model`

- 양방향 바인딩. **input, textarea, select 등과 함께 사용**.
- 입력값과 변수의 값을 자동으로 동기화.

```html
<input v-model="name" />
```

### 4. `v-model.lazy`

- 기본은 input 이벤트에 반응하지만, **lazy는 change 이벤트에 반응**. 즉, 포커스를 벗어나야 값 변경.

```html
<input v-model.lazy="name" />
```

### 5. `watch`

- 특정 변수의 변화를 감지해서 **반응형으로 처리하는 함수**.
- 조건문, API 호출 등 **구체적 제어가 필요할 때 사용**.

```js
watch(count, (newVal, oldVal) => {
  console.log('변화 감지됨:', newVal);
});
```

### 6. `watchEffect`

- **종속된 반응형 변수를 자동 추적**해서 실행.
- 어떤 변수를 감시할지 명시하지 않아도 됨.

```js
watchEffect(() => {
  console.log(`현재 count는 ${count.value}`);
});
```

### 7. `onMounted`

- 컴포넌트가 DOM에 마운트된 후 실행되는 훅.
- **초기 API 호출, DOM 접근 등은 여기서**.

```js
onMounted(() => {
  console.log("마운트됨");
});
```


### 8. `@change`

- change 이벤트에 반응. **선택값 변경, 포커스 아웃 시 사용**.

```html
<select @change="handleSelectChange"></select>
```

### 9. Props (부모 → 자식 전달)

- 부모 컴포넌트에서 **자식 컴포넌트에 데이터 전달**할 때 사용.

```html
<ChildComponent :message="parentMsg" />
```

```js
// 자식 컴포넌트
props: {
  message: String
}
```

### 10. `v-for`

- 배열 등을 반복 렌더링할 때 사용. 반드시 `key` 속성 필요.

```html
<li v-for="item in items" :key="item.id">{{ item }}</li>
```

### 11. `v-bind`

- 속성 바인딩. JS 표현식 결과를 HTML 속성에 바인딩할 때 사용.

```html
<img v-bind:src="imgUrl" />
<!-- 축약형 -->
<img :src="imgUrl" />
```

### 12. `computed`

- 계산된 값을 반환. **의존하는 데이터가 바뀔 때만 다시 계산**됨.
- 값이 캐싱됨. 퍼포먼스 이점 있음.

```js
const double = computed(() => count.value * 2);

```

### 13. `$event.target`

- 이벤트 객체에서 **이벤트 발생한 요소**를 참조할 때 사용.
- 값 접근 시 `@input="onInput($event.target.value)"`

### 14. `v-if`

- 조건부 렌더링. 조건이 false이면 DOM에서 완전히 제거됨.

```html
<p v-if="isVisible">보임</p>
```
