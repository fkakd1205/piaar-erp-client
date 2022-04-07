import { TitleContainer } from "./ExcelDownloadModal.styled";

const TitleView = ({ title }) => {
    return (
        <>
            <TitleContainer>
                <div className='title-box'>
                    {title}
                </div>
            </TitleContainer>
        </>
    );
}
export default TitleView;