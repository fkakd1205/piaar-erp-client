import { SelectorButtonFieldWrapper } from "./OrderItemTable.styled";

export default function SelectorButtonFieldView(props) {
    return (
        <SelectorButtonFieldWrapper>
            <div className='flex-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={props.onActionCheckOrderItemAll}
                >페이지 전체 선택</button>
                <button
                    type='button'
                    className='button-el'
                    onClick={props.onActionReleaseOrderItemAll}
                >페이지 전체 해제</button>
            </div>
        </SelectorButtonFieldWrapper>
    );
}