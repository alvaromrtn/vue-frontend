class CrearDatasetGrupos_Component {
  getDataset() {
    let datosGrafico = {
      options: {
        labels: [],
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      series: [],
    };

    return datosGrafico;
  }
}

export default new CrearDatasetGrupos_Component();
