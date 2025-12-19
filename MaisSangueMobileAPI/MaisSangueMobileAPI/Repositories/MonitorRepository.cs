using MaisSangueMobileAPI.Interfaces;
using MaisSangueMobileAPI.Models;
using Dapper;
using System.Data;

namespace MaisSangueMobileAPI.Repositories
{
    public class MonitorRepository : IMonitorRepository
    {
        private readonly IDbConnection _dbContext;
        public MonitorRepository(IDbConnection dbConnection)
        {
                _dbContext = dbConnection;
        }

        private readonly IDbConnection _dbConnection;



        public  async Task<bool> DeleteUser(int id)
        {
            

                var builder = new SqlBuilder();

                var template = builder.AddTemplate($"Delete from login where cd_usuario=@id");
                builder.AddParameters(new { id = id });

                await _dbContext.QueryFirstOrDefaultAsync(template.RawSql, template.Parameters);
                return true;
            

        }

        public async Task<MonitorModel> GetUserByEmail(string email)
        {

                var builder = new SqlBuilder();
                var template = builder.AddTemplate($"select * from login /**where**/");
                builder.Where(" nm_email = @Email ", new { Email = email });

                MonitorModel usuario = await _dbContext.QueryFirstOrDefaultAsync<MonitorModel>(template.RawSql, template.Parameters);
                return usuario;
            
        }

        public async Task<bool> InsertUser(MonitorModel model)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate($"INSERT INTO login (nm_usuario, nm_email, dt_nascimento, dt_criacao_conta, nm_senha) VALUES (@nome, @email, @dtnascimento, NOW(), @senha)");
            builder.AddParameters(new { nome = model.nm_usuario, email = model.nm_email, dtnascimento = model.dt_nascimento,senha=model.nm_senha});
            await _dbContext.QueryFirstOrDefaultAsync(template.RawSql, template.Parameters);
            return true;
        }

        public async Task<List<MonitorModel>> ReturnAll()
        {
            var query = "Select * from login;";
       
                IEnumerable<MonitorModel> usuarios = await _dbContext.QueryAsync<MonitorModel>(query);
                return usuarios.ToList();
            
        }
        public async Task<MonitorModel> UpdateUser(MonitorModel model)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate("update login set nm_usuario=@nome , nm_email=@email , dt_nascimento=@dtnascimento, nm_senha=@senha where cd_usuario=@cd_usuario");
            builder.AddParameters(new { nome = model.nm_usuario, email = model.nm_email, dtnascimento = model.dt_nascimento, senha = model.nm_senha, cd_usuario=model.cd_usuario});
            await _dbContext.QueryAsync(template.RawSql, template.Parameters);
            MonitorModel usuario = await GetUserByEmail(model.nm_email);
            return usuario;
        }
    }
}
