//URLS PARA API
const url_base="https://maissangue-ffefg8cte3gzgzes.brazilsouth-01.azurewebsites.net/"

const getAllMonitorUrl="Monitor/Todos_monitores"

const getMonitorPerEmailUrl="Monitor/Todos_monitores/email?email="

const insertNewMonitorUrl="Monitor/Registrar_monitor/"

const deleteMonitorUrl= "Monitor/Apagar_monitor/"

const updateMonitorUrl= "Monitor/Atualizar_monitor"

const getAllPacientes= "Paciente/Todos_pacientes"

const getPacienteByCpf="Paciente/Todos_pacientes/cpf?cpf="

const updatePacienteUrl="Paciente/Atualizar_paciente"

const insertPaciente = "Paciente/Registrar_paciente"
export {url_base,updatePacienteUrl,getPacienteByCpf,insertPaciente,getAllMonitorUrl,getMonitorPerEmailUrl,insertNewMonitorUrl,deleteMonitorUrl,updateMonitorUrl,getAllPacientes}