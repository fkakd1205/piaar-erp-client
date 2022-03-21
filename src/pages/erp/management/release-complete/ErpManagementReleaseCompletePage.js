import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ReleaseCompleteComponent from '../../../../component/erp/management/release-complete';
import NavbarMain from '../../../../component/navbar/NavbarMain';
const Container = styled.div`

`;

const ErpManagementReleaseCompletePage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ReleaseCompleteComponent></ReleaseCompleteComponent>
            </Container>
        </>
    );
}
export default ErpManagementReleaseCompletePage;