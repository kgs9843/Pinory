import { useEffect, useState } from 'react';

import { pinsDetail } from '@entities/pin/model/mock';
import { PinDetail } from '@entities/pin/model/types';

export const usePinDetailInformation = (pinId: string) => {
  const [pin, setPin] = useState<PinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // NOTE: 실제 API 호출 대신 더미데이터 사용
    const timer = setTimeout(() => {
      try {
        // TODO : 추후 1대시 pinId로 수정
        const foundPin = pinsDetail.find(p => p.id === '1') || null;
        setPin(foundPin);

        if (!foundPin) {
          setError('데이터 없음');
        }
      } catch (e) {
        console.log(e);
        setError('데이터를 불러오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pinId]);

  return { pin, loading, error };
};
