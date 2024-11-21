import styled from "styled-components";

export const CustomBox = styled("div")({
    height: '100%',
    Width: '100%',
    margin: '0px',
    padding: '0px',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiSkeleton-rectangular': {
        marginBottom: '10px',
    }
});
