import { InfoTextFieldWrapper } from "./ViewHeaderSettingModal.styled";

export default function InfoTextFieldView(props) {
    return (
        <InfoTextFieldWrapper>
            <div className='info-box'>
                {props.element}
            </div>
        </InfoTextFieldWrapper>
    );
}