---
tags:
  - TVET-Spring-Issue-back
---
## 문제 발생

---

>### Error updating database. Cause: java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Integer 
>### The error may involve defaultParameterMap 
>### The error occurred while setting parameters 
>### Cause: java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Integer 
>에러 내용으로 봤을 때는 String 을 Integer로 변환 할 수 없다는 뜻인거 같다...
## 해결 과정

---

- 가장 의심되었던 부분은 데이터 타입이  int인 `room_personnel` 컬럼이였다.
- 데이터가 `Map<String, Object>`에 담겨 오고 있었지만 혹시나 중간에 바뀌었나 싶어서 `service`에서 값을 꺼낸 후 Integer로 형변환하여 다시 넣는 과정을 해보았지만 변하는 점은 없었다.
- 그 외에도 많은 시도가 있었지만 결론적으로는 `room_personnel` 컬럼의 문제가 아니였고 데이터 타입이 `VARCHAR`였던 `room_size` 컬럼이 문제였다.

```js
function classroomSave(){
		var param = {
				personnel: $("#roomPersonnel").val()
				, name: $("#roomName").val()
				, size: $("#roomSize").val()
				, note: $("#roomNote").val()
		}
		
		var callback = function(res){
			if(res.result === "success"){
				alert("저장되었습니다.");
				gfCloseModal();
				classroomSearch();
			}
		}
		
		callAjax("/system/classroomSave.do", "post", "json", false, param, callback);
		
	}

```

- 위와 같은 방법으로 param에 데이터를 담아 서버로 보내고 있었으나 `size`라는 키값은 숫자형으로 인식을 하는 무언가가 있는것 인지 이 부분이 계속 문제였던 것이다. 이 키값을 다른 값으로 바꾸니 정상적으로 작동하게 되었다.
## 결론

---

- AI에 질문해도 명확히 이유가 이거다 라고는 해주지 않지만, size 라는 키값만 바꾸면 정상 작동 하는거 보니 확실히 size 를 숫자형으로 인식 하는 것 같았다. 