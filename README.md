# 홍빈 가계부

우리 집의 수입·지출을 관리하기 위한 **웹 기반 가계부 서비스**입니다.

Docker Compose + AWS + Nginx를 이용해 실제 서비스로 운영 중입니다.

- 🌐 서비스 도메인: [**https://glodpig.life**](https://glodpig.life/)

## 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 홍빈 가계부 (GlodPig) |
| Backend | Spring Boot 3.5.6 |
| Frontend | React (TypeScript) |
| 빌드 도구 | Gradle |
| Java 버전 | Java 17 |
| 패키징 | Docker Image |
| DB | MySQL |
| 배포 환경 | AWS EC2 + Docker Compose |
| Reverse Proxy | Nginx |
| 인증 | Naver OAuth |

## 기술 스택

### Backend

- Spring Boot **3.5.6**
- Spring Security
- Spring Data JPA (Hibernate)
- Flyway (DB Migration)
- MySQL Connector/J
- Lombok
- Gradle

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Calendar UI
    - **FullCalendar** (월/주/일 가계부 캘린더 UI)
    - 또는 **Day.js** (날짜 처리)

### Database

- MySQL 8.x

### Infra / DevOps

- Docker / Docker Compose
- AWS EC2
- Nginx (Reverse Proxy + HTTPS)
- 도메인 연결: **glodpig.life**

## 프로젝트 구조

Frontend (React)

```xml
src/
├─ api/            # API 통신 모듈 (Axios)
├─ assets/         # 이미지, 아이콘 등 정적 리소스
├─ components/     # 공통 UI 컴포넌트
├─ configs/        # 환경 설정, 상수 설정
├─ constants/      # 공통 상수
├─ contexts/       # React Context (인증, 전역 상태)
├─ hooks/          # Custom Hooks
├─ pages/          # 페이지 단위 컴포넌트
├─ theme/          # Tailwind / UI 테마 설정
├─ types/          # TypeScript 타입 정의
├─ utils/          # 공통 유틸 함수
├─ App.tsx
├─ main.tsx
└─ index.css
```

### Backend 구조

```
src/
└─ main/
   ├─ java/
   │  └─ com/household/backend/
   │     ├─ common/        # 공통 유틸, 공통 응답 객체
   │     ├─ config/        # Security, CORS, JPA, OAuth 설정
   │     ├─ controller/   # REST API Controller
   │     ├─ dto/           # Request / Response DTO
   │     ├─ entity/        # JPA Entity
   │     ├─ oauth/         # OAuth (Naver) 관련 로직
   │     ├─ repository/   # JPA Repository
   │     ├─ service/      # 비즈니스 로직
   │     └─ BackendApplication.java
   │
   └─ resources/
      ├─ db/
      │  └─ migration/    # Flyway SQL 스크립트
      ├─ static/          # 정적 리소스
      ├─ templates/       # 템플릿 (필요 시 사용)
      ├─ application.properties
      ├─ application-local.properties
      └─ application-prod.properties

```

## 환경 설정

### Backend (`application-prod.yml`)

```powershell
spring.application.name=backend

# MySQL
spring.datasource.url=jdbc:mysql://${DB_HOST:infra-mysql}:${DB_PORT:3306}/${DB_NAME:household}?serverTimezone=Asia/Seoul
spring.datasource.username=${DB_USERNAME:app_user}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Flyway
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true

# OAuth (Naver)
naver.client-id=${NAVER_CLIENT_ID}
naver.client-secret=${NAVER_CLIENT_SECRET}
naver.redirect-uri=${NAVER_REDIRECT_URI}

# CORS
app.cors.allowed-origins=https://glodpig.life,https://www.glodpig.life
```

## 배포 & 인프라 구성

```
[Client Browser]
        ↓
     [Nginx]
        ↓
[React Frontend]
        ↓
[Spring Boot Backend]
        ↓
      [MySQL]

```

- Docker Compose로 서비스 구성
- Nginx에서 HTTPS 및 도메인 라우팅
- Backend / Frontend / DB 컨테이너 분리
- 환경 변수 기반 설정 관리

## 🔐 인증 & 보안

- Naver OAuth 로그인
- Spring Security 기반 인증 / 인가
- CORS 정책 적용
- Session 기반 인증 처리

## 📅 주요 기능

- 수입 / 지출 등록 및 관리
- 날짜별 가계부 조회
- 월별 가계 통계
- 캘린더 기반 가계부 UI
- OAuth 로그인
- 반응형 UI 지원

## 🚀 실행 방법 (Local)

### 1. Backend

```bash
.\gradlew clean bootRun --args='--spring.profiles.active=local'
```

### 2. Frontend

```bash
npm install
npm run dev
```

## 주요 설정 파일

### Backend 설정 파일

### `BackendApplication.java`

```java
@SpringBootApplication
publicclassBackendApplication {
publicstaticvoidmain(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}

```

- Spring Boot 애플리케이션의 **진입점**
- 컴포넌트 스캔 및 자동 설정 수행

---

### Application 설정 파일

### `application.properties`

- 공통 설정 파일
- 로컬/운영 환경에서 공통으로 사용하는 기본 설정 정의

---

### `application-local.properties`

- **로컬 개발 환경 전용 설정**
- 로컬 DB, 로컬 OAuth 설정 등 개발용 값 정의

예:

```
spring.profiles.active=local
```

---

### `application-prod.properties`

- **운영 서버 전용 설정**
- Docker / AWS 환경에서 사용
- 환경 변수 기반 설정 관리

주요 설정 항목:

- MySQL Datasource
- JPA / Hibernate
- Flyway
- OAuth (Naver)
- CORS
- Session 설정

---

### Database & Migration

### `db/migration/`

```
db/migration/
├─ V1__init.sql
├─ V2__add_expense_table.sql
```

- Flyway를 이용한 **DB 스키마 버전 관리**
- SQL 파일명 규칙
    - `V{버전}__{설명}.sql`
- 서버 기동 시 자동 마이그레이션 수행

---

### 패키지별 주요 역할

### `config/`

- 애플리케이션 전반 설정 관리

주요 설정 클래스:

- `SecurityConfig` : Spring Security 설정
- `CorsConfig` : CORS 정책 설정
- `JpaConfig` : JPA 관련 설정
- `OAuthConfig` : Naver OAuth 설정

---

### `controller/`

- REST API 엔드포인트 정의
- 클라이언트 요청을 받아 Service 계층으로 전달

예:

- 가계부 CRUD API
- 인증 / 로그인 API

---

### `service/`

- **비즈니스 로직 처리**
- 트랜잭션 관리
- Repository 호출 및 데이터 가공

---

### `repository/`

- Spring Data JPA Repository
- Entity 기반 DB 접근 계층

---

### `entity/`

- JPA Entity 클래스
- DB 테이블과 1:1 매핑
- 가계부, 사용자, 지출/수입 도메인 모델 정의

---

### `dto/`

- Request / Response 데이터 전달 객체
- Controller ↔ Client 간 데이터 구조 정의
- Entity 직접 노출 방지

---

### `oauth/`

- Naver OAuth 인증 관련 로직
- OAuth 인증 요청 / 토큰 처리
- 사용자 정보 조회 및 로그인 처리

---

### `common/`

- 공통으로 사용하는 클래스 모음

예:

- 공통 Response 객체
- 에러 코드 / 예외 처리
- 유틸리티 클래스

---

### 정적 리소스

### `resources/static/`

- 필요 시 정적 리소스 제공
- 이미지, favicon 등

---

### `resources/templates/`

- 서버 템플릿 사용 시 확장 가능
- (현재는 React 기반 SPA 위주)

---

## 🔐 보안 & 인증 관련 설정

- Spring Security 기반 인증/인가
- Naver OAuth 로그인 연동
- Session 기반 인증 유지
- CORS 정책을 통해 허용 도메인 제한

```
app.cors.allowed-origins=https://glodpig.life,https://www.glodpig.life
```

---

## 배포 환경 관련 설정

- Docker Compose 기반 서비스 구성
- 환경 변수로 민감 정보 관리
    - DB 계정
    - OAuth Client 정보
- Nginx를 통한 Reverse Proxy 및 HTTPS 처리
