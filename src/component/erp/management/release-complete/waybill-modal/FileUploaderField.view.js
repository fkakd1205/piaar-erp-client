import { FileUploaderFieldWrapper } from "./WaybillModal.styled";

export default function FileUploaderFieldView(props) {
    return (
        <FileUploaderFieldWrapper>
            <input
                type='text'
                className='input-el'
                readOnly
                value={props.uploadFile?.name || ''}
            ></input>
            <button
                type='button'
                className='button-el'
                onClick={props.onActionOpenFileUploader}
            >찾아보기</button>
        </FileUploaderFieldWrapper>
    );
}