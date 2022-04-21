class CrearDataset_Component {
  getDataset(grupos) {
    let num_data = 0;
    let noExiste = true;
    let dataset = [];

    grupos.forEach((element) => {
      dataset.forEach((e) => {
        if (e.label == element.nombreProfesor) {
          e.data[element.horarioDiaSemana - 1] = element.numeroAlumnos;
          noExiste = false;
        }
      });

      if (noExiste) {
        let data = {
          label: "",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(50, 115, 220, 0.1)",
          data: [0, 0, 0, 0, 0],
        };

        data.label = element.nombreProfesor;
        data.data[element.horarioDiaSemana - 1] = element.numeroAlumnos;

        dataset[num_data] = data;
        num_data++;
      }
      noExiste = true;
    });

    return dataset;
  }
}

export default new CrearDataset_Component();
