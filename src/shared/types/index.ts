// NOTE: 여러 전역적인 타입들을 정의하는 곳
export interface Pin {
  id: number;
  categoryId: number;
  title: string;
  latitude: number;
  longitude: number;
  description: string;
  imageUrl?: string;
  locationName: string;
}

// export interface PinDetail {
//   id: number;
//   categoryId: number;
//   title: string;
//   description: string;
// }

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Coords {
  latitude: number;
  longitude: number;
}
