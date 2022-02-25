import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import MainComponent from '../../../../component/erp/management/order/MainComponent';
import NavbarMain from '../../../../component/navbar/NavbarMain';
const Container = styled.div`

`;

const ErpManagementOrderPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <MainComponent></MainComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderPage;