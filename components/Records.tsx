
import React from 'react';
import { Pet } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart2, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface RecordsProps {
  pets: Pet[];
}

const data = [
  { month: 'Jan', weight: 26 },
  { month: 'Feb', weight: 26.5 },
  { month: 'Mar', weight: 27.2 },
  { month: 'Apr', weight: 27.8 },
  { month: 'May', weight: 28 },
  { month: 'Jun', weight: 28.2 },
];

const Records: React.FC<RecordsProps> = ({ pets }) => {
  return (
    <div className="px-6 py-6 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-800">Health Records</h2>
        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Monitoring your pets' vitals</p>
      </div>

      {/* Weight Chart Card */}
      <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 rounded-2xl">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Weight Tracker</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Luna • Last 6 Months</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-500">+1.2kg</span>
            <p className="text-[9px] text-slate-400 font-bold uppercase">Since Jan</p>
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }}
                cursor={{ stroke: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Upcoming Vaccinations */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Medical Timeline</h3>
        <div className="space-y-4">
          <div className="relative pl-8 space-y-4">
            {/* Timeline Line */}
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100"></div>
            
            <TimelineItem 
              title="Rabies Vaccination" 
              date="Feb 20, 2024" 
              status="Completed" 
              petName="Luna" 
              color="emerald" 
            />
            <TimelineItem 
              title="Flea & Tick Prevention" 
              date="Today, Mar 15" 
              status="Due Soon" 
              petName="Milo" 
              color="amber" 
              active
            />
            <TimelineItem 
              title="Annual Health Checkup" 
              date="Apr 12, 2024" 
              status="Scheduled" 
              petName="Luna" 
              color="indigo" 
            />
          </div>
        </div>
      </section>

      {/* Health Alert */}
      <div className="bg-rose-50 rounded-[2rem] p-5 flex gap-4 items-start border border-rose-100">
        <div className="p-2 bg-rose-100 rounded-xl">
          <AlertCircle className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Health Notice</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">Milo is slightly behind on his weight gain target for his breed. Consider a higher calorie diet or consult our AI chat.</p>
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  title: string;
  date: string;
  status: string;
  petName: string;
  color: 'emerald' | 'amber' | 'indigo' | 'slate';
  active?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, status, petName, color, active }) => {
  const colorMap = {
    emerald: 'bg-emerald-500 ring-emerald-100',
    amber: 'bg-amber-500 ring-amber-100',
    indigo: 'bg-indigo-500 ring-indigo-100',
    slate: 'bg-slate-300 ring-slate-50',
  };

  return (
    <div className="relative">
      <div className={`absolute -left-8 top-1.5 w-4 h-4 rounded-full ring-4 z-10 ${colorMap[color]}`}></div>
      <div className={`bg-white p-4 rounded-2xl border transition-all ${active ? 'border-indigo-200 shadow-sm' : 'border-slate-100'}`}>
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
            color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
            color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
          }`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Calendar className="w-3 h-3 text-slate-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date} • {petName}</p>
        </div>
      </div>
    </div>
  );
};

export default Records;
