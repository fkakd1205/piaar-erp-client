import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);

    width: 100px;

    padding: 5px 0;
    background-color: #f6cd62c4;
    border: 1px solid #e0e0e0;
    border-radius: 0 0 3px 3px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    z-index: 99;
`;

const SocketConnectLoading = ({ open }) => {
    const [refreshOpen, setRefreshOpen] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            setRefreshOpen(true);
        }, 10000)

        return () => {
            setRefreshOpen(false);
            clearTimeout(timer);
        };
    }, [])
    return (
        <>
            {open &&
                <Container>
                    {!refreshOpen &&
                        <div>연결중..</div>
                    }
                    {refreshOpen &&
                        <>
                            <div>불안정한 연결</div>
                            <div
                                onClick={() => window.location.reload()}
                                style={{ marginTop: '5px', cursor: 'pointer', textDecoration: 'underline', color: '#5074de' }}
                            >새로고침</div>
                        </>
                    }

                </Container>
            }
        </>
    );
}
export default SocketConnectLoading;