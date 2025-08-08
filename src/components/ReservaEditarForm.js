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
        dataInicio: r.data_inicio ? r.data_inicio.slice(0,16) : '',
        dataFim: r.data_fim ? r.data_fim.slice(0,16) : '',
        responsavel: r.responsavel || '',
        cafe: r.servir_cafe || false,
        quantidadePessoas: r.quantidade_pessoas || 0,
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
        data_inicio: form.dataInicio,
        data_fim: form.dataFim,
        responsavel: form.responsavel,
        servir_cafe: form.cafe,
        quantidade_pessoas: form.cafe ? Number(form.quantidadePessoas) : 0,
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
    <div className="container mt-4">
      <h2>Editar Reserva</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Local</label>
          <select className="form-select" name="localId" value={form.localId} onChange={handleChange} required>
            <option value="">Selecione o local</option>
            {locais.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Sala</label>
          <select className="form-select" name="salaId" value={form.salaId} onChange={handleChange} required>
            <option value="">Selecione a sala</option>
            {salas.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Data Início</label>
          <input className="form-control" type="datetime-local" name="dataInicio" value={form.dataInicio} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Data Fim</label>
          <input className="form-control" type="datetime-local" name="dataFim" value={form.dataFim} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Responsável</label>
          <input className="form-control" type="text" name="responsavel" value={form.responsavel} onChange={handleChange} placeholder="Responsável" required />
        </div>
        <div className="col-md-2">
          <div className='mt-4'></div>
          <input className="form-check-input" type="checkbox" name="cafe" checked={form.cafe} onChange={handleChange} />
          <label className="form-check-label">&nbsp;Café?</label>
        </div>
        <div className="col-md-4">
          <div className='mt-4'></div>
           {form.cafe && (
            <input className="form-control" type="number" name="quantidadePessoas" value={form.quantidadePessoas} onChange={handleChange} placeholder="Quantidade de pessoas" min="1" />
          )}
        </div>
        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea className="form-control" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
        </div>
        <div className="col-12">
          <button className="btn btn-success me-2" type="submit">Salvar</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
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