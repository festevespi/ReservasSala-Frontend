import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function ReservaEditarForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    localId: '',
    salaId: '',
    dataInicio: '',
    dataFim: '',
    responsavel: '',
    cafe: false,
    quantidadePessoas: 0,
    descricao: ''
  });
  const [locais, setLocais] = useState([]);
  const [salas, setSalas] = useState([]);
  const [erros, setErros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/reservas/locais').then(res => setLocais(res.data.dados));
    api.get('/reservas/salas').then(res => setSalas(res.data.dados));
    api.get(`/reservas/${id}`).then(res => {
      const r = res.data.dados;
      setForm({
        localId: r.local?.id || '',
        salaId: r.sala?.id || '',
        dataInicio: r.dataInicio ? r.dataInicio.slice(0,16) : '',
        dataFim: r.dataFim ? r.dataFim.slice(0,16) : '',
        responsavel: r.responsavel || '',
        cafe: r.cafe || false,
        quantidadePessoas: r.quantidadePessoas || 0,
        descricao: r.descricao || ''
      });
    });
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErros([]);
    try {
      const reserva = {
        local: locais.find(l => l.id === Number(form.localId)),
        sala: salas.find(s => s.id === Number(form.salaId)),
        dataInicio: form.dataInicio,
        dataFim: form.dataFim,
        responsavel: form.responsavel,
        cafe: form.cafe,
        quantidadePessoas: form.cafe ? Number(form.quantidadePessoas) : 0,
        descricao: form.descricao
      };
      const res = await api.put(`/reservas/${id}`, reserva);
      if (res.data.erros && res.data.erros.length > 0) {
        setErros(res.data.erros);
      } else {
        navigate('/');
      }
    } catch (err) {
      setErros(['Erro ao editar reserva']);
    }
  };

  return (
    <div>
      <h2>Editar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <select name="localId" value={form.localId} onChange={handleChange} required>
          <option value="">Selecione o local</option>
          {locais.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
        </select>
        <select name="salaId" value={form.salaId} onChange={handleChange} required>
          <option value="">Selecione a sala</option>
          {salas.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
        </select>
        <input type="datetime-local" name="dataInicio" value={form.dataInicio} onChange={handleChange} required />
        <input type="datetime-local" name="dataFim" value={form.dataFim} onChange={handleChange} required />
        <input type="text" name="responsavel" value={form.responsavel} onChange={handleChange} placeholder="Responsável" required />
        <label>
          <input type="checkbox" name="cafe" checked={form.cafe} onChange={handleChange} />
          Café?
        </label>
        {form.cafe && (
          <input type="number" name="quantidadePessoas" value={form.quantidadePessoas} onChange={handleChange} placeholder="Quantidade de pessoas" min="1" />
        )}
        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
      {erros.length > 0 && (
        <ul>
          {erros.map((e, i) => <li key={i} style={{color: 'red'}}>{e}</li>)}
        </ul>
      )}
    </div>
  );
}

export default ReservaEditarForm;