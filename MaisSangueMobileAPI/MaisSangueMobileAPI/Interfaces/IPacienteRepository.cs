using MaisSangueMobileAPI.Models;

namespace MaisSangueMobileAPI.Interfaces
{
    public interface IPacienteRepository
    {
        Task<List<PacienteModel>> ReturnAll();
        Task<bool> InsertPaciente(PacienteModel model);

        Task<PacienteModel> GetPacienteById(int id);
        Task<bool> DeletePaciente(int id);
        Task<PacienteModel> UpdatePaciente(PacienteModel model);
        Task<PacienteModel> GetPacienteByCpf(string cpf);
    }
}
