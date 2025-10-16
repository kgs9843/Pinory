export interface Poi {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
}

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
  fileUrl?: string[];
  locationName: string;
}

// export interface Pin {
//   id: string;
//   title: string;
//   description?: string;
//   latitude: number;
//   longitude: number;
//   categoryId: string;
//   images?: string[];
//   address?: string;
//   createdAt: FirebaseFirestoreTypes.Timestamp;
//   updatedAt?: FirebaseFirestoreTypes.Timestamp;
// }
