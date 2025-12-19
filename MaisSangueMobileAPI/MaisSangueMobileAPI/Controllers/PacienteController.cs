using MaisSangueMobileAPI.Models;
using MaisSangueMobileAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MaisSangueMobileAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly PacienteServices _services;
        public PacienteController(PacienteServices services)
        {
            _services = services;
        }

        [HttpGet("Todos_pacientes")]
        public async Task<IActionResult> ReturnAll()
        {
            List<PacienteModel> users = await _services.ReturnAll();

            return Ok(users);
        }
        [HttpPost("Registrar_paciente")]
        public async Task<IActionResult> InsertPaciente(PacienteModel model)
        {
            bool result = await _services.InsertPaciente(model);
            return Ok(result);
        }
        [HttpGet("Todos_pacientes/id")]

        public async Task<IActionResult> GetPacienteById(int id)
        {
            PacienteModel result = await _services.GetPacienteById(id);
            return Ok(result);

        }
        [HttpGet("Todos_pacientes/cpf")]

        public async Task<IActionResult> GetPacienteByCPF(string cpf)
        {
            PacienteModel result = await _services.GetPacienteByCpf(cpf);
            return Ok(result);

        }
        [HttpPost("Apagar_paciente")]

        public async Task<IActionResult> DeletePaciente(int id)
        {
            bool result = await _services.DeletePaciente(id);
            return Ok(result);

        }
        [HttpPost("Atualizar_paciente")]
        public async Task<IActionResult> UpdatePaciente(PacienteModel model)
        {
            PacienteModel result = await _services.UpdatePaciente(model);
            return Ok(result);

        }
    }
        }

