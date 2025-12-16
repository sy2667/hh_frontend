# KODC (Korea Oceanographic Data Center)1

국립수산과학원 한국해양자료센터 웹 애플리케이션 프로젝트입니다.

## 프로젝트 개요

- **프레임워크** : Spring boot 3.5.6
- **빌드 도구** : Gradle
- **Java 버전** : 17
- **패키징** : WAR

## 기술 스택

### Backend

- Spring Framework 6.2.11
- Spring Security 6.5.5
- Mybatis 3.5.13

### Database

- PostgreSQL / Oracle / MySQL

### Frontend

- JSP/JSTL
- jQuery 3.3.1
- Bootstrap 4 / Tailwind CSS

## 프로젝트 구조

```powershell
kodc/
├─ src/
│  ├─ main/
│  │   ├─ java/
│  │   │   └─ kr/ust21/nifs/kodc/
│  │   │       ├─ com/           # 공통 모듈
│  │   │       │   ├─ comm/      # 공통 컴포넌트
│  │   │       │   └─ utl/       # 유틸리티
│  │   │       ├─ mapper/        # Mybatis Mapper 인터페이스
│  │   │       ├─ service/       # 비지니스 로직
│  │   │       └─ web/           # 컨트롤러
│  │   ├─ resources/
│  │   │   ├─ kr/
│  │   │   │   ├─ mapper/        # Mybatis XML
│  │   │   │   ├─ spring/        # Spring 설정
│  │   │   │   ├─ message/       # 메세지 리소스
│  │   │   └─ props/             # 프로퍼티 파일
│  │   └─ webapp/
│  │       ├─ WEB-INF/
│  │       │   ├─ config/        # Spring MVC 설정
│  │       │   └─ views/         # JSP 뷰
│  │       └─ resources/         # 정적 리소스
│  └─ test/
└─ pom.xml
```

## 환경설정

### 1.  데이터베이스 설정

`src/main/resources/props/globals.properties` 파일 수정 :

```powershell
properties
# DB 타입 설정 (postgres, mysql, oracle 등)
Globals.DBType = postgres

# PostgreSQL 설정
Globals.postgres.DriverClassName=org.postgresql.Driver
Globals.postgres.url=jdbc:postgresql://localhost:5432/my_database
Globals.postgres.UserName=my_username
Globals.postgres.Password=my_password
```

## 개발 환경 설정

### IDE 설정 (IntelliJ IDEA / Eclipse)

1. **프로젝트 Import**

          - File > Open > pom.xml 선택

1. **Lombok 설정**

          - Lombok 플러그인 설치

          - Annotation Processing 활성화

1. **인코딩 설정**

          - UTF-8로 설정

1. **Java 버전**

          - JDK 1.8 설정 또는 17 / 21

1. **Tomcat 버전**

          - Tomcat 9 버전으로 설정

1. **Deployment 설정**

          - Run → Edit Configurations

          - Deploment 탭

          - `+` 버튼 → Artifact → kodc:war exploded 선택

          - Application context 설정

            - /kodc          

1. **프로젝트 시작 시 빌드 설정**

          - File → Settings → Build, Execution, Deployment → Compiler

            - Build Project Automatically 활성화

1. **Tabs and indents 설정 (java, js, jsp, html, css, xml)**

          - Tab Size : 2

          - indent : 2

          - continuation indent : 2

## 배포 환경

### 운영서버 타입

```powershell
properties
# OS 타입(WINDOWS, UNIX)
Globals.OsType = UNIX
```

### 로그 설정

로그 설정 파일: `src/main/resources/log4j2.xml`

로그 레벨 조정:

```xml
<Logger name="kr.ust21.nifs.kodc" level="DEBUG" additivity="false">
	<AppenderRef ref="console" />
	<AppenderRef ref="file" />
</Logger>
```

## 주요 설정 파일

### Spring 설정

- `context-common.xml` : 공통 빈 설정
- `context-datasource.xml` : 데이터 소스 설정
- `context-mapper.xml` : MyBatis 설정
- `context-transaction.xml` : 트랜젝션 설정
- `context-security.xml` : Spring Security 설정
- `egov-com-servlet.xml` : Spring MVC 설정

### Web 설정

- `web.xml` : 서블릿 설정 (Servlet 3.1)
- [`WebApplicationIntializer.java`](http://WebApplicationIntializer.java) : Java 기반 웹 초기화
