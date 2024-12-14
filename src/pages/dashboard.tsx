import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Caminho para o seu supabase.ts
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart as PieChartIcon, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface Budget {
  total: number;
  spent: number;
  remaining: number;
}

export function Dashboard() {
  const [budget, setBudget] = useState<Budget>({ total: 0, spent: 0, remaining: 0 });
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar o modo de edição
  const [newTotal, setNewTotal] = useState<number>(0); // Estado para o novo orçamento total

  // Função para buscar os dados do orçamento
  useEffect(() => {
    const fetchBudget = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser(); // Obtendo o usuário logado
      if (userError || !user) {
        console.error('Erro ao obter o usuário:', userError);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id) // Usando o id do usuário logado
        .single();

      if (profileError || !profileData) {
        console.error('Erro ao buscar o perfil:', profileError);
        return;
      }

      const { data, error } = await supabase
        .from('budget_items') // A tabela que armazena os itens do orçamento
        .select('estimated_amount, actual_amount')
        .eq('profile_id', profileData.id); // Filtrando pelo perfil do usuário

      if (error) {
        console.error('Erro ao buscar dados do orçamento:', error);
      } else {
        const total = data.reduce((sum, item) => sum + (item.estimated_amount || 0), 0);
        const spent = data.reduce((sum, item) => sum + (item.actual_amount || 0), 0);
        const remaining = total - spent;

        setBudget({ total, spent, remaining });
        setNewTotal(total); // Inicializando o novo total para edição
      }
    };

    fetchBudget();
  }, []);

  // Função para atualizar os valores no Supabase
  const handleSave = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser(); // Obtendo o usuário logado
    if (userError || !user) {
      console.error('Erro ao obter o usuário:', userError);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData) {
      console.error('Erro ao buscar o perfil para salvar:', profileError);
      return;
    }

    // Atualizar o valor do orçamento total na tabela
    const { error } = await supabase
      .from('budget_items')
      .upsert([{
        profile_id: profileData.id, // Passando o id correto do perfil
        estimated_amount: newTotal, // Atualizando somente o orçamento total
      }]);

    if (error) {
      console.error('Erro ao salvar os dados no Supabase:', error);
    } else {
      // Atualizar o estado após salvar
      setBudget((prevBudget) => ({
        ...prevBudget,
        total: newTotal, // Atualiza o orçamento total
        remaining: newTotal - prevBudget.spent, // Calcula o restante automaticamente
      }));
      setIsEditing(false); // Fechar o modo de edição
    }
  };

  // Função para lidar com as mudanças no orçamento total
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTotal(parseFloat(e.target.value)); // Atualiza o novo total
  };

  const data = [
    { name: 'Gasto', value: budget.spent },
    { name: 'Restante', value: budget.remaining },
  ];

  const COLORS = ['#6366f1', '#e5e7eb'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <input
                type="number"
                value={newTotal}
                onChange={handleChange}
                className="text-2xl font-bold w-full"
              />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(budget.total)}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Gasto</CardTitle>
            <PieChartIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(budget.spent)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Restante</CardTitle>
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(budget.remaining)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribuição do Orçamento</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Próximos Compromissos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">Reunião com Fotógrafo</p>
                  <p className="text-sm text-gray-500">15 de Março, 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">Prova do Vestido</p>
                  <p className="text-sm text-gray-500">20 de Março, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão para salvar as alterações */}
      {isEditing && (
        <div className="mt-4 text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}
