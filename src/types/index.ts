export interface SearchResult {
  year: number;
  count: number;
}

export interface SearchParams {
  keyword: string;
  startYear: number;
  endYear: number;
}