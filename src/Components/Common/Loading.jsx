import {
  Modal,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from "reactstrap";

const LoadingScreen = (props) => {
  if (props.message) {
    return (
      <Modal isOpen={props.isOpen} centered>
        <div>
          {
            (props.result == null ? (
              <div className="d-flex m-5 justify-content-center align-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <Card>
                  <CardHeader className={`bg-${props.result?.status}`}>
                    {props.result?.title}
                  </CardHeader>
                  <CardBody>
                    <CardText>{props.result?.body}</CardText>
                  </CardBody>
                </Card>
                <ModalFooter>
                  <button
                    className="btn btnSecondary"
                    onClick={() => props.setIsOpen(false)}
                  >
                    Cerrar
                  </button>
                </ModalFooter>
              </div>
            ))
          }
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal isOpen={props.isOpen} centered>
        <div className="d-flex m-5 justify-content-center align-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Modal>
    );
  }
};

export { LoadingScreen };
