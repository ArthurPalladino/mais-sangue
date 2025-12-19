using MaisSangueMobileAPI.Models;
using MaisSangueMobileAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MaisSangueMobileAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MonitorController : ControllerBase
    {
        private readonly MonitorServices _services;
        public MonitorController(MonitorServices services)
        {
            _services = services;
        }
     
    [HttpGet("Todos_monitores")]
    public async Task<IActionResult> ReturnAll()
        {
            List<MonitorModel> users = await _services.ReturnAll();
            
            return Ok(users);
        }
        [HttpPost("Registrar_monitor")]
        public async Task<IActionResult>InsertUser(MonitorModel model)
    {
        bool result = await _services.InsertUser(model);
           return Ok(result);
        }
        [HttpGet("Todos_monitores/email")]

        public async Task<IActionResult> GetUserByEmail(string email)
        {
            MonitorModel result = await _services.GetUserByEmail(email);
            return Ok(result);

        }
        [HttpPost("Apagar_monitor")]

        public async Task<IActionResult> DeleteUser(int id)
        {
            bool result = await _services.DeleteUser(id);
            return Ok(result);

        }
        [HttpPost("Atualizar_monitor")]
        public async Task<IActionResult> UpdateUser(MonitorModel model)
        {
            MonitorModel result = await _services.UpdateUser(model);
            return Ok(result);

        }





    }
}
