const form = document.getElementById('tareaForm');
const table = document.getElementById('table');
form.addEventListener('submit', async (event) =>{
  event.preventDefault();
  //Capturo los datos
  const titulo = document.getElementById('titulo').value;
  const completada = document.getElementById('completada').checked;
  var mostrarTablero = false;
  const tarea = {
    titulo:titulo,
    completada:completada,
  };
  if(mostrarTablero = true)
  try {
    const response = await fetch('http://localhost:3000/tareas',{
      method:'POST',
      body:JSON.stringify(tarea),
    });
    if(response.ok){
      form.reset();
      cargarTareas();
      console.log('Tarea enviada');
      mostrarTablero = true
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
  console.log(tareas);
  tareas.forEach(t => {
    let row = table.insertRow();
    let id = row.insertCell(0);
    id.innerHTML = t.id;
    let titulo = row.insertCell(1);
    titulo.innerHTML = t.titulo;
    let completada = row.insertCell(2);
    completada.innerHTML = t.completada;
  });
};