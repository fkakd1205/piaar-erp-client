import Ripple from '../../../../module/button/Ripple';
import { Container, ItemListContainer, ItemListWrapper } from "./HeaderList.styled";

const ItemList = ({ headerList, isSelected, onActionHeaderSelect }) => {
    return (
        <ItemListWrapper>
            {headerList.map(header => {
                return (
                    <div
                        key={header.id}
                        className={`item ${isSelected(header) ? 'item-active' : ''}`}
                        onClick={() => onActionHeaderSelect(header)}
                    >
                        {header.title}
                        <Ripple
                            color={'#e1e1e1'}
                            duration={1000}
                        ></Ripple>
                    </div>
                );
            })}
        </ItemListWrapper>
    );
}

const ItemListView = (props) => {
    return (
        <>
            <ItemListContainer>
                <ItemList
                    headerList={props.headerList}
                    isSelected={props.isSelected}

                    onActionHeaderSelect={props.onActionHeaderSelect}
                ></ItemList>
            </ItemListContainer>
        </>
    );
}
export default ItemListView;