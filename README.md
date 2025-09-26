# Memory Map 📍

> 지도 위에 추억을 저장하는 위치 기반 개인 피드 앱

## 🎯 프로젝트 개요

Memory Map은 사용자가 방문한 장소의 위도/경도 정보를 바탕으로 개인적인 추억을 피드 형태로 저장하고 관리할 수 있는 지도 기반 모바일 애플리케이션입니다. 인스타그램의 직관적인 피드 시스템과 구글 맵의 강력한 지도 기능을 결합한 하이브리드 형태의 앱입니다.

## ✨ 핵심 가치

- **위치 기반 추억 저장**: 내가 간 곳, 특별한 순간을 지도 위에 기록
- **직관적인 UX**: 인스타그램과 같은 친숙한 피드 작성 경험
- **개인화**: 나만의 카테고리로 추억을 체계적으로 관리
- **글로벌 접근성**: 구글 맵 기반으로 전 세계 어디서나 사용 가능

## 🏗️ 기술 스택

- **Frontend**: Expo (React Native)
- **지도 서비스**: Google Maps API
- **위치 서비스**: Expo Location
- **카메라**: Expo Camera
- **상태 관리**: Redux Toolkit (예정)
- **데이터베이스**: Firebase Firestore (예정)
- **인증**: Firebase Auth (예정)

## 📱 앱 구조

### 네비게이션 (하단 탭바)

```
┌─────────────────────────────────────────┐
│  🗺️ 메인   ✏️ 작성   👤 마이   📱 SNS   │
│ (지도)    (피드)    (페이지)  (추후)    │
└─────────────────────────────────────────┘
```

## 🎨 주요 기능

### 1. 메인 화면 (지도)

- **지도 표시**: Google Maps 기반 전체 화면 지도
- **현재 위치**: GPS 기반 실시간 위치 표시
- **추억 핀**: 사용자가 저장한 장소에 핀 마커 표시
- **카테고리 필터링**: 토글/드롭다운으로 카테고리별 핀 표시/숨김
- **핀 상호작용**:
  - 핀 클릭 → 피드 카드 미리보기 팝업
  - "자세히 보기" → 피드 상세 화면 이동

### 2. 피드 작성

- **위치 설정**: 현재 위치 자동 태깅 + 수동 위치 선택
- **사진 업로드**: 카메라 촬영 또는 갤러리 선택 (선택사항)
- **텍스트 작성**: 추억, 감상, 메모 등 자유 형식
- **카테고리 지정**: 기존 카테고리 선택 또는 새 카테고리 생성
- **저장**: 완료 시 지도에 새로운 핀 자동 생성

### 3. 카테고리 관리

- **자유 생성**: 사용자별 개인 카테고리 무제한 생성
- **시각화**: 카테고리별 고유 색상으로 핀 구분 표시
- **이름 설정**: 카테고리명 자유 지정/수정
- **필터링**: 지도에서 특정 카테고리만 표시 가능
- **예시**: 맛집 🍽️, 여행 ✈️, 데이트 💕, 카페 ☕, 업무 💼

### 4. 피드 상세 화면

- **헤더**: 위치 정보 + 작성 일시
- **이미지 갤러리**: 업로드된 사진들을 슬라이드 형태로 표시
- **본문**: 사용자가 작성한 텍스트 내용
- **지도 미니뷰**: 해당 위치를 작은 지도로 표시
- **카테고리 태그**: 소속 카테고리 표시

### 5. 마이페이지

- **프로필 정보**: 사용자 이름, 프로필 사진
- **통계**: 총 방문 장소 수, 카테고리별 통계
- **설정**: 앱 설정, 계정 관리
- **카테고리 관리**: 전체 카테고리 목록 및 편집

## 🚀 확장 기능 (로드맵)

### SNS 기능 (Phase 2)

- **공개/비공개**: 피드별 공개 범위 설정
- **타인 피드 탐색**: 공개된 다른 사용자의 피드 지도에서 확인
- **복사 기능**: 마음에 드는 장소를 내 카테고리로 복사 저장
- **소셜 상호작용**: 댓글, 좋아요, 팔로우 기능
- **피드 탐색**: 인스타그램/쓰레드 스타일의 피드 타임라인

## 🗃️ 데이터 구조

```javascript
// 사용자
User {
  id: string;
  email: string;
  displayName: string;
  profileImage?: string;
  createdAt: Date;
}

// 카테고리
Category {
  id: string;
  userId: string;
  name: string;
  color: string; // HEX 색상 코드
  iconName?: string;
  createdAt: Date;
}

// 피드
Feed {
  id: string;
  userId: string;
  categoryId?: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  title: string;
  description: string;
  images: string[]; // 이미지 URL 배열
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean; // SNS 확장용
}
```

### 지도 스타일

- **기본**: Google Maps 다크 모드 테마
- **핀 디자인**: 둥근 마커 + 카테고리별 색상
- **클러스터링**: 많은 핀이 있을 때 그룹화 표시

## 🔧 개발 환경 설정

### 필수 설치 항목

```bash
# Expo CLI 설치
npm install -g @expo/cli

# 프로젝트 생성
npx create-expo-app memory-map --template

# 주요 의존성 설치
expo install expo-location expo-camera expo-image-picker
expo install react-native-maps react-native-maps-directions
```

### 환경 변수 (.env)

```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_project_id
```

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
