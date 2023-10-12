import { useOutletContext, useParams } from "react-router-dom";
import { API_URLS } from "../services/api.url";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { DeleteOutline } from '@mui/icons-material'; 
import { Checkbox, Box, List, ListItem } from '@mui/material'
import Email from "./Email";
import NoMail from "./NoMail";
import { EMPTY_TABS } from "../constants/constant";

const Emails = () => {

    const { openDrawer } = useOutletContext();
    const { type } = useParams();
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [refreshScreen, setRefreshScreen] = useState([]);

    const getEmailService = useApi(API_URLS.getEmailFromType);
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
    const deleteEmailService = useApi(API_URLS.deleteEmail);

    useEffect(() => {
        getEmailService.call({}, type);
    }, [type, refreshScreen]);

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailService?.response?.map(email => email._id);
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    };

    const deleteSelectedEmail = () => {
        if (type === 'bin') {
            deleteEmailService.call(selectedEmails);
        } else {
            moveEmailsToBinService.call(selectedEmails);
        }
        setRefreshScreen(prevState => !prevState);
    };

    return(
        <Box style={ openDrawer ? { marginLeft: 250, width: 'calc(100% - 250px)'} : { width: '100%' }}>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small" onChange={(e) => selectAllEmails(e)} />
                <DeleteOutline onClick={() => deleteSelectedEmail()} />
            </Box>
            <Box>
                <List>
                    {
                        getEmailService?.response?.map(email => (
                            <Email 
                                key={email._id}
                                email={email}
                                selectedEmails={selectedEmails}
                                setSelectedEmails={setSelectedEmails}
                                setRefreshScreen={setRefreshScreen}
                            />
                        ))
                    }  
                </List>
                {getEmailService?.response?.length === 0 && <NoMail message={EMPTY_TABS[type]} />}
            </Box>
        </Box>
    );
};

export default Emails;