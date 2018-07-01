import * as expo from "expo";

const ENV = {
    dev: {
        // apiUrl:"infinite-chamber-75377.herokuapp.com/",
        //  facebookAppID : '196693064273005',
        apiUrl: "localhost:3000",
        proto: {
            ws: "ws://",
            http: "http://"
        },
        // apiUrl: "infinite-chamber-75377.herokuapp.com",
        // proto: {
        //     ws: "wss://",
        //     http: "https://"
        // },

         // apiUrl: "vaux.ngrok.io"
    },
    staging: {
        apiUrl: "infinite-chamber-75377.herokuapp.com",
        proto: {
            ws: "wss://",
            http: "https://"
        },
        facebookAppID: '196693064273005'
    },
    prod: {
        apiUrl: "infinite-chamber-75377.herokuapp.com",
        facebookAppID: '196693064273005'
    }
};

function getEnvVars(env = "") {
    if (env === null || env === undefined || env === "") return ENV.dev;
    if (env.indexOf("dev") !== -1) return ENV.dev;
    if (env.indexOf("staging") !== -1) return ENV.staging;
    if (env.indexOf("prod") !== -1) return ENV.prod;
}

// export const hostUri = ;
// export const hostUri = "flexable.ngrok.io";

export const envVars = getEnvVars(expo.Constants.manifest.releaseChannel);
export const hostUri = envVars.apiUrl;
export const protocol = envVars.proto;
// export const facebookAppID = envVars.facebookAppID

// Application colors
export const colors = {
    primary: {
        light: "#5dc9e6",
        dark: "#2da5da",
        overlay: "rgba(93, 201, 230, 0.65)"
    },
    accent: {
        pink: "#e91e63",
        gold: "#eebe00"
    },
    text: {
        primary: "#666666",
        faded: "rgba(102, 102, 102, 0.5)"
    },
    grey: {
        extraLight: "#f7f7f7",
        light: "#cccccc",
        medium: "#ababab",
        dark: "#666666"
    },
    danger: "#cf2555",
    success: "#49b859"
};

// nav styles
export const navStyles = {
    primary: {
        headerStyle: {
            backgroundColor: colors.primary.light,
            borderBottomColor: "transparent"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontSize: 20,
            fontFamily: "PN-Regular"
        }
    },
    tabBar: {
        activeTintColor: colors.primary.light,
        inactiveTintColor: colors.grey.light,
        labelStyle: {
            fontFamily: "PN-Regular",
            fontSize: 14
        },
        style: {
            backgroundColor: "#fff",
            paddingTop: 5
        }
    }
};
