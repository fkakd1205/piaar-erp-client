import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';

const Container = styled.div`
    
`;

const ButtonEl = styled.button`
    padding:0;
    margin:0;
    width:${props => props.buttonSize ? props.buttonSize : 30}px;
    height:${props => props.buttonSize ? props.buttonSize : 30}px;
    border-radius: 50%;

    background:#00000000;
    border:1px solid #00000000;

    cursor:pointer;

    ${Container}:hover &{
        background:#e0e0e040;
    }
`;

const ButtonIcon = styled.img`
    width:${props => props.iconSize ? props.iconSize : 20}px;
    height:${props => props.iconSize ? props.iconSize : 20}px;

    opacity: ${props => props.active ? 1 : 0.4};

    ${Container}:hover &{
        opacity:1;
    }
`;

const sortDirections = ['desc', 'asc'];

/**
 * 
 * @param {Object} props 
 * @param {String} props.markPoint
 * @param {Number} props.buttonSize
 * @param {Number} props.iconSize
 * @returns 
 */
const SortButton = ({ markPoint, buttonSize, iconSize }) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const sortBy = query.sortBy;
    const sortDirection = query.sortDirection;

    const onActionDesc = () => {
        let newSortBy = markPoint;
        let newSortDirection = 'desc';

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                sortBy: newSortBy,
                sortDirection: newSortDirection
            }
        }))
    }

    const onActionAsc = () => {
        let newSortBy = markPoint;
        let newSortDirection = 'asc';

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                sortBy: newSortBy,
                sortDirection: newSortDirection
            }
        }))
    }

    const onActionNone = () => {
        delete query.sortBy;
        delete query.sortDirection;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query
            }
        }))
    }

    return (
        <>
            <Container>
                {(sortBy !== markPoint || !sortDirections.includes(sortDirection)) &&
                    <ButtonEl
                        buttonSize={buttonSize || 30}
                        onClick={onActionDesc}
                    >
                        <ButtonIcon
                            src='/assets/icon/sort_icon.png'
                            iconSize={iconSize || 20}
                            loading='lazy'
                        ></ButtonIcon>
                    </ButtonEl>
                }
                {/* 내림차순 */}
                {((sortBy === markPoint) && (sortDirection === 'desc')) &&
                    <ButtonEl
                        buttonSize={buttonSize || 30}
                        onClick={onActionAsc}
                    >
                        <ButtonIcon
                            src='/assets/icon/down_arrow_icon.png'
                            iconSize={iconSize || 20}
                            active={true}
                            loading='lazy'
                        ></ButtonIcon>
                    </ButtonEl>
                }
                {/* 오름차순 */}
                {((sortBy === markPoint) && (sortDirection === 'asc')) &&
                    <ButtonEl
                        buttonSize={buttonSize || 30}
                        onClick={onActionNone}
                    >
                        <ButtonIcon
                            src='/assets/icon/up_arrow_icon.png'
                            iconSize={iconSize || 20}
                            active={true}
                            loading='lazy'
                        ></ButtonIcon>
                    </ButtonEl>
                }
            </Container>
        </>
    );
}
export default SortButton;