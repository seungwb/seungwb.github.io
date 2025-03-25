---
tags:
  - "#PJTStudyTodo"
---

### JWT 란?

- JWT는 "JSON Web Token"의 약자이다
- 웹 어플리케이션에서 사용자 인증 및 정보 교환을 위해 사용되는 **토큰 기반 인증 방법**이다
- 기본적으로 서명되었지만 암호화되지 않았기 떄문에, 공개되어서는 안될 정보가 포함되어야 할 경우 JWE (JSON Web Encrytion) 방식으로 암호화 하여야 한다. 

### 장점

- Stateless 인증
	- 서버에서 클라이언트의 인증 정보를 저장할 필요 없이, 토큰 자체가 모든 정보를 포함
- Self-Contained 구조
	- 토큰 안에 사용자 정보, 유효 기간, 권한 정보 등이 포함되어 별도의 DB 조회 없이 검증 가능
- 유연한 확장성
- 보안성
- CORS 문제 해결
	- 브라우저와 백엔드 간 쿠키 기반 인증과 달리, 헤더에 포함되어 전송되므로 CORS 이슈가 적음

### 단점

- Payload 노출 가능성 O
	- BASE64로 인코딩된 정보는 쉽게 디코딩 가능
- 토큰 크기가 큰 문제
- 만료 후 즉시 폐기가 어려운 문제
- 서버에서 토큰 관리가 어려운 문제제

### JWT 구조

```
xxxxxx.yyyyyy.zzzzzz

Header.Payload.Signature
```

- JWT는 Header, Payload, Signature 로 구성되어 있다. 

##### 헤더 (Header)

```javascript
{ 
	"alg": "HS256", 
	"typ": "JWT" 
}
```

- Header는 두 가지 타입의 정보를 가지고 있다.
	- `alg` : Signature 해싱 알고리즘
	- `typ` : 토큰의 타입

##### 정보 (Payload)


```javascript
{
    "iss": "dnjscksdn98.com",
    "exp": "1485270000000",
    "https://dnjscksdn98.com/jwt_claims/is_admin": true,
    "userId": "dnjscksdn98",
    "username": "alex"
}
```

- Payload에는 토큰에 담을 정보가 들어있다.
- 이곳에 담는 정보의 조각을 클레임 (Claim) 이라고 부르고, Key/ Value 형식으로 이루어져 있다.
- 클레임의 종류는 Registered claims, Public claims, Private claims 로 나뉜다.
	-  등록된 클레임 ( Registered claims )
		- 등록된 클레임들은 토큰에 대한 정보들을 담기위하여 이름이 이미 정해진 클레임들이다. 필수는 아니지만, 권장되어 진다.
			- iss : 토큰을 발급한 주체(서버 또는 시스템) 의 식별자
			- sub : 토큰이 인증하는 주체 (사용자 또는 서비스)
			- aud : 토큰이 사용될 대상 시스템 또는 수신자
			- exp : 토큰 만료 시간
			- nbf : 토큰 활성 시작 시간
			- iat : 토큰 발급 시간
			- jti : 토큰 중복사용 방지를 위한 고유한 식별자 
	-  공개 클레임 ( Public claims )
		- 다른 개발자나 서비스와의 충돌을 방지하기 위해 [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) 에 등록된 클레임을 사용하여야 한다.
		- 공개 클레임에는 누구나 읽을 수 있는 정보가 포함되므로 공개되면 안되는 정보(비밀번호, 계좌 번호 등)는 포함하면 안된다.
	-  비공개 클레임 ( Rpivate claims )
		- 비공개 클레임은 개인이나 특정 조직에서 내부적으로 정의하는 클레임이다.

##### 서명 (Signature)

- Signature 는 토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드이다.
- 위에서 만든 헤더(Header)와 정보(Payload)의 값을 각각 BASE64로 인코딩하고, 인코딩한 값을 비밀 키를 이용해 헤더(Header)에서 정의한 알고리즘으로 해싱하고, 이 값을 다시 BASE64로 인코딩하여 생성한다.

### Springboot에 적용

##### 0. 의존성 주입 (gradle)
```javascript
implementation 'io.jsonwebtoken:jjwt-api:0.12.6'  
runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.6'  
runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.6'
```

##### 1. JwtProvider.java

```java
public class JwtProvider {  
  
    private SecretKey secretKey = Jwts.SIG.HS256.key().build();  
  
    //JWT 생성 메서드  
    public String create(String email){  
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); //현재시간에서 1시간 추가  
  
        String jwt = Jwts.builder()  
                .signWith(secretKey)        //암호화 알고리즘  
                .subject(email)             //사용자 식별자 값  
                .issuedAt(new Date())       //생성 시간  
                .expiration(expiredDate)    //만료 시간  
                .compact();                 //압축하여 객체 생성  
  
        return jwt;  
    }  
  
    //JWT 검증 메서드  
    public String validate(String jwt){  
        Claims claims = null;  
  
        try{  
            claims = Jwts.parser().verifyWith(secretKey)    //서명 검즘  
                    .build()                                //빌드  
                    .parseSignedClaims(jwt)                 //JWT 파싱  
                    .getPayload();                          //Claims 추출  
  
        } catch (JwtException e){  
            e.printStackTrace();  
            return null;  
        }  
  
        return claims.getSubject();  
    }  
}
```

##### 2. JwtAuthenticationFilter.java
```java
@Component  
@RequiredArgsConstructor  
public class JwtAuthenticationFilter extends OncePerRequestFilter {  
  
    private final JwtProvider jwtProvider;  
  
    @Override  
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)  
            throws ServletException, IOException {  
  
        try{  
            String token = parseBearerToken(request);  
  
            if(token == null){  
                filterChain.doFilter(request, response);  
                return;  
            }  
  
            String email = jwtProvider.validate(token);  
  
            if(email == null){  
                filterChain.doFilter(request, response);  
                return;  
            }  
  
            AbstractAuthenticationToken authenticationToken =  
                    new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);  
  
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //인증요청에 대한 세부정보 구축  
  
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();  
            securityContext.setAuthentication(authenticationToken);  
  
            SecurityContextHolder.setContext(securityContext);  
        } catch (Exception e){  
            e.printStackTrace();  
        }  
  
        filterChain.doFilter(request, response);  
  
    }  
  
    private String parseBearerToken(HttpServletRequest request){  
  
        String authorization = request.getHeader("Authorization");  
  
        boolean hasAuthorization = StringUtils.hasText(authorization);  
        if(!hasAuthorization)  
            return null;  
        boolean isBearer = authorization.startsWith("Bearer ");  
        if (!isBearer)  
            return null;  
  
        return authorization.substring(7);  
    }  
}
```

##### 3. WebSecurityConfig.java
```java
public class WebSecurityConfig {  
  
    private final JwtAuthenticationFilter jwtAuthenticationFilter;  
  
    @Bean  
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception{  
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  
  
        return httpSecurity.build();  
    }  
}
```