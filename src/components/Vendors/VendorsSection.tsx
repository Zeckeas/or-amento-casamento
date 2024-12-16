import React, { useState, useEffect } from 'react';
import { VendorsList } from './VendorsList';
import { VendorForm } from './VendorForm';
import { Vendor } from '../../types/vendors';
import { PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function VendorsSection() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);  // Novo estado para controle de carregamento
  const [error, setError] = useState<string | null>(null);  // Novo estado para armazenar erros

  // Carregar fornecedores do Supabase
  const fetchVendors = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('vendors').select('*');

    if (error) {
      console.error('Erro ao carregar fornecedores:', error.message);
      setError('Erro ao carregar fornecedores.');  // Definir mensagem de erro
    } else {
      setVendors(data || []);
      setError(null);  // Limpar erros anteriores
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Adicionar novo fornecedor
  const handleAddVendor = async (vendor: Omit<Vendor, 'id'>) => {
    setLoading(true);
    const { data, error } = await supabase.from('vendors').insert([
      {
        name: vendor.name,
        service: vendor.service,
        price: vendor.price,
        status: vendor.status,
        contact: vendor.contact,
      },
    ]);

    if (error) {
      console.error('Erro ao adicionar fornecedor:', error.message);
      setError('Erro ao adicionar fornecedor.');  // Definir mensagem de erro
    } else {
      setVendors((prevVendors) => [...prevVendors, data[0]]);
      setShowForm(false);
      setError(null);  // Limpar erros anteriores
    }
    setLoading(false);
  };

  return (
    <section id="vendors" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Fornecedores</h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Novo Fornecedor
          </button>
        </div>

        {/* Exibir mensagem de erro, se houver */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Exibir carregando enquanto a lista é carregada */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando fornecedores...</p>
          </div>
        ) : (
          <VendorsList vendors={vendors} />
        )}

        {showForm && (
          <VendorForm
            onSubmit={handleAddVendor}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </section>
  );
}
