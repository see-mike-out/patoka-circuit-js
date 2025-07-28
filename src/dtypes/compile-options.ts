export type CompileOptions = {
  showMoments?: boolean,
  filterUnusedQubits?: boolean,
  pagination?: Pagination,
  isOriginal?: boolean,
  unitId?: string,
  circuitSelectorName?: {
    [key: string]: string
  }
};

export type Pagination = {
  page: number,
  range: [number, number],
  totalPage: number,
}