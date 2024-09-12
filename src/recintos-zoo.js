class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const especie = this.animais[animal];
        const tamanhoTotal = especie.tamanho * quantidade;
        let recintosViaveis = [];

        for (const recinto of this.recintos) {
            let espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
            let espacoLivre = recinto.tamanho - espacoOcupado;
            if (!especie.bioma.includes(recinto.bioma)) continue;
            if (especie.carnivoro && recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== animal)) {
                continue;
            }
            if (recinto.animais.some(a => a.especie === 'HIPOPOTAMO') && recinto.bioma !== 'savana e rio') {
                continue;
            }
            if (recinto.animais.length > 0 && recinto.animais.some(a => this.animais[a.especie].carnivoro && a.especie !== animal)) {
                continue;
            }
            if (animal === 'MACACO' && quantidade >= 1 && recinto.animais.length === 0) {
                continue;
            }
            let especiesDiferentes = recinto.animais.some(a => a.especie !== animal);
            if (especiesDiferentes) {
                espacoLivre -= 1;
            }
            if (espacoLivre >= tamanhoTotal) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoTotal} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };