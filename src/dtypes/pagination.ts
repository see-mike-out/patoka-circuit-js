import type { Pagination } from "./compile-options";

export interface PaginationInterface {
  current: number;
  num_layers: number;
  layers_per_page: number;
  total_pages: number;
  curr_layer_range: [number, number]; // inclusive, exclusive
};

export class PaginationControl implements PaginationInterface {
  current: number;
  num_layers: number;
  layers_per_page: number;
  total_pages: number;
  curr_layer_range: [number, number]; // inclusive, exclusive

  constructor(_num_layers: number, _layers_per_page?: number) {
    this.current = 0;
    this.num_layers = _num_layers;
    this.layers_per_page = _layers_per_page ?? 50;
    this.total_pages = Math.ceil(this.num_layers / this.layers_per_page);
    this.curr_layer_range = [0, Math.min(this.layers_per_page, this.num_layers)];
  }

  setPage(i: number): PaginationControl {
    let page = (i >= 0 && i < this.total_pages) ? i : 0;
    this.current = page;
    this.curr_layer_range = [
      this.layers_per_page * i, Math.min(this.layers_per_page * (i + 1), this.num_layers)
    ];
    return this;
  }

  get(): Pagination {
    return {
      page: this.current,
      range: this.curr_layer_range,
      totalPage: this.total_pages,
    }
  }

  getPage(i: number): Pagination {
    this.setPage(i);
    return this.get();
  }

}