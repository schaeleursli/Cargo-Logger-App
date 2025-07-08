// Folder: src/components/steps/CargoForm.tsx
import React, { useState } from 'react';
const CargoForm = ({ onNext, onBack, setCargoData }: { onNext: () => void; onBack: () => void; setCargoData: (data: any) => void }) => {
  const [form, setForm] = useState({ id: '', description: '', length: '', width: '', height: '', unit: 'cm', weight: '', weightUnit: 'kg', notes: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => { setCargoData(form); onNext(); };
  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold text-center">Enter Cargo Details</h2>
      <input name="id" placeholder="Cargo ID" onChange={handleChange} className="w-full p-2 rounded" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 rounded" />
      <div className="flex gap-2">
        <input name="length" placeholder="Length" onChange={handleChange} className="w-full p-2 rounded" />
        <input name="width" placeholder="Width" onChange={handleChange} className="w-full p-2 rounded" />
        <input name="height" placeholder="Height" onChange={handleChange} className="w-full p-2 rounded" />
        <select name="unit" value={form.unit} onChange={handleChange} className="p-2 rounded">
          <option value="cm">cm</option>
          <option value="inch">inch</option>
        </select>
      </div>
      <div className="flex gap-2">
        <input name="weight" placeholder="Weight" onChange={handleChange} className="w-full p-2 rounded" />
        <select name="weightUnit" value={form.weightUnit} onChange={handleChange} className="p-2 rounded">
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
      <textarea name="notes" placeholder="Notes" onChange={handleChange} className="w-full p-2 rounded" />
      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 bg-gray-600 text-white rounded">Back</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Next</button>
      </div>
    </div>
  );
};
export default CargoForm;
