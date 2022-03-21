import { InputFieldWrapper } from "./OptionCodeModal.styled";

export default function InputFieldView(props) {
    return (
        <InputFieldWrapper>
            <input
                type='text'
                className='input-el'
                placeholder='옵션코드, 상품명, 옵션명을 입력해주세요.'
                value={props.inputValue || ''}
                onChange={props.onChangeInputValue}
            ></input>
        </InputFieldWrapper>
    );
}