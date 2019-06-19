import { StyleSheet } from 'react-native';
import { lightdark, gray, white, blue, dark } from '../helpers/colors';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: lightdark,
    },
    containerCard: {
        backgroundColor: 'transparent', 
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: gray,
        padding: 0,
        margin: 0,
        flexDirection: 'column',
    },
    name_phone: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
    },
    text: {
        color: white
    },
    content: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    rating: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 5,
        paddingRight: 5,
    },
    date: {
        paddingTop: 6,
        paddingLeft: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    badgeDate: {
        backgroundColor: blue,
    },
   

    // STYLES FOOTER
    subFooter: {
        flexDirection: 'row',
        backgroundColor: white,
        height: 35,
    },
    footerRating: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerQualificar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerConvidar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerAPN: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 6,
    },
    footerAcompanhar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerFechamento: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },

    //STYLE BUTTON
    button: {
        backgroundColor: lightdark,
        borderWidth: 0,
        borderRadius: 5,
        justifyContent: 'center',
        height: 28,
        paddingHorizontal: 8,
    },
    textButton: {
        textAlign: 'center',
        color: white
    },
    buttonImport:{
        backgroundColor: blue,
        borderWidth: 0,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        height:'100%',
    },
    textButtonImport: {
        textAlign: 'center',
        color: white,
        fontSize: 17, 
        fontWeight: "bold"
    },

    //SIDE MENU
    sideMenu: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20, 
    },
    imgLogo: {
        height: 85,
        width: 90,
    },
    textMenu: {
        color: white,
        fontSize: 22,
        fontWeight: '200',
        paddingVertical: 20,
        alignItems: 'center',
    },

})

export default styles;
