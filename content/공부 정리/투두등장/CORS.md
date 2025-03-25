---
tags:
  - "#PJTStudyTodo"
---

### CORS 란?
- Cross-Origin Resource Sharing 의 약자로 다른 도메인 간의 리소스 요청을 허용하거나 차단하는 **보안 정책**이다.
- 웹 브라우저는 기본적으로 동일 출처 정책 (Same-Origin Policy)을 적용해서 다른 도메인에서 온 요청을 차단한다. 그래서 **API 서버와 프론트엔드가 다른 도메인에서 운영되는 경우**, CORS를 설정해서 이를 허용해야 한다.

### Springboot에 적용

##### 1. CorsConfig.java

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청에 대해 CORS 허용
                .allowedOrigins("http://localhost:3000") // 허용할 도메인
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                .allowedHeaders("*"); // 모든 헤더 허용
    }
}

```

##### 2. WebSecurityConfig.java

```java
@Configurable  
@EnableWebSecurity  
@RequiredArgsConstructor  
public class WebSecurityConfig {  
  
    private final JwtAuthenticationFilter jwtAuthenticationFilter;  
  
    @Bean  
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception{  
        httpSecurity  
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 적용 
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화 (필요한 경우)
                .httpBasic(AbstractHttpConfigurer::disable)  
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  
                .authorizeHttpRequests(auth -> auth  
                .requestMatchers("/", "/api/v1/auth/**", "/api/v1/search/**").permitAll()  
                .requestMatchers(HttpMethod.GET, "/api/v1/board/**").permitAll()  
                .anyRequest().authenticated()  
                ).exceptionHandling(handler -> handler.authenticationEntryPoint(new FailedAuthenticationEntryPoint()));  
  
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  
  
        return httpSecurity.build();  
    }  
}  

	@Bean 
	public CorsConfigurationSource corsConfigurationSource() { 
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000")); // 허용할 도메인 
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); 
		configuration.setAllowedHeaders(List.of("*")); 
		configuration.setAllowCredentials(true); // 인증 정보 허용 
		UrlBasedCorsConfigurationSource source = new 
		UrlBasedCorsConfigurationSource(); source.registerCorsConfiguration("/**", configuration); 
		return source; 
	}
  
class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {  
  
    @Override  
    public void commence(HttpServletRequest request, HttpServletResponse response,  
                         AuthenticationException authException) throws IOException, ServletException {  
  
        response.setContentType("application/json");  
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);  
        response.getWriter().write("{\"FORBIDDEN ERROR\"}");  
    }  
}
```

- 만약 CORS 설정을 직접 설정하지 않고 기본 설정을 사용하고 싶다면 `http.cors(Customizer.withDefaults())` 하면 된다.