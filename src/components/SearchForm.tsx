import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (keywords: string[], startYear: number, endYear: number) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [keywords, setKeywords] = React.useState(['', '', '']);
  const [startYear, setStartYear] = React.useState(2000);
  const [endYear, setEndYear] = React.useState(2024);
  const [error, setError] = React.useState('');

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    
    if (value === '') {
      setStartYear(1947);
    } else if (!isNaN(numValue) && numValue >= 1947 && numValue <= 2024) {
      setStartYear(numValue);
      setError('');
    }
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    
    if (value === '') {
      setEndYear(2024);
    } else if (!isNaN(numValue) && numValue >= 1947 && numValue <= 2024) {
      setEndYear(numValue);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (startYear > endYear) {
      setError('開始年は終了年より前の年を選択してください');
      return;
    }
    
    if (keywords.every(k => k.trim() === '')) {
      setError('少なくとも1つのキーワードを入力してください');
      return;
    }
    
    setError('');
    onSearch(keywords.filter(k => k.trim() !== ''), startYear, endYear);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* キーワード入力欄を横並びに */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'キーワード1', placeholder: '例）脱炭素' },
          { label: 'キーワード2', placeholder: '例）省エネ' },
          { label: 'キーワード3', placeholder: '例）再生可能エネルギー' }
        ].map((field, index) => (
          <div key={field.label} className="space-y-2">
            <label htmlFor={`keyword${index + 1}`} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              id={`keyword${index + 1}`}
              value={keywords[index]}
              onChange={(e) => handleKeywordChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={field.placeholder}
            />
          </div>
        ))}
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
            onChange={handleStartYearChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="例）1947"
          />
          <p className="text-xs text-gray-500">※第1回国会が開催された1947年から指定可能です</p>
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
            onChange={handleEndYearChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="例）2020"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

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