---
tags:
  - GinongIssueBack
  - "#Java"
  - "#mybatis"
---

![](https://i.imgur.com/4CXNy5h.png)

잘되던 detail 페이지가 뭐 건드리지도 않았는데 갑자기 매퍼파일에서 맵핑이 되지않아 에러가 뜸.

import가 잘못됐나 확인해보았지만 이상이 없어고.. 해결법은 찾았지만 그 이유가 너무나 허무했다.
![](https://i.imgur.com/NKT7m3r.png)

조장님이 Mapper파일이 너무 많아 /mappers 안에 있던 mapper파일들을 그 기능에 맞게 분류 해두셨는데 

```
mybatis:  
  configuration:  
    map-underscore-to-camel-case: true  
  mapper-locations: mappers/*Mapper.xml  
  type-aliases-package: kr.co.ginong.web.entity.*
```

우리의 mybatis 설정은 mappers 상위에 mapper파일들을 지정해뒀는데 중간에 기능별 경로가 생겨 읽어 줄수 없었던것이다...

```
mybatis:  
  configuration:  
    map-underscore-to-camel-case: true  
  mapper-locations: mappers/*/*Mapper.xml  
  type-aliases-package: kr.co.ginong.web.entity.*

```

중간 경로를 추가해줘서 해결