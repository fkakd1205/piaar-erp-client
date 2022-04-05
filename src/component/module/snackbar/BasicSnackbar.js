import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import Snackbar from '@mui/material/Snackbar';

const Container = styled.div`
    ${props => {
        let severity = props.severity;
        let color = '#323232';

        switch (severity) {
            case 'success':
                color = '#4caf50';
                break;
            case 'error':
                color = '#f44336';
                break;
            case 'warning':
                color = '#ff9800';
                break;
            case 'info':
                color = '#2196f3';
                break;
            default:
                color = '#323232';
                break;
        }
        return css`
            & .MuiSnackbarContent-root{
                background-color:${color}
            }
        `;
    }}

`;

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open - [true, false]
 * @param {string} props.message
 * @param {function} props.onClose
 * @param {string} props.severity - [success, error, warning, info]
 * @param {string} props.vertical - [top, bottom]
 * @param {string} props.horizontal - [left, center, right]
 * @param {number} props.duration - [1000, 2000 ...] ms
 * @returns 
 */
const BasicSnackbar = ({
    open,
    message,
    onClose,
    severity,
    vertical,
    horizontal,
    duration
}) => {

    return (
        <>
            <Container
                severity={severity || null}
            >
                <Snackbar
                    anchorOrigin={{
                        vertical: vertical || 'top',
                        horizontal: horizontal || 'center'
                    }}
                    open={open || false}
                    onClose={onClose instanceof Function ? () => onClose() : () => { }}
                    message={message || 'no message'}
                    autoHideDuration={duration || 4000}
                    key={(vertical || 'top') + (horizontal || 'center')}
                />
            </Container>
        </>
    );

}

export default BasicSnackbar;