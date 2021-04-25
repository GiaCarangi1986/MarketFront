import React from 'react'

import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import makeStyles from "../Style"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Elizabeth "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function RegistrationForm(props) {
  const classes = makeStyles();

  return (
    <div>
      <AppBar position="static" >
        <Toolbar className={classes.ToolBar}>
          <PersonOutlineIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <label>{props.aut}</label>
          </Typography>
          <form>
            {props.role == "user" &&
              <Button onClick={props.ClickBasketTo} variant="contained" className={classes.submit1}>
                <ShoppingBasketIcon />
              </Button>
            }
            <Button
              type="button"
              variant="contained"
              onClick={props.onClickCheckAuthorisation}
              className={classes.submit}
            >
              Проверка
          </Button>
            {props.oki === 1 &&
              <Button
                type="button"
                variant="contained"
                onClick={props.onClickLogoff}
                className={classes.submit}
              >
                Выйти
          </Button>
            }
          </form>
        </Toolbar>
      </AppBar>



      {props.oki === 2 &&
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Авторизация
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логин"
                name="LoginPhoneNumber"
                autoComplete="login"
                value={props.inputValuesForAuthorisation.LoginPhoneNumber}
                onChange={props.handleChangeInputForAuthorisation}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Пароль"
                type="password"
                id="password"
                value={props.inputValuesForAuthorisation.Password}
                onChange={props.handleChangeInputForAuthorisation}
                autoComplete="current-password"
              />
              {/*тут ошибки выведет, если не так зайдем*/}
              <List component="nav" aria-label="main mailbox folders">
                {props.errors.map((error) => (
                  <ListItem>
                    <ListItemText className={classes.error} primary={error} />
                  </ListItem>
                ))}
              </List>
              <Button
                type="button" //было submit возможно придется вернуть
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={props.onClickAuthorisation}
              >
                Войти
          </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={props.onClickRegistration}
                className={classes.registr}
              >
                Регистрация
          </Button>


              <Modal
                style={{ inset: "30%" }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.Closing}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={props.open}>
                  <div className={classes.paperModal}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="loginPhoneNumber"
                          label="Логин"
                          name="LoginPhoneNumber"
                          autoComplete="loginPhoneNumber"
                          value={props.inputValuesForRegister.LoginPhoneNumber}
                          onChange={props.handleChangeInputForRegister}
                          autoFocus
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="Password"
                          label="Пароль"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={props.inputValuesForRegister.Password}
                          onChange={props.handleChangeInputForRegister}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="PasswordConfirm"
                          label="Подтверждение пароля"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={props.inputValuesForRegister.PasswordConfirm}
                          onChange={props.handleChangeInputForRegister}
                        />
                      </Grid>

                      {/*ошибки тут выведем*/}
                      <List component="nav" aria-label="main mailbox folders">
                        {props.errors.map((error) => (
                          <ListItem>
                            <ListItemText
                              className={classes.error}
                              primary={error}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Button
                        //type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={props.onClickCreate}
                      >
                        Создать пользователя
                  </Button>
                    </Grid>
                  </div>
                </Fade>
              </Modal>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      }
    </div>
  )
}