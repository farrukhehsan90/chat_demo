// @flow
import { StyleSheet } from "react-native";
import { Images, Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        backgroundColor: "#fff",
        width: Metrics.screenWidth * 0.85,
        borderRadius: Metrics.ratio(20),
        paddingHorizontal: Metrics.ratio(15),
        paddingTop: Metrics.ratio(60),
        paddingBottom: Metrics.ratio(20),
        shadowColor: Colors.black,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },
    logoView: {
        width: Metrics.ratio(90),
        height: Metrics.ratio(90),
        borderRadius: Metrics.ratio(15),
        backgroundColor: '#fff',
        position: 'absolute',
        top: Metrics.ratio(-45),
        alignSelf: 'center',
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },
    inputLabel: {
        color: '#909090',
        fontFamily: Fonts.type.regular,
        fontSize: Metrics.ratio(14),
        marginLeft: Metrics.ratio(10),
        marginBottom: Metrics.ratio(5),
    },
    inputField: {
        backgroundColor: '#F5F5F5',
        color: '#949494',
        borderRadius: Metrics.ratio(10),
        fontFamily: Fonts.type.regular,
        fontSize: Metrics.ratio(16),
        paddingLeft: Metrics.ratio(10),
    },
    eyeIconView: {
        position: 'absolute',
        right: Metrics.ratio(5),
        top: Metrics.ratio(33),
        width: Metrics.ratio(30),
        height: Metrics.ratio(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
        fontFamily: Fonts.type.regular,
        fontSize: Metrics.ratio(12),
        marginLeft: Metrics.ratio(10),
        marginTop: Metrics.ratio(5),
    },
    ForgotPasswordView: {
        alignItems: 'flex-end',
        marginTop: Metrics.ratio(10),
        marginBottom: Metrics.ratio(20)
    },
    ForgotPasswordText: {
        color: '#5E8BFF',
        fontSize: Metrics.ratio(12),
        fontFamily: Fonts.type.regular
    },
    submitBtn: {
        backgroundColor: '#84CDFF',
        paddingVertical: Metrics.ratio(10),
        borderRadius: Metrics.ratio(10),
    },
    submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: Metrics.ratio(18),
        fontFamily: Fonts.type.regular
    },
    connectText: {
        textAlign: 'center',
        color: '#909090',
        fontFamily: Fonts.type.regular,
        fontSize: Metrics.ratio(12),
        marginVertical: Metrics.ratio(10),
    },
    footerContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        paddingVertical: Metrics.ratio(20)
    },
    footerText: {
        color: '#909090',
        fontFamily: Fonts.type.regular,
        fontSize: Metrics.ratio(14)
    },
});
