import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { Document } from '../../types/document';
import { formatDate } from '../../utils/formatters';

interface DocumentListProps {
  documents: Document[];
  onDownload: (document: Document) => void;
  onDelete: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-gray-400" />
            <div>
              <h4 className="font-medium text-gray-900">{doc.name}</h4>
              <p className="text-sm text-gray-500">
                {formatDate(doc.createdAt)} • {(doc.size / 1024 / 1024).toFixed(2)}MB
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownload(doc)}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(doc.id)}
              className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};