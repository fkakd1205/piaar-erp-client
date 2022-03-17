import Ripple from "../../../../module/button/Ripple";
import { DeleteButtonFieldWrapper } from "./EditField.styled";

export default function DeleteButtonFieldView(props) {
    return (
        <DeleteButtonFieldWrapper>
            <button
                type='button'
                className='button-el'
                onClick={props.onActionDeleteHeaderConfirmModalOpen}
            >
                <img
                    className='button-icon'
                    src='/assets/icon/delete_icon.png'
                    alt=''
                ></img>
                <Ripple color={'#e1e1e1'} duration={1000}></Ripple>
            </button>
        </DeleteButtonFieldWrapper>
    );
}