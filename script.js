document.addEventListener('DOMContentLoaded', () => {
    // Cadastro
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        const inputSenha = document.getElementById('senha');
        const inputConfirmar = document.getElementById('confirmar-senha');
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            if (inputSenha.value !== inputConfirmar.value) {
                alert("As senhas não conferem!");
            } else {
                alert("Sucesso! Redirecionando...");
                window.location.href = "index.html";
            }
        });
    }
    // Calculo
    const formCalculo = document.getElementById('form-calculo');
    if (formCalculo) {
        const base = document.getElementById('salario-base');
        const ben = document.getElementById('beneficios');
        const desc = document.getElementById('descontos');
        const out = document.getElementById('salario-liquido-output');
        const calcular = () => {
            const valBase = parseFloat(base.value) || 0;
            const valBen = parseFloat(ben.value) || 0;
            const valDesc = parseFloat(desc.value) || 0;
            const liquido = valBase + valBen - valDesc;
            out.textContent = `R$ ${liquido.toFixed(2).replace('.', ',')}`;
        };
        base.addEventListener('input', calcular);
        ben.addEventListener('input', calcular);
        desc.addEventListener('input', calcular);
        calcular();
    }
});