export interface Pin {
  id: string;
  categoryId: string;
  title: string;
  latitude: number;
  longitude: number;
  description: string;
  imageUrl?: string;
  locationName: string;
}

export interface PinDetail {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  user: {
    name: string;
    profileImage: string;
  };
  date: string;
  imageUrl?: string[];
  locationName: string;
}
