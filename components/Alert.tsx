import {MouseEventHandler} from "react";

const Alert = ({text, type, closeAlert}: {text: string, type: string, closeAlert: MouseEventHandler}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible mt-2`} role="alert">
            {text}
            <button type="button" className="btn-close" onClick={closeAlert}/>
        </div>
    );
};

export default Alert;