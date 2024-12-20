import type { SearchResult } from '../types';

interface ExtendedSearchResult extends SearchResult {
  keyword: string;
}

export const downloadCSV = (data: ExtendedSearchResult[], filename: string) => {
  // CSVヘッダー
  const headers = ['キーワード', '年', '出現回数'];
  
  // データを CSV 形式に変換
  const csvContent = [
    headers.join(','),
    ...data.map(row => `${row.keyword},${row.year},${row.count}`)
  ].join('\n');
  
  // BOMを追加してShift-JISでエンコード
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8' });
  
  // ダウンロードリンクを作成
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `kokkai_${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  
  // リンクをクリックしてダウンロードを開始
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // URLを解放
  URL.revokeObjectURL(link.href);
};