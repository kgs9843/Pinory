// NOTE: 여러 전역적인 타입들을 정의하는 곳
export interface Pin {
  id: number;
  categoryId: number;
  title: string;
  latitude: number;
  longitude: number;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Coords {
  latitude: number;
  longitude: number;
}
