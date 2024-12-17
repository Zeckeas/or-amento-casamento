import React, { useState, useEffect } from 'react';
import { SettingsForm } from '../components/settings/SettingsForm';
import { ProfileForm } from '../components/settings/ProfileForm';
import { DocumentUpload } from '../components/documents/DocumentUpload';
import { DocumentList } from '../components/documents/DocumentList';
import { ExportModal } from '../components/export/ExportModal';
import { Button } from '../components/ui/Button';
import { Download, Upload } from 'lucide-react';
import { supabase } from '../config/supabase';
import { CustomDocument, ExportOptions } from '../types/document'; // Renomeado para CustomDocument
import { exportToPDF, exportToExcel } from '../utils/export';
import { useBudgetStore } from '../store/budgetStore';
import { useSupplierStore } from '../store/supplierStore';
import { useNavigate } from 'react-router-dom'; // Alteração aqui

export const Settings: React.FC = () => {
  const [documents, setDocuments] = useState<CustomDocument[]>([]); // Usando CustomDocument
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { categories } = useBudgetStore();
  const { suppliers } = useSupplierStore();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate(); // Alteração aqui

  // Verifica o estado de autenticação ao carregar o componente
  useEffect(() => {
    const checkUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error || !userData) {
        console.log('Usuário não autenticado!');
        alert('Você precisa estar logado para acessar as configurações!');
        navigate('/login'); // Alteração aqui para redirecionar
      } else {
        setUser(userData); // Usuário autenticado
      }
    };

    checkUser();
  }, [navigate]); // Alteração aqui para incluir o 'navigate' na lista de dependências

  const handleFileUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const newDocument: CustomDocument = { // Usando CustomDocument
        id: crypto.randomUUID(),
        name: file.name,
        type: 'contract',
        url: publicUrl,
        size: file.size,
        createdAt: new Date().toISOString(),
      };

      setDocuments([...documents, newDocument]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDocumentDownload = async (document: CustomDocument) => {
    try {
      const response = await fetch(document.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleDocumentDelete = async (id: string) => {
    try {
      const document = documents.find(doc => doc.id === id);
      if (!document) return;

      const filePath = document.url.split('/').pop();
      if (!filePath) return;

      const { error: deleteError } = await supabase.storage
        .from('documents')
        .remove([`documents/${filePath}`]);

      if (deleteError) throw deleteError;

      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleExport = (options: ExportOptions) => {
    const data = {
      categories,
      suppliers,
    };

    if (options.format === 'pdf') {
      exportToPDF(options.type, data);
    } else {
      exportToExcel(options.type, data);
    }
  };

  if (!user) {
    return <div>Carregando...</div>; // Enquanto espera o usuário, exibe um carregamento
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
        <p className="text-gray-600 mt-2">
          Gerencie as configurações do seu casamento e perfil
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Configurações do Casamento</h2>
        <SettingsForm />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Perfil dos Noivos</h2>
        <ProfileForm />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Documentos e Contratos</h2>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              icon={Download}
              onClick={() => setIsExportModalOpen(true)}
            >
              Exportar Relatórios
            </Button>
            <Button icon={Upload}>Upload de Documento</Button>
          </div>
        </div>

        <div className="space-y-6">
          <DocumentUpload onUpload={handleFileUpload} />
          <DocumentList
            documents={documents}
            onDownload={handleDocumentDownload}
            onDelete={handleDocumentDelete}
          />
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};
