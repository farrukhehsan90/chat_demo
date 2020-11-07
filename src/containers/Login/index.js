import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  
  Platform,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {Images, Metrics} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {request as login_user} from '../../redux/actions/Login';

import {drawerMenuSwitched} from '../../redux/actions/NavigationAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'testing90@gmail.com', // Sarim
      password: '123456', // Sarim123
      isloading: false,
      formErrors: {
        emailError: false,
        passwordError: false,
      },
      showPassword: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.data &&
        nextProps.login.data.success
      ) {
        this.setState({isloading: false, email: '', password: ''}, () => {
          this.props.drawerMenuSwitched('Login', 'Message');
          this.props.navigation.navigate('Message');
        });
      } else if (nextProps.login.failure && !nextProps.login.isFetching) {
        this.setState({isloading: false, email: '', password: ''});
      }
    }
  }

  checkValidation = () => {
    const {email, password} = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) {
      this.setState({
        formErrors: {
          emailError: true,
          passwordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            passwordError: false,
          },
        });
      }, 6000);
    } else if (password.length < 6) {
      this.setState({
        formErrors: {
          emailError: false,
          passwordError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
            passwordError: false,
          },
        });
      }, 6000);
    } else {
      this.handleLogin();
    }
  };

  handleLogin = () => {
    this.setState({isloading: true});
    const {email, password} = this.state;
    const payload = {
      // email : email.toLowerCase(),
      email,
      password,

      platform: Platform.OS,
      gcm_id: 'string',
    };
    this.props.login_user(payload);
  };

  onChangeEmail = value => this.setState({email: value});
  onChangePassword = value => this.setState({password: value});

  onSubmit = value => {
    if (value === 'onDone') {
      this.checkValidation();
    } else {
      this[value].focus();
    }
  };

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image
          source={Images.logo}
          style={{width: Metrics.ratio(90), height: Metrics.ratio(90)}}
        />
      </View>
    );
  };

  renderEmailField = () => {
    const {formErrors} = this.state;
    return (
      <View style={{marginBottom: Metrics.ratio(10)}}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          ref={o => {
            this.inputEmail = o;
          }}
          returnKeyType="next"
          style={styles.inputField}
          placeholder="yourmail@example.com"
          onChangeText={this.onChangeEmail}
          autoCompleteType="off"
          value={this.state.email}
          keyboardType="email-address"
          onSubmitEditing={() => this.onSubmit('inputPassword')}
        />
        {formErrors.emailError ? (
          <Text style={styles.errorMessage}>Invalid email address.</Text>
        ) : null}
      </View>
    );
  };

  renderPasswordField = () => {
    const {showPassword, formErrors} = this.state;
    return (
      <View style={{marginBottom: Metrics.ratio(10)}}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          ref={o => {
            this.inputPassword = o;
          }}
          returnKeyType="done"
          style={[styles.inputField, {paddingRight: Metrics.ratio(35)}]}
          placeholder="* * * * * * *"
          secureTextEntry={showPassword ? false : true}
          onChangeText={this.onChangePassword}
          value={this.state.password}
          autoCompleteType="off"
          onSubmitEditing={() => this.onSubmit('onDone')}
        />
        <TouchableOpacity
          style={[styles.eyeIconView]}
          onPress={() =>
            this.setState({showPassword: showPassword ? false : true})
          }>
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={Metrics.ratio(18)}
            color="#949494"
          />
        </TouchableOpacity>
        {formErrors.passwordError ? (
          <Text style={styles.errorMessage}>
            Password has must be atleast 6 characters.
          </Text>
        ) : null}
      </View>
    );
  };

  renderForgotPassword = () => {
    return (
      <TouchableOpacity
        style={styles.ForgotPasswordView}
        onPress={() => this.props.navigation.navigate('ForgotPassword')}>
        <Text style={styles.ForgotPasswordText}>Forgot Password ?</Text>
      </TouchableOpacity>
    );
  };

  renderLoginBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => this.checkValidation()}>
        <Text style={styles.submitBtnText}>Login</Text>
      </TouchableOpacity>
    );
  };


  onFbLogin = (data, res) => {
    const payload = {
      firstName: res.name,
      lastName: '',
      email: res.email,
      platform: Platform.OS,
      authCode: data.accessToken,
      idToken: data.userID,
      profile_img: 'https://gpsapp001.herokuapp.com/public/images/user.png',
      Accounttype: '2',
    };
    this.props.socialLoginRequest(payload);
  };

  onGoogleLogin = userInfo => {
    const payload = {
      firstName: userInfo.user.givenName,
      lastName: userInfo.user.familyName,
      email: userInfo.user.email,
      platform: Platform.OS,
      idToken: userInfo.idToken,
      authCode: userInfo.serverAuthCode,
      profile_img: userInfo.user.photo,
      Accounttype: '1',
    };
    this.props.socialLoginRequest(payload);
  };

  renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        {this.renderLogo()}

        {this.renderEmailField()}

        {this.renderPasswordField()}

        {this.renderLoginBtn()}

      </View>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account yet? </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={[styles.footerText, {color: '#5E8BFF'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={Images.backgroundImage}
          resizeMode="cover"
          resizeMethod="auto"
          style={styles.container}>
          {this.renderCard()}
          {this.renderFooter()}
        </ImageBackground>
        {this._renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const action = {login_user, drawerMenuSwitched};

export default connect(
  mapStateToProps,
  action,
)(Login);
