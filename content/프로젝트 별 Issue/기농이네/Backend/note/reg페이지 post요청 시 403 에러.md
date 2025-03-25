---
tags:
  - GinongIssueBack
  - "#Java"
  - "#html"
  - "#Spring"
  - "#Security"
---


![](https://i.imgur.com/dOsB4xw.png)
post요청으로 값이 전부 올바르게 들어갔음에도 403 에러가 발생했음.
![](https://i.imgur.com/XVJmtQS.png)


Chat GPT 에게 물어봐서 차례대로 문제해결 해보기로 했다.
```java
package kr.co.ginong.web.config;  
  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.security.config.annotation.web.builders.HttpSecurity;  
import org.springframework.security.web.SecurityFilterChain;  
  
@Configuration  
public class WebSecurityConfig {  
    @Bean  
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {  
  
       http   
       .csrf(csrf->csrf.disable()) 
       .authorizeHttpRequests((requests) -> requests  
       .anyRequest().permitAll()  
       );  
  
       return http.build();  
    }  
}
```

개발중이라 권한은 모두 풀어놓은 상태라 문제가 없어보인다. 1,2 번 제외하고 3번으로 넘어가자.
![](https://i.imgur.com/sTTbUBz.png)

아직 csrf는 안 배웠고 따로 설정을 하지 않아서 post요청에 csrf토큰이 포함되지 않아 에러가 난거 같아 Rland 실습 중에 임의로 세팅 해놓은 코드를 확인해보았다.
```java
http  
.csrf(csrf->csrf.disable())  
       .authorizeHttpRequests((requests) -> requests  
    .requestMatchers("/member/**").hasAnyRole("MEMBER","ADMIN")  
    .requestMatchers("/admin/**").hasRole("ADMIN")  
    .anyRequest().permitAll()  
       )
```

.csrf(csrf->csrf.disable())  로 개발중에 post요청 시 csrf토큰 필요 유무를 disable로 한 후 다시 post요청하니 정상 작동하였다

```java
package kr.co.ginong.web.config;  
  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.security.config.annotation.web.builders.HttpSecurity;  
import org.springframework.security.web.SecurityFilterChain;  
  
@Configuration  
public class WebSecurityConfig {  
    @Bean  
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {  
  
       http   
       .csrf(csrf->csrf.disable()) 
       .authorizeHttpRequests((requests) -> requests  
       .anyRequest().permitAll()  
       );  
  
       return http.build();  
    }  
}
```
최종코드