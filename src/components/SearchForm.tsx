import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (keyword: string, startYear: number, endYear: number) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState('');
  const [startYear, setStartYear] = React.useState(2000);
  const [endYear, setEndYear] = React.useState(2024);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, startYear, endYear);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
          キーワード
        </label>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
            開始年
          </label>
          <input
            type="number"
            id="startYear"
            min="1947"
            max="2024"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
            終了年
          </label>
          <input
            type="number"
            id="endYear"
            min="1947"
            max="2024"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Search className="w-5 h-5 mr-2" />
        検索
      </button>
    </form>
  );
};