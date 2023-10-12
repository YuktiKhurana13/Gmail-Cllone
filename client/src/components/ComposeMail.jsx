import { useState } from 'react';
import { Dialog, Box, Typography, styled, InputBase, TextField, Button } from '@mui/material';
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.url';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '10px 10px 0 0',
    boxShadow: 'none',
};

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#F2F6FC',
    ' & > p': {
        fontSize: '14px',
        fontWeight: '500'
    },
});

const RecipientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div': {
        fontSize: '14px',
        borderBottom: '1px solid #F5F5F5',
        marginTop: '10px'
    },
});

const Footer = styled(Box)({
    display: 'flex',
    justifyContent :'space-between',
    padding: '10px 15px',
    alignItems: 'center',
});

const SendButton = styled(Button)({
    background: '#0B57D0',
    color: '#FFF',
    fontWeight: '500',
    textTransform: 'none',
    borderRadius: '18px',
    width: '100px',
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {

    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        Host : "smtp.elasticemail.com",
        Username : process.env.REACT_APP_USERNAME,
        Password : process.env.REACT_APP_PASSWORD,
        Port: 2525,
    };

    const closeComposeMail = (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: "yuktikhurana5@gmail.com",
            subject: data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name :'yukti khurana',
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDialog(false);
            setData({});
        } else {
            
        }

        setOpenDialog(false);
    };

    const sendMail = (e) => {
        e.preventDefault();
        if(window.Email) {
            window.Email.send({
                ...config,
                To : data.to,
                From : "yuktikhurana5@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
              message => alert(message)
            );
        }

        const payload = {
            to: data.to,
            from: "yuktikhurana5@gmail.com",
            subject: data.subject,
            body : data.body,
            date: new Date(),
            image: '',
            name :'yukti khurana',
            starred: false,
            type: 'sent'
        }

        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDialog(false);
            setData({});
        } else {
            
        }

        setOpenDialog(false);
    };

    const onValueChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    return (
        <Dialog
            open={openDialog}
            PaperProps={{sx: dialogStyle}}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize='small' onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientsWrapper>
                <InputBase placeholder='Recipients' onChange={(e) => onValueChange(e)} name='to'></InputBase>
                <InputBase placeholder='Subject' onChange={(e) => onValueChange(e)} name='subject'></InputBase>
            </RecipientsWrapper>
            <TextField
                multiline
                rows={20}
                sx={{'& .MuiOutlinedInput-notchedOutline':{border: 'none'} }}
                onChange={(e) => onValueChange(e)}
                name='body'
            />
            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDialog(false)} />
            </Footer>
        </Dialog>
    )
};

export default ComposeMail;