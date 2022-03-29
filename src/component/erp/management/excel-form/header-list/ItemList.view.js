import Ripple from '../../../../module/button/Ripple';
import { ItemListWrapper } from "./HeaderList.styled";

const ItemListView = (props) => {
    return (
        <ItemListWrapper>
            {(!props.headerList || props.headerList?.length <= 0) &&
                <div className='item-none-box'>
                    생성된 엑셀 양식이 없습니다.
                </div>
            }
            {(props.headerList && props.headerList?.length > 0) &&
                <div className='item-list-box'>
                    {props.headerList.map(header => {
                        return (
                            <div
                                key={header.id}
                                className={`item ${props.isSelected(header) ? 'item-active' : ''}`}
                                onClick={() => props.onActionHeaderSelect(header)}
                            >
                                {header.title}
                                <Ripple
                                    color={'#e1e1e1'}
                                    duration={1000}
                                ></Ripple>
                            </div>
                        );
                    })}
                </div>
            }

        </ItemListWrapper>
    );
}
export default ItemListView;