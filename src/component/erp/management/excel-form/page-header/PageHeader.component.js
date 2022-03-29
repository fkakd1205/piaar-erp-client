import { Container, HeaderTitleFieldWrapper } from "./PageHeader.styled";

function HeaderTitle() {
    return (
        <HeaderTitleFieldWrapper>
            <div className='title-el'>
                엑셀 폼 관리자
            </div>
        </HeaderTitleFieldWrapper>
    );
}
const PageHeaderComponent = (props) => {
    return (
        <>
            <Container>
                <HeaderTitle></HeaderTitle>
            </Container>
        </>
    );
}
export default PageHeaderComponent;