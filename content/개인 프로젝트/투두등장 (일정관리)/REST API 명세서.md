---
dg-publish: true
---

## AUTH

### 로그인

#### URL
- POST : /api/auth/sign-in

#### Header

#### Request

| Name     | Type (front/ back) | Required | Description |
| -------- | ------------------ | -------- | ----------- |
| email    | string/ String     |          | 이메일         |
| password | string/ String     |          | 패스워드        |

#### Response

##### Success

| Name           | Type (front/ back) | Required | Description |
| -------------- | ------------------ | -------- | ----------- |
| code           | string/ String     |          | 코드          |
| message        | string/ String     |          | 메시지         |
| token          | string/ String     |          | JWT         |
| expirationTime | number/ int        |          | JWT 만료 시간   |
```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success",
	"token": "vlfdskjhfiweauhklsjdcflkdjshaiweliru",
	"expirationTime": 3600
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |
```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Http status - 401 (Unauthorized)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```
### 회원 가입

#### URL
- POST : /api/auth/sign-up

#### Header

#### Request
| Name     | Type (front/ back) | Required | Description |
| -------- | ------------------ | -------- | ----------- |
| email    | string/ String     |          | 이메일         |
| password | string/ String     |          | 비밀번호        |
| name     | string/ String     |          | 이름          |
| phone    | string/ String     |          | 전화번호        |


#### Response

##### Success
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |
```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success",
	"token": "vlfdskjhfiweauhklsjdcflkdjshaiweliru",
	"expirationTime": 3600
}
```
##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "DE",
	"message": "Duplicate email."
}
```

```
Https status - 400 (Bad Request)

{
	"code": "DP",
	"message": "Duplicate Phone."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

## Index

### 오늘의 날씨

#### URL
- GET : https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${WHETHER_API_KEY}&units=metric&lang=kr

#### Header

#### Request

#### Response

##### success
| Name       | Type (front/ back) | Required | Description    |
| ---------- | ------------------ | -------- | -------------- |
| coord      | Coord              | *        | 좌표 정보          |
| weather    | Weather[]          | *        | 날씨 상태 정보       |
| main       | Main               | *        | 기온 및 기압 정보     |
| visibility | number/ Integer    |          | 가시거리 (미터)      |
| wind       | Wind               | *        | 바람정보           |
| rain       | Rain               |          | 강수량 정보         |
| clouds     | Clouds             | *        | 구름 정보          |
| dt         | number/ Long       | *        | 데이터 업데이트 시간    |
| sys        | Sys                | *        | 국가 및 일출/ 일몰 정보 |
| timezone   | number/ Integer    | *        | 타입존            |
| id         | number/ Long       | *        | 도시 ID          |
| name       | string/ String     | *        | 도시 이름          |
| cod        | number/ Integer    | *        | HTTP 응답 코드     |


##### Coord

| Name | Type (front/ back) | Required | Description |
| ---- | ------------------ | -------- | ----------- |
| lon  | number/ Double     | *        | 경도          |
| lat  | number/ Double     | *        | 위도          |
##### Weather[]

| Name        | Type (front/ back) | Required | Description |
| ----------- | ------------------ | -------- | ----------- |
| id          | number/ Integer    | *        | 날씨 코드       |
| main        | string/ String     | *        | 날씨 상태       |
| description | string/ String     | *        | 상세 설명       |
| icon        | string/ String     | *        | 아이콘 코드      |
##### Main

| Name       | Type (front/ back) | Required | Description  |
| ---------- | ------------------ | -------- | ------------ |
| temp       | number/ Double     | *        | 현재 기온 (°C)   |
| feels_like | number/ Double     | *        | 체감 온도 (°C)   |
| temp_min   | number/ Double     | *        | 최저 기온 (°C)   |
| temp_max   | number/ Double     | *        | 최고 기온 (°C)   |
| pressure   | number/ Integer    | *        | 기압 (hPa)     |
| humidity   | number/ Integer    | *        | 습도 (%)       |
| sea_level  | number/ Integer    |          | 해수면 기압 (hPa) |
| grnd_level | number/ Integer    |          | 지면 기압 (hPa)  |
##### Wind

| Name  | Type (front/ back) | Required | Description |
| ----- | ------------------ | -------- | ----------- |
| speed | number/ Double     | *        | 풍속 (m/s)    |
| deg   | number/ Integer    | *        | 풍향 (도)      |
##### Rain

| Name | Type (front/ back) | Required | Description     |
| ---- | ------------------ | -------- | --------------- |
| 1h   | number/ Double     |          | 최근 1시간 강수량 (mm) |
##### Clouds

| Name | Type (front/ back) | Required | Description |
| ---- | ------------------ | -------- | ----------- |
| all  | number/ Integer    | *        | 구름량 (%)     |
##### Sys

| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| type    | number/ Integer    |          | 시스템 유형      |
| id      | number/ Integer    |          | 시스템 ID      |
| country | string/ String     | *        | 국가 코드       |
| sunrise | number/ Long       | *        | 일출 시간 (UTC) |
| sunset  | number/ Long       | *        | 일몰 시간 (UTC) |

```
{

    "coord": {

        "lon": 126.9778,

        "lat": 37.5683

    },

    "weather": [

        {

            "id": 501,

            "main": "Rain",

            "description": "보통 비",

            "icon": "10d"

        }

    ],

    "base": "stations",

    "main": {

        "temp": 11.76,

        "feels_like": 10.4,

        "temp_min": 11.76,

        "temp_max": 12.78,

        "pressure": 1016,

        "humidity": 54,

        "sea_level": 1016,

        "grnd_level": 1006

    },

    "visibility": 8000,

    "wind": {

        "speed": 2.06,

        "deg": 200

    },

    "rain": {

        "1h": 1.78

    },

    "clouds": {

        "all": 75

    },

    "dt": 1740808198,

    "sys": {

        "type": 1,

        "id": 8105,

        "country": "KR",

        "sunrise": 1740780248,

        "sunset": 1740821111

    },

    "timezone": 32400,

    "id": 1835848,

    "name": "Seoul",

    "cod": 200

}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| cod     | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 401 (Unauthorized)

{
	"cod": 401,

    "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
}
```

### 오늘의 일정

#### URL
- GET : /api/schedule/today?today={today}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

#### Response

##### success
| Name                   | Type (front/ back)  | Required | Description    |
| ---------------------- | ------------------- | -------- | -------------- |
| code                   | string/ String      | *        | 코드             |
| message                | string/ String      | *        | 메시지            |
| todayScheduleListItems | ScheduleListItems[] | *        | 오늘의 일정 리스트 아이템 |


##### CalendarListItem[]
| Name      | Type (front/ back)    | Required | Description |
| --------- | --------------------- | -------- | ----------- |
| id        | number/ Long          | *        | 글 번호        |
| name      | string/ String        | *        | 작성자         |
| title     | string/ String        | *        | 제목          |
| content   | string/ String        |          | 내용          |
| startDate | Date/ OffesetDateTime | *        | 일정 시작 시간    |
| endDate   | Date/ OffesetDateTime | *        | 일정 마감 시간    |
| regDate   | Date/ OffesetDateTime | *        | 일정 작성 일자    |
| location  | string/ String        |          | 장소          |
```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success",
	"scheduleListItems":[
		{
			"id": 1,
			"name": "백철수",
			"title": "코딩 공부",
			"content": "코딩테스트 하기",
			"startDate": "2025-02-12 12:00:00",
			"endDate": "2025-02-12 15:00:00",
			"regDate": "2025-02-11 05:00:00",
			"lacation": "집"
		},
		{
			"id": 2,
			"name": "백철수",
			"title": "친구와 약속",
			"content": "놀기",
			"startDate": "2025-02-12 16:00:00",
			"endDate": "2025-02-12 19:00:00",
			"regDate": "2025-02-11 :00:00",
			"lacation": "집"
		}
	]
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### Todo 리스트

#### URL
- GET : /api/todo

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

#### Response

##### success
| Name                   | Type (front/ back)  | Required | Description    |
| ---------------------- | ------------------- | -------- | -------------- |
| code                   | string/ String      | *        | 코드             |
| message                | string/ String      | *        | 메시지            |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```


### 이번주 일정

#### URL
- GET : /api/schedule/weekly?start={start}&end={end}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

#### Response

##### success
| Name                    | Type (front/ back)  | Required | Description    |
| ----------------------- | ------------------- | -------- | -------------- |
| code                    | string/ String      | *        | 코드             |
| message                 | string/ String      | *        | 메시지            |
| weeklyScheduleListItems | ScheduleListItems[] | *        | 이번주 일정 리스트 아이템 |


##### CalendarListItem[]
| Name      | Type (front/ back)    | Required | Description |
| --------- | --------------------- | -------- | ----------- |
| id        | number/ Long          | *        | 글 번호        |
| name      | string/ String        | *        | 작성자         |
| title     | string/ String        | *        | 제목          |
| content   | string/ String        |          | 내용          |
| startDate | Date/ OffesetDateTime | *        | 일정 시작 시간    |
| endDate   | Date/ OffesetDateTime | *        | 일정 마감 시간    |
| regDate   | Date/ OffesetDateTime | *        | 일정 작성 일자    |
| location  | string/ String        |          | 장소          |
```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success",
	"scheduleListItems":[
		{
			"id": 1,
			"name": "백철수",
			"title": "코딩 공부",
			"content": "코딩테스트 하기",
			"startDate": "2025-02-12 12:00:00",
			"endDate": "2025-02-12 15:00:00",
			"regDate": "2025-02-11 05:00:00",
			"lacation": "집"
		},
		{
			"id": 2,
			"name": "백철수",
			"title": "친구와 약속",
			"content": "놀기",
			"startDate": "2025-02-12 16:00:00",
			"endDate": "2025-02-12 19:00:00",
			"regDate": "2025-02-11 :00:00",
			"lacation": "집"
		},
		{
			"id": 3,
			"name": "백철수",
			"title": "결혼식",
			"content": "",
			"startDate": "2025-02-14 16:00:00",
			"endDate": "2025-02-14 19:00:00",
			"regDate": "2025-02-01 :00:00",
			"lacation": "서울울"
		}
	]
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```


## Schedule

### 일정 리스트 조회

#### URL
- GET : /api/schedule

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

#### Response

##### success
| Name              | Type (front/ back)  | Required | Description |
| ----------------- | ------------------- | -------- | ----------- |
| code              | string/ String      | *        | 코드          |
| message           | string/ String      | *        | 메시지         |
| scheduleListItems | ScheduleListItems[] | *        | 일정 리스트 아이템  |


##### CalendarListItem[]
| Name      | Type (front/ back)    | Required | Description |
| --------- | --------------------- | -------- | ----------- |
| id        | number/ Long          | *        | 글 번호        |
| name      | string/ String        | *        | 작성자         |
| title     | string/ String        | *        | 제목          |
| content   | string/ String        |          | 내용          |
| startDate | Date/ OffesetDateTime | *        | 일정 시작 시간    |
| endDate   | Date/ OffesetDateTime | *        | 일정 마감 시간    |
| regDate   | Date/ OffesetDateTime | *        | 일정 작성 일자    |
| location  | string/ String        |          | 장소          |
```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success",
	"scheduleListItems":[
		{
			"id": 1,
			"name": "백철수",
			"title": "코딩 공부",
			"content": "코딩테스트 하기",
			"startDate": "2025-02-12 12:00:00",
			"endDate": "2025-02-12 15:00:00",
			"regDate": "2025-02-11 05:00:00",
			"lacation": "집"
		}
	]
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```


### 일정 리스트 저장

#### URL
- POST : /api/schedule

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |


#### Request

| Name      | Type (front/ back)   | Required | Description |
| --------- | -------------------- | -------- | ----------- |
| title     | string/ String       | *        | 제목          |
| content   | string/ String       |          | 내용          |
| location  | string/ String       |          | 장소          |
| startDate | Date/ OffsetDateTime | *        | 시작 시간       |
| endDate   | Date/ OffsetDateTime | *        | 마감 시간       |

#### Response

##### success
| Name              | Type (front/ back)  | Required | Description |
| ----------------- | ------------------- | -------- | ----------- |
| code              | string/ String      | *        | 코드          |
| message           | string/ String      | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### 일정 리스트 수정

#### URL
- PUT : /api/schedule/{id}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |


#### Request

| Name      | Type (front/ back)   | Required | Description |
| --------- | -------------------- | -------- | ----------- |
| title     | string/ String       | *        | 제목          |
| content   | string/ String       |          | 내용          |
| location  | string/ String       |          | 장소          |
| startDate | Date/ OffsetDateTime | *        | 시작 시간       |
| endDate   | Date/ OffsetDateTime | *        | 마감 시간       |

#### Response

##### success
| Name              | Type (front/ back)  | Required | Description |
| ----------------- | ------------------- | -------- | ----------- |
| code              | string/ String      | *        | 코드          |
| message           | string/ String      | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NS",
	"message": "This Schedule does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### 일정 리스트 삭제

#### URL
- DELETE : /api/schedule/{id}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |


#### Request

#### Response

##### success
| Name              | Type (front/ back)  | Required | Description |
| ----------------- | ------------------- | -------- | ----------- |
| code              | string/ String      | *        | 코드          |
| message           | string/ String      | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NS",
	"message": "This Schedule does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

## 할일 목록

### 할일 조회

#### URL
- GET : /api/todo

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

#### Response

##### success
| Name          | Type (front/ back) | Required | Description |
| ------------- | ------------------ | -------- | ----------- |
| code          | string/ String     | *        | 코드          |
| message       | string/ String     | *        | 메시지         |
| todoListItems | TodoListItems[]    | *        | 할일 리스트      |
##### TodoListItems[]
| Name     | Type (front/ back)    | Required | Description |
| -------- | --------------------- | -------- | ----------- |
| id       | number/ Long          | *        | 할일 번호       |
| title    | string/ String        | *        | 제목          |
| content  | string/ String        |          | 내용          |
| regDate  | Date/ OffesetDateTime | *        | 할일 작성 일자    |
| state    | boolean/ Boolean      | *        | 상태          |
| memberId | number/ Long          | *        | 작성자 ID      |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success",
	"todoListItems":[
		{
			"id": 1,
			"title": "청소하기",
			"content": "내방",
			"regDate": "2025-02-27 12:00:00",
			"state": true,
			"memberId": 1
		}
	]
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### 할일 저장

#### URL
- POST : /api/todo

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| title   | string/ String     | *        | 제목          |
| content | string/ String     |          | 내용          |
```
{
	"title": "청소하기",
	"content": "내방"
}
```

#### Response

##### success
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     | *        | 코드          |
| message | string/ String     | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### 할일 수정

#### URL
- PUT : /api/todo/{id}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| title   | string/ String     | *        | 제목          |
| content | string/ String     |          | 내용          |
```
{
	"title": "청소하기",
	"content": "내방"
}
```

#### Response

##### success
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     | *        | 코드          |
| message | string/ String     | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NT",
	"message": "This Todo does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### 할일 상태 수정

#### URL
- PUT : /api/todo/toggle/{id}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

| Name  | Type (front/ back) | Required | Description |
| ----- | ------------------ | -------- | ----------- |
| state | boolean/ Boolean   | *        | 상태          |

```
{
	"state": false
}
```

#### Response

##### success
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     | *        | 코드          |
| message | string/ String     | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NT",
	"message": "This Todo does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```

### 할일 삭제

#### URL
- DELETE : /api/todo/{id}

#### Header

| Name          | Value        |
| ------------- | ------------ |
| Authorization | Bearer Token |

#### Request

#### Response

##### success
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     | *        | 코드          |
| message | string/ String     | *        | 메시지         |


```
Https Status - 200 (OK)

{
	"code": "SU",
	"message": "Success"
}
```

##### Fail
| Name    | Type (front/ back) | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| code    | string/ String     |          | 코드          |
| message | string/ String     |          | 메시지         |


```
Https status - 400 (Bad Request)

{
	"code": "VF",
	"message": "Validation Failed"
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NU",
	"message": "This user does not exist."
}
```

```
Https status - 401 (Unauthorized)

{
	"code": "NT",
	"message": "This Todo does not exist."
}
```

```
Https status - 500 (Internal Server Error)

{
	"code": "DBE",
	"message": "Database error"
}
```