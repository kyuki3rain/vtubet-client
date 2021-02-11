import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Wrapper from '../../components/Wrapper/Wrapper';
import Text from '../../components/Basic/Text';
import CreateForm from '../../components/admin/ContestPage/CreateForm';
import { Contest } from '../ContestPage';
import axios from 'axios';
import api from '../../helper/api';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CreateParticipation from '../../components/admin/ContestPage/CreateParticipation';

type Params = {
  id: string | undefined;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default function ContestPage() {
  const [contest, setContest] = useState({} as Contest);
  const { id } = useParams<Params>();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const get_contest = () => {
    if (id !== '0') {
      axios
        .get(api('contests/' + id), { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          setContest(response.data);
        })
        .catch((error) => console.log('更新失敗', error));
    }
  };

  const destroy_participation = (participation_id: number) => {
    axios
      .delete(api('contests/' + id + '/participations/' + participation_id), {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        get_contest();
      })
      .catch((error) => console.log('更新失敗', error));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    get_contest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (id === '0') {
    return (
      <Wrapper>
        <CreateForm />
      </Wrapper>
    );
  }

  if (!contest || !contest.members) {
    return <div></div>;
  }

  return (
    <Wrapper>
      {contest.members.map((member) => {
        return (
          <div className={classes.rowContainer}>
            <Text variant="h4" color="black">
              {member.name}
            </Text>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                destroy_participation(member.id);
              }}
            >
              削除
            </Button>
          </div>
        );
      })}
      <Button variant="contained" color="primary" disableElevation onClick={handleOpen}>
        作成
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <CreateParticipation
            id={Number(id)}
            get_contest={get_contest}
            handleClose={handleClose}
          />
        </Fade>
      </Modal>
    </Wrapper>
  );
}
