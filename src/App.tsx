import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultChart } from './components/ResultChart';
import { fetchKokkaiData } from './services/kokkaiApi';
import { downloadCSV } from './utils/csvHelper';
import type { SearchResult } from './types';
import { Database, Download } from 'lucide-react';

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchKeyword: string, startYear: number, endYear: number) => {
    setLoading(true);
    setKeyword(searchKeyword);
    
    try {
      const searchResults: SearchResult[] = [];
      
      for (let year = startYear; year <= endYear; year++) {
        const count = await fetchKokkaiData(searchKeyword, year);
        searchResults.push({ year, count });
      }
      
      setResults(searchResults);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (results.length > 0) {
      downloadCSV(results, keyword);
    }
  };

  // 初期データの設定
  React.useEffect(() => {
    const currentYear = new Date().getFullYear();
    const initialData = Array.from({ length: 5 }, (_, index) => ({
      year: currentYear - 4 + index,
      count: 0
    }));
    setResults(initialData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-2">
            <Database className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">国会会議録キーワード出現回数</h1>
          </div>
          <p className="text-gray-600 text-center">
            指定したキーワードが国会会議録に何回出現するかを折れ線グラフで示します。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">検索結果</h2>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Download className="w-4 h-4 mr-2" />
              CSVダウンロード
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResultChart data={results} keyword={keyword || '(キーワードを入力してください)'} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;