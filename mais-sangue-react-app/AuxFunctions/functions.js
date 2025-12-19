function checkCpf(cpftoFormat) {
    cpftoFormat = cpftoFormat.replace(/[^\d]+/g, '');
    if (cpftoFormat.length !== 11 || /^(\d)\1{10}$/.test(cpftoFormat)) {
        return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpftoFormat.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpftoFormat.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpftoFormat.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpftoFormat.charAt(10))) {
        return false;
    }
    return true;
}


function checkDate(data) {
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataValida = new Date(ano, mes - 1, dia);
    if (dataValida.getDate() !== dia || dataValida.getMonth() !== mes - 1 || dataValida.getFullYear() !== ano) {
        return false;
    }
    const anoAtual = new Date().getFullYear();
    if (ano > anoAtual) {
        return false;
    }

    return true;
}
function checkEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}



export {checkCpf,checkDate,checkEmail}
