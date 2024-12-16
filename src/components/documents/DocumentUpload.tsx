import React, { useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../config/supabase';
import { Button } from '../ui/Button';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  acceptedFileTypes?: string[];
  maxSize?: number;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  acceptedFileTypes = ['.pdf', '.doc', '.docx'],
  maxSize = 10 * 1024 * 1024, // 10MB
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize,
    multiple: false
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">
          {isDragActive
            ? 'Solte o arquivo aqui...'
            : 'Arraste e solte um arquivo aqui, ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Arquivos suportados: PDF, DOC, DOCX (max. {maxSize / 1024 / 1024}MB)
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">{acceptedFiles[0].name}</span>
            </div>
            <button
              onClick={() => acceptedFiles.splice(0, acceptedFiles.length)}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};