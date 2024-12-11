import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultChart } from './components/ResultChart';
import { fetchKokkaiData } from './services/kokkaiApi';
import type { SearchResult } from './types';
import { Database } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Database className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">国会会議録キーワード分析</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          results.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ResultChart data={results} keyword={keyword} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;