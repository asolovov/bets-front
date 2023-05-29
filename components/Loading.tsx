import styled from "styled-components";

const Loading = ({show}: {show: boolean}) => {
    return (
        <Overlay show={show}>
            <div className={"px-5 py-5 my-5 text-center"}>
                <div className="m-5 spinner-border text-primary" role="status" style={{width: "10rem", height: "10rem", fontWeight: "bold"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h1 className={"text-primary"}>Loading...</h1>
            </div>
        </Overlay>
    );
};

const Overlay = styled.div<{show: boolean}>`
  display: block;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: white;
  opacity: 70%;
  outline: 0;
`;

export default Loading;