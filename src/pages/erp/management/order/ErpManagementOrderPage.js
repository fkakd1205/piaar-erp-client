import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import OrderComponent from '../../../../component/erp/management/order';
import NavbarMain from '../../../../component/navbar/NavbarMain';
const Container = styled.div`

`;

const ErpManagementOrderPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <OrderComponent></OrderComponent>
            </Container>
        </>
    );
}
export default ErpManagementOrderPage;