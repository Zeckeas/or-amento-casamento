export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'agreement' | 'other';
  url: string;
  size: number;
  createdAt: string;
  supplierId?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'excel';
  type: 'financial' | 'suppliers' | 'timeline' | 'summary';
  dateRange?: {
    start: string;
    end: string;
  };
}