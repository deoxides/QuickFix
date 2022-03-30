import axios from 'axios';
const config ={
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
function Authenticate(email,password,callback){
    let params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", email);
      params.append("password", password);
    const response = axios.post(`${process.env.REACT_APP_API_URL}token`,params,config)
    .then(
        (response) => {
            if(response.data.rol !== 'cliente'){
                const error = {status:'200',message:'Usuario no encontrado'}
                throw error
            }else{
                return response
            }
        })
    .catch(
        (error) => {

            if(error.status === '200'){
                callback({status:'danger',title:'Error',body:error.message})
            }else if(error.request){
                callback({status:'danger',title:'Error',body:'Ha ocurrido un error inesperado'})
            }else{
                callback({status:'warning',title:'Error de conexion',body:'No se pudo conectar con el servidor en el tiempo limite'})
            }
            return error
        }
    )
    return response
}

function fetchSolicitudes(access_token,id){
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${access_token}`;
    const response = axios.get(`${process.env.REACT_APP_API_URL}api/Solicitudes/ObtenerSolicitudes_cliente?id_cliente=${id}`,
        config)
    .then((response) => {
        return response.data.Modelo
    })
    .catch((error) =>{
        return []
    })

    return Promise.resolve(response)
}

function fetchTareas(access_token,id){
    config.headers['Authorization'] = `Bearer ${access_token}`;
    const response = axios.get(`${process.env.REACT_APP_API_URL}api/AgendaTareas/TareasDeCliente?id_cliente=${id}`,
        config)
    .then((response) => {
        return response.data.Modelo
    })
    .catch((error) =>{
        return []
    })

    return response
}

function fetchChecklist(access_token,id_lcr){
    config.headers['Authorization'] = `Bearer ${access_token}`;
    const response = axios.get(`${process.env.REACT_APP_API_URL}api/AgendaTareas/ObtenerLCR?id_lcr=${id_lcr}`,
        config)
    .then((response) => {
        return response.data
    })
    .catch((error) =>{
        return []
    })

    return response
}

function fecthInformeTarea (access_token,id_informe_tarea){
    config.headers['Authorization'] = `Bearer ${access_token}`;
    const response = axios.get(`${process.env.REACT_APP_API_URL}api/AgendaTareas/ObtenerInforme?id_informe=${id_informe_tarea}`,
        config)
    .then((response) => {
        return response.data
    })
    .catch((error) =>{
        return null
    })

    return response
}

function fetchCobros(access_token,id){
    config.headers['Authorization'] = `Bearer ${access_token}`;
    const response = axios.get(`${process.env.REACT_APP_API_URL}api/PagosYCobros/ObtenerCobros?id_cliente=${id}`,config)
    .then((response) => {
        const mensualidad = response.data.Modelo.filter((elem) => elem.motivo ==='Valor mensualidad')
        const cobrosExtra = response.data.Modelo.filter((elem) => elem.motivo !=='Valor mensualidad')
        return [mensualidad,cobrosExtra]
    })
    .catch((error)=>{
        console.log(error)
        return null;
    })
    return response;
}

function sendSolicitud(access_token,data){
    config.headers['Authorization'] = `Bearer ${access_token}`
    console.log(data)
    const response = axios.post(`${process.env.REACT_APP_API_URL}api/Solicitudes/CrearSolicitud`,data,config)
          .then(() => {
            return({status:'success',title:'Solicitud enviada',body:'Su solicitud fue enviada exitosamente'})
          })
          .catch((err) => {
            return({status:'danger',title:'Error',body:'No se ha podido enviar esta solicitud intente nuevamente'})
          })
    return response
}

export {Authenticate,fetchSolicitudes,fetchTareas,fetchChecklist,fetchCobros,fecthInformeTarea,sendSolicitud}