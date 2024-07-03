const form = document.getElementById('tareaForm');
const table = document.getElementById('table');

function setearFormulario(tarea){
  document.getElementById('id').tarea.id;
  document.getElementById('titulo').tarea.titulo;
  document.getElementById('completada').tarea.completada;
}
function renderTareas(tareas){
  tareas.forEach(t => {
    let row = table.insertRow();
    let id = row.insertCell(0);
    id.innerHTML = t.id;
    let titulo = row.insertCell(1);
    titulo.innerHTML = t.titulo;
    let completada = row.insertCell(2);
    completada.innerHTML = t.completada;
    let borrar = row.insertCell(3);
    let editar = row.insertCell(4);
    borrar.innerHTML = `<button name= "botonBorrar" id=${t.id}>Borrar</button>`;
    editar.innerHTML = `<button name= "botonEditar">Editar</button>`;

  const botonEditar = document.getElementsByName('botonEditar');
  botonEditar.forEach((b) => {
  b.addEventListener('click',() => {
    guardaTarea(tareas);
  });
});
});

  const botonBorrar = document.getElementsByName('botonBorrar');
  botonBorrar.forEach((b) => {
    b.addEventListener('click',() => {
      deleteID(b.id);
    });
  });
}

form.addEventListener('submit', async (event) =>{
  event.preventDefault();
  //Capturo los datos
  try{
    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value;
    const completada = document.getElementById('completada').checked;
  
    const tarea = {
      id: id,
      titulo: titulo,
      completada: completada,
    };
    await guardaTarea(tarea);
  }catch (error) {
    console.error('Error de red', error);
  }
});
async function guardaTarea(tarea){
  const hoy = new Date();
  try {
    if(!tarea.id){
      //Crear Tarea
      const response = await fetch('http://localhost:3000/tareas',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        titulo: tarea.titulo,
        completada: tarea.completada,
        fecha: hoy.toDateString()
        }),
      });

      if(response.ok){
        form.reset();
        cargarTareas();
        console.log('Tarea creada');
      }else{
        throw new error('Nose puede crear la tarea');
      }
    }else{
      //Editar Tarea
      const response = await fetch(`http://localhost:3000/tareas${tarea.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: tarea.titulo,
          completada: tarea.completada,
          fecha: hoy.toDateString()
        }),
      });
			if (response.ok) {
				form.reset();
				cargarTareas();
				console.log('Tarea editada con éxito');
			} else {
				throw new Error('No se puedo editar la tarea');
			}
		}
	} catch (error) {
		console.log(error);
	}
}
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
      console.error('Error de red:', error);
  }
}
async function deleteID(id){
  try {
    const urlDelete = `http://localhost:3000/tareas/${id}`
    const response = await fetch(urlDelete, {method:'DELETE'});
    if(response.ok){
      form.reset();
      cargarTareas();
      console.log('Tarea Eliminada');
    }
  } catch (error) {
    console.log('ERROR!!!');
  }
}
await cargarTareas();