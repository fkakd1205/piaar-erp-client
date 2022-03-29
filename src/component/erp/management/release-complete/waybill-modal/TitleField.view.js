import { TitleFieldWrapper } from "./WaybillModal.styled";

const TitleFieldView = ({ title }) => {
    return (
        <>
            <TitleFieldWrapper>
                <div className='title-box'>
                    {title}
                </div>
            </TitleFieldWrapper>
        </>
    );
}
export default TitleFieldView;