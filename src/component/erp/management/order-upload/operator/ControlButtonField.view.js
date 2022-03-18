import { ControlButtonFieldWrapper } from "./Operator.styled";

function Button({ element, onClick }) {
    return (
        <div className="button-box">
            <button
                className='button-el'
                type='button'
                onClick={() => onClick()}
            >{element}</button>
        </div>
    );
}

export default function ControlButtonFieldView(props) {
    return (
        <ControlButtonFieldWrapper>
            <Button
                element={'엑셀 파일 업로드'}
                onClick={props.onActionOpenFileUploader}
            ></Button>
            <Button
                element={'엑셀 파일 저장'}
                onClick={props.onActionSaveExcelData}
            ></Button>
        </ControlButtonFieldWrapper>
    );
}