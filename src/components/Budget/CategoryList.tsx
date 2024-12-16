import React, { useState, useEffect } from 'react';
import { CategoryItem } from './CategoryItem';
import { PlusCircle } from 'lucide-react';
import { Category } from '../../types/budget';
import { supabase } from '../../lib/supabase';


export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar categorias do Supabase
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from('categories').select('*');
    setLoading(false);

    if (error) {
      setError('Erro ao carregar categorias');
      console.error('Erro ao carregar categorias:', error.message);
    } else {
      setCategories(data || []);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Adicionar nova categoria
  const handleAddCategory = async (category: Omit<Category, 'id'>) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name: category.name,
        description: category.description,
        amount: category.amount,
      }]);

    setLoading(false);

    if (error) {
      setError('Erro ao adicionar categoria');
      console.error('Erro ao adicionar categoria:', error.message);
    } else {
      // Atualiza o estado de categorias sem a necessidade de uma nova consulta
      setCategories((prevCategories) => [...prevCategories, data[0]]);
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Categorias</h3>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nova Categoria
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))
        )}
      </div>

      {showForm && (
        <CategoryForm
          onSubmit={handleAddCategory}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
