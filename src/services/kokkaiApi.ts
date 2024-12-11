import axios from 'axios';

export const fetchKokkaiData = async (keyword: string, year: number): Promise<number> => {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://kokkai.ndl.go.jp/api/speech?maximumRecords=1&any=${encodedKeyword}&from=${year}-01-01&until=${year}-12-31`;
    
    const response = await axios.get(url);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    const numberOfRecords = xmlDoc.querySelector('numberOfRecords');
    
    return numberOfRecords ? parseInt(numberOfRecords.textContent || '0', 10) : 0;
  } catch (error) {
    console.error('Error fetching Kokkai data:', error);
    return 0;
  }
};