// Função para calcular o INSS
function calcularINSS(salarioBruto) {
    let desconto = 0;
    // Tabela simplificada de exemplo
    if (salarioBruto <= 1412.00) {
        desconto = salarioBruto * 0.075;
    } else if (salarioBruto <= 2666.68) {
        desconto = salarioBruto * 0.09;
    } else if (salarioBruto <= 4000.03) {
        desconto = salarioBruto * 0.12;
    } else {
        desconto = salarioBruto * 0.14; 
    }
    
    // Teto do INSS (exemplo aproximado)
    if (desconto > 908.85) {
        desconto = 908.85;
    }
    
    return desconto;
}

// Função Principal que roda ao clicar no botão
document.getElementById('payrollForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Não recarrega a página
    
    // 1. Pegar os valores que o usuário digitou
    let nome = document.getElementById('nome').value;
    let salarioBruto = parseFloat(document.getElementById('salarioBruto').value);
    let horasExtras = parseFloat(document.getElementById('horasExtras').value);
    let faltas = parseFloat(document.getElementById('faltas').value);
    let beneficios = parseFloat(document.getElementById('beneficios').value);

    // Se algum campo estiver vazio ou inválido, consideramos 0
    if (isNaN(horasExtras)) horasExtras = 0;
    if (isNaN(faltas)) faltas = 0;
    if (isNaN(beneficios)) beneficios = 0;

    // 2. Fazer os Cálculos
    // Valor da hora extra (exemplo: hora normal + 50%)
    let valorHora = salarioBruto / 220;
    let valorTotalHorasExtras = horasExtras * (valorHora * 1.5);
    
    let salarioBaseCalculo = salarioBruto + valorTotalHorasExtras;
    
    let descontoINSS = calcularINSS(salarioBaseCalculo);
    let salarioLiquido = salarioBaseCalculo - descontoINSS - faltas - beneficios;

    // 3. Mostrar no Site (Atualizar o HTML)
    let areaResultado = document.getElementById('resultadoArea');
    areaResultado.style.display = 'block'; // Faz a caixa aparecer
    
    document.getElementById('outNome').textContent = nome;
    
    let htmlDetalhes = `
        <p>Salário Bruto: R$ ${salarioBruto.toFixed(2)}</p>
        <p>+ Horas Extras: R$ ${valorTotalHorasExtras.toFixed(2)}</p>
        <p class="desconto">(-) INSS: R$ ${descontoINSS.toFixed(2)}</p>
        <p class="desconto">(-) Faltas: R$ ${faltas.toFixed(2)}</p>
        <p class="desconto">(-) Benefícios: R$ ${beneficios.toFixed(2)}</p>
        <hr>
        <p class="total"><strong>Líquido a Receber: R$ ${salarioLiquido.toFixed(2)}</strong></p>
    `;
    
    document.getElementById('holeriteDetalhes').innerHTML = htmlDetalhes;
});