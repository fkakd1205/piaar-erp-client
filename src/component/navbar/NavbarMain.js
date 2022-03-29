import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginDataConnect } from '../../data_connect/loginDataConnect';

const Container = styled.div`
    height: 64px;
    background: #bebce1;
`;

const NavbarMain = (props) => {
    const __reqLogin = async () => {
        let params = {
            username: '박세훈',
            password: 'syna123.'
        }
        await loginDataConnect().login(params);
    }
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
                <button onClick={__reqLogin}>로그인하기</button>
            </Container>
        </>
    );
}
export default NavbarMain;