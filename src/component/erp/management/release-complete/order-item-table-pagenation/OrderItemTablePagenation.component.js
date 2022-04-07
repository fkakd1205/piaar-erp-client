import PagenationComponent from "../../../../module/pagenation/PagenationComponent";
import { Container } from "./OrderItemTablePagenation.styled";

const OrderItemTablePagenationComponent = (props) => {
    return (
        <Container>
            {props.orderItemPage &&
                <PagenationComponent
                    align={'right'}
                    pageIndex={props.orderItemPage?.number}
                    totalPages={props.orderItemPage?.totalPages}
                    isFirst={props.orderItemPage?.first}
                    isLast={props.orderItemPage?.last}
                    totalElements={props.orderItemPage?.totalElements}
                    sizeElements={[300, 500, 1000]}
                ></PagenationComponent>
            }
        </Container>
    );
}
export default OrderItemTablePagenationComponent;