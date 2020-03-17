var app2 = new Vue({
    el: '#app2',
    data: {
        marcas: null,
        marca: null,
        modelos: null,
        modelo: null,
        anos: null,
        ano: null,
        versoes: null,
        versao: null,
        versaoId: null,
        descricaoVeiculo: null,
    },
    mounted () {
        axios
            .get('https://volanty-price-api.herokuapp.com/brands')
            .then(response => this.marcas = response.data)
    },
    methods: {
        defineValor: function (valor, tipo) {
            if (tipo == 'marca') {
                this.marca = valor;
                this.anos = null
                this.versoes = null
                this.versao = null
                axios
                    .get('https://volanty-price-api.herokuapp.com/brands/' + this.marca + '/models')
                    .then(response => this.modelos = response.data)
            }
            if (tipo == 'modelo') {
                this.modelo = valor
                this.versoes = null
                this.versao = null
                axios
                    .get('https://volanty-price-api.herokuapp.com/brands/' + this.marca + '/models/' + this.modelo + '/years')
                    .then(response => this.anos = response.data)
            }
            if (tipo == 'ano') {
                this.ano = valor
                this.versao = null
                axios
                    .get('https://volanty-price-api.herokuapp.com/brands/' + this.marca + '/models/' + this.modelo + '/years/'
                                                                            + this.ano + '/versions')
                    .then(response => this.versoes = response.data)
            }
            if (tipo == 'versao') {
                this.versao = valor
                for(var i in this.versoes) {
                    if (this.versao == this.versoes[i].version) {
                        this.versaoId = this.versoes[i].versionId
                    }
                }
            }
        },
        identificaVeiculo: function() {
            axios
                .get('https://volanty-price-api.herokuapp.com/brands/' + this.marca + '/models/' + this.modelo + '/years/'
                    + this.ano + '/versions/' + this.versaoId)
                .then(response => this.descricaoVeiculo = response.data)
        }
    }
})

Vue.component('dropdown-list', {
    props: ['propriedades', 'tipo'],
    template:  `
                <div class="input-group mb-3" style=" margin-top: 20px">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">{{tipo}}</label>
                    </div>
                    <select v-on:click = "$emit('define-valor', $event.target.value, tipo)" class="custom-select" id="inputGroupSelect01">
                        <option selected>Escolha...</option>
                        <option v-if="tipo == 'versao'" v-for="propriedade in propriedades" >{{ propriedade.version }}</option>                        -->
                        <option v-if="tipo == 'marca'" v-for="propriedade in propriedades" >{{ propriedade }}</option>
                        <option v-if="tipo == 'modelo'" v-for="propriedade in propriedades" >{{ propriedade }}</option>
                        <option v-if="tipo == 'ano'" v-for="propriedade in propriedades" >{{ propriedade }}</option>                        
                    </select>
                </div>
                `
})


Vue.component('infos-carro', {
    props: ['infos'],
    template: `            
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel" style="text-align:center">Informações sobre o veículo</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h3 class="card-subtitle mb-2 text-muted" style="text-align: center">{{infos.brand}}</h3>
                                <h4 class="card-subtitle mb-2 text-muted" style="text-align: center">{{infos.model}}</h4>
                                <ul class="list-group">
                                    <li class="list-group-item">Preço mínimo: R$ {{infos.precoMinimo}}</li>
                                    <li class="list-group-item">Preço médio: R$ {{infos.precoMedio}}</li>                           
                                    <li class="list-group-item">Teto do preço médio: R$ {{infos.tetoPrecoMedio}}</li>
                                    <li class="list-group-item">Piso do preço médio: R$ {{infos.pisoPrecoMedio}}</li>
                                    <li class="list-group-item">Teto do preço médio da Volanty: R$ {{infos.tetoPrecoMedioVolanty}}</li>
                                    <li class="list-group-item">Piso do preço médio da Volanty: R$ {{infos.pisoPrecoMedioVolanty}}</li>
                                    <li class="list-group-item">Preço máximo: R$ {{infos.precoMaximo}}</li>
                                    <li class="list-group-item">Razão preço máximo médio: {{infos.razaoPrecoMaximoMedio}}</li>
                                    <li class="list-group-item">Teto do preço médio da Volanty: R$ {{infos.tetoPrecoConcessionaria}}</li>
                                    <li class="list-group-item">Piso do preço médio da Volanty: R$ {{infos.pisoPrecoConcessionaria}}</li>
                                    <li class="list-group-item">Média de kilometros rodados: {{infos.kmMedio}}</li>
                                    <li class="list-group-item">Quantidade: {{infos.qtd}}</li>
                                    <li class="list-group-item">Versão: {{infos.version}}</li>
                                    <li class="list-group-item">Ano do modelo: {{infos.modelYear}}</li>                          
                                </ul>                  
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
              `
})
