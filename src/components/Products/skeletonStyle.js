import styled from "styled-components";

export const CustomBox = styled("div")({
    height: '100%',
    Width: '70%',
    margin: '40px 240px 0px 200px',
    padding: '0px',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiSkeleton-rectangular': {
        marginBottom: '10px',
    }
});
