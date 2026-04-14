export interface TableEmployee {
  employeeId: string;
  employeeTableId: number;
  name: string;
}

export interface Table {
  id: number;
  tableNumber: string;
  numberOfSeats: number;
  isOccupied: boolean;
  image: string;
  employees: TableEmployee[];
}

export interface PaginatedTableResponse {
  current_page: number;
  data: Table[];
  last_page: number;
  per_page: number;
  total: number;
}
