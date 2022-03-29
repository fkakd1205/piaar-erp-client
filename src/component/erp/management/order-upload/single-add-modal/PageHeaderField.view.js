import { PageHeaderFieldWrapper } from "./SingleAddModal.styled";

export default function PageHeaderFieldView(props) {
    return (
        <PageHeaderFieldWrapper>
            <div className='title-el'>
                단건 등록
            </div>
            <div className='button-box'>
                <button
                    type='submit'
                    className='button-el'
                >
                    <img
                        src='/assets/icon/add_icon.png'
                        className='button-icon'
                        alt={""}
                    ></img>
                </button>
            </div>
        </PageHeaderFieldWrapper>
    );
}