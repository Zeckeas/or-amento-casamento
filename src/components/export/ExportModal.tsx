import React, { useState } from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ExportOptions } from '../../types/document';
import { exportToPDF, exportToExcel } from '../../utils/export';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
}) => {
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [type, setType] = useState<ExportOptions['type']>('summary');

  const handleExport = () => {
    onExport({ format, type });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar Relatório">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setFormat('pdf')}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors
              ${format === 'pdf' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}
          >
            <FileText className={`w-8 h-8 ${format === 'pdf' ? 'text-pink-500' : 'text-gray-400'}`} />
            <span className={format === 'pdf' ? 'text-pink-700' : 'text-gray-600'}>PDF</span>
          </button>
          
          <button
            onClick={() => setFormat('excel')}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors
              ${format === 'excel' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}
          >
            <FileSpreadsheet className={`w-8 h-8 ${format === 'excel' ? 'text-pink-500' : 'text-gray-400'}`} />
            <span className={format === 'excel' ? 'text-pink-700' : 'text-gray-600'}>Excel</span>
          </button>
        </div>

        <Select
          label="Tipo de Relatório"
          value={type}
          onChange={(e) => setType(e.target.value as ExportOptions['type'])}
          options={[
            { value: 'summary', label: 'Resumo Geral' },
            { value: 'financial', label: 'Relatório Financeiro' },
            { value: 'suppliers', label: 'Lista de Fornecedores' },
            { value: 'timeline', label: 'Cronograma' },
          ]}
        />

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleExport}>
            Exportar
          </Button>
        </div>
      </div>
    </Modal>
  );
};