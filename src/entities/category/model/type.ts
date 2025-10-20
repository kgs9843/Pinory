export interface Category {
  id: string; // Firestore document ID or UUID
  name: string; // 카테고리 이름 (예: 맛집, 산)
  color: string; // 고정 색상 중 하나
  isShared: boolean; // (true면 전체 유저 공유)
}
