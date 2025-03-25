---
tags:
  - "#TodoIssueBack"
  - "#anotation"
  - "#postman"
  - "#csrf"
  - "#401에러"
---

### 문제 발생

- 회원가입을 구현하는 과정에서 백단을 구현 후 postman을 이용하여 post 요청을 하려는데 401 에러가 터졌다.
![](https://imgur.com/XiaItPJ.png)

### 해결 과정
- Controller 에는 request 값이 들어오나 확인하기 위해 출력문구를 넣어보았으나 출력 문구가 나오지 않는 걸로보아 그전 Filter에서 막혀 Controller 까지 오지도 못하는 것 같았다.
- 401 에러는 인증관련 문제이므로 어떤 문제점이 있는지 알기 위해 `application.propoerties` 에 `logging.level.org.springframework.security = DEBUG` 을 추가하여 어떤 문제점이 있는지 확인해 보았다.
![](https://imgur.com/XuOnCzO.png)

- csrf 관련 에러가 터졌는데 이미 disable 해놨는데 왜 이런 문제가 생겼는지 이해가 안갔다.
```java
@Bean  
protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception{  
    httpSecurity  
            .cors(Customizer.withDefaults())            //기본 cors설정 사용  
            .csrf(AbstractHttpConfigurer::disable)  
            .httpBasic(AbstractHttpConfigurer::disable)  
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  
            .authorizeHttpRequests(auth -> auth  
            .requestMatchers("/", "/api/auth/**", "/api/search/**").permitAll()  
            .requestMatchers(HttpMethod.GET, "/api/calendar/**").permitAll()  
            .anyRequest().authenticated()  
            ).exceptionHandling(handler -> handler.authenticationEntryPoint(new FailedAuthenticationEntryPoint()));  
  
    httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  
  
    return httpSecurity.build();  
}
```

### 결론

- `@Configuration` 어노테이션을 사용하여 Spring이 설정 클래스로 인식하게 했어야 했으나 `@Configurable` 어노테이션이 사용되어 있었다.. 자동완성으로 코딩하다가 이 부분을 놓친 것 같다.
- 자동완성이 편리하긴 하지만 자동으로 되는 것들에 대해 내가 원하는 것이 맞는지 한번 더 확인하는 습관을 길러야겠다고 생각했다.