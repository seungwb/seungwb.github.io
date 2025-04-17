---
tags:
  - TVET-Vue-Issue-Front
  - pinia
  - 싱글톤패턴
---
## 문제 발생

---

- login 페이지 작업 중 회원 가입 모달 창 작업 후, 아이디/ 비밀번호 찾기 모달창 작업 하려고 했는데 모달창이 이상하게 작동했다.

## 해결 과정

---

- 모달 관리를 pinia를 이용하여 상태관리를 하고 있었는데 다음과 같이 사용하였다.

```js
/* modalState.js */
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalState', () => {

    const modalState = ref(false);
    
    const setModalState = () => {
        modalState.value = !modalState.value;
    };
    return { modalState, setModalState };
});
```

```vue
<!-- LoginMain.vue -->
<script setup>
import { useModalStore } from '../../../stores/modalState';

const modalState = useModalStore();
const modalState2 = useModalStore();
const modalState3 = useModalStore();
</script>

<template>
<div class="login-container">

	<SignUpModal 
	v-if="modalState.setModalState()" />
	<FindInfoModal
	v-if="modalState.setModalState()"
	/>
	<ChangeInfoModal 
	v-if="modalState.setModalState()"
	/>
</div>
</template>
```

- pinia를 처음 써보았는데 함수를 새로 선언하면 다른 값을 참조하여 각각의 모달창이 열리는 줄 알았지만 이는 잘못된 생각이였다. 결국은 같은 것을 참조하여 실행하면 서로 엉키게 된다.
- 그 이유는 Pinia **스토어는 싱글톤**이므로 새 변수에 할당해도 동일 인스턴스 참조하게 된다.
- 밑에 똑같은 코드를 추가해 모달의 개수를 늘릴 수 있었겠지만 AI의 도움을 받아 좀더 생산성 좋은 코드로 바꾸면서 가독성 좋게 바꾸도록 아래와 같은 상태관리를 만들었다.

```js
export const useModalStore = defineStore('modalStore', () => {
  
  const modals = reactive({});
  const open = (name) => {
    modals[name] = true;
  };
  
  const close = (name) => {
    modals[name] = false;
  };

  const toggle = (name) => {
    modals[name] = !modals[name];
  };

  const isOpen = (name) => {
    return !!modals[name];
  };
  return { modals, open, close, toggle, isOpen };
});
```

- 각각에 key를 넣어 그 key에 해당하는 모달창을 그때 그때 만들어서 사용 가능하다.

## 결론

---

```vue
<script setup>
import { useModalStore } from '../../../stores/modalStore';

const modalStore = useModalStore();

</script>

<template>
<div class="login-container">

	<SignUpModal 
	v-if="modalStore.isOpen('signUp')" />
	<FindInfoModal
	v-if="modalStore.isOpen('findInfo')"/>
	<ChangeInfoModal 
	v-if="modalStore.isOpen('changeInfo')"/>
</div>
</template>
```




## 📌 싱글톤 패턴이란?
### 1. **싱글톤 패턴의 핵심**

>싱글톤 패턴은 **클래스의 인스턴스를 하나만 생성**하고, 이를 전역에서 공유하는 디자인 패턴이다.

- **목적**: 메모리 효율성 ↑, 데이터 일관성 유지, 전역 접근 용이성
- **적합한 사례**: 데이터베이스 연결 풀, 설정 관리, 로깅 시스템 등

### 2. **Pinia에서의 싱글톤 활용**

Pinia 스토어는 기본적으로 **싱글톤 인스턴스**로 동작한다.

```js
// stores/modalStore.js
export const useModalStore = defineStore('modalStore', () => {
  const modals = reactive({});  // 모든 모달 상태를 단일 객체로 관리
  return { modals, isOpen: (name) => !!modals[name] };
});

```

- **동작 원리**: `useModalStore()` 호출 시 동일 인스턴스 반환 → 컴포넌트 간 상태 공유 가능
- **장점**: 중앙 집중식 관리로 코드 간결성 ↑, 상태 동기화 용이

### 3. **초기 코드 문제점 vs 개선 코드**

|구분|초기 코드|개선 코드|
|---|---|---|
|**상태 관리**|단일 `boolean` 값 공유|`reactive({})`로 모달별 상태 분리|
|**확장성**|모달 추가 시 코드 수정 필요|키 기반으로 유연한 확장 가능|
|**가독성**|`setModalState()`의 모호한 역할|`isOpen('key')`로 의도 명확화|

### 4. **싱글톤 패턴의 주의사항**

1. **동시성 문제**:
    - 멀티스레드 환경에서 동시 접근 시 데이터 불일치 가능 → Pinia는 Vue의 반응성 시스템으로 자동 처리
2. **테스트 어려움**:
    - 전역 상태는 테스트 간 간섭을 유발 → Pinia에서는 테스트마다 새 스토어 생성 권장
3. **과도한 사용**:
    - 모든 상태를 싱글톤으로 관리하면 복잡성 ↑ → **로컬 상태**와 적절히 분리 필요
