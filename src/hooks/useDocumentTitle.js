import { useEffect } from 'react';
import { HOTEL_INFO } from '@/data/hotelInfo';

export function useDocumentTitle(pageTitle) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = pageTitle
      ? `${pageTitle} | ${HOTEL_INFO.brandName}`
      : `${HOTEL_INFO.brandName} | Five-Star International Hospitality`;
  }, [pageTitle]);
}

export default useDocumentTitle;
