import Ripple from "../../../../module/button/Ripple";
import { UpdateButtonFieldWrapper } from "./EditField.styled";

export default function UpdateButtonFieldView(props) {
    return (
        <UpdateButtonFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={props.onActionUpdateHeader}
            >
                양식 저장하기
                <Ripple color={'#e1e1e1'} duration={1000}></Ripple>
            </button>
        </UpdateButtonFieldWrapper>
    );
}