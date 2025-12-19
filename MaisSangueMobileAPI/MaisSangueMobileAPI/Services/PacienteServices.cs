using MaisSangueMobileAPI.Interfaces;
using MaisSangueMobileAPI.Models;

namespace MaisSangueMobileAPI.Services
{
    public class PacienteServices
    {
        private readonly IPacienteRepository _services;
        public PacienteServices(IPacienteRepository services)
        {
            _services = services;
        }

        public async Task<bool> DeletePaciente(int id)
        {
            return await _services.DeletePaciente(id);
        }

        public async Task<PacienteModel> GetPacienteByCpf(string cpf)
        {
            return await _services.GetPacienteByCpf(cpf);
        }

        public async Task<PacienteModel> GetPacienteById(int id)
        {
            return await _services.GetPacienteById(id);
                }

        public async Task<bool> InsertPaciente(PacienteModel model)
        {
            return await _services.InsertPaciente(model);
        }

        public async Task<List<PacienteModel>> ReturnAll()
        {
            return await _services.ReturnAll();
        }

        public async Task<PacienteModel> UpdatePaciente(PacienteModel model)
        {
            return await _services.UpdatePaciente(model);
        }
    }
}
