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
                    </button>
                </div>
                <div className='button-box'>
                    <button
                        type='submit'
                        className='button-el'
                        // onClick={props.onActionRouteToSearch}
                    >
                        조회
                    </button>
                </div>
            </div>
        </ButtonFieldWrapper>
    );
}