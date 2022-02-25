import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 64px;
    background: #bebce1;
`;

const NavbarMain = (props) => {
    return (
        <>
            <Container>
                <Link
                    to={'/'}
                >
                    홈
                </Link>
                <Link
                    to={'/erp/management/order-upload'}
                >
                    erp
                </Link>
            </Container>
        </>
    );
}
export default NavbarMain;