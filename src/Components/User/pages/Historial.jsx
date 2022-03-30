import "./Historial.css";
import React, { useState, useEffect } from "react";
import { Container,Form, Col, Label, Input } from "reactstrap";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { DetalleActividad } from "../Components";

export const Historial = () => {
  const solicitudes = useSelector((state)=> state.user.solicitudes)
  const [data, setData] = useState([])
  useEffect(()=>{
    setData(solicitudes)
  },[])

  const handleFilter = (e) => {
    setData(solicitudes.filter((elem) => elem[e.target.id] === e.target.value))
  };

  const handleReset = () => {
    document.getElementsByClassName('Filtro')

    setData(solicitudes)
  };

  const columns = [
    { name: "Tipo", selector: (row) => row.tipo },
    {
      name: "Fecha",
      selector: (row) => row.fecha_creacion,
    },
    { name: "Observaciones", selector: (row) => row.respuesta },
    {
      name: "Estado",
      selector: (row) => row.estado,
      conditionalCellStyles: [
        {
          when: (row) => row.estado === "Resuelto",
          style: {
            color: "green",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },

          {
            when: (row) => row.estado === "Rechazado",
            style: {
              color: "red",
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
      ],
    },
    {
      name: "",
      selector: (row) => (
        <DetalleActividad solicitud={row} sm numero={row.id_solicitud}></DetalleActividad>
      ),
    },
  ];
  return (
    <Container fluid className="mt-5">
      <div className="d-flex">
        <p className="text-muter ms-auto">{`Ultima actualizacion: ${new Date().toLocaleDateString()}`}</p>
      </div>
      <Form className="d-flex align-items-center mb-3">
        <Label>Filtrar por:</Label>
        <Col lg={2}>
          <Input
            id="tipo"
            className='Filtro'
            type="select"
            data-toggle="dropdown"
            onChange={handleFilter}
          >
            <option defaultValue> Tipo</option>
            <option>Visita a terreno</option>
            <option>Capacitacion</option>
            <option>Asesoria</option>
            <option>CheckList</option>
          </Input>
        </Col>
        <Col lg={2}>
          <Input id="estado" className='Filtro' type="select" onChange={handleFilter}>
            <option defaultValue>Estado</option>
            <option>Resuelto</option>
            <option>Pendiente</option>
            <option>Rechazado</option>
          </Input>
        </Col>
        <Col lg={2}>
          <input
            id="Reset"
            type='reset'
            className="btn btnSecondary form-control"
            onClick={handleReset}
            value='Limpiar filtros'
          />
        </Col>
      </Form>
      <Container id="table" className="bgLight container-bordered">
        <DataTable
          pagination
          fixedHeader
          fixedHeaderScrollHeight={"400px"}
          highlightOnHover
          paginationComponentOptions={{ noRowsPerPage: true }}
          columns={columns}
          data={data}
        />
      </Container>
    </Container>
  );
};
