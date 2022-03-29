import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import { Container } from "./PreviewTable.styled";
import TableFieldView from "./TableField.view";

function Layout({ children }) {
    return (
        <Container>
            {children}
        </Container>
    );
}

const defaultHeaderDetails = getDefaultHeaderDetails().slice(0, 34);

const PreviewTableComponent = (props) => {

    const onActionDeleteDataOne = (e, index) => {
        e.stopPropagation();
        props._onAction_deleteDataOne(index);
    }

    return (
        <>
            <Layout>
                <TableFieldView
                    excelDataList={props.excelDataList}
                    erpOrderUploadDefaultHeader={defaultHeaderDetails}

                    onActionDeleteDataOne={onActionDeleteDataOne}
                ></TableFieldView>
            </Layout>
        </>
    );
}

export default PreviewTableComponent;