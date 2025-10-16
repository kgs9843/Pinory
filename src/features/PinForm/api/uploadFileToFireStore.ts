// import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';

// export const uploadFile = (
//   uri: string,
//   type: 'image' | 'video',
//   onProgress?: (progress: number) => void,
// ): Promise<string> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       const ext = type === 'image' ? 'jpg' : 'mp4';
//       const fileName = `${Date.now()}.${ext}`;
//       const ref = storage().ref(`uploads/${fileName}`);
//       const task = ref.put(blob);

//       task.on(
//         'state_changed',
//         snapshot => {
//           const p = snapshot.bytesTransferred / snapshot.totalBytes;
//           onProgress?.(p);
//         },
//         error => reject(error),
//         async () => {
//           const downloadURL = await ref.getDownloadURL();
//           resolve(downloadURL);
//         },
//       );
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
