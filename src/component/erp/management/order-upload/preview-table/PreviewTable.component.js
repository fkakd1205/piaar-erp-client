import { Container } from "./PreviewTable.styled";
import TableFieldView from "./TableField.view";

function Layout({ children }) {
    return (
        <Container>
            {children}
        </Container>
    );
}

const PreviewTableComponent = (props) => {
    return (
        <>
            <Layout>
                <TableFieldView
                    excelDataList={props.excelDataList}
                    erpOrderUploadDefaultHeader={erpOrderUploadDefaultHeader}
                ></TableFieldView>
            </Layout>
        </>
    );
}

export default PreviewTableComponent;

const erpOrderUploadDefaultHeader = [
    '피아르 고유번호',
    '주문번호1',
    '주문번호2',
    '주문번호3',
    '상품명',
    '옵션명',
    '수량',
    '수취인명',
    '전화번호1',
    '전화번호2',
    '주소',
    '우편번호',
    '배송방식',
    '배송메세지',
    '상품고유번호1',
    '상품고유번호2',
    '옵션고유번호1',
    '옵션고유번호2',
    '피아르 상품코드',
    '피아르 옵션코드',
    '관리메모1',
    '관리메모2',
    '관리메모3',
    '관리메모4',
    '관리메모5',
    '관리메모6',
    '관리메모7',
    '관리메모8',
    '관리메모9',
    '관리메모10',
    '관리메모11',
    '관리메모12',
    '관리메모13',
    '관리메모14',
    '관리메모15',
    '관리메모16',
    '관리메모17',
    '관리메모18',
    '관리메모19',
    '관리메모20'
];