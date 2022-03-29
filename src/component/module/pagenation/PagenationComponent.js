import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Ripple from '../button/Ripple';
import qs from 'query-string';

const Container = styled.div`

`;

const Wrapper = styled.div`
    .flex-box{
        display: flex;
        justify-content: ${props => {
        if (!props.align) {
            return 'flex-start'
        }
        switch (props.align) {
            case 'left': return 'flex-start';
            case 'center': return 'center';
            case 'right': return 'flex-end';
            default: return 'flex-start'
        }
    }};
        align-items: center;
    }

    .number-box{
        margin:0 3px;
        font-size: 14px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .button-box{
        margin:0 3px;
    }

    .circle-button-el{
        position: relative;
        overflow: hidden;
        width: 34px; 
        height: 34px;
        border-radius: 50%;
        border: 1px solid #00000000;
        background: white;

        cursor: pointer;

        &:hover{
            background: #e0e0e040;
        }

        @media all and (max-width:992px){
            width: 28px; 
            height: 28px;
        }
    }

    .button-icon-el{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 24px;
        height: 24px;

        @media all and (max-width:992px){
            width: 20px; 
            height: 20px;
        }
    }

    .button-disabled{
        cursor:default;

        &:hover{
            background: none;
        }
    }

    .select-box{
        margin:0 3px;
    }

    .select-el{
        width: 70px;
        height: 23px;
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 11px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        cursor: pointer;

        &:focus{
            outline: none;
        }
    }
`;

const PagenationComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);

    const onActionPrev = () => {
        if (props.isFirst) {
            return;
        }

        let pageIndex = props.pageIndex + 1;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                page: pageIndex - 1
            }
        }), {
            replace: true
        })

    }

    const onActionNext = () => {
        if (props.isLast) {
            return;
        }

        let pageIndex = props.pageIndex + 1;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                page: pageIndex + 1
            }
        }), {
            replace: true
        })
    }

    const onActionChangeSize = (e) => {
        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                size: e.target.value,
                page: 1
            }
        }), {
            replace: true
        })
    }

    return (
        <>
            <Container>
                <Wrapper
                    align={props.align}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                >
                    <div className='flex-box'>
                        {props.sizeElements &&
                            <div className='select-box'>
                                <select className='select-el' onChange={onActionChangeSize}>
                                    {props.sizeElements.map((r, index) => {
                                        return (
                                            <option key={index} value={r}>{r} 개 보기</option>
                                        );
                                    })}
                                </select>
                            </div>
                        }
                        <div className='button-box' >
                            {(!props.isFirst) &&
                                <button className={`circle-button-el`} onClick={onActionPrev}>
                                    <img
                                        src='/assets/icon/left_navigation_icon.png'
                                        className='button-icon-el'
                                        alt='left navigation icon'
                                        loading='lazy'
                                    ></img>
                                    <Ripple color={'#e0e0e0'} duration={800}></Ripple>
                                </button>
                            }
                        </div>
                        <div className='number-box'>
                            <span>{props.pageIndex + 1 || ''}</span> / <span>{props.totalPages || ''}</span>
                        </div>
                        <div className='button-box'>
                            {(!props.isLast) &&
                                <button className={`circle-button-el`} onClick={onActionNext}>
                                    <img
                                        src='/assets/icon/right_navigation_icon.png'
                                        className='button-icon-el'
                                        alt='right navigation icon'
                                        loading='lazy'
                                    ></img>
                                    <Ripple color={'#e0e0e0'} duration={800}></Ripple>
                                </button>
                            }
                        </div>
                        {props.totalElements &&
                            <div className='number-box'>
                                TOTAL {props.totalElements}
                            </div>
                        }
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default PagenationComponent;