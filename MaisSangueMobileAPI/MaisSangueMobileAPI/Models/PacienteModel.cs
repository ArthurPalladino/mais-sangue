namespace MaisSangueMobileAPI.Models
{
    public class PacienteModel
    {
        public int id_paciente {  get; set; }
        public string nm_paciente { get; set; }
        public string nm_email_paciente { get; set; }
        public string nu_celular_paciente { get; set; }
        public string dt_nascimento_paciente { get; set; }
        public string ic_genero_paciente { get; set; }
        public string cd_tipo_sanguineo { get; set; }
        public string nu_cpf_paciente { get; set; }
        public string obs_paciente { get; set; }
        public string dt_cadastro { get; set; }
    }
}
