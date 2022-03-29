import React, { useMemo } from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledCheckbox = styled.div`
    display: inline-block;
    width: ${props => props.size ? props.size : '16px'};
    height: ${props => props.size ? props.size : '16px'};
    /* background: ${props => (props.checked ? 'salmon' : 'papayawhip')}; */
    background: ${props => (props.checked ? '#2C73D2' : 'white')};
    border: 1px solid ${props => (props.checked ? '#2C73D2' : '#e1e1e1')};
    border-radius: 3px;
    transition: all 150ms;

    cursor: pointer;
    
    ${HiddenCheckbox}:focus + & {
        /* box-shadow: 0 0 0 3px pink; */
        box-shadow: 0 0 0 3px #2C73D240;
    }

    ${Icon} {
        visibility: ${props => (props.checked ? 'visible' : 'hidden')}
    }
`

const Label = styled.span`
    margin-left: 5px;
    font-weight: 500;
    font-size: ${props => props.labelSize ? props.labelSize : '14px'};
    color:#444;
`;

/**
 * 
 * @param {Object} param0 
 * @param {String} param0.className default null
 * @param {boolean} param0.checked default false
 * @param {String} param0.label default null
 * @param {String} param0.size default '16px'
 * @param {String} param0.labelSize default '14px'
 * @returns 
 */

const CustomCheckbox = ({ className, checked, label, size, labelSize, ...props }) => (
    <label>
        
        <CheckboxContainer className={className}>
            <HiddenCheckbox
                checked={checked}
                {...props}
            />
            <StyledCheckbox
                checked={checked}
                size={size}
            >
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
        {label &&
            <Label
                labelSize={labelSize}
            >{label}</Label>
        }
    </label>
)

export default React.memo(CustomCheckbox);