---
tags:
  - TodoIssue_front
---
---

## 문제 발생

---

![](https://imgur.com/tDvORIw.png)

- API 요청을 모두 두 번씩 하는 버그를 발견하였다.

## 해결 과정

---

- 우선 코드를 전체적으로 살펴보았지만, 마운트 시 한번 실행하도록 `useEffect`를 사용 하였기 때문에 문제가 없어보였지만 여전히 두번의 API 요청을 하고 있었다.

```jsx
useEffect(() => {  
    fetchWeatherEvents()  
    fetchTodayEvents()  
    fetchWeeklyEvents()  
    fetchTodoEvents()  
}, [])
```

## 결론

---

- AI에 문제에 대해 설명하고 원인을 알 수 있었다. 원인은 로컬에서 실행하는 경우 마운트 -> 언마운트 -> 리마운트 형식으로 작동하여 2번의 API 요청을 보내는 것이였다. 