import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ErpOrderUploadComponent from '../../../../component/erp/management/order-upload';
import NavbarMain from '../../../../component/navbar/NavbarMain';
const Container = styled.div`

`;

const ErpManagementOrderUploadPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpOrderUploadComponent></ErpOrderUploadComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderUploadPage;