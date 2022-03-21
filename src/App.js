import './App.css';
import { Route, Routes } from 'react-router-dom';
import ErpMangementOrderUploadPage from './pages/erp/management/order-upload/ErpManagementOrderUploadPage';
import HomePage from './pages/home/HomePage';
import ErpManagementOrderPage from './pages/erp/management/order/ErpManagementOrderPage';
import ErpManagementSalesPage from './pages/erp/management/sales/ErpManagementSalesPage';
import ErpManagementExcelFormPage from './pages/erp/management/excel/ErpManagementExcelFormPage';
import ErpManagementReleaseCompletePage from './pages/erp/management/release-complete/ErpManagementReleaseCompletePage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/erp/management/order-upload' element={<ErpMangementOrderUploadPage />}></Route>
            <Route path='/erp/management/order' element={<ErpManagementOrderPage />}></Route>
            <Route path='/erp/management/sales' element={<ErpManagementSalesPage />}></Route>
            <Route path='/erp/management/release-complete' element={<ErpManagementReleaseCompletePage />}></Route>
            <Route path='/erp/management/excel' element={<ErpManagementExcelFormPage />}></Route>
        </Routes>
    );
}

export default App;
