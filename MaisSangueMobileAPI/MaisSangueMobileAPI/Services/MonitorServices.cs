using MaisSangueMobileAPI.Interfaces;
using MaisSangueMobileAPI.Models;

namespace MaisSangueMobileAPI.Services
{
    public class MonitorServices
    {
        private readonly IMonitorRepository _monitorRepository;
        public MonitorServices(IMonitorRepository monitorRepository)
        {
            _monitorRepository = monitorRepository;
        }

        public async Task<bool> DeleteUser(int id)
        {
            return await _monitorRepository.DeleteUser(id);
        }

        public async Task<MonitorModel> GetUserByEmail(string email)
        {
            return await _monitorRepository.GetUserByEmail(email);
        }

        public async Task<bool> InsertUser(MonitorModel model)
        {
            return await _monitorRepository.InsertUser(model);
        }

        public async Task<List<MonitorModel>> ReturnAll()
        {
            return await _monitorRepository.ReturnAll();
        }

        public async Task<MonitorModel> UpdateUser(MonitorModel model)
        {
            return await _monitorRepository.UpdateUser(model);
        }
    }
}
