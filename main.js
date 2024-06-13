const form = document.getElementById('tareaForm');
form.addEventListener('submit', async (event) =>{
  event.preventDefault();
  //Capturo los datos
  const titulo = document.getElementById('titulo').value;
  const completada = document.getElementById('completada').checked;
  const tarea = {
    titulo:titulo,
    completada:completada,
  };
  try {
    const response = await fetch('http://localhost:3000/tareas',{
      method:'POST',
      body:JSON.stringify(tarea),
    });
    if(response.ok){
      form.reset();
      console.log('Tarea enviada');
    }
  } catch (error) {
    console.log('ERROR!!!');
  }
});
//hago la consulta
async function cargarTareas() {
  try {
      const response = await fetch('http://localhost:3000/tareas');
      if (response.ok) {
          const tareas = await response.json();
          renderTareas(tareas);
      } else {
          throw new Error('Error al obtener las tareas');
      }
  } catch (error) {
      console.log(error);
  }
}
//dibujo la table
function renderTareas(tareas){
  const tareasListHTML = tareas.map((t) => `
    <table>
    <tr>
      <th>${t.id}</th>
      <th>${t.titulo}</th>
      <th>${t.completada}</th>
    </tr>
    </table>
    `
  );
  app.innerHTML = tareasListHTML;
};
cargarTareas();