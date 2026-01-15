
import React from 'react';
import { Pet } from '../types';
import { ChevronRight, Calendar, Heart, Weight, Settings2 } from 'lucide-react';

interface PetProfileListProps {
  pets: Pet[];
  onAddPet: () => void;
}

const PetProfileList: React.FC<PetProfileListProps> = ({ pets, onAddPet }) => {
  return (
    <div className="px-6 py-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Your Companions</h2>
        <button onClick={onAddPet} className="p-2 bg-slate-100 rounded-xl">
          <Settings2 className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="space-y-6">
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-start gap-5">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-slate-50 flex-shrink-0">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">{pet.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-wider">{pet.breed}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-2 rounded-2xl flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{pet.age} Years</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-2xl flex items-center gap-2">
                    <Weight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{pet.weight} kg</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p className="text-xs font-medium text-slate-500">Healthy status</p>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-wider hover:translate-x-1 transition-transform">
                Full Profile <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onAddPet}
        className="w-full py-5 rounded-[2.5rem] bg-indigo-50 border-2 border-dashed border-indigo-200 text-indigo-600 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        Add New Friend
      </button>
    </div>
  );
};

const PlusCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default PetProfileList;
