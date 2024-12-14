// src/components/Profile.tsx
import { useState, useEffect } from 'react';
import { getProfile, createProfile, calculateTotalSpent } from '../lib/database.types';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row'] | null>(null);
  const [weddingDate, setWeddingDate] = useState<string | null>(null);
  const [totalBudget, setTotalBudget] = useState<number | null>(null);
  const userId = supabase.auth.user()?.id; // Pegue o ID do usuário autenticado

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const profileData = await getProfile(userId);
        setProfile(profileData);
        setWeddingDate(profileData?.wedding_date || null);
        setTotalBudget(profileData?.total_budget || null);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleCreateProfile = async () => {
    if (userId) {
      const createdProfile = await createProfile(userId, weddingDate, totalBudget);
      setProfile(createdProfile);
      alert('Perfil criado com sucesso!');
    }
  };

  const handleCalculateTotalSpent = async () => {
    if (userId) {
      const totalSpent = await calculateTotalSpent(userId);
      alert(`Total gasto: R$ ${totalSpent.toFixed(2)}`);
    }
  };

  if (!profile) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div>
      <h1>Perfil do Casamento</h1>
      <div>
        <label>Data do Casamento:</label>
        <input 
          type="date" 
          value={weddingDate || ''} 
          onChange={(e) => setWeddingDate(e.target.value || null)} 
        />
      </div>
      <div>
        <label>Orçamento Total:</label>
        <input 
          type="number" 
          value={totalBudget || ''} 
          onChange={(e) => setTotalBudget(parseFloat(e.target.value) || null)} 
        />
      </div>
      <button onClick={handleCreateProfile}>Criar Perfil</button>
      <button onClick={handleCalculateTotalSpent}>Calcular Total Gasto</button>
    </div>
  );
}
