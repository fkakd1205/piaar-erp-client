import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import SalesComponent from '../../../../component/erp/management/sales';
import NavbarMain from '../../../../component/navbar/NavbarMain';
const Container = styled.div`

`;

const ErpManagementReleaseCompletePage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <SalesComponent></SalesComponent>
            </Container>
        </>
    );
}
export default ErpManagementReleaseCompletePage;