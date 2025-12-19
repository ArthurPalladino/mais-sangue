using Dapper;
using MaisSangueMobileAPI.Interfaces;
using MaisSangueMobileAPI.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using System.Data;

namespace MaisSangueMobileAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        private readonly IDbConnection _dbContext;

        public PacienteRepository(IDbConnection dbContext)
        {
                _dbContext = dbContext;
        }
        public async Task<bool> DeletePaciente(int id)
        {

            var builder = new SqlBuilder();

            var template = builder.AddTemplate($"Delete from pacientes where id_paciente=@id_paciente");
            builder.AddParameters(new { id_paciente = id });
            await _dbContext.QueryFirstOrDefaultAsync(template.RawSql, template.Parameters);
            return true;
        }

        public async Task<PacienteModel> GetPacienteByCpf(string cpf)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate($"select * from pacientes /**where**/");
            builder.Where(" nu_cpf_paciente = @cpf", new { cpf=cpf});

            PacienteModel paciente = await _dbContext.QueryFirstOrDefaultAsync<PacienteModel>(template.RawSql, template.Parameters);
            return paciente;
        }

        public async Task<PacienteModel> GetPacienteById(int id)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate($"select * from pacientes /**where**/");
            builder.Where(" id_paciente = @id_paciente", new { id_paciente = id});

            PacienteModel paciente = await _dbContext.QueryFirstOrDefaultAsync<PacienteModel>(template.RawSql, template.Parameters);
            return paciente;
        }

        public async Task<bool> InsertPaciente(PacienteModel model)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate($"INSERT INTO pacientes (nm_paciente, nm_email_paciente, nu_celular_paciente, dt_nascimento_paciente, ic_genero_paciente,cd_tipo_sanguineo,nu_cpf_paciente,obs_paciente,dt_cadastro) VALUES (@nome, @email, @nucelular, @dtnascimento, @icgenero,@cdsangue,@cpf,@obs,Now())");
            builder.AddParameters(new { nome=model.nm_paciente, email=model.nm_email_paciente, nucelular=model.nu_celular_paciente, dtnascimento=model.dt_nascimento_paciente, icgenero=model.ic_genero_paciente, cdsangue=model.cd_tipo_sanguineo, cpf=model.nu_cpf_paciente, obs=model.obs_paciente });
            await _dbContext.QueryFirstOrDefaultAsync(template.RawSql, template.Parameters);
            return true;
        }

        public async Task<List<PacienteModel>> ReturnAll()
        {
            var query = "Select * from pacientes;";
            IEnumerable<PacienteModel> pacientes = await _dbContext.QueryAsync<PacienteModel>(query);
            return pacientes.ToList();


        }
            public async Task<PacienteModel> UpdatePaciente(PacienteModel model)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate("update pacientes set nm_paciente=@nome , nm_email_paciente=@email ,nu_celular_paciente=@nu_celular, dt_nascimento_paciente=@dtnascimento, nu_cpf_paciente=@cpf, ic_genero_paciente=@genero,cd_tipo_sanguineo=@tp_sangue,obs_paciente=@obs where id_paciente=@id_paciente");     
            builder.AddParameters(new { nome= model.nm_paciente, email=model.nm_email_paciente ,nu_celular=model.nu_celular_paciente, dtnascimento=model.dt_nascimento_paciente,cpf=model.nu_cpf_paciente,genero=model.ic_genero_paciente, tp_sangue=model.cd_tipo_sanguineo, obs=model.obs_paciente, id_paciente=model.id_paciente });
            await _dbContext.QueryAsync(template.RawSql, template.Parameters);
            PacienteModel paciente = await GetPacienteById(model.id_paciente);
            return paciente;
        }
    }
}
