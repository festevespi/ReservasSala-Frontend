import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import api from '../services/api';

function ReservasListagem() {
  const [reservas, setReservas] = useState([]);
  const [excluirId, setExcluirId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarReservas();
  }, []);

  const carregarReservas = () => {
    api.get('/reservas')
      .then(response => setReservas(response.data.dados))
      .catch(error => console.error(error));
  };

  const handleExcluir = async (id) => {
    await api.delete(`/reservas/${id}`);
    setExcluirId(null);
    carregarReservas();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reservas</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/reservas/inserir')}>Nova Reserva</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sala</th>
            <th>Local</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r.id}>
              <td>{r.sala.nome}</td>
              <td>{r.local.nome}</td>
              <td>{format(new Date(r.data_inicio), 'dd/MM/yyyy HH:mm')}</td>
              <td>{format(new Date(r.data_fim), 'dd/MM/yyyy HH:mm')}</td>
              <td>{r.responsavel}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/reservas/editar/${r.id}`)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => setExcluirId(r.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {excluirId && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmação</h5>
                <button type="button" className="btn-close" onClick={() => setExcluirId(null)}></button>
              </div>
              <div className="modal-body">
                <p>Deseja realmente excluir esta reserva?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={() => handleExcluir(excluirId)}>Sim</button>
                <button className="btn btn-secondary" onClick={() => setExcluirId(null)}>Não</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservasListagem;