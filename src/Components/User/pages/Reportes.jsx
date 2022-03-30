import './Reportes.css';
import styles from './../Root.module.css'
import React from 'react';
import { Row,Col } from 'reactstrap';
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Title,Tooltip,Legend, ArcElement} from 'chart.js';
import {Bar,Doughnut} from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { graphicBackground } from '../../../Theme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend)

const requestPerMount = ({solicitudes}) => {
    const config = {
        responsive:true,
        plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Solicitudes por mes',
            },
          },
    }
    const labels = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    const values = Object.entries(labels).map(([numero,mes]) => {
             const value = solicitudes.filter((elem) => {
                    var mes = String(new Date(elem.fecha_creacion).getMonth())
                    if(mes === numero){
                     return elem
                    }else{
                      return null
                    }
      }).length
      return value
    })
    const data = {
      labels,
      datasets: [{
        label: 'Solicitudes',
        data: values,
        backgroundColor: graphicBackground,
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]}
    return <Bar options={config} data={data}/>
}

const requestPerType = ({solicitudes}) => {
  const config = {
    responsive:true,
    cutout:0,
    animation:{
      animateRotate:true
    },
    plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Solicitudes por mes',
        },
      },
}

const labels = Array.from(new Set(solicitudes.map((elem) => elem.tipo)))

const data = {
  labels: labels,
  datasets: [{
    label:'Tipos de solicitudes',
    data: labels.map((tipo,index) => solicitudes.filter((elem) => elem.tipo === tipo).length),
    backgroundColor:graphicBackground
  }],
}

return <Doughnut config={config} data={data}/>
}

const paymentPerMount = ({cobros}) => {
  let total = 0;
  const [mensualidad,cobrosExtra] = cobros
  const totalMensualidad = mensualidad.map((elem) => {
    let total=0
    total += parseInt(elem.monto_cobro);
    return total;
  })
  total=0
  const totalCobrosExtra = cobrosExtra.map((elem) => {
    total += parseInt(elem.monto_cobro);
    return total;
  })
  return(
    <div className="cards">
      <span className='title'>Resumen de cobros</span>
      <div className="container-bordered">
        <span className={styles.textBig}>
        {`$${totalMensualidad.at(-1)}`}
        </span>
        <span className={styles.textSmall}>
          Mensualidad
        </span>
      </div>
      <div className="container-bordered">
      <span className={styles.textBig}>
        {`$${totalCobrosExtra.at(-1)}`}
        </span>
        <span className={styles.textSmall}>
          Servicios extra
        </span>
      </div>
    </div>
  )

}
export const Reportes = () => {
    const {user} = useSelector((state) => state)
    const BarRequests = requestPerMount(user)
    const PieRequest = requestPerType(user)
    const CartRequest = paymentPerMount(user)
    return (
        <div className='reportes'>
          <Row>
          <Col sm={12} md={6}>

          <div className="grafico sizeMd">
            {CartRequest}
          </div>
          </Col>
          <Col sm={12} md={6}>

          <div className="grafico sizeMd">

          {PieRequest}
          </div>
          </Col>
          <Col sm={12} md={12}>

          <div className="grafico sizeBg">
          {BarRequests}
          </div>
          </Col>
          </Row>
        </div>
    )
}
