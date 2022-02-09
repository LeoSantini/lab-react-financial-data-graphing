import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export function Graph() {


    // Atribuir todos os States antes de iniciar qualquer função ou effect.

    // Atribuir a URL da API a um link que possa ser editável futuramente.
    const [link, setLink] = useState("http://api.coindesk.com/v1/bpi/historical/close.json")
    // dataApi vai receber todos os dados de retorno da API, formato key: value.
    const [dataApi, setDataApi] = useState({
        "dia": "valorBitcoin"
    })
    // chart será armazenado o gráfico.
    const [chart, setChart] = useState()

    // Inicio API.
    // Executa a renderização quando carregar a página.
    useEffect(() =>{

        // Consumir a API externa de forma assíncrona.
        async function getUser() { // 
            try {
                const result = await axios.get(link);
                console.log(result); // Exibe no console o resultado de success API.
                // Atualiza a  dataApi.
                setDataApi(result.data.bpi)
            } catch (error) {
                console.error(error); // Exibe no console o resultado de error API.
            }
        }
        // invoca a função getUser()
        getUser();
    }, [link]) // dependências, toda vez que o link alterar roda o useEffect e renderiza novamente.

    console.log(dataApi)
    // Fim API.


    // Inicio Chart.Js.
    // Executa a renderização do gráfico.
    useEffect(() => {

        // Instrução da documentação Chart.js.
        function RenderChart() {

            // Verifica se há um gráfico criado antes de criar um novo, e caso esteja ele apaga o gráfico.
            if(chart) {
                chart.destroy()
            }

            // instanciar um novo chart, baseado no Chart.Js.
            const myChart = new Chart(
                document.getElementById('myChart'),
                // config dos inputs do gráfico
                {   type: 'line', // Tipo do Gráfico
                    data: { 
                            labels: Object.keys(dataApi), // Eixo X
                            datasets: [{
                                        label: 'Bitcoin Price', // Nome da linha
                                        data: Object.values(dataApi) // Eixo Y
                            }]
                    }}
            ); 
            // Atualiza o valor do chart para o novo gráfico criado.
            setChart(myChart)

                        
        }

        // Invoca a função RenderChart()
        RenderChart();
    }, [])
    // Fim Chart.Js

    return(
        <div>
            <canvas id="myChart"></canvas> {/*instrução do chart.js para renderizar um gráfico no html*/}
        </div>
    )
}