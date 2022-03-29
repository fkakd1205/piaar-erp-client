import Ripple from "../../../../module/button/Ripple";
import { ButtonFieldWrapper } from "./SearchOperator.styled";

export default function ButtonFieldView(props) {
    return (
        <ButtonFieldWrapper>
            <div className='flex-box'>
                <div className='button-box'>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionClearRoute}
                    >
                        초기화
                        <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                    </button>
                </div>
                <div className='button-box'>
                    <button
                        type='submit'
                        className='button-el'
                    >
                        조회
                        <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                    </button>
                </div>
            </div>
        </ButtonFieldWrapper>
    );
}