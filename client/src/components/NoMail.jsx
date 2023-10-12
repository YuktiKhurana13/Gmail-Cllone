import { Box, Typography, styled, Divider } from "@mui/material";

const Wrapper = styled(Box)({
    display: 'flex',
    alignItems: "center",
    flexDirection: 'column',
    marginTop: 50,
    opacity: '.8',
    width: '100%',
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10,
})

const NoMail = ({ message }) => {
    return (
        <Wrapper>
            <Typography>
                {message.heading}
            </Typography>
            <Typography>
                {message.subHeading}
            </Typography>
            <StyledDivider />
        </Wrapper>
    )
};

export default NoMail;