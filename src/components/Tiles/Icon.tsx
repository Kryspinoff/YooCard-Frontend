import React from "react";
import styled from 'styled-components';

interface StyledDivProps {
    maskImageUrl: string;
}

const StyledDiv = styled.div<StyledDivProps>`
    -webkit-mask-image: url(${props => props.maskImageUrl});
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background-color: currentcolor;
    -webkit-mask-size: 100%;
    left: 8px;
    border-radius: 4px;
    width: 48px;
    height: 48px;
`

interface IconProps extends StyledDivProps {
    className?: string;
}

const Icon: React.FC<IconProps> = ({maskImageUrl, className=""}) => {
    return <StyledDiv className={className} maskImageUrl={maskImageUrl} />
}

export default Icon;