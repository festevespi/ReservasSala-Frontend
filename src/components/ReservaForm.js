import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function ReservaForm() {
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
  const { register, formState: { errors } } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/reservas/locais').then(res => setLocais(res.data.dados));
    api.get('/reservas/salas').then(res => setSalas(res.data.dados));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  function mapearErros(errosBackend) {
    const errosCampos = {};
    errosBackend.forEach(msg => {
      if (msg.includes('local')) errosCampos.localId = msg;
      else if (msg.includes('sala')) errosCampos.salaId = msg;
      else if (msg.includes('café') || msg.includes('pessoas')) errosCampos.quantidadePessoas = msg;
      else if (msg.includes('início')) errosCampos.dataInicio = msg;
      else if (msg.includes('fim')) errosCampos.dataFim = msg;
      else if (msg.includes('datas no passado')) errosCampos.dataInicio = msg;
      else if (msg.includes('responsável')) errosCampos.responsavel = msg;
    });
    return errosCampos;
  }

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
      const res = await api.post('/reservas', reserva);
      if (res.data.erros && res.data.erros.length > 0) {
        setErros(mapearErros(res.data.erros));
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && Array.isArray(err.response.data.erros)) {
        setErros(mapearErros(err.response.data.erros));
      } else {
        setErros({ geral: 'Erro de comunicação com o servidor' });
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nova Reserva</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Local</label>
          <select className="form-select" name="localId" value={form.localId} onChange={handleChange} required>
            <option value="">Selecione o local</option>
            {locais.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
          </select>
          {errors.localId && <span className="text-danger">{errors.localId.message}</span>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Sala</label>
          <select className="form-select" name="salaId" value={form.salaId} onChange={handleChange} required>
            <option value="">Selecione a sala</option>
            {salas.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
          {erros.salaId && <div className="text-danger">{erros.salaId}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Data Início</label>
          <input className="form-control" type="datetime-local" name="dataInicio" value={form.dataInicio} onChange={handleChange} required />
          {erros.dataInicio && <div className="text-danger">{erros.dataInicio}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Data Fim</label>
          <input className="form-control" type="datetime-local" name="dataFim" value={form.dataFim} onChange={handleChange} required />
          {errors.dataFim && <span className="text-danger">{errors.dataFim}</span>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Responsável</label>
          <input className="form-control" type="text" name="responsavel"
            {...register("responsavel", { required: "Informe o responsável." })}
            value={form.responsavel} onChange={handleChange} required />
          {errors.responsavel && <span className="text-danger">{errors.responsavel}</span>}
        </div>
        <div className="col-md-2">
          <div className="form-check mt-4">
            <input className="form-check-input" type="checkbox" name="cafe" checked={form.cafe} onChange={handleChange} />
            <label className="form-check-label">&nbsp;Café?</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mt-4"></div>
          {form.cafe && (
            <input className="form-control" type="number" name="quantidadePessoas" value={form.quantidadePessoas} onChange={handleChange} placeholder="Quantidade de pessoas" min="1" />
          )}
          {errors.quantidadePessoas && <span className="text-danger">{errors.quantidadePessoas}</span>}
        </div>
        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea className="form-control" name="descricao" value={form.descricao} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button className="btn btn-success me-2" type="submit">Salvar</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
      {erros.length > 0 && (
        <div className="alert alert-danger mt-3">
          <ul className="mb-0">
            {erros.map((e, i) => <li key={i} style={{color: 'red'}}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReservaForm;