import styled from 'styled-components';
import ErpManagementExcelForm from '../../../../component/erp/management/excel-form';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import NavbarMain from '../../../../component/navbar/NavbarMain';

const Container = styled.div`

`;

const ErpManagementExcelFormPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpManagementExcelForm></ErpManagementExcelForm>
            </Container>
        </>
    );
}
export default ErpManagementExcelFormPage;