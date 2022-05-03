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

      //  Math.random() * (max - min) + min; -> Retorna un número aleatorio entre min (incluido) y max (excluido)
      //  Math.random() * (256 - 0)
      if (noExiste) {
        let rojoRGB = Math.random() * (256 - 0);
        let verdeRGB = Math.random() * (256 - 0);
        let azulRGB = Math.random() * (256 - 0);

        let data = {
          label: "",
          borderColor: "rgba(0, 0, 0, 1)",
          backgroundColor:
            "rgba(" + rojoRGB + ", " + verdeRGB + ", " + azulRGB + ", 0.75)",
          data: [0, 0, 0, 0, 0],
          borderWidth: 0.5,
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
