class CrearDatasetGrupos_Component {
  getDataset() {
    let datosGrafico = {
      options: {
        chart: {
          type: "bar",
          height: 550,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "Horas",
          data: [],
        },
      ],
    };
    return datosGrafico;
  }
}

export default new CrearDatasetGrupos_Component();
