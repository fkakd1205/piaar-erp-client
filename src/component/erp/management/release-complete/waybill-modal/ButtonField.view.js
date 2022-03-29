import Ripple from "../../../../module/button/Ripple";
import { ButtonFieldWrapper } from "./WaybillModal.styled";

export default function ButtonFieldView(props) {
    return (
        <ButtonFieldWrapper>
            <div className='flex-box'>
                <button
                    type='button'
                    className='button-el'
                    style={{ color: '#d15120' }}
                    onClick={props.onActionCloseWaybillModal}
                >
                    취소
                    <Ripple color={'#e0e0e060'} duration={1000}></Ripple>
                </button>
                <button
                    type='button'
                    className='button-el'
                    style={{ color: '#2C73D2' }}
                    onClick={props.onActionConfirm}
                >
                    일괄 등록
                    <Ripple color={'#e0e0e060'} duration={1000}></Ripple>
                </button>
            </div>
        </ButtonFieldWrapper>
    );
}