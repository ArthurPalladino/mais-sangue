using MaisSangueMobileAPI.Models;

namespace MaisSangueMobileAPI.Interfaces
{
    public interface IMonitorRepository
    {
        Task<List<MonitorModel>> ReturnAll();
        Task<bool> InsertUser(MonitorModel model);
        Task<MonitorModel> GetUserByEmail(string email);
        Task<bool> DeleteUser(int id);
        Task<MonitorModel> UpdateUser (MonitorModel model);
    }
}
