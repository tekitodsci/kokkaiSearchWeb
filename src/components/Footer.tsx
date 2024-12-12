import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-sm text-gray-600">
        <p className="mb-2">
          本アプリは
          <a 
            href="https://kokkai.ndl.go.jp/api.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            国会会議録検索システムのAPI
          </a>
          を利用しています
        </p>
        <p>
          本アプリのソースコードは
          <a 
            href="https://github.com/tekitodsci/kokkaiSearchWeb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            GitHubで公開
          </a>
          しています
        </p>
      </div>
    </footer>
  );
};