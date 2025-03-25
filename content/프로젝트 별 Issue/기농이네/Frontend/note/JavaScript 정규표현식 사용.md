---
tags:
  - "#GinongIssueFront"
  - "#Javascript"
  - "#정규식"
---

이메일 인증 구현 중 옳바른 이메일 형식이 아닐 시 alert로 유효한 이메일이 아니라는 알람을 띄우기 위해 작업하기 위해 정규표현식을 사용하여 구현하려 아래와 같은 코드를 짬.
```js
let email = emailSend.querySelector('input[name="mail"]').value;  
//이메일 주소 유효성 검증  
if(email!== /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/){  
    alert("유효한 이메일 형식이 아닙니다.");  
}  
else
{
...유효한 이메일 일시 검증번호를 사용자 이메일로 보내는 로직
}
```

@를 뺀 이메일 주소를 넣었을 시 생각대로 alert가 떠줬지만 @을 입력한 옳바른 주소를 입력했음에도 alert가 떠서 gpt를 통해 물어보니 아래와 같은 코드를 추천해 주었다.

```js
let email = emailSend.querySelector('input[name="mail"]').value; 
// 이메일 주소 유효성 검증 
if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) { 
	alert("유효한 이메일 형식이 아닙니다."); 
}
```

!== 가 아닌 test 메소드를 이용해 비교를 하는 것을 보고 무엇인지 알아보기 위해 mdn을 참고하였다.


![](https://i.imgur.com/7WKrGfh.png)


```js
const str = "hello world!";
const result = /^hello/.test(str);

console.log(result); // true
```

위와 같이 // 안에 정규표현식을 담고 비교해야 정상적으로 비교 가능하다. 