// criei esse arquivo para justamente fazer a lógica de aplicação, ele vai processar os dados antes de enviar eles pro model ou controller


module.exports = {
    calcularEntrega: (pedido) => {
        const valorDistancia = pedido.distanciaKm * pedido.valorBaseKm;
        const valorPeso = pedido.pesoKg * pedido.valorBaseKg;

        let valorBase = valorDistancia + valorPeso;

        // acréscimo
        let acrescimo = pedido.tipoEntrega === 'urgente'
            ? valorBase * 0.20
            : 0;

        let valorFinal = valorBase + acrescimo;

        // desconto
        let desconto = valorFinal > 500 ? valorFinal * 0.10 : 0;
        valorFinal -= desconto;

        // taxa extra por peso
        let taxaExtra = pedido.pesoKg > 50 ? 15 : 0;
        valorFinal += taxaExtra;

        return {
            valorDistancia, valorPeso, acrescimo, desconto, taxaExtra, valorFinal
        };
    }
};